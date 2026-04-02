import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "attp",
  aliases: ["animsticker", "stickeranim", "ats"],
  description: "Figurinha animada de texto. Uso: .attp Olá!",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, args }) {
    const texto = args.join(" ").trim();
    if (!texto) return sock.sendMessage(jid, { text: "❌ Informe o texto!\nEx: *.attp Olá!*" }, { quoted: msg });
    await sock.sendMessage(jid, { text: `⏳ Gerando figurinha animada...\n\n💡 *Dica:* use *.ttp ${texto}* para versão estática se não funcionar.` }, { quoted: msg });
    try {
      // popcat.xyz — API pública gratuita, sem chave necessária
      const url = `https://api.popcat.xyz/attp?text=${encodeURIComponent(texto)}`;
      const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const ct = r.headers.get("content-type") || "";
      if (!ct.includes("image") && !ct.includes("octet")) throw new Error("Resposta inválida da API");
      const buf = Buffer.from(await r.arrayBuffer());
      await sock.sendMessage(jid, { sticker: buf });
    } catch {
      await sock.sendMessage(jid, { text: `❌ Serviço de figurinha animada indisponível.\nUse *.ttp ${texto}* para versão estática.` }, { quoted: msg });
    }
  },
};
