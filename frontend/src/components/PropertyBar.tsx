import type { Properties } from '../lib/api';

interface PropertyBarProps {
  properties: Properties | null;
  status: 'idle' | 'loading' | 'error' | 'empty';
  error: string | null;
  inputFormat: string | null;
}

/**
 * The always-visible bottom panel — the single feature this PoC exists to
 * prove: paste/draw a structure and the molecular formula, molecular weight
 * and exact mass appear here immediately, computed by RDKit.
 */
export default function PropertyBar({
  properties,
  status,
  error,
  inputFormat,
}: PropertyBarProps) {
  return (
    <div className={`prop-bar prop-bar--${status}`}>
      <div className="prop-bar__primary">
        <Metric
          label="Molecular Formula"
          value={properties ? formatFormula(properties.mol_formula) : '—'}
          big
        />
        <Metric
          label="Molecular Weight"
          value={properties ? `${properties.mol_weight.toFixed(2)} g/mol` : '—'}
          big
        />
        <Metric
          label="Exact Mass"
          value={
            properties ? `${properties.exact_mol_weight.toFixed(4)} g/mol` : '—'
          }
          big
        />
      </div>

      <div className="prop-bar__secondary">
        <Metric label="Heavy atoms" value={num(properties?.num_heavy_atoms)} />
        <Metric label="Rings" value={num(properties?.num_rings)} />
        <Metric label="H donors" value={num(properties?.num_h_donors)} />
        <Metric label="H acceptors" value={num(properties?.num_h_acceptors)} />
        <Metric label="TPSA" value={properties ? properties.tpsa.toFixed(2) : '—'} />
        <Metric label="cLogP" value={properties ? properties.logp.toFixed(2) : '—'} />
      </div>

      <div className="prop-bar__engine">
        <span className="engine-dot" aria-hidden />
        <span>
          {status === 'loading'
            ? 'Computing (RDKit)…'
            : status === 'error'
              ? `Cannot compute: ${error ?? 'parse error'}`
              : status === 'empty'
                ? 'Draw or paste a structure'
                : `RDKit · parsed as ${inputFormat ?? '—'}`}
        </span>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  big,
}: {
  label: string;
  value: React.ReactNode;
  big?: boolean;
}) {
  return (
    <div className={`metric${big ? ' metric--big' : ''}`}>
      <span className="metric__label">{label}</span>
      <span className="metric__value">{value}</span>
    </div>
  );
}

function num(v: number | undefined): string {
  return v === undefined ? '—' : String(v);
}

/** Render subscripts in a molecular formula (C6H6 → C₆H₆-ish via <sub>). */
function formatFormula(formula: string): React.ReactNode {
  const parts = formula.split(/(\d+)/);
  return parts.map((part, i) =>
    /^\d+$/.test(part) ? <sub key={i}>{part}</sub> : <span key={i}>{part}</span>,
  );
}
