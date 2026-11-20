/** Jenis data utama CILUKA. */

export type GameId =
  | 'letter-hunt' | 'letter-match' | 'memory-letter' | 'sound-hunt' | 'magic-tracing'
  | 'word-builder' | 'missing-letter' | 'syllable-puzzle' | 'object-match' | 'letter-balloon' | 'star-challenge' | 'letter-race';

export type WorldId =
  | 'letter-land' | 'race-track' | 'scribble-valley' | 'sound-forest' | 'syllable-village'
  | 'spelling-station' | 'magic-word-island' | 'memory-jungle' | 'star-castle';

export type AvatarId = 'kucing' | 'arnab' | 'beruang' | 'katak' | 'singa' | 'panda' | 'monyet' | 'penguin';

export type Age = 3 | 4 | 5 | 6;

export interface Profile {
  id: string;
  name: string;
  avatar: AvatarId;
  age: Age;
  createdAt: number;
}

/** Statistik satu item kemahiran, cth. 'L:b' (kenal huruf b), 'S:m' (bunyi m), 'W:A' (tulis A), 'SP:bola' (eja), 'SY:buku' (suku kata), 'V:ikan' (perkataan-gambar). */
export interface ItemStat {
  attempts: number;
  correct: number;
  score: number;          // 0–100 Skor Kuasa
  recent: number[];       // 1/0, 10 cubaan terakhir
  games: string[];        // jenis permainan di mana item ini dijawab betul
  confusions: Record<string, number>;
  lastSeen: number;
}

export type SkillStatus = 'belum' | 'belajar' | 'perlu-latihan' | 'hampir' | 'kuasai';

export interface LevelRecord {
  bestStars: number;
  plays: number;
  attempts: number;
  correct: number;
  lastPlayed: number;
}

export interface WritingSample {
  strokes: number[][][]; // [strok][titik][x,y] dalam kotak 0–100
  date: number;
  accuracy: number;      // 0–1
}

export interface ActivityEntry {
  t: number;
  game: GameId;
  level: number;
  stars: number;
  correct: number;
  wrong: number;
}

export interface DayStat { games: number; ms: number; correct: number; wrong: number }

export interface MissionStep { game: GameId; level: number; done: boolean }

export interface DailyMission {
  date: string;
  focus: string;
  word: string;
  steps: MissionStep[];
  chestClaimed: boolean;
}

export interface ProfileData {
  version: 1;
  items: Record<string, ItemStat>;
  levels: Partial<Record<GameId, Record<number, LevelRecord>>>;
  xp: number;
  xpClaims: Record<string, number>; // `${date}|${game}|${level}` → kali dituntut (had XP harian)
  badges: Record<string, number>;   // id → tarikh
  collectibles: string[];
  accessories: string[];
  equipped: string | null;
  chestsOpened: number;
  daily: DailyMission | null;
  missionDays: string[];
  writing: Record<string, { first: WritingSample; best: WritingSample; latest: WritingSample; count: number }>;
  words: string[];
  activity: ActivityEntry[];
  days: Record<string, DayStat>;
  lastOpen: number;
}

export interface Settings {
  sound: boolean;
  voice: boolean;
  sessionMin: 0 | 10 | 15 | 20 | 30;
  unlockAll: boolean;
}

export interface AppIndex {
  version: 1;
  profiles: Profile[];
  activeId: string | null;
  settings: Settings;
}

export interface GameResult {
  correct: number;
  wrong: number;
  hints: number;
}

export type PipMood = 'idle' | 'happy' | 'surprised' | 'thinking' | 'sad' | 'cheer' | 'excited' | 'celebrate' | 'sleep';
