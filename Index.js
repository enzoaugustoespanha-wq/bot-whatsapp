import makeWASocket, {
  useMultiFileAuthState, DisconnectReason,
  fetchLatestBaileysVersion, makeCacheableSignalKeyStore, isJidBroadcast,
} from "@whiskeysockets/baileys";
import readline from "readline";
import { Boom } from "@hapi/boom";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config/settings.js";
import { loadCommands, handleMessages } from "./events/messageHandler.js";
import { initScheduler } from "./utils/scheduler.js";
import { logger, baileysSilentLogger } from "./utils/logger.js";
import { getBemvindo, isBlacklistGlobal } from "./utils/database.js";
import { normalizeJid } from "./config/permissions.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let reconnectAttempts = 0;

function pergunta(q) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(r => rl.question(q, a => { rl.close(); r(a.trim()); }));
}

async function startBot() {
  logger.info("🚀 Iniciando bot...");
  await loadCommands();
  const sessionPath = path.resolve(__dirname, config.sessionDir);
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  logger.info(`📱 WA v${version.join(".")} | latest:${isLatest}`);

  const sock = makeWASocket({
    version,
    logger: baileysSilentLogger,
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, baileysSilentLogger) },
    shouldIgnoreJid: j => isJidBroadcast(j),
    printQRInTerminal: false,
    keepAliveIntervalMs: 30000,
    generateHighQualityLinkPreview: false,
    msgRetryCounterCache: new Map(),
  });

  if (!state.creds.registered) {
    let phone = config.owner;
    if (!phone || phone.length < 8) phone = await pergunta("📱 Número (com DDI, sem +): ");
    phone = phone.replace(/\D/g, "");
    if (phone.length < 8) { logger.error("❌ Número inválido."); process.exit(1); }
    logger.info(`📞 Pedindo código para +${phone}...`);
    await new Promise(r => setTimeout(r, 3000));
    try {
      const code = await sock.requestPairingCode(phone);
      const fmt = code?.match(/.{1,4}/g)?.join("-") || code;
      logger.info(`━━━━━━━━━━━━━━━━━━━━━━\n🔑 CÓDIGO: ${fmt}\n━━━━━━━━━━━━━━━━━━━━━━`);
    } catch (e) { logger.error(`❌ ${e.message}`); process.exit(1); }
  }

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      reconnectAttempts = 0;
      initScheduler(sock);
      logger.info(`✅ Conectado! Bot: ${config.botName} | Prefixo: ${config.prefix}`);
    }
    if (connection === "close") {
      const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
      const shouldReconnect = code !== DisconnectReason.loggedOut;
      logger.warn(`⚠️ Desconectado (${code})`);
      if (shouldReconnect && reconnectAttempts < config.maxReconnectAttempts) {
        reconnectAttempts++;
        setTimeout(startBot, config.reconnectDelay);
      } else {
        logger.error(shouldReconnect ? "❌ Max reconexões." : "🚫 Logout. Apague /session.");
        process.exit(shouldReconnect ? 1 : 0);
      }
    }
  });

  sock.ev.on("messages.upsert", d => handleMessages(sock, d));

  // ── BOAS VINDAS / SAÍDA ──────────────────────────────────────────
  sock.ev.on("group-participants.update", async ({ id, participants, action }) => {
    try {
      const bv = getBemvindo(id);
      if (!bv?.ativo) return;
      if (action === "add") {
        for (const p of participants) {
          if (isBlacklistGlobal(p)) { try { await sock.groupParticipantsUpdate(id, [p], "remove"); } catch {} continue; }
          const num = normalizeJid(p);
          const msg = (bv.mensagem || "Bem-vindo(a) ao grupo, @user! 🎉").replace("@user", `@${num}`);
          await sock.sendMessage(id, { text: msg, mentions: [p] });
        }
      }
      if (action === "remove" && bv.msgSaida) {
        for (const p of participants) {
          const num = normalizeJid(p);
          await sock.sendMessage(id, { text: `👋 @${num} saiu do grupo.`, mentions: [p] });
        }
      }
    } catch {}
  });

  process.on("uncaughtException", e => logger.error(`❌ Uncaught: ${e.message}`));
  process.on("unhandledRejection", r => logger.error(`❌ Unhandled: ${r}`));
  return sock;
}

startBot().catch(e => { logger.error(`❌ ${e.message}`); process.exit(1); });
                  
