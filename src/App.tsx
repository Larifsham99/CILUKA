import { Component, useEffect, useState, type ReactNode } from 'react';
import { speak } from './audio/audio';
import { Pip } from './characters/Pip';
import { Btn, HoldButton, ParentGate } from './components/ui';
import { LINES } from './data/dialog';
import type { GameId } from './data/types';
import { GAMES } from './data/worlds';
import { store, useStore } from './hooks/useStore';
import { CollectionPage } from './pages/CollectionPage';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { ParentPage } from './pages/ParentPage';
import { ProfilesPage } from './pages/ProfilesPage';
import { WorldPage } from './pages/WorldPage';
import { recoveredFromCorruption } from './storage/storage';
import { go, useRoute } from './utils/router';

export default function App() {
  const route = useRoute();
  const { index, resting, data } = useStore();
  const noProfile = index.profiles.length === 0;

  useEffect(() => { if (noProfile && route.name !== 'profiles') go('profil', true); }, [noProfile, route.name]);

  if (resting && route.name !== 'parent' && route.name !== 'game') return <RestScreen offlineLetter={data?.daily?.focus ?? 'b'} />;

  let page: ReactNode;
  switch (route.name) {
    case 'profiles': page = <ProfilesPage />; break;
    case 'world': page = <WorldPage id={route.id} />; break;
    case 'game': page = route.id in GAMES ? <GamePage key={route.id + (route.level ?? '') + route.mission} id={route.id as GameId} level={route.level} mission={route.mission} /> : <HomePage />; break;
    case 'collection': page = <CollectionPage />; break;
    case 'parent': page = <ParentPage />; break;
    default: page = noProfile ? <ProfilesPage /> : <HomePage />;
  }
  return (
    <ErrorBoundary>
      {recoveredFromCorruption.length > 0 && <CorruptionNotice />}
      {page}
    </ErrorBoundary>
  );
}

function RestScreen({ offlineLetter }: { offlineLetter: string }) {
  const [gate, setGate] = useState(false);
  useEffect(() => { speak(LINES.rest[0]); }, []);
  return (
    <div className="screen rest">
      <div className="rest-stars" aria-hidden="true" />
      <Pip mood="sleep" size={150} />
      <h1>Hebat hari ini!</h1>
      <p>Jom berehat. Esok kita sambung pengembaraan lagi!</p>
      <div className="rest-mission"><b>Misi Rumah:</b> Cari 3 benda di rumah yang bermula dengan huruf <span className="glyph">{offlineLetter.toUpperCase()}</span>.</div>
      <HoldButton label="Ibu bapa: sentuh dan tahan untuk sambung" className="rest-continue" onHold={() => setGate(true)} ms={1500}>Ibu bapa: sentuh &amp; tahan untuk sambung</HoldButton>
      <ParentGate open={gate} onClose={() => setGate(false)} onPass={() => { setGate(false); store.endRest(); }} reason="Benarkan anak bermain lagi?" />
    </div>
  );
}

function CorruptionNotice() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return <div className="toast" role="alert">Sebahagian data rosak dan telah dipulihkan semula. <button onClick={() => setOpen(false)}>OK</button></div>;
}

class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    if (this.state.err) {
      return (
        <div className="screen center-msg">
          <Pip mood="sad" size={110} />
          <h1>Alamak! Ada masalah kecil.</h1>
          <p>Kemajuan anak sudah disimpan. Tekan butang di bawah untuk kembali.</p>
          <Btn size="lg" onClick={() => { this.setState({ err: null }); go('', true); }}>Kembali ke Peta</Btn>
        </div>
      );
    }
    return this.props.children;
  }
}
