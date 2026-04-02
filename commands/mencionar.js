import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "mencionar",
  aliases: ["marcar", "mencionartodos", "marcartodos", "everyone", "todos"],
  description: "Menciona todos os membros do grupo",
  permission: PermissionLevel.ADMIN,
  allowVip: true,

  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });

    const groupData = await sock.groupMetadata(jid).catch(() => null);
    if (!groupData) return sock.sendMessage(jid, { text: "❌ Não consegui obter dados do grupo." }, { quoted: msg });

    const members = groupData.participants.map((p) => p.id);
    const texto = args.join(" ") || "📢 Atenção, membros!";
    const mencoes = members.map((m) => `@${m.split("@")[0]}`).join(" ");

    await sock.sendMessage(jid, {
      text: `${texto}\n\n${mencoes}`,
      mentions: members,
    }, { quoted: msg });
  },
};
