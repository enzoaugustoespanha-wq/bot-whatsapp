import { PermissionLevel } from "../config/permissions.js";
import { removeAgendamento, getAgendamentos } from "../utils/database.js";
export default {
  name: "cancelaragenda", aliases: ["cancevent","rmevento","rmagenda"],
  description: "Cancela agendamento. .cancelaragenda <ID>", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    if (!args[0]) return sock.sendMessage(jid, { text: "❌ Informe o ID! Use *.agenda* para ver." }, { quoted: msg });
    const item = getAgendamentos().find(a=>a.id===args[0]&&a.jid===jid);
    if (!item) return sock.sendMessage(jid, { text: `❌ ID \`${args[0]}\` não encontrado.` }, { quoted: msg });
    removeAgendamento(args[0]);
    await sock.sendMessage(jid, { text: `✅ Agendamento \`${args[0]}\` cancelado!` }, { quoted: msg });
  },
};
