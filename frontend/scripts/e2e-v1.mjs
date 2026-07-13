import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox']});
const p = await b.newPage({ viewport: { width: 1500, height: 860 }});
const errs=[]; p.on('pageerror', e => errs.push(e.message.slice(0,150)));
let failed=false; const check=(n,c,x='')=>{console.log(`${c?'PASS':'FAIL'}  ${n}${x?' — '+x:''}`); if(!c) failed=true;};
try {
  await p.goto('http://localhost:3000/', {waitUntil:'domcontentloaded', timeout:60000});
  await p.waitForFunction(()=>!!window.ketcher, {timeout:60000});

  // 1. Core: paste aspirin → RDKit properties + latency display
  await p.evaluate(()=>window.ketcher.setMolecule('CC(=O)Oc1ccccc1C(=O)O'));
  await p.waitForFunction(()=>(document.querySelector('.prop-bar')?.textContent||'').includes('C9H8O4'), {timeout:8000});
  const bar = await p.evaluate(()=>document.querySelector('.prop-bar')?.textContent||'');
  check('Property bar: C9H8O4 + 180.16', bar.includes('C9H8O4') && bar.includes('180.16'));
  check('Latency ⏱ displayed', /⏱\s*\d+\s*ms/.test(bar), bar.match(/⏱[^R]*/)?.[0]?.trim());

  // 2. Search panel with elapsed
  await p.evaluate(()=>window.ketcher.setMolecule('c1ccccc1'));
  await p.waitForTimeout(800);
  await p.getByText('Search…', {exact:true}).click();
  await p.getByText('Search using current structure').click();
  await p.waitForFunction(()=>document.querySelectorAll('.hit').length>0, {timeout:8000});
  const meta = await p.evaluate(()=>document.querySelector('.search-meta')?.textContent||'');
  check('Search: hits + backend + ms', /portable_fp/.test(meta) && /ms/.test(meta), meta.slice(0,80));
  await p.getByText('Structure Search', {exact:true}).first().locator('..').locator('.icon-btn').click().catch(()=>{});
  await p.locator('.search-panel .icon-btn').click().catch(()=>{});

  // 3. Stoich: esterification, full table, edit eq
  await p.evaluate(()=>window.ketcher.setMolecule('CC(=O)O.OCC>>CC(=O)OCC.O'));
  await p.waitForTimeout(1200);
  await p.getByText('Stoich…', {exact:true}).click();
  await p.getByText('Load reaction from canvas').click();
  await p.waitForFunction(()=>document.querySelectorAll('.stoich-table tbody tr').length>=4, {timeout:8000});
  let stoichText = await p.evaluate(()=>document.querySelector('.stoich-panel')?.textContent||'');
  check('Stoich: reactant/product tables', stoichText.includes('C2H4O2') && stoichText.includes('C4H8O2'));
  check('Stoich: theo mass computed', /Theo Mass/.test(stoichText) && /\d\.\d{3}/.test(stoichText));
  // Add a solvent and check molarity appears
  await p.getByText('+ Add Blank Solvent').click();
  await p.waitForTimeout(700);
  stoichText = await p.evaluate(()=>document.querySelector('.stoich-conditions')?.textContent||'');
  check('Stoich: reaction molarity from solvent', /Molarity:\s*\d/.test(stoichText), stoichText.slice(0,60));
  // Toggle limiting to 2nd reactant → recompute (radio count = 2)
  const radios = await p.locator('.stoich-table input[type=radio]').count();
  check('Limit? radios present', radios === 2, `radios=${radios}`);
  await p.locator('.stoich-table input[type=radio]').nth(1).click();
  await p.waitForTimeout(700);
  check('Limiting toggle recomputes without error', !(await p.evaluate(()=>document.querySelector('.stoich-error')?.textContent)), '');
  await p.locator('.stoich-panel .icon-btn').click();

  // 4. Inventory dialog: simple search by location, then insert
  await p.evaluate(()=>window.ketcher.setMolecule(''));
  await p.waitForTimeout(400);
  await p.getByText('Reagents…', {exact:true}).click();
  await p.waitForSelector('.inventory-modal', {timeout:5000});
  await p.locator('.inventory-filters input').nth(2).fill('Stock Room 3');
  await p.waitForFunction(()=>document.querySelectorAll('.inventory-table tbody tr').length>0, {timeout:6000});
  const headers = await p.evaluate(()=>[...document.querySelectorAll('.inventory-table th')].map(e=>e.textContent));
  check('Inventory: SPEC columns', ['Internal ID','Container ID','Location','Name','CAS','Cost','Size','Supplier'].every(h=>headers.includes(h)), headers.join('|'));
  // structure tab
  await p.evaluate(()=>window.ketcher.setMolecule('c1ccncc1'));
  await p.waitForTimeout(800);
  await p.getByText('Structure Search', {exact:true}).click();
  await p.getByText('Search using canvas structure').click();
  await p.waitForFunction(()=>[...document.querySelectorAll('.inventory-table td')].some(td=>td.textContent==='Pyridine'), {timeout:6000});
  check('Inventory: structure tab finds Pyridine', true);
  await p.locator('.inventory-table tbody tr', { hasText: 'Pyridine' }).first().getByText('Insert').click();
  await p.waitForTimeout(1000);
  const smiles = await p.evaluate(()=>window.ketcher.getSmiles());
  check('Inventory: insert onto canvas', /c1ccncc1|n1ccccc1/.test(smiles), smiles);

  await p.screenshot({ path: '/home/user/chemeditor/reports/demo-v1.png' });
  check('No page errors', errs.length===0, errs.join(' | '));
} catch(e){ check('run', false, String(e).slice(0,250)); }
finally { await b.close(); }
process.exit(failed?1:0);
