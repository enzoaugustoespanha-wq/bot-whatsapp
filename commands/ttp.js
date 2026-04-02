import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "ttp",
  aliases: ["textsticker", "stickertexto", "ts"],
  description: "Figurinha de texto. Uso: .ttp Olá mundo!",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, args }) {
    const texto = args.join(" ").trim();
    if (!texto) return sock.sendMessage(jid, { text: "❌ Informe o texto!\nEx: *.ttp Olá mundo!*" }, { quoted: msg });
    await sock.sendMessage(jid, { text: "⏳ Gerando figurinha de texto..." }, { quoted: msg });
    try {
      // popcat.xyz — API pública gratuita, sem chave necessária
      const url = `https://api.popcat.xyz/ttp?text=${encodeURIComponent(texto)}`;
      const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const ct = r.headers.get("content-type") || "";
      if (!ct.includes("image") && !ct.includes("octet")) throw new Error("Resposta inválida da API");
      const buf = Buffer.from(await r.arrayBuffer());
      await sock.sendMessage(jid, { sticker: buf });
    } catch {
      await sock.sendMessage(jid, { text: "❌ Serviço de figurinha de texto indisponível.\nTente novamente mais tarde." }, { quoted: msg });
    }
  },
};
