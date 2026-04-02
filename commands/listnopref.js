import { PermissionLevel } from "../config/permissions.js";
import { getPalavrasProibidas } from "../utils/database.js";
export default {
  name: "listnopref",
  aliases: ["listpalavras", "palavrasproibidas"],
  description: "Lista palavras proibidas do grupo",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const palavras = getPalavrasProibidas(jid);
    if (!palavras.length) return sock.sendMessage(jid, { text: "ℹ️ Nenhuma palavra proibida." }, { quoted: msg });
    await sock.sendMessage(jid, { text: `🚫 *Palavras Proibidas (${palavras.length})*\n\n${palavras.map((p, i) => `${i + 1}. ${p}`).join("\n")}` }, { quoted: msg });
  },
};
