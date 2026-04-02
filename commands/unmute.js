import { PermissionLevel } from "../config/permissions.js";
import { removeMute, isMuted, addHistorico } from "../utils/database.js";
export default {
  name: "unmute", aliases: ["dessilenciar","desmutar","unmutear"],
  description: "Desmuta membro.", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, getTarget, senderNumber }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione" }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    if (!isMuted(jid, t)) return sock.sendMessage(jid, { text: `ℹ️ @${n} não está mutado.`, mentions: [t] }, { quoted: msg });
    removeMute(jid, t); addHistorico(jid, t, "Desmutado", senderNumber);
    await sock.sendMessage(jid, { text: `🔊 *Desmutado!*\n👤 @${n} pode falar novamente.`, mentions: [t] }, { quoted: msg });
  },
};
