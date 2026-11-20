/** Ganjaran: bintang (terbaik per tahap — tidak boleh "dikutip" berulang), XP berhad harian, lencana, trofi, aksesori, peti misteri. */
import { LETTER_ORDER, SOUND_LETTERS, ALPHABET } from '../data/letters';
import { ACCESSORIES, BADGES, PLAYER_LEVELS, STICKERS, TROPHY_WORLDS } from '../data/rewards';
import type { GameId, GameResult, ProfileData } from '../data/types';
import { WORLD_MAP } from '../data/worlds';
import { todayKL } from '../utils/date';
import { countByStatus } from './learning';
import { levelRecord, levelUnlock } from './levels';
import { markMissionStep } from './missions';

export function starsFor(r: GameResult): number {
  const total = r.correct + r.wrong;
  if (!total) return 1;
  const acc = r.correct / total;
  if (acc >= 0.9 && r.hints === 0) return 3;
  if (acc >= 0.7) return 2;
  return 1;
}

export function playerLevel(xp: number) {
  let i = 0;
  while (i + 1 < PLAYER_LEVELS.length && xp >= PLAYER_LEVELS[i + 1].xp) i++;
  const cur = PLAYER_LEVELS[i], next = PLAYER_LEVELS[i + 1];
  return { level: i + 1, name: cur.name, from: cur.xp, to: next?.xp ?? cur.xp, progress: next ? (xp - cur.xp) / (next.xp - cur.xp) : 1 };
}

export interface CompletionReport {
  stars: number;
  starsGained: number;
  xpGained: number;
  newBadges: string[];
  newAccessories: string[];
  levelUp: boolean;
  nextLevelUnlocked: boolean;
  missionStep: boolean;
  missionAllDone: boolean;
}

export function completeGame(d: ProfileData, game: GameId, level: number, r: GameResult, ms: number, fromMission: boolean): CompletionReport {
  const stars = starsFor(r);
  const today = todayKL();
  const before = levelRecord(d, game, level);
  const wasNextUnlocked = levelUnlock(d, game, level + 1).unlocked;
  const levels = d.levels[game] ?? (d.levels[game] = {});
  levels[level] = {
    bestStars: Math.max(before.bestStars, stars),
    plays: before.plays + 1,
    attempts: before.attempts + r.correct + r.wrong,
    correct: before.correct + r.correct,
    lastPlayed: Date.now()
  };
  const starsGained = Math.max(0, stars - before.bestStars);

  // XP: penuh untuk 2 kali pertama sehari bagi setiap permainan+tahap, kemudian sedikit sahaja (elak "kutip" berulang).
  const claimKey = `${today}|${game}|${level}`;
  const claims = d.xpClaims[claimKey] ?? 0;
  const xpGained = claims < 2 ? 10 + stars * 5 + starsGained * 5 : 2;
  d.xpClaims[claimKey] = claims + 1;
  // buang tuntutan lama
  for (const k of Object.keys(d.xpClaims)) if (!k.startsWith(today)) delete d.xpClaims[k];
  const lvlBefore = playerLevel(d.xp).level;
  d.xp += xpGained;
  const levelUp = playerLevel(d.xp).level > lvlBefore;

  d.activity.push({ t: Date.now(), game, level, stars, correct: r.correct, wrong: r.wrong });
  if (d.activity.length > 60) d.activity = d.activity.slice(-60);
  const day = d.days[today] ?? (d.days[today] = { games: 0, ms: 0, correct: 0, wrong: 0 });
  day.games++; day.ms += ms; day.correct += r.correct; day.wrong += r.wrong;

  let missionStep = false, missionAllDone = false;
  if (fromMission) ({ stepDone: missionStep, allDone: missionAllDone } = markMissionStep(d, game));

  const { badges: newBadges, accessories: newAccessories } = evaluateAwards(d, game, level, stars);
  return {
    stars, starsGained, xpGained, newBadges, newAccessories, levelUp,
    nextLevelUnlocked: level < 5 && !wasNextUnlocked && levelUnlock(d, game, level + 1).unlocked,
    missionStep, missionAllDone
  };
}

function award(d: ProfileData, id: string, out: string[]) {
  if (!d.badges[id]) { d.badges[id] = Date.now(); out.push(id); }
}

export function evaluateAwards(d: ProfileData, game?: GameId, level?: number, stars?: number) {
  const out: string[] = [];
  const strong = countByStatus(d, 'L:', LETTER_ORDER, 'hampir');
  const writtenLetters = new Set(Object.keys(d.writing).filter(k => !k.startsWith('shape:')).map(k => k.toLowerCase())).size;
  const soundCorrect = SOUND_LETTERS.reduce((a, l) => a + (d.items['S:' + l]?.correct ?? 0), 0);
  if (d.activity.length) award(d, 'first-game', out);
  if (strong >= 5) award(d, 'letters-5', out);
  if (strong >= 13) award(d, 'letters-13', out);
  if (strong >= 26) award(d, 'letters-26', out);
  if (writtenLetters >= 5) award(d, 'writer-5', out);
  if (writtenLetters >= 15) award(d, 'writer-15', out);
  if (d.words.length >= 1) award(d, 'speller-1', out);
  if (d.words.length >= 10) award(d, 'speller-10', out);
  if (soundCorrect >= 10) award(d, 'sound-10', out);
  if (d.activity.filter(a => a.game === 'memory-letter').length >= 3) award(d, 'memory-3', out);
  if (d.missionDays.length >= 1) award(d, 'mission-1', out);
  if (d.missionDays.length >= 5) award(d, 'mission-5', out);
  if (stars === 3) award(d, 'perfect', out);
  if (game === 'star-challenge' && (level ?? 0) >= 3) award(d, 'champion', out);
  for (const w of TROPHY_WORLDS) {
    if (WORLD_MAP[w].games.every(g => levelRecord(d, g, 3).plays > 0)) award(d, 'trophy:' + w, out);
  }

  // Aksesori avatar
  const acc: string[] = [];
  const give = (id: string) => { if (!d.accessories.includes(id)) { d.accessories.push(id); acc.push(id); } };
  const pl = playerLevel(d.xp).level;
  if (pl >= 2) give('topi-parti');
  if (pl >= 4) give('cermin-mata');
  if (d.chestsOpened >= 1) give('reben');
  if (d.missionDays.length >= 3) give('bunga-telinga');
  if (d.badges['writer-5']) give('topi-pelukis');
  if (d.badges['champion']) give('mahkota');
  return { badges: out, accessories: acc };
}

/** Buka Peti Misteri — sekali sahaja selepas misi harian siap. */
export function openChest(d: ProfileData): string | null {
  if (!d.daily || d.daily.chestClaimed || !d.daily.steps.every(s => s.done)) return null;
  d.daily.chestClaimed = true;
  d.chestsOpened++;
  const remaining = STICKERS.filter(s => !d.collectibles.includes(s));
  const prize = remaining.length ? remaining[Math.floor(Math.random() * remaining.length)] : null;
  if (prize) d.collectibles.push(prize);
  d.xp += 15;
  evaluateAwards(d);
  return prize ?? 'semua';
}

export const badgeInfo = (id: string) => {
  if (id.startsWith('trophy:')) {
    const w = WORLD_MAP[id.slice(7) as keyof typeof WORLD_MAP];
    return { id, name: 'Trofi ' + (w?.name ?? ''), desc: 'Semua permainan pulau ini hingga Tahap 3', icon: 'trophy', color: w?.ground ?? '#FFC93C' };
  }
  return BADGES.find(b => b.id === id) ?? { id, name: id, desc: '', icon: 'star', color: '#FFC93C' };
};

export const accessoryInfo = (id: string) => ACCESSORIES.find(a => a.id === id);
export const ALL_LETTERS = ALPHABET;
