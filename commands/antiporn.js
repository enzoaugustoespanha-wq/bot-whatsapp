import { PermissionLevel } from "../config/permissions.js";
import { setAntiporn, isAntipornAtivo } from "../utils/database.js";
export default {
  name: "antiporn",
  aliases: ["anti18", "antiadulto"],
  description: "Antiporn: apaga mídias +18. .antiporn on/off",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const op = args[0]?.toLowerCase();
    if (!op) return sock.sendMessage(jid, { text: `🔞 Antiporn: *${isAntipornAtivo(jid) ? "✅ Ativo" : "❌ Inativo"}*\nUse *.antiporn on/off*` }, { quoted: msg });
    if (op !== "on" && op !== "off") return sock.sendMessage(jid, { text: "❌ Use *.antiporn on* ou *.antiporn off*" }, { quoted: msg });
    setAntiporn(jid, op === "on");
    await sock.sendMessage(jid, { text: op === "on" ? "🔞 *Antiporn ativado!*\nMídias suspeitas serão removidas." : "❌ *Antiporn desativado!*" }, { quoted: msg });
  },
};
