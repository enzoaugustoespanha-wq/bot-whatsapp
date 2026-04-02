import { PermissionLevel } from "../config/permissions.js";
import { getRegras } from "../utils/database.js";
export default {
  name: "regras",
  aliases: ["rules", "normas", "verregras"],
  description: "Mostra as regras do grupo",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const regras = getRegras(jid);
    if (!regras.length) return sock.sendMessage(jid, { text: "ℹ️ Nenhuma regra cadastrada.\nAdmins podem adicionar com *.addregra*" }, { quoted: msg });
    const lista = regras.map((r, i) => `*${i + 1}.* ${r}`).join("\n");
    await sock.sendMessage(jid, { text: `📜 *REGRAS DO GRUPO*\n\n${lista}` }, { quoted: msg });
  },
};
