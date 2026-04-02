import { PermissionLevel } from "../config/permissions.js";
import { getHistorico } from "../utils/database.js";
export default {
  name: "historico", aliases: ["hist","logs","logusuario"],
  description: "Histórico de ações do usuário", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, getTarget }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const target = getTarget();
    if (!target) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione" }, { quoted: msg });
    const numero = target.split("@")[0].split(":")[0];
    const hist = getHistorico(jid, target);
    if (!hist.length) return sock.sendMessage(jid, { text: `ℹ️ @${numero} sem histórico.`, mentions: [target] }, { quoted: msg });
    const linhas = hist.slice(-15).map((h,i)=>`${i+1}. ${h.acao} — ${h.quando}`).join("\n");
    await sock.sendMessage(jid, { text: `📜 *Histórico @${numero}*\n\n${linhas}`, mentions: [target] }, { quoted: msg });
  },
};
