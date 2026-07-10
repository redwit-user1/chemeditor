import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox']});
const p = await b.newPage({ viewport: { width: 1360, height: 820 }});
let failed=false; const check=(n,c,x='')=>{console.log(`${c?'PASS':'FAIL'}  ${n}${x?' — '+x:''}`); if(!c) failed=true;};
try {
  await p.goto('http://localhost:3000/', {waitUntil:'domcontentloaded', timeout:60000});
  await p.waitForFunction(()=>!!window.ketcher, {timeout:60000});
  await p.evaluate(()=>window.ketcher.setMolecule('c1ccccc1'));
  await p.waitForFunction(()=>(document.querySelector('.prop-bar')?.textContent||'').includes('C6H6'), {timeout:8000}).catch(()=>{});
  // open search panel
  const searchBtn = await p.getByText('Search…', {exact:true});
  await searchBtn.click();
  await p.waitForSelector('.search-panel', {timeout:5000});
  check('Search panel opens', true);
  // run substructure search using current structure (benzene)
  await p.getByText('Search using current structure').click();
  await p.waitForFunction(()=>document.querySelectorAll('.hit').length>0, {timeout:8000});
  const hitCount = await p.evaluate(()=>document.querySelectorAll('.hit').length);
  const regids = await p.evaluate(()=>[...document.querySelectorAll('.hit-regid')].map(e=>e.textContent));
  check('Substructure search returns hits', hitCount>=3, `hits=${hitCount} regids=${regids.join(',')}`);
  check('Backend label shown', /portable_fp/.test(await p.evaluate(()=>document.querySelector('.search-meta')?.textContent||'')), '');
  await p.waitForTimeout(600);
  await p.screenshot({ path: '/home/user/chemeditor/reports/demo-search.png' });
  console.log('screenshot saved');
} catch(e){ check('run', false, String(e).slice(0,200)); }
finally { await b.close(); }
process.exit(failed?1:0);
