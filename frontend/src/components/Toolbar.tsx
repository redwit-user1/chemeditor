import { useEffect, useRef, useState } from 'react';
import type { Ketcher } from 'ketcher-core';
import {
  EXPORT_FORMATS,
  IMPORT_ACCEPT,
  exportStructure,
  importStructure,
  downloadStructure,
} from '../lib/ketcherFormats';
import {
  IconBrand,
  IconDoc,
  IconNew,
  IconOpen,
  IconPaste,
  IconReaction,
  IconReagent,
  IconSave,
  IconSearch,
} from './icons';

interface ToolbarProps {
  ketcher: Ketcher | null;
  onStatus: (message: string) => void;
  onError: (message: string) => void;
  onToggleSearch: () => void;
  onToggleStoich: () => void;
  onOpenReagents: () => void;
  searchActive: boolean;
  stoichActive: boolean;
}

/** A dropdown menu that closes when clicking outside of it. */
function Menu({
  label,
  children,
}: {
  label: React.ReactNode;
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
  onStatus,
  onError,
  onToggleSearch,
  onToggleStoich,
  onOpenReagents,
  searchActive,
  stoichActive,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const disabled = !ketcher;

  const requireKetcher = (): Ketcher | null => {
    if (!ketcher) {
      onError('편집기를 아직 불러오는 중입니다. 잠시만 기다려 주세요.');
      return null;
    }
    return ketcher;
  };

  const handleNew = async () => {
    const k = requireKetcher();
    if (!k) return;
    await k.setMolecule('');
    onStatus('새 구조를 시작합니다.');
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
      onStatus(`“${file.name}” 파일을 열었습니다.`);
    } catch (err) {
      onError(`“${file.name}” 파일을 열 수 없습니다: ${describe(err)}`);
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
        onError('내보낼 구조가 없습니다 — 캔버스가 비어 있습니다.');
        return;
      }
      downloadStructure(payload, spec);
      onStatus(`${spec.label} 형식으로 저장했습니다.`);
    } catch (err) {
      onError(`${spec.label} 내보내기에 실패했습니다: ${describe(err)}`);
    }
  };

  const handlePaste = async () => {
    const k = requireKetcher();
    if (!k) return;
    try {
      // ChemDraw / other apps put text/plain SMILES or MOL on the clipboard.
      const text = await navigator.clipboard.readText();
      if (!text) {
        onError('클립보드가 비어 있습니다.');
        return;
      }
      await k.addFragment(text);
      onStatus('클립보드에서 구조를 붙여넣었습니다.');
    } catch (err) {
      onError(`붙여넣기에 실패했습니다: ${describe(err)}`);
    }
  };

  return (
    <div className="toolbar">
      <div className="brand">
        <IconBrand />
        <span className="brand-name">KMEDIhub ELN</span>
        <span className="brand-sub">연구노트</span>
      </div>

      <div className="menu-bar">
        <button
          type="button"
          className="flat-btn"
          onClick={handleNew}
          disabled={disabled}
        >
          <IconNew />
          새로 만들기
        </button>

        <button
          type="button"
          className="flat-btn"
          onClick={handleOpenClick}
          disabled={disabled}
        >
          <IconOpen />
          열기…
        </button>

        <Menu
          label={
            <>
              <IconSave />
              저장
            </>
          }
        >
          {(close) => (
            <ul className="menu-list menu-list--rich">
              {EXPORT_FORMATS.map((spec, index) => (
                <li key={spec.id}>
                  <button type="button" onClick={() => handleExport(index, close)}>
                    <span className="fmt-icon" aria-hidden>
                      <IconDoc />
                    </span>
                    <span className="fmt-text">
                      <span className="fmt-label">{spec.label}</span>
                      {spec.note && <span className="fmt-note">{spec.note}</span>}
                    </span>
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
          <IconPaste />
          붙여넣기
        </button>

        <span className="menu-divider" aria-hidden />

        <button
          type="button"
          className={`flat-btn${searchActive ? ' is-active' : ''}`}
          onClick={onToggleSearch}
          disabled={disabled}
          aria-pressed={searchActive}
        >
          <IconSearch />
          구조 검색
        </button>

        <button
          type="button"
          className={`flat-btn${stoichActive ? ' is-active' : ''}`}
          onClick={onToggleStoich}
          disabled={disabled}
          aria-pressed={stoichActive}
        >
          <IconReaction />
          반응식 계산
        </button>

        <button
          type="button"
          className="flat-btn"
          onClick={onOpenReagents}
          disabled={disabled}
        >
          <IconReagent />
          시약 재고
        </button>
      </div>

      <div className="toolbar__hint">
        구조를 붙여넣거나(⌘/Ctrl+V) 그리면 아래에서 물성이 계산됩니다.
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
