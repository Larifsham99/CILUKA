/** Pip — anak burung tempua ajaib bertopi anyaman. SVG asli dengan pelbagai ekspresi. */
import { useId } from 'react';
import type { PipMood } from '../data/types';

interface Props { mood?: PipMood; size?: number; className?: string; onClick?: () => void }

export function Pip({ mood = 'idle', size = 120, className = '', onClick }: Props) {
  const id = useId().replace(/:/g, '');
  const eyes = (() => {
    switch (mood) {
      case 'happy': case 'cheer': case 'celebrate':
        return <g><path d="M38 80 q8 -10 16 0" /><path d="M66 80 q8 -10 16 0" /></g>;
      case 'sleep':
        return <g><path d="M38 80 q8 6 16 0" /><path d="M66 80 q8 6 16 0" /></g>;
      default: {
        const big = mood === 'surprised' || mood === 'excited';
        const look = mood === 'thinking' ? -3 : 0;
        const pupY = mood === 'sad' ? 82 : 80;
        return (
          <g className="pip-eyes" style={{ stroke: 'none' }}>
            <ellipse cx="46" cy="78" rx={big ? 10.5 : 9} ry={big ? 12.5 : 11} fill="#fff" />
            <ellipse cx="74" cy="78" rx={big ? 10.5 : 9} ry={big ? 12.5 : 11} fill="#fff" />
            <circle cx={48 + look} cy={pupY - (mood === 'thinking' ? 3 : 0)} r={big ? 6.5 : 6} fill="#3B2A4D" />
            <circle cx={72 + look} cy={pupY - (mood === 'thinking' ? 3 : 0)} r={big ? 6.5 : 6} fill="#3B2A4D" />
            <circle cx={50 + look} cy={77} r="2.2" fill="#fff" />
            <circle cx={74 + look} cy={77} r="2.2" fill="#fff" />
            {mood === 'excited' && <><path d="M30 70 l-5 -4 M30 76 l-6 0" stroke="#FFC93C" strokeWidth="2.5" /><path d="M90 70 l5 -4 M90 76 l6 0" stroke="#FFC93C" strokeWidth="2.5" /></>}
          </g>
        );
      }
    }
  })();
  const brows = mood === 'sad' ? 'M38 66 q8 -2 15 3 M67 69 q7 -5 15 -3'
    : mood === 'thinking' ? 'M38 62 q8 -6 15 -2 M67 66 q7 -2 15 0'
    : mood === 'surprised' || mood === 'excited' ? 'M38 60 q8 -6 15 -2 M67 58 q7 -4 15 2'
    : 'M38 64 q8 -5 15 -1 M67 63 q7 -4 15 1';
  const mouth = mood === 'surprised' ? <ellipse cx="60" cy="98" rx="4" ry="5" fill="#E5602A" />
    : mood === 'sad' ? <path d="M54 100 q6 -4 12 0" stroke="#E5602A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    : mood === 'happy' || mood === 'cheer' || mood === 'celebrate' || mood === 'excited' ? <path d="M53 96 q7 8 14 0 z" fill="#E5602A" />
    : null;
  const wingsUp = mood === 'cheer' || mood === 'celebrate' || mood === 'excited';
  return (
    <svg className={`pip pip-${mood} ${className}`} width={size} height={size * 1.1} viewBox="0 0 120 132" onClick={onClick} role="img" aria-label="Pip">
      <defs>
        <radialGradient id={`b${id}`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFE27A" /><stop offset=".6" stopColor="#FFC93C" /><stop offset="1" stopColor="#FF9F6B" />
        </radialGradient>
        <linearGradient id={`h${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5FE0D3" /><stop offset="1" stopColor="#1FA89C" /></linearGradient>
        <pattern id={`w${id}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill={`url(#h${id})`} /><rect width="4" height="8" fill="rgba(255,255,255,.2)" /><rect width="8" height="1.2" fill="rgba(0,0,0,.12)" />
        </pattern>
      </defs>
      <ellipse cx="60" cy="127" rx="34" ry="5" fill="rgba(0,0,0,.14)" />
      <g className="pip-body">
        <path d="M92 104 q20 -2 22 -18 q-10 6 -18 4" fill="#9BDE4A" stroke="#6CB83A" strokeWidth="2" />
        <g className={`pip-wing-l ${wingsUp ? 'up' : ''}`}><ellipse cx="24" cy="92" rx="10" ry="17" fill="#FF9F6B" transform="rotate(20 24 92)" /></g>
        <g className={`pip-wing-r ${wingsUp ? 'up' : ''}`}><ellipse cx="96" cy="92" rx="10" ry="17" fill="#FF9F6B" transform="rotate(-20 96 92)" /></g>
        <circle cx="60" cy="86" r="38" fill={`url(#b${id})`} />
        <ellipse cx="60" cy="102" rx="22" ry="16" fill="#FFF3C9" opacity=".85" />
        <path d="M44 124 l-4 6 M44 124 l0 7 M44 124 l4 6 M76 124 l-4 6 M76 124 l0 7 M76 124 l4 6" stroke="#FF9F6B" strokeWidth="3" strokeLinecap="round" />
        <g stroke="#3B2A4D" strokeWidth="3" fill="none" strokeLinecap="round">{eyes}</g>
        <path d={brows} stroke="#3B2A4D" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M55 88 l5 6 l5 -6 z" fill="#FF7A3D" stroke="#E5602A" strokeWidth="1.5" strokeLinejoin="round" />
        {mouth}
        <ellipse cx="36" cy="94" rx="6" ry="4" fill="#FF7EB6" opacity=".55" />
        <ellipse cx="84" cy="94" rx="6" ry="4" fill="#FF7EB6" opacity=".55" />
        {mood === 'sad' && <path d="M84 84 q-3 6 0 9 q3 -3 0 -9" fill="#8ED8F8" />}
        <path d="M24 60 Q60 -6 96 60 Q60 48 24 60 z" fill={`url(#w${id})`} stroke="#178C82" strokeWidth="2" strokeLinejoin="round" />
        <path d="M26 59 Q60 47 94 59" stroke="#FFC93C" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path className="pip-curl" d="M60 13 q4 -12 16 -8 q10 5 2 13 q-6 4 -8 -2" stroke="#1FA89C" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        {mood === 'celebrate' && <g><path d="M8 30 l4 8 l8 -2 l-6 6 l4 8 l-8 -4 l-6 6 l1 -9 l-8 -4 l9 -1z" fill="#FFC93C" /><circle cx="110" cy="30" r="4" fill="#FF7EB6" /><circle cx="104" cy="14" r="3" fill="#2EC4B6" /></g>}
        {mood === 'thinking' && <g fill="#fff" stroke="#9B6BFF" strokeWidth="2"><circle cx="102" cy="40" r="4" /><circle cx="110" cy="26" r="6" /></g>}
        {mood === 'sleep' && <text x="92" y="40" fontSize="16" fontWeight="800" fill="#9B6BFF" fontFamily="Baloo 2, sans-serif">z</text>}
      </g>
    </svg>
  );
}
