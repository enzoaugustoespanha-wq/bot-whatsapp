import { PermissionLevel, isOwner } from "../config/permissions.js";
export default {
  name: "demote", aliases: ["rebaixar","deadmin","rebaixa","rmadm"],
  description: "Remove admin.", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, getTarget }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione" }, { quoted: msg });
    if (isOwner(t)) return sock.sendMessage(jid, { text: "⛔ Não posso rebaixar o dono." }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    try { await sock.groupParticipantsUpdate(jid, [t], "demote"); await sock.sendMessage(jid, { text: `⬇️ *Admin removido!*\n👤 @${n} não é mais admin.`, mentions: [t] }, { quoted: msg }); }
    catch { await sock.sendMessage(jid, { text: "❌ Não consegui. Sou admin?" }, { quoted: msg }); }
  },
};
