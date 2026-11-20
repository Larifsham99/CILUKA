/** CILUKA World — peta dunia pengembaraan (skrin utama). */
import { useEffect, useMemo, useState } from 'react';
import { sfx, speak } from '../audio/audio';
import { Avatar } from '../characters/Avatar';
import { PipGuide } from '../components/PipGuide';
import { Btn, HoldButton, ParentGate, StarIcon } from '../components/ui';
import { LINES, pick } from '../data/dialog';
import type { PipMood, WorldId } from '../data/types';
import { GAMES, WORLDS } from '../data/worlds';
import { store, useStore } from '../hooks/useStore';
import { letterName } from '../audio/audio';
import { totalStars, worldStars, worldUnlock } from '../services/levels';
import { chestAvailable, missionDone, nextMissionStep } from '../services/missions';
import { playerLevel } from '../services/rewards';
import { hourKL } from '../utils/date';
import { go } from '../utils/router';
import { IslandArt } from '../worlds/IslandArt';
import { GameGlyph, LockIcon, PlayIcon } from './GamePage';

/** Kedudukan pulau di peta (peratus) — laluan berliku dari atas ke bawah. */
const POS: Record<WorldId, [number, number]> = {
  'letter-land': [27, 4], 'race-track': [73, 13], 'scribble-valley': [27, 23], 'memory-jungle': [73, 33], 'sound-forest': [27, 43],
  'syllable-village': [73, 53], 'spelling-station': [27, 63], 'magic-word-island': [73, 73], 'star-castle': [30, 84]
};

export function HomePage() {
  const { data, profile, index } = useStore();
  const [gate, setGate] = useState(false);
  const [mood, setMood] = useState<PipMood>('happy');
  const [line, setLine] = useState('');
  const hour = hourKL();
  const sky = hour >= 19 || hour < 6 ? 'night' : hour >= 17 ? 'dusk' : 'day';

  useEffect(() => { store.touchOpen(); }, []);
  const missionText = useMemo(() => {
    if (!data?.daily) return '';
    if (missionDone(data)) return chestAvailable(data) ? 'Misi siap! Jom buka Peti Misteri!' : LINES.missionDone[0];
    return `Hari ini kita cari huruf ${data.daily.focus.toUpperCase()}!`;
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const first = data.activity.length === 0;
    const back = data.lastOpen && Date.now() - data.lastOpen > 3 * 86400000;
    const greet = first ? LINES.welcomeFirst[0] : back ? LINES.welcomeBack[0] : sky === 'night' ? LINES.welcomeNight[0] : pick(hour < 12 ? LINES.welcomeMorning : LINES.welcomeDay);
    setLine(greet + ' ' + missionText);
    const t = setTimeout(() => setMood('idle'), 2500);
    const t2 = setTimeout(() => setLine(''), 9000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || !profile) return null;
  const pl = playerLevel(data.xp);
  const stars = totalStars(data);
  const step = nextMissionStep(data);
  const chest = chestAvailable(data);
  const done = missionDone(data);

  const playMission = () => {
    if (chest) { go('koleksi?peti=1'); return; }
    if (step) go(`main/${step.game}?tahap=${step.level}&misi=1`);
    else { setMood('celebrate'); setLine('Misi hari ini dah siap! Jom main di mana-mana pulau.'); speak('Misi hari ini dah siap! Jom main di mana-mana pulau.'); }
  };

  const openWorld = (id: WorldId) => {
    const u = worldUnlock(data, profile.age, id, index.settings);
    if (!u.unlocked) {
      sfx('wrong');
      const w = WORLDS.find(x => x.id === id)!;
      const t = `${w.name} masih berkunci. ${w.unlockText}: ${u.have}/${u.need}.`;
      setMood('thinking'); setLine(t); speak(t);
      return;
    }
    sfx('unlock');
    const w = WORLDS.find(x => x.id === id)!;
    if (w.games.length === 1) go(`main/${w.games[0]}`); else go('dunia/' + id);
  };

  return (
    <div className={`screen home sky-${sky}`}>
      <header className="home-top">
        <button className="me" onClick={() => go('profil')} aria-label="Tukar profil">
          <Avatar id={profile.avatar} size={52} accessory={data.equipped} />
          <span className="me-text"><strong>{profile.name}</strong><span className="me-level">Tahap {pl.level} · {pl.name}</span>
            <span className="xp-bar" aria-label={`XP ${data.xp}`}><i style={{ width: `${Math.round(pl.progress * 100)}%` }} /></span></span>
        </button>
        <div className="star-count" aria-label={`${stars} bintang`}><StarIcon size={24} /><b>{stars}</b></div>
        <button className="collection-btn" onClick={() => go('koleksi')} aria-label="Koleksi ganjaran">
          <ChestIcon size={34} />{chest && <b>!</b>}
        </button>
        <HoldButton label="Ruang ibu bapa (sentuh dan tahan)" className="parent-lock" onHold={() => setGate(true)} onTap={() => { setMood('thinking'); setLine('Ibu bapa: tekan dan tahan kunci ini selama 2 saat.'); }}><LockIcon /></HoldButton>
      </header>

      <div className="map-scroll">
        <div className="map">
          <div className="sky-deco" aria-hidden="true"><i className="cloud c1" /><i className="cloud c2" /><i className="cloud c3" /><i className="sunmoon" /></div>
          <svg className="map-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={WORLDS.map((w, i) => { const [x, y] = POS[w.id]; return `${i ? 'L' : 'M'}${x} ${y + 5}`; }).join(' ')} fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="1.4" strokeDasharray="0.1 2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 10 }} />
          </svg>
          {WORLDS.map(w => {
            const u = worldUnlock(data, profile.age, w.id, index.settings);
            const ws = worldStars(data, w.id);
            const isMission = !!step && GAMES[step.game].world === w.id;
            const [x, y] = POS[w.id];
            return (
              <button key={w.id} className={`island ${u.unlocked ? 'open' : 'locked'} ${isMission ? 'mission' : ''}`} style={{ left: x + '%', top: y + '%' }} onClick={() => openWorld(w.id)}
                aria-label={u.unlocked ? `${w.name}. ${ws.have} bintang.` : `${w.name} berkunci. ${w.unlockText}.`}>
                <IslandArt world={w.id} color={w.ground} locked={!u.unlocked} />
                {!u.unlocked && <span className="island-lock"><span className="lock-cloud" /><span className="lock-badge"><LockIcon /> {u.have}/{u.need}</span></span>}
                <span className="island-name">{w.name}</span>
                {u.unlocked && ws.have > 0 && <span className="island-stars"><StarIcon size={13} />{ws.have}</span>}
                {isMission && <span className="mission-flag" aria-hidden="true">!</span>}
              </button>
            );
          })}
        </div>
      </div>

      <section className="mission-dock" aria-label="Misi hari ini">
        <PipGuide mood={mood} text={line} size={78} className="home-pip" onPip={() => { const t = pick(LINES.tickle); setMood('happy'); setLine(t); speak(t); }} />
        <div className="mission-card">
          <div className="mission-info">
          <div className="mission-head">
            <span className="mission-label">Misi Hari Ini</span>
            <span className="mission-focus glyph" aria-label={`Huruf ${letterName(data.daily?.focus ?? 'a')}`}>{data.daily?.focus.toUpperCase()}{data.daily?.focus}</span>
          </div>
          <div className="mission-steps">
            {data.daily?.steps.map((s, i) => (
              <span key={i} className={`mstep ${s.done ? 'done' : step === s ? 'now' : ''}`} style={{ ['--g' as string]: GAMES[s.game].color }} title={GAMES[s.game].name}>
                <GameGlyph id={s.game} size={30} />{s.done && <i className="tick">✓</i>}
              </span>
            ))}
          </div>
          </div>
          <Btn size="lg" variant={chest ? 'purple' : done ? 'lime' : 'sun'} className={`mission-play ${data.activity.length === 0 ? 'first-hint' : ''}`} onClick={playMission}>
            {chest ? <><ChestIcon /> Buka Peti</> : done ? 'Siap!' : <><PlayIcon /> Main</>}
          </Btn>
        </div>
      </section>

      <ParentGate open={gate} onClose={() => setGate(false)} onPass={() => { setGate(false); sessionStorage.setItem('ciluka-parent', '1'); go('ibubapa'); }} reason="Ruang ini untuk ibu bapa sahaja." />
    </div>
  );
}

export const ChestIcon = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
    <path d="M8 28 q0 -16 24 -16 q24 0 24 16z" fill="#FF9F6B" stroke="#3B2A4D" strokeWidth="3" />
    <rect x="8" y="28" width="48" height="26" rx="4" fill="#FFC93C" stroke="#3B2A4D" strokeWidth="3" />
    <rect x="27" y="24" width="10" height="14" rx="2" fill="#9B6BFF" stroke="#3B2A4D" strokeWidth="2.5" />
  </svg>
);
