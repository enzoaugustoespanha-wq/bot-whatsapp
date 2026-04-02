import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "promote", aliases: ["promover","admin","promov","daradm"],
  description: "Promove a admin.", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, getTarget }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione" }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    try { await sock.groupParticipantsUpdate(jid, [t], "promote"); await sock.sendMessage(jid, { text: `✅ *Novo Admin!*\n👑 @${n} é administrador!`, mentions: [t] }, { quoted: msg }); }
    catch { await sock.sendMessage(jid, { text: "❌ Não consegui. Sou admin?" }, { quoted: msg }); }
  },
};
