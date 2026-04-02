import { PermissionLevel, isOwner } from "../config/permissions.js";
import { addTempBan, addLogBan, addHistorico } from "../utils/database.js";
import { parseTime, formatTime } from "../utils/parseTime.js";
export default {
  name: "tempban", aliases: ["tb","bantemp","bantmp"],
  description: "Ban temporário. .tempban @user 10m", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args, getTarget, senderNumber }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const target = getTarget();
    if (!target) return sock.sendMessage(jid, { text: "❌ Responda/@mencione\nEx: *.tempban @user 10m*\nTempos: 30s 5m 2h 1d" }, { quoted: msg });
    if (isOwner(target)) return sock.sendMessage(jid, { text: "⛔ Não posso banir o dono." }, { quoted: msg });
    const timeStr = args.find(a=>/^\d+[smhd]$/.test(a));
    const ms = parseTime(timeStr);
    if (!ms) return sock.sendMessage(jid, { text: "❌ Tempo inválido! Ex: *5m*, *2h*, *1d*" }, { quoted: msg });
    const numero = target.split("@")[0].split(":")[0];
    try {
      await sock.groupParticipantsUpdate(jid, [target], "remove");
      addTempBan(jid, target, Date.now() + ms, numero);
      addLogBan(jid, { numero, motivo: "tempban", duracao: timeStr, por: senderNumber });
      addHistorico(jid, target, `Tempban ${timeStr}`, senderNumber);
      await sock.sendMessage(jid, { text: `⏳ *Tempban*\n👤 @${numero}\n🕒 Duração: *${formatTime(ms)}*\n🔄 Será readmitido automaticamente!`, mentions: [target] }, { quoted: msg });
    } catch { await sock.sendMessage(jid, { text: "❌ Não consegui. Sou admin?" }, { quoted: msg }); }
  },
};
