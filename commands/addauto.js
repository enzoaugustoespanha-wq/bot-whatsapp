import { PermissionLevel } from "../config/permissions.js";
import { addAutoResposta } from "../utils/database.js";
export default {
  name: "addauto",
  aliases: ["addresposta", "addrespostaaut"],
  description: "Adiciona resposta automática. .addauto gatilho | resposta",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const full = args.join(" ");
    const sep = full.indexOf("|");
    if (sep === -1) return sock.sendMessage(jid, { text: "❌ Separe com *|*\nEx: *.addauto oi | Olá! Seja bem-vindo!*" }, { quoted: msg });
    const gatilho = full.slice(0, sep).trim().toLowerCase();
    const resposta = full.slice(sep + 1).trim();
    if (!gatilho || !resposta) return sock.sendMessage(jid, { text: "❌ Informe gatilho e resposta!" }, { quoted: msg });
    addAutoResposta(jid, gatilho, resposta);
    await sock.sendMessage(jid, { text: `✅ *Resposta automática adicionada!*\n\n🔑 Gatilho: *${gatilho}*\n💬 Resposta: ${resposta}` }, { quoted: msg });
  },
};
