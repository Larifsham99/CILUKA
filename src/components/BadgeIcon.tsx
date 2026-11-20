/** Ikon lencana (SVG) — medal bulat dengan simbol. */
export function BadgeIcon({ icon, color, size = 64, locked }: { icon: string; color: string; size?: number; locked?: boolean }) {
  const sym: Record<string, JSX.Element> = {
    foot: <g fill="#fff"><ellipse cx="50" cy="56" rx="11" ry="15" /><circle cx="40" cy="36" r="4" /><circle cx="48" cy="33" r="4" /><circle cx="56" cy="34" r="4" /><circle cx="62" cy="39" r="3.5" /></g>,
    abc: <text x="50" y="60" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff" fontFamily="Andika, sans-serif">abc</text>,
    crown: <path d="M30 62 L32 38 L42 50 L50 32 L58 50 L68 38 L70 62z" fill="#fff" />,
    pencil: <g transform="rotate(40 50 50)"><rect x="44" y="26" width="12" height="40" rx="2" fill="#fff" /><path d="M44 66 l6 12 l6 -12z" fill="#fff" /></g>,
    egg: <ellipse cx="50" cy="52" rx="15" ry="19" fill="#fff" />,
    ear: <path d="M42 66 q-6 -6 -6 -20 a14 14 0 0 1 28 0 q0 10 -8 14 q-4 2 -4 8 q0 6 -6 6" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />,
    brain: <g fill="#fff"><circle cx="42" cy="46" r="11" /><circle cx="58" cy="46" r="11" /><circle cx="50" cy="58" r="11" /></g>,
    flag: <g><path d="M38 28 v44" stroke="#fff" strokeWidth="5" strokeLinecap="round" /><path d="M40 30 h26 l-6 9 l6 9 h-26z" fill="#fff" /></g>,
    star: <path d="M50 28 l7 14 15 2 -11 10 3 15 -14 -7 -14 7 3 -15 -11 -10 15 -2z" fill="#fff" />,
    trophy: <g fill="#fff"><path d="M36 30 h28 v12 a14 14 0 0 1 -28 0z" /><path d="M46 56 h8 v8 h-8z M38 66 h24 v6 h-24z" /><path d="M36 34 h-6 a6 6 0 0 0 8 10 M64 34 h6 a6 6 0 0 1 -8 10" stroke="#fff" strokeWidth="3" fill="none" /></g>
  };
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" className={locked ? 'badge-locked' : ''}>
      <path d="M32 6 l8 20 M68 6 l-8 20" stroke={locked ? '#C9C1D6' : '#FF7EB6'} strokeWidth="8" strokeLinecap="round" />
      <circle cx="50" cy="52" r="34" fill={locked ? '#E6E0EC' : color} stroke="#3B2A4D" strokeWidth="3" />
      <circle cx="50" cy="52" r="27" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="3" strokeDasharray="4 5" />
      {locked ? <text x="50" y="62" textAnchor="middle" fontSize="28" fontWeight="800" fill="#B3A8C2" fontFamily="Baloo 2, sans-serif">?</text> : sym[icon] ?? sym.star}
    </svg>
  );
}
