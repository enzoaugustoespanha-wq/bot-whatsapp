import { PermissionLevel } from "../config/permissions.js";
import { removeBlacklistGlobal, isBlacklistGlobal, getBlacklistGlobal } from "../utils/database.js";
export default {
  name: "rmblackglobal",
  aliases: ["rmblack", "unblackglobal", "rmblacklist"],
  description: "Remove da blacklist global. Responda/@mencione ou .rmblackglobal lista",
  permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid, args, getTarget }) {
    if (args[0] === "lista") {
      const bl = getBlacklistGlobal();
      if (!bl.length) return sock.sendMessage(jid, { text: "ℹ️ Blacklist global vazia." }, { quoted: msg });
      return sock.sendMessage(jid, { text: `🚫 *Blacklist Global (${bl.length})*\n\n${bl.map((v, i) => `${i + 1}. +${v.split("@")[0].split(":")[0]}`).join("\n")}` }, { quoted: msg });
    }
    const t = getTarget();
    if (!t) return sock.sendMessage(jid, { text: "❌ Responda ou @mencione\nVer lista: *.rmblackglobal lista*" }, { quoted: msg });
    if (!isBlacklistGlobal(t)) return sock.sendMessage(jid, { text: `ℹ️ @${t.split("@")[0]} não está na blacklist.`, mentions: [t] }, { quoted: msg });
    removeBlacklistGlobal(t);
    await sock.sendMessage(jid, { text: `✅ @${t.split("@")[0]} removido da blacklist global!`, mentions: [t] }, { quoted: msg });
  },
};
