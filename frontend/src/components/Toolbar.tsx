import { useEffect, useRef, useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import {
  EXPORT_FORMATS,
  IMPORT_ACCEPT,
  exportStructure,
  importStructure,
  downloadStructure,
} from '../lib/ketcherFormats';

interface ToolbarProps {
  ketcher: Ketcher | null;
  /** Embed mode (Goono iframe): hide search / stoich / reagents chrome. */
  embed?: boolean;
  onStatus: (message: string) => void;
  onError: (message: string) => void;
  onToggleSearch: () => void;
  onToggleStoich: () => void;
  onOpenReagents: () => void;
}

/** A dropdown menu that closes when clicking outside of it. */
function Menu({
  label,
  children,
}: {
  label: string;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="menu" ref={ref}>
      <button
        type="button"
        className={`menu-trigger${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <span className="caret" aria-hidden>
          ▾
        </span>
      </button>
      {open && <div className="menu-panel">{children(() => setOpen(false))}</div>}
    </div>
  );
}

export default function Toolbar({
  ketcher,
  embed = false,
  onStatus,
  onError,
  onToggleSearch,
  onToggleStoich,
  onOpenReagents,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const disabled = !ketcher;

  const requireKetcher = (): Ketcher | null => {
    if (!ketcher) {
      onError('Editor is still loading — please wait a moment.');
      return null;
    }
    return ketcher;
  };

  const handleNew = async () => {
    const k = requireKetcher();
    if (!k) return;
    await k.setMolecule('');
    onStatus('New document created.');
  };

  const handleOpenClick = () => fileInputRef.current?.click();

  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = ''; // allow re-selecting the same file
    if (!file) return;
    const k = requireKetcher();
    if (!k) return;

    try {
      // Plain-text chemistry only (SDF / MOL / SMILES / KET). No binary .cdx.
      const content = await file.text();
      await importStructure(k, content);
      onStatus(`Opened “${file.name}”.`);
    } catch (err) {
      onError(`Could not open “${file.name}”: ${describe(err)}`);
    }
  };

  const handleExport = async (formatIndex: number, close: () => void) => {
    close();
    const k = requireKetcher();
    if (!k) return;
    const spec = EXPORT_FORMATS[formatIndex];
    try {
      const payload = await exportStructure(k, spec.id);
      if (!payload || payload.trim() === '') {
        onError('Nothing to export — the canvas is empty.');
        return;
      }
      downloadStructure(payload, spec);
      onStatus(`Saved as ${spec.label}.`);
    } catch (err) {
      onError(`Export to ${spec.label} failed: ${describe(err)}`);
    }
  };

  const handlePaste = async () => {
    const k = requireKetcher();
    if (!k) return;
    try {
      // ChemDraw / other apps put text/plain SMILES or MOL on the clipboard.
      const text = await navigator.clipboard.readText();
      if (!text) {
        onError('Clipboard is empty.');
        return;
      }
      await k.addFragment(text);
      onStatus('Pasted structure from clipboard.');
    } catch (err) {
      onError(`Paste failed: ${describe(err)}`);
    }
  };

  return (
    <div className="toolbar">
      <div className="brand">
        {/*
          유니코드 글리프(⬡)를 아이콘 자리에 세워 두었었다. 글꼴마다 다르게
          그려지고 굵기도 주변 아이콘과 맞지 않는다 — 그린 도형으로 바꾼다.
          정육각형: 중심 (10,10), 외접반지름 7, 꼭짓점 위로.
        */}
        <svg
          className="brand-mark"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <polygon points="10,3 16.06,6.5 16.06,13.5 10,17 3.94,13.5 3.94,6.5" />
        </svg>
        <span className="brand-name">구조 입력기</span>
      </div>

      <div className="menu-bar">
        <button
          type="button"
          className="flat-btn"
          onClick={handleNew}
          disabled={disabled}
        >
          새로
        </button>

        <button
          type="button"
          className="flat-btn"
          onClick={handleOpenClick}
          disabled={disabled}
        >
          열기
        </button>

        <Menu label="내보내기">
          {(close) => (
            <ul className="menu-list">
              {EXPORT_FORMATS.map((spec, index) => (
                <li key={spec.id}>
                  <button
                    type="button"
                    onClick={() => handleExport(index, close)}
                    title={spec.note}
                  >
                    {spec.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Menu>

        <button
          type="button"
          className="flat-btn"
          onClick={handlePaste}
          disabled={disabled}
        >
          붙여넣기
        </button>

        {!embed && (
          <>
            <button
              type="button"
              className="flat-btn"
              onClick={onToggleSearch}
              disabled={disabled}
            >
              구조 검색
            </button>

            <button
              type="button"
              className="flat-btn"
              onClick={onToggleStoich}
              disabled={disabled}
            >
              화학량론
            </button>

            <button
              type="button"
              className="flat-btn"
              onClick={onOpenReagents}
              disabled={disabled}
            >
              시약 불러오기
            </button>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={IMPORT_ACCEPT}
        style={{ display: 'none' }}
        onChange={handleFileSelected}
      />
    </div>
  );
}

function describe(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  try {
    return JSON.stringify(err);
  } catch {
    return 'unknown error';
  }
}
