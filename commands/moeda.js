import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "moeda",
  aliases: ["caraoucoroa", "flip"],
  description: "Joga uma moeda — cara ou coroa",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid }) {
    const resultado = Math.random() < 0.5 ? "CARA 🪙" : "COROA 🥇";
    await sock.sendMessage(
      jid,
      { text: `🪙 *Jogando a moeda...*\n\n🎯 Resultado: *${resultado}*` },
      { quoted: msg }
    );
  },
};
