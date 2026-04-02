import { PermissionLevel } from "../config/permissions.js";
const frases = [
  "deu um chute voador em 🦵",
  "chutou longe daqui 🥾",
  "foi de carrinho rasteiro em 😂",
  "chutou de canto e nem olhou pra trás 😤",
  "deu uma rasteira seguida de chute em",
  "chutou tanto que foi parar em outro grupo",
];
export default {
  name: "chutar",
  aliases: ["chute", "kick2", "bater"],
  description: "Chuta alguém do grupo (só de brincadeira). .chutar @user",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, getTarget, senderNumber }) {
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Mencione ou responda alguém!\nEx: *.chutar @user*" }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    await sock.sendMessage(jid, {
      text: `🦵 *@${senderNumber}* ${frase} *@${n}* 💥`,
      mentions: [t],
    }, { quoted: msg });
  },
};
