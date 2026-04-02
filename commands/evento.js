import { PermissionLevel } from "../config/permissions.js";
import { addAgendamento } from "../utils/database.js";
import { parseTime, formatTime } from "../utils/parseTime.js";
export default {
  name: "evento", aliases: ["event","agendar"],
  description: "Agendamento de evento. .evento 2h Reunião", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const ms = parseTime(args[0]);
    if (!ms) return sock.sendMessage(jid, { text: "❌ Ex: *.evento 2h Reunião do grupo*" }, { quoted: msg });
    const mensagem = args.slice(1).join(" ");
    if (!mensagem) return sock.sendMessage(jid, { text: "❌ Informe a mensagem!" }, { quoted: msg });
    const id = addAgendamento({ jid, expireAt: Date.now()+ms, tipo:"evento", mensagem: `📢 *EVENTO*\n\n${mensagem}` });
    await sock.sendMessage(jid, { text: `📅 Evento em *${formatTime(ms)}*\n📋 ${mensagem}\n🆔 \`${id}\`` }, { quoted: msg });
  },
};
