import { useEffect, useRef, useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import {
  searchInventory,
  searchInventoryByStructure,
  type ContainerHit,
} from '../lib/api';

interface InventoryDialogProps {
  ketcher: Ketcher | null;
  onClose: () => void;
  onStatus: (message: string) => void;
  onError: (message: string) => void;
}

type Tab = 'simple' | 'structure';

/**
 * Reagent Inventory dialog (SPEC §6.4) — the ELN "Add → Inventory Search"
 * workflow. Simple tab: Name / CAS / Location filters. Structure tab: exact or
 * substructure search using the structure on the canvas. Result grid shows
 * container-level stock; selecting a row inserts the reagent onto the canvas.
 */
export default function InventoryDialog({
  ketcher,
  onClose,
  onStatus,
  onError,
}: InventoryDialogProps) {
  const [tab, setTab] = useState<Tab>('simple');
  const [name, setName] = useState('');
  const [cas, setCas] = useState('');
  const [location, setLocation] = useState('');
  const [mode, setMode] = useState<'substructure' | 'exact'>('substructure');
  const [containers, setContainers] = useState<ContainerHit[]>([]);
  const [ran, setRan] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, [tab]);

  // Debounced simple search on any filter change.
  useEffect(() => {
    if (tab !== 'simple') return;
    const handle = window.setTimeout(async () => {
      if (!name.trim() && !cas.trim() && !location.trim()) {
        setContainers([]);
        setRan(false);
        return;
      }
      try {
        const res = await searchInventory({ name, cas, location });
        setContainers(res.containers);
        setRan(true);
      } catch (err) {
        onError(err instanceof Error ? err.message : String(err));
      }
    }, 200);
    return () => window.clearTimeout(handle);
  }, [tab, name, cas, location, onError]);

  const runStructureSearch = async () => {
    if (!ketcher) return;
    // Never trim() a molfile — the blank name line is structurally required.
    let molfile = '';
    try {
      molfile = await ketcher.getMolfile();
    } catch {
      /* empty */
    }
    if (!molfile.trim()) {
      onError('Draw a structure on the canvas to search by structure.');
      return;
    }
    try {
      const res = await searchInventoryByStructure(molfile, mode);
      setContainers(res.containers);
      setRan(true);
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    }
  };

  const insert = async (ct: ContainerHit) => {
    if (!ketcher) return;
    try {
      await ketcher.addFragment(ct.smiles);
      onStatus(`Inserted ${ct.name} (${ct.container_id}, ${ct.location}).`);
      onClose();
    } catch (err) {
      onError(
        `Could not insert ${ct.name}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal inventory-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="search-header">
          <h2>Inventory Search</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="seg inventory-tabs">
          <button
            type="button"
            className={`seg-btn${tab === 'simple' ? ' is-active' : ''}`}
            onClick={() => setTab('simple')}
          >
            Simple Search
          </button>
          <button
            type="button"
            className={`seg-btn${tab === 'structure' ? ' is-active' : ''}`}
            onClick={() => setTab('structure')}
          >
            Structure Search
          </button>
        </div>

        {tab === 'simple' ? (
          <div className="inventory-filters">
            <input
              ref={nameRef}
              type="text"
              placeholder="Substance name…"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="CAS No…"
              value={cas}
              onChange={(e) => setCas(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location… (e.g. Stock Room 3)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        ) : (
          <div className="inventory-filters">
            <div className="seg">
              {(['substructure', 'exact'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`seg-btn${mode === m ? ' is-active' : ''}`}
                  onClick={() => setMode(m)}
                >
                  {m}
                </button>
              ))}
            </div>
            <button type="button" className="primary-btn" onClick={runStructureSearch}>
              Search using canvas structure
            </button>
          </div>
        )}

        <div className="inventory-results">
          {!ran && (
            <p className="search-empty">
              {tab === 'simple'
                ? 'Filter by name, CAS, or location.'
                : 'Draw a structure, pick a mode, and search.'}
            </p>
          )}
          {ran && containers.length === 0 && (
            <p className="search-empty">No containers found.</p>
          )}
          {containers.length > 0 && (
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Internal ID</th>
                  <th>Container ID</th>
                  <th>Location</th>
                  <th>Name</th>
                  <th>CAS</th>
                  <th>Cost</th>
                  <th>Size</th>
                  <th>Supplier</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {containers.map((ct) => (
                  <tr key={ct.container_id}>
                    <td>{ct.internal_id}</td>
                    <td className="mono">{ct.container_id}</td>
                    <td>{ct.location}</td>
                    <td>{ct.name}</td>
                    <td className="mono">{ct.cas}</td>
                    <td>{ct.cost != null ? ct.cost.toFixed(2) : '—'}</td>
                    <td>
                      {ct.amount} {ct.unit}
                    </td>
                    <td>{ct.supplier}</td>
                    <td>
                      <button
                        type="button"
                        className="primary-btn small"
                        onClick={() => insert(ct)}
                      >
                        Insert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
