/** Misi harian: satu misi utama sehari (waktu Malaysia), 4 langkah dipilih mengikut kemajuan anak. */
import { WORDS } from '../data/words';
import type { Age, GameId, ProfileData, Settings } from '../data/types';
import { todayKL } from '../utils/date';
import { focusLetters } from './learning';
import { recommendedLevel } from './levels';

const LETTER_GAMES: GameId[] = ['letter-hunt', 'letter-balloon', 'letter-match'];

export function ensureDaily(d: ProfileData, age: Age, s: Settings): boolean {
  const today = todayKL();
  if (d.daily && d.daily.date === today) return false;
  const focus = focusLetters(d, age, 1)[0] ?? 'a';
  const dayNum = Math.floor(Date.now() / 86400000);
  const letterGame = LETTER_GAMES[dayNum % LETTER_GAMES.length];
  const known = new Set(d.words);
  const word = WORDS.find(w => w.level === 1 && w.word.includes(focus) && !known.has(w.word))?.word
    ?? WORDS.find(w => w.level === 1 && !known.has(w.word))?.word ?? 'bola';
  const spellGame: GameId = d.words.length >= 2 && dayNum % 2 ? 'missing-letter' : 'word-builder';
  d.daily = {
    date: today, focus, word,
    steps: [letterGame, 'magic-tracing', 'memory-letter', spellGame].map(g => ({ game: g as GameId, level: recommendedLevel(d, g as GameId, s), done: false })),
    chestClaimed: false
  };
  return true;
}

export function markMissionStep(d: ProfileData, game: GameId): { stepDone: boolean; allDone: boolean } {
  const m = d.daily;
  if (!m || m.date !== todayKL()) return { stepDone: false, allDone: false };
  const step = m.steps.find(s => s.game === game && !s.done);
  if (!step) return { stepDone: false, allDone: m.steps.every(s => s.done) };
  step.done = true;
  const allDone = m.steps.every(s => s.done);
  if (allDone && !d.missionDays.includes(m.date)) d.missionDays.push(m.date);
  return { stepDone: true, allDone };
}

export const missionDone = (d: ProfileData) => !!d.daily && d.daily.date === todayKL() && d.daily.steps.every(s => s.done);
export const chestAvailable = (d: ProfileData) => missionDone(d) && !d.daily!.chestClaimed;
export const nextMissionStep = (d: ProfileData) => (d.daily && d.daily.date === todayKL() ? d.daily.steps.find(s => !s.done) : undefined);
