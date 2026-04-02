import { PermissionLevel } from "../config/permissions.js";
const LANGS = { pt:"Português",en:"Inglês",es:"Espanhol",fr:"Francês",de:"Alemão",it:"Italiano",ja:"Japonês",zh:"Chinês",ko:"Coreano",ar:"Árabe",ru:"Russo" };
export default {
  name: "traduzir",
  aliases: ["translate","traducao","tr","trad"],
  description: "Traduz texto. Uso: .tr en pt Hello world",
  permission: PermissionLevel.USER,
  async execute({ sock, msg, jid, args }) {
    if (args.length < 3) return sock.sendMessage(jid, {
      text: `❌ Uso: *.tr <origem> <destino> <texto>*\nEx: *.tr en pt Hello*\n\nIdiomas: ${Object.keys(LANGS).join(", ")}`,
    }, { quoted: msg });
    const [src, tgt, ...rest] = args;
    const text = rest.join(" ");
    await sock.sendMessage(jid, { text: "🌐 Traduzindo..." }, { quoted: msg });
    try {
      const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${src}|${tgt}`);
      const d = await r.json();
      if (d.responseStatus !== 200) throw new Error(d.responseDetails || "Erro");
      await sock.sendMessage(jid, {
        text: [`🌐 *Tradução*`,`${LANGS[src]||src} ➜ ${LANGS[tgt]||tgt}`,``,`_${text}_`,``,`✅ *${d.responseData.translatedText}*`].join("\n"),
      }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(jid, { text: `❌ Erro: ${e.message}` }, { quoted: msg });
    }
  },
};
