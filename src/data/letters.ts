/** Huruf, urutan pengenalan (Bahasa Melayu) dan pasangan keliru. */

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

/** Urutan pengenalan mengikut kekerapan dalam Bahasa Melayu (vokal dahulu, huruf jarang di akhir). */
export const LETTER_ORDER = ['a', 'i', 'u', 'b', 'm', 's', 'k', 'o', 'e', 't', 'p', 'n', 'l', 'd', 'r', 'g', 'h', 'j', 'c', 'y', 'w', 'f', 'v', 'q', 'x', 'z'];

/** Nama huruf mengikut sebutan Bahasa Melayu (untuk suara). */
export const LETTER_NAME: Record<string, string> = {
  a: 'a', b: 'bi', c: 'si', d: 'di', e: 'i', f: 'ef', g: 'ji', h: 'ec', i: 'ai', j: 'je', k: 'ke', l: 'el', m: 'em',
  n: 'en', o: 'o', p: 'pi', q: 'kiu', r: 'ar', s: 'es', t: 'ti', u: 'yu', v: 'vi', w: 'dabelyu', x: 'eks', y: 'wai', z: 'zed'
};

/** Anggaran bunyi huruf untuk disebut (fonik ringkas BM). */
export const LETTER_SOUND: Record<string, string> = {
  a: 'a', b: 'beh', c: 'ceh', d: 'deh', e: 'eh', f: 'feh', g: 'geh', h: 'heh', i: 'i', j: 'jeh', k: 'keh', l: 'leh', m: 'mmm',
  n: 'nnn', o: 'o', p: 'peh', q: 'kue', r: 'rrr', s: 'sss', t: 'teh', u: 'u', v: 'veh', w: 'weh', x: 'eks', y: 'yeh', z: 'zzz'
};

/** Perkataan contoh untuk bunyi awal — semuanya mempunyai ilustrasi. */
export const SOUND_WORD: Record<string, string> = {
  a: 'ayam', b: 'bola', c: 'cawan', d: 'dadu', e: 'epal', g: 'gigi', h: 'hujan', i: 'ikan', j: 'jam', k: 'kucing',
  l: 'lampu', m: 'mata', n: 'nasi', o: 'oren', p: 'payung', r: 'rumah', s: 'susu', t: 'topi', u: 'ular', w: 'wau', y: 'yoyo'
};

/** Huruf yang jarang dalam BM tiada dalam permainan bunyi. */
export const SOUND_LETTERS = Object.keys(SOUND_WORD);

export const CONFUSABLE: Record<string, string[]> = {
  b: ['d', 'p', 'h'], d: ['b', 'q', 'a'], p: ['q', 'b', 'd'], q: ['p', 'g', 'd'],
  m: ['n', 'w', 'u'], n: ['m', 'u', 'h'], u: ['n', 'v', 'y'], w: ['m', 'v'],
  i: ['l', 'j', 't'], l: ['i', 't', 'k'], t: ['f', 'l', 'i'], f: ['t', 'l'],
  a: ['o', 'd', 'e'], o: ['a', 'c', 'e'], e: ['c', 'o', 'a'], c: ['e', 'o'],
  g: ['q', 'y'], s: ['z', 'c'], z: ['s', 'x'], h: ['n', 'k'], k: ['h', 'x'],
  r: ['n', 'v'], y: ['g', 'v'], j: ['i', 'y'], v: ['u', 'w', 'y'], x: ['k', 'z']
};

/** Bunyi yang hampir sama. */
export const SOUND_CONFUSABLE: Record<string, string[]> = {
  m: ['n'], n: ['m'], b: ['p', 'd'], p: ['b'], d: ['t', 'b'], t: ['d'], g: ['k'], k: ['g'], s: ['c'], c: ['s'], e: ['i'], i: ['e'], o: ['u'], u: ['o']
};
