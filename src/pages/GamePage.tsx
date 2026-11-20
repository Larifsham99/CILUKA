/** Rangka permainan: Mula → Main (betul/salah) → Selesai → Cuba lagi. Menyambungkan permainan kepada enjin pembelajaran dan ganjaran. */
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { sfx, speak, stopSpeech, unlockAudio } from '../audio/audio';
import { PipGuide } from '../components/PipGuide';
import { BadgeIcon } from '../components/BadgeIcon';
import { Btn, Confetti, IconBtn, ProgressDots, StarIcon, Stars } from '../components/ui';
import { LINES, pick } from '../data/dialog';
import type { GameId, GameResult, PipMood } from '../data/types';
import { GAMES, LEVEL_NAMES } from '../data/worlds';
import { GAME_COMPONENTS } from '../games/registry';
import type { GameCtx } from '../games/types';
import { store, useStore } from '../hooks/useStore';
import { focusLetters, introducedLetters, recordAnswer } from '../services/learning';
import { levelRecord, levelUnlock, MAX_LEVEL, recommendedLevel } from '../services/levels';
import { nextMissionStep } from '../services/missions';
import { badgeInfo, completeGame, type CompletionReport } from '../services/rewards';
import { go } from '../utils/router';

type Phase = 'intro' | 'playing' | 'done';

export function GamePage({ id, level: askedLevel, mission }: { id: GameId; level?: number; mission: boolean }) {
  const { data, profile, index } = useStore();
  const info = GAMES[id];
  const Game = GAME_COMPONENTS[id];
  const initialLevel = useMemo(() => {
    if (!data) return 1;
    if (askedLevel && levelUnlock(data, id, askedLevel, index.settings).unlocked) return askedLevel;
    return recommendedLevel(data, id, index.settings);
  }, [id, askedLevel]); // eslint-disable-line react-hooks/exhaustive-deps
  const [level, setLevel] = useState(initialLevel);
  const [phase, setPhase] = useState<Phase>('intro');
  const [playId, setPlayId] = useState(0);
  const [mood, setMood] = useState<PipMood>('idle');
  const [line, setLine] = useState(info.how);
  const [prog, setProg] = useState({ done: 0, total: 1 });
  const [report, setReport] = useState<CompletionReport | null>(null);
  const [confetti, setConfetti] = useState(0);
  const tally = useRef<GameResult>({ correct: 0, wrong: 0, hints: 0 });
  const startedAt = useRef(0);
  const qAt = useRef(0);
  const repeatFn = useRef<(() => void) | null>(null);
  const moodT = useRef<number>();

  useEffect(() => { setLevel(initialLevel); setPhase('intro'); setLine(info.how); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { stopSpeech(); clearTimeout(moodT.current); }, []);

  const react = useCallback((m: PipMood, text?: string, ms = 1600) => {
    setMood(m); if (text) setLine(text);
    clearTimeout(moodT.current);
    moodT.current = window.setTimeout(() => setMood('idle'), ms);
  }, []);

  const finish = useCallback(() => {
    if (!profile) return;
    const ms = Date.now() - startedAt.current;
    const rep = store.update(d => completeGame(d, id, level, tally.current, ms, mission))!;
    store.addSessionTime(ms);
    setReport(rep);
    setPhase('done');
    setConfetti(c => c + 1);
    sfx('win');
    const l = rep.stars === 3 ? LINES.complete3[0] : rep.stars === 2 ? LINES.complete2[0] : LINES.complete1[0];
    react('celebrate', l, 3000);
    speak(l);
  }, [id, level, mission, profile, react]);

  const ctx = useMemo<GameCtx | null>(() => {
    if (!data || !profile) return null;
    const pool = introducedLetters(data, profile.age);
    let focus = focusLetters(data, profile.age, 6);
    if (mission && data.daily) focus = [data.daily.focus, ...focus.filter(l => l !== data.daily!.focus)];
    return {
      data, age: profile.age, focus, pool, missionWord: mission ? data.daily?.word : undefined,
      answer: (key, correct, o = {}) => {
        const ms = Date.now() - qAt.current;
        if (correct) tally.current.correct++; else tally.current.wrong++;
        if (o.hinted) tally.current.hints++;
        if (!key.startsWith('M:')) store.update(d => { recordAnswer(d, key, correct, { game: id, ms, chosen: o.chosen, hinted: o.hinted }); });
        if (o.quiet) { if (correct) sfx('correct'); return; }
        if (correct) { sfx('correct'); const t = pick(o.hinted ? LINES.correctAfterTry : LINES.correct); react('happy', t); speak(t); }
        else { react('sad', pick(LINES.wrong)); }
      },
      question: () => { qAt.current = Date.now(); },
      hint: text => { tally.current.hints++; react('thinking', text ?? LINES.hint[0], 2200); if (text) speak(text); },
      say: (text, m = 'idle', s = false) => { react(m, text, 2000); if (s) speak(text); },
      progress: (done, total) => setProg({ done, total }),
      setRepeat: fn => { repeatFn.current = fn; },
      finish,
      saveWriting: (key, strokes, accuracy) => store.update(d => {
        const sample = { strokes, date: Date.now(), accuracy };
        const w = d.writing[key];
        if (!w) d.writing[key] = { first: sample, best: sample, latest: sample, count: 1 };
        else { w.latest = sample; w.count++; if (accuracy >= w.best.accuracy) w.best = sample; }
      })
    };
  }, [playId, profile?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || !profile || !ctx) return null;

  const start = (lvl = level) => {
    unlockAudio();
    setLevel(lvl);
    tally.current = { correct: 0, wrong: 0, hints: 0 };
    startedAt.current = Date.now(); qAt.current = Date.now();
    setProg({ done: 0, total: 1 });
    setReport(null);
    setPlayId(p => p + 1);
    setPhase('playing');
    react('excited', info.how, 2500);
  };

  const next = nextMissionStep(data);
  const lvlUnlocked = (l: number) => levelUnlock(data, id, l, index.settings);

  return (
    <div className="screen game-screen" style={{ ['--g' as string]: info.color }}>
      <header className="game-head">
        <IconBtn label="Kembali ke peta" onClick={() => go(mission ? '' : 'dunia/' + info.world)}><HomeIcon /></IconBtn>
        <div className="game-title">
          <strong>{info.name}</strong>
          <span>Tahap {level} · {LEVEL_NAMES[level - 1]}</span>
        </div>
        {phase === 'playing'
          ? <IconBtn label="Dengar semula" className="icon-sun" onClick={() => repeatFn.current?.()}><SpeakerIcon /></IconBtn>
          : <span className="icon-spacer" />}
      </header>
      {phase === 'playing' && <ProgressDots done={prog.done} total={prog.total} />}

      <main className="game-body">
        {phase === 'intro' && (
          <div className="intro-card">
            <div className="intro-badge" style={{ background: info.color }}><GameGlyph id={id} /></div>
            <h1>{info.name}</h1>
            <p className="intro-how">{info.how}</p>
            <div className="level-chips" role="group" aria-label="Pilih tahap">
              {Array.from({ length: MAX_LEVEL }, (_, k) => k + 1).map(l => {
                const u = lvlUnlocked(l);
                const rec = levelRecord(data, id, l);
                return (
                  <button key={l} className={`level-chip ${l === level ? 'on' : ''} ${u.unlocked ? '' : 'locked'}`} disabled={!u.unlocked}
                    onClick={() => { sfx('tap'); setLevel(l); }} aria-label={u.unlocked ? `Tahap ${l}` : `Tahap ${l} berkunci. ${u.reason}`}>
                    <b>{u.unlocked ? l : <LockIcon />}</b>
                    <Stars n={rec.bestStars} size={11} />
                  </button>
                );
              })}
            </div>
            {!lvlUnlocked(Math.min(5, level + 1)).unlocked && level < 5 && <p className="intro-note">{lvlUnlocked(level + 1).reason} untuk buka Tahap {level + 1}.</p>}
            <Btn size="xl" variant="sun" onClick={() => start()} className="play-btn"><PlayIcon /> Mula</Btn>
          </div>
        )}

        {phase === 'playing' && (
          <Suspense fallback={<div className="loading-inline">Memuatkan…</div>}>
            <Game key={playId} level={level} ctx={ctx} />
          </Suspense>
        )}

        {phase === 'done' && report && (
          <div className="result-card">
            <h1>Hebat!</h1>
            <div className="result-stars"><Stars n={report.stars} size={54} /></div>
            <div className="result-chips">
              <span className="chip chip-xp">+{report.xpGained} XP</span>
              {report.starsGained > 0 && <span className="chip chip-star"><StarIcon size={16} /> +{report.starsGained} bintang baharu</span>}
              {report.levelUp && <span className="chip chip-lvl">Naik tahap pengembara!</span>}
            </div>
            {report.nextLevelUnlocked && <p className="result-unlock">Tahap {level + 1} dibuka!</p>}
            {report.newBadges.length > 0 && (
              <div className="result-badges">
                {report.newBadges.map(b => { const bi = badgeInfo(b); return <div key={b} className="result-badge pop-in"><BadgeIcon icon={bi.icon} color={bi.color} size={54} /><span>{bi.name}</span></div>; })}
              </div>
            )}
            {report.missionAllDone && <p className="result-unlock">Misi hari ini siap! Peti Misteri sedia dibuka.</p>}
            <div className="result-actions">
              {mission && report.missionAllDone && <Btn size="lg" variant="purple" onClick={() => go('koleksi?peti=1')}>Buka Peti Misteri</Btn>}
              {mission && !report.missionAllDone && next && <Btn size="lg" variant="sun" onClick={() => go(`main/${next.game}?tahap=${next.level}&misi=1`)}>Misi Seterusnya</Btn>}
              {!mission && report.nextLevelUnlocked && <Btn size="lg" variant="sun" onClick={() => start(level + 1)}>Tahap {level + 1}</Btn>}
              <Btn size="lg" variant={mission || report.nextLevelUnlocked ? 'white' : 'sun'} onClick={() => start(level)}>Main Lagi</Btn>
              <Btn size="md" variant="ghost" onClick={() => go(mission ? '' : 'dunia/' + info.world)}>Ke Peta</Btn>
            </div>
          </div>
        )}
      </main>
      <PipGuide mood={mood} text={line} className="game-pip" onPip={() => react('happy', pick(LINES.tickle))} />
      <Confetti run={confetti} />
    </div>
  );
}

export const HomeIcon = () => <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" fill="currentColor" /></svg>;
export const SpeakerIcon = () => <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" /><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>;
export const PlayIcon = () => <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor" /></svg>;
export const LockIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm2 0h6V7a3 3 0 0 0-6 0z" fill="currentColor" /></svg>;

/** Ikon setiap permainan (SVG). */
export function GameGlyph({ id, size = 64 }: { id: GameId; size?: number }) {
  const t = (s: string, fs = 46) => <text x="50" y="66" textAnchor="middle" fontSize={fs} fontWeight="800" fill="#fff" fontFamily="Andika, sans-serif">{s}</text>;
  const g: Record<GameId, JSX.Element> = {
    'letter-hunt': <g><circle cx="44" cy="44" r="24" fill="none" stroke="#fff" strokeWidth="8" /><path d="M62 62 l18 18" stroke="#fff" strokeWidth="10" strokeLinecap="round" /><text x="44" y="56" textAnchor="middle" fontSize="30" fontWeight="800" fill="#fff" fontFamily="Andika, sans-serif">a</text></g>,
    'letter-match': <g>{t('Aa', 44)}</g>,
    'letter-balloon': <g><ellipse cx="50" cy="40" rx="24" ry="28" fill="#fff" /><path d="M50 68 q-4 12 4 22" stroke="#fff" strokeWidth="3" fill="none" /><text x="50" y="52" textAnchor="middle" fontSize="30" fontWeight="800" fill="#FFC93C" fontFamily="Andika, sans-serif">b</text></g>,
    'magic-tracing': <g><path d="M20 76 q14 -50 30 -20 q16 30 30 -24" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="2 12" /><circle cx="20" cy="76" r="8" fill="#9B6BFF" stroke="#fff" strokeWidth="3" /></g>,
    'sound-hunt': <g><path d="M22 40 h12 l18 -14 v48 l-18 -14 h-12z" fill="#fff" /><path d="M62 38 q8 12 0 24 M72 30 q14 20 0 40" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" /></g>,
    'syllable-puzzle': <g><rect x="10" y="32" width="36" height="36" rx="8" fill="#fff" /><rect x="54" y="32" width="36" height="36" rx="8" fill="#fff" opacity=".8" /><text x="28" y="57" textAnchor="middle" fontSize="18" fontWeight="800" fill="#FF9F6B" fontFamily="Andika, sans-serif">BU</text><text x="72" y="57" textAnchor="middle" fontSize="18" fontWeight="800" fill="#FF9F6B" fontFamily="Andika, sans-serif">KU</text></g>,
    'missing-letter': <g>{t('B_LA', 30)}</g>,
    'word-builder': <g><ellipse cx="50" cy="52" rx="26" ry="32" fill="#fff" /><path d="M30 56 l8 -6 l8 6 l8 -6 l8 6 l8 -6" stroke="#2EC4B6" strokeWidth="4" fill="none" /></g>,
    'object-match': <g><rect x="16" y="22" width="68" height="56" rx="10" fill="#fff" /><circle cx="38" cy="42" r="8" fill="#9B6BFF" /><path d="M22 72 l20 -18 l14 12 l10 -8 l14 14z" fill="#9B6BFF" /></g>,
    'memory-letter': <g><rect x="16" y="24" width="30" height="44" rx="6" fill="#fff" transform="rotate(-10 31 46)" /><rect x="52" y="26" width="30" height="44" rx="6" fill="#fff" opacity=".85" transform="rotate(8 67 48)" /><text x="67" y="56" textAnchor="middle" fontSize="22" fontWeight="800" fill="#7CC43F" fontFamily="Baloo 2, sans-serif">?</text></g>,
    'star-challenge': <g><path d="M50 12 l11 23 25 3 -18 17 5 25 -23 -12 -23 12 5 -25 -18 -17 25 -3z" fill="#fff" /></g>
  };
  return <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">{g[id]}</svg>;
}
