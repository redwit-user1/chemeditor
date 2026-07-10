// Measures the FULL paste -> property-display latency in the real UI:
// setMolecule (paste equivalent) -> debounce(150ms) -> getMolfile -> HTTP ->
// RDKit -> React render. Reports p50/p95 over N iterations.
import { chromium } from 'playwright-core';
const N = 30;
const MOLS = ['CC(=O)Oc1ccccc1C(=O)O','Cn1cnc2c1c(=O)n(C)c(=O)n2C','c1ccc2ccccc2c1',
  'CC(C)Cc1ccc(C(C)C(=O)O)cc1','Clc1ccc(N(C)C)cc1C#N','OCC1OC(O)C(O)C(O)C1O'];
const FORMULAS = ['C9H8O4','C8H10N4O2','C10H8','C13H18O2','C9H9ClN2','C6H12O6'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox']});
const p = await b.newPage();
await p.goto('http://localhost:3000/', {waitUntil:'domcontentloaded', timeout:60000});
await p.waitForFunction(()=>!!window.ketcher, {timeout:60000});
// warmup
await p.evaluate(()=>window.ketcher.setMolecule('CCO'));
await p.waitForTimeout(1200);
const times = [];
for (let i = 0; i < N; i++) {
  const mol = MOLS[i % MOLS.length], f = FORMULAS[i % MOLS.length];
  await p.evaluate(()=>window.ketcher.setMolecule(''));
  await p.waitForFunction(()=>(document.querySelector('.prop-bar')?.textContent||'').includes('Draw or paste'), {timeout:5000});
  const t0 = Date.now();
  await p.evaluate((m)=>window.ketcher.setMolecule(m), mol);
  await p.waitForFunction((ff)=>(document.querySelector('.prop-bar')?.textContent||'').includes(ff), f, {timeout:8000});
  times.push(Date.now() - t0);
}
times.sort((a,b)=>a-b);
const pct = q => times[Math.min(times.length-1, Math.floor(q*times.length))];
console.log(`E2E paste->display (n=${N}): p50=${pct(0.5)}ms p95=${pct(0.95)}ms max=${times[times.length-1]}ms (includes 150ms debounce)`);
await b.close();
