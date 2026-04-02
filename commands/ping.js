/**
 * Comando: ping
 * Verifica se o bot está online e mede a latência
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "ping",
  aliases: ["p", "latencia"],
  description: "Verifica se o bot está online",
  usage: "!ping",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid }) {
    const start = Date.now();
    const sent = await sock.sendMessage(jid, { text: "🏓 Calculando latência..." }, { quoted: msg });
    const latency = Date.now() - start;

    await sock.sendMessage(
      jid,
      {
        text: `🏓 *Pong!*\n\n⚡ Latência: *${latency}ms*\n✅ Bot está online e funcionando!`,
        edit: sent.key,
      }
    );
  },
};
