import { PermissionLevel } from "../config/permissions.js";
import { getLogBans } from "../utils/database.js";
export default {
  name: "logban", aliases: ["logbans","historicoban","hban"],
  description: "Histórico de bans do grupo", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const logs = getLogBans(jid);
    if (!logs.length) return sock.sendMessage(jid, { text: "ℹ️ Nenhum ban registrado." }, { quoted: msg });
    const lista = logs.slice(-15).reverse().map((l,i)=>`${i+1}. +${l.numero} | ${l.motivo} | ${l.duracao||"perm"} | ${l.quando}`).join("\n");
    await sock.sendMessage(jid, { text: `📜 *Log de Bans (últimos ${Math.min(logs.length,15)})*\n\n${lista}` }, { quoted: msg });
  },
};
