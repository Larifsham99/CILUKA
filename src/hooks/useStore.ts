/** Kedai keadaan aplikasi — satu sumber kebenaran, disimpan automatik ke storan setempat. */
import { useSyncExternalStore } from 'react';
import { configureAudio } from '../audio/audio';
import type { Age, AppIndex, AvatarId, Profile, ProfileData, Settings } from '../data/types';
import { ensureDaily } from '../services/missions';
import { evaluateAwards } from '../services/rewards';
import {
  blankProfileData, deleteProfileData, exportAll, importAll, loadIndex, loadProfileData, saveIndex, saveProfileData
} from '../storage/storage';
import { uid } from '../utils/date';

export interface Snapshot {
  index: AppIndex;
  profile: Profile | null;
  data: ProfileData | null;
  sessionMs: number;
  resting: boolean;
}

class AppStore {
  private snap: Snapshot;
  private listeners = new Set<() => void>();

  constructor() {
    const index = loadIndex();
    configureAudio(index.settings);
    const profile = index.profiles.find(p => p.id === index.activeId) ?? null;
    const data = profile ? this.prepare(profile) : null;
    this.snap = { index, profile, data, sessionMs: 0, resting: false };
  }

  private prepare(p: Profile): ProfileData {
    const d = loadProfileData(p.id);
    ensureDaily(d, p.age, loadIndex().settings);
    saveProfileData(p.id, d);
    return d;
  }

  subscribe = (fn: () => void) => { this.listeners.add(fn); return () => { this.listeners.delete(fn); }; };
  get = () => this.snap;

  private set(next: Partial<Snapshot>) {
    this.snap = { ...this.snap, ...next };
    this.listeners.forEach(l => l());
  }

  private writeIndex(index: AppIndex) {
    saveIndex(index);
    configureAudio(index.settings);
  }

  createProfile(name: string, avatar: AvatarId, age: Age) {
    const p: Profile = { id: uid(), name: name.trim().slice(0, 20) || 'Kawan Hebat', avatar, age, createdAt: Date.now() };
    const index: AppIndex = { ...this.snap.index, profiles: [...this.snap.index.profiles, p], activeId: p.id };
    const d = blankProfileData();
    ensureDaily(d, p.age, index.settings);
    saveProfileData(p.id, d);
    this.writeIndex(index);
    this.set({ index, profile: p, data: d, sessionMs: 0, resting: false });
    return p;
  }

  updateProfile(id: string, patch: Partial<Pick<Profile, 'name' | 'avatar' | 'age'>>) {
    const profiles = this.snap.index.profiles.map(p => p.id === id ? { ...p, ...patch, name: (patch.name ?? p.name).trim().slice(0, 20) || p.name } : p);
    const index = { ...this.snap.index, profiles };
    this.writeIndex(index);
    this.set({ index, profile: profiles.find(p => p.id === this.snap.index.activeId) ?? null });
  }

  deleteProfile(id: string) {
    const profiles = this.snap.index.profiles.filter(p => p.id !== id);
    deleteProfileData(id);
    const activeId = this.snap.index.activeId === id ? profiles[0]?.id ?? null : this.snap.index.activeId;
    const index = { ...this.snap.index, profiles, activeId };
    this.writeIndex(index);
    const profile = profiles.find(p => p.id === activeId) ?? null;
    this.set({ index, profile, data: profile ? this.prepare(profile) : null });
  }

  switchProfile(id: string) {
    const profile = this.snap.index.profiles.find(p => p.id === id);
    if (!profile) return;
    const index = { ...this.snap.index, activeId: id };
    this.writeIndex(index);
    this.set({ index, profile, data: this.prepare(profile), sessionMs: 0, resting: false });
  }

  resetProfileData(id: string) {
    const p = this.snap.index.profiles.find(x => x.id === id);
    if (!p) return;
    const d = blankProfileData();
    ensureDaily(d, p.age, this.snap.index.settings);
    saveProfileData(id, d);
    if (id === this.snap.index.activeId) this.set({ data: d });
  }

  /** Ubah data profil aktif secara selamat (salinan → ubah → simpan). */
  update<T>(fn: (d: ProfileData, p: Profile) => T): T | undefined {
    const { data, profile } = this.snap;
    if (!data || !profile) return undefined;
    const draft: ProfileData = structuredClone(data);
    const out = fn(draft, profile);
    saveProfileData(profile.id, draft);
    this.set({ data: draft });
    return out;
  }

  updateSettings(patch: Partial<Settings>) {
    const index = { ...this.snap.index, settings: { ...this.snap.index.settings, ...patch } };
    this.writeIndex(index);
    this.set({ index });
    if (patch.unlockAll !== undefined) this.update(d => { evaluateAwards(d); });
  }

  addSessionTime(ms: number) {
    const sessionMs = this.snap.sessionMs + ms;
    const lim = this.snap.index.settings.sessionMin;
    this.set({ sessionMs, resting: lim > 0 && sessionMs >= lim * 60000 });
  }

  endRest() { this.set({ sessionMs: 0, resting: false }); }

  touchOpen() { this.update(d => { ensureDaily(d, this.snap.profile!.age, this.snap.index.settings); d.lastOpen = Date.now(); }); }

  exportBackup() { return exportAll(this.snap.index); }

  importBackup(text: string) {
    const index = importAll(text);
    configureAudio(index.settings);
    const profile = index.profiles.find(p => p.id === index.activeId) ?? null;
    this.set({ index, profile, data: profile ? this.prepare(profile) : null, sessionMs: 0, resting: false });
  }
}

export const store = new AppStore();
export const useStore = () => useSyncExternalStore(store.subscribe, store.get);
