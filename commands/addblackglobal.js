import { PermissionLevel, isOwner } from "../config/permissions.js";
import { addBlacklistGlobal, isBlacklistGlobal } from "../utils/database.js";
export default {
  name: "addblackglobal",
  aliases: ["blacklist", "addblack", "banglobal"],
  description: "Ban global (remove de todos os grupos). Responda/@mencione.",
  permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, getTarget }) {
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione" }, { quoted: msg });
    if (isOwner(t)) return sock.sendMessage(jid, { text: "⛔ Não posso banir o dono." }, { quoted: msg });
    if (isBlacklistGlobal(t)) return sock.sendMessage(jid, { text: `ℹ️ @${t.split("@")[0]} já está na blacklist.`, mentions: [t] }, { quoted: msg });
    addBlacklistGlobal(t);
    const n = t.split("@")[0].split(":")[0];
    // Tentar remover de todos os grupos
    let removidos = 0;
    try {
      const grupos = await sock.groupFetchAllParticipating();
      for (const gid of Object.keys(grupos)) {
        try { await sock.groupParticipantsUpdate(gid, [t], "remove"); removidos++; await new Promise(r => setTimeout(r, 300)); } catch {}
      }
    } catch {}
    await sock.sendMessage(jid, { text: `🚫 *Ban Global!*\n👤 @${n} adicionado à blacklist.\nRemovido de ${removidos} grupo(s).`, mentions: [t] }, { quoted: msg });
  },
};
