import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "../config/settings.js";
import { isOwner, isAdmin, normalizeJid, PermissionLevel } from "../config/permissions.js";
import {
  isMuted, removeMute, getAntilinkMode, isAutofigAtivo, isBotAtivo,
  isVip, getModoGrupo, registrarAtividade, checkAutoResposta,
  checkPalavraProibida, checkCmdCustom, isBlacklistGlobal, getBemvindo,
  getAntifloodConfig, isAntifloodAtivo, getPrefixo,
} from "../utils/database.js";
import { getTargetFromMsg } from "../utils/getTarget.js";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commands = new Map();
const LINK_RE = /https?:\/\/[^\s]+|www\.[^\s]+|chat\.whatsapp\.com\/[^\s]+/gi;

// Flood tracker (in-memory)
const floodTracker = new Map(); // "grupoJid:userJid" => {count, ts}

export async function loadCommands() {
  const dir = path.join(__dirname, "..", "commands");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  commands.clear();
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"));
  for (const file of files) {
    try {
      const cmd = await import(`${path.join(dir, file)}?t=${Date.now()}`);
      if (cmd.default?.name) {
        commands.set(cmd.default.name.toLowerCase(), cmd.default);
        cmd.default.aliases?.forEach(a => commands.set(a.toLowerCase(), cmd.default));
      }
    } catch (e) { logger.error(`❌ ${file}: ${e.message}`); }
  }
  logger.info(`📦 ${commands.size} entradas | ${new Set([...commands.values()]).size} comandos`);
}

export async function handleMessages(sock, { messages, type }) {
  if (type !== "notify") return;
  for (const msg of messages) {
    try {
      if (msg.key.fromMe) continue;
      const jid = msg.key.remoteJid;
      if (!jid || jid === "status@broadcast") continue;
      const isGroup = jid.endsWith("@g.us");
      const sender = isGroup ? msg.key.participant : jid;
      if (!sender) continue;

      const senderNum = normalizeJid(sender);
      const ownerFlag = isOwner(sender);
      const mc = msg.message;
      if (!mc) continue;

      const text = mc.conversation || mc.extendedTextMessage?.text
        || mc.imageMessage?.caption || mc.videoMessage?.caption || "";

      // Blacklist global
      if (!ownerFlag && isBlacklistGlobal(sender)) {
        if (isGroup) { try { await sock.groupParticipantsUpdate(jid, [sender], "remove"); } catch {} }
        continue;
      }

      // Bot inativo — só dono passa
      if (!isBotAtivo() && !ownerFlag) continue;

      // Registrar atividade
      if (isGroup) { try { registrarAtividade(jid, sender); } catch {} }

      // ── BOAS VINDAS (handled by groups-update event in index.js) ──

      // ── AUTO-FIGURINHA ──────────────────────────────────────────────
      if (isGroup && !ownerFlag && isAutofigAtivo(jid)) {
        const hasImg = mc.imageMessage || mc.videoMessage;
        if (hasImg && !text?.startsWith(config.prefix)) {
          try { const buf = await sock.downloadMediaMessage(msg); await sock.sendMessage(jid, { sticker: buf }); } catch {}
        }
      }

      // ── MUTE AUTOMÁTICO ────────────────────────────────────────────
      if (isGroup && !ownerFlag && isMuted(jid, sender)) {
        try {
          await sock.groupParticipantsUpdate(jid, [sender], "remove");
          removeMute(jid, sender);
          await sock.sendMessage(jid, { text: `🔇 *@${senderNum}* foi banido por estar mutado!`, mentions: [sender] });
        } catch {}
        continue;
      }

      // ── PALAVRAS PROIBIDAS ─────────────────────────────────────────
      if (isGroup && text && !ownerFlag) {
        const gd = await sock.groupMetadata(jid).catch(() => null);
        const ehAdmin = gd && isAdmin(sender, gd);
        if (!ehAdmin) {
          const palavra = checkPalavraProibida(jid, text);
          if (palavra) {
            try {
              await sock.sendMessage(jid, { delete: msg.key });
              await sock.sendMessage(jid, { text: `⚠️ @${senderNum} usou palavra proibida (*${palavra}*). Mensagem removida.`, mentions: [sender] });
            } catch {}
            continue;
          }
        }
      }

      // ── ANTILINK ───────────────────────────────────────────────────
      if (isGroup && text && !ownerFlag) {
        const alMode = getAntilinkMode(jid);
        if (alMode && LINK_RE.test(text)) {
          const gd2 = await sock.groupMetadata(jid).catch(() => null);
          const ehAdmin2 = gd2 && isAdmin(sender, gd2);
          if (!ehAdmin2) {
            if (alMode === "soft") {
              try { await sock.sendMessage(jid, { delete: msg.key }); await sock.sendMessage(jid, { text: `🔗 @${senderNum} links não são permitidos aqui!`, mentions: [sender] }); } catch {}
            } else {
              try { await sock.groupParticipantsUpdate(jid, [sender], "remove"); await sock.sendMessage(jid, { text: `🔗 @${senderNum} banido por enviar link!`, mentions: [sender] }); } catch {}
            }
            continue;
          }
        }
      }

      // ── ANTIFLOOD ──────────────────────────────────────────────────
      if (isGroup && !ownerFlag) {
        const fc = getAntifloodConfig(jid);
        if (fc.ativo) {
          const key = `${jid}:${sender}`;
          const now = Date.now();
          const fd = floodTracker.get(key) || { count: 0, ts: now };
          if (now - fd.ts > fc.tempo * 1000) { fd.count = 1; fd.ts = now; }
          else { fd.count++; }
          floodTracker.set(key, fd);
          if (fd.count > fc.limite) {
            const gd3 = await sock.groupMetadata(jid).catch(() => null);
            const ehAdmin3 = gd3 && isAdmin(sender, gd3);
            if (!ehAdmin3) {
              try { await sock.groupParticipantsUpdate(jid, [sender], "remove"); await sock.sendMessage(jid, { text: `⚡ @${senderNum} banido por flood!`, mentions: [sender] }); floodTracker.delete(key); } catch {}
              continue;
            }
          }
        }
      }

      // ── PROCESSAR COMANDO ──────────────────────────────────────────
      // Suporte a prefixo por grupo
      const groupPrefix = isGroup ? (getPrefixo(jid) || config.prefix) : config.prefix;
      if (!text?.startsWith(groupPrefix)) {
        // Auto-resposta (sem prefixo)
        if (isGroup && text) {
          const autoResp = checkAutoResposta(jid, text);
          if (autoResp) { try { await sock.sendMessage(jid, { text: autoResp }, { quoted: msg }); } catch {} }
        }
        continue;
      }

      const args = text.slice(groupPrefix.length).trim().split(/\s+/);
      const cmdName = args.shift().toLowerCase();

      // Checar comandos customizados
      const cmdCustom = isGroup ? checkCmdCustom(jid, cmdName) : null;
      if (cmdCustom) { await sock.sendMessage(jid, { text: cmdCustom }, { quoted: msg }); continue; }

      const command = commands.get(cmdName);
      if (!command) {
        await sock.sendMessage(jid, { text: config.unknownCommandMsg.replace("{prefix}", groupPrefix) }, { quoted: msg });
        continue;
      }

      // Permissão
      let level = PermissionLevel.USER;
      if (ownerFlag) { level = PermissionLevel.OWNER; }
      else if (isGroup) {
        const gd4 = await sock.groupMetadata(jid).catch(() => null);
        if (gd4 && isAdmin(sender, gd4)) level = PermissionLevel.ADMIN;
      }
      const vipFlag = isVip(sender);

      // Modo grupo
      if (isGroup) {
        const modo = getModoGrupo(jid);
        if (modo === "sodono" && !ownerFlag) continue;
        if (modo === "soadm" && level < PermissionLevel.ADMIN) continue;
      }

      const req = command.permission ?? PermissionLevel.USER;
      const eff = (vipFlag && command.allowVip && req === PermissionLevel.ADMIN) ? PermissionLevel.ADMIN : level;
      if (eff < req) {
        const m = { [PermissionLevel.ADMIN]: "❌ Apenas *admins*.", [PermissionLevel.OWNER]: "❌ Apenas o *dono*." };
        await sock.sendMessage(jid, { text: m[req] || "❌ Sem permissão." }, { quoted: msg });
        continue;
      }

      if (config.logMessages) logger.info(`⚡ .${cmdName} | ${senderNum}`);

      await command.execute({
        sock, msg, jid, sender, senderNumber: senderNum, isGroup, args, text,
        prefix: groupPrefix, isOwner: ownerFlag, isVip: vipFlag,
        isAdmin: eff >= PermissionLevel.ADMIN, botJid: sock.user?.id || null,
        getTarget: () => getTargetFromMsg(msg),
      });
    } catch (e) { logger.error(`❌ Handler: ${e.message}`); }
  }
    }
            
