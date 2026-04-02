import { PermissionLevel } from "../config/permissions.js";
import { setBotAtivo } from "../utils/database.js";
export default {
  name: "botdesativar", aliases: ["desligarbot","desativarbot","botoff","desligabot","stopbot"],
  description: "Desativa bot (só dono usa)", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid }) { setBotAtivo(false); await sock.sendMessage(jid, { text: "🔴 *Bot desativado!*\nSó o dono pode usar. Para reativar: *.boton*" }, { quoted: msg }); },
};
