import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "encurtar",
  aliases: ["url","shorten","encurtarurl"],
  description: "Encurta um link. Uso: !encurtar <url>",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, args }) {
    const url = args[0];

    if (!url) {
      await sock.sendMessage(
        jid,
        { text: `❌ Informe um link para encurtar.\nExemplo: *!encurtar https://google.com*` },
        { quoted: msg }
      );
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      await sock.sendMessage(
        jid,
        { text: `❌ Link inválido. Deve começar com *http://* ou *https://*` },
        { quoted: msg }
      );
      return;
    }

    await sock.sendMessage(jid, { text: "⏳ Encurtando link..." }, { quoted: msg });

    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      const short = await response.text();

      if (!short.startsWith("http")) throw new Error("Resposta inválida");

      await sock.sendMessage(
        jid,
        {
          text: [
            `🔗 *Link Encurtado!*`,
            ``,
            `📎 *Original:* ${url}`,
            `✅ *Encurtado:* ${short}`,
          ].join("\n"),
        },
        { quoted: msg }
      );
    } catch (err) {
      await sock.sendMessage(
        jid,
        { text: `❌ Não foi possível encurtar o link.\nTente novamente mais tarde.` },
        { quoted: msg }
      );
    }
  },
};
