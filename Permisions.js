/**
 * Sistema de permissões do bot
 * Define os níveis de acesso: dono, admin, usuário
 * Suporta múltiplos formatos de JID: @s.whatsapp.net, @lid, número puro
 */

import { config } from "./settings.js";

/**
 * Normaliza qualquer formato de JID para número puro.
 * Suporta:
 *   - "225598123335925@s.whatsapp.net"
 *   - "225598123335925@lid"
 *   - "225598123335925"
 *   - "225598123335925:10@s.whatsapp.net"  (multi-device com device ID)
 * @param {string} jid
 * @returns {string} número puro (ex: "225598123335925")
 */
export function normalizeJid(jid) {
  if (!jid) return "";
  // Remove sufixos @s.whatsapp.net, @lid, @c.us, @g.us, etc.
  let number = jid.split("@")[0];
  // Remove device ID se houver (ex: "5511999999999:10")
  number = number.split(":")[0];
  return number.trim();
}

/**
 * Retorna todos os números do dono como array normalizado.
 * Lê config.owner (string ou array) e config.ownerLid (string ou array, opcional).
 * @returns {string[]}
 */
function getOwnerNumbers() {
  const numbers = [];

  // config.owner pode ser string ou array
  if (config.owner) {
    const owners = Array.isArray(config.owner) ? config.owner : [config.owner];
    owners.forEach((o) => numbers.push(normalizeJid(String(o))));
  }

  // config.ownerLid pode ser string ou array (opcional)
  if (config.ownerLid) {
    const lids = Array.isArray(config.ownerLid) ? config.ownerLid : [config.ownerLid];
    lids.forEach((l) => numbers.push(normalizeJid(String(l))));
  }

  // Remove duplicatas
  return [...new Set(numbers.filter(Boolean))];
}

/**
 * Verifica se o JID pertence ao dono do bot.
 * Aceita qualquer formato:
 *   - "225598123335925@s.whatsapp.net"
 *   - "225598123335925@lid"
 *   - "225598123335925"
 *
 * @param {string} jid - JID do remetente
 * @returns {boolean}
 */
export function isOwner(jid) {
  if (!jid) return false;
  const senderNumber = normalizeJid(jid);
  const ownerNumbers = getOwnerNumbers();
  return ownerNumbers.includes(senderNumber);
}

/**
 * Verifica se o usuário é admin do grupo.
 * Compara por número normalizado para suportar LID e @s.whatsapp.net.
 * @param {string} jid - JID do usuário
 * @param {object} groupMetadata - Metadados do grupo
 * @returns {boolean}
 */
export function isAdmin(jid, groupMetadata) {
  if (!groupMetadata || !groupMetadata.participants) return false;
  const senderNumber = normalizeJid(jid);
  const participant = groupMetadata.participants.find(
    (p) => normalizeJid(p.id) === senderNumber
  );
  return participant && (participant.admin === "admin" || participant.admin === "superadmin");
}

/**
 * Verifica se o bot é admin do grupo.
 * @param {string} botJid - JID do bot
 * @param {object} groupMetadata - Metadados do grupo
 * @returns {boolean}
 */
export function isBotAdmin(botJid, groupMetadata) {
  return isAdmin(botJid, groupMetadata);
}

/**
 * Níveis de permissão disponíveis
 */
export const PermissionLevel = {
  USER: 0,    // Qualquer usuário
  ADMIN: 1,   // Admin do grupo
  OWNER: 2,   // Dono do bot
};
