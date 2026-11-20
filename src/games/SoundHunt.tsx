/** GAME 4 — Cari Bunyi (Sound Hunt): dengar bunyi awal perkataan, pilih huruf yang sepadan. */
import { useEffect, useMemo, useState } from 'react';
import { soundCue, sfx, speak } from '../audio/audio';
import { SOUND_LETTERS, SOUND_WORD } from '../data/letters';
import { ObjectArt } from '../components/ObjectArt';
import { distractors, focusLetters } from '../services/learning';
import { shuffle } from '../utils/date';
import type { GameProps } from './types';

const CFG = [
  { options: 2, rounds: 5, picture: 'always' }, { options: 3, rounds: 6, picture: 'always' },
  { options: 3, rounds: 6, picture: 'after' }, { options: 4, rounds: 7, picture: 'after' }, { options: 4, rounds: 8, picture: 'after' }
] as const;

export default function SoundHunt({ level, ctx }: GameProps) {
  const cfg = CFG[level - 1];
  const pool = useMemo(() => {
    const p = ctx.pool.filter(l => SOUND_LETTERS.includes(l));
    return p.length >= 4 ? p : SOUND_LETTERS.slice(0, 8);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const targets = useMemo(() => {
    const f = focusLetters(ctx.data, ctx.age, Math.ceil(cfg.rounds / 2), 'S:', pool);
    return Array.from({ length: cfg.rounds }, (_, i) => f[i % f.length]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [round, setRound] = useState(0);
  const [wrongs, setWrongs] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const target = targets[round];
  const word = SOUND_WORD[target];
  const options = useMemo(() => shuffle([target, ...distractors(ctx.data, target, cfg.options - 1, level, pool, 'S:')]), [round]); // eslint-disable-line react-hooks/exhaustive-deps

  const play = () => speak(`Dengar baik-baik. ${word}. ${soundCue(target)}, ${soundCue(target)}, ${word}. Huruf apa?`);
  useEffect(() => {
    setWrongs([]); setSolved(false);
    ctx.setRepeat(play); ctx.question(); ctx.progress(round, cfg.rounds);
    play();
  }, [round]); // eslint-disable-line react-hooks/exhaustive-deps

  const tap = (l: string) => {
    if (solved || wrongs.includes(l)) return;
    if (l === target) {
      setSolved(true);
      ctx.answer('S:' + target, true, { hinted: wrongs.length > 0 });
      speak(word);
      setTimeout(() => { if (round + 1 >= cfg.rounds) ctx.finish(); else setRound(r => r + 1); }, 1500);
    } else {
      setWrongs(w => [...w, l]); sfx('wrong');
      ctx.answer('S:' + target, false, { chosen: l });
    }
  };
  const showPic = cfg.picture === 'always' || solved;

  return (
    <div className="g-sound">
      <button className="sound-orb" onClick={play} aria-label="Dengar bunyi semula">
        <div className={`sound-pic ${showPic ? 'show' : ''}`}>
          {showPic ? <ObjectArt word={word} size={120} /> : <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true"><path d="M30 40 h12 l18 -14 v48 l-18 -14 h-12z" fill="#fff" /><path d="M68 38 q8 12 0 24 M76 30 q14 20 0 40" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" /></svg>}
        </div>
        {showPic && <span className="sound-word">{solved ? word : ' '}</span>}
      </button>
      <div className={`letter-grid n${cfg.options}`}>
        {options.map(l => (
          <button key={l} className={`letter-bubble ${solved && l === target ? 'correct' : ''} ${wrongs.includes(l) ? 'wrong' : ''} ${wrongs.length >= 2 && l === target ? 'glow' : ''}`} onClick={() => tap(l)} aria-label={`Huruf ${l}`}>
            <span className="glyph">{l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
