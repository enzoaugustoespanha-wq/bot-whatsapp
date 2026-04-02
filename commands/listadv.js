import { PermissionLevel } from "../config/permissions.js";
import { getTodasAdvertencias, getLimiteWarn } from "../utils/database.js";
export default {
  name: "listadv", aliases: ["listaradv","advlista","warns","wlist"],
  description: "Lista advertências do grupo.", permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const aviso = getTodasAdvertencias(jid); const MAX = getLimiteWarn(jid);
    const e = Object.entries(aviso);
    if (!e.length) return sock.sendMessage(jid, { text: "✅ Nenhuma advertência." }, { quoted: msg });
    const linhas = e.map(([j,d])=>`▸ @${j.split("@")[0]} — *${d.count}/${MAX}*`).join("\n");
    await sock.sendMessage(jid, { text: `⚠️ *ADVERTÊNCIAS*\n\n${linhas}\n\n💀 ${MAX} adv = ban`, mentions: e.map(([j])=>j) }, { quoted: msg });
  },
};
