/** Kompas Pip — enjin pembelajaran adaptif setempat (tanpa AI API).
 *  Skor Kuasa per item, status penguasaan berdasarkan BANYAK cubaan, pasangan keliru, dan pemilihan item fokus. */
import { CONFUSABLE, LETTER_ORDER, SOUND_CONFUSABLE, SOUND_LETTERS } from '../data/letters';
import type { Age, ItemStat, ProfileData, SkillStatus } from '../data/types';
import { shuffle } from '../utils/date';

export const STATUS_RANK: Record<SkillStatus, number> = { belum: 0, belajar: 1, 'perlu-latihan': 1, hampir: 2, kuasai: 3 };
export const STATUS_LABEL: Record<SkillStatus, string> = {
  belum: 'Belum diperkenalkan', belajar: 'Sedang belajar', 'perlu-latihan': 'Perlu latihan', hampir: 'Hampir menguasai', kuasai: 'Telah menguasai'
};

export function blankStat(): ItemStat {
  return { attempts: 0, correct: 0, score: 0, recent: [], games: [], confusions: {}, lastSeen: 0 };
}

export interface AnswerOpts { game: string; ms?: number; chosen?: string; hinted?: boolean }

/** Rekod satu jawapan. Skor bergerak sedikit demi sedikit — satu jawapan tidak menentukan penguasaan. */
export function recordAnswer(d: ProfileData, key: string, correct: boolean, o: AnswerOpts): ItemStat {
  const s = d.items[key] ?? (d.items[key] = blankStat());
  s.attempts++;
  s.lastSeen = Date.now();
  s.recent.push(correct ? 1 : 0);
  if (s.recent.length > 10) s.recent.shift();
  if (correct) {
    s.correct++;
    const fast = o.ms != null && o.ms < 4000;
    s.score = Math.min(100, s.score + (o.hinted ? 3 : fast ? 12 : 8));
    if (!o.hinted && !s.games.includes(o.game)) s.games.push(o.game);
  } else {
    s.score = Math.max(0, s.score - 8);
    if (o.chosen) s.confusions[o.chosen] = (s.confusions[o.chosen] ?? 0) + 1;
  }
  // Keliru dianggap selesai selepas 4 betul berturut-turut
  if (s.recent.slice(-4).join('') === '1111') s.confusions = {};
  return s;
}

const recentAcc = (s: ItemStat, n: number) => {
  const r = s.recent.slice(-n);
  return r.length ? r.reduce((a, b) => a + b, 0) / r.length : 0;
};

/** Status penguasaan — memerlukan bilangan cubaan minimum supaya tidak mendakwa berdasarkan data terlalu sedikit. */
export function statusOf(s: ItemStat | undefined): SkillStatus {
  if (!s || s.attempts === 0) return 'belum';
  if (s.attempts >= 6 && s.score >= 80 && recentAcc(s, 6) >= 0.8 && s.games.length >= 2) return 'kuasai';
  if (s.attempts >= 4 && s.score >= 55 && recentAcc(s, 5) >= 0.6) return 'hampir';
  if (s.attempts >= 4 && recentAcc(s, 5) < 0.6) return 'perlu-latihan';
  return 'belajar';
}

export const itemStatus = (d: ProfileData, key: string) => statusOf(d.items[key]);

export function countByStatus(d: ProfileData, prefix: string, keys: string[], min: SkillStatus): number {
  return keys.filter(k => STATUS_RANK[itemStatus(d, prefix + k)] >= STATUS_RANK[min] && (min !== 'belajar' || (d.items[prefix + k]?.attempts ?? 0) >= 2)).length;
}

export function confusedWith(d: ProfileData, key: string): string[] {
  const s = d.items[key];
  if (!s) return [];
  return Object.entries(s.confusions).filter(([, n]) => n >= 2).map(([l]) => l);
}

/** Huruf yang telah diperkenalkan: bermula dengan beberapa huruf, bertambah apabila huruf dikuasai. */
export function introducedLetters(d: ProfileData, age: Age): string[] {
  const start = age >= 5 ? 6 : 4;
  const strong = LETTER_ORDER.filter(l => STATUS_RANK[itemStatus(d, 'L:' + l)] >= 2).length;
  const touched = LETTER_ORDER.filter(l => (d.items['L:' + l]?.attempts ?? 0) >= 3).length;
  const n = Math.min(26, Math.max(start, strong + 3, Math.min(touched, strong + 4)));
  return LETTER_ORDER.slice(0, n);
}

/** Pilih huruf fokus: keliru & perlu latihan dahulu, kemudian sedang belajar, kemudian huruf baharu, kemudian ulang kaji. */
export function focusLetters(d: ProfileData, age: Age, n: number, prefix = 'L:', pool?: string[]): string[] {
  const letters = (pool ?? introducedLetters(d, age)).filter(l => prefix !== 'S:' || SOUND_LETTERS.includes(l));
  const weight = (l: string) => {
    const s = d.items[prefix + l];
    const st = statusOf(s);
    let w = 0;
    if (confusedWith(d, prefix + l).length) w += 50;
    if (st === 'perlu-latihan') w += 40;
    if (st === 'belajar') w += 30;
    if (st === 'belum') w += 25;
    if (st === 'hampir') w += 15;
    if (st === 'kuasai') w += 5;
    // lama tidak dilihat → ulang kaji
    if (s && Date.now() - s.lastSeen > 3 * 86400000) w += 10;
    return w + Math.random() * 8;
  };
  return letters.slice().sort((a, b) => weight(b) - weight(a)).slice(0, n);
}

/** Pengganggu pintar: pasangan keliru sebenar anak, kemudian huruf serupa (tahap tinggi), kemudian rawak. */
export function distractors(d: ProfileData, target: string, n: number, level: number, pool: string[], prefix = 'L:'): string[] {
  const out: string[] = [];
  const add = (l: string) => { if (l && l !== target && !out.includes(l) && pool.includes(l)) out.push(l); };
  confusedWith(d, prefix + target).forEach(add);
  if (level >= 3) (prefix === 'S:' ? SOUND_CONFUSABLE : CONFUSABLE)[target]?.forEach(add);
  shuffle(pool).forEach(add);
  return out.slice(0, n);
}

/** Ringkasan bidang untuk ibu bapa. */
export function areaProgress(d: ProfileData, prefix: string, keys: string[]) {
  const practiced = keys.filter(k => (d.items[prefix + k]?.attempts ?? 0) > 0);
  const strong = keys.filter(k => STATUS_RANK[itemStatus(d, prefix + k)] >= 2);
  const mastered = keys.filter(k => itemStatus(d, prefix + k) === 'kuasai');
  const weak = keys.filter(k => itemStatus(d, prefix + k) === 'perlu-latihan' || confusedWith(d, prefix + k).length > 0);
  const attempts = practiced.reduce((a, k) => a + d.items[prefix + k].attempts, 0);
  return { practiced, strong, mastered, weak, attempts };
}
