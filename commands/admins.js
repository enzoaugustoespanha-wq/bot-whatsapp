import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "admins",
  aliases: ["listaradmins", "listadmins", "veradmins"],
  description: "Lista os admins do grupo",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(() => null);
    if (!gd) return sock.sendMessage(jid, { text: "❌ Não consegui obter dados." }, { quoted: msg });
    const admins = gd.participants.filter(p => p.admin);
    if (!admins.length) return sock.sendMessage(jid, { text: "ℹ️ Nenhum admin encontrado." }, { quoted: msg });
    const lista = admins.map((p, i) => `${i + 1}. @${p.id.split("@")[0]}${p.admin === "superadmin" ? " 👑" : " 🛡️"}`).join("\n");
    await sock.sendMessage(jid, {
      text: [`👮 *Administradores (${admins.length})*`, ``, lista].join("\n"),
      mentions: admins.map(p => p.id),
    }, { quoted: msg });
  },
};
