import { PermissionLevel } from "../config/permissions.js";
const START = Date.now();
export default {
  name: "horario", aliases: ["hora","uptime","online","horas"],
  description: "Horário atual e uptime do bot", permission: PermissionLevel.USER,
  async execute({ sock, msg, jid }) {
    const now = new Date();
    const up = Math.floor((Date.now()-START)/1000);
    const d=Math.floor(up/86400),h=Math.floor((up%86400)/3600),m=Math.floor((up%3600)/60),s=up%60;
    const hora = now.toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo",hour:"2-digit",minute:"2-digit",second:"2-digit"});
    const data = now.toLocaleDateString("pt-BR",{timeZone:"America/Sao_Paulo",weekday:"long",year:"numeric",month:"long",day:"numeric"});
    await sock.sendMessage(jid, { text: `🕐 *Horário e Uptime*\n\n📅 ${data}\n⏰ ${hora} (Brasília)\n\n🤖 Bot online há: *${d>0?d+"d ":""}${h}h ${m}m ${s}s*` }, { quoted: msg });
  },
};
