/**
 * Comando: letra
 * Adivinha uma letra no jogo da forca
 * Uso: .letra a
 */

import { PermissionLevel } from "../config/permissions.js";
import { getForcaGame, updateForcaGame, endForcaGame } from "../utils/games.js";
import { renderForca, FORCA_STAGES } from "./forca.js";

export default {
  name: "letra",
  aliases: ["l", "guess", "adivinhar"],
  description: "Adivinha uma letra na forca. Uso: .letra a",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, sender, isGroup, args }) {
    if (!isGroup) return;

    const game = getForcaGame(jid);
    if (!game) {
      await sock.sendMessage(jid, {
        text: "❌ Nenhum jogo da forca em andamento. Use *.forca* para iniciar.",
      }, { quoted: msg });
      return;
    }

    const input = args[0]?.toLowerCase().trim();
    if (!input) {
      await sock.sendMessage(jid, { text: "❌ Digite uma letra! Ex: *.letra a*" }, { quoted: msg });
      return;
    }

    // Verifica se é tentativa de palavra completa
    if (input.length > 1) {
      if (input === game.word) {
        endForcaGame(jid);
        await sock.sendMessage(jid, {
          text: [
            `🎉 *ACERTOU A PALAVRA!*`,
            ``,
            `🏆 @${sender.split("@")[0]} adivinhou a palavra!`,
            `✅ A palavra era: *${game.word.toUpperCase()}*`,
            `🥇 Parabéns!`,
          ].join("\n"),
          mentions: [sender],
        });
      } else {
        game.errors = Math.min(game.errors + 2, game.maxErrors);
        if (game.errors >= game.maxErrors) {
          endForcaGame(jid);
          await sock.sendMessage(jid, {
            text: [
              FORCA_STAGES[game.maxErrors],
              ``,
              `💀 *GAME OVER!*`,
              ``,
              `@${sender.split("@")[0]} tentou a palavra errada!`,
              `❌ Era: *${input.toUpperCase()}*`,
              `✅ A palavra era: *${game.word.toUpperCase()}*`,
            ].join("\n"),
            mentions: [sender],
          });
        } else {
          updateForcaGame(jid, game);
          await sock.sendMessage(jid, {
            text: `❌ *${input.toUpperCase()}* não é a palavra! (-2 tentativas)\n\n${renderForca(game)}`,
          }, { quoted: msg });
        }
      }
      return;
    }

    const letra = input[0];

    if (!/^[a-z]$/.test(letra)) {
      await sock.sendMessage(jid, { text: "❌ Use apenas letras de A a Z." }, { quoted: msg });
      return;
    }

    if (game.guessed.includes(letra)) {
      await sock.sendMessage(jid, {
        text: `⚠️ A letra *${letra.toUpperCase()}* já foi tentada!\n\n${renderForca(game)}`,
      }, { quoted: msg });
      return;
    }

    game.guessed.push(letra);
    const acertou = game.word.includes(letra);

    if (!acertou) game.errors++;

    // Verificar derrota
    if (game.errors >= game.maxErrors) {
      endForcaGame(jid);
      await sock.sendMessage(jid, {
        text: [
          FORCA_STAGES[game.maxErrors],
          ``,
          `💀 *GAME OVER!*`,
          ``,
          `❌ A letra *${letra.toUpperCase()}* não está na palavra.`,
          `✅ A palavra era: *${game.word.toUpperCase()}*`,
          ``,
          `Melhor sorte na próxima! Use *.forca* para jogar novamente.`,
        ].join("\n"),
      });
      return;
    }

    // Verificar vitória (todas as letras adivinhadas)
    const todasAdivinhadas = game.word.split("").every((c) => game.guessed.includes(c));
    if (todasAdivinhadas) {
      endForcaGame(jid);
      await sock.sendMessage(jid, {
        text: [
          `🎉 *PARABÉNS!*`,
          ``,
          `🏆 @${sender.split("@")[0]} completou a palavra!`,
          `✅ A palavra era: *${game.word.toUpperCase()}*`,
          `💀 Erros: ${game.errors}/${game.maxErrors}`,
          ``,
          `Use *.forca* para jogar novamente!`,
        ].join("\n"),
        mentions: [sender],
      });
      return;
    }

    updateForcaGame(jid, game);

    const emoji = acertou ? "✅" : "❌";
    const msg2 = acertou
      ? `✅ A letra *${letra.toUpperCase()}* está na palavra!`
      : `❌ A letra *${letra.toUpperCase()}* não está na palavra.`;

    await sock.sendMessage(jid, {
      text: `${msg2}\n\n${renderForca(game)}\n\n📱 Continue: *.letra <x>*`,
    });
  },
};
