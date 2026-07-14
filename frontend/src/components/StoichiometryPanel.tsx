import { useCallback, useEffect, useRef, useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import {
  computeStoich,
  parseReaction,
  type StoichRowIn,
  type StoichRowOut,
} from '../lib/api';

interface StoichiometryPanelProps {
  ketcher: Ketcher | null;
  onClose: () => void;
  onError: (message: string) => void;
}

/** Editable state for one row; server derives the rest. */
interface RowState extends StoichRowIn {
  id: number;
  /** Solvent mixing ratio — display-only (reference UI column), no math. */
  ratio?: string;
}

let nextId = 1;

/**
 * Reaction stoichiometry table (SPEC §6.3) — synthesis-note columns, with all
 * arithmetic done by the backend pure module (chem/stoich.py). Rows are
 * DIRECTIONAL: the limiting reactant is mass-given; other reactants are
 * eq-given by default (edit eq → mass/vol derive; edit mass → eq derives).
 * Toggling Limit? recomputes every row server-side.
 */
export default function StoichiometryPanel({
  ketcher,
  onClose,
  onError,
}: StoichiometryPanelProps) {
  const [rows, setRows] = useState<RowState[]>([]);
  const [out, setOut] = useState<StoichRowOut[]>([]);
  const [molarity, setMolarity] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number>(25);
  const [pressure, setPressure] = useState<string>(''); // display-only field
  const [loaded, setLoaded] = useState(false);
  const [computeError, setComputeError] = useState<string | null>(null);
  const seq = useRef(0);

  const recompute = useCallback(
    async (current: RowState[], tempC: number) => {
      if (!current.some((r) => r.role === 'reactant')) return;
      const call = ++seq.current;
      try {
        const res = await computeStoich(
          current.map(({ id: _id, ratio: _ratio, ...rest }) => rest),
          tempC,
        );
        if (call !== seq.current) return; // stale response
        if (res.ok) {
          setOut(res.rows);
          setMolarity(res.reaction_molarity);
          setComputeError(null);
        } else {
          setComputeError(res.error);
        }
      } catch (err) {
        if (call === seq.current) {
          setComputeError(err instanceof Error ? err.message : String(err));
        }
      }
    },
    [],
  );

  const loadReaction = async () => {
    if (!ketcher) return;
    let rxn = '';
    try {
      rxn = await ketcher.getRxn();
    } catch {
      /* no reaction on canvas */
    }
    if (!rxn || !rxn.includes('$RXN')) {
      onError('먼저 캔버스에 반응식(반응물 → 생성물)을 그리세요.');
      return;
    }
    try {
      const res = await parseReaction(rxn);
      if (!res.ok) {
        onError(`반응식 파싱 실패: ${res.error ?? '알 수 없는 오류'}`);
        return;
      }
      const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
      const initial: RowState[] = [
        ...res.reactants.map((s, i) => ({
          id: nextId++,
          rxn_id: roman[i] ?? String(i + 1),
          role: 'reactant' as const,
          name: s.mol_formula,
          formula: s.mol_formula,
          fw: s.mol_weight,
          is_limiting: i === 0,
          given: (i === 0 ? 'mass' : 'eq') as 'mass' | 'eq',
          mass_g: i === 0 ? 0.5 : null,
          eq: i === 0 ? null : 1.0,
        })),
        ...res.products.map((s, i) => ({
          id: nextId++,
          rxn_id: `P${i + 1}`,
          role: 'product' as const,
          name: s.mol_formula,
          formula: s.mol_formula,
          fw: s.mol_weight,
        })),
      ];
      setRows(initial);
      setLoaded(true);
      await recompute(initial, temperature);
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    }
  };

  const update = (id: number, patch: Partial<RowState>) => {
    setRows((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, ...patch } : r));
      void recompute(next, temperature);
      return next;
    });
  };

  const setLimiting = (id: number) => {
    setRows((prev) => {
      const next = prev.map((r) => {
        if (r.role !== 'reactant') return r;
        const isLim = r.id === id;
        return {
          ...r,
          is_limiting: isLim,
          // Limiting must be mass-given (eq-driven limiting is circular).
          given: (isLim ? 'mass' : r.given === 'mass' && r.mass_g ? 'mass' : 'eq') as
            | 'mass'
            | 'eq',
          mass_g: isLim ? (r.mass_g ?? 0.5) : r.mass_g,
          eq: isLim ? null : (r.eq ?? 1.0),
        };
      });
      void recompute(next, temperature);
      return next;
    });
  };

  const addSolvent = () => {
    setRows((prev) => {
      const next = [
        ...prev,
        {
          id: nextId++,
          rxn_id: '',
          role: 'solvent' as const,
          name: '용매',
          volume_ml: 5,
        },
      ];
      void recompute(next, temperature);
      return next;
    });
  };

  useEffect(() => {
    if (loaded) void recompute(rows, temperature);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature]);

  const derived = (id: number): StoichRowOut | undefined => {
    const idx = rows.findIndex((r) => r.id === id);
    return out[idx];
  };

  const reactants = rows.filter((r) => r.role === 'reactant');
  const products = rows.filter((r) => r.role === 'product');
  const solvents = rows.filter((r) => r.role === 'solvent');

  return (
    <aside className="stoich-panel">
      <div className="search-header">
        <h2>반응식·수율 계산</h2>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="닫기">
          ×
        </button>
      </div>

      <div className="search-controls">
        <button type="button" className="primary-btn" onClick={loadReaction} disabled={!ketcher}>
          캔버스에서 반응식 불러오기
        </button>
        {computeError && <p className="stoich-error">{computeError}</p>}
      </div>

      <div className="search-results">
        {!loaded && (
          <p className="search-empty">반응식을 그린 뒤 불러오세요.</p>
        )}
        {loaded && (
          <>
            <div className="stoich-section">반응물</div>
            <div className="table-scroll">
            <table className="stoich-table">
              <thead>
                <tr>
                  <th>번호</th><th>반응물</th><th>분자식</th><th>FW</th>
                  <th>기준</th><th>당량</th><th>질량(g)</th><th>mmol</th>
                  <th>부피(mL)</th><th>몰농도</th><th>밀도</th>
                </tr>
              </thead>
              <tbody>
                {reactants.map((r) => {
                  const d = derived(r.id);
                  return (
                    <tr key={r.id}>
                      <td>{r.rxn_id}</td>
                      <td>
                        <input
                          className="cell-input name"
                          type="text"
                          value={r.name ?? ''}
                          onChange={(e) => update(r.id, { name: e.target.value })}
                        />
                      </td>
                      <td>{r.formula}</td>
                      <td>{r.fw?.toFixed(3)}</td>
                      <td>
                        <input
                          type="radio"
                          name="limiting"
                          checked={!!r.is_limiting}
                          onChange={() => setLimiting(r.id)}
                        />
                      </td>
                      <td>
                        {r.is_limiting ? (
                          <span className="derived">{fmt(d?.eq, 3)}</span>
                        ) : r.given === 'volume' ? (
                          // Solution rows: eq is DERIVED from vol × molarity.
                          <span className="derived">{fmt(d?.eq, 3)}</span>
                        ) : (
                          <input
                            className="cell-input"
                            type="number" step={0.05} min={0}
                            value={r.eq ?? ''}
                            onChange={(e) =>
                              update(r.id, {
                                eq: numOrNull(e.target.value),
                                given: 'eq',
                              })
                            }
                          />
                        )}
                      </td>
                      <td>
                        {r.given === 'mass' ? (
                          <input
                            className="cell-input"
                            type="number" step={0.01} min={0}
                            value={r.mass_g ?? ''}
                            onChange={(e) =>
                              update(r.id, { mass_g: numOrNull(e.target.value) })
                            }
                          />
                        ) : (
                          <span className="derived">{fmt(d?.mass_g, 3)}</span>
                        )}
                      </td>
                      <td className="derived">{fmt(d?.mmol, 2)}</td>
                      <td>
                        {r.given === 'volume' ? (
                          <input
                            className="cell-input"
                            type="number" step={0.01} min={0}
                            value={r.volume_ml ?? ''}
                            onChange={(e) =>
                              update(r.id, { volume_ml: numOrNull(e.target.value) })
                            }
                          />
                        ) : (
                          <span className="derived">{fmt(d?.volume_ml, 3)}</span>
                        )}
                      </td>
                      <td>
                        {/* Solution rows (e.g. n-BuLi 2.5 M): set molarity, then
                            the volume becomes the given quantity. */}
                        <input
                          className="cell-input"
                          type="number" step={0.1} min={0}
                          placeholder="—"
                          value={r.molarity ?? ''}
                          disabled={!!r.is_limiting}
                          onChange={(e) => {
                            const m = numOrNull(e.target.value);
                            update(r.id, {
                              molarity: m,
                              given: m != null ? 'volume' : 'eq',
                              volume_ml: m != null ? (r.volume_ml ?? 1) : null,
                              eq: m != null ? null : (r.eq ?? 1.0),
                            });
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="cell-input"
                          type="number" step={0.001} min={0}
                          placeholder="—"
                          value={r.density ?? ''}
                          onChange={(e) =>
                            update(r.id, { density: numOrNull(e.target.value) })
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>

            <div className="stoich-section">생성물</div>
            <div className="table-scroll">
            <table className="stoich-table">
              <thead>
                <tr>
                  <th>번호</th><th>생성물</th><th>분자식</th><th>FW</th><th>이론질량</th>
                  <th>실제질량</th><th>순도</th><th>수율%</th>
                  <th>이론mmol</th><th>실제mmol</th>
                </tr>
              </thead>
              <tbody>
                {products.map((r) => {
                  const d = derived(r.id);
                  return (
                    <tr key={r.id} className="product-row">
                      <td>{r.rxn_id}</td>
                      <td>
                        <input
                          className="cell-input name"
                          type="text"
                          value={r.name ?? ''}
                          onChange={(e) => update(r.id, { name: e.target.value })}
                        />
                      </td>
                      <td>{r.formula}</td>
                      <td>{r.fw?.toFixed(3)}</td>
                      <td className="derived">{fmt(d?.theo_mass_g, 3)}</td>
                      <td>
                        <input
                          className="cell-input"
                          type="number" step={0.001} min={0}
                          placeholder="—"
                          value={r.actual_mass_g ?? ''}
                          onChange={(e) =>
                            update(r.id, {
                              actual_mass_g: numOrNull(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="cell-input"
                          type="number" step={1} min={0} max={100}
                          placeholder="—"
                          value={r.purity ?? ''}
                          onChange={(e) =>
                            update(r.id, { purity: numOrNull(e.target.value) })
                          }
                        />
                      </td>
                      <td className="derived">{fmt(d?.yield_pct, 1)}</td>
                      <td className="derived">{fmt(d?.theo_mol_mmol, 2)}</td>
                      <td className="derived">{fmt(d?.actual_mol_mmol, 3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>

            <div className="stoich-section">
              용매
              <button type="button" className="flat-btn small" onClick={addSolvent}>
                + 용매 추가
              </button>
            </div>
            <div className="table-scroll">
            <table className="stoich-table">
              <thead>
                <tr><th>이름</th><th>비율</th><th>부피(mL)</th></tr>
              </thead>
              <tbody>
                {solvents.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <input
                        className="cell-input wide"
                        type="text"
                        value={r.name ?? ''}
                        onChange={(e) => update(r.id, { name: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="cell-input"
                        type="text"
                        placeholder="—"
                        value={r.ratio ?? ''}
                        onChange={(e) => update(r.id, { ratio: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="cell-input"
                        type="number" step={0.5} min={0}
                        value={r.volume_ml ?? ''}
                        onChange={(e) =>
                          update(r.id, { volume_ml: numOrNull(e.target.value) })
                        }
                      />
                    </td>
                  </tr>
                ))}
                {solvents.length === 0 && (
                  <tr><td colSpan={3} className="search-empty">용매 없음.</td></tr>
                )}
              </tbody>
            </table>
            </div>

            <div className="stoich-section">반응 조건</div>
            <div className="stoich-conditions">
              <span>
                몰농도: <strong>{molarity != null ? `${fmt(molarity, 3)} M` : '—'}</strong>
              </span>
              <label>
                압력:
                <input
                  className="cell-input wide"
                  type="text"
                  placeholder="—"
                  value={pressure}
                  onChange={(e) => setPressure(e.target.value)}
                />
              </label>
              <label>
                온도(°C):
                <input
                  className="cell-input"
                  type="number" step={5}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                />
              </label>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

function fmt(v: number | null | undefined, ndigits: number): string {
  return v == null ? '—' : v.toFixed(ndigits);
}

function numOrNull(v: string): number | null {
  if (v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
