import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menu", aliases: ["start","ajuda","help","comandos","inicio"],
  description: "Menu principal", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, sender, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ Olá, @${senderNumber}!`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *📋 MENUS DISPONÍVEIS*`,
      `┊`,
      `┊ 🪷 ${p}menuadm     — Admins`,
      `┊ 🪷 ${p}menuadmav   — Adm avançado`,
      `┊ 🪷 ${p}menuseg     — Segurança`,
      `┊ 🪷 ${p}menusistema — Sistema`,
      `┊ 🪷 ${p}menumembros — Membros`,
      `┊ 🪷 ${p}menubrinca  — Brincadeiras`,
      `┊ 🪷 ${p}menufig     — Figurinhas`,
      `┊ 🪷 ${p}menuvip     — VIP`,
      `┊ 🪷 ${p}menudono    — Dono`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `⚙️ Prefixo: *${p}* | Dono: *${config.ownerName}*`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt, mentions: [sender] }, { quoted: msg });
  },
};
