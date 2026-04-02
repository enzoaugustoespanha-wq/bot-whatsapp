import { PermissionLevel } from "../config/permissions.js";
import { config } from "../config/settings.js";

const MENU_IMG = "https://files.catbox.moe/mio9it.jpg";

export default {
  name: "menubrinca",
  aliases: ["menubrincadeiras", "menudivertido", "menudivertimento", "brincamenu"],
  description: "Menu de brincadeiras e jogos",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid }) {
    const p = config.prefix;
    const text = [
      `╔━━━━━━━━━━━━━━━━━━━━━━━╗`,
      `║  🎮 *MENU BRINCADEIRAS*`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  🃏 *JOGOS DE GRUPO*`,
      `║ ${p}velha @user  ➤ Jogo da velha`,
      `║ ${p}j <1-9>      ➤ Jogada na velha`,
      `║ ${p}forca        ➤ Jogo da forca`,
      `║ ${p}letra <x>    ➤ Adivinhar letra`,
      `║ ${p}cancelarjogo ➤ Cancela jogo`,
      `║ ${p}ship @u @u   ➤ Compatibilidade`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  🎲 *SORTEIOS & DADOS*`,
      `║ ${p}sorteio      ➤ Sorteio de número`,
      `║ ${p}moeda        ➤ Cara ou coroa`,
      `║ ${p}dado         ➤ Jogar dado`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  💘 *INTERAÇÕES*`,
      `║ ${p}beijar @user ➤ Dar um beijo`,
      `║ ${p}abracar @u   ➤ Dar um abraço`,
      `║ ${p}tapa @user   ➤ Dar um tapa 👋`,
      `║ ${p}chutar @u    ➤ Chutar alguém 🦵`,
      `║ ${p}casar @user  ➤ Pedir em casamento 💍`,
      `║ ${p}namorar @u   ➤ Amor-ômetro 💕`,
      `║ ${p}trair @user  ➤ Flagrar traição 🚨`,
      `║ ${p}sexo @user   ➤ Teste de compatibilidade 😈`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║  😂 *DIVERSÃO*`,
      `║ ${p}piada        ➤ Piada aleatória`,
      `║ ${p}frase        ➤ Frase motivacional`,
      `║ ${p}desafio      ➤ Desafio aleatório`,
      `╠━━━━━━━━━━━━━━━━━━━━━━━╣`,
      `║ 💡 Na velha: ❌ vs ⭕`,
      `║ 💡 Na forca: todos participam`,
      `╚━━━━━━━━━━━━━━━━━━━━━━━╝`,
    ].join("\n");

    await sock.sendMessage(jid, { image: { url: MENU_IMG }, caption: text }, { quoted: msg });
  },
};
