import { PermissionLevel } from "../config/permissions.js";
import { getBemvindo, setBemvindo } from "../utils/database.js";
export default {
  name: "bemvindo",
  aliases: ["welcome", "boasvindas", "bv"],
  description: ".bemvindo on | mensagem | .bemvindo off | .bemvindo ver",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const op = args[0]?.toLowerCase();
    const cfg = getBemvindo(jid) || { ativo: false, mensagem: null, msgSaida: false };
    if (!op || op === "ver") {
      return sock.sendMessage(jid, { text: [`👋 *Boas-vindas*`, ``, `Status: ${cfg.ativo ? "✅ Ativo" : "❌ Inativo"}`, `Msg saída: ${cfg.msgSaida ? "✅" : "❌"}`, `Mensagem: ${cfg.mensagem || "Padrão"}`, ``, `Uso: *.bemvindo on mensagem* (use @user para mencionar)`, `*.bemvindo off* — desativar`, `*.bemvindo saida on/off* — msg de saída`].join("\n") }, { quoted: msg });
    }
    if (op === "off") { setBemvindo(jid, { ...cfg, ativo: false }); return sock.sendMessage(jid, { text: "❌ Boas-vindas desativado!" }, { quoted: msg }); }
    if (op === "saida") {
      const v = args[1]?.toLowerCase() === "on";
      setBemvindo(jid, { ...cfg, msgSaida: v });
      return sock.sendMessage(jid, { text: `${v ? "✅" : "❌"} Mensagem de saída ${v ? "ativada" : "desativada"}!` }, { quoted: msg });
    }
    if (op === "on") {
      const mensagem = args.slice(1).join(" ") || null;
      setBemvindo(jid, { ativo: true, mensagem, msgSaida: cfg.msgSaida });
      return sock.sendMessage(jid, { text: `✅ *Boas-vindas ativado!*\n${mensagem ? `Mensagem: ${mensagem}` : "Usando mensagem padrão."}` }, { quoted: msg });
    }
    await sock.sendMessage(jid, { text: "❌ Use: on | off | ver | saida on/off" }, { quoted: msg });
  },
};
