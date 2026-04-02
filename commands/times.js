import { PermissionLevel } from "../config/permissions.js";
export default {
  name: "times", aliases: ["sorteartime","sorttime","team"],
  description: "Sorteia membros em times. .times 2 (nº de times)", permission: PermissionLevel.ADMIN,
  allowVip: true,
  async execute({ sock, msg, jid, isGroup, args }) {
    if (!isGroup) return sock.sendMessage(jid, { text: "❌ Apenas grupos." }, { quoted: msg });
    const n = parseInt(args[0]) || 2;
    if (n<2||n>10) return sock.sendMessage(jid, { text: "❌ Entre 2 e 10 times." }, { quoted: msg });
    const gd = await sock.groupMetadata(jid).catch(()=>null);
    if (!gd) return sock.sendMessage(jid, { text: "❌ Não consegui dados do grupo." }, { quoted: msg });
    const membros = gd.participants.map(p=>p.id).sort(()=>Math.random()-0.5);
    const grupos = Array.from({length:n},()=>[]);
    membros.forEach((m,i)=>grupos[i%n].push(m));
    const emojis = ["🔴","🔵","🟢","🟡","🟠","🟣","⚫","⚪","🟤","🔶"];
    const texto = grupos.map((g,i)=>`${emojis[i]} *Time ${i+1}:*\n${g.map(m=>`• @${m.split("@")[0]}`).join("\n")}`).join("\n\n");
    await sock.sendMessage(jid, { text: `⚽ *Sorteio de Times!*\n\n${texto}`, mentions: membros });
  },
};
