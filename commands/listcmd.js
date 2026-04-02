import { PermissionLevel } from "../config/permissions.js";
import { getCmdsCustom } from "../utils/database.js";
export default {
  name: "listcmd",
  aliases: ["listarcomandos", "cmdlist", "meuscomandos"],
  description: "Lista comandos personalizados do grupo",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup, prefix }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const cmds = getCmdsCustom(jid);
    const entries = Object.entries(cmds);
    if (!entries.length) return sock.sendMessage(jid, { text: "ℹ️ Nenhum comando personalizado criado." }, { quoted: msg });
    const lista = entries.map(([k], i) => `${i + 1}. *${prefix}${k}*`).join("\n");
    await sock.sendMessage(jid, { text: `🤖 *Comandos Personalizados (${entries.length})*\n\n${lista}` }, { quoted: msg });
  },
};
