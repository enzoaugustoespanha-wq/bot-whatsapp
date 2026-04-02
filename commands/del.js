import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "del",
  aliases: ["deletar","apagar","d","rmsg"],
  description: "Apaga mensagem respondida",
  permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    if (!ctx?.stanzaId || !ctx?.participant) return sock.sendMessage(jid, { text: "❌ Responda a mensagem que deseja apagar!" }, { quoted: msg });
    try {
      await sock.sendMessage(jid, { delete: { remoteJid: jid, fromMe: false, id: ctx.stanzaId, participant: ctx.participant } });
      await sock.sendMessage(jid, { delete: msg.key });
    } catch {
      await sock.sendMessage(jid, { text: "❌ Não consegui apagar. Preciso ser admin." }, { quoted: msg });
    }
  },
};
