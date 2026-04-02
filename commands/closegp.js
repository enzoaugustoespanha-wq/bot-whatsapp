import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "closegp",
  aliases: ["fechargrupo", "closegroup"],
  description: "Fecha o grupo (alias de .fechar)",
  permission: PermissionLevel.ADMIN, allowVip: true,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    try { await sock.groupSettingUpdate(jid, "announcement"); await sock.sendMessage(jid, { text: "🔒 *Grupo Fechado!* Apenas admins podem enviar." }, { quoted: msg }); }
    catch { await sock.sendMessage(jid, { text: "❌ Não consegui. Sou admin?" }, { quoted: msg }); }
  },
};
