/** GAME 9 — Padan Gambar (Object Match): perkataan → gambar (tahap tinggi: gambar → perkataan). */
import { useEffect, useMemo, useState } from 'react';
import { sfx, speak } from '../audio/audio';
import { ObjectArt } from '../components/ObjectArt';
import { WORDS } from '../data/words';
import { shuffle } from '../utils/date';
import type { GameProps } from './types';
import { pickWords } from './words';

const CFG = [
  { options: 2, rounds: 5, mode: 'word', audio: true, maxLevel: 1 },
  { options: 3, rounds: 6, mode: 'word', audio: true, maxLevel: 2 },
  { options: 3, rounds: 6, mode: 'word', audio: false, maxLevel: 2 },
  { options: 3, rounds: 6, mode: 'picture', audio: false, maxLevel: 3 },
  { options: 4, rounds: 7, mode: 'mix', audio: false, maxLevel: 3 }
] as const;

export default function ObjectMatch({ level, ctx }: GameProps) {
  const cfg = CFG[level - 1];
  const words = useMemo(() => pickWords(ctx, 'V:', cfg.maxLevel, cfg.rounds), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [r, setR] = useState(0);
  const W = words[r].word;
  const mode = cfg.mode === 'mix' ? (r % 2 ? 'picture' : 'word') : cfg.mode;
  const options = useMemo(() => {
    // pengganggu: utamakan perkataan bermula dengan huruf sama (lebih mencabar di tahap tinggi)
    const others = shuffle(WORDS.filter(w => w.word !== W && w.level <= cfg.maxLevel));
    if (level >= 4) others.sort((a, b) => Number(b.word[0] === W[0]) - Number(a.word[0] === W[0]));
    return shuffle([W, ...others.slice(0, cfg.options - 1).map(w => w.word)]);
  }, [r]); // eslint-disable-line react-hooks/exhaustive-deps
  const [wrong, setWrong] = useState<string[]>([]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setWrong([]); setOk(false);
    const ask = () => speak(mode === 'word' ? (cfg.audio ? `Mana gambar ${W}?` : 'Baca perkataan ini. Mana gambarnya?') : 'Apa nama gambar ini? Pilih perkataannya.');
    ctx.setRepeat(ask); ask(); ctx.question(); ctx.progress(r, cfg.rounds);
  }, [r]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (w: string) => {
    if (ok || wrong.includes(w)) return;
    if (w === W) {
      setOk(true);
      ctx.answer('V:' + W, true, { hinted: wrong.length > 0 });
      speak(W);
      setTimeout(() => { if (r + 1 >= cfg.rounds) ctx.finish(); else setR(x => x + 1); }, 1300);
    } else {
      setWrong(x => [...x, w]); sfx('wrong');
      ctx.answer('V:' + W, false, { chosen: w });
    }
  };

  return (
    <div className="g-object">
      <div className="obj-ask">
        {mode === 'word'
          ? <span className="glyph obj-word">{W.toUpperCase()}</span>
          : <ObjectArt word={W} size={130} />}
      </div>
      <div className={`obj-options n${cfg.options} ${mode}`}>
        {options.map(w => (
          <button key={w} className={`obj-opt ${ok && w === W ? 'correct' : ''} ${wrong.includes(w) ? 'wrong' : ''} ${wrong.length >= 2 && w === W ? 'glow' : ''}`} onClick={() => tap(w)} aria-label={w}>
            {mode === 'word' ? <ObjectArt word={w} size={92} /> : <span className="glyph">{w.toUpperCase()}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
