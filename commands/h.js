import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "h",
  aliases: ["hd", "hidetag", "cita", "hidemention"],
  description: ".h texto | .h (responda) | .h sozinho = menção invisível de todos",
  permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(() => null);
    const members = gd?.participants?.map(p => p.id) || [];

    // Modo 1: .h com texto → repete o texto marcando todos invisível
    if (args.length > 0) {
      const texto = args.join(" ");
      return sock.sendMessage(jid, { text: texto, mentions: members });
    }

    // Modo 2: .h respondendo mensagem → repete a mensagem marcando todos
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const quoted = ctx?.quotedMessage;
    if (quoted) {
      const content = quoted.conversation || quoted.extendedTextMessage?.text || "📌";
      return sock.sendMessage(jid, { text: content, mentions: members });
    }

    // Modo 3: .h sozinho → caractere invisível marcando todos
    await sock.sendMessage(jid, { text: "", mentions: members });
  },
};
