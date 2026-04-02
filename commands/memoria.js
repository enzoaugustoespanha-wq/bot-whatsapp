import { PermissionLevel } from "../config/permissions.js";
import fs from "fs"; import path from "path"; import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
  name: "memoria", aliases: ["mem","dados","db"],
  description: "Dados armazenados do bot", permission: PermissionLevel.OWNER,
  async execute({ sock, msg, jid }) {
    const dbPath = path.join(__dirname,"..","database.json");
    const dbSize = fs.existsSync(dbPath) ? (fs.statSync(dbPath).size/1024).toFixed(1) : "0";
    const mem = process.memoryUsage();
    let db={};
    try{db=JSON.parse(fs.readFileSync(dbPath,"utf-8"));}catch{}
    await sock.sendMessage(jid, { text: [
      `🧠 *Memória do Bot*`,``,
      `💾 database.json: *${dbSize} KB*`,
      `🧠 Heap: *${(mem.heapUsed/1024/1024).toFixed(1)} MB*`,
      `📦 RAM total: *${(mem.rss/1024/1024).toFixed(1)} MB*`,``,
      `⭐ VIPs: *${(db.vips||[]).length}*`,
      `⚠️ Grupos c/ adv: *${Object.keys(db.advertencias||{}).length}*`,
      `⏳ Tempbans ativos: *${Object.values(db.tempbans||{}).reduce((a,g)=>a+Object.keys(g).length,0)}*`,
      `🔇 Tempmutes ativos: *${Object.values(db.tempmutes||{}).reduce((a,g)=>a+Object.keys(g).length,0)}*`,
      `📅 Agendamentos: *${(db.agendamentos||[]).length}*`,
      `🔴 Bot ativo: *${db.botAtivo!==false?"✅ Sim":"❌ Não"}*`,
    ].join("\n") }, { quoted: msg });
  },
};
