/**
 * Comando: nomegrupo
 * Muda o nome do grupo
 * Uso: .nomegrupo Novo Nome
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "nomegrupo",
  aliases: ["nomeGrupo", "renomear", "setname"],
  description: "Muda o nome do grupo. Uso: .nomegrupo Novo Nome",
  permission: PermissionLevel.ADMIN,
  allowVip: true,

  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) {
      await sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
      return;
    }

    const nome = args.join(" ").trim();
    if (!nome) {
      await sock.sendMessage(jid, {
        text: "❌ Informe o novo nome!\nExemplo: *.nomegrupo Meu Grupo*",
      }, { quoted: msg });
      return;
    }

    try {
      await sock.groupUpdateSubject(jid, nome);
      await sock.sendMessage(jid, { text: `✅ Nome do grupo atualizado para: *${nome}*` }, { quoted: msg });
    } catch {
      await sock.sendMessage(jid, { text: "❌ Não consegui mudar o nome. Verifique se sou admin." }, { quoted: msg });
    }
  },
};
