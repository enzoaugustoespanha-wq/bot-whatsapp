import { PermissionLevel, isOwner } from "../config/permissions.js";
import { addLogBan, addHistorico } from "../utils/database.js";
export default {
  name: "ban2", aliases: ["b2","bancontagem"],
  description: "Ban com contagem 10s. Responda/@mencione.", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, getTarget, senderNumber }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione" }, { quoted: msg });
    if (isOwner(t)) return sock.sendMessage(jid, { text: "⛔ Não posso banir o dono." }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    const sent = await sock.sendMessage(jid, { text: `⚠️ *AVISO DE BAN*\n\n👤 @${n}\n⏳ Banido em *10s!*\n\n🔴 10...`, mentions: [t] });
    for (let i=9;i>=1;i--) {
      await new Promise(r=>setTimeout(r,1000));
      const e=i>6?"🔴":i>3?"🟠":i>1?"🟡":"🟢";
      await sock.sendMessage(jid, { text: `⚠️ *AVISO DE BAN*\n\n👤 @${n}\n⏳ Banido em *${i}s!*\n\n${e} ${i}...`, mentions: [t], edit: sent.key });
    }
    await new Promise(r=>setTimeout(r,1000));
    try {
      await sock.groupParticipantsUpdate(jid, [t], "remove");
      addLogBan(jid, { numero: n, motivo: "ban2", por: senderNumber });
      addHistorico(jid, t, "Banido (ban2)", senderNumber);
      await sock.sendMessage(jid, { text: `🚫 *BAN EXECUTADO!*\n\n👤 @${n} foi banido. 👋`, mentions: [t] });
    } catch { await sock.sendMessage(jid, { text: "❌ Não consegui banir. Sou admin?" }, { quoted: msg }); }
  },
};
