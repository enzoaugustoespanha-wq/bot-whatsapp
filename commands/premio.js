import { PermissionLevel, isOwner } from "../config/permissions.js";
import { addHistorico } from "../utils/database.js";
export default {
  name: "premio", aliases: ["award","recompensa","premiar"],
  description: "Dá recompensa a usuário. .premio @user valor/texto", permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, isGroup, args, getTarget, senderNumber }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const target = getTarget();
    if (!target) return sock.sendMessage(jid, { text: "❌ Mencione ou responda alguém!\nEx: *.premio @user Parabéns!*" }, { quoted: msg });
    if (isOwner(target)) return sock.sendMessage(jid, { text: "⛔ Não posso premiar o dono." }, { quoted: msg });
    const valor = args.filter(a=>!a.startsWith("@")).join(" ") || "🏆 Prêmio especial!";
    const numero = target.split("@")[0].split(":")[0];
    addHistorico(jid, target, `Prêmio: ${valor}`, senderNumber);
    await sock.sendMessage(jid, { text: `🏆 *PRÊMIO CONCEDIDO!*\n\n👤 @${numero}\n🎁 ${valor}\n\n🎉 Parabéns!`, mentions: [target] }, { quoted: msg });
  },
};
