/**
 * Comando: velha
 * Inicia um jogo da velha contra outro membro
 * Uso: .velha @usuario   OU   .velha (respondendo mensagem)
 */

import { PermissionLevel } from "../config/permissions.js";
import { getVelhaGame, createVelhaGame, endVelhaGame } from "../utils/games.js";

export const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const NUMS = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];

export function renderBoard(board) {
  const cells = board.map((c, i) => c === "X" ? "❌" : c === "O" ? "⭕" : NUMS[i]);
  return `${cells[0]}${cells[1]}${cells[2]}\n${cells[3]}${cells[4]}${cells[5]}\n${cells[6]}${cells[7]}${cells[8]}`;
}

export function checkWin(board, mark) {
  return WIN_LINES.some((line) => line.every((i) => board[i] === mark));
}

export default {
  name: "velha",
  aliases: ["jv", "tictactoe", "jogodavelha"],
  description: "Inicia jogo da velha. Uso: .velha @usuario",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, sender, isGroup, getTarget }) {
    if (!isGroup) {
      await sock.sendMessage(jid, { text: "❌ O jogo da velha é apenas para grupos." }, { quoted: msg });
      return;
    }

    // Se já há jogo em andamento
    const existing = getVelhaGame(jid);
    if (existing) {
      const currentPlayer = existing.players[existing.currentTurn];
      const mark = existing.currentTurn === "X" ? "❌" : "⭕";
      await sock.sendMessage(jid, {
        text: `⚠️ Já existe um jogo em andamento!\n\n${renderBoard(existing.board)}\n\n▶️ Vez de: ${mark} @${currentPlayer.split("@")[0]}\n\nDigite *.j <1-9>* para jogar ou *.cancelarjogo* para encerrar`,
        mentions: [currentPlayer],
      }, { quoted: msg });
      return;
    }

    const opponent = getTarget();
    if (!opponent) {
      await sock.sendMessage(jid, {
        text: `❌ Mencione ou responda a mensagem do oponente!\n\nExemplos:\n▸ *.velha @usuario*\n▸ *.velha* (respondendo uma mensagem)`,
      }, { quoted: msg });
      return;
    }

    if (opponent === sender) {
      await sock.sendMessage(jid, { text: "❌ Você não pode jogar contra si mesmo!" }, { quoted: msg });
      return;
    }

    const game = createVelhaGame(jid, sender, opponent);

    await sock.sendMessage(jid, {
      text: [
        `🎮 *JOGO DA VELHA INICIADO!*`,
        ``,
        `❌ @${sender.split("@")[0]}`,
        `     VS`,
        `⭕ @${opponent.split("@")[0]}`,
        ``,
        renderBoard(game.board),
        ``,
        `▶️ Começa: ❌ @${sender.split("@")[0]}`,
        ``,
        `📱 Digite *.j <número>* para jogar`,
        `🚫 *.cancelarjogo* para encerrar`,
      ].join("\n"),
      mentions: [sender, opponent],
    });
  },
};
