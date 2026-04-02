import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menuvip", aliases: ["menuVIP","vipmenu"],
  description: "Menu VIP", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ ⭐ ${senderNumber}`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *✅ VIP PODE USAR*`,
      `┊`,
      `┊ 🪷 ${p}abrir / ${p}fechar / ${p}opengp / ${p}closegp`,
      `┊ 🪷 ${p}add        — Adicionar membro`,
      `┊ 🪷 ${p}del        — Apagar mensagem`,
      `┊ 🪷 ${p}linkgp     — Link do grupo`,
      `┊ 🪷 ${p}nomegrupo  — Nome do grupo`,
      `┊ 🪷 ${p}descgrupo  — Descrição`,
      `┊ 🪷 ${p}fotogrupo  — Foto do grupo`,
      `┊ 🪷 ${p}mencionar  — Marcar todos`,
      `┊ 🪷 ${p}h / ${p}hidetag / ${p}cita`,
      `┊ 🪷 ${p}fixar      — Fixar mensagem`,
      `┊ 🪷 ${p}times      — Sortear times`,
      `┊ 🪷 ${p}enquete    — Criar enquete`,
      `┊ 🪷 ${p}avisogrupo — Aviso`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *❌ VIP NÃO PODE*`,
      `┊ ban / mute / adv / promote / nuke`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `💡 _Fale com o dono para ser VIP_`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt }, { quoted: msg });
  },
};
