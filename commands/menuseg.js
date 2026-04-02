import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menuseg", aliases: ["menuseguranca","menusegurança","segmenu"],
  description: "Menu segurança", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, sender, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ 👤 ${senderNumber}`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *🔒 SEGURANÇA*`,
      `┊`,
      `┊ 🪷 ${p}antilink on/off     — Anti-link`,
      `┊ 🪷 ${p}antilinksoft on/off  — Modo suave`,
      `┊ 🪷 ${p}antilinkhard on/off  — Banir links`,
      `┊ 🪷 ${p}antiflood on [n] [s] — Anti-flood`,
      `┊ 🪷 ${p}antiporn on/off      — Anti-18`,
      `┊ 🪷 ${p}muteall tempo        — Silenciar gp`,
      `┊ 🪷 ${p}soadm               — Só admins`,
      `┊ 🪷 ${p}sodono              — Só dono`,
      `┊ 🪷 ${p}somembro            — Normal`,
      `┊ 🪷 ${p}autofig on/off      — Auto-figurinha`,
      `┊ 🪷 ${p}addnopref           — Palavra proibida`,
      `┊ 🪷 ${p}listnopref          — Listar palavras`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `💡 _on/off para ativar/desativar_`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt, mentions: [sender] }, { quoted: msg });
  },
};
