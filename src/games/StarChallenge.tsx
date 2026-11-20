/** GAME 11 — Cabaran Bintang (Mastery Challenge): soalan campuran merentasi kemahiran — huruf, bunyi, ejaan, perkataan. */
import { useEffect, useMemo, useState } from 'react';
import { letterName, soundCue, sfx, speak } from '../audio/audio';
import { ObjectArt } from '../components/ObjectArt';
import { SOUND_LETTERS, SOUND_WORD } from '../data/letters';
import { WORDS } from '../data/words';
import { distractors } from '../services/learning';
import { shuffle } from '../utils/date';
import type { GameProps } from './types';

type Q =
  | { kind: 'letter'; key: string; answer: string; options: string[]; say: string }
  | { kind: 'sound'; key: string; answer: string; options: string[]; say: string; word: string }
  | { kind: 'missing'; key: string; answer: string; options: string[]; say: string; word: string; gap: number }
  | { kind: 'picture'; key: string; answer: string; options: string[]; say: string };

const ROUNDS = [6, 7, 8, 9, 10];
const OPTS = [3, 3, 4, 4, 4];

export default function StarChallenge({ level, ctx }: GameProps) {
  const qs = useMemo<Q[]>(() => {
    const n = ROUNDS[level - 1], o = OPTS[level - 1];
    const pool = ctx.pool.length >= 5 ? ctx.pool : 'aiubmskote'.split('');
    const out: Q[] = [];
    const kinds = ['letter', 'sound', 'missing', 'picture'] as const;
    for (let i = 0; i < n; i++) {
      const kind = kinds[i % kinds.length];
      const f = ctx.focus[i % Math.max(1, ctx.focus.length)] ?? 'a';
      if (kind === 'letter') out.push({ kind, key: 'L:' + f, answer: f, options: shuffle([f, ...distractors(ctx.data, f, o - 1, 4, pool)]), say: `Mana huruf ${letterName(f)}?` });
      else if (kind === 'sound') {
        const l = SOUND_LETTERS.includes(f) ? f : shuffle(SOUND_LETTERS.filter(x => pool.includes(x)))[0] ?? 'b';
        out.push({ kind, key: 'S:' + l, answer: l, word: SOUND_WORD[l], options: shuffle([l, ...distractors(ctx.data, l, o - 1, 4, SOUND_LETTERS, 'S:')]), say: `${SOUND_WORD[l]}. ${soundCue(l)}, ${soundCue(l)}. Huruf apa?` });
      } else if (kind === 'missing') {
        const w = shuffle(WORDS.filter(x => x.level <= Math.min(3, level)))[0];
        const gap = Math.floor(Math.random() * w.word.length);
        const a = w.word[gap];
        out.push({ kind, key: 'SP:' + w.word, answer: a, word: w.word, gap, options: shuffle([a, ...shuffle('abdeiklmnoprstu'.split('').filter(x => x !== a)).slice(0, o - 1)]), say: `${w.word}. Huruf apa yang hilang?` });
      } else {
        const ws = shuffle(WORDS.filter(x => x.level <= Math.min(3, level))).slice(0, o);
        out.push({ kind, key: 'V:' + ws[0].word, answer: ws[0].word, options: shuffle(ws.map(x => x.word)), say: level >= 3 ? 'Baca perkataan. Mana gambarnya?' : `Mana gambar ${ws[0].word}?` });
      }
    }
    return out;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const [ok, setOk] = useState(false);
  const q = qs[i];

  useEffect(() => {
    setWrong([]); setOk(false);
    const ask = () => speak(q.say);
    ctx.setRepeat(ask); ask(); ctx.question(); ctx.progress(i, qs.length);
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (v: string) => {
    if (ok || wrong.includes(v)) return;
    if (v === q.answer) {
      setOk(true);
      ctx.answer(q.key, true, { hinted: wrong.length > 0 });
      setTimeout(() => { if (i + 1 >= qs.length) ctx.finish(); else setI(x => x + 1); }, 1000);
    } else {
      setWrong(w => [...w, v]); sfx('wrong');
      ctx.answer(q.key, false, { chosen: v });
    }
  };

  const cls = (v: string) => `${ok && v === q.answer ? 'correct' : ''} ${wrong.includes(v) ? 'wrong' : ''}`;
  return (
    <div className="g-challenge">
      <div className="ch-badge">Soalan {i + 1} / {qs.length}</div>
      <div className="ch-ask">
        {q.kind === 'letter' && <button className="listen-big" onClick={() => speak(q.say)} aria-label="Dengar semula"><svg viewBox="0 0 100 100" width="80" height="80" aria-hidden="true"><path d="M26 40 h12 l18 -14 v48 l-18 -14 h-12z" fill="#fff" /><path d="M66 38 q8 12 0 24 M74 30 q14 20 0 40" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" /></svg></button>}
        {q.kind === 'sound' && <ObjectArt word={q.word} size={110} />}
        {q.kind === 'missing' && <div className="ch-missing"><ObjectArt word={q.word} size={90} /><div className="slots" style={{ ['--n' as string]: Math.max(4, q.word.length) }}>{q.word.split('').map((l, k) => <span key={k} className={`slot ${k === q.gap ? (ok ? 'filled' : 'next') : 'given'}`}><span className="glyph">{k === q.gap && !ok ? '?' : l.toUpperCase()}</span></span>)}</div></div>}
        {q.kind === 'picture' && <span className="glyph obj-word">{q.answer.toUpperCase()}</span>}
      </div>
      {q.kind === 'picture'
        ? <div className={`obj-options n${q.options.length} word`}>{q.options.map(v => <button key={v} className={`obj-opt ${cls(v)}`} onClick={() => tap(v)} aria-label={v}><ObjectArt word={v} size={84} /></button>)}</div>
        : <div className={`letter-grid n${q.options.length}`}>{q.options.map(v => <button key={v} className={`letter-bubble ${cls(v)}`} onClick={() => tap(v)} aria-label={`Huruf ${v}`}><span className="glyph">{q.kind === 'missing' ? v.toUpperCase() : v}</span></button>)}</div>}
    </div>
  );
}
