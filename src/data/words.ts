/** Bank perkataan Bahasa Melayu — tahap mengikut struktur suku kata. Setiap perkataan ada ilustrasi SVG asli. */
export interface Word {
  word: string;
  syllables: string[];
  level: 1 | 2 | 3;
}

export const WORDS: Word[] = [
  // Tahap 1 — KV + KV
  { word: 'bola', syllables: ['bo', 'la'], level: 1 },
  { word: 'buku', syllables: ['bu', 'ku'], level: 1 },
  { word: 'susu', syllables: ['su', 'su'], level: 1 },
  { word: 'mata', syllables: ['ma', 'ta'], level: 1 },
  { word: 'kaki', syllables: ['ka', 'ki'], level: 1 },
  { word: 'baju', syllables: ['ba', 'ju'], level: 1 },
  { word: 'roti', syllables: ['ro', 'ti'], level: 1 },
  { word: 'topi', syllables: ['to', 'pi'], level: 1 },
  { word: 'nasi', syllables: ['na', 'si'], level: 1 },
  { word: 'dadu', syllables: ['da', 'du'], level: 1 },
  { word: 'gigi', syllables: ['gi', 'gi'], level: 1 },
  { word: 'yoyo', syllables: ['yo', 'yo'], level: 1 },
  // Tahap 2 — vokal di awal / suku kata tertutup
  { word: 'ibu', syllables: ['i', 'bu'], level: 2 },
  { word: 'ikan', syllables: ['i', 'kan'], level: 2 },
  { word: 'ayam', syllables: ['a', 'yam'], level: 2 },
  { word: 'ular', syllables: ['u', 'lar'], level: 2 },
  { word: 'epal', syllables: ['e', 'pal'], level: 2 },
  { word: 'oren', syllables: ['o', 'ren'], level: 2 },
  { word: 'kasut', syllables: ['ka', 'sut'], level: 2 },
  { word: 'cawan', syllables: ['ca', 'wan'], level: 2 },
  { word: 'bulan', syllables: ['bu', 'lan'], level: 2 },
  { word: 'rumah', syllables: ['ru', 'mah'], level: 2 },
  { word: 'pokok', syllables: ['po', 'kok'], level: 2 },
  { word: 'hujan', syllables: ['hu', 'jan'], level: 2 },
  { word: 'lampu', syllables: ['lam', 'pu'], level: 2 },
  { word: 'bas', syllables: ['bas'], level: 2 },
  { word: 'jam', syllables: ['jam'], level: 2 },
  { word: 'wau', syllables: ['wau'], level: 2 },
  // Tahap 3 — huruf kembar (ng) dan 3–4 suku kata
  { word: 'bunga', syllables: ['bu', 'nga'], level: 3 },
  { word: 'kucing', syllables: ['ku', 'cing'], level: 3 },
  { word: 'payung', syllables: ['pa', 'yung'], level: 3 },
  { word: 'pisang', syllables: ['pi', 'sang'], level: 3 },
  { word: 'kereta', syllables: ['ke', 're', 'ta'], level: 3 },
  { word: 'matahari', syllables: ['ma', 'ta', 'ha', 'ri'], level: 3 }
];

export const WORD_MAP: Record<string, Word> = Object.fromEntries(WORDS.map(w => [w.word, w]));

export const wordsAtLevel = (max: number, min = 1) => WORDS.filter(w => w.level <= max && w.level >= min);
