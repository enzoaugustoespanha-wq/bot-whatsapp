/**
 * Comando: calc
 * Realiza cálculos matemáticos básicos
 * Uso: !calc 2 + 2
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "calc",
  aliases: ["calcular", "matematica", "math"],
  description: "Realiza cálculos matemáticos. Uso: !calc 2 + 2",
  usage: "!calc <expressão>",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, args }) {
    if (!args.length) {
      await sock.sendMessage(
        jid,
        { text: "❌ Informe uma expressão matemática.\nExemplo: *!calc 2 + 2*" },
        { quoted: msg }
      );
      return;
    }

    const expression = args.join(" ");

    // Valida para aceitar apenas caracteres matemáticos seguros
    const safe = /^[\d\s\+\-\*\/\(\)\.,%\^]+$/.test(expression);

    if (!safe) {
      await sock.sendMessage(
        jid,
        { text: "❌ Expressão inválida. Use apenas números e operadores: *+ - * / ( )*" },
        { quoted: msg }
      );
      return;
    }

    try {
      // Substitui operadores especiais
      const sanitized = expression.replace(/\^/g, "**").replace(/%/g, "/100");
      // eslint-disable-next-line no-eval
      const result = Function(`"use strict"; return (${sanitized})`)();

      if (!isFinite(result)) {
        await sock.sendMessage(jid, { text: "❌ Resultado indefinido (divisão por zero?)" }, { quoted: msg });
        return;
      }

      await sock.sendMessage(
        jid,
        { text: `🧮 *Calculadora*\n\n📝 Expressão: \`${expression}\`\n✅ Resultado: *${result}*` },
        { quoted: msg }
      );
    } catch (err) {
      await sock.sendMessage(
        jid,
        { text: `❌ Erro ao calcular: expressão inválida.` },
        { quoted: msg }
      );
    }
  },
};
