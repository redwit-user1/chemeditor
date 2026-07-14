/**
 * Embed-mode contract for the Goono ELN "ChemModal" integration.
 *
 * Goono (Spring Boot) embeds this SPA in an <iframe> as the ChemDraw fallback
 * path (Epic #23 / E4 #27). The parent window and the iframe exchange
 * structures over `postMessage`. This module holds the *pure* parts of that
 * contract — query-string parsing and message (de)serialization — so they can
 * be unit-tested without a DOM. The React wiring lives in useEmbedBridge.ts.
 *
 * All messages are namespaced with a `chemeditor:` prefix so an unrelated
 * parent app can safely share the window message channel.
 */

/** Message types this iframe SENDS to the parent (Goono). */
export const MSG_READY = 'chemeditor:ready';
export const MSG_PROPERTIES = 'chemeditor:properties';
/** Message type this iframe RECEIVES from the parent. */
export const MSG_SET_STRUCTURE = 'chemeditor:set-structure';

export interface EmbedConfig {
  /** True when the SPA is running inside Goono's iframe (`?embed=1`). */
  embed: boolean;
  /**
   * Origin the parent window is expected to be on. Outgoing postMessage uses
   * this as `targetOrigin`; incoming messages from any other origin are
   * ignored. Defaults to '*' (dev only — production MUST pass a real origin).
   */
  parentOrigin: string;
}

/** Payload of an outgoing `chemeditor:properties` message. */
export interface PropertiesMessagePayload {
  /** The MDL molfile currently on the canvas (the structure of record). */
  molfile: string | null;
  formula: string | null;
  molWt: number | null;
  exactMolWt: number | null;
}

/**
 * Read the embed configuration from a URL query string (e.g. location.search).
 *
 * - `?embed=1` (or `embed=true`) turns on embed mode.
 * - `?parentOrigin=<origin>` restricts the postMessage target/source origin.
 *   When omitted it defaults to '*' — acceptable in local dev only; the
 *   production Goono deployment must always supply the real origin.
 */
export function readEmbedConfig(search: string): EmbedConfig {
  const params = new URLSearchParams(search);
  const embedRaw = (params.get('embed') ?? '').toLowerCase();
  const embed = embedRaw === '1' || embedRaw === 'true' || embedRaw === 'yes';
  const parentOrigin = params.get('parentOrigin')?.trim() || '*';
  return { embed, parentOrigin };
}

/**
 * Decide whether an incoming message's origin is trusted given the configured
 * `parentOrigin`. '*' trusts everything (dev default); anything else requires
 * an exact match.
 */
export function isOriginTrusted(
  eventOrigin: string,
  parentOrigin: string,
): boolean {
  if (parentOrigin === '*') return true;
  return eventOrigin === parentOrigin;
}

/**
 * Parse an incoming `chemeditor:set-structure` message. Returns the structure
 * text (molblock or SMILES) to load into Ketcher, or `null` if the message is
 * not a well-formed set-structure command. Tolerant of arbitrary `data` since
 * any script on the page may post to the window.
 */
export function parseSetStructure(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) return null;
  const msg = data as { type?: unknown; payload?: unknown };
  if (msg.type !== MSG_SET_STRUCTURE) return null;
  const payload = msg.payload;
  if (typeof payload !== 'object' || payload === null) return null;
  const structure = (payload as { structure?: unknown }).structure;
  if (typeof structure !== 'string') return null;
  return structure;
}

/** Build the mount-time `chemeditor:ready` message. */
export function buildReadyMessage(): { type: string } {
  return { type: MSG_READY };
}

/** Build a `chemeditor:properties` message from a successful property update. */
export function buildPropertiesMessage(payload: PropertiesMessagePayload): {
  type: string;
  payload: PropertiesMessagePayload;
} {
  return { type: MSG_PROPERTIES, payload };
}
