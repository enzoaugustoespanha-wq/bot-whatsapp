import { PermissionLevel } from "../config/permissions.js";
const frases = [
  "deu um tapa na nuca de",
  "esbofeteou 🖐️",
  "veio de surpresa com um tapão em",
  "foi de tapa seco em",
  "estendeu a mão e foi fundo em",
  "deu um tapa de amor/ódio em",
];
export default {
  name: "tapa",
  aliases: ["tapao", "esbofetear", "slap"],
  description: "Dá um tapa em alguém. .tapa @user",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, getTarget, senderNumber }) {
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Mencione ou responda alguém!\nEx: *.tapa @user*" }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    await sock.sendMessage(jid, {
      text: `👋 *@${senderNumber}* ${frase} *@${n}*! 💥`,
      mentions: [t],
    }, { quoted: msg });
  },
};
