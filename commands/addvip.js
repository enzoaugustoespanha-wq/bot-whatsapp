import { PermissionLevel } from "../config/permissions.js";
import { addVip, isVip } from "../utils/database.js";

export default {
  name: "addvip",
  aliases: ["vip+", "darvip"],
  description: "Adiciona VIP a um usuário (apenas dono)",
  permission: PermissionLevel.OWNER,

  async execute({ sock, msg, jid, getTarget }) {
    const target = getTarget();
    if (!target) return sock.sendMessage(jid, { text: "❌ Responda ou mencione com @\nExemplo: *.addvip @usuario*" }, { quoted: msg });

    const numero = target.split("@")[0];
    if (isVip(target)) return sock.sendMessage(jid, { text: `ℹ️ @${numero} já é VIP.`, mentions: [target] }, { quoted: msg });

    addVip(target);
    await sock.sendMessage(jid, {
      text: [`⭐ *VIP adicionado!*`, ``, `👤 @${numero} agora é *VIP* do bot!`, `Pode usar comandos de admin (exceto ban, mute, adv).`].join("\n"),
      mentions: [target],
    }, { quoted: msg });
  },
};
