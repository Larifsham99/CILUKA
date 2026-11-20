/** Ilustrasi pulau terapung untuk setiap dunia (SVG asli). */
import type { ReactElement } from 'react';
import type { WorldId } from '../data/types';

const o = { stroke: '#3B2A4D', strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

const LANDMARK: Record<WorldId, ReactElement> = {
  'letter-land': <g>
    <path d="M30 70 q50 -70 100 0" stroke="#FF7EB6" strokeWidth="7" fill="none" /><path d="M36 70 q44 -60 88 0" stroke="#FFC93C" strokeWidth="6" fill="none" /><path d="M42 70 q38 -50 76 0" stroke="#2EC4B6" strokeWidth="6" fill="none" />
    <rect x="44" y="52" width="26" height="26" rx="5" fill="#FF7EB6" {...o} /><text x="57" y="72" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="Andika, sans-serif">A</text>
    <rect x="76" y="46" width="28" height="32" rx="5" fill="#9B6BFF" {...o} /><text x="90" y="70" textAnchor="middle" fontSize="22" fontWeight="800" fill="#fff" fontFamily="Andika, sans-serif">b</text>
    <rect x="108" y="56" width="22" height="22" rx="5" fill="#FFC93C" {...o} /><text x="119" y="73" textAnchor="middle" fontSize="17" fontWeight="800" fill="#3B2A4D" fontFamily="Andika, sans-serif">c</text>
  </g>,
  'scribble-valley': <g>
    <path d="M30 78 q20 -30 40 0 q20 -40 50 0z" fill="#FFB98A" {...o} />
    <g transform="rotate(20 96 44)"><rect x="88" y="14" width="16" height="56" rx="3" fill="#FFC93C" {...o} /><path d="M88 70 l8 16 l8 -16z" fill="#FFE7BF" {...o} /><path d="M93 80 l3 6 l3 -6z" fill="#3B2A4D" /><rect x="88" y="14" width="16" height="10" fill="#FF7EB6" {...o} /></g>
    <path d="M40 50 q8 -10 16 0 t16 0" stroke="#9B6BFF" strokeWidth="4" fill="none" strokeLinecap="round" />
  </g>,
  'memory-jungle': <g>
    <path d="M76 80 v-26" stroke="#8D5A35" strokeWidth="10" strokeLinecap="round" />
    <circle cx="76" cy="36" r="26" fill="#5FA82A" {...o} /><circle cx="54" cy="48" r="16" fill="#7CC43F" {...o} /><circle cx="98" cy="48" r="16" fill="#7CC43F" {...o} />
    <rect x="40" y="58" width="18" height="24" rx="3" fill="#fff" {...o} transform="rotate(-12 49 70)" /><rect x="96" y="58" width="18" height="24" rx="3" fill="#FFC93C" {...o} transform="rotate(10 105 70)" />
    <text x="49" y="76" textAnchor="middle" fontSize="13" fontWeight="800" fill="#9B6BFF" transform="rotate(-12 49 70)" fontFamily="Andika, sans-serif">?</text>
  </g>,
  'sound-forest': <g>
    <path d="M50 80 v-18" stroke="#fff" strokeWidth="8" /><path d="M30 62 q20 -26 40 0z" fill="#FF7EB6" {...o} /><circle cx="42" cy="54" r="3" fill="#fff" /><circle cx="56" cy="50" r="3" fill="#fff" />
    <path d="M96 80 v-24" stroke="#fff" strokeWidth="9" /><path d="M72 58 q24 -34 48 0z" fill="#2EC4B6" {...o} /><circle cx="88" cy="46" r="3.5" fill="#fff" /><circle cx="104" cy="50" r="3" fill="#fff" />
    <g fill="#9B6BFF"><circle cx="70" cy="28" r="5" /><path d="M74 28 v-16 l10 -3 v14" stroke="#9B6BFF" strokeWidth="3" fill="none" /><circle cx="84" cy="24" r="4" /></g>
  </g>,
  'syllable-village': <g>
    <path d="M44 80 v-14 M100 80 v-14" stroke="#8D5A35" strokeWidth="4" />
    <rect x="40" y="46" width="64" height="22" fill="#FFE7BF" {...o} /><path d="M32 48 l40 -30 l40 30z" fill="#E86F4C" {...o} /><rect x="64" y="52" width="14" height="16" fill="#B07A43" {...o} />
    <g><path d="M118 30 v40" stroke="#8D5A35" strokeWidth="3" /><ellipse cx="118" cy="32" rx="8" ry="10" fill="#FFC93C" {...o} /></g>
  </g>,
  'spelling-station': <g>
    <path d="M24 80 h112" stroke="#8D5A35" strokeWidth="4" />
    <rect x="30" y="46" width="34" height="28" rx="6" fill="#FF3D6E" {...o} /><rect x="36" y="52" width="12" height="10" rx="2" fill="#8ED8F8" {...o} /><rect x="38" y="34" width="10" height="12" fill="#3B2A4D" />
    <rect x="68" y="52" width="26" height="22" rx="4" fill="#FFC93C" {...o} /><text x="81" y="69" textAnchor="middle" fontSize="15" fontWeight="800" fill="#3B2A4D" fontFamily="Andika, sans-serif">B</text>
    <rect x="98" y="52" width="26" height="22" rx="4" fill="#2EC4B6" {...o} /><text x="111" y="69" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="Andika, sans-serif">A</text>
    <g fill="#3B2A4D"><circle cx="40" cy="76" r="4" /><circle cx="56" cy="76" r="4" /><circle cx="74" cy="76" r="4" /><circle cx="88" cy="76" r="4" /><circle cx="104" cy="76" r="4" /><circle cx="118" cy="76" r="4" /></g>
    <path d="M42 30 q-6 -10 4 -14 q4 -8 12 -4" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
  </g>,
  'magic-word-island': <g>
    <path d="M54 80 q-2 -30 6 -50" stroke="#8D5A35" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M60 30 q-22 -8 -34 6 q18 -2 34 -6 q-12 -18 -32 -14 q20 6 32 14 q8 -20 28 -18 q-18 6 -28 18 q24 -6 34 8 q-18 -4 -34 -8z" fill="#7CC43F" {...o} />
    <path d="M80 60 q14 -6 28 0 v18 q-14 -6 -28 0z M108 60 q14 -6 28 0 v18 q-14 -6 -28 0z" fill="#fff" {...o} />
    <g fill="#FFC93C"><path d="M118 38 l3 7 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1z" /></g>
  </g>,
  'star-castle': <g>
    <rect x="46" y="40" width="68" height="40" fill="#F4E9F7" {...o} />
    <rect x="34" y="28" width="20" height="52" fill="#E8DDFF" {...o} /><rect x="106" y="28" width="20" height="52" fill="#E8DDFF" {...o} />
    <path d="M30 30 l14 -18 l14 18z M102 30 l14 -18 l14 18z" fill="#9B6BFF" {...o} /><path d="M62 42 l18 -22 l18 22z" fill="#FF7EB6" {...o} />
    <path d="M72 80 v-18 q8 -10 16 0 v18" fill="#9B6BFF" {...o} />
    <path d="M80 20 v-12" stroke="#3B2A4D" strokeWidth="2" /><path d="M80 8 l12 4 l-12 4z" fill="#FFC93C" {...o} />
    <path d="M80 50 l2.5 5 l5.5 .8 l-4 3.8 l1 5.4 l-5 -2.6 l-5 2.6 l1 -5.4 l-4 -3.8 l5.5 -.8z" fill="#FFC93C" />
  </g>
};

export function IslandArt({ world, color, locked }: { world: WorldId; color: string; locked?: boolean }) {
  return (
    <svg viewBox="0 0 160 120" className="island-art" aria-hidden="true">
      <ellipse cx="80" cy="112" rx="48" ry="5" fill="rgba(59,42,77,.12)" />
      <path d="M22 84 q58 18 116 0 l-24 22 q-18 10 -34 10 q-16 0 -34 -10z" fill="#B07A43" stroke="#3B2A4D" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M40 100 l10 12 M76 104 v12 M110 98 l-6 12" stroke="#8D5A35" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="80" cy="82" rx="60" ry="14" fill={color} stroke="#3B2A4D" strokeWidth="2.5" />
      <ellipse cx="72" cy="78" rx="40" ry="6" fill="rgba(255,255,255,.3)" />
      <g opacity={locked ? 0.35 : 1}>{LANDMARK[world]}</g>
    </svg>
  );
}
