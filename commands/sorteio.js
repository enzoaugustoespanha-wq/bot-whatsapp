/**
 * Comando: sorteio
 * Sorteia um número aleatório em um intervalo
 * Uso: !sorteio 1 100
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "sorteio",
  aliases: ["sort", "numero", "random"],
  description: "Sorteia um número aleatório. Uso: !sorteio <min> <max>",
  usage: "!sorteio 1 100",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, args }) {
    const min = parseInt(args[0]) || 1;
    const max = parseInt(args[1]) || 100;

    if (min >= max) {
      await sock.sendMessage(
        jid,
        { text: `❌ O número mínimo deve ser menor que o máximo.\nExemplo: *!sorteio 1 100*` },
        { quoted: msg }
      );
      return;
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;

    await sock.sendMessage(
      jid,
      { text: `🎲 *Resultado do Sorteio*\n\n📊 Intervalo: ${min} a ${max}\n🎯 Número sorteado: *${result}*` },
      { quoted: msg }
    );
  },
};
