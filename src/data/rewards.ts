import type { WorldId } from './types';

export interface BadgeDef { id: string; name: string; desc: string; icon: string; color: string }

/** Lencana — semuanya berasaskan kemahiran/usaha, bukan masa skrin. Syarat dinilai dalam services/rewards.ts. */
export const BADGES: BadgeDef[] = [
  { id: 'first-game', name: 'Langkah Pertama', desc: 'Selesai permainan pertama', icon: 'foot', color: '#FF9F6B' },
  { id: 'letters-5', name: 'Kawan Huruf', desc: 'Hampir kuasai 5 huruf', icon: 'abc', color: '#FF7EB6' },
  { id: 'letters-13', name: 'Separuh Abjad', desc: 'Hampir kuasai 13 huruf', icon: 'abc', color: '#9B6BFF' },
  { id: 'letters-26', name: 'Raja Abjad', desc: 'Hampir kuasai semua 26 huruf', icon: 'crown', color: '#FFC93C' },
  { id: 'writer-5', name: 'Penulis Cilik', desc: 'Tulis 5 huruf berbeza', icon: 'pencil', color: '#FF9F6B' },
  { id: 'writer-15', name: 'Tangan Ajaib', desc: 'Tulis 15 huruf berbeza', icon: 'pencil', color: '#2EC4B6' },
  { id: 'speller-1', name: 'Kata Pertama', desc: 'Eja perkataan pertama', icon: 'egg', color: '#9BDE4A' },
  { id: 'speller-10', name: 'Penenun Kata', desc: 'Eja 10 perkataan', icon: 'egg', color: '#9B6BFF' },
  { id: 'sound-10', name: 'Telinga Hebat', desc: '10 bunyi dijawab betul', icon: 'ear', color: '#2EC4B6' },
  { id: 'memory-3', name: 'Ingatan Gajah', desc: 'Siap Kad Ingat 3 kali', icon: 'brain', color: '#9BDE4A' },
  { id: 'mission-1', name: 'Misi Pertama', desc: 'Siapkan misi harian', icon: 'flag', color: '#FF7EB6' },
  { id: 'mission-5', name: 'Pengembara Rajin', desc: 'Siapkan misi 5 hari', icon: 'flag', color: '#FFC93C' },
  { id: 'perfect', name: 'Tiga Bintang', desc: 'Dapat 3 bintang', icon: 'star', color: '#FFC93C' },
  { id: 'champion', name: 'Juara Istana', desc: 'Siap Cabaran Bintang tahap 3', icon: 'trophy', color: '#E8B500' }
];

/** Trofi pulau — semua permainan dalam pulau itu disiapkan hingga tahap 3. */
export const TROPHY_WORLDS: WorldId[] = ['letter-land', 'scribble-valley', 'memory-jungle', 'sound-forest', 'syllable-village', 'spelling-station', 'magic-word-island', 'star-castle'];

/** Pelekat koleksi — diperoleh dari Peti Misteri (sekali sehari selepas misi). Semuanya sama nilai: tiada "rarity". */
export const STICKERS = [
  'bola', 'buku', 'kucing', 'ikan', 'bunga', 'payung', 'wau', 'bulan', 'epal', 'oren', 'ayam', 'topi',
  'kereta', 'bas', 'pisang', 'roti', 'jam', 'lampu', 'yoyo', 'cawan', 'rumah', 'pokok', 'matahari', 'kasut'
];

export interface AccessoryDef { id: string; name: string; how: string }
export const ACCESSORIES: AccessoryDef[] = [
  { id: 'topi-parti', name: 'Topi Parti', how: 'Capai Tahap 2' },
  { id: 'reben', name: 'Reben Comel', how: 'Buka Peti Misteri pertama' },
  { id: 'cermin-mata', name: 'Cermin Mata', how: 'Capai Tahap 4' },
  { id: 'bunga-telinga', name: 'Bunga Raya', how: 'Siapkan misi 3 hari' },
  { id: 'topi-pelukis', name: 'Topi Pelukis', how: 'Dapat lencana Penulis Cilik' },
  { id: 'mahkota', name: 'Mahkota', how: 'Dapat lencana Juara Istana' }
];

/** Tahap pemain berdasarkan XP. */
export const PLAYER_LEVELS = [
  { xp: 0, name: 'Pengembara Kecil' },
  { xp: 60, name: 'Penjejak Huruf' },
  { xp: 150, name: 'Pendengar Hutan' },
  { xp: 280, name: 'Penulis Ajaib' },
  { xp: 450, name: 'Penenun Kata' },
  { xp: 680, name: 'Wira Ejaan' },
  { xp: 950, name: 'Bintang Ciluka' },
  { xp: 1300, name: 'Juara Hebat' }
];
