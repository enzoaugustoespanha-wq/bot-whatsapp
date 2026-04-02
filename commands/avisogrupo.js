import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "avisogrupo",
  aliases: ["aviso", "notice", "comunicado"],
  description: "Envia aviso oficial para o grupo marcando todos",
  permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const texto = args.join(" ");
    if (!texto) return sock.sendMessage(jid, { text: "❌ Informe o aviso!\nEx: *.avisogrupo Reunião amanhã às 20h!*" }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(() => null);
    const members = gd?.participants?.map(p => p.id) || [];
    await sock.sendMessage(jid, {
      text: `📢 *AVISO OFICIAL*\n\n${texto}\n\n— _Admins do grupo_`,
      mentions: members,
    });
  },
};
