/** GAME 10 — Belon Huruf: belon terapung perlahan; pecahkan belon dengan huruf sasaran. Belon terlepas akan kembali — tiada kalah. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { letterName, sfx, speak } from '../audio/audio';
import { distractors } from '../services/learning';
import { show, type GameProps } from './types';

const CFG = [
  { goal: 4, speed: 11, others: 1, upper: false },
  { goal: 5, speed: 10, others: 2, upper: false },
  { goal: 6, speed: 9, others: 3, upper: false },
  { goal: 6, speed: 8.5, others: 3, upper: true },
  { goal: 8, speed: 8, others: 4, upper: true }
];
const COLORS = ['#FF7EB6', '#2EC4B6', '#FFC93C', '#9B6BFF', '#9BDE4A', '#FF9F6B'];

interface Balloon { id: number; l: string; x: number; delay: number; color: string; upper: boolean; popped: boolean; bad: boolean }

export default function LetterBalloon({ level, ctx }: GameProps) {
  const cfg = CFG[level - 1];
  const target = ctx.focus[0] ?? 'a';
  const others = useMemo(() => distractors(ctx.data, target, cfg.others, level + 1, ctx.pool.length > 4 ? ctx.pool : 'abimskuto'.split('')), []); // eslint-disable-line react-hooks/exhaustive-deps
  const nextId = useRef(0);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [got, setGot] = useState(0);
  const finished = useRef(false);

  const make = (forceTarget?: boolean, delay = 0): Balloon => {
    const isT = forceTarget ?? Math.random() < 0.45;
    return {
      id: nextId.current++, l: isT ? target : others[Math.floor(Math.random() * others.length)] ?? 'o',
      x: 8 + Math.random() * 72, delay, color: COLORS[Math.floor(Math.random() * COLORS.length)],
      upper: cfg.upper && Math.random() < 0.5, popped: false, bad: false
    };
  };

  useEffect(() => {
    setBalloons([make(true, -cfg.speed * 0.55), make(false, -cfg.speed * 0.4), make(true, -cfg.speed * 0.25), make(false, -cfg.speed * 0.1), make(undefined, 0.6)]);
    const ask = () => speak(`Pecahkan belon huruf ${letterName(target)}!`);
    ctx.setRepeat(ask); ask(); ctx.question();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { ctx.progress(got, cfg.goal); }, [got]); // eslint-disable-line react-hooks/exhaustive-deps

  const respawn = (id: number) => setBalloons(bs => bs.map(b => b.id === id ? make(undefined, 0) : b));

  const pop = (b: Balloon) => {
    if (b.popped || finished.current) return;
    if (b.l === target) {
      sfx('pop');
      setBalloons(bs => bs.map(x => x.id === b.id ? { ...x, popped: true } : x));
      ctx.answer('L:' + target, true, { quiet: true });
      const g = got + 1;
      setGot(g);
      if (g >= cfg.goal) { finished.current = true; setTimeout(ctx.finish, 700); }
      else { ctx.question(); setTimeout(() => respawn(b.id), 450); }
    } else {
      sfx('wrong');
      setBalloons(bs => bs.map(x => x.id === b.id ? { ...x, bad: true } : x));
      setTimeout(() => setBalloons(bs => bs.map(x => x.id === b.id ? { ...x, bad: false } : x)), 500);
      ctx.answer('L:' + target, false, { chosen: b.l });
    }
  };

  return (
    <div className="g-balloon">
      <div className="balloon-target">Pecahkan <span className="glyph glyph-lg">{target}</span>{cfg.upper && <span className="glyph glyph-lg"> {target.toUpperCase()}</span>}</div>
      <div className="balloon-sky">
        {balloons.map(b => (
          <button key={b.id} className={`fly-balloon ${b.popped ? 'popped' : ''} ${b.bad ? 'shake' : ''}`}
            style={{ left: b.x + '%', animationDuration: cfg.speed + 's', animationDelay: b.delay + 's', ['--c' as string]: b.color }}
            onClick={() => pop(b)} onAnimationIteration={() => respawn(b.id)} aria-label={`Belon huruf ${b.l}`}>
            <span className="glyph">{show(b.l, b.upper)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
