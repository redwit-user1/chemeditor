import { useState } from 'react';
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
 * The always-visible bottom panel — the core feature: paste/draw a structure
 * and the molecular formula, molecular weight and exact mass appear here
 * immediately, computed by RDKit. The measured latency is displayed, never
 * hidden (SPEC §6.2).
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
          label="분자식"
          value={properties?.formula ? formatFormula(properties.formula) : '—'}
          copy={properties?.formula ?? undefined}
          big
        />
        <Metric
          label="분자량"
          value={
            properties?.mol_weight != null
              ? `${properties.mol_weight.toFixed(2)}`
              : '—'
          }
          copy={properties?.mol_weight != null ? properties.mol_weight.toFixed(2) : undefined}
          big
        />
        <Metric
          label="정확질량"
          value={
            properties?.exact_mass != null
              ? `${properties.exact_mass.toFixed(4)}`
              : '—'
          }
          copy={properties?.exact_mass != null ? properties.exact_mass.toFixed(4) : undefined}
          big
        />
        <Metric
          label="중원자 수"
          value={properties?.heavy_atoms != null ? String(properties.heavy_atoms) : '—'}
          big
        />
      </div>

      <div className="prop-bar__secondary">
        <Metric label="고리 수" value={num(properties?.num_rings)} />
        <Metric label="수소 주개" value={num(properties?.num_h_donors)} />
        <Metric label="수소 받개" value={num(properties?.num_h_acceptors)} />
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
            ? 'RDKit 계산 중…'
            : status === 'error'
              ? `계산 불가: ${error ?? '파싱 오류'}`
              : status === 'empty'
                ? '구조를 그리거나 붙여넣으세요'
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
  copy,
}: {
  label: string;
  value: React.ReactNode;
  big?: boolean;
  /** When set, the metric becomes a click-to-copy button for this text. */
  copy?: string;
}) {
  const [copied, setCopied] = useState(false);

  if (copy) {
    const doCopy = () => {
      // navigator.clipboard is undefined in insecure contexts (on-prem http) —
      // guard so the click never throws.
      if (!navigator.clipboard) return;
      navigator.clipboard
        .writeText(copy)
        .then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        })
        .catch(() => undefined);
    };
    return (
      <button
        type="button"
        className={`metric metric--copy${big ? ' metric--big' : ''}`}
        onClick={doCopy}
        title={`클릭하여 복사 (${copy})`}
      >
        <span className="metric__label">{copied ? '복사됨 ✓' : label}</span>
        <span className="metric__value">{value}</span>
      </button>
    );
  }

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
