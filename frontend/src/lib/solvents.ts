/**
 * Which above-arrow species is a solvent.
 *
 * A reaction's agents (everything drawn above the arrow) are not one kind of
 * thing: DCM is a solvent and belongs in the table as a volume, while HATU and
 * TEA are consumed reagents and belong there as equivalents. Ketcher cannot
 * tell us which is which — the drawing does not carry the distinction — so we
 * decide it from the structure.
 *
 * This is a closed list of named solvents, not a heuristic. A guess ("small and
 * unfunctionalised, probably a solvent") would silently file a real reagent as
 * a solvent and drop it out of the equivalents maths, which is worse than
 * asking the chemist to move one row. Anything not on this list is treated as a
 * reagent, so an unknown species keeps its stoichiometry.
 *
 * SMILES here are RDKit-canonical, because that is what the server returns
 * (`Chem.MolToSmiles`). Comparing against non-canonical strings would miss.
 */
const SOLVENT_SMILES: ReadonlySet<string> = new Set([
  'ClCCl', // Dichloromethane
  'ClC(Cl)Cl', // Chloroform
  'ClCCCl', // 1,2-Dichloroethane
  'C1CCOC1', // THF
  'C1COCCO1', // 1,4-Dioxane
  'CCOCC', // Diethyl ether
  'CN(C)C=O', // DMF
  'CS(C)=O', // DMSO
  'CN1CCCC1=O', // NMP
  'Cc1ccccc1', // Toluene
  'c1ccccc1', // Benzene
  'CCCCCC', // Hexane
  'CO', // Methanol
  'CCO', // Ethanol
  'CC(C)O', // 2-Propanol
  'CC#N', // Acetonitrile
  'CCOC(C)=O', // Ethyl acetate
  'CC(C)=O', // Acetone
  'O', // Water
]);

/**
 * Pyridine and triethylamine are deliberately absent: both are routinely the
 * base of the reaction rather than the medium, and calling either a solvent
 * would drop it out of the equivalents column where a chemist expects it.
 * A chemist using pyridine as solvent can change the row; the reverse mistake
 * loses information silently.
 */
export function isSolventSmiles(smiles: string): boolean {
  return SOLVENT_SMILES.has(smiles);
}
