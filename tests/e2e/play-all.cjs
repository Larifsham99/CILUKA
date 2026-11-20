/* Ujian hujung-ke-hujung CILUKA (Playwright). Menjalankan:
   profil → pintu ibu bapa → semua 11 permainan dimainkan hingga selesai → simpanan selepas muat semula
   → tukar profil → reset → luar talian → susun atur 360/390/430px.
   Guna: node tests/e2e/play-all.cjs [URL] [folder-tangkapan-skrin] */
const { chromium } = require('playwright');
const BASE = process.argv[2] || 'http://localhost:4173/';
const OUT = process.argv[3] || 'test-shots';
require('fs').mkdirSync(OUT, { recursive: true });

const results = [];
const ok = (name, pass, extra = '') => { results.push({ name, pass, extra }); console.log(`${pass ? 'LULUS' : 'GAGAL'}  ${name}${extra ? ' — ' + extra : ''}`); };
const wait = ms => new Promise(r => setTimeout(r, ms));

async function solveGate(page) {
  await page.waitForSelector('.gate-q');
  const q = await page.$eval('.gate-q', e => e.textContent.match(/(\d+)\s*\+\s*(\d+)/));
  for (const ch of String(+q[1] + +q[2])) await page.click(`.numpad button:text-is("${ch}")`);
  await wait(400);
}

const jsClick = (page, sel) => page.$eval(sel, e => e.click()).then(() => true).catch(() => false);

async function playGame(page, id) {
  await page.goto(BASE + '?ujian#/main/' + id + '?tahap=1');
  await page.waitForSelector('.intro-card');
  await page.click('.play-btn');
  await page.waitForTimeout(500);
  const t0 = Date.now();
  while (Date.now() - t0 < 120000) {
    if (await page.$('.result-card')) break;
    switch (id) {
      case 'letter-hunt': {
        const t = await page.$eval('.ask-letter', e => e.textContent.toLowerCase()).catch(() => null);
        if (t) await jsClick(page, `.letter-bubble[aria-label="Huruf ${t}"]:not(.correct)`);
        await wait(1300); break;
      }
      case 'letter-match': {
        const big = await page.$('.match-card.big:not(.done)');
        if (big) { const l = (await big.textContent()).toLowerCase(); await big.click(); await wait(150); await page.click(`.match-card.small[aria-label="Huruf kecil ${l}"]`); }
        await wait(500); break;
      }
      case 'memory-letter': {
        const faces = await page.$$eval('.mem-card', cs => cs.map((c, i) => ({ i, f: c.querySelector('.mem-front').textContent.toLowerCase(), m: c.classList.contains('matched') })));
        const left = faces.filter(f => !f.m);
        if (left.length >= 2) {
          const a = left[0]; const b = left.find(x => x.i !== a.i && x.f === a.f);
          const cards = await page.$$('.mem-card');
          await cards[a.i].click(); await wait(200); await cards[b.i].click(); await wait(900);
        } else await wait(500);
        break;
      }
      case 'sound-hunt': {
        const w = await page.$eval('.sound-pic svg', e => e.getAttribute('aria-label')).catch(() => null);
        if (w) await jsClick(page, `.letter-bubble[aria-label="Huruf ${w[0]}"]:not(.correct)`);
        await wait(1700); break;
      }
      case 'magic-tracing': {
        const item = await page.$eval('.trace-model span:last-child', e => e.textContent).catch(() => null);
        const canvas = await page.$('.trace-board canvas');
        if (!item || !canvas) { await wait(600); break; }
        const key = await page.evaluate(label => {
          const names = { 'Garis tegak': 'tegak', 'Garis datar': 'datar', 'Garis condong': 'condong', 'Lengkung': 'lengkung', 'Zigzag': 'zigzag', 'Bulatan': 'bulatan', 'Segi tiga': 'segitiga', 'Segi empat': 'segiempat' };
          return names[label] ? 'shape:' + names[label] : label;
        }, item);
        const strokes = await page.evaluate(k => window.__ciluka.strokesFor(k), key);
        const box = await canvas.boundingBox();
        const S = box.width;
        const map = ([x, y]) => [box.x + S * 0.1 + x * S * 0.008, box.y + S * 0.1 + y * S * 0.008];
        for (const st of strokes) {
          const pts = st.map(map);
          await page.mouse.move(...pts[0]); await page.mouse.down();
          for (const q of pts) await page.mouse.move(q[0] + (Math.random() * 4 - 2), q[1] + (Math.random() * 4 - 2), { steps: 2 });
          await page.mouse.up(); await wait(120);
        }
        await wait(2800); break;
      }
      case 'word-builder': {
        const w = await page.$eval('.word-egg svg', e => e.getAttribute('aria-label')).catch(() => null);
        if (!w) { await wait(500); break; }
        const filled = await page.$$eval('.slot.filled', s => s.length);
        if (filled < w.length) await jsClick(page, `.tile:not(.used)[aria-label="Huruf ${w[filled]}"]`);
        await wait(350); break;
      }
      case 'missing-letter': {
        const w = await page.$eval('.g-missing > svg', e => e.getAttribute('aria-label')).catch(() => null);
        const idx = await page.$$eval('.slots .slot', ss => ss.findIndex(s => s.classList.contains('next')));
        if (w && idx >= 0) await jsClick(page, `.letter-bubble[aria-label="Huruf ${w[idx]}"]`);
        await wait(700); break;
      }
      case 'syllable-puzzle': {
        const w = await page.$eval('.g-syll > svg', e => e.getAttribute('aria-label')).catch(() => null);
        if (!w) { await wait(500); break; }
        const syl = await page.evaluate(x => window.__ciluka.WORD_MAP[x].syllables, w);
        const placed = await page.$$eval('.syl-slot.filled', s => s.length);
        if (placed < syl.length) await jsClick(page, `.syl-piece:not(.used)[aria-label="Suku kata ${syl[placed]}"]`);
        await wait(500); break;
      }
      case 'object-match': {
        const w = await page.$eval('.obj-word', e => e.textContent.toLowerCase()).catch(() => null);
        if (w) await jsClick(page, `.obj-opt[aria-label="${w}"]:not(.correct)`);
        await wait(1400); break;
      }
      case 'letter-balloon': {
        const t = await page.$eval('.balloon-target .glyph', e => e.textContent.trim()).catch(() => null);
        if (t) await jsClick(page, `.fly-balloon:not(.popped)[aria-label="Belon huruf ${t}"]`);
        await wait(600); break;
      }
      case 'letter-race': {
        const t = await page.$eval('.race-ask .glyph', e => e.textContent.trim().toLowerCase()).catch(() => null);
        const w = t ? null : await page.$eval('.race-ask svg', e => e.getAttribute('aria-label')).catch(() => null);
        const want = t || (w && w[0]);
        if (want) await jsClick(page, `.race-sign[aria-label="Huruf ${want}"]`);
        await wait(400); break;
      }
      case 'star-challenge': {
        // cuba setiap pilihan sehingga betul (menguji juga keadaan "salah")
        const opts = await page.$$('.letter-bubble:not(.wrong):not(.correct), .obj-opt:not(.wrong):not(.correct)');
        if (opts.length) await opts[0].evaluate(e => e.click());
        await wait(1100); break;
      }
    }
  }
  const done = !!(await page.$('.result-card'));
  const stars = done ? await page.$$eval('.result-stars .star-on', s => s.length) : 0;
  await page.screenshot({ path: `${OUT}/game-${id}.png` });
  ok(`Permainan ${id} dimainkan hingga selesai`, done, `${stars} bintang`);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: false });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/speech/i.test(m.text())) errors.push(m.text()); });

  // 1. Profil pertama
  await page.goto(BASE + '?ujian');
  await page.waitForSelector('#profile-name');
  await page.screenshot({ path: `${OUT}/01-cipta-profil.png` });
  await page.fill('#profile-name', 'Aisyah');
  await page.click('.avatar-pick button[aria-label="Arnab"]');
  await page.click('.age-pick button:has-text("4")');
  await page.click('button[type=submit]');
  await page.waitForSelector('.home .island');
  await wait(800);
  await page.screenshot({ path: `${OUT}/02-peta-dunia.png` });
  ok('Profil dicipta dan peta dunia dipaparkan', await page.$eval('.me-text strong', e => e.textContent) === 'Aisyah');
  ok('9 pulau dipaparkan', (await page.$$('.island')).length === 9);
  ok('Pulau berkunci mempunyai keadaan kunci', (await page.$$('.island.locked')).length >= 4);

  // 2. Misi harian dari peta
  await page.click('.mission-play');
  await page.waitForSelector('.intro-card');
  ok('Butang Main misi membuka permainan misi', page.url().includes('misi=1'));

  // 3. Pintu ibu bapa + buka semua (untuk menguji setiap permainan)
  await page.goto(BASE + '?ujian#/ibubapa');
  await solveGate(page);
  await page.waitForSelector('.p-tabs');
  ok('Pintu ibu bapa berfungsi', true);
  await page.click('.p-tabs button:has-text("Tetapan")');
  await page.click('#set-unlock');
  ok('Tetapan buka semua disimpan', await page.$eval('#set-unlock', e => e.checked));

  // 4. Semua permainan
  for (const g of ['letter-hunt', 'letter-match', 'letter-balloon', 'memory-letter', 'sound-hunt', 'magic-tracing', 'word-builder', 'missing-letter', 'syllable-puzzle', 'object-match', 'letter-race', 'star-challenge']) {
    await playGame(page, g);
  }

  // 5. Simpanan selepas muat semula
  await page.goto(BASE + '?ujian#/');
  await page.waitForSelector('.star-count b');
  const starsBefore = await page.$eval('.star-count b', e => +e.textContent);
  await page.reload();
  await page.waitForSelector('.star-count b');
  const starsAfter = await page.$eval('.star-count b', e => +e.textContent);
  ok('Bintang disimpan selepas muat semula', starsBefore > 0 && starsBefore === starsAfter, `${starsAfter} bintang`);

  // 6. Koleksi & peti
  await page.goto(BASE + '?ujian#/koleksi');
  await page.waitForSelector('.badge-grid');
  const badges = await page.$$eval('.badge-cell:not(.locked)', b => b.length);
  ok('Lencana diperoleh dan dipaparkan', badges > 0, `${badges} lencana`);
  await page.screenshot({ path: `${OUT}/03-koleksi.png` });

  // 7. Laporan ibu bapa
  await page.goto(BASE + '?ujian#/ibubapa');
  if (await page.$('.gate-q')) await solveGate(page);
  await page.waitForSelector('.p-summary');
  await page.screenshot({ path: `${OUT}/04-laporan.png`, fullPage: true });
  ok('Laporan menunjukkan aktiviti', (await page.$$('.activity li')).length > 0);
  await page.click('.p-tabs button:has-text("Portfolio")');
  await page.waitForTimeout(400);
  ok('Portfolio menyimpan rekod tulisan', (await page.$$('.writing-cell')).length > 0);
  await page.screenshot({ path: `${OUT}/05-portfolio.png`, fullPage: true });

  // 8. Profil kedua + tukar profil
  await page.click('.p-tabs button:has-text("Profil")');
  await page.click('button:has-text("+ Tambah Profil")');
  await page.fill('#profile-name', 'Danish');
  await page.click('button[type=submit]');
  await page.waitForTimeout(500);
  await page.goto(BASE + '?ujian#/');
  await page.waitForSelector('.me-text strong');
  const name2 = await page.$eval('.me-text strong', e => e.textContent);
  const stars2 = await page.$eval('.star-count b', e => +e.textContent);
  ok('Profil kedua mempunyai rekod berasingan', name2 === 'Danish' && stars2 === 0);
  await page.click('.me');
  await page.waitForSelector('.profile-tile');
  await page.click('.profile-tile:has-text("Aisyah")');
  await page.waitForSelector('.star-count b');
  ok('Tukar profil kembali kepada Aisyah', (await page.$eval('.me-text strong', e => e.textContent)) === 'Aisyah' && (await page.$eval('.star-count b', e => +e.textContent)) === starsAfter);

  // 9. Reset data
  await page.goto(BASE + '?ujian#/ibubapa');
  if (await page.$('.gate-q')) await solveGate(page);
  await page.click('.p-tabs button:has-text("Tetapan")');
  await page.click('button:has-text("Reset Kemajuan")');
  await solveGate(page);
  await page.click('.modal button:has-text("Reset")');
  await page.goto(BASE + '?ujian#/');
  await page.waitForSelector('.star-count b');
  ok('Reset kemajuan dengan pengesahan ibu bapa', (await page.$eval('.star-count b', e => +e.textContent)) === 0);

  // 10. Luar talian (service worker)
  const swReady = await page.evaluate(async () => { const r = await navigator.serviceWorker.ready; return !!r.active; }).catch(() => false);
  await wait(1500);
  await ctx.setOffline(true);
  await page.reload().catch(() => null);
  const offlineOk = await page.waitForSelector('.home .island', { timeout: 8000 }).then(() => true).catch(() => false);
  ok('Aplikasi dibuka tanpa internet (service worker)', swReady && offlineOk);
  if (offlineOk) { await page.goto(BASE + '?ujian#/main/letter-hunt?tahap=1').catch(() => null); ok('Permainan dibuka tanpa internet', await page.waitForSelector('.intro-card', { timeout: 8000 }).then(() => true).catch(() => false)); }
  await ctx.setOffline(false);

  // 11. Susun atur responsif
  for (const w of [360, 390, 430, 768]) {
    const p2 = await ctx.newPage();
    await p2.setViewportSize({ width: w, height: w === 768 ? 1024 : 780 });
    for (const route of ['', 'dunia/letter-land', 'main/word-builder?tahap=1', 'koleksi', 'ibubapa']) {
      await p2.goto(BASE + '?ujian#/' + route);
      await p2.waitForTimeout(500);
      if (await p2.$('.gate-q')) await solveGate(p2);
      const overflow = await p2.evaluate(() => [...document.querySelectorAll('.screen, .screen *')].some(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(el).position !== 'fixed' && !el.closest('.cloud, .sky-deco, .confetti-layer, .map-scroll .island, .balloon-sky'); }));
      ok(`Tiada limpahan mendatar @${w}px /${route || 'peta'}`, !overflow);
      if (route === '' || route.startsWith('main')) await p2.screenshot({ path: `${OUT}/w${w}-${route ? 'game' : 'home'}.png` });
    }
    await p2.close();
  }

  ok('Tiada ralat JavaScript', errors.length === 0, errors.slice(0, 5).join(' | '));
  const failed = results.filter(r => !r.pass);
  console.log(`\nJUMLAH: ${results.length - failed.length}/${results.length} lulus`);
  await browser.close();
  process.exit(failed.length ? 1 : 0);
})();
