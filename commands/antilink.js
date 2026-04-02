/**
 * Comando: antilink
 * Ativa/desativa o sistema antilink no grupo
 * Quando ativo, qualquer link enviado por não-admin bane o membro
 */

import { PermissionLevel } from "../config/permissions.js";
import { isAntilinkAtivo, setAntilink } from "../utils/database.js";

export default {
  name: "antilink",
  aliases: ["al", "antilinkgrupo"],
  description: "Ativa/desativa antilink no grupo. Uso: !antilink on/off",
  permission: PermissionLevel.ADMIN,

  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) {
      await sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
      return;
    }

    const opcao = args[0]?.toLowerCase();

    if (!opcao || (opcao !== "on" && opcao !== "off")) {
      const atual = isAntilinkAtivo(jid);
      await sock.sendMessage(jid, {
        text: [
          `🔗 *Antilink*`,
          ``,
          `Status atual: ${atual ? "✅ *Ativado*" : "❌ *Desativado*"}`,
          ``,
          `Para ativar: *!antilink on*`,
          `Para desativar: *!antilink off*`,
        ].join("\n"),
      }, { quoted: msg });
      return;
    }

    const ativo = opcao === "on";
    setAntilink(jid, ativo);

    await sock.sendMessage(jid, {
      text: ativo
        ? `✅ *Antilink ativado!*\n\n🔗 Qualquer link enviado por membros (não-admins) resultará em *ban automático*.`
        : `❌ *Antilink desativado!*\n\n🔗 Membros podem enviar links normalmente.`,
    }, { quoted: msg });
  },
};
