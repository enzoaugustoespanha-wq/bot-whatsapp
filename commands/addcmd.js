import { PermissionLevel } from "../config/permissions.js";
import { addCmdCustom } from "../utils/database.js";
export default {
  name: "addcmd",
  aliases: ["criarcomando", "cmdcustom"],
  description: "Cria comando personalizado. .addcmd nome | resposta",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const full = args.join(" ");
    const sep = full.indexOf("|");
    if (sep === -1) return sock.sendMessage(jid, { text: "❌ Separe com *|*\nEx: *.addcmd regras | Proibido flood e links!*" }, { quoted: msg });
    const nome = full.slice(0, sep).trim().toLowerCase().replace(/\s+/g, "");
    const resposta = full.slice(sep + 1).trim();
    if (!nome || !resposta) return sock.sendMessage(jid, { text: "❌ Informe nome e resposta!" }, { quoted: msg });
    addCmdCustom(jid, nome, resposta);
    await sock.sendMessage(jid, { text: `✅ Comando *.${nome}* criado!\n\n💬 Resposta: ${resposta.slice(0, 100)}` }, { quoted: msg });
  },
};
