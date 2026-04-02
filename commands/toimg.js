import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "toimg",
  aliases: ["stickertoimg", "stimg", "s2img", "figimg"],
  description: "Converte figurinha em imagem. Responda uma figurinha.",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid }) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const quoted = ctx?.quotedMessage;
    if (!quoted?.stickerMessage) return sock.sendMessage(jid, { text: "❌ Responda uma *figurinha*!" }, { quoted: msg });
    try {
      const buf = await sock.downloadMediaMessage({ message: quoted, key: { remoteJid: jid, fromMe: false, id: ctx.stanzaId } });
      await sock.sendMessage(jid, { image: buf, caption: "🖼️ Figurinha → Imagem" }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(jid, { text: `❌ Erro: ${e.message}` }, { quoted: msg });
    }
  },
};
