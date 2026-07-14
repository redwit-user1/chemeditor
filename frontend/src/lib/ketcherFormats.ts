import type { Ketcher } from 'ketcher-core';

/**
 * File formats for the editor's import/export menu.
 *
 * ChemDraw's binary `.cdx` is intentionally *not* handled (see CLAUDE.md):
 * ChemDraw also places plain-text SMILES / MOL on the clipboard, and that is
 * what we read on paste. The interchange format that matters for the ELN is
 * MDL SDF; SMILES / MOL / KET round-trip inside the editor.
 */

export type FormatId = 'sdf' | 'mol' | 'mol3000' | 'rxn' | 'smiles' | 'ket';

export interface FormatSpec {
  id: FormatId;
  label: string;
  extension: string;
  mime: string;
  note?: string;
}

export const EXPORT_FORMATS: FormatSpec[] = [
  {
    id: 'sdf',
    label: 'MDL SDfile (*.sdf)',
    extension: 'sdf',
    mime: 'chemical/x-mdl-sdfile',
    note: 'ELN 표준 교환 형식 (구조·데이터)',
  },
  {
    id: 'mol',
    label: 'MDL Molfile V2000 (*.mol)',
    extension: 'mol',
    mime: 'chemical/x-mdl-molfile',
    note: '단일 구조 교환 형식',
  },
  {
    id: 'mol3000',
    label: 'MDL Molfile V3000 (*.mol)',
    extension: 'mol',
    mime: 'chemical/x-mdl-molfile',
    note: '대형·쿼리 구조용 확장 MDL 형식',
  },
  {
    id: 'rxn',
    label: 'MDL Rxnfile (*.rxn)',
    extension: 'rxn',
    mime: 'chemical/x-mdl-rxnfile',
    note: '반응식 교환 형식',
  },
  {
    id: 'smiles',
    label: 'SMILES (*.smi)',
    extension: 'smi',
    mime: 'chemical/x-daylight-smiles',
    note: '간결한 라인 표기법',
  },
  {
    id: 'ket',
    label: 'Ketcher document (*.ket)',
    extension: 'ket',
    mime: 'application/json',
    note: 'Ketcher 네이티브 JSON — 편집기 내 무손실 왕복',
  },
];

/** Extensions accepted by the Open dialog. */
export const IMPORT_ACCEPT = '.sdf,.sd,.mol,.rxn,.ket,.smi,.smiles,.txt';

/** Serialize the current structure into the requested format. */
export async function exportStructure(
  ketcher: Ketcher,
  format: FormatId,
): Promise<string> {
  switch (format) {
    case 'sdf':
      return ketcher.getSdf();
    case 'mol':
      return ketcher.getMolfile();
    case 'mol3000':
      return ketcher.getMolfile('v3000');
    case 'rxn':
      return ketcher.getRxn();
    case 'smiles':
      return ketcher.getSmiles();
    case 'ket':
      return ketcher.getKet();
    default:
      return ketcher.getMolfile();
  }
}

/** Load a structure into the editor (Ketcher auto-detects the text format). */
export async function importStructure(
  ketcher: Ketcher,
  content: string,
): Promise<void> {
  await ketcher.setMolecule(content);
}

/** Trigger a browser download for a serialized structure. */
export function downloadStructure(
  payload: string,
  spec: FormatSpec,
  baseName = 'structure',
): void {
  const blob = new Blob([payload], { type: `${spec.mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${baseName}.${spec.extension}`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
