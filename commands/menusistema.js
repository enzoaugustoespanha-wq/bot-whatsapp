import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menusistema", aliases: ["menusis","sistemamenu"],
  description: "Menu sistema", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ 👤 ${senderNumber}`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *📊 SISTEMA*`,
      `┊`,
      `┊ 🪷 ${p}ping         — Latência`,
      `┊ 🪷 ${p}info         — Info do bot`,
      `┊ 🪷 ${p}botinfo      — Info detalhada`,
      `┊ 🪷 ${p}horario      — Horário/uptime`,
      `┊ 🪷 ${p}uptime       — Tempo online`,
      `┊ 🪷 ${p}testar       — Testar bot`,
      `┊ 🪷 ${p}atividadegp  — Ranking atividade`,
      `┊ 🪷 ${p}msgcount     — Total mensagens`,
      `┊ 🪷 ${p}grupoinfo    — Info do grupo`,
      `┊ 🪷 ${p}contar       — Contar membros`,
      `┊ 🪷 ${p}admins       — Listar admins`,
      `┊ 🪷 ${p}resumo       — Resumo do grupo`,
      `┊ 🪷 ${p}status       — Status sistema (dono)`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt }, { quoted: msg });
  },
};
