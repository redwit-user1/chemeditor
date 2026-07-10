import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox']});
const p = await b.newPage({ viewport: { width: 1360, height: 820 }});
let failed=false; const check=(n,c,x='')=>{console.log(`${c?'PASS':'FAIL'}  ${n}${x?' — '+x:''}`); if(!c) failed=true;};
try {
  await p.goto('http://localhost:3000/', {waitUntil:'domcontentloaded', timeout:60000});
  await p.waitForFunction(()=>!!window.ketcher, {timeout:60000});
  await p.getByText('Reagents…', {exact:true}).click();
  await p.waitForSelector('.reagent-modal', {timeout:5000});
  await p.locator('.reagent-search input').fill('pyridine');
  await p.waitForFunction(()=>document.querySelectorAll('.reagent-row').length>0, {timeout:5000});
  const names = await p.evaluate(()=>[...document.querySelectorAll('.reagent-name')].map(e=>e.textContent));
  check('Reagent search finds Pyridine', names.includes('Pyridine'), names.join(','));
  await p.waitForTimeout(400);
  await p.screenshot({ path: '/home/user/chemeditor/reports/demo-reagents.png' });
  // insert it
  await p.locator('.reagent-row', { hasText: 'Pyridine' }).getByText('Insert').click();
  await p.waitForTimeout(1200);
  const smiles = await p.evaluate(()=>window.ketcher.getSmiles());
  check('Inserted reagent onto canvas', /n1ccccc1|c1ccncc1/.test(smiles), smiles);
  console.log('screenshot saved');
} catch(e){ check('run', false, String(e).slice(0,200)); }
finally { await b.close(); }
process.exit(failed?1:0);
