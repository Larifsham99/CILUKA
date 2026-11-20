/** GAME 7 — Huruf Hilang (Missing Letter): B _ L A → pilih huruf yang hilang. */
import { useEffect, useMemo, useState } from 'react';
import { sfx, speak } from '../audio/audio';
import { CONFUSABLE } from '../data/letters';
import { ObjectArt } from '../components/ObjectArt';
import { store } from '../hooks/useStore';
import { shuffle } from '../utils/date';
import type { GameProps } from './types';
import { pickWords } from './words';

const CFG = [
  { maxLevel: 1, rounds: 5, options: 2, where: 'first', missing: 1 },
  { maxLevel: 1, rounds: 5, options: 3, where: 'any', missing: 1 },
  { maxLevel: 2, rounds: 6, options: 3, where: 'middle', missing: 1 },
  { maxLevel: 2, rounds: 6, options: 4, where: 'any', missing: 2 },
  { maxLevel: 3, rounds: 7, options: 4, where: 'any', missing: 2 }
] as const;

export default function MissingLetter({ level, ctx }: GameProps) {
  const cfg = CFG[level - 1];
  const words = useMemo(() => pickWords(ctx, 'SP:', cfg.maxLevel, cfg.rounds, 1, w => w.word.length >= 3), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [r, setR] = useState(0);
  const W = words[r];
  const gaps = useMemo(() => {
    const n = W.word.length;
    const idx = cfg.where === 'first' ? [0] : cfg.where === 'middle' ? [1 + Math.floor(Math.random() * Math.max(1, n - 2))] : [Math.floor(Math.random() * n)];
    if (cfg.missing === 2 && n >= 4) { let j = Math.floor(Math.random() * n); while (idx.includes(j) || W.word[j] === W.word[idx[0]]) j = (j + 1) % n; idx.push(j); }
    return idx.sort((a, b) => a - b);
  }, [r]); // eslint-disable-line react-hooks/exhaustive-deps
  const [filled, setFilled] = useState<number[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const gap = gaps.find(g => !filled.includes(g));
  const want = gap != null ? W.word[gap] : '';
  const options = useMemo(() => {
    if (!want) return [];
    const near = level >= 5 ? (CONFUSABLE[want] ?? []) : [];
    const rest = shuffle('abdegiklmnoprstu'.split(''));
    const out = [want, ...near, ...rest].filter((l, i, a) => a.indexOf(l) === i).slice(0, cfg.options);
    return shuffle(out);
  }, [r, gap]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFilled([]); setWrong([]);
    const ask = () => speak(`${W.word}. Huruf apa yang hilang?`);
    ctx.setRepeat(ask); ask(); ctx.question(); ctx.progress(r, cfg.rounds);
  }, [r]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (l: string) => {
    if (gap == null || wrong.includes(l)) return;
    if (l === want) {
      const f = [...filled, gap];
      setFilled(f); setWrong([]);
      ctx.answer('L:' + l, true, { quiet: f.length < gaps.length });
      if (f.length >= gaps.length) {
        ctx.answer('SP:' + W.word, true, { quiet: true, hinted: wrong.length > 0 });
        store.update(d => { if (!d.words.includes(W.word)) d.words.push(W.word); });
        speak(W.word);
        setTimeout(() => { if (r + 1 >= cfg.rounds) ctx.finish(); else setR(x => x + 1); }, 1400);
      } else ctx.question();
    } else {
      setWrong(w => [...w, l]); sfx('wrong');
      ctx.answer('SP:' + W.word, false, { chosen: l });
    }
  };

  return (
    <div className="g-missing">
      <ObjectArt word={W.word} size={120} />
      <div className="slots" style={{ ['--n' as string]: Math.max(4, W.word.length) }}>
        {W.word.split('').map((l, k) => {
          const isGap = gaps.includes(k);
          const show = !isGap || filled.includes(k);
          return <span key={k} className={`slot ${isGap ? (show ? 'filled pop-in' : k === gap ? 'next' : '') : 'given'}`}><span className="glyph">{show ? l.toUpperCase() : '?'}</span></span>;
        })}
      </div>
      <div className={`letter-grid n${cfg.options}`}>
        {options.map(l => (
          <button key={l} className={`letter-bubble ${wrong.includes(l) ? 'wrong' : ''} ${wrong.length >= 2 && l === want ? 'glow' : ''}`} onClick={() => tap(l)} aria-label={`Huruf ${l}`}>
            <span className="glyph">{l.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
