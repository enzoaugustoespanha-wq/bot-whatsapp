import { PermissionLevel } from "../config/permissions.js";
const frases = [
  "deu um beijão na bochecha 😘",
  "foi lá e beijou de surpresa 😳",
  "plantou um beijinho fofo 🥰",
  "chegou chegando com um beijo de cinema 🎬💋",
  "tentou beijar mas escorregou no tapete 😂",
  "deu um selinho envergonhado e saiu correndo 🏃💨",
  "foi de beijo voador 😗💨",
  "esperou a hora certa e partiu pro beijo perfeito 💫",
];
export default {
  name: "beijar",
  aliases: ["beijo", "kiss"],
  description: "Beija alguém do grupo. .beijar @user",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, getTarget, senderNumber }) {
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Mencione ou responda alguém!\nEx: *.beijar @user*" }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    await sock.sendMessage(jid, {
      text: `💋 *@${senderNumber}* ${frase} *@${n}*`,
      mentions: [t],
    }, { quoted: msg });
  },
};
