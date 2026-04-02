import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "enquete",
  aliases: ["poll", "votacao", "enquetegrupo"],
  description: "Cria enquete. .enquete Título | Op1 | Op2 | Op3",
  permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const full = args.join(" ");
    const partes = full.split("|").map(p => p.trim()).filter(Boolean);
    if (partes.length < 3) return sock.sendMessage(jid, { text: "❌ Formato: *.enquete Título | Opção 1 | Opção 2*\nEx: *.enquete Qual dia? | Segunda | Terça | Quarta*" }, { quoted: msg });
    const titulo = partes[0];
    const opcoes = partes.slice(1);
    try {
      await sock.sendMessage(jid, {
        poll: { name: titulo, values: opcoes, selectableCount: 1 },
      });
    } catch {
      // Fallback: send as text
      const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
      const opcoesText = opcoes.map((o, i) => `${emojis[i] || `${i + 1}.`} ${o}`).join("\n");
      await sock.sendMessage(jid, { text: `📊 *ENQUETE*\n\n❓ ${titulo}\n\n${opcoesText}` }, { quoted: msg });
    }
  },
};
