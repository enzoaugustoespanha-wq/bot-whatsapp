import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "testar", aliases: ["test","bottest","checkbot"],
  description: "Testa o bot", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, senderNumber, isOwner: ownerFlag, isVip: vipFlag, isAdmin: adminFlag }) {
    const t = Date.now();
    const sent = await sock.sendMessage(jid, { text: "🧪 Testando..." }, { quoted: msg });
    const lat = Date.now()-t;
    const nivel = ownerFlag?"👑 Dono":vipFlag?"⭐ VIP":adminFlag?"🛡️ Admin":"👤 Membro";
    await sock.sendMessage(jid, { text: `✅ *Teste concluído!*\n\n⚡ Latência: *${lat}ms*\n👤 @${senderNumber}\n🏅 Nível: ${nivel}\n🤖 Status: funcionando`, mentions: [`${senderNumber}@s.whatsapp.net`], edit: sent.key });
  },
};
