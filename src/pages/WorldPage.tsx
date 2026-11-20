/** Halaman pulau: senarai permainan dengan tahap dan bintang. Satu ketikan = terus ke permainan. */
import { useEffect } from 'react';
import { speak } from '../audio/audio';
import { Pip } from '../characters/Pip';
import { IconBtn, Stars, StarIcon } from '../components/ui';
import type { WorldId } from '../data/types';
import { GAMES, WORLD_MAP } from '../data/worlds';
import { useStore } from '../hooks/useStore';
import { gameStars, levelRecord, MAX_LEVEL, recommendedLevel, worldUnlock } from '../services/levels';
import { go } from '../utils/router';
import { IslandArt } from '../worlds/IslandArt';
import { GameGlyph, HomeIcon, PlayIcon } from './GamePage';

export function WorldPage({ id }: { id: string }) {
  const { data, profile, index } = useStore();
  const w = WORLD_MAP[id as WorldId];
  useEffect(() => { if (w) speak(`Selamat datang ke ${w.name}! Pilih permainan.`); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!data || !profile) return null;
  if (!w || !worldUnlock(data, profile.age, w.id, index.settings).unlocked) {
    return <div className="screen center-msg"><p>Pulau ini belum dibuka.</p><button className="btn btn-sun btn-lg" onClick={() => go('')}>Ke Peta</button></div>;
  }
  return (
    <div className="screen world" style={{ background: `linear-gradient(${w.sky[0]}, ${w.sky[1]})` }}>
      <header className="world-head">
        <IconBtn label="Kembali ke peta" onClick={() => go('')}><HomeIcon /></IconBtn>
        <h1>{w.name}</h1>
        <span className="icon-spacer" />
      </header>
      <div className="world-hero">
        <div className="world-hero-art"><IslandArt world={w.id} color={w.ground} /></div>
        <Pip mood="excited" size={74} className="world-pip" />
      </div>
      <div className="game-list">
        {w.games.map(g => {
          const info = GAMES[g];
          const rec = recommendedLevel(data, g, index.settings);
          return (
            <button key={g} className="game-card" style={{ ['--g' as string]: info.color }} onClick={() => go(`main/${g}?tahap=${rec}`)} aria-label={`${info.name}, tahap ${rec}`}>
              <span className="game-card-icon"><GameGlyph id={g} size={58} /></span>
              <span className="game-card-text">
                <strong>{info.name}</strong>
                <span className="game-card-levels">
                  {Array.from({ length: MAX_LEVEL }, (_, k) => {
                    const r = levelRecord(data, g, k + 1);
                    return <i key={k} className={`lv ${r.bestStars ? 'done' : ''} ${k + 1 === rec ? 'now' : ''}`}>{k + 1}</i>;
                  })}
                </span>
                <span className="game-card-stars"><StarIcon size={15} /> {gameStars(data, g)} / {MAX_LEVEL * 3}</span>
              </span>
              <span className="game-card-play"><PlayIcon /></span>
            </button>
          );
        })}
      </div>
      <p className="world-tip"><Stars n={3} size={14} /> Dapat 2 bintang untuk buka tahap seterusnya.</p>
    </div>
  );
}
