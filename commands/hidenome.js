import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "hidenome",
  aliases: ["ocultarnome", "anonimo"],
  description: "Envia mensagem anônima no grupo (apenas admin)",
  permission: PermissionLevel.ADMIN,

  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) {
      await sock.sendMessage(jid, { text: "❌ Este comando é apenas para grupos." }, { quoted: msg });
      return;
    }

    if (!args.length) {
      await sock.sendMessage(
        jid,
        { text: `❌ Informe a mensagem.\nExemplo: *!hidenome Olá a todos!*` },
        { quoted: msg }
      );
      return;
    }

    const mensagem = args.join(" ");

    // Apaga a mensagem original do admin
    await sock.sendMessage(jid, { delete: msg.key });

    // Envia a mensagem sem identificar o autor
    await sock.sendMessage(jid, {
      text: `🎭 *Mensagem Anônima*\n\n${mensagem}`,
    });
  },
};
