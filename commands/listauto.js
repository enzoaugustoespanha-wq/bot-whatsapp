import { PermissionLevel } from "../config/permissions.js";
import { getAutoRespostas } from "../utils/database.js";
export default {
  name: "listauto",
  aliases: ["listarespostas", "autolist"],
  description: "Lista respostas automáticas do grupo",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const respostas = getAutoRespostas(jid);
    const entries = Object.entries(respostas);
    if (!entries.length) return sock.sendMessage(jid, { text: "ℹ️ Nenhuma resposta automática configurada." }, { quoted: msg });
    const lista = entries.map(([k, v], i) => `${i + 1}. *${k}* → ${v.slice(0, 50)}`).join("\n");
    await sock.sendMessage(jid, { text: `🤖 *Respostas Automáticas (${entries.length})*\n\n${lista}` }, { quoted: msg });
  },
};
