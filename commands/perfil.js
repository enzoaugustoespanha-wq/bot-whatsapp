import { PermissionLevel } from "../config/permissions.js";
import { getAdvertencias, getHistorico, isVip } from "../utils/database.js";
export default {
  name: "perfil",
  aliases: ["profile", "verperfil", "myperfil"],
  description: "Mostra perfil do usuário no bot. Responda ou @mencione.",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup, sender, senderNumber, getTarget }) {
    const target = getTarget() || sender;
    const numero = target.split("@")[0].split(":")[0];
    const adv = isGroup ? getAdvertencias(jid, target) : { count: 0 };
    const hist = isGroup ? getHistorico(jid, target) : [];
    const vip = isVip(target);
    let pp = null;
    try { pp = await sock.profilePictureUrl(target, "image"); } catch {}
    const texto = [`👤 *Perfil @${numero}*`, ``, `📱 Número: *+${numero}*`, `⭐ VIP: ${vip ? "✅ Sim" : "❌ Não"}`, ...(isGroup ? [`⚠️ Advertências: *${adv.count}*`, `📋 Ações: *${hist.length}*`] : [])].join("\n");
    if (pp) {
      await sock.sendMessage(jid, { image: { url: pp }, caption: texto, mentions: [target] }, { quoted: msg });
    } else {
      await sock.sendMessage(jid, { text: texto, mentions: [target] }, { quoted: msg });
    }
  },
};
