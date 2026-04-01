/**
 * Configurações principais do bot
 * Edite este arquivo para personalizar o comportamento do bot
 */

export const config = {
  // Prefixo dos comandos (ex: !, /, ., #)
  prefix: ".",

  // Número do dono do bot (com código do país, sem + ou espaços)
  // Exemplo: "5511999999999"
  owner: "34610304903",

  // LID do dono do bot (identificador interno do WhatsApp para contas recentes)
  // Formato: apenas o número antes de "@lid"
  // Ex: "225598123335925@lid" → coloque "225598123335925"
  // Deixe como "" se não quiser usar LID
  ownerLid: "225598123335925",

  // Nome do dono (aparece no .menu)
  ownerName: "Santos o melhor",

  // Nome do bot
  botName: "Zenthra",

  // Mensagem quando um comando não é encontrado
  unknownCommandMsg: "❌ Comando não encontrado! Use *{prefix}menu* para ver os comandos disponíveis.",

  // Tempo máximo de espera para reconexão (em ms)
  reconnectDelay: 5000,

  // Número máximo de tentativas de reconexão
  maxReconnectAttempts: 10,

  // Pasta onde os arquivos de sessão são salvos
  sessionDir: "./session",

  // Habilitar logs de mensagens recebidas
  logMessages: true,
};
