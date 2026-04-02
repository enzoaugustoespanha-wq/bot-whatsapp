import { PermissionLevel } from "../config/permissions.js";
import { setPrefixo, getPrefixo } from "../utils/database.js";
export default {
  name: "setprefixo",
  aliases: ["changeprefix", "prefixo", "mudarprefixo"],
  description: "Muda o prefixo do bot neste grupo (dono). .setprefixo !",
  permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const novo = args[0]?.trim();
    if (!novo) {
      const atual = getPrefixo(jid);
      return sock.sendMessage(jid, { text: `⚙️ Prefixo atual neste grupo: *${atual || "padrão"}*\nPara alterar: *.setprefixo !*` }, { quoted: msg });
    }
    if (novo.length > 3) return sock.sendMessage(jid, { text: "❌ Prefixo deve ter no máximo 3 caracteres." }, { quoted: msg });
    setPrefixo(jid, novo);
    await sock.sendMessage(jid, { text: `✅ Prefixo alterado para *${novo}* neste grupo!` }, { quoted: msg });
  },
};
