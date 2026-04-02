import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";

const MENU_IMG = "https://files.catbox.moe/mio9it.jpg";

export default {
  name: "menurpg",
  aliases: ["menuRPG", "rpgmenu"],
  description: "Menu RPG",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid }) {
    const p = config.prefix;
    const text = [
      `╔━━━━━━━━━━━━━━━━━━━━━━━╗`,
      `║  ⚔️ *MENU RPG*`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  👤 *PERFIL & PROGRESSO*`,
      `║ ${p}perfilrpg    ➤ Perfil do jogador`,
      `║ ${p}carteira     ➤ Dinheiro atual`,
      `║ ${p}inventario   ➤ Itens`,
      `║ ${p}conquistas   ➤ Conquistas`,
      `║ ${p}evoluir      ➤ Subir de nível`,
      `║ ${p}classe       ➤ Escolher classe`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  🏆 *RANKINGS*`,
      `║ ${p}toprpg       ➤ Ranking RPG`,
      `║ ${p}rankglobal   ➤ Ranking global`,
      `║ ${p}topriqueza   ➤ Mais ricos`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  💰 *ECONOMIA*`,
      `║ ${p}depositar    ➤ Guardar dinheiro`,
      `║ ${p}sacar        ➤ Retirar dinheiro`,
      `║ ${p}transferir   ➤ Enviar dinheiro`,
      `║ ${p}pix          ➤ Transferência rápida`,
      `║ ${p}investir     ➤ Investir`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  💼 *TRABALHO*`,
      `║ ${p}diario       ➤ Recompensa diária`,
      `║ ${p}trabalhar    ➤ Ganhar dinheiro`,
      `║ ${p}minerar      ➤ Coletar minério`,
      `║ ${p}pescar       ➤ Pescar`,
      `║ ${p}vagas        ➤ Ver empregos`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  🎲 *JOGOS & APOSTAS*`,
      `║ ${p}slots        ➤ Caça-níquel`,
      `║ ${p}roleta       ➤ Roleta`,
      `║ ${p}blackjack    ➤ Cartas`,
      `║ ${p}loteria      ➤ Loteria`,
      `║ ${p}corrida      ➤ Corrida apostada`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  ⚔️ *COMBATE*`,
      `║ ${p}explorar     ➤ Explorar áreas`,
      `║ ${p}masmorra     ➤ Dungeon`,
      `║ ${p}chefe        ➤ Enfrentar chefe`,
      `║ ${p}duelar       ➤ Duelo PvP`,
      `║ ${p}assaltar     ➤ Roubar alguém`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  ❤️ *SOCIAL*`,
      `║ ${p}casar        ➤ Casar com alguém`,
      `║ ${p}familia      ➤ Sistema família`,
      `║ ${p}casa         ➤ Sistema de casa`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║ 💡 Sistema RPG — em breve!`,
      `╚━━━━━━━━━━━━━━━━━━━━━━━╝`,
    ].join("\n");

    await sock.sendMessage(jid, { image: { url: MENU_IMG }, caption: text }, { quoted: msg });
  },
};
