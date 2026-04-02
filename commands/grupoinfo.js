import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "grupoinfo",
  aliases: ["ginfo", "infogrupo", "infogp"],
  description: "Informações completas do grupo",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(() => null);
    if (!gd) return sock.sendMessage(jid, { text: "❌ Não consegui obter dados." }, { quoted: msg });
    const admins = gd.participants.filter(p => p.admin).length;
    const total = gd.participants.length;
    const criado = new Date(gd.creation * 1000).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
    await sock.sendMessage(jid, {
      text: [`📊 *Informações do Grupo*`, ``, `📛 Nome: *${gd.subject}*`, `🆔 JID: \`${jid}\``, `📅 Criado: ${criado}`, `👥 Membros: *${total}*`, `👮 Admins: *${admins}*`, `📝 Descrição: ${gd.desc || "Sem descrição"}`].join("\n"),
    }, { quoted: msg });
  },
};
