import { PermissionLevel } from "../config/permissions.js";
import { removeRegra, getRegras } from "../utils/database.js";
export default {
  name: "rmregra",
  aliases: ["rmrule", "removeregra", "deletarregra"],
  description: "Remove uma regra pelo número. .rmregra 1",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const idx = parseInt(args[0]) - 1;
    const regras = getRegras(jid);
    if (isNaN(idx) || idx < 0 || idx >= regras.length) return sock.sendMessage(jid, { text: `❌ Número inválido! Use *.regras* para ver (1 a ${regras.length}).` }, { quoted: msg });
    const removed = regras[idx];
    removeRegra(jid, idx);
    await sock.sendMessage(jid, { text: `✅ Regra ${idx + 1} removida!\n🗑️ *${removed}*` }, { quoted: msg });
  },
};
