import { PermissionLevel } from "../config/permissions.js";
import { setBotAtivo, setModoGrupo, getModoGrupo, isBotAtivo } from "../utils/database.js";
export default {
  name: "modo", aliases: ["mode","botmodo","setmodo"],
  description: ".modo on/off/soadm/sodono/normal", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, isGroup, args }) {
    const op = args[0]?.toLowerCase();
    if (!op) return sock.sendMessage(jid, { text: `⚙️ *Modos*\n\n🤖 Bot: ${isBotAtivo()?"✅ Ativo":"🔴 Inativo"}\n👥 Grupo: ${isGroup?getModoGrupo(jid):"n/a"}\n\nOpções: on|off|soadm|sodono|normal` }, { quoted: msg });
    if (op==="on") { setBotAtivo(true); return sock.sendMessage(jid, { text: "✅ Bot ativado para todos!" }, { quoted: msg }); }
    if (op==="off") { setBotAtivo(false); return sock.sendMessage(jid, { text: "🔴 Bot desativado! Só dono usa." }, { quoted: msg }); }
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Modos de grupo apenas em grupos." }, { quoted: msg });
    if (["soadm","sodono","normal"].includes(op)) {
      setModoGrupo(jid, op);
      const msgs = { soadm:"🛡️ Modo Só Admin!", sodono:"👑 Modo Só Dono!", normal:"✅ Modo Normal!" };
      return sock.sendMessage(jid, { text: msgs[op] }, { quoted: msg });
    }
    await sock.sendMessage(jid, { text: "❌ Opção inválida! on|off|soadm|sodono|normal" }, { quoted: msg });
  },
};
