/** Jana senarai rakaman suara manusia: docs/SKRIP_RAKAMAN_SUARA.md
 *  Jalankan: npx vite-node scripts/gen-voice-script.ts */
import { writeFileSync } from 'node:fs';
import { slug } from '../src/audio/audio';
import { LINES } from '../src/data/dialog';
import { ALPHABET } from '../src/data/letters';
import { GAMES } from '../src/data/worlds';
import { WORDS } from '../src/data/words';

const MS_LETTER: Record<string, string> = {
  a: 'a', b: 'bi', c: 'si', d: 'di', e: 'i', f: 'ef', g: 'ji', h: 'ec (ech)', i: 'ai', j: 'je', k: 'ke', l: 'el', m: 'em',
  n: 'en', o: 'o', p: 'pi', q: 'kiu', r: 'ar', s: 'es', t: 'ti', u: 'yu', v: 'vi', w: 'dabel-yu', x: 'eks', y: 'wai', z: 'zed'
};

const rows: [string, string, string][] = [];
const seen = new Set<string>();
const add = (group: string, text: string, say = text) => {
  const k = slug(text);
  if (!k || seen.has(k)) return;
  seen.add(k);
  rows.push([group, k, say]);
};

ALPHABET.forEach(l => { const k = 'huruf-' + l; seen.add(k); rows.push(['Nama huruf', k, `${l.toUpperCase()} — sebut "${MS_LETTER[l]}"`]); });
WORDS.forEach(w => add('Perkataan', w.word));
WORDS.flatMap(w => w.syllables).forEach(s => add('Suku kata', s));
Object.values(LINES).flat().forEach(t => add('Dialog Pip', t));
Object.values(GAMES).forEach(g => add('Arahan permainan', g.how));
['Cari huruf', 'Pandu ke huruf', 'Pecahkan belon huruf', 'Jom tulis huruf', 'Mana huruf', 'Itu huruf', 'Kita cari huruf', 'Kita perlukan huruf',
  'Dengar baik-baik', 'Huruf apa', 'Huruf apa yang hilang', 'Pandu ke hurufnya', 'besar', 'kecil', 'Jom bina perkataan',
  'Padankan huruf besar dengan huruf kecil yang sama.', 'Buka dua kad. Cari pasangan yang sama.', 'Mana gambar', 'Jom sebut sama-sama',
  'Kamu tempat pertama! Juara lumba!', 'Tempat kedua! Hebat!', 'Kamu sampai ke garisan penamat! Bagus!'].forEach(t => add('Frasa', t));

const md = `# Skrip Rakaman Suara CILUKA

Senarai ini dijana oleh \`scripts/gen-voice-script.ts\`. Jumlah: **${rows.length} klip**.

## Cara guna
1. Rakam setiap baris dengan suara manusia (Bahasa Melayu Malaysia, sebutan standard prasekolah, nada mesra kanak-kanak).
2. Simpan setiap klip sebagai **\`public/audio/<kunci>.mp3\`** (mono, 44.1 kHz, ~64 kbps). Contoh: \`public/audio/huruf-b.mp3\`, \`public/audio/bola.mp3\`.
3. Jalankan \`npm run audio:manifest\` untuk mengemas kini \`public/audio/manifest.json\`.
4. Build semula. Aplikasi akan menggunakan rakaman dahulu; bahagian yang belum dirakam masih menggunakan suara telefon.

Ayat yang mengandungi huruf (cth. "Cari huruf B") dicantum automatik: klip \`cari-huruf\` + klip \`huruf-b\`.

| Kumpulan | Kunci (nama fail) | Apa yang disebut |
|---|---|---|
${rows.map(([g, k, s]) => `| ${g} | \`${k}\` | ${s.replace(/\|/g, '/')} |`).join('\n')}
`;
writeFileSync('docs/SKRIP_RAKAMAN_SUARA.md', md);
console.log(`Ditulis docs/SKRIP_RAKAMAN_SUARA.md — ${rows.length} klip`);
