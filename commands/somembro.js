import { PermissionLevel } from "../config/permissions.js";
import { setModoGrupo, getModoGrupo } from "../utils/database.js";
export default {
  name: "somembro", aliases: ["modolivre","modonormal","normal"],
  description: "Modo normal (todos usam)", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    if (getModoGrupo(jid)==="normal") return sock.sendMessage(jid, { text: "ℹ️ Já está no modo *normal*." }, { quoted: msg });
    setModoGrupo(jid,"normal");
    await sock.sendMessage(jid, { text: `✅ *Modo Normal!* Todos podem usar o bot.` }, { quoted: msg });
  },
};
