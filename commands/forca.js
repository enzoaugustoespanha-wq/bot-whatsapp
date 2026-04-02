/**
 * Comando: forca
 * Inicia um jogo da forca no grupo
 * Uso: .forca
 */

import { PermissionLevel } from "../config/permissions.js";
import { getForcaGame, createForcaGame, endForcaGame } from "../utils/games.js";

const PALAVRAS = [
  "cachorro","gato","elefante","girafa","leao","tigre","zebra","macaco","papagaio","jacare",
  "tartaruga","borboleta","computador","celular","televisao","geladeira","ventilador",
  "programacao","javascript","brasil","futebol","carnaval","saudade","amizade","felicidade",
  "chocolate","sorvete","pizza","hamburguer","macarrao","feijao","abacaxi","morango",
  "melancia","banana","laranja","manga","escola","professor","caderno","biblioteca",
  "hospital","medico","enfermeira","remedio","aviao","navio","bicicleta","montanha",
  "floresta","oceano","deserto","vulcao","diamante","tesouro","aventura","misterio",
  "universo","estrela","planeta","galaxia","foguete","astronauta","submarino","pirata",
];

export const FORCA_STAGES = [
  "```\n  ___\n |   \n |   \n |   \n_|_```",
  "```\n  ___\n |   |\n |   \n |   \n_|_```",
  "```\n  ___\n |   |\n |   😐\n |   \n_|_```",
  "```\n  ___\n |   |\n |   😟\n |   |\n_|_```",
  "```\n  ___\n |   |\n |  😟\n | /|\n_|_```",
  "```\n  ___\n |   |\n |  😟\n | /|\\\n_|_```",
  "```\n  ___\n |   |\n |  😵\n | /|\\\n | /\n_|_```",
  "```\n  ___\n |   |\n |  😵\n | /|\\\n | / \\\n_|_```",
];

export function renderForca(game) {
  const { word, guessed, errors } = game;
  const wordDisplay = word.split("").map((c) => (guessed.includes(c) ? c.toUpperCase() : "_")).join(" ");
  const wrongLetters = guessed.filter((c) => !word.includes(c));

  return [
    FORCA_STAGES[errors],
    ``,
    `📝 Palavra: *${wordDisplay}*`,
    ``,
    wrongLetters.length > 0 ? `❌ Erradas: *${wrongLetters.join(", ").toUpperCase()}*` : `❌ Erradas: —`,
    `💀 Erros: *${errors}/${game.maxErrors}*`,
  ].join("\n");
}

export default {
  name: "forca",
  aliases: ["jf", "hangman", "jogodaforca"],
  description: "Inicia um jogo da forca no grupo",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, sender, isGroup }) {
    if (!isGroup) {
      await sock.sendMessage(jid, { text: "❌ O jogo da forca é apenas para grupos." }, { quoted: msg });
      return;
    }

    const existing = getForcaGame(jid);
    if (existing) {
      await sock.sendMessage(jid, {
        text: `⚠️ Já existe um jogo da forca em andamento!\n\n${renderForca(existing)}\n\nDigite *.letra <x>* para adivinhar ou *.cancelarjogo* para encerrar`,
      }, { quoted: msg });
      return;
    }

    const word = PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)];
    const game = createForcaGame(jid, word, sender);

    await sock.sendMessage(jid, {
      text: [
        `🎮 *JOGO DA FORCA INICIADO!*`,
        ``,
        `📌 Iniciado por: @${sender.split("@")[0]}`,
        `👥 Todos podem participar!`,
        ``,
        renderForca(game),
        ``,
        `📱 Digite *.letra <x>* para adivinhar uma letra`,
        `💡 Ex: *.letra a*`,
        `🚫 *.cancelarjogo* para encerrar`,
      ].join("\n"),
      mentions: [sender],
    });
  },
};
