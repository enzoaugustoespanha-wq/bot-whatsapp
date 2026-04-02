import { PermissionLevel } from "../config/permissions.js";
import { listarVips } from "../utils/database.js";

export default {
  name: "listvip",
  aliases: ["listavip", "vips"],
  description: "Lista todos os VIPs",
  permission: PermissionLevel.OWNER,

  async execute({ sock, msg, jid }) {
    const vips = listarVips();
    if (!vips.length) return sock.sendMessage(jid, { text: "ℹ️ Nenhum VIP cadastrado." }, { quoted: msg });

    const lista = vips.map((v, i) => `${i + 1}. @${v.split("@")[0].split(":")[0]}`).join("\n");
    await sock.sendMessage(jid, {
      text: [`⭐ *Lista de VIPs*`, ``, lista, ``, `Total: *${vips.length}* VIP(s)`].join("\n"),
      mentions: vips,
    }, { quoted: msg });
  },
};
