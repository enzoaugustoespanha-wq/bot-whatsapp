import { PermissionLevel, isOwner } from "../config/permissions.js";
import { addMute, isMuted, addHistorico } from "../utils/database.js";
export default {
  name: "mute", aliases: ["silenciar","calar","mutear"],
  description: "Muta membro. Responda/@mencione.", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, getTarget, senderNumber }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione\nEx: *.mute @user*" }, { quoted: msg });
    if (isOwner(t)) return sock.sendMessage(jid, { text: "⛔ Não posso mutar o dono." }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    if (isMuted(jid, t)) return sock.sendMessage(jid, { text: `ℹ️ @${n} já está mutado.`, mentions: [t] }, { quoted: msg });
    addMute(jid, t); addHistorico(jid, t, "Mutado", senderNumber);
    await sock.sendMessage(jid, { text: `🔇 *Mutado!*\n👤 @${n}\n⚠️ Próxima msg = ban automático\nDesmutar: *.unmute @user*`, mentions: [t] }, { quoted: msg });
  },
};
