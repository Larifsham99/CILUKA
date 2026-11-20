/** Sistem tahap: 5 tahap setiap permainan. Tahap seterusnya dibuka berdasarkan bintang DAN ketepatan merentasi banyak cubaan. */
import { LETTER_ORDER } from '../data/letters';
import type { Age, GameId, LevelRecord, ProfileData, Settings, WorldId } from '../data/types';
import { WORLD_MAP } from '../data/worlds';
import { countByStatus } from './learning';

export const MAX_LEVEL = 5;

export function levelRecord(d: ProfileData, game: GameId, lvl: number): LevelRecord {
  return d.levels[game]?.[lvl] ?? { bestStars: 0, plays: 0, attempts: 0, correct: 0, lastPlayed: 0 };
}

export interface UnlockState { unlocked: boolean; reason: string }

export function levelUnlock(d: ProfileData, game: GameId, lvl: number, s?: Settings): UnlockState {
  if (lvl <= 1 || s?.unlockAll) return { unlocked: true, reason: '' };
  const prev = levelRecord(d, game, lvl - 1);
  if (prev.plays === 0) return { unlocked: false, reason: `Siapkan Tahap ${lvl - 1} dahulu` };
  if (prev.bestStars < 2) return { unlocked: false, reason: `Dapatkan 2 bintang di Tahap ${lvl - 1}` };
  const acc = prev.attempts ? prev.correct / prev.attempts : 0;
  if (prev.attempts < 5 || acc < 0.6) return { unlocked: false, reason: `Berlatih lagi di Tahap ${lvl - 1}` };
  return { unlocked: true, reason: '' };
}

export function recommendedLevel(d: ProfileData, game: GameId, s?: Settings): number {
  let best = 1;
  for (let l = 1; l <= MAX_LEVEL; l++) {
    if (!levelUnlock(d, game, l, s).unlocked) break;
    best = l;
    if (levelRecord(d, game, l).bestStars < 3) return l;
  }
  return best;
}

export function gameStars(d: ProfileData, game: GameId): number {
  let t = 0;
  for (let l = 1; l <= MAX_LEVEL; l++) t += levelRecord(d, game, l).bestStars;
  return t;
}

export function totalStars(d: ProfileData): number {
  return Object.keys(d.levels).reduce((a, g) => a + gameStars(d, g as GameId), 0);
}

export function worldUnlock(d: ProfileData, _age: Age, world: WorldId, s?: Settings): { unlocked: boolean; have: number; need: number } {
  const w = WORLD_MAP[world];
  const u = w.unlock;
  if (u.kind === 'open' || s?.unlockAll) return { unlocked: true, have: 1, need: 1 };
  if (u.kind === 'words') return { unlocked: d.words.length >= u.count, have: Math.min(d.words.length, u.count), need: u.count };
  const have = countByStatus(d, 'L:', LETTER_ORDER, u.status);
  return { unlocked: have >= u.count, have: Math.min(have, u.count), need: u.count };
}

export function worldStars(d: ProfileData, world: WorldId) {
  const games = WORLD_MAP[world].games;
  return { have: games.reduce((a, g) => a + gameStars(d, g), 0), max: games.length * MAX_LEVEL * 3 };
}
