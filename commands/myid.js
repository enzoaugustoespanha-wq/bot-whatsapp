import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "myid",
  aliases: ["meuid", "myjid", "minhaid"],
  description: "Mostra seu JID/número",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, sender, senderNumber }) {
    await sock.sendMessage(jid, {
      text: [`🆔 *Suas Informações*`, ``, `📱 Número: *+${senderNumber}*`, `🔗 JID: \`${sender}\``].join("\n"),
    }, { quoted: msg });
  },
};
