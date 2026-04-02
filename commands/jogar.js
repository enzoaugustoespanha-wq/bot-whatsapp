/**
 * Comando: j
 * Faz uma jogada no jogo da velha
 * Uso: .j <1-9>
 */

import { PermissionLevel } from "../config/permissions.js";
import { getVelhaGame, updateVelhaGame, endVelhaGame } from "../utils/games.js";
import { renderBoard, checkWin } from "./velha.js";

export default {
  name: "j",
  aliases: ["jogar", "play", "move"],
  description: "Faz jogada na velha. Uso: .j <1-9>",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, sender, isGroup, args }) {
    if (!isGroup) return;

    const game = getVelhaGame(jid);
    if (!game) {
      await sock.sendMessage(jid, {
        text: "❌ Nenhum jogo em andamento. Use *.velha @usuario* para iniciar.",
      }, { quoted: msg });
      return;
    }

    const currentPlayerJid = game.players[game.currentTurn];
    if (sender !== currentPlayerJid) {
      const mark = game.currentTurn === "X" ? "❌" : "⭕";
      await sock.sendMessage(jid, {
        text: `⏳ Não é sua vez! Aguarde ${mark} @${currentPlayerJid.split("@")[0]}`,
        mentions: [currentPlayerJid],
      }, { quoted: msg });
      return;
    }

    const pos = parseInt(args[0]);
    if (!pos || pos < 1 || pos > 9) {
      await sock.sendMessage(jid, { text: "❌ Escolha uma posição de *1 a 9*." }, { quoted: msg });
      return;
    }

    const index = pos - 1;
    if (game.board[index] !== "") {
      await sock.sendMessage(jid, { text: "❌ Posição ocupada! Escolha outra." }, { quoted: msg });
      return;
    }

    const mark = game.currentTurn;
    game.board[index] = mark;
    const board = renderBoard(game.board);
    const markEmoji = mark === "X" ? "❌" : "⭕";

    // Verificar vitória
    if (checkWin(game.board, mark)) {
      endVelhaGame(jid);
      await sock.sendMessage(jid, {
        text: [
          `🏆 *FIM DE JOGO!*`,
          ``,
          board,
          ``,
          `🎉 *@${sender.split("@")[0]}* venceu com ${markEmoji}!`,
          `Parabéns! 🥇`,
        ].join("\n"),
        mentions: [sender],
      });
      return;
    }

    // Verificar empate
    if (game.board.every((c) => c !== "")) {
      endVelhaGame(jid);
      await sock.sendMessage(jid, {
        text: `🤝 *EMPATE!*\n\n${board}\n\nNenhum jogador venceu. Boa partida! 👏`,
      });
      return;
    }

    // Próximo turno
    game.currentTurn = mark === "X" ? "O" : "X";
    const nextPlayer = game.players[game.currentTurn];
    const nextMarkEmoji = game.currentTurn === "X" ? "❌" : "⭕";
    updateVelhaGame(jid, game);

    await sock.sendMessage(jid, {
      text: [
        `🎮 *JOGO DA VELHA*`,
        ``,
        board,
        ``,
        `▶️ Vez de: ${nextMarkEmoji} @${nextPlayer.split("@")[0]}`,
        `📱 Digite *.j <1-9>* para jogar`,
      ].join("\n"),
      mentions: [nextPlayer],
    });
  },
};
