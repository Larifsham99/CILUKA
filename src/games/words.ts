import { WORDS, type Word } from '../data/words';
import { itemStatus } from '../services/learning';
import { shuffle } from '../utils/date';
import type { GameCtx } from './types';

/** Pilih perkataan: perkataan misi dahulu, kemudian yang mengandungi huruf fokus dan belum dikuasai. */
export function pickWords(ctx: GameCtx, prefix: string, maxLevel: number, n: number, minLevel = 1, filter?: (w: Word) => boolean): Word[] {
  const pool = WORDS.filter(w => w.level <= maxLevel && w.level >= minLevel && (!filter || filter(w)));
  const score = (w: Word) => {
    let s = Math.random() * 3;
    if (w.word === ctx.missionWord) s += 100;
    const st = itemStatus(ctx.data, prefix + w.word);
    if (st === 'perlu-latihan') s += 30; else if (st === 'belum') s += 20; else if (st === 'belajar') s += 15; else if (st === 'kuasai') s -= 10;
    if (ctx.focus.slice(0, 3).some(l => w.word.includes(l))) s += 10;
    return s;
  };
  const sorted = pool.slice().sort((a, b) => score(b) - score(a)).slice(0, n);
  return shuffle(sorted.length >= n ? sorted : [...sorted, ...WORDS.slice(0, n - sorted.length)]);
}
