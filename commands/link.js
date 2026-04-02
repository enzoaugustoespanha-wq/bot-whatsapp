/**
 * Comando: link
 * Pega o link de convite do grupo
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "link",
  aliases: ["invite","linkconvite"],
  description: "Pega o link de convite do grupo (apenas admin)",
  permission: PermissionLevel.ADMIN,
  allowVip: true,

  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) {
      await sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
      return;
    }

    try {
      const code = await sock.groupInviteCode(jid);
      const groupData = await sock.groupMetadata(jid).catch(() => null);
      const nomeGrupo = groupData?.subject || "Grupo";

      await sock.sendMessage(jid, {
        text: [
          `🔗 *Link do Grupo*`,
          ``,
          `📌 Grupo: *${nomeGrupo}*`,
          `🌐 Link: https://chat.whatsapp.com/${code}`,
        ].join("\n"),
      }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(jid, {
        text: `❌ Não foi possível obter o link. O bot precisa ser admin.\n\nErro: ${err.message}`,
      }, { quoted: msg });
    }
  },
};
