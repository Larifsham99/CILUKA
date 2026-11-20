/* Ujian sebutan: simulasi suara telefon (Melayu / Indonesia / Inggeris sahaja) dan rekod ayat yang disebut. */
const { chromium } = require('playwright');
const BASE = process.argv[2] || 'http://localhost:4173/';

function fakeVoices(langs) {
  return `(() => {
    const voices = ${JSON.stringify(langs)}.map(l => ({ lang: l, name: 'Ujian ' + l, localService: true, default: false, voiceURI: l }));
    window.__spoken = [];
    const synth = {
      getVoices: () => voices, speaking: false, pending: false, paused: false,
      speak: u => { window.__spoken.push({ text: u.text, lang: u.lang, voice: u.voice && u.voice.lang }); setTimeout(() => u.onend && u.onend(), 30); },
      cancel: () => {}, pause: () => {}, resume: () => {}, addEventListener: () => {}, removeEventListener: () => {}, onvoiceschanged: null
    };
    Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  })();`;
}

(async () => {
  const b = await chromium.launch();
  let fails = 0;
  const check = (name, pass, extra = '') => { if (!pass) fails++; console.log(`${pass ? 'LULUS' : 'GAGAL'}  ${name}${extra ? ' — ' + extra : ''}`); };
  for (const [label, langs] of [['Melayu', ['en-US', 'ms-MY']], ['Indonesia', ['en-US', 'id-ID']], ['Inggeris sahaja', ['en-US', 'en-GB']]]) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    await ctx.addInitScript(fakeVoices(langs));
    const p = await ctx.newPage();
    await p.goto(BASE + '?ujian');
    await p.fill('#profile-name', 'Aisyah'); await p.click('button[type=submit]'); await p.waitForSelector('.island');
    await p.goto(BASE + '?ujian#/main/letter-hunt?tahap=1'); await p.waitForSelector('.ask-letter'); await p.waitForTimeout(700);
    const target = await p.$eval('.ask-letter', e => e.textContent.trim());
    await p.goto(BASE + '?ujian#/main/sound-hunt?tahap=1'); await p.waitForSelector('.sound-orb'); await p.waitForTimeout(700);
    const spoken = await p.evaluate(() => window.__spoken);
    const texts = spoken.map(s => s.text);
    console.log(`\n[${label}] contoh: ${texts.slice(-4).map(t => JSON.stringify(t)).join(' | ')}`);
    if (label === 'Inggeris sahaja') {
      check(`${label}: tiada suara Inggeris membaca Bahasa Melayu`, spoken.length === 0, `${spoken.length} ujaran`);
    } else {
      const want = label === 'Melayu' ? 'ms-MY' : 'id-ID';
      check(`${label}: semua ujaran guna suara ${want}`, spoken.length > 0 && spoken.every(s => s.voice === want));
      check(`${label}: tiada token/simbol mentah disebut`, texts.every(t => !/[{}\/…]|\.\.\./.test(t)));
      const NAMES = { a: 'a', b: 'bi', c: 'si', d: 'di', e: 'i', f: 'ef', g: 'ji', h: 'ec', i: 'ai', j: 'jei', k: 'kei', l: 'el', m: 'em', n: 'en', o: 'o', p: 'pi', q: 'kiu', r: 'ar', s: 'es', t: 'ti', u: 'yu', v: 'vi', w: 'dabel yu', x: 'eks', y: 'wai', z: 'zed' };
      const nameOk = texts.some(t => t.includes(`Cari huruf ${NAMES[target.toLowerCase()]}!`));
      check(`${label}: nama huruf disebut dengan betul`, nameOk);
      check(`${label}: bunyi huruf guna suku kata (bukan "mmm"/"beh")`, texts.some(t => t.startsWith('Dengar baik-baik.')) && texts.every(t => !/\b(mmm|sss|nnn|rrr|zzz|beh|keh|teh)\b/.test(t)));
    }
    await ctx.close();
  }
  console.log(`\nJUMLAH: ${fails ? 'ADA KEGAGALAN' : 'semua lulus'}`);
  await b.close();
  process.exit(fails ? 1 : 0);
})();
