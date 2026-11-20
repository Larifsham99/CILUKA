/** Pilih / cipta profil anak. Profil pertama tanpa pintu; profil tambahan memerlukan pengesahan ibu bapa. */
import { useState } from 'react';
import { speak } from '../audio/audio';
import { Avatar, AVATARS } from '../characters/Avatar';
import { Pip } from '../characters/Pip';
import { Btn, ParentGate } from '../components/ui';
import type { Age, AvatarId } from '../data/types';
import { store, useStore } from '../hooks/useStore';
import { go } from '../utils/router';

export function ProfilesPage() {
  const { index } = useStore();
  const none = index.profiles.length === 0;
  const [creating, setCreating] = useState(none);
  const [gate, setGate] = useState(false);

  if (creating) return <CreateProfile first={none} onCancel={none ? undefined : () => setCreating(false)} />;
  return (
    <div className="screen profiles">
      <Pip mood="excited" size={96} />
      <h1>Siapa nak main?</h1>
      <div className="profile-grid">
        {index.profiles.map(p => (
          <button key={p.id} className={`profile-tile ${p.id === index.activeId ? 'on' : ''}`} onClick={() => { store.switchProfile(p.id); speak(`Hai ${p.name}!`); go('', true); }}>
            <Avatar id={p.avatar} size={84} />
            <strong>{p.name}</strong>
            <span>{p.age} tahun</span>
          </button>
        ))}
        {index.profiles.length < 6 && (
          <button className="profile-tile add" onClick={() => setGate(true)} aria-label="Tambah profil (ibu bapa)">
            <span className="plus-big">+</span><strong>Tambah</strong><span>Ibu bapa</span>
          </button>
        )}
      </div>
      <ParentGate open={gate} onClose={() => setGate(false)} onPass={() => { setGate(false); setCreating(true); }} reason="Ibu bapa: sahkan untuk menambah profil anak." />
    </div>
  );
}

export function CreateProfile({ first, onCancel, onDone }: { first: boolean; onCancel?: () => void; onDone?: () => void }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<AvatarId>('kucing');
  const [age, setAge] = useState<Age>(4);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = store.createProfile(name, avatar, age);
    speak(`Hai ${p.name}! Jom mengembara!`);
    if (onDone) onDone(); else go('', true);
  };
  return (
    <div className="screen create-profile">
      <form className="create-card" onSubmit={submit}>
        {first && <div className="create-hello"><Pip mood="happy" size={84} /><p>Hai! Aku Pip. Siapa nama kawan baharu aku?</p></div>}
        <h1>{first ? 'Profil Anak' : 'Profil Baharu'}</h1>
        <label className="field">
          <span>Nama panggilan</span>
          <input id="profile-name" value={name} onChange={e => setName(e.target.value)} maxLength={20} placeholder="cth. Aisyah" autoComplete="off" required />
        </label>
        <fieldset className="field">
          <legend>Pilih avatar</legend>
          <div className="avatar-pick">
            {AVATARS.map(a => (
              <button type="button" key={a.id} className={avatar === a.id ? 'on' : ''} onClick={() => setAvatar(a.id)} aria-label={a.name} aria-pressed={avatar === a.id}>
                <Avatar id={a.id} size={58} />
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="field">
          <legend>Umur</legend>
          <div className="age-pick">
            {([3, 4, 5, 6] as Age[]).map(a => <button type="button" key={a} className={age === a ? 'on' : ''} onClick={() => setAge(a)} aria-pressed={age === a}>{a}<small>tahun</small></button>)}
          </div>
        </fieldset>
        <p className="privacy-note">Hanya nama panggilan disimpan, dalam telefon ini sahaja.</p>
        <div className="create-actions">
          {onCancel && <Btn variant="ghost" onClick={onCancel}>Batal</Btn>}
          <Btn type="submit" variant="sun" size="lg" disabled={!name.trim()}>Jom Main!</Btn>
        </div>
      </form>
    </div>
  );
}
