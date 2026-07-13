import type { PropertiesResponse } from '../lib/api';
import { splitFormula } from '../lib/formula';

interface PropertyBarProps {
  properties: PropertiesResponse | null;
  status: 'idle' | 'loading' | 'error' | 'empty';
  error: string | null;
  inputFormat: string | null;
  elapsedMs: number | null;
  serverMs: number | null;
}

/**
 * The always-visible bottom panel — the single feature this PoC exists to
 * prove: paste/draw a structure and the molecular formula, molecular weight
 * and exact mass appear here immediately, computed by RDKit. The measured
 * latency is displayed, never hidden (SPEC §6.2).
 */
export default function PropertyBar({
  properties,
  status,
  error,
  inputFormat,
  elapsedMs,
  serverMs,
}: PropertyBarProps) {
  return (
    <div className={`prop-bar prop-bar--${status}`}>
      <div className="prop-bar__primary">
        <Metric
          label="Mol Formula"
          value={properties?.formula ? formatFormula(properties.formula) : '—'}
          big
        />
        <Metric
          label="Mol Weight"
          value={
            properties?.mol_weight != null
              ? `${properties.mol_weight.toFixed(2)}`
              : '—'
          }
          big
        />
        <Metric
          label="Exact Mass"
          value={
            properties?.exact_mass != null
              ? `${properties.exact_mass.toFixed(4)}`
              : '—'
          }
          big
        />
        <Metric
          label="Heavy Atoms"
          value={properties?.heavy_atoms != null ? String(properties.heavy_atoms) : '—'}
          big
        />
      </div>

      <div className="prop-bar__secondary">
        <Metric label="Rings" value={num(properties?.num_rings)} />
        <Metric label="H donors" value={num(properties?.num_h_donors)} />
        <Metric label="H acceptors" value={num(properties?.num_h_acceptors)} />
        <Metric
          label="TPSA"
          value={properties?.tpsa != null ? properties.tpsa.toFixed(2) : '—'}
        />
        <Metric
          label="cLogP"
          value={properties?.logp != null ? properties.logp.toFixed(2) : '—'}
        />
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
                : `RDKit · ${inputFormat ?? '—'}`}
        </span>
        {elapsedMs != null && status === 'idle' && (
          <span className="engine-latency" title={`server compute ${serverMs ?? '?'} ms`}>
            ⏱ {elapsedMs} ms
          </span>
        )}
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

function num(v: number | null | undefined): string {
  return v == null ? '—' : String(v);
}

/** Render subscripts in a molecular formula (C6H6 → C₆H₆-ish via <sub>). */
function formatFormula(formula: string): React.ReactNode {
  return splitFormula(formula).map((seg, i) =>
    seg.isNumber ? <sub key={i}>{seg.text}</sub> : <span key={i}>{seg.text}</span>,
  );
}
