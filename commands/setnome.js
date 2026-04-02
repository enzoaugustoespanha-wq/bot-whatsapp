import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "setnome", aliases: ["mudarnome","botname","changenome"],
  description: "Muda nome do bot (dono)", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, args }) {
    const nome = args.join(" ").trim();
    if (!nome) return sock.sendMessage(jid, { text: "❌ Ex: *.setnome Zenthra Bot*" }, { quoted: msg });
    try { await sock.updateProfileName(nome); await sock.sendMessage(jid, { text: `✅ Nome alterado para *${nome}*` }, { quoted: msg }); }
    catch { await sock.sendMessage(jid, { text: "❌ Não consegui alterar o nome." }, { quoted: msg }); }
  },
};
