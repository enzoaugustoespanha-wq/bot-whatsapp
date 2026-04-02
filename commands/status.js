import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
import os from "os";

export default {
  name: "status",
  aliases: ["sistema", "system"],
  description: "Status completo do sistema (apenas dono)",
  permission: PermissionLevel.OWNER,

  async execute({ sock, msg, jid }) {
    const uptime = process.uptime();
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);

    const mem = process.memoryUsage();
    const heapUsed = (mem.heapUsed / 1024 / 1024).toFixed(2);
    const heapTotal = (mem.heapTotal / 1024 / 1024).toFixed(2);
    const rss = (mem.rss / 1024 / 1024).toFixed(2);

    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const usedMem = (totalMem - freeMem).toFixed(2);

    const cpus = os.cpus();
    const cpuModel = cpus[0]?.model || "Desconhecido";
    const cpuCount = cpus.length;

    const text = [
      `🖥️ *Status do Sistema*`,
      ``,
      `🤖 *Bot*`,
      `├ Nome: ${config.botName}`,
      `├ Prefixo: ${config.prefix}`,
      `└ Uptime: ${h}h ${m}m ${s}s`,
      ``,
      `🟢 *Node.js*`,
      `├ Versão: ${process.version}`,
      `├ Heap: ${heapUsed}MB / ${heapTotal}MB`,
      `└ RSS: ${rss}MB`,
      ``,
      `💾 *Memória RAM*`,
      `├ Total: ${totalMem}GB`,
      `├ Usada: ${usedMem}GB`,
      `└ Livre: ${freeMem}GB`,
      ``,
      `⚙️ *CPU*`,
      `├ Modelo: ${cpuModel.trim()}`,
      `└ Núcleos: ${cpuCount}`,
      ``,
      `💻 *Sistema*`,
      `├ OS: ${os.type()} ${os.release()}`,
      `└ Plataforma: ${os.platform()}`,
    ].join("\n");

    await sock.sendMessage(jid, { text }, { quoted: msg });
  },
};
