import { PermissionLevel } from "../config/permissions.js";
import { getAtividade, getTodasAdvertencias, getLogBans } from "../utils/database.js";
export default {
  name: "resumo",
  aliases: ["relatorio", "stats", "estatisticas"],
  description: "Resumo do grupo",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(() => null);
    const atividade = getAtividade(jid);
    const adv = Object.keys(getTodasAdvertencias(jid)).length;
    const bans = getLogBans(jid).length;
    const total = gd?.participants?.length || 0;
    const top = Object.entries(atividade).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const topText = top.length ? top.map(([n, c], i) => `${i + 1}. @${n} — ${c} msg`).join("\n") : "Sem dados";
    await sock.sendMessage(jid, {
      text: [`📊 *Resumo do Grupo*`, ``, `👥 Membros: *${total}*`, `⚠️ Com advertências: *${adv}*`, `🚫 Bans registrados: *${bans}*`, ``, `🏆 *Top 3 mais ativos:*`, topText].join("\n"),
      mentions: top.map(([n]) => `${n}@s.whatsapp.net`),
    }, { quoted: msg });
  },
};
