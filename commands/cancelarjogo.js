/**
 * Comando: cancelarjogo
 * Cancela o jogo em andamento no grupo
 */

import { PermissionLevel } from "../config/permissions.js";
import { getVelhaGame, endVelhaGame } from "../utils/games.js";
import { getForcaGame, endForcaGame } from "../utils/games.js";

export default {
  name: "cancelarjogo",
  aliases: ["cj", "cancelar", "stopgame"],
  description: "Cancela o jogo em andamento no grupo",
  permission: PermissionLevel.ADMIN,

  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return;

    const velha = getVelhaGame(jid);
    const forca = getForcaGame(jid);

    if (!velha && !forca) {
      await sock.sendMessage(jid, { text: "❌ Nenhum jogo em andamento." }, { quoted: msg });
      return;
    }

    if (velha) endVelhaGame(jid);
    if (forca) endForcaGame(jid);

    await sock.sendMessage(jid, {
      text: `🚫 *Jogo cancelado!*\n\nO ${velha ? "jogo da velha" : "jogo da forca"} foi encerrado.`,
    }, { quoted: msg });
  },
};
