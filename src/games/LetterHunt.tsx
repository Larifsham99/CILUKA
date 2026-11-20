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
      {level < 3 || !ctx.voiceOn
        ? <div className="g-ask"><span>Cari huruf</span><span className="glyph glyph-xl ask-letter">{show(target, upper)}</span></div>
        : <button className="g-ask listen" onClick={() => speak(`Cari huruf ${letterName(target)}!`)} aria-label="Dengar huruf semula">
            <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" /><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            <span>Dengar &amp; cari</span>
          </button>}
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
