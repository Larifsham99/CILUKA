/** GAME 1 — Cari Huruf (Letter Hunt): Pip sebut huruf, anak tekan huruf yang betul. */
import { useEffect, useMemo, useState } from 'react';
import { letterName, sfx, speak } from '../audio/audio';
import { distractors } from '../services/learning';
import { shuffle } from '../utils/date';
import { show, type GameProps } from './types';

const CFG = [
  { options: 3, rounds: 5, upperMix: false },
  { options: 4, rounds: 6, upperMix: false },
  { options: 6, rounds: 6, upperMix: false },
  { options: 6, rounds: 7, upperMix: true },
  { options: 9, rounds: 8, upperMix: true }
];

export default function LetterHunt({ level, ctx }: GameProps) {
  const cfg = CFG[level - 1];
  const targets = useMemo(() => {
    const f = ctx.focus.slice(0, Math.max(2, Math.ceil(cfg.rounds / 2)));
    return Array.from({ length: cfg.rounds }, (_, i) => f[i % f.length]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [round, setRound] = useState(0);
  const [wrongs, setWrongs] = useState<string[]>([]);
  const [found, setFound] = useState<string | null>(null);
  const target = targets[round];
  const upper = cfg.upperMix && round % 2 === 1;

  const options = useMemo(() => shuffle([target, ...distractors(ctx.data, target, cfg.options - 1, level, ctx.pool.length >= cfg.options ? ctx.pool : 'abcdefghijklmnoprstuwy'.split(''))]), [round]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const ask = () => speak(`Cari huruf ${letterName(target)}!`);
    ctx.setRepeat(ask);
    ctx.question();
    ctx.progress(round, cfg.rounds);
    ask();
    setWrongs([]); setFound(null);
  }, [round]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (l: string) => {
    if (found || wrongs.includes(l)) return;
    if (l === target) {
      setFound(l);
      ctx.answer('L:' + target, true, { hinted: wrongs.length >= 2 });
      setTimeout(() => { if (round + 1 >= cfg.rounds) ctx.finish(); else setRound(r => r + 1); }, 1100);
    } else {
      setWrongs(w => [...w, l]);
      ctx.answer('L:' + target, false, { chosen: l });
      if (wrongs.length + 1 >= 2) ctx.hint();
      sfx('wrong');
    }
  };

  return (
    <div className="g-hunt">
      <div className="g-ask">
        <span>Cari huruf</span>
        <span className="glyph glyph-xl ask-letter">{show(target, upper)}</span>
      </div>
      <div className={`letter-grid n${cfg.options}`}>
        {options.map(l => {
          const isT = l === target;
          const cls = found && isT ? 'correct' : wrongs.includes(l) ? 'wrong' : wrongs.length >= 2 && isT ? 'glow' : '';
          return (
            <button key={l} className={`letter-bubble ${cls}`} onClick={() => tap(l)} aria-label={`Huruf ${l}`}>
              <span className="glyph">{show(l, upper)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
