import { PermissionLevel, isOwner } from "../config/permissions.js";
export default {
  name: "kickghost",
  aliases: ["removerinativos", "banghost", "clearghost"],
  description: "Remove membros sem nome (possíveis inativos/ghosts)",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(() => null);
    if (!gd) return sock.sendMessage(jid, { text: "❌ Não consegui dados do grupo." }, { quoted: msg });
    // Identifica membros sem informação de nome visível (números muito curtos ou suspeitos)
    const suspeitos = gd.participants.filter(p => !isOwner(p.id) && !p.admin && p.id.split("@")[0].length < 5);
    if (!suspeitos.length) return sock.sendMessage(jid, { text: "✅ Nenhum ghost/inativo identificado." }, { quoted: msg });
    await sock.sendMessage(jid, { text: `👻 Encontrei *${suspeitos.length}* suspeitos. Removendo...` }, { quoted: msg });
    let removidos = 0;
    for (const p of suspeitos) {
      try { await sock.groupParticipantsUpdate(jid, [p.id], "remove"); removidos++; await new Promise(r => setTimeout(r, 500)); } catch {}
    }
    await sock.sendMessage(jid, { text: `✅ *${removidos}* ghost(s) removido(s)!` }, { quoted: msg });
  },
};
