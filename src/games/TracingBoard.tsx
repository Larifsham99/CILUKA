/** Papan menulis dengan jari.
 *  - Mod 'full' & 'dots': titik semak berurutan → arah dikesan; strok mesti diikut mengikut susunan.
 *  - Mod 'none' (tanpa panduan): templat tersembunyi; setiap strok dipadankan dengan mana-mana strok templat yang tinggal.
 *  - Toleransi longgar, tangga bantuan, tiada skrin gagal. */
import { useEffect, useRef, useState } from 'react';
import { sfx } from '../audio/audio';
import { strokesFor, type Pt, type Stroke } from '../data/strokes';

export type Guide = 'full' | 'dots' | 'none';

interface Props {
  item: string;
  guide: Guide;
  medium: 'magic' | 'sand';
  onStrokeFeedback: (kind: 'wrong-dir' | 'retry' | 'demo' | 'assist' | 'good') => void;
  onDone: (accuracy: number, strokes: number[][][], helped: number) => void;
}

export function TracingBoard({ item, guide, medium, onStrokeFeedback, onDone }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const st = useRef({
    S: 300, dpr: 1, tpl: [] as Stroke[], doneStrokes: [] as number[], idx: 0, next: 0, hits: 0, totalHits: 0, totalPts: 0,
    fails: 0, helped: 0, tolBoost: 0, ink: [] as Pt[][], cur: null as Pt[] | null, drawing: false, pointer: null as number | null,
    demo: null as null | { pts: Stroke; t0: number; dur: number; draw: boolean; ink?: Pt[]; cb?: () => void },
    finished: false, lastTick: 0, raf: 0
  });
  const [, force] = useState(0);

  useEffect(() => {
    const s = st.current;
    s.tpl = strokesFor(item);
    Object.assign(s, { doneStrokes: [], idx: 0, next: 0, hits: 0, totalHits: 0, totalPts: s.tpl.reduce((a, t) => a + t.length, 0), fails: 0, helped: 0, tolBoost: 0, ink: [], cur: null, demo: null, finished: false });
    force(x => x + 1);
  }, [item, guide]);

  useEffect(() => {
    const s = st.current;
    const c = cv.current!, g = c.getContext('2d')!;
    const layout = () => {
      const w = wrap.current!.parentElement!.getBoundingClientRect();
      s.S = Math.floor(Math.max(220, Math.min(w.width - 8, w.height - 8, 460)));
      s.dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = s.S * s.dpr; c.height = s.S * s.dpr;
      c.style.width = c.style.height = s.S + 'px';
      wrap.current!.style.width = wrap.current!.style.height = s.S + 'px';
    };
    layout();
    const ro = new ResizeObserver(layout); ro.observe(wrap.current!.parentElement!);

    const px = ([x, y]: Pt): Pt => [s.S * 0.1 + x * s.S * 0.008, s.S * 0.1 + y * s.S * 0.008];
    const path = (pts: Pt[], map = true) => {
      g.beginPath();
      pts.forEach((q, i) => { const [x, y] = map ? px(q) : q; if (i) g.lineTo(x, y); else g.moveTo(x, y); });
      if (pts.length === 1) { const [x, y] = map ? px(pts[0]) : pts[0]; g.lineTo(x + 0.1, y); }
    };
    const sand = medium === 'sand';
    const frame = (t: number) => {
      s.raf = requestAnimationFrame(frame);
      g.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      g.clearRect(0, 0, s.S, s.S);
      g.lineCap = 'round'; g.lineJoin = 'round';
      // garis tulis
      g.strokeStyle = sand ? 'rgba(140,100,40,.18)' : 'rgba(255,255,255,.12)'; g.lineWidth = 2; g.setLineDash([6, 8]);
      [10, 44, 90].forEach(y => { const yy = px([0, y])[1]; g.beginPath(); g.moveTo(s.S * .05, yy); g.lineTo(s.S * .95, yy); g.stroke(); });
      g.setLineDash([]);
      if (!s.finished) {
        s.tpl.forEach((stroke, i) => {
          const done = s.doneStrokes.includes(i);
          if (guide === 'full' || done) {
            path(stroke); g.strokeStyle = sand ? 'rgba(255,255,255,.8)' : 'rgba(155,107,255,.32)'; g.lineWidth = s.S * 0.1; g.stroke();
            if (guide === 'full' && !done) { path(stroke); g.setLineDash([s.S * .02, s.S * .03]); g.strokeStyle = sand ? 'rgba(120,80,30,.45)' : 'rgba(255,255,255,.45)'; g.lineWidth = 3; g.stroke(); g.setLineDash([]); }
          } else if (guide === 'dots') {
            g.fillStyle = sand ? 'rgba(120,80,30,.5)' : 'rgba(255,255,255,.55)';
            stroke.forEach((q, k) => { if (k % 4 === 0 || k === stroke.length - 1) { const [x, y] = px(q); g.beginPath(); g.arc(x, y, s.S * 0.012, 0, 7); g.fill(); } });
          }
        });
        // kemajuan strok semasa
        const cur = s.tpl[s.idx];
        if (cur && guide !== 'none' && s.next > 0 && cur.length > 1) {
          path(cur.slice(0, s.next + 1)); g.strokeStyle = 'rgba(255,201,60,.6)'; g.lineWidth = s.S * 0.1; g.stroke();
        }
        // titik mula + anak panah
        if (cur && (guide !== 'none' || s.fails > 0)) {
          const [sx, sy] = px(cur[0]);
          const pulse = 1 + 0.18 * Math.sin(t / 220);
          g.beginPath(); g.arc(sx, sy, s.S * 0.045 * pulse, 0, 7);
          g.fillStyle = '#9B6BFF'; g.shadowColor = '#9B6BFF'; g.shadowBlur = 14; g.fill(); g.shadowBlur = 0;
          g.fillStyle = '#fff'; g.font = `800 ${Math.round(s.S * 0.045)}px "Baloo 2", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
          g.fillText(String(s.idx + 1), sx, sy + 1);
          if (cur.length > 4 && guide === 'full') {
            const [ax, ay] = px(cur[4]); const ang = Math.atan2(ay - sy, ax - sx); const dd = s.S * 0.09;
            g.save(); g.translate(sx + Math.cos(ang) * dd, sy + Math.sin(ang) * dd); g.rotate(ang);
            g.beginPath(); g.moveTo(s.S * .03, 0); g.lineTo(-s.S * .015, -s.S * .022); g.lineTo(-s.S * .015, s.S * .022); g.closePath();
            g.fillStyle = 'rgba(155,107,255,.9)'; g.fill(); g.restore();
          }
        }
      }
      // dakwat anak
      const ink = (pts: Pt[], live: boolean) => {
        if (!pts.length) return;
        const w = s.S * 0.05;
        if (sand) {
          path(pts, false); g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = w; g.save(); g.translate(1.5, 2); g.stroke(); g.restore();
          path(pts, false); g.strokeStyle = '#B8874A'; g.lineWidth = w * .8; g.stroke();
        } else {
          g.save(); g.shadowColor = live ? '#FFC93C' : '#FF7EB6'; g.shadowBlur = s.S * 0.04;
          path(pts, false); g.strokeStyle = live ? '#FFE27A' : '#FFB3D6'; g.lineWidth = w * .8; g.stroke(); g.restore();
          path(pts, false); g.strokeStyle = '#fff'; g.lineWidth = w * .28; g.stroke();
        }
      };
      s.ink.forEach(p => ink(p, false));
      if (s.cur) ink(s.cur, true);
      if (s.demo) {
        const d = s.demo; const k = Math.min(1, (t - d.t0) / d.dur);
        const i = Math.min(d.pts.length - 1, Math.floor(k * (d.pts.length - 1)));
        if (d.draw && d.ink) { d.ink.length = 0; d.pts.slice(0, i + 1).forEach(q => d.ink!.push(px(q))); }
        const [x, y] = px(d.pts[i]);
        g.beginPath(); g.arc(x, y, s.S * 0.05, 0, 7); g.fillStyle = d.draw ? '#9B6BFF' : 'rgba(255,255,255,.9)'; g.shadowColor = '#fff'; g.shadowBlur = 18; g.fill(); g.shadowBlur = 0;
        if (k >= 1) { s.demo = null; d.cb?.(); }
      }
    };
    s.raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(s.raf); ro.disconnect(); };
  }, [item, guide, medium]);

  /* ---------------- input ---------------- */
  const s = st.current;
  const toPx = ([x, y]: Pt): Pt => [s.S * 0.1 + x * s.S * 0.008, s.S * 0.1 + y * s.S * 0.008];
  const toTpl = ([x, y]: Pt): Pt => [(x - s.S * 0.1) / (s.S * 0.008), (y - s.S * 0.1) / (s.S * 0.008)];
  const tol = () => s.S * 0.8 * ((guide === 'full' ? 0.12 : guide === 'dots' ? 0.11 : 0.13) + s.tolBoost);
  const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const pos = (e: React.PointerEvent): Pt => { const r = cv.current!.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };

  const advance = (p: Pt) => {
    const tp = s.tpl[s.idx]; if (!tp) return;
    const look = Math.min(tp.length - 1, s.next + 3);
    for (let j = look; j >= s.next; j--) {
      if (dist(p, toPx(tp[j])) < tol()) {
        s.hits += 1; s.next = j + 1;
        if (performance.now() - s.lastTick > 60) { s.lastTick = performance.now(); sfx('tick', Math.round(s.next / tp.length * 12)); }
        break;
      }
    }
  };

  const down = (e: React.PointerEvent) => {
    if (s.finished || s.demo || s.pointer !== null) return; // satu jari sahaja (abaikan tapak tangan)
    s.pointer = e.pointerId; cv.current!.setPointerCapture(e.pointerId);
    const p = pos(e); s.cur = [p]; s.drawing = true;
    if (guide !== 'none') {
      const tp = s.tpl[s.idx];
      if (tp.length > 3 && dist(p, toPx(tp[0])) > tol() * 1.3 && dist(p, toPx(tp[tp.length - 1])) < tol() * 1.3) {
        s.drawing = false; onStrokeFeedback('wrong-dir'); sfx('wrong');
      }
      advance(p);
    }
  };
  const move = (e: React.PointerEvent) => {
    if (e.pointerId !== s.pointer || !s.cur) return;
    const p = pos(e); const last = s.cur[s.cur.length - 1];
    if (dist(p, last) < 2) return;
    s.cur.push(p);
    if (s.drawing && guide !== 'none') advance(p);
  };
  const up = (e: React.PointerEvent) => {
    if (e.pointerId !== s.pointer) return;
    s.pointer = null;
    const drawn = s.cur; s.cur = null;
    if (!drawn) return;
    if (guide === 'none') { freeEval(drawn); return; }
    const tp = s.tpl[s.idx];
    const ok = s.drawing && (tp.length === 1 ? s.next >= 1 : s.next >= tp.length - 2 && s.hits / tp.length >= 0.55);
    if (ok) { s.ink.push(drawn); s.totalHits += Math.min(tp.length, s.hits); strokeDone(); }
    else fail();
  };

  /** Mod tanpa panduan: padankan strok dengan mana-mana strok templat yang belum siap. */
  const freeEval = (drawn: Pt[]) => {
    let best = -1, bestCov = 0;
    s.tpl.forEach((tp, i) => {
      if (s.doneStrokes.includes(i)) return;
      const near = tp.filter(q => drawn.some(d => dist(d, toPx(q)) < tol())).length / tp.length;
      if (near > bestCov) { bestCov = near; best = i; }
    });
    if (best >= 0 && bestCov >= 0.6) {
      s.ink.push(drawn); s.doneStrokes.push(best); s.totalHits += Math.round(bestCov * s.tpl[best].length);
      sfx('correct'); onStrokeFeedback('good'); s.fails = 0;
      if (s.doneStrokes.length >= s.tpl.length) finish();
      else s.idx = s.tpl.findIndex((_, i) => !s.doneStrokes.includes(i));
    } else fail();
  };

  const strokeDone = () => {
    sfx('correct');
    s.doneStrokes.push(s.idx); s.idx++; s.next = 0; s.hits = 0; s.fails = 0;
    if (s.idx >= s.tpl.length) finish(); else onStrokeFeedback('good');
  };

  const fail = () => {
    s.fails++; s.next = 0; s.hits = 0;
    if (s.fails === 1) onStrokeFeedback('retry');
    else if (s.fails === 2) { s.helped++; s.tolBoost = Math.min(0.06, s.tolBoost + 0.03); onStrokeFeedback('demo'); demo(false); }
    else { s.helped += 2; onStrokeFeedback('assist'); assist(); }
  };

  const demo = (draw: boolean, cb?: () => void) => {
    const tp = s.tpl[s.idx]; if (!tp) return;
    const ink: Pt[] = [];
    if (draw) s.ink.push(ink);
    s.demo = { pts: tp.length === 1 ? [tp[0], tp[0]] : tp, t0: performance.now(), dur: 1100, draw, ink, cb };
  };
  const assist = () => demo(true, () => {
    if (guide === 'none') { s.doneStrokes.push(s.idx); s.totalHits += Math.round(s.tpl[s.idx].length * 0.5); if (s.doneStrokes.length >= s.tpl.length) finish(); else s.idx = s.tpl.findIndex((_, i) => !s.doneStrokes.includes(i)); s.fails = 0; sfx('correct'); }
    else { s.totalHits += Math.round(s.tpl[s.idx].length * 0.5); strokeDone(); }
  });

  const finish = () => {
    s.finished = true;
    const accuracy = Math.min(1, s.totalHits / Math.max(1, s.totalPts));
    const strokes = s.ink.map(p => p.filter((_, i) => i % 2 === 0 || i === p.length - 1).map(q => toTpl(q).map(v => Math.round(v))));
    onDone(accuracy, strokes, s.helped);
  };

  return (
    <div ref={wrap} className={`trace-board ${medium}`}>
      <canvas ref={cv} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-label="Kawasan menulis. Letak jari di titik ungu dan ikut laluan." />
      <button className="trace-help" onClick={() => { if (!s.demo && !s.finished) { s.helped++; onStrokeFeedback('demo'); demo(false); } }} aria-label="Tunjuk cara">
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M9 11V5a2 2 0 1 1 4 0v5l4.3 1a2 2 0 0 1 1.6 2.3L18 19a3 3 0 0 1-3 2.5H11a3 3 0 0 1-2.4-1.2L5 15.5a1.7 1.7 0 0 1 2.6-2.2z" fill="#fff" /></svg>
      </button>
    </div>
  );
}

/** Lukisan tulisan anak sebagai SVG (untuk huruf hidup & portfolio). */
export function WritingSvg({ strokes, size = 120, color = '#9B6BFF', alive = false }: { strokes: number[][][]; size?: number; color?: string; alive?: boolean }) {
  const d = strokes.map(s => s.length === 1 ? `M${s[0][0]} ${s[0][1]}h0.1` : 'M' + s.map(q => q.join(' ')).join(' L')).join(' ');
  const all = strokes.flat();
  const minY = Math.min(...all.map(p => p[1]), 100), maxY = Math.max(...all.map(p => p[1]), 0);
  const cx = all.length ? (Math.min(...all.map(p => p[0])) + Math.max(...all.map(p => p[0]))) / 2 : 50;
  return (
    <svg viewBox="-12 -14 124 124" width={size} height={size} className={alive ? 'writing alive' : 'writing'} aria-hidden="true">
      <g className="alive-body">
        <path d={d} fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" transform="translate(1.5 2.5)" />
        <path d={d} fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="writing-path" />
        {alive && <>
          <g transform={`translate(${cx} ${Math.max(0, minY - 4)})`}>
            <ellipse cx="-6" cy="0" rx="5" ry="6" fill="#fff" stroke="#3B2A4D" strokeWidth="1.2" /><circle cx="-5" cy="1" r="2.6" fill="#3B2A4D" />
            <ellipse cx="6" cy="0" rx="5" ry="6" fill="#fff" stroke="#3B2A4D" strokeWidth="1.2" /><circle cx="7" cy="1" r="2.6" fill="#3B2A4D" />
          </g>
          <path d={`M${cx - 8} ${maxY + 4} l-4 6 h6 M${cx + 8} ${maxY + 4} l4 6 h-6`} stroke="#FF9F6B" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>}
      </g>
    </svg>
  );
}
