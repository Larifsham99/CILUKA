/* Ujian asap: setiap permainan × setiap tahap (1–5) dibuka, dimulakan dan dimain beberapa ketikan tanpa ralat. */
const { chromium } = require('playwright');
const BASE = process.argv[2] || 'http://localhost:4173/';
const GAMES = ['letter-hunt', 'letter-match', 'letter-balloon', 'memory-letter', 'sound-hunt', 'magic-tracing', 'word-builder', 'missing-letter', 'syllable-puzzle', 'object-match', 'letter-race', 'star-challenge'];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(BASE + '?ujian');
  await p.fill('#profile-name', 'Uji'); await p.click('button[type=submit]'); await p.waitForSelector('.island');
  await p.evaluate(() => { const k = 'ciluka:v1:index'; const i = JSON.parse(localStorage.getItem(k)); i.settings.unlockAll = true; localStorage.setItem(k, JSON.stringify(i)); });
  let fails = 0;
  for (const g of GAMES) for (let l = 1; l <= 5; l++) {
    const before = errs.length;
    await p.goto(`${BASE}?ujian#/main/${g}?tahap=${l}`);
    await p.reload();
    await p.waitForSelector('.play-btn');
    const shown = await p.$eval('.game-title span', e => e.textContent);
    await p.click('.play-btn');
    await p.waitForTimeout(900);
    // beberapa ketikan rawak pada pilihan
    for (let k = 0; k < 4; k++) {
      const el = await p.$('.letter-bubble:not(.wrong), .tile:not(.used), .syl-piece:not(.used), .obj-opt, .mem-card:not(.up), .match-card:not(.done), .fly-balloon, .race-sign');
      if (el) await el.evaluate(e => e.click());
      await p.waitForTimeout(250);
    }
    const body = await p.$('.game-body > *');
    const ok = errs.length === before && !!body && shown.startsWith(`Tahap ${l}`);
    if (!ok) fails++;
    console.log(`${ok ? 'LULUS' : 'GAGAL'}  ${g} tahap ${l}${errs.length > before ? ' — ' + errs.slice(before).join(' | ') : ''}`);
  }
  console.log(`JUMLAH: ${GAMES.length * 5 - fails}/${GAMES.length * 5} lulus`);
  await b.close();
  process.exit(fails ? 1 : 0);
})();
