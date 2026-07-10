import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox']});
const p = await b.newPage({ viewport: { width: 1360, height: 820 }});
let failed=false; const check=(n,c,x='')=>{console.log(`${c?'PASS':'FAIL'}  ${n}${x?' — '+x:''}`); if(!c) failed=true;};
try {
  await p.goto('http://localhost:3000/', {waitUntil:'domcontentloaded', timeout:60000});
  await p.waitForFunction(()=>!!window.ketcher, {timeout:60000});
  // load a reaction (esterification) into the editor
  await p.evaluate(()=>window.ketcher.setMolecule('CC(=O)O.OCC>>CC(=O)OCC.O'));
  await p.waitForTimeout(1500);
  await p.getByText('Stoich…', {exact:true}).click();
  await p.waitForSelector('.stoich-panel', {timeout:5000});
  await p.getByText('Load reaction from canvas').click();
  await p.waitForFunction(()=>document.querySelectorAll('.stoich-table tbody tr').length>0, {timeout:8000});
  const rows = await p.evaluate(()=>document.querySelectorAll('.stoich-table tbody tr').length);
  check('Stoich table populated', rows>=4, `rows=${rows}`);
  const tableText = await p.evaluate(()=>document.querySelector('.stoich-table')?.textContent||'');
  check('Shows reactant formula C2H4O2', tableText.includes('C2H4O2'), '');
  check('Shows product C4H8O2', tableText.includes('C4H8O2'), '');
  await p.waitForTimeout(500);
  await p.screenshot({ path: '/home/user/chemeditor/reports/demo-stoich.png' });
  console.log('screenshot saved');
} catch(e){ check('run', false, String(e).slice(0,200)); }
finally { await b.close(); }
process.exit(failed?1:0);
