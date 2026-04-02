import { PermissionLevel } from "../config/permissions.js";
import { isAutofigAtivo, setAutofig } from "../utils/database.js";
export default {
  name: "autofig", aliases: ["autosticker","autofigurinha","af"],
  description: "Auto-figurinha. .autofig on/off", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const op = args[0]?.toLowerCase();
    if (!op) return sock.sendMessage(jid, { text: `🖼️ Autofig: ${isAutofigAtivo(jid)?"✅ Ativo":"❌ Inativo"}\n\nUse *.autofig on/off*` }, { quoted: msg });
    if (op!=="on"&&op!=="off") return sock.sendMessage(jid, { text: "❌ Use *.autofig on* ou *.autofig off*" }, { quoted: msg });
    setAutofig(jid, op==="on");
    await sock.sendMessage(jid, { text: op==="on" ? "🖼️ *Autofig ativado!* Imagens viram figurinha." : "❌ *Autofig desativado!*" }, { quoted: msg });
  },
};
