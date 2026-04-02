import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
export default {
  name: "dono",
  aliases: ["owner", "botdono", "quemeodono"],
  description: "Mostra informações do dono do bot",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid }) {
    await sock.sendMessage(jid, {
      text: [`👑 *Dono do Bot*`, ``, `📛 Nome: *${config.ownerName}*`, `📱 Número: *+${config.owner}*`, `🤖 Bot: *${config.botName}*`].join("\n"),
    }, { quoted: msg });
  },
};
