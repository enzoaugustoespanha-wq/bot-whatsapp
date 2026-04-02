/**
 * Comando: cep
 * Busca informações de um CEP brasileiro
 * Uso: !cep 01001000
 */

import { PermissionLevel } from "../config/permissions.js";

export default {
  name: "cep",
  aliases: ["endereco", "address"],
  description: "Busca informações de um CEP. Uso: !cep 01001000",
  usage: "!cep <CEP>",
  permission: PermissionLevel.USER,

  async execute({ sock, msg, jid, args }) {
    const cep = args[0]?.replace(/\D/g, "");

    if (!cep || cep.length !== 8) {
      await sock.sendMessage(
        jid,
        { text: "❌ Informe um CEP válido com 8 dígitos.\nExemplo: *!cep 01001000*" },
        { quoted: msg }
      );
      return;
    }

    await sock.sendMessage(jid, { text: "🔍 Buscando CEP..." }, { quoted: msg });

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        await sock.sendMessage(jid, { text: "❌ CEP não encontrado." }, { quoted: msg });
        return;
      }

      const text = [
        `📮 *Informações do CEP ${cep}*`,
        ``,
        `🏠 *Logradouro:* ${data.logradouro || "N/A"}`,
        `🏘️ *Bairro:* ${data.bairro || "N/A"}`,
        `🏙️ *Cidade:* ${data.localidade}`,
        `📍 *Estado:* ${data.uf} (${data.estado || ""})`,
        `🌎 *Região:* ${data.regiao || "N/A"}`,
        `📟 *DDD:* ${data.ddd || "N/A"}`,
      ].join("\n");

      await sock.sendMessage(jid, { text }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(
        jid,
        { text: `❌ Erro ao buscar CEP: ${err.message}` },
        { quoted: msg }
      );
    }
  },
};
