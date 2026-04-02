import { PermissionLevel } from "../config/permissions.js";
const pcts  = () => Math.floor(Math.random() * 101);
const nivel = p => p >= 85 ? ["❤️‍🔥","Amor insano! Isso é novela das 9!"] :
                   p >= 65 ? ["💕","Tem química! Vai que vai né"] :
                   p >= 40 ? ["😅","Mediano... dá uma chance"] :
                   p >= 20 ? ["💔","Tá difícil esse namoro aí"] :
                             ["☠️","Isso não vai dar certo não irmão KKKK"];
export default {
  name: "namorar",
  aliases: ["namoro", "ficada", "paquera"],
  description: "Testa chance de namoro com alguém. .namorar @user",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, getTarget, senderNumber }) {
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Mencione ou responda alguém!\nEx: *.namorar @user*" }, { quoted: msg });
    const n  = t.split("@")[0].split(":")[0];
    const p  = pcts();
    const barra = "💗".repeat(Math.floor(p / 20)) + "🖤".repeat(5 - Math.floor(p / 20));
    const [ico, msg2] = nivel(p);
    await sock.sendMessage(jid, {
      text: `${ico} *Amor-ômetro*\n\n👤 *@${senderNumber}* + *@${n}*\n\n${barra} *${p}%*\n\n${msg2}`,
      mentions: [t],
    }, { quoted: msg });
  },
};
