import { PermissionLevel, isOwner } from "../config/permissions.js";
import { addLogBan, addHistorico } from "../utils/database.js";
export default {
  name: "ban",
  aliases: ["b","kick","remover","expulsar","banir"],
  description: "Remove membro. Responda ou @mencione.",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, sender, senderNumber, getTarget }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
    const target = getTarget();
    if (!target) return sock.sendMessage(jid, { text: "❌ Responda ou mencione @\nEx: *.ban @user*" }, { quoted: msg });
    if (target === sender) return sock.sendMessage(jid, { text: "❌ Não pode se remover." }, { quoted: msg });
    if (isOwner(target)) return sock.sendMessage(jid, { text: "⛔ Não posso banir o dono." }, { quoted: msg });
    const numero = target.split("@")[0].split(":")[0];
    try {
      await sock.groupParticipantsUpdate(jid, [target], "remove");
      addLogBan(jid, { numero, motivo: "ban manual", por: senderNumber });
      addHistorico(jid, target, "Banido", senderNumber);
      await sock.sendMessage(jid, { text: `✅ *@${numero} removido.*`, mentions: [target] });
    } catch { await sock.sendMessage(jid, { text: "❌ Não consegui. Sou admin?" }, { quoted: msg }); }
  },
};
