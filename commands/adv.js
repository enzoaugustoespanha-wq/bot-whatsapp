import { PermissionLevel, isOwner } from "../config/permissions.js";
import { addAdvertencia, removeAdvertencia, getTodasAdvertencias, getLimiteWarn, addLogBan, addHistorico } from "../utils/database.js";
export default {
  name: "adv",
  aliases: ["advertencia","warn","w"],
  description: "Advertência. .adv @user motivo | .adv lista",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args, getTarget, senderNumber }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas em grupos." }, { quoted: msg });
    const MAX = getLimiteWarn(jid);
    if (args[0] === "lista") {
      const e = Object.entries(getTodasAdvertencias(jid));
      if (!e.length) return sock.sendMessage(jid, { text: "✅ Nenhuma advertência." }, { quoted: msg });
      return sock.sendMessage(jid, { text: `⚠️ *Advertências*\n\n${e.map(([j,d])=>`▸ @${j.split("@")[0]} — *${d.count}/${MAX}*`).join("\n")}`, mentions: e.map(([j])=>j) }, { quoted: msg });
    }
    const target = getTarget();
    if (!target) return sock.sendMessage(jid, { text: `❌ Responda ou mencione @\nEx: *.adv @user motivo*` }, { quoted: msg });
    if (isOwner(target)) return sock.sendMessage(jid, { text: "⛔ Não posso advertir o dono." }, { quoted: msg });
    const motivo = args.filter(a=>!a.startsWith("@")).join(" ") || "sem motivo";
    const numero = target.split("@")[0].split(":")[0];
    const dados = addAdvertencia(jid, target, motivo);
    addHistorico(jid, target, `Adv ${dados.count}/${MAX}: ${motivo}`, senderNumber);
    if (dados.count >= MAX) {
      try {
        await sock.groupParticipantsUpdate(jid, [target], "remove");
        removeAdvertencia(jid, target);
        addLogBan(jid, { numero, motivo: `${MAX} advertências`, por: senderNumber });
        await sock.sendMessage(jid, { text: `🚫 *@${numero} banido!*\n⚠️ ${MAX} advertências\n📋 ${motivo}`, mentions: [target] });
      } catch { await sock.sendMessage(jid, { text: `❌ Não consegui banir @${numero}. Preciso ser admin.`, mentions: [target] }, { quoted: msg }); }
    } else {
      await sock.sendMessage(jid, { text: `⚠️ *Advertência!*\n👤 @${numero}\n📋 ${motivo}\n📊 *${dados.count}/${MAX}* — faltam ${MAX-dados.count} p/ ban`, mentions: [target] }, { quoted: msg });
    }
  },
};
