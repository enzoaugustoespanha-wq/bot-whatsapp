import { PermissionLevel } from "../config/permissions.js";
import { parseTime, formatTime } from "../utils/parseTime.js";
export default {
  name: "desafio", aliases: ["challenge","chal"],
  description: "Cria desafio com tempo. .desafio 5m faça X", permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, isGroup, args, senderNumber }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const timeStr = args[0];
    const ms = parseTime(timeStr);
    if (!ms) return sock.sendMessage(jid, { text: "❌ Informe tempo e descrição!\nEx: *.desafio 10m Quem responder primeiro ganha*" }, { quoted: msg });
    const desc = args.slice(1).join(" ");
    if (!desc) return sock.sendMessage(jid, { text: "❌ Descreva o desafio!" }, { quoted: msg });
    await sock.sendMessage(jid, { text: `🎯 *DESAFIO CRIADO!*\n\n📋 ${desc}\n⏰ Tempo: *${formatTime(ms)}*\n👤 Por: @${senderNumber}\n\n🏆 Boa sorte a todos!`, mentions: [`${senderNumber}@s.whatsapp.net`] });
    setTimeout(async () => { try { await sock.sendMessage(jid, { text: `⏰ *Tempo esgotado!*\n\n🏁 Desafio encerrado: _${desc}_` }); } catch {} }, ms);
  },
};
