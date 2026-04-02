import { PermissionLevel, isOwner } from "../config/permissions.js";

export default {
  name: "nuke",
  aliases: ["limpargrupo", "kickall"],
  description: "Remove todos os membros não-admin do grupo (apenas dono)",
  permission: PermissionLevel.OWNER,

  async execute({ sock, msg, jid, isGroup, sender }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });

    const groupData = await sock.groupMetadata(jid).catch(() => null);
    if (!groupData) return sock.sendMessage(jid, { text: "❌ Não consegui obter dados do grupo." }, { quoted: msg });

    const membros = groupData.participants.filter((p) => {
      if (isOwner(p.id)) return false; // nunca remover o dono
      if (p.id === sender) return false; // não remover quem executou
      if (p.admin) return false; // não remover admins
      return true;
    });

    if (!membros.length) return sock.sendMessage(jid, { text: "ℹ️ Nenhum membro para remover." }, { quoted: msg });

    await sock.sendMessage(jid, {
      text: `💣 *NUKE iniciado!*\n\nRemovendo *${membros.length}* membro(s)...\n⏳ Aguarde...`,
    }, { quoted: msg });

    let removidos = 0;
    for (const p of membros) {
      try {
        await sock.groupParticipantsUpdate(jid, [p.id], "remove");
        removidos++;
        await new Promise((r) => setTimeout(r, 500));
      } catch {}
    }

    await sock.sendMessage(jid, {
      text: `✅ *NUKE concluído!*\n\n👥 *${removidos}* membro(s) removido(s).`,
    });
  },
};
