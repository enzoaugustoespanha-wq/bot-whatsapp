import { PermissionLevel, isOwner } from "../config/permissions.js";
import { addTempMute, addHistorico } from "../utils/database.js";
import { parseTime, formatTime } from "../utils/parseTime.js";
export default {
  name: "tempmute", aliases: ["tm","mutetemp","mutetmp"],
  description: "Mute temporário. .tempmute @user 10m", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args, getTarget, senderNumber }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const target = getTarget();
    if (!target) return sock.sendMessage(jid, { text: "❌ Responda/@mencione\nEx: *.tempmute @user 15m*" }, { quoted: msg });
    if (isOwner(target)) return sock.sendMessage(jid, { text: "⛔ Não posso mutar o dono." }, { quoted: msg });
    const timeStr = args.find(a=>/^\d+[smhd]$/.test(a));
    const ms = parseTime(timeStr);
    if (!ms) return sock.sendMessage(jid, { text: "❌ Tempo inválido! Ex: *5m*, *2h*" }, { quoted: msg });
    const numero = target.split("@")[0].split(":")[0];
    addTempMute(jid, target, Date.now() + ms);
    addHistorico(jid, target, `Tempmute ${timeStr}`, senderNumber);
    await sock.sendMessage(jid, { text: `🔇 *Tempmute*\n👤 @${numero}\n🕒 *${formatTime(ms)}*\n⚠️ Msgs = ban automático\n🔊 Desmutado automaticamente!`, mentions: [target] }, { quoted: msg });
  },
};
