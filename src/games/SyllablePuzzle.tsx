/** GAME 8 — Teka Suku Kata (Syllable Puzzle): BU + KU = BUKU. */
import { useEffect, useMemo, useState } from 'react';
import { sfx, speak } from '../audio/audio';
import { ObjectArt } from '../components/ObjectArt';
import { WORDS } from '../data/words';
import { shuffle } from '../utils/date';
import type { GameProps } from './types';
import { pickWords } from './words';

const CFG = [
  { minLevel: 1, maxLevel: 1, rounds: 4, extra: 0 },
  { minLevel: 1, maxLevel: 1, rounds: 5, extra: 1 },
  { minLevel: 1, maxLevel: 2, rounds: 5, extra: 2 },
  { minLevel: 2, maxLevel: 3, rounds: 5, extra: 2 },
  { minLevel: 2, maxLevel: 3, rounds: 6, extra: 3 }
];

interface Piece { id: number; s: string; used: boolean }

export default function SyllablePuzzle({ level, ctx }: GameProps) {
  const cfg = CFG[level - 1];
  const words = useMemo(() => pickWords(ctx, 'SY:', cfg.maxLevel, cfg.rounds, cfg.minLevel, w => w.syllables.length >= 2), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [r, setR] = useState(0);
  const W = words[r];
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [placed, setPlaced] = useState<string[]>([]);
  const [shake, setShake] = useState<number | null>(null);
  const [wrongs, setWrongs] = useState(0);
  const done = placed.length === W.syllables.length;

  useEffect(() => {
    const others = shuffle(WORDS.flatMap(w => w.syllables)).filter(s => !W.syllables.includes(s)).filter((s, i, a) => a.indexOf(s) === i).slice(0, cfg.extra);
    setPieces(shuffle([...W.syllables, ...others]).map((s, id) => ({ id, s, used: false })));
    setPlaced([]); setWrongs(0);
    const ask = () => speak(`${W.syllables.join(', ')}. Jom susun jadi ${W.word}!`);
    ctx.setRepeat(ask); ask(); ctx.question(); ctx.progress(r, cfg.rounds);
  }, [r]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (p: Piece) => {
    if (p.used || done) return;
    const want = W.syllables[placed.length];
    if (p.s === want) {
      speak(p.s, { rate: 0.85 });
      sfx('tap');
      setPieces(ps => ps.map(x => x.id === p.id ? { ...x, used: true } : x));
      const np = [...placed, p.s];
      setPlaced(np);
      if (np.length === W.syllables.length) {
        ctx.answer('SY:' + W.word, true, { hinted: wrongs > 1 });
        setTimeout(() => speak(W.word + '!'), 500);
        setTimeout(() => { if (r + 1 >= cfg.rounds) ctx.finish(); else setR(x => x + 1); }, 1800);
      }
    } else {
      setShake(p.id); setTimeout(() => setShake(null), 450);
      setWrongs(w => w + 1);
      ctx.answer('SY:' + W.word, false, { chosen: p.s });
    }
  };
  const glowId = wrongs >= 2 ? pieces.find(p => !p.used && p.s === W.syllables[placed.length])?.id : undefined;

  return (
    <div className="g-syll">
      <ObjectArt word={W.word} size={120} className={done ? 'pop-in' : ''} />
      <div className="syl-slots">
        {W.syllables.map((s, k) => (
          <span key={k} className={`syl-slot ${k < placed.length ? 'filled' : ''} ${k === placed.length && !done ? 'next' : ''} ${done ? 'lit' : ''}`}>
            <span className="glyph">{k < placed.length ? s.toUpperCase() : ''}</span>
            {k < W.syllables.length - 1 && <i className="plus">+</i>}
          </span>
        ))}
      </div>
      {done && <div className="syl-result glyph pop-in">{W.word.toUpperCase()}</div>}
      <div className="syl-pieces">
        {pieces.map(p => (
          <button key={p.id} className={`syl-piece ${p.used ? 'used' : ''} ${shake === p.id ? 'shake' : ''} ${glowId === p.id ? 'glow' : ''}`} onClick={() => tap(p)} aria-label={`Suku kata ${p.s}`}>
            <span className="glyph">{p.s.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
