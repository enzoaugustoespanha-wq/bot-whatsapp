import { PermissionLevel } from "../config/permissions.js";
const frases = [
  "foi pego(a) em flagrante com 😳",
  "mandou mensagem apagada pra",
  "foi visto(a) no cinema com",
  "tava no story do grupo com",
  "foi flagrado(a) dando like antigo nos posts de",
  "estava tramando uma aliança secreta com",
  "foi visto(a) trocando figurinha com",
  "apagou as mensagens mas o bot viu tudo... era com",
];
export default {
  name: "trair",
  aliases: ["traicao", "flagra"],
  description: "Flagra uma traição fictícia no grupo 😂. .trair @user",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, getTarget, senderNumber }) {
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Mencione ou responda alguém!\nEx: *.trair @user*" }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    await sock.sendMessage(jid, {
      text: `🚨 *FLAGRA DO BOT!* 🚨\n\n😱 *@${senderNumber}* ${frase} *@${n}*!\n\n📸 _Grupo todo presenciou_ 👀`,
      mentions: [t],
    }, { quoted: msg });
  },
};
