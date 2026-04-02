import { PermissionLevel } from "../config/permissions.js";
import { removeAdvertencia, getAdvertencias } from "../utils/database.js";
export default {
  name: "inadv", aliases: ["rmadv","removeradv","clearwarn","perdoar","rmw"],
  description: "Remove advertências. Responda/@mencione.", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, getTarget }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione" }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    const d = getAdvertencias(jid, t);
    if (d.count===0) return sock.sendMessage(jid, { text: `ℹ️ @${n} não tem advertências.`, mentions: [t] }, { quoted: msg });
    removeAdvertencia(jid, t);
    await sock.sendMessage(jid, { text: `✅ *Advertências removidas!*\n👤 @${n} — ${d.count} adv removida(s).`, mentions: [t] }, { quoted: msg });
  },
};
