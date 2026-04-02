/**
 * Comando: fechar / f
 * Fecha o grupo — apenas admins podem enviar mensagens
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "fechar",
  aliases: ["f", "travar", "lock", "close"],
  description: "Fecha o grupo — só admins enviam mensagens",
  permission: PermissionLevel.ADMIN,
  allowVip: true,

  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) {
      await sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
      return;
    }

    try {
      await sock.groupSettingUpdate(jid, "announcement");
      await sock.sendMessage(jid, {
        text: `🔒 *Grupo Fechado!*\n\n⛔ Apenas *administradores* podem enviar mensagens.\nPara abrir: *.a*`,
      }, { quoted: msg });
    } catch {
      await sock.sendMessage(jid, { text: "❌ Não foi possível fechar. Verifique se sou admin." }, { quoted: msg });
    }
  },
};
