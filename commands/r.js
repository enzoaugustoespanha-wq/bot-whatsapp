import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "r",
  aliases: ["viewonce", "antiview", "antivonce"],
  description: "Visualiza mensagem de visualização única (responda a mensagem)",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid }) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const quoted = ctx?.quotedMessage;
    if (!quoted) return sock.sendMessage(jid, { text: "❌ Responda uma mensagem de visualização única!" }, { quoted: msg });
    // Check if it's a view-once message
    const viewOnce = quoted?.viewOnceMessage?.message || quoted?.viewOnceMessageV2?.message || quoted?.viewOnceMessageV2Extension?.message;
    const innerMsg = viewOnce || quoted;
    const imgMsg = innerMsg?.imageMessage || (viewOnce?.imageMessage);
    const vidMsg = innerMsg?.videoMessage || (viewOnce?.videoMessage);
    const audioMsg = innerMsg?.audioMessage || (viewOnce?.audioMessage);
    if (!imgMsg && !vidMsg && !audioMsg) return sock.sendMessage(jid, { text: "❌ Não encontrei mídia na mensagem respondida." }, { quoted: msg });
    try {
      const buf = await sock.downloadMediaMessage({ message: innerMsg, key: { remoteJid: jid, fromMe: false, id: ctx.stanzaId } });
      if (imgMsg) { await sock.sendMessage(jid, { image: buf, caption: "🔓 Imagem recuperada!" }, { quoted: msg }); }
      else if (vidMsg) { await sock.sendMessage(jid, { video: buf, caption: "🔓 Vídeo recuperado!" }, { quoted: msg }); }
      else if (audioMsg) { await sock.sendMessage(jid, { audio: buf, mimetype: "audio/mp4" }, { quoted: msg }); }
    } catch (e) {
      await sock.sendMessage(jid, { text: `❌ Não consegui recuperar: ${e.message}` }, { quoted: msg });
    }
  },
};
