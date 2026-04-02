import { PermissionLevel } from "../config/permissions.js";
import { getLimiteWarn, setLimiteWarn } from "../utils/database.js";
export default {
  name: "limitewarn", aliases: ["limiteadv","setwarn","maxadv","maxwarn","lw"],
  description: "Define limite de advertências p/ ban. .limitewarn 3", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    if (!args[0]) return sock.sendMessage(jid, { text: `⚠️ Limite atual: *${getLimiteWarn(jid)}*\nPara alterar: *.limitewarn <nº>*` }, { quoted: msg });
    const n = parseInt(args[0]);
    if (!n || n < 1 || n > 20) return sock.sendMessage(jid, { text: "❌ Número entre 1 e 20." }, { quoted: msg });
    setLimiteWarn(jid, n);
    await sock.sendMessage(jid, { text: `✅ Limite definido: *${n} advertências* = ban automático` }, { quoted: msg });
  },
};
