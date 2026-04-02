import { PermissionLevel } from "../config/permissions.js";
const frases = [
  "deu um abraço apertado em 🤗",
  "chegou chegando com um abraço de urso em 🐻",
  "abraçou forte e não quis soltar",
  "deu um abraço gostoso naquele estilo confortável em",
  "correu e se jogou em cima de 😂",
  "abraçou de longe (era da base) 🫂",
];
export default {
  name: "abracar",
  aliases: ["abraço", "abraco", "hug"],
  description: "Abraça alguém do grupo. .abracar @user",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, getTarget, senderNumber }) {
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Mencione ou responda alguém!\nEx: *.abracar @user*" }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    await sock.sendMessage(jid, {
      text: `🫂 *@${senderNumber}* ${frase} *@${n}*`,
      mentions: [t],
    }, { quoted: msg });
  },
};
