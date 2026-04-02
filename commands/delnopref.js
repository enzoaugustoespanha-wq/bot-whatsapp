import { PermissionLevel } from "../config/permissions.js";
import { removePalavraProibida } from "../utils/database.js";
export default {
  name: "delnopref",
  aliases: ["rmpalavra", "rmproibida", "removernopref"],
  description: "Remove palavra proibida. .delnopref palavra",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const palavra = args.join(" ").toLowerCase().trim();
    if (!palavra) return sock.sendMessage(jid, { text: "❌ Informe a palavra!\nVeja com *.listnopref*" }, { quoted: msg });
    removePalavraProibida(jid, palavra);
    await sock.sendMessage(jid, { text: `✅ Palavra *${palavra}* removida da lista!` }, { quoted: msg });
  },
};
