/** GAME 2 — Padan Huruf (Letter Match): tekan huruf besar, kemudian huruf kecil yang sama. */
import { useEffect, useMemo, useState } from 'react';
import { sayLetter, sfx, speak } from '../audio/audio';
import { CONFUSABLE } from '../data/letters';
import { shuffle } from '../utils/date';
import type { GameProps } from './types';

const PAIRS = [2, 3, 4, 5, 6];
const SETS = [1, 2, 2, 2, 2];

export default function LetterMatch({ level, ctx }: GameProps) {
  const n = PAIRS[level - 1];
  const sets = SETS[level - 1];
  const [set, setSet] = useState(0);
  const letters = useMemo(() => {
    let base = ctx.focus.slice(0, n);
    if (level >= 4) {
      // tahap tinggi: masukkan pasangan yang mudah keliru
      const extra = base.flatMap(l => CONFUSABLE[l] ?? []).filter(l => !base.includes(l));
      base = shuffle([...base.slice(0, Math.ceil(n / 2)), ...extra]).slice(0, n);
    }
    while (base.length < n) { const c = 'abmsktinoeup'[base.length + set]; if (!base.includes(c)) base.push(c); else base.push('r'); }
    return shuffle(Array.from(new Set(base))).slice(0, n);
  }, [set]); // eslint-disable-line react-hooks/exhaustive-deps
  const right = useMemo(() => shuffle(letters), [letters]);
  const [sel, setSel] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [bad, setBad] = useState<string | null>(null);

  useEffect(() => {
    setDone([]); setSel(null); setSide(null);
    const ask = () => speak('Padankan huruf besar dengan huruf kecil yang sama.');
    ctx.setRepeat(ask); ask(); ctx.question();
  }, [set]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { ctx.progress(set * n + done.length, n * sets); }, [done, set]); // eslint-disable-line react-hooks/exhaustive-deps

  // Anak boleh mula dari huruf besar ATAU huruf kecil.
  const [side, setSide] = useState<'big' | 'small' | null>(null);
  const pick = (l: string, from: 'big' | 'small') => {
    if (done.includes(l)) return;
    if (!sel || side === from) { setSel(l); setSide(from); sfx('tap'); sayLetter(l); return; }
    if (l === sel) {
      const nd = [...done, l];
      setDone(nd); setSel(null); setSide(null);
      ctx.answer('L:' + l, true);
      if (nd.length === n) setTimeout(() => { if (set + 1 >= sets) ctx.finish(); else setSet(s => s + 1); }, 900);
      else ctx.question();
    } else {
      setBad(l); setTimeout(() => setBad(null), 500);
      ctx.answer('L:' + sel, false, { chosen: l });
    }
  };

  return (
    <div className="g-match">
      <div className="match-cols">
        <div className="match-col">
          {letters.map(l => (
            <button key={l} className={`match-card big ${sel === l && side === 'big' ? 'sel' : ''} ${done.includes(l) ? 'done' : ''} ${bad === l && side === 'small' ? 'shake' : ''}`} onClick={() => pick(l, 'big')} aria-label={`Huruf besar ${l}`}>
              <span className="glyph">{l.toUpperCase()}</span>
            </button>
          ))}
        </div>
        <div className="match-col">
          {right.map(l => (
            <button key={l} className={`match-card small ${sel === l && side === 'small' ? 'sel' : ''} ${done.includes(l) ? 'done' : ''} ${bad === l && side === 'big' ? 'shake' : ''}`} onClick={() => pick(l, 'small')} aria-label={`Huruf kecil ${l}`}>
              <span className="glyph">{l}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
