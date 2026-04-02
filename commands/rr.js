import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "rr", aliases: ["reiniciar","restart","reboot"],
  description: "Reinicia o bot (dono)", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid }) {
    await sock.sendMessage(jid, { text: "🔄 *Reiniciando...*\n⏳ Volto em instantes!" }, { quoted: msg });
    setTimeout(() => process.exit(0), 2000);
  },
};
