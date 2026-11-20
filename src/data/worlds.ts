import type { GameId, WorldId } from './types';

export interface GameInfo {
  id: GameId;
  name: string;
  how: string;        // arahan satu ayat (disuarakan)
  skill: string;      // untuk ibu bapa
  world: WorldId;
  color: string;
}

export const GAMES: Record<GameId, GameInfo> = {
  'letter-hunt': { id: 'letter-hunt', name: 'Cari Huruf', how: 'Dengar nama huruf, kemudian tekan huruf yang betul.', skill: 'Mengenal huruf', world: 'letter-land', color: '#FF7EB6' },
  'letter-match': { id: 'letter-match', name: 'Padan Huruf', how: 'Tekan huruf besar, kemudian tekan huruf kecil yang sama.', skill: 'Huruf besar & kecil', world: 'letter-land', color: '#9B6BFF' },
  'letter-balloon': { id: 'letter-balloon', name: 'Belon Huruf', how: 'Pecahkan belon yang ada huruf yang Pip sebut.', skill: 'Mengenal huruf dengan pantas', world: 'letter-land', color: '#FFC93C' },
  'magic-tracing': { id: 'magic-tracing', name: 'Tulis Ajaib', how: 'Letak jari di titik ungu, kemudian ikut laluan.', skill: 'Menulis', world: 'scribble-valley', color: '#FF9F6B' },
  'sound-hunt': { id: 'sound-hunt', name: 'Cari Bunyi', how: 'Dengar bunyi, kemudian tekan huruf yang sepadan.', skill: 'Bunyi huruf', world: 'sound-forest', color: '#2EC4B6' },
  'syllable-puzzle': { id: 'syllable-puzzle', name: 'Teka Suku Kata', how: 'Susun suku kata supaya jadi perkataan.', skill: 'Suku kata', world: 'syllable-village', color: '#FF9F6B' },
  'missing-letter': { id: 'missing-letter', name: 'Huruf Hilang', how: 'Cari huruf yang hilang dalam perkataan.', skill: 'Mengeja', world: 'spelling-station', color: '#8ED8F8' },
  'word-builder': { id: 'word-builder', name: 'Bina Kata', how: 'Tekan huruf ikut susunan untuk membina perkataan.', skill: 'Membina perkataan', world: 'spelling-station', color: '#2EC4B6' },
  'object-match': { id: 'object-match', name: 'Padan Gambar', how: 'Baca atau dengar perkataan, kemudian pilih gambarnya.', skill: 'Perkataan & makna', world: 'magic-word-island', color: '#9B6BFF' },
  'memory-letter': { id: 'memory-letter', name: 'Kad Ingat', how: 'Buka dua kad. Cari pasangan yang sama.', skill: 'Ingatan', world: 'memory-jungle', color: '#9BDE4A' },
  'star-challenge': { id: 'star-challenge', name: 'Cabaran Bintang', how: 'Jawab soalan campuran untuk menjadi juara.', skill: 'Ujian penguasaan', world: 'star-castle', color: '#FFC93C' }
};

export interface WorldInfo {
  id: WorldId;
  name: string;
  english: string;
  games: GameId[];
  sky: [string, string];
  ground: string;
  /** Syarat buka (penguasaan kemahiran, bukan skor sahaja). */
  unlock: { kind: 'open' } | { kind: 'letters'; status: 'belajar' | 'hampir' | 'kuasai'; count: number } | { kind: 'words'; count: number };
  unlockText: string;
}

export const WORLDS: WorldInfo[] = [
  { id: 'letter-land', name: 'Taman Huruf', english: 'Letter Land', games: ['letter-hunt', 'letter-match', 'letter-balloon'], sky: ['#FFD6EA', '#FFF4FA'], ground: '#FF7EB6', unlock: { kind: 'open' }, unlockText: '' },
  { id: 'scribble-valley', name: 'Lembah Contengan', english: 'Scribble Valley', games: ['magic-tracing'], sky: ['#FFE0C7', '#FFF7EF'], ground: '#FF9F6B', unlock: { kind: 'open' }, unlockText: '' },
  { id: 'memory-jungle', name: 'Rimba Ingat', english: 'Memory Jungle', games: ['memory-letter'], sky: ['#DFF7C6', '#F5FFEC'], ground: '#7CC43F', unlock: { kind: 'open' }, unlockText: '' },
  { id: 'sound-forest', name: 'Hutan Bunyi', english: 'Sound Forest', games: ['sound-hunt'], sky: ['#C9F3EE', '#EFFFFC'], ground: '#2EC4B6', unlock: { kind: 'letters', status: 'belajar', count: 4 }, unlockText: 'Kenal 4 huruf' },
  { id: 'syllable-village', name: 'Kampung Suku Kata', english: 'Syllable Village', games: ['syllable-puzzle'], sky: ['#FFE9B8', '#FFF9EA'], ground: '#F2A93B', unlock: { kind: 'letters', status: 'hampir', count: 5 }, unlockText: 'Hampir kuasai 5 huruf' },
  { id: 'spelling-station', name: 'Stesen Ejaan', english: 'Spelling Station', games: ['missing-letter', 'word-builder'], sky: ['#D4EEFF', '#F2FAFF'], ground: '#4BA3E3', unlock: { kind: 'letters', status: 'hampir', count: 8 }, unlockText: 'Hampir kuasai 8 huruf' },
  { id: 'magic-word-island', name: 'Pulau Kata Ajaib', english: 'Magic Word Island', games: ['object-match'], sky: ['#E8DDFF', '#F8F4FF'], ground: '#9B6BFF', unlock: { kind: 'words', count: 3 }, unlockText: 'Eja 3 perkataan' },
  { id: 'star-castle', name: 'Istana Bintang', english: 'Star Castle', games: ['star-challenge'], sky: ['#FFF0B3', '#FFFBE6'], ground: '#E8B500', unlock: { kind: 'letters', status: 'kuasai', count: 5 }, unlockText: 'Kuasai 5 huruf' }
];

export const WORLD_MAP: Record<WorldId, WorldInfo> = Object.fromEntries(WORLDS.map(w => [w.id, w])) as Record<WorldId, WorldInfo>;

export const LEVEL_NAMES = ['Sangat Mudah', 'Mudah', 'Sederhana', 'Mencabar', 'Juara'];
