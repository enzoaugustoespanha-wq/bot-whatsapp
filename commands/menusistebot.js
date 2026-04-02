import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menusistebot", aliases: ["menusistemabot","menubotsis"],
  description: "Menu sistema bot (dono)", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ 👑 ${senderNumber}`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *🤖 SISTEMA DO BOT*`,
      `┊`,
      `┊ 🪷 ${p}boton      — Ativar bot`,
      `┊ 🪷 ${p}botoff     — Desativar bot`,
      `┊ 🪷 ${p}modo       — Modo do bot`,
      `┊ 🪷 ${p}rr         — Reiniciar`,
      `┊ 🪷 ${p}status     — Status`,
      `┊ 🪷 ${p}memoria    — Dados db`,
      `┊ 🪷 ${p}soadm      — Só admins`,
      `┊ 🪷 ${p}sodono     — Só dono`,
      `┊ 🪷 ${p}somembro   — Normal`,
      `┊ 🪷 ${p}nuke       — Limpar grupo`,
      `┊ 🪷 ${p}setprefixo — Mudar prefixo`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `⚠️ _Apenas o dono!_`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt }, { quoted: msg });
  },
};
