import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "dado",
  aliases: ["dice", "rolar"],
  description: "Rola um dado de 6 lados",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, args }) {
    const lados = parseInt(args[0]) || 6;
    const max = Math.min(Math.max(lados, 2), 100);
    const resultado = Math.floor(Math.random() * max) + 1;
    const emojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    const emoji = lados === 6 ? emojis[resultado - 1] : "🎲";

    await sock.sendMessage(
      jid,
      { text: `${emoji} *Rolando dado de ${max} lados...*\n\n🎯 Resultado: *${resultado}*` },
      { quoted: msg }
    );
  },
};
