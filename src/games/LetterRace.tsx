/** GAME 12 — Lumba Huruf: kereta berlumba di jalan raya. Papan huruf datang dari depan;
 *  anak tekan papan huruf yang betul (atau leret/kekunci kiri-kanan) untuk memandu kereta ke lorong itu.
 *  Betul = nitro (laju), salah = kereta perlahan sekejap. Tiada kemalangan, semua sampai ke garisan penamat. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { letterName, sfx, speak } from '../audio/audio';
import { SOUND_LETTERS, SOUND_WORD } from '../data/letters';
import { ObjectArt } from '../components/ObjectArt';
import { distractors } from '../services/learning';
import { shuffle } from '../utils/date';
import { show, type GameProps } from './types';

const CFG = [
  { gates: 6, lanes: 2, speed: 95, upper: false, sound: false },
  { gates: 7, lanes: 3, speed: 105, upper: false, sound: false },
  { gates: 8, lanes: 3, speed: 115, upper: false, sound: false },
  { gates: 8, lanes: 3, speed: 125, upper: true, sound: false },
  { gates: 10, lanes: 3, speed: 130, upper: true, sound: true }
];
const CAR_COLORS = ['#FF3D6E', '#2EC4B6', '#9B6BFF'];

interface Gate { target: string; letters: string[]; upper: boolean; word?: string }

export default function LetterRace({ level, ctx }: GameProps) {
  const cfg = CFG[level - 1];
  const gates = useMemo<Gate[]>(() => {
    const pool = ctx.pool.length >= 4 ? ctx.pool : 'aiubmskote'.split('');
    const f = ctx.focus.slice(0, 4);
    return Array.from({ length: cfg.gates }, (_, i) => {
      let target = f[i % f.length] ?? 'a';
      let word: string | undefined;
      if (cfg.sound && i % 2 === 1) {
        target = SOUND_LETTERS.includes(target) ? target : shuffle(SOUND_LETTERS.filter(l => pool.includes(l)))[0] ?? 'b';
        word = SOUND_WORD[target];
      }
      const letters = shuffle([target, ...distractors(ctx.data, target, cfg.lanes - 1, level + 1, pool)]);
      return { target, letters, upper: cfg.upper && i % 2 === 0, word };
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const roadRef = useRef<HTMLDivElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const meRef = useRef<HTMLDivElement>(null);
  const rivalRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [lane, setLane] = useState(Math.floor(cfg.lanes / 2));
  const laneRef = useRef(lane);
  const [gi, setGi] = useState(0);
  const [flash, setFlash] = useState<'ok' | 'no' | null>(null);
  const [nitro, setNitro] = useState(false);
  const [finished, setFinished] = useState<number | null>(null);
  const state = useRef({ y: -140, offset: 0, speed: cfg.speed, boostUntil: 0, slowUntil: 0, gi: 0, judged: false, done: false, correct: 0, t0: performance.now(), progress: 0 });

  const ask = (g: Gate) => speak(g.word ? `Bunyi awal ${g.word}. Pandu ke hurufnya!` : `Pandu ke huruf ${letterName(g.target)}!`);

  useEffect(() => { laneRef.current = lane; }, [lane]);
  useEffect(() => {
    ctx.setRepeat(() => ask(gates[state.current.gi] ?? gates[0]));
    ask(gates[0]); ctx.question();
    const keys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') steer(laneRef.current - 1);
      if (e.key === 'ArrowRight') steer(laneRef.current + 1);
    };
    window.addEventListener('keydown', keys);
    let raf = 0, last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const s = state.current;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (s.done) return;
      const H = roadRef.current?.clientHeight ?? 500;
      const carY = H - 150;
      let v = s.speed;
      if (now < s.boostUntil) v *= 1.7;
      if (now < s.slowUntil) v *= 0.45;
      s.offset = (s.offset + v * dt) % 1000;
      s.y += v * dt;
      if (roadRef.current) roadRef.current.style.setProperty('--off', `${s.offset}px`);
      if (sceneRef.current) sceneRef.current.style.setProperty('--off', `${s.offset}px`);
      if (gateRef.current) gateRef.current.style.transform = `translateY(${s.y}px)`;
      // kemajuan untuk bar lumba
      s.progress = Math.min(1, (s.gi + Math.max(0, Math.min(1, (s.y + 140) / (carY + 140)))) / gates.length);
      if (meRef.current) meRef.current.style.left = `${s.progress * 88}%`;
      const el = (now - s.t0) / 1000;
      const expected = gates.length * (carY + 260) / cfg.speed;
      rivalRefs.forEach((r, i) => { if (r.current) r.current.style.left = `${Math.min(1, el / (expected * (i ? 1.18 : 1.05))) * 88}%`; });
      // papan sampai ke kereta → nilai lorong
      if (!s.judged && s.y + 60 >= carY) {
        s.judged = true;
        const g = gates[s.gi];
        const chosen = g.letters[laneRef.current];
        const right = chosen === g.target;
        ctx.answer('L:' + g.target, right, { chosen, quiet: true });
        if (right) { s.correct++; s.boostUntil = now + 1100; sfx('correct'); setFlash('ok'); setNitro(true); setTimeout(() => setNitro(false), 1100); ctx.say(pickOk(), 'cheer'); }
        else { s.slowUntil = now + 900; sfx('wrong'); setFlash('no'); ctx.say(`Itu ${chosen.toUpperCase()}. Kita cari ${g.target.toUpperCase()}!`, 'thinking', true); }
        setTimeout(() => setFlash(null), 700);
      }
      // papan lepas → papan seterusnya
      if (s.y > H + 40) {
        s.gi++;
        if (s.gi >= gates.length) {
          s.done = true;
          const acc = s.correct / gates.length;
          const place = acc >= 0.85 ? 1 : acc >= 0.6 ? 2 : 3;
          setFinished(place);
          sfx('win');
          speak(place === 1 ? 'Kamu tempat pertama! Juara lumba!' : place === 2 ? 'Tempat kedua! Hebat!' : 'Kamu sampai ke garisan penamat! Bagus!');
          setTimeout(() => ctx.finish(), 2600);
          return;
        }
        s.y = -150; s.judged = false;
        setGi(s.gi); ctx.progress(s.gi, gates.length); ctx.question();
        ask(gates[s.gi]);
      }
    };
    raf = requestAnimationFrame(loop);
    ctx.progress(0, gates.length);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', keys); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const steer = (l: number) => {
    const n = Math.max(0, Math.min(cfg.lanes - 1, l));
    if (n !== laneRef.current) { sfx('tap'); laneRef.current = n; setLane(n); }
  };
  const swipe = useRef<number | null>(null);
  const g = gates[Math.min(gi, gates.length - 1)];
  const laneX = (i: number) => `${(i + 0.5) * (100 / cfg.lanes)}%`;

  return (
    <div className="g-race">
      <div className="race-bar" aria-hidden="true">
        <span className="race-flag" />
        <div ref={rivalRefs[0]} className="race-dot" style={{ background: CAR_COLORS[1] }} />
        <div ref={rivalRefs[1]} className="race-dot" style={{ background: CAR_COLORS[2] }} />
        <div ref={meRef} className="race-dot me" style={{ background: CAR_COLORS[0] }} />
      </div>
      <div className="race-ask">
        {g.word ? <><ObjectArt word={g.word} size={46} /><span>bunyi awal?</span></> : <><span>Pandu ke</span><span className="glyph glyph-lg">{show(g.target, g.upper)}</span></>}
      </div>
      <div ref={sceneRef} className={`race-scene ${flash ?? ''}`}
        onPointerDown={e => { swipe.current = e.clientX; }}
        onPointerUp={e => { if (swipe.current != null && Math.abs(e.clientX - swipe.current) > 40) steer(laneRef.current + (e.clientX > swipe.current ? 1 : -1)); swipe.current = null; }}>
        <div className="race-grass left" /><div className="race-grass right" />
        <div ref={roadRef} className={`race-road lanes${cfg.lanes}`}>
          <div ref={gateRef} className="race-gate" key={gi}>
            {g.letters.map((l, i) => (
              <button key={i} className="race-sign" style={{ left: laneX(i) }} aria-label={`Huruf ${l}`}
                onPointerDown={e => e.stopPropagation()} onClick={() => steer(i)}>
                <span className="glyph">{show(l, g.upper)}</span>
              </button>
            ))}
          </div>
          <div className={`race-car ${nitro ? 'nitro' : ''} ${flash === 'no' ? 'wobble' : ''}`} style={{ left: laneX(lane) }} aria-label="Kereta kamu">
            <CarSvg color={CAR_COLORS[0]} />
          </div>
        </div>
        {finished && (
          <div className="race-finish pop-in">
            <div className="checker" />
            <strong>{finished === 1 ? 'Tempat Pertama!' : finished === 2 ? 'Tempat Kedua!' : 'Sampai Penamat!'}</strong>
            <span className={`medal m${finished}`}>{finished}</span>
          </div>
        )}
      </div>
      <div className="race-controls">
        <button onClick={() => steer(lane - 1)} aria-label="Pandu ke kiri" disabled={lane === 0}>◀</button>
        <button onClick={() => steer(lane + 1)} aria-label="Pandu ke kanan" disabled={lane === cfg.lanes - 1}>▶</button>
      </div>
    </div>
  );
}

const OK = ['Vroom! Betul!', 'Nitro! Laju!', 'Hebat! Pecut!', 'Betul! Terus pecut!'];
const pickOk = () => OK[Math.floor(Math.random() * OK.length)];

export function CarSvg({ color, size = 64 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 60 100" width={size} height={size * 1.6} aria-hidden="true">
      <ellipse cx="30" cy="94" rx="24" ry="5" fill="rgba(0,0,0,.25)" />
      <rect x="4" y="16" width="10" height="20" rx="4" fill="#2B2238" /><rect x="46" y="16" width="10" height="20" rx="4" fill="#2B2238" />
      <rect x="4" y="64" width="10" height="20" rx="4" fill="#2B2238" /><rect x="46" y="64" width="10" height="20" rx="4" fill="#2B2238" />
      <path d="M14 10 q16 -10 32 0 l4 26 v40 q0 16 -20 16 q-20 0 -20 -16 v-40z" fill={color} stroke="#3B2A4D" strokeWidth="2.5" />
      <path d="M18 30 q12 -8 24 0 l-2 14 h-20z" fill="#BFEFFF" stroke="#3B2A4D" strokeWidth="2" />
      <path d="M20 66 h20 l2 10 q-12 6 -24 0z" fill="#BFEFFF" stroke="#3B2A4D" strokeWidth="2" opacity=".9" />
      <rect x="27" y="4" width="6" height="88" fill="#fff" opacity=".45" />
      <circle cx="18" cy="8" r="3" fill="#FFE27A" /><circle cx="42" cy="8" r="3" fill="#FFE27A" />
      <text x="30" y="60" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="Baloo 2, sans-serif">1</text>
    </svg>
  );
}
