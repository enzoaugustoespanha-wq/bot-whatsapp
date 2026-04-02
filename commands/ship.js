/**
 * Comando: ship
 * Calcula compatibilidade entre dois usuários
 * Uso: .ship @user1 @user2   OU   .ship (respondendo alguém)
 */

import { PermissionLevel } from "../config/permissions.js";

const NIVEIS = [
  { min: 0,  max: 20,  emoji: "💔", desc: "Sem chance, meu consagrado..." },
  { min: 21, max: 40,  emoji: "😬", desc: "Muito difícil, mas tudo pode acontecer!" },
  { min: 41, max: 60,  emoji: "😊", desc: "Tem potencial! Com esforço vai dar certo." },
  { min: 61, max: 75,  emoji: "😍", desc: "Boa química! Vale tentar." },
  { min: 76, max: 90,  emoji: "❤️", desc: "Casal combinado! Muito compatíveis." },
  { min: 91, max: 100, emoji: "💘", desc: "Casal perfeito! São feitos um pro outro!" },
];

function getComp(jid1, jid2) {
  const hash = [...(jid1 + jid2)].reduce((a, c) => a + c.charCodeAt(0), 0);
  return hash % 101;
}

export default {
  name: "ship",
  aliases: ["compatibilidade", "amor", "couple"],
  description: "Compatibilidade entre dois usuários. Uso: .ship @user1 @user2",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, sender, getTarget }) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const mentions = ctx?.mentionedJid || [];

    let user1 = sender;
    let user2 = null;

    if (mentions.length >= 2) {
      user1 = mentions[0];
      user2 = mentions[1];
    } else if (mentions.length === 1) {
      user1 = sender;
      user2 = mentions[0];
    } else {
      user2 = getTarget();
    }

    if (!user2) {
      await sock.sendMessage(jid, {
        text: "❌ Mencione dois usuários!\nExemplo: *.ship @user1 @user2*\nOu responda a mensagem de alguém.",
      }, { quoted: msg });
      return;
    }

    const porcentagem = getComp(user1, user2);
    const nivel = NIVEIS.find((n) => porcentagem >= n.min && porcentagem <= n.max);
    const barra = "█".repeat(Math.floor(porcentagem / 10)) + "░".repeat(10 - Math.floor(porcentagem / 10));

    await sock.sendMessage(jid, {
      text: [
        `💑 *SHIP*`,
        ``,
        `@${user1.split("@")[0]}`,
        `     ❤️`,
        `@${user2.split("@")[0]}`,
        ``,
        `[${barra}] *${porcentagem}%*`,
        ``,
        `${nivel.emoji} ${nivel.desc}`,
      ].join("\n"),
      mentions: [user1, user2],
    }, { quoted: msg });
  },
};
