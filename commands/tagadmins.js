import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "tagadmins",
  aliases: ["marcaragmins", "chamaradmins", "adminstag"],
  description: "Marca somente os admins do grupo",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(() => null);
    if (!gd) return sock.sendMessage(jid, { text: "❌ Não consegui dados do grupo." }, { quoted: msg });
    const admins = gd.participants.filter(p => p.admin).map(p => p.id);
    if (!admins.length) return sock.sendMessage(jid, { text: "ℹ️ Nenhum admin no grupo." }, { quoted: msg });
    const texto = args.join(" ") || "📢 Atenção admins!";
    const mencoes = admins.map(a => `@${a.split("@")[0]}`).join(" ");
    await sock.sendMessage(jid, { text: `${texto}\n\n${mencoes}`, mentions: admins }, { quoted: msg });
  },
};
