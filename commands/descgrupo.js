/**
 * Comando: descgrupo
 * Muda a descrição do grupo
 * Uso: .descgrupo Nova descrição aqui
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "descgrupo",
  aliases: ["descGrupo", "descricao", "setdesc"],
  description: "Muda a descrição do grupo. Uso: .descgrupo Nova descrição",
  permission: PermissionLevel.ADMIN,
  allowVip: true,

  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) {
      await sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
      return;
    }

    const desc = args.join(" ").trim();
    if (!desc) {
      await sock.sendMessage(jid, {
        text: "❌ Informe a nova descrição!\nExemplo: *.descgrupo Bem-vindos ao grupo!*",
      }, { quoted: msg });
      return;
    }

    try {
      await sock.groupUpdateDescription(jid, desc);
      await sock.sendMessage(jid, { text: `✅ Descrição do grupo atualizada!` }, { quoted: msg });
    } catch {
      await sock.sendMessage(jid, { text: "❌ Não consegui mudar a descrição. Verifique se sou admin." }, { quoted: msg });
    }
  },
};
