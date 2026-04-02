import { PermissionLevel, isOwner } from "../config/permissions.js";
import { addMute2, isMuted2, addHistorico } from "../utils/database.js";
export default {
  name: "mute2",
  aliases: ["mutehard", "muterigido", "muteforte", "mutesilencioso", "ms"],
  description: "Mute silencioso: apaga mensagens sem remover do grupo. .mute2 @user",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, getTarget, senderNumber }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione\nEx: *.mute2 @user*" }, { quoted: msg });
    if (isOwner(t)) return sock.sendMessage(jid, { text: "⛔ Não posso mutar o dono." }, { quoted: msg });
    const n = t.split("@")[0].split(":")[0];
    if (isMuted2(jid, t)) return sock.sendMessage(jid, { text: `ℹ️ @${n} já está em mute silencioso.`, mentions: [t] }, { quoted: msg });
    addMute2(jid, t);
    addHistorico(jid, t, "Mute2 (apagar msgs)", senderNumber);
    await sock.sendMessage(jid, {
      text: `🔕 *Mute Silencioso ativado!*\n👤 @${n}\n🗑️ Mensagens serão apagadas automaticamente\nO usuário permanece no grupo\nDesativar: *.unmute @user*`,
      mentions: [t]
    }, { quoted: msg });
  },
};
