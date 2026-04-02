import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "membros",
  aliases: ["listarmembros","listar","listmembros"],
  description: "Lista todos os membros do grupo",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(() => null);
    if (!gd) return sock.sendMessage(jid, { text: "❌ Não consegui obter dados." }, { quoted: msg });
    const lista = gd.participants.map((p, i) => `${i + 1}. @${p.id.split("@")[0]}${p.admin ? " 👮" : ""}`).join("\n");
    await sock.sendMessage(jid, {
      text: [`👥 *Membros (${gd.participants.length})*`, ``, lista.slice(0, 3000)].join("\n"),
      mentions: gd.participants.map(p => p.id),
    }, { quoted: msg });
  },
};
