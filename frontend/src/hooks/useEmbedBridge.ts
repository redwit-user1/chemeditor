import { useEffect, useRef } from 'react';
import type { Ketcher } from 'ketcher-core';
import type { PropertiesResponse } from '../lib/api';
import {
  type EmbedConfig,
  buildPropertiesMessage,
  buildReadyMessage,
  isOriginTrusted,
  parseSetStructure,
} from '../lib/embed';

interface BridgeProps {
  /** Latest RDKit property result (null until first successful compute). */
  properties: PropertiesResponse | null;
  /** Property panel status — we only emit on a settled successful update. */
  status: 'idle' | 'loading' | 'error' | 'empty';
  /** The molfile that produced `properties` (structure of record). */
  molfile: string | null;
}

/**
 * Wires the Goono ELN iframe contract (see docs/EMBED.md). No-op unless
 * `config.embed` is true, so standalone mode is completely unaffected.
 *
 * - On mount: post `chemeditor:ready` to the parent.
 * - Parent → iframe: `chemeditor:set-structure` loads a structure into Ketcher
 *   (origin-checked against `config.parentOrigin`).
 * - iframe → parent: every successful property update posts
 *   `chemeditor:properties` with the molfile + RDKit numbers.
 */
export function useEmbedBridge(
  config: EmbedConfig,
  ketcher: Ketcher | null,
  { properties, status, molfile }: BridgeProps,
): void {
  const { embed, parentOrigin } = config;

  // Guard against re-posting the identical properties payload on unrelated
  // re-renders (React strict-mode double render, sibling state changes).
  const lastSentRef = useRef<string | null>(null);

  // Announce readiness once the SPA has mounted.
  useEffect(() => {
    if (!embed) return;
    if (window.parent === window) return; // not actually framed
    window.parent.postMessage(buildReadyMessage(), parentOrigin);
  }, [embed, parentOrigin]);

  // Parent → iframe: load structures pushed from Goono.
  useEffect(() => {
    if (!embed || !ketcher) return;
    const handler = (event: MessageEvent) => {
      if (!isOriginTrusted(event.origin, parentOrigin)) return;
      const structure = parseSetStructure(event.data);
      if (structure == null) return;
      // Ketcher auto-detects molblock vs SMILES. Empty string clears the canvas.
      void ketcher.setMolecule(structure);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [embed, ketcher, parentOrigin]);

  // iframe → parent: forward every successful property update.
  useEffect(() => {
    if (!embed) return;
    if (window.parent === window) return;
    if (status !== 'idle' || !properties || !properties.formula) return;

    const payload = {
      molfile,
      formula: properties.formula,
      molWt: properties.mol_weight,
      exactMolWt: properties.exact_mass,
    };
    const fingerprint = JSON.stringify(payload);
    if (fingerprint === lastSentRef.current) return;
    lastSentRef.current = fingerprint;

    window.parent.postMessage(buildPropertiesMessage(payload), parentOrigin);
  }, [embed, parentOrigin, status, properties, molfile]);
}
