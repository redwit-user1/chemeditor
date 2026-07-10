import { useEffect, useRef, useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import { fetchProperties, type Properties } from '../lib/api';

export type PropStatus = 'idle' | 'loading' | 'error' | 'empty';

interface LiveProperties {
  properties: Properties | null;
  status: PropStatus;
  error: string | null;
  inputFormat: string | null;
}

const DEBOUNCE_MS = 150;

/**
 * Subscribes to Ketcher structure changes and keeps the property panel in sync
 * with the RDKit backend. Debounced so rapid drawing doesn't flood the API, and
 * abortable so a stale in-flight request can never overwrite a newer result.
 */
export function useLiveProperties(ketcher: Ketcher | null): LiveProperties {
  const [state, setState] = useState<LiveProperties>({
    properties: null,
    status: 'empty',
    error: null,
    inputFormat: null,
  });

  const timerRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!ketcher) return;

    const recompute = async () => {
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
        if (res.ok && res.properties) {
          setState({
            properties: res.properties,
            status: 'idle',
            error: null,
            inputFormat: res.input_format,
          });
        } else {
          setState({
            properties: null,
            status: 'error',
            error: res.error,
            inputFormat: res.input_format,
          });
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setState({
          properties: null,
          status: 'error',
          error: err instanceof Error ? err.message : String(err),
          inputFormat: null,
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
      // Ketcher's unsubscribe needs the same event name; the handler ref is
      // captured internally, so unsubscribing the whole event is sufficient here.
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
  // Counts line is the 4th line: "  0  0  0 ..." → 0 atoms.
  const counts = lines[3] ?? '';
  const atomCount = parseInt(counts.slice(0, 3).trim(), 10);
  return Number.isNaN(atomCount) || atomCount === 0;
}
