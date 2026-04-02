import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "setfoto", aliases: ["mudarfoto","botfoto"],
  description: "Muda foto do bot (dono). Envie/responda imagem.", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid }) {
    const direct = msg.message?.imageMessage;
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const quoted = ctx?.quotedMessage?.imageMessage;
    if (!direct && !quoted) return sock.sendMessage(jid, { text: "❌ Envie/responda uma imagem com *.setfoto*" }, { quoted: msg });
    try {
      const buf = direct ? await sock.downloadMediaMessage(msg) : await sock.downloadMediaMessage({ message: ctx.quotedMessage, key: { remoteJid: jid, fromMe: false, id: ctx.stanzaId } });
      await sock.updateProfilePicture(sock.user.id, buf);
      await sock.sendMessage(jid, { text: "✅ *Foto do bot atualizada!*" }, { quoted: msg });
    } catch (e) { await sock.sendMessage(jid, { text: `❌ Erro: ${e.message}` }, { quoted: msg }); }
  },
};
