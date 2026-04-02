import { PermissionLevel, isOwner } from "../config/permissions.js";
import { resetUser } from "../utils/database.js";
export default {
  name: "resetuser", aliases: ["limparusuario","clearuser","ru","resetusuario"],
  description: "Reseta dados do usuário (adv, hist, mute)", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, getTarget }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const target = getTarget();
    if (!target) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione" }, { quoted: msg });
    if (isOwner(target)) return sock.sendMessage(jid, { text: "⛔ Não posso resetar o dono." }, { quoted: msg });
    const numero = target.split("@")[0].split(":")[0];
    resetUser(jid, target);
    await sock.sendMessage(jid, { text: `💣 *Dados resetados!*\n👤 @${numero}\n🗑️ Adv, histórico e mute removidos.`, mentions: [target] }, { quoted: msg });
  },
};
