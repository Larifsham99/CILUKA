/* Kompas Pip — enjin pembelajaran adaptif (Pelan Produk, Bahagian 11).
   Lima mekanisme: Skor Kuasa, Kotak Ingatan, Radar Keliru, Zon Hebat, Penjana Misi.
   Berasaskan peraturan, berjalan sepenuhnya dalam peranti. */
(function () {
  const D = window.CilukaData;
  const BOX_DAYS = [0, 0, 1, 2, 4, 8, 16];
  const DAY = 86400000;

  function item(key) {
    const p = Store.p;
    if (!p.items[key]) p.items[key] = { score: 0, box: 1, due: 0, seen: 0, last: [], conf: {}, ctx: [], days: [] };
    return p.items[key];
  }

  /* ---------- 1. Skor Kuasa + 2. Kotak Ingatan + 3. Radar Keliru ---------- */
  function record(key, r) {
    // r = { correct, hints, ms, chosen, game }
    const p = Store.p;
    const it = item(key);
    it.seen++;
    const fast = r.ms != null && r.ms <= p.avgMs;
    if (r.ms != null) p.avgMs = Math.round(p.avgMs * 0.85 + Math.min(r.ms, 12000) * 0.15);

    let delta;
    if (r.correct) delta = (r.hints || 0) === 0 ? (fast ? 12 : 8) : (r.hints === 1 ? 6 : 2);
    else delta = -8;
    it.score = Math.max(0, Math.min(100, it.score + delta));

    it.last.push(r.correct ? 1 : 0);
    if (it.last.length > 8) it.last.shift();

    if (r.correct) {
      it.box = Math.min(6, it.box + 1);
      if (r.game && !it.ctx.includes(r.game)) it.ctx.push(r.game);
      const t = Store.today();
      if (!it.days.includes(t)) { it.days.push(t); if (it.days.length > 10) it.days.shift(); }
    } else {
      it.box = 1;
      if (r.chosen && r.chosen !== key.slice(2)) it.conf[r.chosen] = (it.conf[r.chosen] || 0) + 1;
    }
    it.due = Date.now() + BOX_DAYS[it.box] * DAY;

    // Tanda keliru dibuang selepas 4 betul berturut-turut
    if (it.last.slice(-4).join('') === '1111') it.conf = {};
    Store.save();
    return it;
  }

  function status(key) {
    const it = Store.p.items[key];
    if (!it || it.seen === 0) return 0;              // belum
    // Dikuasai: skor ≥ 75, betul dalam ≥ 2 jenis permainan & ≥ 2 hari (prototaip: 1 hari dibenarkan dengan skor ≥ 90)
    if (it.score >= 75 && (it.ctx.length >= 2 || it.score >= 90) && (it.days.length >= 2 || it.score >= 90)) return 2;
    return 1;                                         // sedang belajar
  }

  function confusedWith(letter) {
    const it = Store.p.items['L:' + letter];
    if (!it) return [];
    return Object.entries(it.conf).filter(([, n]) => n >= 2).map(([l]) => l);
  }

  /* ---------- Huruf yang dibuka ---------- */
  function unlockedLetters() {
    const learned = D.LETTER_ORDER.filter(l => (Store.p.items['L:' + l] || {}).score >= 40).length;
    const n = Math.min(D.LETTER_ORDER.length, 3 + learned);
    return D.LETTER_ORDER.slice(0, n);
  }

  function pickLetter(mode) {
    const un = unlockedLetters();
    const sc = l => (Store.p.items['L:' + l] || { score: 0 }).score;
    if (mode === 'review') {
      const now = Date.now();
      const due = un.filter(l => { const it = Store.p.items['L:' + l]; return it && it.seen && (it.due <= now || confusedWith(l).length); });
      if (due.length) return due.sort((a, b) => sc(a) - sc(b))[0];
    }
    // sempadan kemahiran: huruf dibuka dengan skor terendah (utamakan yang terbaru dibuka jika seri)
    return un.slice().sort((a, b) => sc(a) - sc(b) || un.indexOf(b) - un.indexOf(a))[0];
  }

  /* ---------- Pengganggu pintar ---------- */
  function distractors(target, n) {
    const out = [];
    const add = l => { if (l && l !== target && !out.includes(l)) out.push(l); };
    confusedWith(target).forEach(add);
    const level = zone('L:' + target);
    if (level >= 2) (D.CONFUSABLE[target] || []).forEach(add);
    const pool = unlockedLetters().concat(D.LETTER_ORDER.slice(0, 12));
    shuffle(pool).forEach(add);
    return out.slice(0, n);
  }

  /* ---------- 4. Zon Hebat — tahap kesukaran 1..3 (sasaran 70–85% betul) ---------- */
  function zone(key) {
    const it = Store.p.items[key];
    if (!it || it.last.length < 3) return 1;
    const acc = it.last.reduce((a, b) => a + b, 0) / it.last.length;
    let lvl = it.score >= 60 ? 3 : it.score >= 30 ? 2 : 1;
    if (acc < 0.5) lvl = 1; else if (acc < 0.7) lvl = Math.max(1, lvl - 1);
    return lvl;
  }

  /* ---------- Tulis ---------- */
  function pickWriteLetter() {
    const writable = Object.keys(D.STROKES);
    const un = unlockedLetters().filter(l => writable.includes(l));
    const list = un.length ? un : ['a'];
    const sc = l => (Store.p.items['W:' + l] || { score: 0 }).score;
    return list.slice().sort((a, b) => sc(a) - sc(b) || list.indexOf(a) - list.indexOf(b))[0];
  }

  /* ---------- Sarang Kata ---------- */
  function pickWord() {
    const p = Store.p;
    const un = unlockedLetters();
    const fresh = D.WORDS.filter(w => !p.words.includes(w.w));
    const pool = fresh.length ? fresh : D.WORDS;
    const known = w => w.w.split('').filter(c => un.includes(c)).length / w.w.length;
    return pool.slice().sort((a, b) => a.lvl - b.lvl || known(b) - known(a))[0];
  }

  /* ---------- 5. Penjana Misi — 3 belon ---------- */
  function missions(force) {
    const p = Store.p;
    const t = Store.today();
    if (!force && p.missions && p.missions.date === t) return p.missions;
    const newL = pickLetter('new');
    let revL = pickLetter('review');
    p.missions = {
      date: t,
      list: [
        { type: 'ciluk', target: newL, icon: '🔍', label: 'Cari huruf' },
        { type: 'tulis', target: pickWriteLetter(), icon: '✏️', label: 'Tulis huruf' },
        { type: 'sarang', target: pickWord().w, icon: '🥚', label: 'Sarang Kata', review: revL }
      ].map(m => Object.assign(m, { done: false }))
    };
    Store.save();
    return p.missions;
  }

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  window.Kompas = { record, status, confusedWith, unlockedLetters, pickLetter, distractors, zone, pickWriteLetter, pickWord, missions, shuffle, item };
})();
