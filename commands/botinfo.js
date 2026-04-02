import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
export default {
  name: "botinfo",
  aliases: ["sobre2", "aboutbot"],
  description: "Informações detalhadas do bot",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, botJid }) {
    const botNum = botJid?.split(":")[0].split("@")[0] || "?";
    const up = Math.floor(process.uptime());
    const h = Math.floor(up / 3600), m = Math.floor((up % 3600) / 60);
    await sock.sendMessage(jid, { text: [
      `🤖 *${config.botName}*`, ``,
      `👑 Dono: *${config.ownerName}*`,
      `📱 Número: *+${config.owner}*`,
      `⚙️ Prefixo: *${config.prefix}*`,
      `📦 Biblioteca: @whiskeysockets/baileys`,
      `🟢 Node: *${process.version}*`,
      `⏱️ Online há: *${h}h ${m}m*`,
    ].join("\n") }, { quoted: msg });
  },
};
