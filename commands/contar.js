import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "contar",
  aliases: ["contarmembros", "qtdmembros", "total"],
  description: "Conta membros e admins do grupo",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(() => null);
    if (!gd) return sock.sendMessage(jid, { text: "❌ Não consegui obter dados." }, { quoted: msg });
    const total = gd.participants.length;
    const admins = gd.participants.filter(p => p.admin).length;
    await sock.sendMessage(jid, {
      text: [`📊 *Contagem do Grupo*`, ``, `👥 Total: *${total}* membros`, `👮 Admins: *${admins}*`, `👤 Membros: *${total - admins}*`].join("\n"),
    }, { quoted: msg });
  },
};
