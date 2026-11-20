/** Koleksi ganjaran: lencana & trofi, pelekat, aksesori avatar, Peti Misteri. */
import { useState } from 'react';
import { sfx, speak } from '../audio/audio';
import { Avatar } from '../characters/Avatar';
import { Pip } from '../characters/Pip';
import { BadgeIcon } from '../components/BadgeIcon';
import { ObjectArt } from '../components/ObjectArt';
import { Btn, Confetti, IconBtn } from '../components/ui';
import { ACCESSORIES, BADGES, STICKERS, TROPHY_WORLDS } from '../data/rewards';
import { store, useStore } from '../hooks/useStore';
import { chestAvailable, missionDone } from '../services/missions';
import { badgeInfo, openChest } from '../services/rewards';
import { go } from '../utils/router';
import { HomeIcon } from './GamePage';
import { ChestIcon } from './HomePage';

type Tab = 'lencana' | 'pelekat' | 'aksesori';

export function CollectionPage() {
  const { data, profile } = useStore();
  const [tab, setTab] = useState<Tab>('lencana');
  const [prize, setPrize] = useState<string | null>(null);
  const [opening, setOpening] = useState(false);
  const [confetti, setConfetti] = useState(0);
  if (!data || !profile) return null;
  const chest = chestAvailable(data);

  const open = () => {
    setOpening(true); sfx('unlock');
    setTimeout(() => {
      const p = store.update(d => openChest(d)) ?? null;
      setPrize(p); setOpening(false); setConfetti(c => c + 1); sfx('win');
      if (p && p !== 'semua') speak(`Wah! Kamu dapat pelekat ${p}!`);
    }, 1200);
  };

  return (
    <div className="screen collection">
      <header className="world-head">
        <IconBtn label="Kembali ke peta" onClick={() => go('')}><HomeIcon /></IconBtn>
        <h1>Koleksi</h1>
        <span className="icon-spacer" />
      </header>

      <section className={`chest-panel ${chest ? 'ready' : ''}`}>
        {prize ? (
          <div className="chest-prize pop-in">
            {prize === 'semua' ? <Pip mood="celebrate" size={90} /> : <ObjectArt word={prize} size={110} />}
            <p>{prize === 'semua' ? 'Semua pelekat sudah dikumpul! +15 XP' : `Pelekat baharu: ${prize.toUpperCase()}! +15 XP`}</p>
          </div>
        ) : chest ? (
          <>
            <button className={`chest-big ${opening ? 'opening' : ''}`} onClick={open} disabled={opening} aria-label="Buka Peti Misteri"><ChestIcon size={110} /></button>
            <Btn variant="purple" size="lg" onClick={open} disabled={opening}>{opening ? 'Membuka…' : 'Buka Peti Misteri!'}</Btn>
          </>
        ) : (
          <div className="chest-wait">
            <ChestIcon size={64} />
            <p>{missionDone(data) ? 'Peti hari ini sudah dibuka. Datang lagi esok!' : 'Siapkan Misi Hari Ini untuk buka Peti Misteri.'}</p>
          </div>
        )}
      </section>

      <div className="tabs" role="tablist">
        {(['lencana', 'pelekat', 'aksesori'] as Tab[]).map(t => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
            {t === 'lencana' ? 'Lencana' : t === 'pelekat' ? 'Pelekat' : 'Aksesori'}
          </button>
        ))}
      </div>

      {tab === 'lencana' && (
        <div className="badge-grid">
          {[...BADGES.map(b => b.id), ...TROPHY_WORLDS.map(w => 'trophy:' + w)].map(id => {
            const b = badgeInfo(id); const has = !!data.badges[id];
            return (
              <div key={id} className={`badge-cell ${has ? '' : 'locked'}`}>
                <BadgeIcon icon={b.icon} color={b.color} size={64} locked={!has} />
                <strong>{b.name}</strong>
                <span>{b.desc}</span>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'pelekat' && (
        <>
          <p className="tab-note">{data.collectibles.length} / {STICKERS.length} pelekat</p>
          <div className="sticker-grid">
            {STICKERS.map(s => {
              const has = data.collectibles.includes(s);
              return <div key={s} className={`sticker ${has ? '' : 'locked'}`}>{has ? <><ObjectArt word={s} size={64} /><span>{s}</span></> : <span className="q">?</span>}</div>;
            })}
          </div>
        </>
      )}

      {tab === 'aksesori' && (
        <div className="acc-panel">
          <div className="acc-preview"><Avatar id={profile.avatar} size={120} accessory={data.equipped} /></div>
          <div className="acc-grid">
            <button className={`acc-item ${!data.equipped ? 'on' : ''}`} onClick={() => store.update(d => { d.equipped = null; })}>
              <Avatar id={profile.avatar} size={54} /><span>Tiada</span>
            </button>
            {ACCESSORIES.map(a => {
              const has = data.accessories.includes(a.id);
              return (
                <button key={a.id} className={`acc-item ${data.equipped === a.id ? 'on' : ''} ${has ? '' : 'locked'}`} disabled={!has}
                  onClick={() => { sfx('tap'); store.update(d => { d.equipped = a.id; }); }} aria-label={has ? a.name : `${a.name} berkunci: ${a.how}`}>
                  <Avatar id={profile.avatar} size={54} accessory={a.id} />
                  <span>{has ? a.name : a.how}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <Confetti run={confetti} />
    </div>
  );
}
