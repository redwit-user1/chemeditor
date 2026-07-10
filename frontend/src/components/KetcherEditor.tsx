import { useMemo } from 'react';
import { Editor } from 'ketcher-react';
import { StandaloneStructServiceProvider } from 'ketcher-standalone';
import type { Ketcher } from 'ketcher-core';
import 'ketcher-react/dist/index.css';

interface KetcherEditorProps {
  /** Called once the Ketcher instance is ready to receive commands. */
  onReady: (ketcher: Ketcher) => void;
  /** Surface Ketcher errors to the host application. */
  onError: (message: string) => void;
}

/**
 * Thin wrapper around Ketcher's React <Editor>. Uses the standalone
 * WASM-Indigo struct service so the whole editor — including CDX / CDXML
 * ChemDraw conversion — runs fully in the browser with no backend.
 */
export default function KetcherEditor({ onReady, onError }: KetcherEditorProps) {
  // A single provider instance for the lifetime of the component.
  const structServiceProvider = useMemo(
    () => new StandaloneStructServiceProvider(),
    [],
  );

  return (
    <Editor
      staticResourcesUrl={import.meta.env.BASE_URL}
      structServiceProvider={structServiceProvider}
      errorHandler={(message) => onError(String(message))}
      onInit={(ketcher: Ketcher) => {
        // Expose for debugging / external automation, mirroring Ketcher demo.
        (window as unknown as { ketcher: Ketcher }).ketcher = ketcher;
        onReady(ketcher);
      }}
    />
  );
}
