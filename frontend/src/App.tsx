import { useCallback, useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import KetcherEditor from './components/KetcherEditor';
import Toolbar from './components/Toolbar';
import PropertyBar from './components/PropertyBar';
import SearchPanel from './components/SearchPanel';
import StoichiometryPanel from './components/StoichiometryPanel';
import InventoryDialog from './components/InventoryDialog';
import { useLiveProperties } from './hooks/useLiveProperties';

type Notice = { kind: 'info' | 'error'; text: string } | null;

export default function App() {
  const [ketcher, setKetcher] = useState<Ketcher | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showStoich, setShowStoich] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  // The core loop: every structure change recomputes properties via RDKit.
  const live = useLiveProperties(ketcher);

  const handleStatus = useCallback((text: string) => {
    setNotice({ kind: 'info', text });
  }, []);

  const handleError = useCallback((text: string) => {
    setNotice({ kind: 'error', text });
  }, []);

  return (
    <div className="app">
      <Toolbar
        ketcher={ketcher}
        onStatus={handleStatus}
        onError={handleError}
        onToggleSearch={() => {
          setShowSearch((v) => !v);
          setShowStoich(false);
        }}
        onToggleStoich={() => {
          setShowStoich((v) => !v);
          setShowSearch(false);
        }}
        onOpenReagents={() => setShowInventory(true)}
      />

      <div className="workspace">
        <div className="editor-host">
          <KetcherEditor onReady={setKetcher} onError={handleError} />
        </div>
        {showSearch && (
          <SearchPanel
            ketcher={ketcher}
            onClose={() => setShowSearch(false)}
            onError={handleError}
          />
        )}
        {showStoich && (
          <StoichiometryPanel
            ketcher={ketcher}
            onClose={() => setShowStoich(false)}
            onError={handleError}
          />
        )}
      </div>

      {showInventory && (
        <InventoryDialog
          ketcher={ketcher}
          onClose={() => setShowInventory(false)}
          onStatus={handleStatus}
          onError={handleError}
        />
      )}

      <PropertyBar
        properties={live.properties}
        status={live.status}
        error={live.error}
        inputFormat={live.inputFormat}
        elapsedMs={live.elapsedMs}
        serverMs={live.serverMs}
      />

      <div className={`status-bar${notice?.kind === 'error' ? ' is-error' : ''}`}>
        <span className="status-dot" aria-hidden />
        <span className="status-text">
          {notice?.text ??
            (ketcher
              ? 'Ready — draw a structure or paste a SMILES / MOL.'
              : 'Loading chemistry engine…')}
        </span>
        {notice && (
          <button
            type="button"
            className="status-dismiss"
            onClick={() => setNotice(null)}
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
