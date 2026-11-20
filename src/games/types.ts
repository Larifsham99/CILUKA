import type { Age, PipMood, ProfileData } from '../data/types';

export interface GameCtx {
  data: ProfileData;
  age: Age;
  /** Huruf fokus daripada Kompas Pip (kelemahan dahulu). */
  focus: string[];
  /** Huruf yang telah diperkenalkan (kolam pilihan). */
  pool: string[];
  /** Perkataan misi harian (jika dari misi). */
  missionWord?: string;
  /** Suara arahan tersedia (jika tidak, petunjuk visual sentiasa dipaparkan). */
  voiceOn: boolean;
  /** Rekod jawapan: mengemas kini penguasaan, kiraan dan reaksi Pip. */
  answer: (key: string, correct: boolean, opts?: { chosen?: string; hinted?: boolean; quiet?: boolean }) => void;
  /** Tandakan soalan baharu dipaparkan (untuk kiraan masa menjawab). */
  question: () => void;
  hint: (text?: string) => void;
  say: (text: string, mood?: PipMood, speakIt?: boolean) => void;
  progress: (done: number, total: number) => void;
  /** Butang 🔊 di atas memainkan semula arahan. */
  setRepeat: (fn: (() => void) | null) => void;
  finish: () => void;
  /** Simpan sampel tulisan untuk portfolio. */
  saveWriting: (key: string, strokes: number[][][], accuracy: number) => void;
}

export interface GameProps { level: number; ctx: GameCtx }

/** Huruf dipaparkan dalam huruf kecil atau besar. */
export const show = (l: string, upper: boolean) => (upper ? l.toUpperCase() : l);
