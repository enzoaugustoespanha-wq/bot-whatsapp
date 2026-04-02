import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "add",
  aliases: ["adicionar", "addmembro", "adduser"],
  description: "Adiciona membro. Uso: .add número | .add @user | responda mensagem",
  permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, isGroup, args, getTarget }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });

    let targetJid = null;

    // Prioridade 1: reply ou @menção
    const target = getTarget();
    if (target) {
      targetJid = target.includes("@") ? target : `${target.replace(/\D/g, "")}@s.whatsapp.net`;
    }

    // Prioridade 2: número nos args
    if (!targetJid && args[0]) {
      const num = args[0].replace(/\D/g, "");
      if (num.length >= 8) targetJid = `${num}@s.whatsapp.net`;
    }

    if (!targetJid) return sock.sendMessage(jid, { text: "❌ Informe um número, @mencione ou responda!\nEx: *.add 5511999999999*" }, { quoted: msg });

    const numero = targetJid.split("@")[0];
    try {
      const res = await sock.groupParticipantsUpdate(jid, [targetJid], "add");
      const code = String(res?.[0]?.status || "");
      if (code === "200") return sock.sendMessage(jid, { text: `✅ *+${numero}* adicionado!` }, { quoted: msg });
      if (code === "403") return sock.sendMessage(jid, { text: `❌ *+${numero}* tem privacidade ativada. Envie o link para que entre.` }, { quoted: msg });
      if (code === "408") return sock.sendMessage(jid, { text: `❌ *+${numero}* não possui WhatsApp.` }, { quoted: msg });
      await sock.sendMessage(jid, { text: `⚠️ Não foi possível adicionar *+${numero}*. Cód: ${code}` }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(jid, { text: `❌ Erro: ${e.message}` }, { quoted: msg });
    }
  },
};
