import { PermissionLevel } from "../config/permissions.js";
import { setAntilink, getAntilinkMode } from "../utils/database.js";
export default {
  name: "antilinksoft",
  aliases: ["alsoft", "antilinkbrando"],
  description: "Antilink suave: apaga o link mas não bane. .antilinksoft on/off",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const op = args[0]?.toLowerCase();
    if (op === "on") { setAntilink(jid, "soft"); return sock.sendMessage(jid, { text: "🔗 *Antilink Suave ativado!*\nLinks serão apagados, mas o membro não será banido." }, { quoted: msg }); }
    if (op === "off") { setAntilink(jid, false); return sock.sendMessage(jid, { text: "❌ *Antilink desativado!*" }, { quoted: msg }); }
    const m = getAntilinkMode(jid);
    await sock.sendMessage(jid, { text: `🔗 Antilink: *${m === "soft" ? "✅ Suave" : m === "hard" ? "🚫 Rígido" : "❌ Desativado"}*\nUse *.antilinksoft on/off*` }, { quoted: msg });
  },
};
