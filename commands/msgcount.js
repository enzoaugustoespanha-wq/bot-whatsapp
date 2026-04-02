import { PermissionLevel } from "../config/permissions.js";
import { getAtividade } from "../utils/database.js";
export default {
  name: "msgcount",
  aliases: ["contarmensagens", "msgs", "totalmsgs"],
  description: "Mostra total de mensagens registradas no grupo",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const atividade = getAtividade(jid);
    const total = Object.values(atividade).reduce((a, b) => a + b, 0);
    const usuarios = Object.keys(atividade).length;
    await sock.sendMessage(jid, { text: [`💬 *Mensagens do Grupo*`, ``, `📊 Total registrado: *${total}* msgs`, `👥 Usuários ativos: *${usuarios}*`, ``, `_(desde o último reinício)_`].join("\n") }, { quoted: msg });
  },
};
