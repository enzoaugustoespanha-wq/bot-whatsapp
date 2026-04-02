import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "repetir", aliases: ["rep","repeat"],
  description: "Repete mensagem. .repetir 3 texto", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, args }) {
    const n = parseInt(args[0]);
    if (!n||n<1) return sock.sendMessage(jid, { text: "❌ Ex: *.repetir 3 Olá a todos!*" }, { quoted: msg });
    if (n>10) return sock.sendMessage(jid, { text: "❌ Máximo 10." }, { quoted: msg });
    const texto = args.slice(1).join(" ");
    if (!texto) return sock.sendMessage(jid, { text: "❌ Informe o texto!" }, { quoted: msg });
    for (let i=0;i<n;i++) { await sock.sendMessage(jid, { text: texto }); await new Promise(r=>setTimeout(r,700)); }
  },
};
