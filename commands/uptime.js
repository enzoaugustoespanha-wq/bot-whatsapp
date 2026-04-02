import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "uptime",
  aliases: ["tempoativo", "online2", "botonline"],
  description: "Tempo online do bot",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid }) {
    const up = Math.floor(process.uptime());
    const d = Math.floor(up / 86400), h = Math.floor((up % 86400) / 3600), m = Math.floor((up % 3600) / 60), s = up % 60;
    await sock.sendMessage(jid, { text: `⏱️ *Bot online há:*\n\n${d > 0 ? `*${d}d* ` : ""}*${h}h* *${m}m* *${s}s*` }, { quoted: msg });
  },
};
