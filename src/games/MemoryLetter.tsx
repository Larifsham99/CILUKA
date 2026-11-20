/** GAME 3 — Kad Ingat (Memory Letter): buka dua kad, cari pasangan. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { sayLetter, sfx, speak } from '../audio/audio';
import { shuffle } from '../utils/date';
import type { GameProps } from './types';

const CFG = [
  { pairs: 2, mode: 'same' }, { pairs: 3, mode: 'same' }, { pairs: 4, mode: 'same' },
  { pairs: 4, mode: 'case' }, { pairs: 6, mode: 'case' }
] as const;

interface Card { id: number; letter: string; face: string }

export default function MemoryLetter({ level, ctx }: GameProps) {
  const cfg = CFG[level - 1];
  const cards = useMemo<Card[]>(() => {
    const ls = [...ctx.focus, ...'aibmsk'.split('')].filter((l, i, a) => a.indexOf(l) === i).slice(0, cfg.pairs);
    return shuffle(ls.flatMap((l, i) => [
      { id: i * 2, letter: l, face: l },
      { id: i * 2 + 1, letter: l, face: cfg.mode === 'case' ? l.toUpperCase() : l }
    ]));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const lock = useRef(false);
  const misses = useRef(0);

  useEffect(() => {
    const ask = () => speak('Buka dua kad. Cari pasangan yang sama.');
    ctx.setRepeat(ask); ask(); ctx.question();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { ctx.progress(matched.length, cfg.pairs); }, [matched]); // eslint-disable-line react-hooks/exhaustive-deps

  const flip = (c: Card) => {
    if (lock.current || open.includes(c.id) || matched.includes(c.letter)) return;
    sfx('flip');
    sayLetter(c.letter);
    const o = [...open, c.id];
    setOpen(o);
    if (o.length === 2) {
      lock.current = true;
      const [a, b] = o.map(id => cards.find(x => x.id === id)!);
      if (a.letter === b.letter) {
        setTimeout(() => {
          const m = [...matched, a.letter];
          setMatched(m); setOpen([]); lock.current = false;
          ctx.answer('L:' + a.letter, true);
          if (m.length === cfg.pairs) setTimeout(ctx.finish, 900);
        }, 450);
      } else {
        // salah padan ialah ingatan, bukan pengetahuan huruf — dikira untuk bintang sahaja
        misses.current++;
        // beberapa salah padan dijangka dalam permainan ingatan; hanya yang berlebihan mengurangkan bintang
        setTimeout(() => { setOpen([]); lock.current = false; if (misses.current > cfg.pairs) ctx.answer('M:memory', false, { quiet: true }); }, 900);
      }
    }
  };

  return (
    <div className="g-memory">
      <div className={`memory-grid p${cfg.pairs}`}>
        {cards.map(c => {
          const up = open.includes(c.id) || matched.includes(c.letter);
          return (
            <button key={c.id} className={`mem-card ${up ? 'up' : ''} ${matched.includes(c.letter) ? 'matched' : ''}`} onClick={() => flip(c)} aria-label={up ? `Kad ${c.face}` : 'Kad tertutup'}>
              <span className="mem-inner">
                <span className="mem-back" aria-hidden="true"><svg viewBox="0 0 40 40" width="46" height="46"><circle cx="20" cy="20" r="14" fill="#fff" opacity=".35" /><text x="20" y="27" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="Baloo 2, sans-serif">?</text></svg></span>
                <span className="mem-front glyph">{c.face}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
