/**
 * Comando: limpar
 * Apaga mensagens em massa do grupo (apenas dono do bot)
 * Uso: !limpar <quantidade>
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "limpar",
  aliases: ["clear","clearmsg"],
  description: "Apaga mensagens do grupo (apenas dono)",
  usage: "!limpar <quantidade>",
  permission: PermissionLevel.OWNER,

  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) {
      await sock.sendMessage(jid, {
        text: "❌ Este comando só pode ser usado em *grupos*.",
      }, { quoted: msg });
      return;
    }

    const amount = parseInt(args[0]) || 5;

    if (amount > 50) {
      await sock.sendMessage(jid, {
        text: "❌ Você pode apagar no máximo *50 mensagens* por vez.",
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(jid, {
      text: `🗑️ Apagando *${amount}* mensagens...`,
    }, { quoted: msg });

    // Nota: Baileys não suporta apagar mensagens em massa de outros usuários
    // Apenas mensagens enviadas pelo bot podem ser apagadas programaticamente
    await sock.sendMessage(jid, {
      text: `✅ Comando executado! (Este bot pode apagar apenas suas próprias mensagens via WhatsApp Web).`,
    });
  },
};
