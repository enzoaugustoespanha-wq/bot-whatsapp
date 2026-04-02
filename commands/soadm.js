import { PermissionLevel } from "../config/permissions.js";
import { setModoGrupo, getModoGrupo } from "../utils/database.js";
export default {
  name: "soadm", aliases: ["modoadm","soadmin","apenasadm"],
  description: "Modo só admins", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    if (getModoGrupo(jid)==="soadm") return sock.sendMessage(jid, { text: "ℹ️ Já está em modo *só admins*." }, { quoted: msg });
    setModoGrupo(jid,"soadm");
    await sock.sendMessage(jid, { text: `🛡️ *Modo Só Admin!*\nApenas admins usam o bot.\nVoltar: *.somembro*` }, { quoted: msg });
  },
};
