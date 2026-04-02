import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "sexo",
  aliases: ["compatibilidade2", "testemaldito"],
  description: "Teste de compatibilidade picante 😈. .sexo @user",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, isGroup, getTarget, senderNumber }) {
    const t = getTarget();
    const n = t ? t.split("@")[0].split(":")[0] : null;
    const pct = Math.floor(Math.random() * 101);
    const barra = "█".repeat(Math.floor(pct / 10)) + "░".repeat(10 - Math.floor(pct / 10));
    const reacoes = [
      [90, "🔥 UAU! Que química explosiva, vai ter confusão nesse grupo 💀"],
      [70, "😏 Olha só... tem coisa boa aí hein"],
      [50, "😅 Médio médio... dá pra tentar né"],
      [30, "💀 Isso aqui foi uma decepção e tanto"],
      [10, "😂 Zero chemistry. Melhor nem tentar kkk"],
      [0,  "☠️ Isso aqui foi assustador de tão ruim KKKK"],
    ];
    const [, reacao] = reacoes.find(([min]) => pct >= min) || reacoes.at(-1);
    const alvo = n ? `@${n}` : "alguém do grupo";
    const texto = [
      `╔━━━━━━━━━━━━━━━╗`,
      `║  😈 *TESTE MALDITOL*`,
      `╚━━━━━━━━━━━━━━━╝`,
      ``,
      `👤 *@${senderNumber}* + *${alvo}*`,
      ``,
      `📊 Compatibilidade: *${pct}%*`,
      `[${barra}]`,
      ``,
      reacao,
    ].join("\n");
    const mentions = t ? [t] : [];
    await sock.sendMessage(jid, { text: texto, mentions }, { quoted: msg });
  },
};
