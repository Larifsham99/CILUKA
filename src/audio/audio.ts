/** Sistem audio CILUKA.
 *  Suara, mengikut keutamaan:
 *   1. Rakaman suara manusia (public/audio/manifest.json) — sebutan paling tepat. Setiap ayat, perkataan, suku kata dan
 *      huruf dicari mengikut "slug" teksnya; ayat dipecahkan pada token huruf {b} supaya rakaman boleh digabungkan.
 *   2. Suara sintetik peranti BAHASA MELAYU (ms-MY) atau Indonesia (id-ID) sahaja.
 *   3. Tiada suara Melayu/Indonesia → tidak bercakap (suara Inggeris yang membaca BM sangat mengelirukan);
 *      Pip sentiasa memaparkan teks sebagai sandaran.
 *  Kesan bunyi dijana dengan Web Audio — tiada fail, berfungsi offline. */
import { LETTER_NAME_SPOKEN, SOUND_WORD } from '../data/letters';
import { WORD_MAP } from '../data/words';

const state = { voice: true, sound: true };
let ctx: AudioContext | null = null;
let voice: SpeechSynthesisVoice | null = null;
let kind: 'ms' | 'id' | 'none' | 'unknown' = 'unknown';
let current: HTMLAudioElement | null = null;
let speechId = 0;
let manifest: Record<string, string> = {};

export function configureAudio(o: { voice: boolean; sound: boolean }) {
  state.voice = o.voice; state.sound = o.sound;
  if (!o.voice) stopSpeech();
}

/** Muat senarai rakaman suara manusia (jika ada). Tiada fail = guna suara peranti. */
export async function loadAudioManifest() {
  try {
    const r = await fetch('audio/manifest.json', { cache: 'no-cache' });
    if (r.ok) manifest = await r.json();
  } catch { /* tiada rakaman */ }
}
export const recordingCount = () => Object.keys(manifest).length;

/** Kunci rakaman: huruf kecil, tanpa tanda baca. "Cari huruf" → "cari-huruf". */
export const slug = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function rank(v: SpeechSynthesisVoice): number {
  const l = v.lang.toLowerCase().replace('_', '-');
  let r = l === 'ms-my' ? 100 : l.startsWith('ms') ? 90 : l === 'id-id' ? 50 : l.startsWith('id') ? 45 : 0;
  if (r && /google|natural|neural|online|enhanced|premium/i.test(v.name)) r += 8;
  if (r && v.localService) r += 3; // berfungsi tanpa internet
  return r;
}

function pickVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) { kind = 'none'; return; }
  const vs = speechSynthesis.getVoices();
  if (!vs.length) { kind = 'unknown'; voice = null; return; }
  const best = vs.slice().sort((a, b) => rank(b) - rank(a))[0];
  if (best && rank(best) > 0) { voice = best; kind = best.lang.toLowerCase().startsWith('ms') ? 'ms' : 'id'; }
  else { voice = null; kind = 'none'; }
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  pickVoice();
  speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
}

export const voiceAvailable = () => recordingCount() > 0 || (typeof window !== 'undefined' && 'speechSynthesis' in window && kind !== 'none');
export const voiceInfo = () => ({ kind, name: voice?.name ?? '', lang: voice?.lang ?? '', recordings: recordingCount() });

export function stopSpeech() {
  speechId++;
  try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch { /* abaikan */ }
  if (current) { current.pause(); current = null; }
}

/** Token huruf dalam ayat: `Cari huruf ${letterName('b')}` → "Cari huruf {b}". Disebut mengikut suara yang digunakan. */
export const letterName = (l: string) => `{${l.toLowerCase()}}`;
const spokenLetter = (l: string) => LETTER_NAME_SPOKEN[l] ?? l;

/** Petunjuk bunyi huruf = suku kata pertama perkataan contoh (cara BM: "bo" dalam "bola"). */
export function soundCue(l: string): string {
  const w = SOUND_WORD[l.toLowerCase()];
  return w ? WORD_MAP[w]?.syllables[0] ?? w : l;
}

/** Bersihkan teks supaya suara tidak membaca simbol atau mengeja perkataan huruf besar. */
export function normalizeSpeech(t: string): string {
  return t
    .replace(/(\d+)\s*\/\s*(\d+)/g, '$1 daripada $2')
    .replace(/\.\.\.|…/g, ', ')
    .replace(/\b([A-Z]{2,})\b/g, m => m.toLowerCase())
    .replace(/&/g, ' dan ')
    .replace(/[^\p{L}\p{N}\s.,!?'{}-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function playFile(file: string, id: number): Promise<void> {
  return new Promise(res => {
    if (id !== speechId) return res();
    const a = new Audio(file);
    current = a;
    a.onended = () => res(); a.onerror = () => res();
    a.play().catch(() => res());
  });
}

function tts(text: string, rate: number, id: number): Promise<void> {
  if (!text || id !== speechId || kind === 'none' || !('speechSynthesis' in window)) return Promise.resolve();
  return new Promise(res => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice?.lang ?? 'ms-MY';
      if (voice) u.voice = voice;
      u.rate = rate;
      u.pitch = 1.05;
      let done = false;
      const finish = () => { if (!done) { done = true; res(); } };
      u.onend = finish; u.onerror = finish;
      speechSynthesis.speak(u);
      setTimeout(finish, 900 + text.length * 110);
    } catch { res(); }
  });
}

/** Sebut teks. Rakaman manusia digunakan bagi bahagian yang ada; selebihnya suara peranti. */
export async function speak(text: string, opts: { rate?: number } = {}): Promise<void> {
  if (!state.voice || !text) return;
  stopSpeech();
  const id = speechId;
  const rate = opts.rate ?? 0.88;
  const clean = normalizeSpeech(text);
  const parts = clean.split(/(\{[a-z]\})/).map(p => p.trim()).filter(Boolean);
  const keyOf = (p: string) => (/^\{[a-z]\}$/.test(p) ? 'huruf-' + p[1] : slug(p));
  const whole = manifest[slug(clean.replace(/\{([a-z])\}/g, 'huruf $1'))];
  if (whole) return playFile(whole, id);
  if (parts.some(p => manifest[keyOf(p)])) {
    for (const p of parts) {
      if (id !== speechId) return;
      const f = manifest[keyOf(p)];
      if (f) await playFile(f, id);
      else await tts(/^\{[a-z]\}$/.test(p) ? spokenLetter(p[1]) : p, rate, id);
    }
    return;
  }
  return tts(clean.replace(/\{([a-z])\}/g, (_, l: string) => spokenLetter(l)), rate, id);
}

export const sayLetter = (l: string) => speak(letterName(l));

/* ---------------- Kesan bunyi (Web Audio) ---------------- */
function ac(): AudioContext | null {
  try {
    if (!ctx) {
      const C = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!C) return null;
      ctx = new C();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch { return null; }
}
export const unlockAudio = () => { ac(); };

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.16, slideTo?: number) {
  const c = ac(); if (!c) return;
  const t = c.currentTime + start;
  const o = c.createOscillator(); const g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t); o.stop(t + dur + 0.05);
}

const SFX = {
  tap: () => tone(520, 0, 0.08, 'triangle', 0.12, 820),
  correct: () => { tone(660, 0, 0.13, 'triangle'); tone(880, 0.09, 0.13, 'triangle'); tone(1320, 0.18, 0.22, 'triangle'); },
  wrong: () => tone(300, 0, 0.26, 'sine', 0.14, 170),
  pop: () => { tone(900, 0, 0.06, 'square', 0.06, 1400); tone(400, 0.02, 0.1, 'triangle', 0.1, 120); },
  flip: () => tone(700, 0, 0.07, 'sine', 0.08, 1000),
  star: () => [988, 1319, 1568].forEach((f, i) => tone(f, i * 0.09, 0.25, 'sine', 0.1)),
  win: () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.1, 0.35, 'triangle', 0.12)),
  unlock: () => { tone(392, 0, 0.2, 'sine', 0.08); tone(587, 0.15, 0.2, 'sine', 0.1); tone(1175, 0.3, 0.35, 'triangle', 0.14); },
  tick: (lvl = 0) => tone(480 + lvl * 35, 0, 0.04, 'sine', 0.05)
};
export type SfxName = keyof typeof SFX;

export function sfx(name: SfxName, arg?: number) {
  if (!state.sound) return;
  try { (SFX[name] as (a?: number) => void)(arg); } catch { /* abaikan */ }
}
