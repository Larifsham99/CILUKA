/** Ruang Ibu Bapa: Laporan · Portfolio · Profil · Tetapan. Dilindungi pintu ibu bapa. */
import { useMemo, useRef, useState } from 'react';
import { malayVoiceInstalled, speak, voiceAvailable } from '../audio/audio';
import { Avatar, AVATARS } from '../characters/Avatar';
import { BadgeIcon } from '../components/BadgeIcon';
import { ObjectArt } from '../components/ObjectArt';
import { Btn, IconBtn, Modal, ParentGate } from '../components/ui';
import { ALPHABET, LETTER_ORDER, SOUND_LETTERS } from '../data/letters';
import type { Age, AvatarId, ProfileData, SkillStatus } from '../data/types';
import { GAMES } from '../data/worlds';
import { WORDS } from '../data/words';
import { WritingSvg } from '../games/TracingBoard';
import { store, useStore } from '../hooks/useStore';
import { areaProgress, confusedWith, itemStatus, STATUS_LABEL } from '../services/learning';
import { totalStars } from '../services/levels';
import { badgeInfo, playerLevel } from '../services/rewards';
import { storageAvailable } from '../storage/storage';
import { fmtDate, lastNDays } from '../utils/date';
import { go } from '../utils/router';
import { installAvailable, promptInstall } from '../utils/install';
import { HomeIcon } from './GamePage';
import { CreateProfile } from './ProfilesPage';

type Tab = 'laporan' | 'portfolio' | 'profil' | 'tetapan';

const ok = () => { try { return sessionStorage.getItem('ciluka-parent') === '1'; } catch { return false; } };

export function ParentPage() {
  const [passed, setPassed] = useState(ok);
  const [tab, setTab] = useState<Tab>('laporan');
  const { data, profile } = useStore();
  if (!passed) return <div className="screen parent-area"><ParentGate open onClose={() => go('')} onPass={() => { try { sessionStorage.setItem('ciluka-parent', '1'); } catch { /* abaikan */ } setPassed(true); }} reason="Ruang ini untuk ibu bapa sahaja." /></div>;
  return (
    <div className="screen parent-area">
      <header className="p-head">
        <IconBtn label="Kembali kepada anak" onClick={() => { try { sessionStorage.removeItem('ciluka-parent'); } catch { /* abaikan */ } go(''); }}><HomeIcon /></IconBtn>
        <h1>Ruang Ibu Bapa</h1>
        {profile && <span className="p-who"><Avatar id={profile.avatar} size={34} />{profile.name}</span>}
      </header>
      <nav className="p-tabs" role="tablist">
        {(['laporan', 'portfolio', 'profil', 'tetapan'] as Tab[]).map(t => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</button>
        ))}
      </nav>
      <main className="p-body">
        {tab === 'laporan' && (data && profile ? <Report d={data} name={profile.name} /> : <Empty />)}
        {tab === 'portfolio' && (data && profile ? <Portfolio d={data} name={profile.name} /> : <Empty />)}
        {tab === 'profil' && <Profiles />}
        {tab === 'tetapan' && <SettingsPanel />}
      </main>
    </div>
  );
}

const Empty = () => <div className="p-card"><p>Tiada profil anak lagi. Tambah profil dalam tab Profil.</p></div>;

const STATUS_CLS: Record<SkillStatus, string> = { belum: 's0', belajar: 's1', 'perlu-latihan': 'sw', hampir: 's2', kuasai: 's3' };

/* ============================== LAPORAN ============================== */
function Report({ d, name }: { d: ProfileData; name: string }) {
  const L = areaProgress(d, 'L:', ALPHABET);
  const S = areaProgress(d, 'S:', SOUND_LETTERS);
  const writingKeys = Object.keys(d.writing).filter(k => !k.startsWith('shape:'));
  const W = areaProgress(d, 'W:', [...ALPHABET, ...ALPHABET.map(a => a.toUpperCase())]);
  const SP = areaProgress(d, 'SP:', WORDS.map(w => w.word));
  const SY = areaProgress(d, 'SY:', WORDS.map(w => w.word));
  const V = areaProgress(d, 'V:', WORDS.map(w => w.word));
  const totalGames = d.activity.length + Math.max(0, Object.values(d.days).reduce((a, x) => a + x.games, 0) - d.activity.length);
  const days = lastNDays(7);
  const maxG = Math.max(1, ...days.map(x => d.days[x]?.correct ?? 0) , ...days.map(x => d.days[x]?.wrong ?? 0));
  const weakLetters = LETTER_ORDER.filter(l => itemStatus(d, 'L:' + l) === 'perlu-latihan' || confusedWith(d, 'L:' + l).length);
  const confPairs = LETTER_ORDER.flatMap(l => confusedWith(d, 'L:' + l).map(c => `${l.toUpperCase()}–${c.toUpperCase()}`));
  const weakSounds = SOUND_LETTERS.filter(l => itemStatus(d, 'S:' + l) === 'perlu-latihan');
  const pl = playerLevel(d.xp);
  const enough = L.attempts >= 15;

  const suggestion = (() => {
    if (!d.activity.length) return `Mulakan dengan Misi Hari Ini bersama ${name}.`;
    if (confPairs.length) return `${name} kadang-kadang tertukar ${confPairs.slice(0, 2).join(' dan ')}. Main "Padan Huruf" dan "Cari Huruf" — Pip akan memasukkan huruf ini secara automatik.`;
    if (weakLetters.length) return `Beri latihan huruf ${weakLetters.slice(0, 3).map(x => x.toUpperCase()).join(', ')}. Cuba "Tulis Ajaib" untuk huruf ini.`;
    if (writingKeys.length < 3) return `Cuba "Tulis Ajaib" — ${name} belum banyak berlatih menulis.`;
    if (d.words.length < 3) return `Cuba "Bina Kata" di Stesen Ejaan untuk mula mengeja perkataan.`;
    return `${name} berkembang dengan baik! Teruskan Misi Hari Ini setiap hari selama 10–15 minit.`;
  })();

  const area = (label: string, a: ReturnType<typeof areaProgress>, total: number, unit: string) => (
    <div className="area-row">
      <div className="area-top"><strong>{label}</strong><span>{a.attempts < 8 ? 'Data belum cukup' : `${a.strong.length} ${unit} hampir/dikuasai`}</span></div>
      <div className="area-bar" aria-hidden="true">
        <i className="b-mastered" style={{ width: `${a.mastered.length / total * 100}%` }} />
        <i className="b-strong" style={{ width: `${(a.strong.length - a.mastered.length) / total * 100}%` }} />
        <i className="b-practiced" style={{ width: `${(a.practiced.length - a.strong.length) / total * 100}%` }} />
      </div>
      <div className="area-sub">{a.practiced.length} dilatih · {a.mastered.length} dikuasai · daripada {total}</div>
    </div>
  );

  return (
    <div className="p-grid">
      <section className="p-card p-summary">
        <h2>Ringkasan {name}</h2>
        <div className="kpis">
          <div><b>{totalGames}</b><span>permainan</span></div>
          <div><b>{L.strong.length}<small>/26</small></b><span>huruf hampir/dikuasai</span></div>
          <div><b>{totalStars(d)}</b><span>bintang</span></div>
          <div><b>{pl.level}</b><span>tahap ({d.xp} XP)</span></div>
        </div>
        <p className="p-sentence">
          {d.activity.length === 0 ? `${name} belum bermain lagi.` :
            enough ? `${name} sudah mengenal ${L.strong.length} daripada 26 huruf${L.mastered.length ? ` dan telah menguasai ${L.mastered.length} huruf (${L.mastered.map(x => x.toUpperCase()).join(', ')})` : ''}.` :
              `${name} baru bermula. Laporan penguasaan akan lebih tepat selepas lebih banyak permainan (penguasaan memerlukan sekurang-kurangnya 6 cubaan setiap huruf).`}
        </p>
      </section>

      <section className="p-card">
        <h2>Peta Huruf</h2>
        <div className="letter-map">
          {ALPHABET.map(l => {
            const st = itemStatus(d, 'L:' + l);
            return <div key={l} className={`lm ${STATUS_CLS[st]} ${confusedWith(d, 'L:' + l).length ? 'conf' : ''}`} title={`${l.toUpperCase()}: ${STATUS_LABEL[st]}`}><span className="glyph">{l}</span></div>;
          })}
        </div>
        <div className="legend">
          {(['kuasai', 'hampir', 'belajar', 'perlu-latihan', 'belum'] as SkillStatus[]).map(s => <span key={s}><i className={`lg-dot ${STATUS_CLS[s]}`} />{STATUS_LABEL[s]}</span>)}
          <span><i className="lg-dot conf" />Selalu tertukar</span>
        </div>
      </section>

      <section className="p-card">
        <h2>Kemahiran</h2>
        {area('Kenal huruf', L, 26, 'huruf')}
        {area('Bunyi huruf', S, SOUND_LETTERS.length, 'bunyi')}
        {area('Menulis (huruf kecil & besar)', W, 52, 'huruf')}
        {area('Mengeja', SP, WORDS.length, 'perkataan')}
        {area('Suku kata', SY, WORDS.length, 'perkataan')}
        {area('Perkataan & gambar', V, WORDS.length, 'perkataan')}
        <div className="legend"><span><i className="lg-dot s3" />Dikuasai</span><span><i className="lg-dot s2" />Hampir</span><span><i className="lg-dot s1" />Dilatih</span></div>
      </section>

      <section className="p-card">
        <h2>Perlu Dibantu</h2>
        {confPairs.length === 0 && weakLetters.length === 0 && weakSounds.length === 0
          ? <p>{L.attempts < 8 ? 'Belum cukup data untuk mengenal pasti kelemahan.' : 'Tiada kelemahan ketara buat masa ini. Bagus!'}</p>
          : <ul className="p-list">
            {confPairs.length > 0 && <li><b>Selalu tertukar:</b> {confPairs.join(', ')}</li>}
            {weakLetters.length > 0 && <li><b>Huruf perlu latihan:</b> {weakLetters.map(x => x.toUpperCase()).join(', ')}</li>}
            {weakSounds.length > 0 && <li><b>Bunyi perlu latihan:</b> {weakSounds.map(x => x.toUpperCase()).join(', ')}</li>}
          </ul>}
        <div className="p-suggest"><b>Cadangan seterusnya:</b> {suggestion}</div>
      </section>

      <section className="p-card">
        <h2>7 Hari Lepas</h2>
        <svg className="week-chart" viewBox="0 0 320 150" role="img" aria-label="Jawapan betul dan salah 7 hari lepas">
          {[0, 0.5, 1].map(f => <line key={f} x1="28" x2="316" y1={120 - f * 100} y2={120 - f * 100} className="grid" />)}
          <text x="22" y="24" className="axis" textAnchor="end">{maxG}</text>
          <text x="22" y="124" className="axis" textAnchor="end">0</text>
          {days.map((day, i) => {
            const s = d.days[day]; const x = 40 + i * 40;
            const c = s?.correct ?? 0, w = s?.wrong ?? 0;
            return (
              <g key={day}>
                <rect x={x} y={120 - c / maxG * 100} width="14" height={c / maxG * 100} rx="3" className="bar-ok" />
                <rect x={x + 16} y={120 - w / maxG * 100} width="10" height={w / maxG * 100} rx="3" className="bar-no" />
                <text x={x + 13} y="138" textAnchor="middle" className="axis">{new Date(day + 'T12:00:00+08:00').toLocaleDateString('ms-MY', { weekday: 'short' }).slice(0, 3)}</text>
                <text x={x + 13} y="149" textAnchor="middle" className="axis small">{Math.round((s?.ms ?? 0) / 60000)}m</text>
              </g>
            );
          })}
        </svg>
        <div className="legend"><span><i className="lg-dot ok" />Betul</span><span><i className="lg-dot no" />Belum betul</span><span>m = minit bermain</span></div>
      </section>

      <section className="p-card">
        <h2>Aktiviti Terkini</h2>
        {d.activity.length === 0 ? <p>Tiada aktiviti lagi.</p> : (
          <ul className="activity">
            {d.activity.slice(-8).reverse().map((a, i) => (
              <li key={i}><span className="act-dot" style={{ background: GAMES[a.game].color }} /><b>{GAMES[a.game].name}</b> · Tahap {a.level}<span className="act-meta">{'★'.repeat(a.stars)}{'☆'.repeat(3 - a.stars)} · {a.correct} betul · {new Date(a.t).toLocaleString('ms-MY', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span></li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/* ============================== PORTFOLIO ============================== */
interface Cert { id: string; title: string; date: number }

function certificates(d: ProfileData): Cert[] {
  const out: Cert[] = [];
  const b = d.badges;
  const add = (id: string, title: string) => { if (b[id]) out.push({ id, title, date: b[id] }); };
  add('letters-5', 'Mengenal 5 Huruf');
  add('letters-13', 'Mengenal 13 Huruf');
  add('letters-26', 'Mengenal Semua 26 Huruf');
  add('writer-5', 'Menulis 5 Huruf');
  add('writer-15', 'Menulis 15 Huruf');
  add('speller-1', 'Mengeja Perkataan Pertama');
  add('speller-10', 'Mengeja 10 Perkataan');
  add('mission-5', 'Pengembara Rajin — 5 Hari Misi');
  add('champion', 'Juara Istana Bintang');
  return out;
}

function Portfolio({ d, name }: { d: ProfileData; name: string }) {
  const [cert, setCert] = useState<Cert | null>(null);
  const [replay, setReplay] = useState(0);
  const mastered = ALPHABET.filter(l => itemStatus(d, 'L:' + l) === 'kuasai');
  const strong = ALPHABET.filter(l => itemStatus(d, 'L:' + l) === 'hampir');
  const certs = certificates(d);
  const writingKeys = Object.keys(d.writing).sort();
  return (
    <div className="p-grid">
      <section className="p-card">
        <h2>Huruf {name}</h2>
        <p><b>Dikuasai:</b> {mastered.length ? mastered.map(x => x.toUpperCase()).join(', ') : '—'}</p>
        <p><b>Hampir dikuasai:</b> {strong.length ? strong.map(x => x.toUpperCase()).join(', ') : '—'}</p>
      </section>
      <section className="p-card">
        <h2>Perkataan Dieja ({d.words.length})</h2>
        {d.words.length ? <div className="word-gallery">{d.words.map(w => <div key={w}><ObjectArt word={w} size={56} /><span>{w}</span></div>)}</div> : <p>Belum ada perkataan dieja.</p>}
      </section>
      <section className="p-card">
        <h2>Rekod Tulisan</h2>
        <p className="p-note">Tulisan pertama dan terkini disimpan sebagai lukisan vektor kecil (tidak memenuhi storan).</p>
        {writingKeys.length ? (
          <div className="writing-grid" key={replay}>
            {writingKeys.map(k => {
              const w = d.writing[k];
              const label = k.startsWith('shape:') ? k.slice(6) : k;
              return (
                <div key={k} className="writing-cell">
                  <div className="wc-pair">
                    <figure><WritingSvg strokes={w.first.strokes} size={70} /><figcaption>Pertama<br />{fmtDate(w.first.date)}</figcaption></figure>
                    {w.count > 1 && <figure><WritingSvg strokes={w.latest.strokes} size={70} color="#2EC4B6" /><figcaption>Terkini<br />{fmtDate(w.latest.date)}</figcaption></figure>}
                  </div>
                  <strong className={k.startsWith('shape:') ? '' : 'glyph'}>{label}</strong>
                </div>
              );
            })}
          </div>
        ) : <p>Belum ada tulisan.</p>}
        {writingKeys.length > 0 && <Btn variant="white" size="sm" onClick={() => setReplay(r => r + 1)}>Ulang tayang tulisan</Btn>}
      </section>
      <section className="p-card">
        <h2>Sijil Pencapaian</h2>
        {certs.length ? <div className="cert-list">{certs.map(c => <button key={c.id} className="cert-btn" onClick={() => setCert(c)}><BadgeIcon icon="star" color="#FFC93C" size={40} /><span>{c.title}<small>{fmtDate(c.date)}</small></span></button>)}</div> : <p>Sijil pertama akan muncul apabila {name} mengenal 5 huruf atau mengeja perkataan pertama.</p>}
      </section>
      <section className="p-card">
        <h2>Lencana ({Object.keys(d.badges).length})</h2>
        <div className="mini-badges">{Object.keys(d.badges).map(id => { const b = badgeInfo(id); return <div key={id} title={b.desc}><BadgeIcon icon={b.icon} color={b.color} size={44} /><span>{b.name}</span></div>; })}</div>
      </section>
      <Modal open={!!cert} onClose={() => setCert(null)} title="Sijil" wide>{cert && <Certificate cert={cert} name={name} />}</Modal>
    </div>
  );
}

function Certificate({ cert, name }: { cert: Cert; name: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [msg, setMsg] = useState('');
  const save = async () => {
    try {
      const svg = new XMLSerializer().serializeToString(ref.current!);
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      await img.decode();
      const c = document.createElement('canvas'); c.width = 1200; c.height = 850;
      c.getContext('2d')!.drawImage(img, 0, 0, 1200, 850);
      const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = `sijil-ciluka-${name}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setMsg('Sijil disimpan sebagai gambar.');
    } catch { setMsg('Gagal menyimpan. Ambil tangkapan skrin sebagai alternatif.'); }
  };
  return (
    <div className="cert-wrap">
      <svg ref={ref} viewBox="0 0 600 425" xmlns="http://www.w3.org/2000/svg" className="cert-svg">
        <rect width="600" height="425" rx="24" fill="#FFF8EC" />
        <rect x="14" y="14" width="572" height="397" rx="18" fill="none" stroke="#FFC93C" strokeWidth="8" />
        <rect x="28" y="28" width="544" height="369" rx="12" fill="none" stroke="#9B6BFF" strokeWidth="2" strokeDasharray="6 6" />
        <text x="300" y="82" textAnchor="middle" fontSize="40" fontWeight="800" fill="#FF7EB6" fontFamily="Baloo 2, sans-serif">CILUKA</text>
        <text x="300" y="112" textAnchor="middle" fontSize="16" fill="#7A6D88" fontFamily="Nunito, sans-serif">Kecil-Kecil, Hebat-Hebat!</text>
        <text x="300" y="160" textAnchor="middle" fontSize="20" fill="#3B2A4D" fontFamily="Nunito, sans-serif">Sijil Pencapaian ini dianugerahkan kepada</text>
        <text x="300" y="214" textAnchor="middle" fontSize="44" fontWeight="800" fill="#3B2A4D" fontFamily="Baloo 2, sans-serif">{name}</text>
        <text x="300" y="258" textAnchor="middle" fontSize="18" fill="#3B2A4D" fontFamily="Nunito, sans-serif">kerana berjaya</text>
        <text x="300" y="294" textAnchor="middle" fontSize="28" fontWeight="800" fill="#2EC4B6" fontFamily="Baloo 2, sans-serif">{cert.title}</text>
        <text x="300" y="350" textAnchor="middle" fontSize="16" fill="#7A6D88" fontFamily="Nunito, sans-serif">{fmtDate(cert.date)} · Tandatangan: Pip</text>
        <g transform="translate(480 300)"><circle r="44" fill="#FFC93C" stroke="#E8B500" strokeWidth="4" /><path d="M0 -24 l7 14 15 2 -11 10 3 15 -14 -7 -14 7 3 -15 -11 -10 15 -2z" fill="#fff" /></g>
      </svg>
      <div className="cert-actions"><Btn variant="sun" onClick={save}>Simpan Gambar</Btn></div>
      {msg && <p className="p-note">{msg}</p>}
    </div>
  );
}

/* ============================== PROFIL ============================== */
function Profiles() {
  const { index } = useStore();
  const [adding, setAdding] = useState(false);
  const [edit, setEdit] = useState<string | null>(null);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  if (adding) return <CreateProfile first={false} onCancel={() => setAdding(false)} onDone={() => setAdding(false)} />;
  return (
    <div className="p-grid">
      <section className="p-card">
        <h2>Profil Anak</h2>
        <ul className="profile-admin">
          {index.profiles.map(p => (
            <li key={p.id} className={p.id === index.activeId ? 'active' : ''}>
              <Avatar id={p.avatar} size={48} />
              <span><b>{p.name}</b><small>{p.age} tahun{p.id === index.activeId ? ' · sedang aktif' : ''}</small></span>
              <div className="pa-actions">
                {p.id !== index.activeId && <Btn size="sm" variant="aqua" onClick={() => store.switchProfile(p.id)}>Tukar</Btn>}
                <Btn size="sm" variant="white" onClick={() => setEdit(p.id)}>Ubah</Btn>
                <Btn size="sm" variant="ghost" onClick={() => setConfirmDel(p.id)}>Padam</Btn>
              </div>
            </li>
          ))}
        </ul>
        <Btn variant="sun" onClick={() => setAdding(true)}>+ Tambah Profil</Btn>
      </section>
      <EditProfile id={edit} onClose={() => setEdit(null)} />
      <Modal open={!!confirmDel} onClose={() => setConfirmDel(null)} title="Padam profil?">
        <p>Semua kemajuan, tulisan dan ganjaran profil <b>{index.profiles.find(p => p.id === confirmDel)?.name}</b> akan dipadam. Tindakan ini tidak boleh dibatalkan.</p>
        <div className="modal-actions"><Btn variant="white" onClick={() => setConfirmDel(null)}>Batal</Btn><Btn variant="pink" onClick={() => { store.deleteProfile(confirmDel!); setConfirmDel(null); if (!store.get().index.profiles.length) go('profil'); }}>Padam</Btn></div>
      </Modal>
    </div>
  );
}

function EditProfile({ id, onClose }: { id: string | null; onClose: () => void }) {
  const { index } = useStore();
  const p = index.profiles.find(x => x.id === id);
  const [name, setName] = useState(''); const [avatar, setAvatar] = useState<AvatarId>('kucing'); const [age, setAge] = useState<Age>(4);
  const [loaded, setLoaded] = useState<string | null>(null);
  if (p && loaded !== p.id) { setLoaded(p.id); setName(p.name); setAvatar(p.avatar); setAge(p.age); }
  return (
    <Modal open={!!p} onClose={onClose} title="Ubah profil">
      <label className="field"><span>Nama</span><input id="edit-name" value={name} maxLength={20} onChange={e => setName(e.target.value)} /></label>
      <div className="avatar-pick">{AVATARS.map(a => <button type="button" key={a.id} className={avatar === a.id ? 'on' : ''} onClick={() => setAvatar(a.id)} aria-label={a.name}><Avatar id={a.id} size={46} /></button>)}</div>
      <div className="age-pick">{([3, 4, 5, 6] as Age[]).map(a => <button type="button" key={a} className={age === a ? 'on' : ''} onClick={() => setAge(a)}>{a}<small>tahun</small></button>)}</div>
      <div className="modal-actions"><Btn variant="white" onClick={onClose}>Batal</Btn><Btn variant="sun" onClick={() => { store.updateProfile(p!.id, { name, avatar, age }); onClose(); }}>Simpan</Btn></div>
    </Modal>
  );
}

/* ============================== TETAPAN ============================== */
function SettingsPanel() {
  const { index, profile } = useStore();
  const s = index.settings;
  const [msg, setMsg] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const [gate, setGate] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const voiceInfo = useMemo(() => !voiceAvailable() ? 'Telefon ini tidak menyokong suara sintetik. Arahan dipaparkan sebagai teks oleh Pip.'
    : malayVoiceInstalled() ? 'Suara Bahasa Melayu/Indonesia peranti ditemui.' : 'Suara Melayu belum dipasang pada telefon. Pasang "Bahasa Melayu" dalam tetapan Text-to-Speech telefon untuk sebutan yang lebih baik.', []);

  const exportFile = () => {
    try {
      const blob = new Blob([store.exportBackup()], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `ciluka-sandaran-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000);
      setMsg('Fail sandaran disimpan. Simpan fail ini di tempat selamat (cth. Google Drive).');
    } catch { setMsg('Gagal menyimpan sandaran.'); }
  };
  const importFile = async (f: File) => {
    try { store.importBackup(await f.text()); setMsg('Sandaran berjaya dipulihkan.'); }
    catch (e) { setMsg('Fail tidak sah: ' + (e as Error).message); }
  };

  const toggle = (label: string, value: boolean, onChange: (v: boolean) => void, id: string, note?: string) => (
    <div className="set-row">
      <label htmlFor={id}><b>{label}</b>{note && <small>{note}</small>}</label>
      <input id={id} type="checkbox" className="switch" checked={value} onChange={e => onChange(e.target.checked)} />
    </div>
  );

  return (
    <div className="p-grid">
      <section className="p-card">
        <h2>Bunyi</h2>
        {toggle('Kesan bunyi', s.sound, v => store.updateSettings({ sound: v }), 'set-sound')}
        {toggle('Suara arahan', s.voice, v => store.updateSettings({ voice: v }), 'set-voice', voiceInfo)}
        <Btn size="sm" variant="white" onClick={() => speak('Hai! Aku Pip. Jom belajar huruf!')}>Uji suara</Btn>
      </section>
      <section className="p-card">
        <h2>Masa Skrin</h2>
        <div className="set-row">
          <label htmlFor="set-session"><b>Had sesi</b><small>Pip akan mengajak anak berehat selepas tempoh ini. Ibu bapa boleh sambung.</small></label>
          <select id="set-session" value={s.sessionMin} onChange={e => store.updateSettings({ sessionMin: Number(e.target.value) as 0 | 10 | 15 | 20 | 30 })}>
            {[10, 15, 20, 30, 0].map(m => <option key={m} value={m}>{m ? `${m} minit` : 'Tiada had'}</option>)}
          </select>
        </div>
        {toggle('Buka semua pulau & tahap', s.unlockAll, v => store.updateSettings({ unlockAll: v }), 'set-unlock', 'Untuk anak yang lebih mahir. Ganjaran kekal berasaskan pencapaian.')}
      </section>
      <section className="p-card">
        <h2>Sandaran Data</h2>
        <p className="p-note">Data disimpan dalam pelayar telefon ini sahaja. Jika data pelayar dipadam, kemajuan akan hilang — buat sandaran berkala.{!storageAvailable() && ' Amaran: storan tidak tersedia (mod peribadi?). Kemajuan mungkin tidak disimpan.'}</p>
        <div className="btn-row">
          <Btn variant="aqua" onClick={exportFile}>Simpan Sandaran</Btn>
          <Btn variant="white" onClick={() => fileRef.current?.click()}>Pulihkan</Btn>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={e => { const f = e.target.files?.[0]; if (f) importFile(f); e.target.value = ''; }} />
        </div>
        {msg && <p className="p-msg" role="status">{msg}</p>}
      </section>
      <section className="p-card">
        <h2>Pasang Aplikasi</h2>
        <p className="p-note">Pasang CILUKA pada skrin utama untuk penggunaan luar talian dan storan yang lebih selamat.</p>
        {installAvailable() ? <Btn variant="sun" onClick={() => promptInstall()}>Pasang CILUKA</Btn> : <p className="p-note">Android Chrome: menu ⋮ → <b>Tambah ke skrin utama</b> / <b>Pasang aplikasi</b>.</p>}
      </section>
      <section className="p-card">
        <h2>Reset</h2>
        <p className="p-note">Padam semua kemajuan profil <b>{profile?.name}</b> (profil tidak dipadam).</p>
        <Btn variant="pink" onClick={() => setGate(true)} disabled={!profile}>Reset Kemajuan</Btn>
      </section>
      <section className="p-card p-about">
        <h2>Tentang</h2>
        <p>CILUKA v1.0 · Tiada iklan · Tiada langganan · Tiada data dihantar ke internet.</p>
        <p className="p-note">Berfungsi tanpa internet selepas dipasang. Yang memerlukan internet: muat turun kali pertama dan kemas kini aplikasi. Suara bergantung kepada suara sintetik telefon (rakaman suara manusia belum disertakan).</p>
      </section>
      <ParentGate open={gate} onClose={() => setGate(false)} onPass={() => { setGate(false); setConfirmReset(true); }} reason="Sahkan untuk reset data." />
      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset kemajuan?">
        <p>Semua bintang, lencana, tulisan dan rekod {profile?.name} akan dipadam.</p>
        <div className="modal-actions"><Btn variant="white" onClick={() => setConfirmReset(false)}>Batal</Btn><Btn variant="pink" onClick={() => { store.resetProfileData(profile!.id); setConfirmReset(false); setMsg('Kemajuan telah direset.'); }}>Reset</Btn></div>
      </Modal>
    </div>
  );
}
