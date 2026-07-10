import { useEffect, useRef, useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import { searchReagents, type Reagent } from '../lib/api';

interface ReagentPopupProps {
  ketcher: Ketcher | null;
  onClose: () => void;
  onStatus: (message: string) => void;
  onError: (message: string) => void;
}

/**
 * Reagent inventory search popup. Find a reagent by name or CAS (or by the
 * structure on the canvas) and insert it onto the reaction canvas — the
 * ChemDraw "reagent → reaction" flow.
 */
export default function ReagentPopup({
  ketcher,
  onClose,
  onStatus,
  onError,
}: ReagentPopupProps) {
  const [query, setQuery] = useState('');
  const [reagents, setReagents] = useState<Reagent[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced text search.
  useEffect(() => {
    const handle = window.setTimeout(async () => {
      if (!query.trim()) {
        setReagents([]);
        return;
      }
      try {
        const res = await searchReagents(query.trim());
        setReagents(res.reagents);
      } catch (err) {
        onError(err instanceof Error ? err.message : String(err));
      }
    }, 150);
    return () => window.clearTimeout(handle);
  }, [query, onError]);

  const searchByCanvas = async () => {
    if (!ketcher) return;
    let smiles = '';
    try {
      smiles = (await ketcher.getSmiles()).trim();
    } catch {
      /* empty */
    }
    if (!smiles) {
      onError('Draw a structure to search reagents by substructure.');
      return;
    }
    try {
      const res = await searchReagents('', smiles);
      setReagents(res.reagents);
      setQuery(`⌬ substructure of canvas`);
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    }
  };

  const insert = async (reagent: Reagent) => {
    if (!ketcher) return;
    try {
      await ketcher.addFragment(reagent.smiles);
      onStatus(`Inserted ${reagent.name} onto the canvas.`);
      onClose();
    } catch (err) {
      onError(`Could not insert ${reagent.name}: ${describe(err)}`);
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal reagent-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="search-header">
          <h2>Reagent Inventory</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="reagent-search">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by name or CAS…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="flat-btn" onClick={searchByCanvas}>
            By structure on canvas
          </button>
        </div>

        <div className="reagent-list">
          {reagents.length === 0 && (
            <p className="search-empty">
              Type a reagent name or CAS number to search the inventory.
            </p>
          )}
          {reagents.map((r) => (
            <div className="reagent-row" key={r.cas}>
              <div className="reagent-info">
                <div className="reagent-name">{r.name}</div>
                <div className="reagent-meta">
                  CAS {r.cas} · {r.mol_formula} · {r.mol_weight.toFixed(2)}
                </div>
              </div>
              <button
                type="button"
                className="primary-btn small"
                onClick={() => insert(r)}
              >
                Insert
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function describe(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}
