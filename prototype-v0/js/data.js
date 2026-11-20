/* Kandungan CILUKA — huruf, perkataan, templat tulisan, dialog. */
(function () {
  // Urutan pengenalan huruf mengikut kegunaan dalam Bahasa Melayu (Pelan Produk, Bahagian 9)
  const LETTER_ORDER = ['a', 'i', 'u', 'b', 'm', 's', 'k', 'o', 'e', 't', 'p', 'n', 'l', 'd', 'r', 'g', 'h', 'j', 'c', 'y', 'w', 'f', 'v', 'q', 'x', 'z'];

  // Pasangan keliru lalai (Radar Keliru)
  const CONFUSABLE = {
    b: ['d', 'p', 'h'], d: ['b', 'q', 'a'], p: ['q', 'b', 'd'], q: ['p', 'g', 'd'],
    m: ['n', 'w', 'u'], n: ['m', 'u', 'h'], u: ['n', 'v', 'y'], w: ['m', 'v'],
    i: ['l', 'j', 't'], l: ['i', 't', 'k'], t: ['f', 'l', 'i'], f: ['t', 'l'],
    a: ['o', 'd', 'e'], o: ['a', 'c', 'e'], e: ['c', 'o', 'a'], c: ['e', 'o'],
    g: ['q', 'y'], s: ['z', 'c'], z: ['s', 'x'], h: ['n', 'k'], k: ['h', 'x'],
    r: ['n', 'v'], y: ['g', 'v'], j: ['i', 'y'], v: ['u', 'w', 'y'], x: ['k', 'z']
  };

  // Perkataan Sarang Kata — tahap mengikut struktur suku kata (Pelan Produk, Bahagian 14)
  const WORDS = [
    { w: 'susu', syl: ['su', 'su'], e: '🥛', lvl: 1 },
    { w: 'bola', syl: ['bo', 'la'], e: '⚽', lvl: 2 },
    { w: 'buku', syl: ['bu', 'ku'], e: '📘', lvl: 2 },
    { w: 'mata', syl: ['ma', 'ta'], e: '👁️', lvl: 2 },
    { w: 'kaki', syl: ['ka', 'ki'], e: '🦶', lvl: 2 },
    { w: 'baju', syl: ['ba', 'ju'], e: '👕', lvl: 2 },
    { w: 'nasi', syl: ['na', 'si'], e: '🍚', lvl: 2 },
    { w: 'roti', syl: ['ro', 'ti'], e: '🍞', lvl: 2 },
    { w: 'topi', syl: ['to', 'pi'], e: '🧢', lvl: 2 },
    { w: 'lori', syl: ['lo', 'ri'], e: '🚚', lvl: 2 },
    { w: 'ibu', syl: ['i', 'bu'], e: '👩', lvl: 3 },
    { w: 'ubi', syl: ['u', 'bi'], e: '🍠', lvl: 3 },
    { w: 'ikan', syl: ['i', 'kan'], e: '🐟', lvl: 3 },
    { w: 'ayam', syl: ['a', 'yam'], e: '🐔', lvl: 3 },
    { w: 'itik', syl: ['i', 'tik'], e: '🦆', lvl: 3 },
    { w: 'bas', syl: ['bas'], e: '🚌', lvl: 4 },
    { w: 'rumah', syl: ['ru', 'mah'], e: '🏠', lvl: 4 },
    { w: 'pokok', syl: ['po', 'kok'], e: '🌳', lvl: 4 },
    { w: 'bulan', syl: ['bu', 'lan'], e: '🌙', lvl: 4 },
    { w: 'bunga', syl: ['bu', 'nga'], e: '🌸', lvl: 5 },
    { w: 'kucing', syl: ['ku', 'cing'], e: '🐱', lvl: 5 }
  ];

  // Tempat sorok di Kampung Huruf
  const COVERS = ['🏺', '🪴', '🧺', '🌳', '📦', '🪣', '🌴', '🪨', '🌻', '🛖', '🍉', '🥥'];

  /* ---------- Templat strok huruf (kotak 0–100, y ke bawah) ----------
     Bentuk huruf "sekolah": a & g satu tingkat. Setiap huruf = senarai strok berurutan. */
  function line(x1, y1, x2, y2) {
    const n = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / 4));
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push([x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n]);
    return pts;
  }
  function arc(cx, cy, r, a0, a1) {
    const len = Math.abs(a1 - a0) * Math.PI / 180 * r;
    const n = Math.max(4, Math.round(len / 4));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]);
    }
    return pts;
  }
  const join = (...parts) => parts.reduce((acc, p) => acc.concat(acc.length ? p.slice(1) : p), []);
  const dot = (x, y) => [[x, y]];

  const STROKES = {
    a: [arc(50, 67, 20, 40, 395), line(70, 46, 70, 90)],
    i: [line(50, 44, 50, 90), dot(50, 24)],
    u: [join(line(30, 44, 30, 70), arc(50, 70, 20, 180, 360), line(70, 70, 70, 44)), line(70, 44, 70, 90)],
    o: [arc(50, 67, 22, 60, 420)],
    b: [line(32, 10, 32, 90), arc(50, 72, 18, 180, -175)],
    m: [line(22, 44, 22, 90), join(arc(35, 60, 13, 180, 0), line(48, 60, 48, 90)), join(arc(61, 60, 13, 180, 0), line(74, 60, 74, 90))],
    n: [line(30, 44, 30, 90), join(arc(50, 64, 20, 180, 0), line(70, 64, 70, 90))],
    s: [join(arc(50, 55, 12, 25, 270), arc(50, 79, 12, 90, -155))],
    k: [line(34, 10, 34, 90), line(68, 44, 34, 70), line(45, 62, 70, 90)],
    l: [line(50, 10, 50, 90)],
    t: [join(line(46, 18, 46, 80), arc(56, 80, 10, 180, 320)), line(30, 42, 66, 42)],
    d: [arc(48, 70, 19, 40, 395), line(67, 10, 67, 90)],
    p: [line(32, 42, 32, 98), arc(50, 58, 16, 180, -175)]
  };

  const LETTER_THING = {
    a: 'ayam', i: 'ikan', u: 'ular', b: 'bola', m: 'mata', s: 'susu', k: 'kucing',
    o: 'oren', e: 'ekor', t: 'topi', p: 'pisang', n: 'nasi', l: 'lampu', d: 'dadu',
    r: 'rumah', g: 'gajah', h: 'hujan', j: 'jam', c: 'cawan', y: 'yoyo', w: 'wau',
    f: 'fail', v: 'van', q: 'quran', x: 'x-ray', z: 'zirafah'
  };

  const LINES = {
    first: ['Ciluk... BA! Hai! Aku Pip. Huruf-huruf aku semua lari bersembunyi. Boleh tolong aku cari?'],
    morning: ['Selamat pagi, kawan hebat! Pip dah sediakan 3 misi untuk kita!', 'Hai! Hari ni kita ada misi istimewa. Jom!'],
    afternoon: ['Hai kawan hebat! Pip dah sediakan 3 misi untuk kita!', 'Jom kita sambung pengembaraan! Tekan belon!'],
    night: ['Wah, dah malam! Kita main sekejap je, ya.'],
    back: ['Selamat datang kembali! Pip rindu! Huruf-huruf pun tanya mana kamu pergi.'],
    pointBalloon: ['Tekan belon yang bergoyang tu!', 'Psst... belon tu nak ajak kita main!'],
    allDone: ['Tiga-tiga misi siap! Hebatnya kamu!'],
    correct: ['Betul! Hebatnya!', 'Yeay, kita jumpa!', 'Wah, pandainya!', 'Ciluk-BA! Betul!'],
    correctAfterTry: ['Kamu tak putus asa! Itu baru hebat!'],
    wrong1: ['Eh, bukan yang itu! Cuba kita tengok sekali lagi.', 'Hihi, itu huruf lain. Cuba lagi!'],
    wrong2: ['Hmm, susah sikit, kan? Pip tolong. Tengok yang bersinar ni!'],
    idle: ['Psst... huruf tu ada dekat sini je. Cuba tekan!'],
    newLetter: ['Ciluk-BA! Kita jumpa huruf baharu!'],
    writeStart: ['Mula dari titik bersinar, ya!', 'Jom tulis! Ikut titik bersinar.'],
    wrongDir: ['Ooh, cantik! Tapi huruf ni suka mula dari titik bersinar. Jom cuba lagi.'],
    writeDone: ['Tengok! Huruf yang kamu tulis dah bangun!'],
    writeAssist: ['Jom kita tulis sama-sama!'],
    sarangIntro: ['Ada sesuatu dalam telur ni! Jom cari hurufnya!'],
    weave: ['Sekarang kita tenun! Tekan huruf ikut susunan.'],
    hatch: ['Sarang bergegar... Ciluk... BA!'],
    firstWord: ['Kamu dah eja perkataan pertama! Pip gembira sangat!'],
    sessionNear: ['Lagi satu permainan, lepas tu kita rehat, ya.'],
    tickle: ['Hihihi! Geli!', 'Pip tengah fikir pasal kuih!', 'Ciluk... BA!'],
    rest: ['Hebat hari ini! Jom berehat. Esok kita sambung pengembaraan lagi!']
  };

  const OFFLINE = [
    'Cari <b>3 benda</b> di rumah yang bermula dengan huruf <b>{L}</b>.',
    'Tulis huruf <b>{L}</b> atas tepung di dalam dulang dengan jari.',
    'Tepuk suku kata nama semua orang dalam keluarga. A-YAH = 2 tepuk!',
    'Ibu/ayah tulis huruf di belakang kamu dengan jari. Teka huruf apa!',
    'Cari <b>sesuatu yang bulat</b> di rumah dan sebut namanya.'
  ];

  window.CilukaData = { LETTER_ORDER, CONFUSABLE, WORDS, COVERS, STROKES, LETTER_THING, LINES, OFFLINE };
})();
