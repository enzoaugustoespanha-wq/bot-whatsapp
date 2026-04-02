import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menumembros", aliases: ["menumembro","membrosmenu"],
  description: "Menu membros", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ 👤 ${senderNumber}`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *👥 MEMBROS*`,
      `┊`,
      `┊ 🪷 ${p}ping       — Latência`,
      `┊ 🪷 ${p}info       — Info do bot`,
      `┊ 🪷 ${p}botinfo    — Info detalhada`,
      `┊ 🪷 ${p}horario    — Horário e uptime`,
      `┊ 🪷 ${p}testar     — Testar bot`,
      `┊ 🪷 ${p}atividadegp — Ranking`,
      `┊ 🪷 ${p}perfil     — Perfil user`,
      `┊ 🪷 ${p}myid       — Seu JID`,
      `┊ 🪷 ${p}dono       — Info do dono`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *🔧 UTILIDADES*`,
      `┊`,
      `┊ 🪷 ${p}calc       — Calculadora`,
      `┊ 🪷 ${p}cep        — Buscar CEP`,
      `┊ 🪷 ${p}traduzir   — Traduzir`,
      `┊ 🪷 ${p}encurtar   — Encurtar link`,
      `┊ 🪷 ${p}r          — Ver view-once`,
      `┊ 🪷 ${p}ship       — Compatibilidade`,
      `┊ 🪷 ${p}regras     — Regras do grupo`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt }, { quoted: msg });
  },
};
