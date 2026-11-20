/** Sistem audio CILUKA.
 *  Suara: (1) fail rakaman tempatan jika ada dalam AUDIO_ASSETS → (2) suara sintetik peranti (Web Speech, berfungsi
 *  tanpa internet jika telefon mempunyai suara Melayu/Indonesia yang dipasang) → (3) tiada suara: teks dipaparkan oleh Pip.
 *  Kesan bunyi dijana dengan Web Audio — tiada fail, berfungsi offline. */
import { LETTER_NAME, LETTER_SOUND } from '../data/letters';

/** Peta kunci → fail audio dalam /public/audio. Kosong buat masa ini: rakaman suara manusia belum dihasilkan. */
export const AUDIO_ASSETS: Record<string, string> = {};

const state = { voice: true, sound: true };
let ctx: AudioContext | null = null;
let voice: SpeechSynthesisVoice | null = null;
let current: HTMLAudioElement | null = null;

export function configureAudio(o: { voice: boolean; sound: boolean }) {
  state.voice = o.voice; state.sound = o.sound;
  if (!o.voice) stopSpeech();
}

function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices();
  voice = vs.find(v => /^ms/i.test(v.lang)) ?? vs.find(v => /^id/i.test(v.lang)) ?? null;
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  pickVoice();
  speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
}

export const voiceAvailable = () => typeof window !== 'undefined' && 'speechSynthesis' in window;
export const malayVoiceInstalled = () => !!voice;

export function stopSpeech() {
  try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch { /* abaikan */ }
  if (current) { current.pause(); current = null; }
}

/** Sebut teks. `key` digunakan untuk mencari rakaman tempatan dahulu. */
export function speak(text: string, opts: { key?: string; rate?: number } = {}): Promise<void> {
  if (!state.voice || !text) return Promise.resolve();
  const file = opts.key ? AUDIO_ASSETS[opts.key] : undefined;
  if (file) {
    return new Promise(res => {
      stopSpeech();
      const a = new Audio(file);
      current = a;
      a.onended = () => res(); a.onerror = () => res();
      a.play().catch(() => res());
    });
  }
  if (!voiceAvailable()) return Promise.resolve();
  return new Promise(res => {
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice?.lang ?? 'ms-MY';
      if (voice) u.voice = voice;
      u.rate = opts.rate ?? 0.9;
      u.pitch = 1.2;
      let done = false;
      const finish = () => { if (!done) { done = true; res(); } };
      u.onend = finish; u.onerror = finish;
      speechSynthesis.speak(u);
      setTimeout(finish, 700 + text.length * 95);
    } catch { res(); }
  });
}

export const letterName = (l: string) => LETTER_NAME[l.toLowerCase()] ?? l;
export const letterSound = (l: string) => LETTER_SOUND[l.toLowerCase()] ?? l;
export const sayLetter = (l: string) => speak(letterName(l), { key: 'huruf-' + l.toLowerCase() });

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
