import { addAgendamento } from "../utils/database.js";
import { parseTime, formatTime } from "../utils/parseTime.js";
export default {
  name: "alerta", aliases: ["alert","lembrete","remind"],
  description: "Mensagem agendada. .alerta 30m texto", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const ms = parseTime(args[0]);
    if (!ms) return sock.sendMessage(jid, { text: "❌ Ex: *.alerta 30m Fechar inscrições*" }, { quoted: msg });
    const mensagem = args.slice(1).join(" ");
    if (!mensagem) return sock.sendMessage(jid, { text: "❌ Informe a mensagem!" }, { quoted: msg });
    const id = addAgendamento({ jid, expireAt: Date.now()+ms, tipo:"alerta", mensagem: `🔔 *ALERTA*\n\n${mensagem}` });
    await sock.sendMessage(jid, { text: `🔔 Alerta em *${formatTime(ms)}*\n📋 ${mensagem}\n🆔 \`${id}\`` }, { quoted: msg });
  },
};
