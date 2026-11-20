/** Templat strok untuk Magic Tracing. Kotak 0–100, y ke bawah.
 *  Huruf kecil mengikut bentuk "sekolah" (a dan g satu tingkat). Garis asas y=90, garis x y=44. */
export type Pt = [number, number];
export type Stroke = Pt[];

function line(x1: number, y1: number, x2: number, y2: number): Stroke {
  const n = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / 4));
  const pts: Stroke = [];
  for (let i = 0; i <= n; i++) pts.push([x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n]);
  return pts;
}
/** Lengkok: sudut dalam darjah, matematik (0 = kanan, 90 = atas). */
function arc(cx: number, cy: number, r: number, a0: number, a1: number): Stroke {
  const len = Math.abs(a1 - a0) * Math.PI / 180 * r;
  const n = Math.max(4, Math.round(len / 4));
  const pts: Stroke = [];
  for (let i = 0; i <= n; i++) {
    const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
    pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]);
  }
  return pts;
}
const join = (...parts: Stroke[]): Stroke => parts.reduce<Stroke>((acc, p) => acc.concat(acc.length ? p.slice(1) : p), []);
const dot = (x: number, y: number): Stroke => [[x, y]];

export const LOWER: Record<string, Stroke[]> = {
  a: [arc(50, 67, 20, 40, 395), line(70, 46, 70, 90)],
  b: [line(32, 10, 32, 90), arc(50, 72, 18, 180, -175)],
  c: [arc(52, 67, 22, 45, 315)],
  d: [arc(48, 70, 19, 40, 395), line(67, 10, 67, 90)],
  e: [join(line(30, 67, 72, 67), arc(51, 67, 21, 0, 315))],
  f: [join(arc(62, 24, 14, 30, 180), line(48, 24, 48, 90)), line(34, 46, 64, 46)],
  g: [arc(48, 62, 18, 40, 395), join(line(66, 46, 66, 86), arc(54, 86, 12, 0, -170))],
  h: [line(30, 10, 30, 90), join(arc(50, 64, 20, 180, 0), line(70, 64, 70, 90))],
  i: [line(50, 44, 50, 90), dot(50, 24)],
  j: [join(line(56, 44, 56, 86), arc(44, 86, 12, 0, -170)), dot(56, 24)],
  k: [line(34, 10, 34, 90), line(68, 44, 34, 70), line(45, 62, 70, 90)],
  l: [line(50, 10, 50, 90)],
  m: [line(22, 44, 22, 90), join(arc(35, 60, 13, 180, 0), line(48, 60, 48, 90)), join(arc(61, 60, 13, 180, 0), line(74, 60, 74, 90))],
  n: [line(30, 44, 30, 90), join(arc(50, 64, 20, 180, 0), line(70, 64, 70, 90))],
  o: [arc(50, 67, 22, 60, 420)],
  p: [line(32, 42, 32, 98), arc(50, 58, 16, 180, -175)],
  q: [arc(48, 62, 18, 40, 395), line(66, 44, 66, 98)],
  r: [line(34, 44, 34, 90), arc(52, 62, 18, 180, 50)],
  s: [join(arc(50, 55, 12, 25, 270), arc(50, 79, 12, 90, -155))],
  t: [join(line(46, 18, 46, 80), arc(56, 80, 10, 180, 320)), line(30, 42, 66, 42)],
  u: [join(line(30, 44, 30, 70), arc(50, 70, 20, 180, 360), line(70, 70, 70, 44)), line(70, 44, 70, 90)],
  v: [join(line(28, 44, 50, 90), line(50, 90, 72, 44))],
  w: [join(line(18, 44, 32, 90), line(32, 90, 50, 56), line(50, 56, 68, 90), line(68, 90, 82, 44))],
  x: [line(30, 44, 70, 90), line(70, 44, 30, 90)],
  y: [line(30, 44, 50, 76), line(70, 44, 36, 98)],
  z: [join(line(30, 44, 70, 44), line(70, 44, 30, 90), line(30, 90, 70, 90))]
};

export const UPPER: Record<string, Stroke[]> = {
  A: [line(50, 10, 18, 90), line(50, 10, 82, 90), line(31, 62, 69, 62)],
  B: [line(26, 10, 26, 90), join(line(26, 10, 54, 10), arc(54, 28, 18, 90, -90), line(54, 46, 26, 46)), join(line(26, 46, 58, 46), arc(58, 68, 22, 90, -90), line(58, 90, 26, 90))],
  C: [arc(54, 50, 38, 45, 315)],
  D: [line(26, 10, 26, 90), join(line(26, 10, 42, 10), arc(42, 50, 40, 90, -90), line(42, 90, 26, 90))],
  E: [line(28, 10, 28, 90), line(28, 10, 74, 10), line(28, 50, 66, 50), line(28, 90, 74, 90)],
  F: [line(28, 10, 28, 90), line(28, 10, 74, 10), line(28, 50, 66, 50)],
  G: [join(arc(54, 50, 38, 45, 315), line(81, 77, 81, 56), line(81, 56, 58, 56))],
  H: [line(24, 10, 24, 90), line(76, 10, 76, 90), line(24, 50, 76, 50)],
  I: [line(50, 10, 50, 90), line(32, 10, 68, 10), line(32, 90, 68, 90)],
  J: [join(line(62, 10, 62, 66), arc(42, 66, 20, 0, -180))],
  K: [line(26, 10, 26, 90), line(74, 10, 26, 56), line(42, 44, 76, 90)],
  L: [join(line(28, 10, 28, 90), line(28, 90, 74, 90))],
  M: [line(18, 10, 18, 90), join(line(18, 10, 50, 62), line(50, 62, 82, 10)), line(82, 10, 82, 90)],
  N: [line(22, 10, 22, 90), line(22, 10, 78, 90), line(78, 90, 78, 10)],
  O: [arc(50, 50, 38, 90, 450)],
  P: [line(26, 10, 26, 90), join(line(26, 10, 54, 10), arc(54, 30, 20, 90, -90), line(54, 50, 26, 50))],
  Q: [arc(50, 50, 38, 90, 450), line(58, 66, 84, 94)],
  R: [line(26, 10, 26, 90), join(line(26, 10, 54, 10), arc(54, 30, 20, 90, -90), line(54, 50, 26, 50)), line(46, 50, 76, 90)],
  S: [join(arc(50, 30, 20, 20, 270), arc(50, 70, 20, 90, -160))],
  T: [line(18, 10, 82, 10), line(50, 10, 50, 90)],
  U: [join(line(24, 10, 24, 62), arc(50, 62, 26, 180, 360), line(76, 62, 76, 10))],
  V: [join(line(18, 10, 50, 90), line(50, 90, 82, 10))],
  W: [join(line(12, 10, 30, 90), line(30, 90, 50, 36), line(50, 36, 70, 90), line(70, 90, 88, 10))],
  X: [line(20, 10, 80, 90), line(80, 10, 20, 90)],
  Y: [line(20, 10, 50, 50), join(line(80, 10, 50, 50), line(50, 50, 50, 90))],
  Z: [join(line(20, 10, 80, 10), line(80, 10, 20, 90), line(20, 90, 80, 90))]
};

/** Latihan pra-menulis: garisan dan bentuk asas. */
export const SHAPES: Record<string, { name: string; strokes: Stroke[] }> = {
  tegak: { name: 'Garis tegak', strokes: [line(50, 10, 50, 90)] },
  datar: { name: 'Garis datar', strokes: [line(10, 50, 90, 50)] },
  condong: { name: 'Garis condong', strokes: [line(20, 12, 80, 88)] },
  lengkung: { name: 'Lengkung', strokes: [arc(56, 50, 36, 60, 300)] },
  zigzag: { name: 'Zigzag', strokes: [join(line(10, 70, 30, 30), line(30, 30, 50, 70), line(50, 70, 70, 30), line(70, 30, 90, 70))] },
  bulatan: { name: 'Bulatan', strokes: [arc(50, 50, 36, 90, 450)] },
  segitiga: { name: 'Segi tiga', strokes: [join(line(50, 12, 88, 84), line(88, 84, 12, 84), line(12, 84, 50, 12))] },
  segiempat: { name: 'Segi empat', strokes: [join(line(16, 16, 84, 16), line(84, 16, 84, 84), line(84, 84, 16, 84), line(16, 84, 16, 16))] }
};

export const SHAPE_ORDER = ['tegak', 'datar', 'condong', 'lengkung', 'zigzag', 'bulatan', 'segitiga', 'segiempat'];

export function strokesFor(key: string): Stroke[] {
  if (key.startsWith('shape:')) return SHAPES[key.slice(6)]?.strokes ?? SHAPES.tegak.strokes;
  return (key === key.toUpperCase() ? UPPER[key] : LOWER[key]) ?? LOWER.a;
}
