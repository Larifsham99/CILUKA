/** Komponen UI asas CILUKA. */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { sfx, unlockAudio } from '../audio/audio';

export function Btn({ children, onClick, variant = 'sun', size = 'md', className = '', disabled, label, type = 'button' }: {
  children: ReactNode; onClick?: () => void; variant?: 'sun' | 'pink' | 'aqua' | 'purple' | 'lime' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; disabled?: boolean; label?: string; type?: 'button' | 'submit';
}) {
  return (
    <button type={type} aria-label={label} disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={() => { unlockAudio(); sfx('tap'); onClick?.(); }}>
      {children}
    </button>
  );
}

export function IconBtn({ children, onClick, label, className = '' }: { children: ReactNode; onClick: () => void; label: string; className?: string }) {
  return <button type="button" aria-label={label} title={label} className={`icon-btn ${className}`} onClick={() => { unlockAudio(); sfx('tap'); onClick(); }}>{children}</button>;
}

export function Modal({ open, onClose, children, title, wide }: { open: boolean; onClose: () => void; children: ReactNode; title?: string; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-back" onClick={onClose} role="presentation">
      <div className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}>
        <button className="modal-x" aria-label="Tutup" onClick={onClose}>✕</button>
        {title && <h2 className="modal-title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

/** Pintu ibu bapa: soalan tambah dengan papan nombor — sukar dijawab anak kecil secara tidak sengaja. */
export function ParentGate({ open, onPass, onClose, reason }: { open: boolean; onPass: () => void; onClose: () => void; reason?: string }) {
  const [q, setQ] = useState(() => newQ());
  const [ans, setAns] = useState('');
  const [err, setErr] = useState(false);
  useEffect(() => { if (open) { setQ(newQ()); setAns(''); setErr(false); } }, [open]);
  const press = (n: string) => {
    setErr(false);
    const v = (ans + n).slice(0, 3);
    setAns(v);
    if (v.length >= String(q.a + q.b).length) {
      if (Number(v) === q.a + q.b) { setTimeout(onPass, 120); }
      else { setErr(true); sfx('wrong'); setTimeout(() => { setAns(''); setQ(newQ()); }, 700); }
    }
  };
  return (
    <Modal open={open} onClose={onClose} title="Untuk Ibu Bapa">
      <p className="gate-reason">{reason ?? 'Sila jawab untuk teruskan.'}</p>
      <p className="gate-q">{q.a} + {q.b} = <span className={`gate-ans ${err ? 'err' : ''}`}>{ans || '?'}</span></p>
      <div className="numpad">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(n => <button key={n} type="button" onClick={() => press(n)}>{n}</button>)}
        <button type="button" onClick={() => setAns('')} aria-label="Padam">⌫</button>
      </div>
      {err && <p className="gate-err">Belum betul. Cuba soalan baharu.</p>}
    </Modal>
  );
}
function newQ() { return { a: 6 + Math.floor(Math.random() * 9), b: 5 + Math.floor(Math.random() * 9) }; }

/** Butang sentuh-dan-tahan (untuk tindakan ibu bapa). */
export function HoldButton({ children, onHold, label, className = '', ms = 1500 }: { children: ReactNode; onHold: () => void; label: string; className?: string; ms?: number }) {
  const [holding, setHolding] = useState(false);
  const t = useRef<number>();
  const start = () => { setHolding(true); t.current = window.setTimeout(() => { setHolding(false); onHold(); }, ms); };
  const stop = () => { setHolding(false); clearTimeout(t.current); };
  return (
    <button type="button" aria-label={label} title={label} className={`hold-btn ${holding ? 'holding' : ''} ${className}`}
      style={{ ['--hold' as string]: ms + 'ms' }}
      onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop}
      onContextMenu={e => e.preventDefault()}
      onKeyDown={e => { if (e.key === 'Enter') onHold(); }}>
      {children}<i className="hold-ring" />
    </button>
  );
}

export function Stars({ n, max = 3, size = 22 }: { n: number; max?: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${n} daripada ${max} bintang`}>
      {Array.from({ length: max }, (_, i) => <StarIcon key={i} on={i < n} size={size} />)}
    </span>
  );
}

export function StarIcon({ on = true, size = 22 }: { on?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={on ? 'star-on' : 'star-off'}>
      <path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.3l6.6-.8z" />
    </svg>
  );
}

export function Confetti({ run }: { run: number }) {
  const [pieces, setPieces] = useState<{ id: number; left: number; color: string; dur: number; delay: number; rot: number }[]>([]);
  useEffect(() => {
    if (!run) return;
    const cols = ['#FFC93C', '#FF7EB6', '#2EC4B6', '#9B6BFF', '#9BDE4A', '#FF9F6B'];
    const p = Array.from({ length: 34 }, (_, i) => ({ id: run * 100 + i, left: Math.random() * 100, color: cols[i % cols.length], dur: 1.6 + Math.random() * 1.2, delay: Math.random() * 0.3, rot: Math.random() * 360 }));
    setPieces(p);
    const t = setTimeout(() => setPieces([]), 3200);
    return () => clearTimeout(t);
  }, [run]);
  return <div className="confetti-layer" aria-hidden="true">{pieces.map(p => <i key={p.id} style={{ left: p.left + '%', background: p.color, animationDuration: p.dur + 's', animationDelay: p.delay + 's', transform: `rotate(${p.rot}deg)` }} />)}</div>;
}

export function ProgressDots({ done, total }: { done: number; total: number }) {
  return <div className="pdots" aria-label={`${done} daripada ${total}`}>{Array.from({ length: total }, (_, i) => <i key={i} className={i < done ? 'on' : ''} />)}</div>;
}
