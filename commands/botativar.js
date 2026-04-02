import { PermissionLevel } from "../config/permissions.js";
import { setBotAtivo } from "../utils/database.js";
export default {
  name: "botativar", aliases: ["ligarbot","ativarbot","boton","ligabot","starbot"],
  description: "Ativa bot para todos (dono)", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid }) { setBotAtivo(true); await sock.sendMessage(jid, { text: "✅ *Bot ativado!* Respondendo a todos. 🤖" }, { quoted: msg }); },
};
