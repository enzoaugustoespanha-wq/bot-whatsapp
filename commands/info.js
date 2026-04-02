/**
 * Comando: info
 * Exibe informações sobre o bot
 */

import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
import os from "os";

export default {
  name: "info",
  aliases: ["sobre", "about"],
  description: "Exibe informações sobre o bot",
  usage: "!info",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid }) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const memUsage = process.memoryUsage();
    const memMB = (memUsage.heapUsed / 1024 / 1024).toFixed(2);

    const text = [
      `🤖 *Informações do Bot*`,
      ``,
      `📛 Nome: *${config.botName}*`,
      `⚙️ Prefixo: *${config.prefix}*`,
      `📦 Biblioteca: *@whiskeysockets/baileys*`,
      `🟢 Node.js: *${process.version}*`,
      ``,
      `⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s`,
      `🧠 *Memória RAM:* ${memMB} MB`,
      `💻 *Sistema:* ${os.type()} ${os.release()}`,
      ``,
      `✅ Bot funcionando normalmente!`,
    ].join("\n");

    await sock.sendMessage(jid, { text }, { quoted: msg });
  },
};
