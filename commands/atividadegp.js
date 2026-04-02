import { PermissionLevel } from "../config/permissions.js";
import { getAtividade } from "../utils/database.js";
export default {
  name: "atividadegp", aliases: ["atividade","ranking","rank","top","topgp"],
  description: "Ranking de atividade do grupo", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const data = getAtividade(jid);
    const entries = Object.entries(data).sort((a,b)=>b[1]-a[1]).slice(0,10);
    if (!entries.length) return sock.sendMessage(jid, { text: "📊 Sem dados ainda. Converse mais!" }, { quoted: msg });
    const medals = ["🥇","🥈","🥉","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"];
    const lista = entries.map(([num,cnt],i)=>`${medals[i]} @${num} — *${cnt}* msg`).join("\n");
    const mentions = entries.map(([n])=>`${n}@s.whatsapp.net`);
    await sock.sendMessage(jid, { text: `📊 *Ranking de Atividade*\n\n${lista}`, mentions }, { quoted: msg });
  },
};
