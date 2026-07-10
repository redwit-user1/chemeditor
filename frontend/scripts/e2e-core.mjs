import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox']});
const p = await b.newPage();
const errs=[];
p.on('pageerror', e => errs.push(e.message));
let failed=false;
const check=(n,c,x='')=>{console.log(`${c?'PASS':'FAIL'}  ${n}${x?' — '+x:''}`); if(!c) failed=true;};
try {
  await p.goto('http://localhost:3000/', {waitUntil:'domcontentloaded', timeout:60000});
  await p.waitForFunction(()=>!!window.ketcher, {timeout:60000});
  check('Ketcher ready', true);

  // Simulate paste/draw: load aspirin into the editor.
  await p.evaluate(()=>window.ketcher.setMolecule('CC(=O)Oc1ccccc1C(=O)O'));

  // The bottom bar must show the RDKit-computed formula within ~2s.
  await p.waitForFunction(() => {
    const t = document.querySelector('.prop-bar')?.textContent || '';
    return t.includes('C9H8O4');
  }, {timeout:8000}).catch(()=>{});

  const barText = await p.evaluate(()=>document.querySelector('.prop-bar')?.textContent || '');
  check('Property bar shows formula C9H8O4', barText.includes('C9H8O4'), barText.slice(0,120));
  check('Property bar shows MW 180.16', barText.includes('180.16'), '');
  check('Engine label mentions RDKit', /RDKit/.test(barText), '');

  // Now clear → bar should return to empty prompt.
  await p.evaluate(()=>window.ketcher.setMolecule(''));
  await p.waitForTimeout(1000);
  const emptyText = await p.evaluate(()=>document.querySelector('.prop-bar')?.textContent || '');
  check('Clearing resets the bar', emptyText.includes('Draw or paste') || emptyText.includes('—'), emptyText.slice(0,80));

  check('No page errors', errs.length===0, errs.join(' | '));
} catch(e){ check('run', false, String(e).slice(0,200)); }
finally { await b.close(); }
process.exit(failed?1:0);
