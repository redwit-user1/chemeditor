import { useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import { parseReaction, type Species } from '../lib/api';

interface StoichiometryPanelProps {
  ketcher: Ketcher | null;
  onClose: () => void;
  onError: (message: string) => void;
}

interface Row {
  species: Species;
  equiv: number; // reactants only
}

/**
 * Reaction stoichiometry table. Reads the reaction drawn on the canvas, gets
 * per-species molecular weights from RDKit, then computes mmol / mass /
 * theoretical yield from a reference reagent's amount and per-reactant
 * equivalents — the arithmetic a chemist does by hand in ChemDraw's table.
 */
export default function StoichiometryPanel({
  ketcher,
  onClose,
  onError,
}: StoichiometryPanelProps) {
  const [reactants, setReactants] = useState<Row[]>([]);
  const [products, setProducts] = useState<Species[]>([]);
  const [refMass, setRefMass] = useState(100); // mg of the reference reagent
  const [loaded, setLoaded] = useState(false);

  const loadReaction = async () => {
    if (!ketcher) return;
    let rxn = '';
    try {
      rxn = await ketcher.getRxn();
    } catch {
      /* no reaction */
    }
    if (!rxn || !rxn.includes('$RXN')) {
      onError('Draw a reaction (reactants, arrow, products) on the canvas first.');
      return;
    }
    try {
      const res = await parseReaction(rxn);
      if (!res.ok) {
        onError(`Reaction parse failed: ${res.error ?? 'unknown'}`);
        return;
      }
      setReactants(res.reactants.map((s) => ({ species: s, equiv: 1 })));
      setProducts(res.products);
      setLoaded(true);
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    }
  };

  // Reference reagent = the first reactant. Its mmol drives the table.
  const refMol = reactants[0]?.species.mol_weight ?? 0;
  const refMmol = refMol > 0 ? refMass / refMol : 0;

  const setEquiv = (i: number, equiv: number) =>
    setReactants((rows) =>
      rows.map((r, idx) => (idx === i ? { ...r, equiv } : r)),
    );

  return (
    <aside className="stoich-panel">
      <div className="search-header">
        <h2>Stoichiometry</h2>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <div className="search-controls">
        <button
          type="button"
          className="primary-btn"
          onClick={loadReaction}
          disabled={!ketcher}
        >
          Load reaction from canvas
        </button>
        {loaded && reactants[0] && (
          <label className="threshold">
            Reference amount (mg of {reactants[0].species.mol_formula})
            <input
              type="number"
              min={0}
              value={refMass}
              onChange={(e) => setRefMass(Number(e.target.value))}
            />
          </label>
        )}
      </div>

      <div className="search-results">
        {!loaded && (
          <p className="search-empty">
            Draw a reaction, then load it to compute the table.
          </p>
        )}
        {loaded && (
          <table className="stoich-table">
            <thead>
              <tr>
                <th>Species</th>
                <th>MW</th>
                <th>equiv</th>
                <th>mmol</th>
                <th>mass (mg)</th>
              </tr>
            </thead>
            <tbody>
              {reactants.map((r, i) => {
                const mmol = i === 0 ? refMmol : refMmol * r.equiv;
                const mass = mmol * r.species.mol_weight;
                return (
                  <tr key={`r${i}`}>
                    <td>
                      <span className="sp-role sp-react">R</span>
                      {r.species.mol_formula}
                    </td>
                    <td>{r.species.mol_weight.toFixed(2)}</td>
                    <td>
                      {i === 0 ? (
                        <span className="ref-tag">ref</span>
                      ) : (
                        <input
                          type="number"
                          className="equiv-input"
                          min={0}
                          step={0.1}
                          value={r.equiv}
                          onChange={(e) => setEquiv(i, Number(e.target.value))}
                        />
                      )}
                    </td>
                    <td>{mmol.toFixed(3)}</td>
                    <td>{mass.toFixed(1)}</td>
                  </tr>
                );
              })}
              {products.map((p, i) => {
                const mmol = refMmol; // 1:1 theoretical
                const mass = mmol * p.mol_weight;
                return (
                  <tr key={`p${i}`} className="product-row">
                    <td>
                      <span className="sp-role sp-prod">P</span>
                      {p.mol_formula}
                    </td>
                    <td>{p.mol_weight.toFixed(2)}</td>
                    <td>—</td>
                    <td>{mmol.toFixed(3)}</td>
                    <td>{mass.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {loaded && products.length > 0 && (
          <p className="yield-note">
            Product mass = 100% theoretical yield (1:1 from reference).
          </p>
        )}
      </div>
    </aside>
  );
}
