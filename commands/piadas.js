import { PermissionLevel } from "../config/permissions.js";

const piadas = [
  { p: "Por que o livro de matemática está sempre triste?", r: "Porque tem muitos problemas! 😂" },
  { p: "O que o zero disse para o oito?", r: "Bonito cinturão! 😂" },
  { p: "Por que o espantalho ganhou um prêmio?", r: "Porque ele se destacou no seu campo! 😂" },
  { p: "O que o oceano disse para a praia?", r: "Nada, só acenou! 😂" },
  { p: "Por que o computador foi ao médico?", r: "Porque tinha um vírus! 😂" },
  { p: "O que o pato disse para a pata?", r: "Vem cá, meu bem! 😂" },
  { p: "Qual é o animal mais antigo?", r: "A zebra, porque está em preto e branco! 😂" },
  { p: "Por que o professor foi à praia?", r: "Para testar as águas! 😂" },
  { p: "O que o telhado disse para a chuva?", r: "Pode vir, eu te cubro! 😂" },
  { p: "Por que a porta está sempre cansada?", r: "Porque vive sendo empurrada! 😂" },
  { p: "O que o garfo disse para a faca?", r: "Você corta muito bem! 😂" },
  { p: "Por que o livro foi ao dentista?", r: "Porque tinha uma cárie de história! 😂" },
  { p: "O que o relógio disse para o despertador?", r: "Você me acorda muito! 😂" },
  { p: "Por que a bicicleta não consegue ficar em pé?", r: "Porque está sempre exausta! 😂" },
  { p: "O que acontece quando você cruza um vampiro com um professor?", r: "Muitas provas de sangue! 😂" },
];

export default {
  name: "piada",
  aliases: ["joke", "humor", "rir"],
  description: "Conta uma piada aleatória",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid }) {
    const piada = piadas[Math.floor(Math.random() * piadas.length)];
    await sock.sendMessage(
      jid,
      { text: `😂 *Piada do dia!*\n\n❓ ${piada.p}\n\n💬 ${piada.r}` },
      { quoted: msg }
    );
  },
};
