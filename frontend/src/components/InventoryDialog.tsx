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
      onError('구조 검색을 하려면 캔버스에 구조를 그리세요.');
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
      onStatus(`${ct.name} 삽입됨 (${ct.container_id}, ${ct.location}).`);
      onClose();
    } catch (err) {
      onError(
        `${ct.name} 삽입 실패: ${err instanceof Error ? err.message : String(err)}`,
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
          <h2>시약 재고 검색</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="seg inventory-tabs">
          <button
            type="button"
            className={`seg-btn${tab === 'simple' ? ' is-active' : ''}`}
            onClick={() => setTab('simple')}
          >
            이름·CAS 검색
          </button>
          <button
            type="button"
            className={`seg-btn${tab === 'structure' ? ' is-active' : ''}`}
            onClick={() => setTab('structure')}
          >
            구조 검색
          </button>
        </div>

        {tab === 'simple' ? (
          <div className="inventory-filters">
            <input
              ref={nameRef}
              type="text"
              placeholder="물질명…"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="CAS 번호…"
              value={cas}
              onChange={(e) => setCas(e.target.value)}
            />
            <input
              type="text"
              placeholder="보관 위치… (예: 시약고 3)"
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
                  {m === 'substructure' ? '부분구조' : '정확일치'}
                </button>
              ))}
            </div>
            <button type="button" className="primary-btn" onClick={runStructureSearch}>
              캔버스 구조로 검색
            </button>
          </div>
        )}

        <div className="inventory-results">
          {!ran && (
            <p className="search-empty">
              {tab === 'simple'
                ? '이름, CAS, 위치로 검색하세요.'
                : '구조를 그리고 방식을 선택해 검색하세요.'}
            </p>
          )}
          {ran && containers.length === 0 && (
            <p className="search-empty">검색된 재고가 없습니다.</p>
          )}
          {containers.length > 0 && (
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>내부ID</th>
                  <th>용기ID</th>
                  <th>위치</th>
                  <th>이름</th>
                  <th>CAS</th>
                  <th>단가</th>
                  <th>용량</th>
                  <th>공급사</th>
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
                        삽입
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
