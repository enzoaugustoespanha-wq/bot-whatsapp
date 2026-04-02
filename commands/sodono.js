import { PermissionLevel } from "../config/permissions.js";
import { setModoGrupo, getModoGrupo } from "../utils/database.js";
export default {
  name: "sodono", aliases: ["mododono","soowner","apenasowner"],
  description: "Modo só dono", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    if (getModoGrupo(jid)==="sodono") return sock.sendMessage(jid, { text: "ℹ️ Já está em modo *só dono*." }, { quoted: msg });
    setModoGrupo(jid,"sodono");
    await sock.sendMessage(jid, { text: `👑 *Modo Só Dono!*\nApenas o dono usa comandos.\nVoltar: *.somembro*` }, { quoted: msg });
  },
};
