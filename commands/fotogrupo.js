import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "fotogrupo", aliases: ["setfotogrupo","fotogp","imggrupo"],
  description: "Muda foto do grupo. Envie imagem com o cmd.", permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const direct = msg.message?.imageMessage;
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const quoted = ctx?.quotedMessage?.imageMessage;
    if (!direct && !quoted) return sock.sendMessage(jid, { text: "❌ Envie imagem com *.fotogrupo* como legenda\nou responda uma imagem." }, { quoted: msg });
    try {
      const buf = direct ? await sock.downloadMediaMessage(msg) : await sock.downloadMediaMessage({ message: ctx.quotedMessage, key: { remoteJid: jid, fromMe: false, id: ctx.stanzaId } });
      await sock.updateProfilePicture(jid, buf);
      await sock.sendMessage(jid, { text: "✅ *Foto do grupo atualizada!*" }, { quoted: msg });
    } catch (e) { await sock.sendMessage(jid, { text: `❌ Erro: ${e.message}` }, { quoted: msg }); }
  },
};
