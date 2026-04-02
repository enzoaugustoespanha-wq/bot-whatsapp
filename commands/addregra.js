import { PermissionLevel } from "../config/permissions.js";
import { addRegra } from "../utils/database.js";
export default {
  name: "addregra",
  aliases: ["addrule", "addnorma", "novaregra"],
  description: "Adiciona uma regra. .addregra texto da regra",
  permission: PermissionLevel.ADMIN,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const regra = args.join(" ").trim();
    if (!regra) return sock.sendMessage(jid, { text: "❌ Informe a regra!\nEx: *.addregra Proibido links externos*" }, { quoted: msg });
    addRegra(jid, regra);
    await sock.sendMessage(jid, { text: `✅ Regra adicionada!\n📜 *${regra}*` }, { quoted: msg });
  },
};
