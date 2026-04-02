import { PermissionLevel } from "../config/permissions.js";
import { setAntiflood, getAntifloodConfig } from "../utils/database.js";
export default {
  name: "antiflood",
  aliases: ["flood", "antispam"],
  description: "Antiflood. .antiflood on [msgs] [segundos] | .antiflood off",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const op = args[0]?.toLowerCase();
    const cfg = getAntifloodConfig(jid);
    if (!op) return sock.sendMessage(jid, { text: `⚡ Antiflood: *${cfg.ativo ? "✅ Ativo" : "❌ Inativo"}*\nLimite: ${cfg.limite} msgs / ${cfg.tempo}s\n\nUso: *.antiflood on 5 10*` }, { quoted: msg });
    if (op === "off") { setAntiflood(jid, false); return sock.sendMessage(jid, { text: "❌ Antiflood desativado!" }, { quoted: msg }); }
    const limite = parseInt(args[1]) || 5;
    const tempo = parseInt(args[2]) || 10;
    if (op === "on") {
      setAntiflood(jid, true, limite, tempo);
      return sock.sendMessage(jid, { text: `⚡ *Antiflood ativado!*\nLimite: *${limite} msgs* em *${tempo}s* → ban automático.` }, { quoted: msg });
    }
    await sock.sendMessage(jid, { text: "❌ Use *.antiflood on* ou *.antiflood off*" }, { quoted: msg });
  },
};
