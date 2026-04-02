import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "encaminhar", aliases: ["forward","enc","fwd"],
  description: "Encaminha msg respondida. .encaminhar (responda a msg)", permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, args }) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const quoted = ctx?.quotedMessage;
    if (!quoted) return sock.sendMessage(jid, { text: "❌ Responda a mensagem que deseja encaminhar!\nPor enquanto encaminha pro mesmo grupo." }, { quoted: msg });
    const content = quoted.conversation || quoted.extendedTextMessage?.text;
    if (!content) return sock.sendMessage(jid, { text: "❌ Só consigo encaminhar mensagens de texto." }, { quoted: msg });
    await sock.sendMessage(jid, { text: `📤 *Mensagem encaminhada:*\n\n${content}` });
  },
};
