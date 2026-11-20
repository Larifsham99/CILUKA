/** Penyimpanan setempat CILUKA. Semua data anak kekal dalam peranti (localStorage).
 *  - Indeks (profil + tetapan) dan data setiap profil disimpan berasingan.
 *  - Data rosak tidak menyebabkan aplikasi gagal: salinan disimpan dan data baharu dimulakan. */
import type { AppIndex, Profile, ProfileData, Settings } from '../data/types';

const INDEX_KEY = 'ciluka:v1:index';
const PROFILE_KEY = (id: string) => `ciluka:v1:p:${id}`;

export const DEFAULT_SETTINGS: Settings = { sound: true, voice: true, sessionMin: 15, unlockAll: false };

export function blankProfileData(): ProfileData {
  return {
    version: 1, items: {}, levels: {}, xp: 0, xpClaims: {}, badges: {}, collectibles: [], accessories: [], equipped: null,
    chestsOpened: 0, daily: null, missionDays: [], writing: {}, words: [], activity: [], days: {}, lastOpen: 0
  };
}

function blankIndex(): AppIndex {
  return { version: 1, profiles: [], activeId: null, settings: { ...DEFAULT_SETTINGS } };
}

let storageOk = true;
export const storageAvailable = () => storageOk;
export const recoveredFromCorruption: string[] = [];

function read(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return null;
    try { return JSON.parse(raw); }
    catch {
      // Data rosak: simpan salinan untuk siasatan, kemudian teruskan dengan data baharu.
      try { localStorage.setItem(`${key}:rosak:${Date.now()}`, raw); } catch { /* abaikan */ }
      recoveredFromCorruption.push(key);
      return null;
    }
  } catch { storageOk = false; return null; }
}

function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); storageOk = true; }
  catch { storageOk = false; }
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

/** Pastikan setiap medan wujud dengan jenis yang betul (pulih daripada data separa/lama). */
export function sanitizeProfileData(v: unknown): ProfileData {
  const base = blankProfileData();
  if (!isObj(v)) return base;
  const out = { ...base } as unknown as Record<string, unknown>;
  for (const k of Object.keys(base) as (keyof ProfileData)[]) {
    const bv = base[k] as unknown, vv = v[k];
    if (vv === undefined) continue;
    if (Array.isArray(bv) ? Array.isArray(vv) : typeof bv === 'number' ? typeof vv === 'number' && isFinite(vv) : isObj(bv) ? isObj(vv) : true) out[k] = vv;
  }
  const d = out as unknown as ProfileData;
  // buang rekod berganda
  d.words = Array.from(new Set(d.words.filter(w => typeof w === 'string')));
  d.collectibles = Array.from(new Set(d.collectibles));
  d.accessories = Array.from(new Set(d.accessories));
  d.missionDays = Array.from(new Set(d.missionDays));
  if (d.activity.length > 60) d.activity = d.activity.slice(-60);
  return d;
}

export function loadIndex(): AppIndex {
  const v = read(INDEX_KEY);
  const idx = blankIndex();
  if (!isObj(v)) return idx;
  if (Array.isArray(v.profiles)) {
    idx.profiles = (v.profiles as Profile[]).filter(p => p && typeof p.id === 'string' && typeof p.name === 'string');
  }
  idx.activeId = typeof v.activeId === 'string' && idx.profiles.some(p => p.id === v.activeId) ? v.activeId : idx.profiles[0]?.id ?? null;
  if (isObj(v.settings)) idx.settings = { ...DEFAULT_SETTINGS, ...(v.settings as Partial<Settings>) };
  return idx;
}

export const saveIndex = (idx: AppIndex) => write(INDEX_KEY, idx);
export const loadProfileData = (id: string): ProfileData => sanitizeProfileData(read(PROFILE_KEY(id)));
export const saveProfileData = (id: string, d: ProfileData) => write(PROFILE_KEY(id), d);
export function deleteProfileData(id: string) { try { localStorage.removeItem(PROFILE_KEY(id)); } catch { /* abaikan */ } }

/** Sandaran: satu objek JSON mengandungi semua profil dan data. */
export function exportAll(idx: AppIndex): string {
  const data: Record<string, ProfileData> = {};
  for (const p of idx.profiles) data[p.id] = loadProfileData(p.id);
  return JSON.stringify({ app: 'ciluka', version: 1, exportedAt: new Date().toISOString(), index: idx, data });
}

export function importAll(text: string): AppIndex {
  const obj = JSON.parse(text);
  if (!isObj(obj) || obj.app !== 'ciluka' || !isObj(obj.index) || !isObj(obj.data)) throw new Error('Bukan fail sandaran CILUKA.');
  write(INDEX_KEY, obj.index);
  const idx = loadIndex();
  for (const p of idx.profiles) saveProfileData(p.id, sanitizeProfileData((obj.data as Record<string, unknown>)[p.id]));
  return idx;
}

export function requestPersistence() {
  try { navigator.storage?.persist?.().catch(() => undefined); } catch { /* abaikan */ }
}
