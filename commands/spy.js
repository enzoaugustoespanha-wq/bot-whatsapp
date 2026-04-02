import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "spy",
  aliases: ["monitorar", "espiar", "monitor"],
  description: "Ativa modo spy (mostra mensagens deletadas e editadas) - Em breve!",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid }) {
    await sock.sendMessage(jid, { text: `🕵️ *Modo Spy*\n\nEste recurso estará disponível em breve!\n\nPor enquanto, o bot já registra o histórico de ações com *.historico @user*` }, { quoted: msg });
  },
};
