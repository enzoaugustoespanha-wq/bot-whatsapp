import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menuextras", aliases: ["menuextra","extras"],
  description: "Menu extras", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ 👤 ${senderNumber}`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *💼 EXTRAS*`,
      `┊`,
      `┊ 🪷 ${p}r          — Ver view-once`,
      `┊ 🪷 ${p}spy        — Modo spy (em breve)`,
      `┊ 🪷 ${p}kickghost  — Remover ghosts`,
      `┊ 🪷 ${p}revoke     — Resetar link`,
      `┊ 🪷 ${p}enquete    — Criar enquete`,
      `┊ 🪷 ${p}avisogrupo — Aviso oficial`,
      `┊ 🪷 ${p}resumo     — Resumo do grupo`,
      `┊ 🪷 ${p}membros    — Listar membros`,
      `┊ 🪷 ${p}admins     — Listar admins`,
      `┊ 🪷 ${p}contar     — Contar membros`,
      `┊ 🪷 ${p}grupoinfo  — Info do grupo`,
      `┊ 🪷 ${p}myid       — Ver seu ID`,
      `┊ 🪷 ${p}id         — Ver ID de alguém`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt }, { quoted: msg });
  },
};
