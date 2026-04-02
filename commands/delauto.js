import { PermissionLevel } from "../config/permissions.js";
import { removeAutoResposta, getAutoRespostas } from "../utils/database.js";
export default {
  name: "delauto",
  aliases: ["rmresposta", "rmrespostaaut", "removerauto"],
  description: "Remove resposta automática. .delauto gatilho",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const gatilho = args.join(" ").toLowerCase().trim();
    if (!gatilho) return sock.sendMessage(jid, { text: "❌ Informe o gatilho para remover!\nVeja com *.listauto*" }, { quoted: msg });
    const respostas = getAutoRespostas(jid);
    if (!respostas[gatilho]) return sock.sendMessage(jid, { text: `❌ Gatilho *${gatilho}* não encontrado.` }, { quoted: msg });
    removeAutoResposta(jid, gatilho);
    await sock.sendMessage(jid, { text: `✅ Resposta automática *${gatilho}* removida!` }, { quoted: msg });
  },
};
