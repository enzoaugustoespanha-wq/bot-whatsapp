import { PermissionLevel } from "../config/permissions.js";

const frases = [
  { f: "A vida é o que você faz dela.", a: "Andy Warhol" },
  { f: "Acredite que você pode e você já está no meio do caminho.", a: "Theodore Roosevelt" },
  { f: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", a: "Robert Collier" },
  { f: "Não importa quantas vezes você caia, mas quantas vezes você se levanta.", a: "Vince Lombardi" },
  { f: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.", a: "Albert Einstein" },
  { f: "Você não falhou. Você apenas encontrou 10.000 formas que não funcionam.", a: "Thomas Edison" },
  { f: "Seja a mudança que você quer ver no mundo.", a: "Mahatma Gandhi" },
  { f: "A maior glória não está em nunca cair, mas em levantar sempre que caímos.", a: "Confúcio" },
  { f: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.", a: "Eleanor Roosevelt" },
  { f: "Tudo parece impossível até que seja feito.", a: "Nelson Mandela" },
  { f: "O conhecimento fala, mas a sabedoria escuta.", a: "Jimi Hendrix" },
  { f: "Não deixe que o medo do fracasso supere o desejo do sucesso.", a: "Suso" },
  { f: "Quem não arrisca não petisca, mas quem não petisca não engorda.", a: "Provérbio Brasileiro" },
  { f: "A persistência é o caminho do êxito.", a: "Charles Chaplin" },
  { f: "Você é mais corajoso do que acredita, mais forte do que parece.", a: "A.A. Milne" },
];

export default {
  name: "frase",
  aliases: ["motivacao", "quote", "inspiracao"],
  description: "Envia uma frase motivacional",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid }) {
    const item = frases[Math.floor(Math.random() * frases.length)];
    await sock.sendMessage(
      jid,
      { text: `💡 *Frase do Dia*\n\n_"${item.f}"_\n\n✍️ *— ${item.a}*` },
      { quoted: msg }
    );
  },
};
