/**
 * Comando: abrir / a
 * Abre o grupo — todos os membros podem enviar mensagens
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "abrir",
  aliases: ["a", "destravar", "unlock", "open"],
  description: "Abre o grupo — todos podem enviar mensagens",
  permission: PermissionLevel.ADMIN,
  allowVip: true,

  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) {
      await sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
      return;
    }

    try {
      await sock.groupSettingUpdate(jid, "not_announcement");
      await sock.sendMessage(jid, {
        text: `🔓 *Grupo Aberto!*\n\n✅ Todos os membros podem enviar mensagens.`,
      }, { quoted: msg });
    } catch {
      await sock.sendMessage(jid, { text: "❌ Não foi possível abrir. Verifique se sou admin." }, { quoted: msg });
    }
  },
};
