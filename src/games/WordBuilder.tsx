/** GAME 6 — Bina Kata (Magic Word Builder): lihat gambar, susun huruf mengikut urutan, perkataan "menetas". */
import { useEffect, useMemo, useState } from 'react';
import { letterName, sayLetter, sfx, speak } from '../audio/audio';
import { ObjectArt } from '../components/ObjectArt';
import { store } from '../hooks/useStore';
import { shuffle } from '../utils/date';
import type { GameProps } from './types';
import { pickWords } from './words';

const CFG = [
  { maxLevel: 1, words: 3, ghost: true, extra: 0, picture: true },
  { maxLevel: 1, words: 3, ghost: false, extra: 0, picture: true },
  { maxLevel: 2, words: 3, ghost: false, extra: 2, picture: true },
  { maxLevel: 3, words: 4, ghost: false, extra: 2, picture: true },
  { maxLevel: 3, words: 4, ghost: false, extra: 3, picture: false }
];

interface Tile { id: number; l: string; used: boolean }

export default function WordBuilder({ level, ctx }: GameProps) {
  const cfg = CFG[level - 1];
  const words = useMemo(() => pickWords(ctx, 'SP:', cfg.maxLevel, cfg.words), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [wi, setWi] = useState(0);
  const W = words[wi];
  const letters = W.word.split('');
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [slot, setSlot] = useState(0);
  const [shake, setShake] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [hatched, setHatched] = useState(false);

  useEffect(() => {
    const extra = shuffle('abdegiklmnoprstu'.split('').filter(c => !letters.includes(c))).slice(0, cfg.extra);
    setTiles(shuffle([...letters, ...extra]).map((l, id) => ({ id, l, used: false })));
    setSlot(0); setMistakes(0); setHatched(false);
    const ask = () => speak(cfg.picture ? `Jom bina perkataan ${W.word}!` : `Dengar baik-baik. Eja: ${W.word}.`);
    ctx.setRepeat(ask); ask(); ctx.question(); ctx.progress(wi, words.length);
  }, [wi]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (t: Tile) => {
    if (t.used || hatched) return;
    const want = letters[slot];
    if (t.l === want) {
      sayLetter(t.l);
      setTiles(ts => ts.map(x => x.id === t.id ? { ...x, used: true } : x));
      ctx.answer('L:' + t.l, true, { quiet: true });
      const ns = slot + 1;
      setSlot(ns);
      sfx('tap');
      if (ns >= letters.length) hatch();
    } else {
      setShake(t.id); setTimeout(() => setShake(null), 450);
      setMistakes(m => m + 1);
      ctx.answer('SP:' + W.word, false, { chosen: t.l });
      ctx.say(`Kita perlukan huruf ${want.toUpperCase()}.`, 'thinking');
      speak(`Kita perlukan huruf ${letterName(want)}`);
    }
  };

  const hatch = async () => {
    setHatched(true);
    ctx.answer('SP:' + W.word, true, { hinted: mistakes > 1 });
    store.update(d => { if (!d.words.includes(W.word)) d.words.push(W.word); });
    for (const s of W.syllables) { await speak(s, { rate: 0.8 }); }
    await speak(W.word + '!');
    setTimeout(() => { if (wi + 1 >= words.length) ctx.finish(); else setWi(x => x + 1); }, 1200);
  };

  const wantTile = mistakes >= 2 ? tiles.find(t => !t.used && t.l === letters[slot])?.id : undefined;

  return (
    <div className="g-word">
      <div className={`word-egg ${hatched ? 'hatched' : ''}`}>
        {(cfg.picture || hatched)
          ? <ObjectArt word={W.word} size={130} className={hatched ? 'pop-in' : cfg.picture ? '' : 'silhouette'} />
          : <button className="listen-big" onClick={() => speak(W.word)} aria-label="Dengar perkataan"><svg viewBox="0 0 100 100" width="90" height="90" aria-hidden="true"><path d="M26 40 h12 l18 -14 v48 l-18 -14 h-12z" fill="#fff" /><path d="M66 38 q8 12 0 24 M74 30 q14 20 0 40" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" /></svg></button>}
      </div>
      <div className="slots" style={{ ['--n' as string]: Math.max(4, letters.length) }}>
        {letters.map((l, k) => (
          <span key={k} className={`slot ${k < slot ? 'filled' : ''} ${k === slot && !hatched ? 'next' : ''} ${hatched ? 'lit' : ''}`}>
            <span className="glyph">{k < slot ? l.toUpperCase() : cfg.ghost ? <span className="ghost">{l.toUpperCase()}</span> : ''}</span>
          </span>
        ))}
      </div>
      <div className="tiles" style={{ ['--n' as string]: Math.max(4, tiles.length) }}>
        {tiles.map(t => (
          <button key={t.id} className={`tile ${t.used ? 'used' : ''} ${shake === t.id ? 'shake' : ''} ${wantTile === t.id ? 'glow' : ''}`} onClick={() => tap(t)} aria-label={`Huruf ${t.l}`}>
            <span className="glyph">{t.l.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
