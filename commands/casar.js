import { PermissionLevel } from "../config/permissions.js";
const reacoes = [
  "💍 *CASAMENTO APROVADO!* Que venham os filhos 🍼",
  "💒 Grupo inteiro como testemunha! Tá casado(a) agora.",
  "😂 O grupo inteiro riu mas ninguém impediu. Casamento válido!",
  "🎊 Joguem arroz! É casamento no grupo hoje!",
  "😳 Isso foi inesperado... mas o bot reconhece o amor 💕",
  "📜 Contrato assinado pelo bot. Sem volta não.",
  "👰🤵 Bem-vindos ao casamento mais aleatório do grupo kkk",
];
export default {
  name: "casar",
  aliases: ["casamento", "noivar", "pedir"],
  description: "Pede alguém em casamento no grupo. .casar @user",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, getTarget, senderNumber }) {
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Mencione ou responda alguém!\nEx: *.casar @user*" }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    const reacao = reacoes[Math.floor(Math.random() * reacoes.length)];
    await sock.sendMessage(jid, {
      text: `💍 *@${senderNumber}* pediu *@${n}* em casamento!\n\n${reacao}`,
      mentions: [t],
    }, { quoted: msg });
  },
};
