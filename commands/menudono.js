import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menudono", aliases: ["menuowner","donmenu"],
  description: "Menu dono", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ 👑 ${senderNumber}`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *🤖 BOT*`,
      `┊`,
      `┊ 🪷 ${p}boton      — Ativar bot`,
      `┊ 🪷 ${p}botoff     — Desativar bot`,
      `┊ 🪷 ${p}rr         — Reiniciar`,
      `┊ 🪷 ${p}setnome    — Nome do bot`,
      `┊ 🪷 ${p}setfoto    — Foto do bot`,
      `┊ 🪷 ${p}status     — Status sistema`,
      `┊ 🪷 ${p}memoria    — Dados db`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *🔧 CONTROLE DE GRUPO*`,
      `┊`,
      `┊ 🪷 ${p}soadm      — Só admins`,
      `┊ 🪷 ${p}sodono     — Só dono`,
      `┊ 🪷 ${p}somembro   — Modo normal`,
      `┊ 🪷 ${p}nuke       — Limpar grupo`,
      `┊ 🪷 ${p}setprefixo — Mudar prefixo`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *⭐ VIP*`,
      `┊`,
      `┊ 🪷 ${p}addvip     — Adicionar VIP`,
      `┊ 🪷 ${p}rmvip      — Remover VIP`,
      `┊ 🪷 ${p}listvip    — Listar VIPs`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *🌍 GLOBAL*`,
      `┊`,
      `┊ 🪷 ${p}addblackglobal — Ban global`,
      `┊ 🪷 ${p}rmblackglobal  — Remover ban`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `⚠️ _Apenas o dono tem acesso_`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt }, { quoted: msg });
  },
};
