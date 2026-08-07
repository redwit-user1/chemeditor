import { useEffect, useRef, useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import { fetchProperties, type PropertiesResponse } from '../lib/api';
import { computeLocally, type PropSource } from '../lib/localProps';

export type PropStatus = 'idle' | 'loading' | 'error' | 'empty';

interface LiveProperties {
  properties: PropertiesResponse | null;
  status: PropStatus;
  error: string | null;
  inputFormat: string | null;
  /** The molfile that produced the current properties (for the embed bridge). */
  molfile: string | null;
  /** Full round-trip latency (getMolfile → HTTP → response), ms. */
  elapsedMs: number | null;
  /** Server-side compute latency reported by the API, ms. */
  serverMs: number | null;
  /**
   * Which engine produced `properties`. RDKit is the engine of record; 'indigo'
   * means the backend could not be reached and the in-browser fallback ran.
   * Every surface that shows the numbers must also show this.
   */
  source: PropSource;
  /** Why RDKit was skipped, when source === 'indigo'. Kept for the status line. */
  fallbackReason: string | null;
}

const DEBOUNCE_MS = 150; // SPEC §6.1

/**
 * Subscribes to Ketcher structure changes and keeps the property panel in sync
 * with the RDKit backend. Debounced so rapid drawing doesn't flood the API, and
 * abortable so a stale in-flight request can never overwrite a newer result.
 * Measures the real end-to-end latency — the panel displays it (SPEC §6.2:
 * "응답 지연을 화면에 표시한다. 숨기지 않는다").
 */
export function useLiveProperties(ketcher: Ketcher | null): LiveProperties {
  const [state, setState] = useState<LiveProperties>({
    properties: null,
    status: 'empty',
    error: null,
    inputFormat: null,
    molfile: null,
    elapsedMs: null,
    serverMs: null,
    source: 'rdkit',
    fallbackReason: null,
  });

  const timerRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!ketcher) return;

    const recompute = async () => {
      const t0 = performance.now();
      let molfile = '';
      try {
        molfile = await ketcher.getMolfile();
      } catch {
        // No structure yet / editor busy — treat as empty.
      }

      if (!molfile || isEmptyMolfile(molfile)) {
        abortRef.current?.abort();
        setState({
          properties: null,
          status: 'empty',
          error: null,
          inputFormat: null,
          molfile: null,
          elapsedMs: null,
          serverMs: null,
          source: 'rdkit',
          fallbackReason: null,
        });
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setState((s) => ({ ...s, status: 'loading' }));

      try {
        const res = await fetchProperties(molfile, controller.signal);
        if (controller.signal.aborted) return;
        const elapsed = performance.now() - t0;
        if (res.ok && res.formula) {
          setState({
            properties: res,
            status: 'idle',
            error: null,
            inputFormat: res.input_format,
            molfile,
            elapsedMs: Math.round(elapsed),
            serverMs: res.elapsed_ms,
            source: 'rdkit',
            fallbackReason: null,
          });
        } else {
          /*
            RDKit answered and said no. That is a verdict about the structure,
            not about reachability — do not paper over it with a second engine.
          */
          setState({
            properties: null,
            status: 'error',
            error: res.error,
            inputFormat: res.input_format,
            molfile: null,
            elapsedMs: Math.round(elapsed),
            serverMs: res.elapsed_ms,
            source: 'rdkit',
            fallbackReason: null,
          });
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        const why = err instanceof Error ? err.message : String(err);
        /*
          We never reached RDKit (no backend on the static deployment, network
          down, closed network). Fall back to the in-browser engine so the
          headline feature still works — and record which engine it was.
        */
        const local = ketcher ? await computeLocally(ketcher, molfile) : null;
        if (controller.signal.aborted) return;
        if (local) {
          setState({
            properties: local,
            status: 'idle',
            error: null,
            inputFormat: local.input_format,
            molfile,
            elapsedMs: Math.round(performance.now() - t0),
            serverMs: null,
            source: 'indigo',
            fallbackReason: why,
          });
          return;
        }
        setState({
          properties: null,
          status: 'error',
          error: why,
          inputFormat: null,
          molfile: null,
          elapsedMs: null,
          serverMs: null,
          source: 'rdkit',
          fallbackReason: null,
        });
      }
    };

    const schedule = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(recompute, DEBOUNCE_MS);
    };

    // Ketcher fires 'change' on every edit, paste, load, or delete.
    ketcher.editor.subscribe('change', schedule);
    // Compute once for whatever is already on the canvas.
    schedule();

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      abortRef.current?.abort();
      try {
        ketcher.editor.unsubscribe('change', schedule as never);
      } catch {
        /* editor already torn down */
      }
    };
  }, [ketcher]);

  return state;
}

/** An MDL molfile with a 0-atom counts line represents an empty canvas. */
function isEmptyMolfile(molfile: string): boolean {
  const lines = molfile.split('\n');
  const counts = lines[3] ?? '';
  const atomCount = parseInt(counts.slice(0, 3).trim(), 10);
  return Number.isNaN(atomCount) || atomCount === 0;
}
