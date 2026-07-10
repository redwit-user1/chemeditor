import { useEffect, useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import {
  fetchHealth,
  searchStructures,
  type QueryType,
  type SearchHit,
} from '../lib/api';

interface SearchPanelProps {
  ketcher: Ketcher | null;
  onClose: () => void;
  onError: (message: string) => void;
}

/**
 * Structure search over the indexed library. Takes the structure currently on
 * the canvas as the query and runs exact / substructure / similarity search
 * against the RDKit-backed portable index. Results roll up to parent REGID;
 * the server-side elapsed_ms and backend name are displayed, not hidden.
 */
export default function SearchPanel({
  ketcher,
  onClose,
  onError,
}: SearchPanelProps) {
  const [queryType, setQueryType] = useState<QueryType>('substructure');
  const [threshold, setThreshold] = useState(0.5);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);
  const [backend, setBackend] = useState<string>('');
  const [indexInfo, setIndexInfo] = useState<string>('');
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    fetchHealth()
      .then((h) => {
        setBackend(h.search_backend);
        setIndexInfo(`${h.index_size} components · ${h.index_source}`);
      })
      .catch(() => undefined);
  }, []);

  const runSearch = async () => {
    if (!ketcher) return;
    // NB: never trim() a molfile — its first line is a blank name line and
    // removing it shifts the V2000 counts line (parse silently fails).
    let molfile = '';
    try {
      molfile = await ketcher.getMolfile();
    } catch {
      /* empty canvas */
    }
    if (!molfile.trim()) {
      onError('Draw or paste a query structure first.');
      return;
    }
    setLoading(true);
    setRan(true);
    try {
      const res = await searchStructures(molfile, queryType, threshold);
      if (res.ok) {
        setHits(res.hits);
        setElapsed(res.elapsed_ms);
        setBackend(res.backend);
      } else {
        setHits([]);
        onError(`Search failed: ${res.error ?? 'unknown error'}`);
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="search-panel">
      <div className="search-header">
        <h2>Structure Search</h2>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <div className="search-controls">
        <div className="seg">
          {(['substructure', 'similarity', 'exact'] as QueryType[]).map((t) => (
            <button
              key={t}
              type="button"
              className={`seg-btn${queryType === t ? ' is-active' : ''}`}
              onClick={() => setQueryType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {queryType === 'similarity' && (
          <label className="threshold">
            Tanimoto ≥ {threshold.toFixed(2)}
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </label>
        )}

        <button
          type="button"
          className="primary-btn"
          onClick={runSearch}
          disabled={!ketcher || loading}
        >
          {loading ? 'Searching…' : 'Search using current structure'}
        </button>

        {backend && (
          <p className="search-meta">
            backend: <code>{backend}</code>
            {elapsed != null && <> · ⏱ {elapsed.toFixed(1)} ms</>}
            <br />
            index: {indexInfo}
          </p>
        )}
      </div>

      <div className="search-results">
        {ran && !loading && hits.length === 0 && (
          <p className="search-empty">No matches.</p>
        )}
        {hits.length > 0 && (
          <>
            <div className="search-count">{hits.length} REGID(s)</div>
            <ul className="hit-list">
              {hits.map((h) => (
                <li key={h.reg_id} className="hit">
                  <div className="hit-regid">{h.reg_id}</div>
                  <div className="hit-meta">
                    {h.mol_formula}
                    {h.mol_weight ? ` · ${h.mol_weight.toFixed(2)}` : ''}
                    {h.score != null && (
                      <span className="hit-score">
                        Tanimoto {h.score.toFixed(3)}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </aside>
  );
}
