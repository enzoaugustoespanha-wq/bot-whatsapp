import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "id",
  aliases: ["jid", "uid", "verid"],
  description: "Mostra JID de alguém. Responda/@mencione ou .id (seu próprio)",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, sender, senderNumber, getTarget }) {
    const t = getTarget() || sender;
    const num = t.split("@")[0].split(":")[0];
    await sock.sendMessage(jid, {
      text: [`🆔 *ID do Usuário*`, ``, `📱 Número: *+${num}*`, `🔗 JID: \`${t}\``].join("\n"),
    }, { quoted: msg });
  },
};
