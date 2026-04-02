import { PermissionLevel } from "../config/permissions.js";
import { getAgendamentos, removeAgendamento } from "../utils/database.js";
import { formatTime } from "../utils/parseTime.js";
export default {
  name: "agenda", aliases: ["agendamentos","eventos","alertas"],
  description: "Lista agendamentos", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const todos = getAgendamentos().filter(a=>a.jid===jid);
    if (!todos.length) return sock.sendMessage(jid, { text: "📅 Nenhum agendamento." }, { quoted: msg });
    const linhas = todos.map((a,i)=>{const r=Math.max(0,a.expireAt-Date.now());return `${i+1}. [${a.tipo}] em *${formatTime(r)}*\n   ID: \`${a.id}\``;}).join("\n\n");
    await sock.sendMessage(jid, { text: `📅 *Agendamentos*\n\n${linhas}\n\nCancelar: *.cancelaragenda <ID>*` }, { quoted: msg });
  },
};
