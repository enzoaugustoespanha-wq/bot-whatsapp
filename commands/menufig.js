import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menufig", aliases: ["menufigurinha","menufigurinhas","figmenu"],
  description: "Menu figurinhas", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ 👤 ${senderNumber}`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *🖼️ FIGURINHAS*`,
      `┊`,
      `┊ 🪷 ${p}sticker    — Criar figurinha`,
      `┊ 🪷 ${p}toimg      — Figurinha → imagem`,
      `┊ 🪷 ${p}ttp texto  — Figurinha de texto`,
      `┊ 🪷 ${p}attp texto — Figurinha animada`,
      `┊ 🪷 ${p}autofig    — Auto-figurinha`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `💡 _.sticker: envie imagem com o cmd_`,
      `💡 _.toimg: responda uma figurinha_`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt }, { quoted: msg });
  },
};
