import { PermissionLevel } from "../config/permissions.js";
import { removeVip, isVip } from "../utils/database.js";

export default {
  name: "rmvip",
  aliases: ["vip-", "removervip", "tiravip"],
  description: "Remove VIP de um usuário (apenas dono)",
  permission: PermissionLevel.OWNER,

  async execute({ sock, msg, jid, getTarget }) {
    const target = getTarget();
    if (!target) return sock.sendMessage(jid, { text: "❌ Responda ou mencione com @\nExemplo: *.rmvip @usuario*" }, { quoted: msg });

    const numero = target.split("@")[0];
    if (!isVip(target)) return sock.sendMessage(jid, { text: `ℹ️ @${numero} não é VIP.`, mentions: [target] }, { quoted: msg });

    removeVip(target);
    await sock.sendMessage(jid, {
      text: [`❌ *VIP removido!*`, ``, `👤 @${numero} não é mais VIP.`].join("\n"),
      mentions: [target],
    }, { quoted: msg });
  },
};
