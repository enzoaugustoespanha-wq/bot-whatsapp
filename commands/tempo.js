/**
 * Comando: tempo
 * Exibe a hora e data atual do sistema
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "tempo",
  aliases: ["data","time","datacerta"],
  description: "Exibe a data e hora atual",
  usage: "!tempo",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid }) {
    const now = new Date();
    const options = {
      timeZone: "America/Sao_Paulo",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formatted = now.toLocaleString("pt-BR", options);

    await sock.sendMessage(
      jid,
      { text: `🕐 *Data e Hora Atual*\n\n📅 ${formatted}\n\n🌍 Fuso horário: America/Sao_Paulo` },
      { quoted: msg }
    );
  },
};
