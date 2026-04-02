import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";
const IMG = "https://files.catbox.moe/mio9it.jpg";
export default {
  name: "menudonoav", aliases: ["menudonoavancado","donoadv"],
  description: "Menu dono avançado", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, senderNumber }) {
    const p = config.prefix;
    const txt = [
      `╭┈⊰ 🪷 『 *${config.botName}* 』`,
      `┊ 👑 ${senderNumber}`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *🤖 COMANDOS PERSONALIZADOS*`,
      `┊`,
      `┊ 🪷 ${p}addcmd     — Criar comando`,
      `┊ 🪷 ${p}listcmd    — Listar comandos`,
      `┊ 🪷 ${p}delcmd     — Deletar comando`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *⚡ AUTOMAÇÕES*`,
      `┊`,
      `┊ 🪷 ${p}addauto    — Resposta automática`,
      `┊ 🪷 ${p}listauto   — Listar automações`,
      `┊ 🪷 ${p}delauto    — Remover automação`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *🚫 FILTROS*`,
      `┊`,
      `┊ 🪷 ${p}addnopref  — Palavra proibida`,
      `┊ 🪷 ${p}listnopref — Listar palavras`,
      `┊ 🪷 ${p}delnopref  — Remover palavra`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `╭┈❁ *⚠️ BAN GLOBAL*`,
      `┊`,
      `┊ 🪷 ${p}addblackglobal — Ban global`,
      `┊ 🪷 ${p}rmblackglobal  — Remover ban`,
      `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
      ``,
      `⚠️ _Apenas o dono tem acesso!_`,
    ].join("\n");
    await sock.sendMessage(jid, { image: { url: IMG }, caption: txt }, { quoted: msg });
  },
};
