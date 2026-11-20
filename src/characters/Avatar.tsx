/** Avatar haiwan asli (SVG) + aksesori pilihan. */
import type { AvatarId } from '../data/types';

export const AVATARS: { id: AvatarId; name: string; color: string; dark: string }[] = [
  { id: 'kucing', name: 'Kucing', color: '#FFB067', dark: '#D97A2B' },
  { id: 'arnab', name: 'Arnab', color: '#F4E9F7', dark: '#C9A6D6' },
  { id: 'beruang', name: 'Beruang', color: '#C58B5C', dark: '#8D5A35' },
  { id: 'katak', name: 'Katak', color: '#9BDE4A', dark: '#5FA82A' },
  { id: 'singa', name: 'Singa', color: '#FFD66B', dark: '#E39A2D' },
  { id: 'panda', name: 'Panda', color: '#FFFFFF', dark: '#3B2A4D' },
  { id: 'monyet', name: 'Monyet', color: '#B98055', dark: '#7A4E2E' },
  { id: 'penguin', name: 'Penguin', color: '#5B6C9E', dark: '#2E3A60' }
];

interface Props { id: AvatarId; size?: number; accessory?: string | null }

export function Avatar({ id, size = 64, accessory }: Props) {
  const a = AVATARS.find(x => x.id === id) ?? AVATARS[0];
  const face = id === 'penguin' ? '#fff' : id === 'monyet' ? '#F3D2B0' : a.color;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={a.name} className="avatar-svg">
      {id === 'singa' && <circle cx="50" cy="54" r="44" fill={a.dark} />}
      {id === 'arnab' && <g fill={a.color} stroke={a.dark} strokeWidth="3"><ellipse cx="34" cy="20" rx="9" ry="22" /><ellipse cx="66" cy="20" rx="9" ry="22" /></g>}
      {id === 'kucing' && <g fill={a.color} stroke={a.dark} strokeWidth="3" strokeLinejoin="round"><path d="M18 40 L22 10 L44 28 z" /><path d="M82 40 L78 10 L56 28 z" /></g>}
      {(id === 'beruang' || id === 'panda' || id === 'monyet') && <g fill={id === 'panda' ? a.dark : a.dark}><circle cx="22" cy="28" r="12" /><circle cx="78" cy="28" r="12" /></g>}
      {id === 'monyet' && <g fill="#F3D2B0"><circle cx="12" cy="56" r="10" /><circle cx="88" cy="56" r="10" /></g>}
      {id === 'katak' && <g fill={a.color} stroke={a.dark} strokeWidth="3"><circle cx="30" cy="26" r="14" /><circle cx="70" cy="26" r="14" /></g>}
      <circle cx="50" cy="56" r="36" fill={id === 'penguin' ? a.color : a.color} stroke={a.dark} strokeWidth="3" />
      {id === 'penguin' && <ellipse cx="50" cy="62" rx="26" ry="28" fill="#fff" />}
      {id === 'monyet' && <ellipse cx="50" cy="62" rx="24" ry="22" fill={face} />}
      {id === 'panda' && <g fill={a.dark}><ellipse cx="36" cy="52" rx="10" ry="12" transform="rotate(-20 36 52)" /><ellipse cx="64" cy="52" rx="10" ry="12" transform="rotate(20 64 52)" /></g>}
      {id === 'katak'
        ? <g><circle cx="30" cy="26" r="7" fill="#fff" /><circle cx="70" cy="26" r="7" fill="#fff" /><circle cx="31" cy="27" r="4" fill="#3B2A4D" /><circle cx="69" cy="27" r="4" fill="#3B2A4D" /></g>
        : <g fill={id === 'panda' ? '#fff' : '#3B2A4D'}><circle cx="37" cy="52" r="5" /><circle cx="63" cy="52" r="5" /><circle cx="38.5" cy="50.5" r="1.6" fill="#fff" /><circle cx="64.5" cy="50.5" r="1.6" fill="#fff" /></g>}
      {id === 'panda' && <g fill="#3B2A4D"><circle cx="37" cy="53" r="3.4" /><circle cx="63" cy="53" r="3.4" /></g>}
      <ellipse cx="50" cy="64" rx="5" ry="3.6" fill={id === 'penguin' ? '#FFB067' : '#3B2A4D'} />
      <path d="M43 70 q7 6 14 0" stroke="#3B2A4D" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="66" rx="6" ry="4" fill="#FF7EB6" opacity=".55" />
      <ellipse cx="72" cy="66" rx="6" ry="4" fill="#FF7EB6" opacity=".55" />
      {accessory && <Accessory id={accessory} />}
    </svg>
  );
}

export function Accessory({ id }: { id: string }) {
  switch (id) {
    case 'topi-parti': return <g><path d="M50 2 L36 30 L64 30 z" fill="#FF7EB6" stroke="#C94D86" strokeWidth="2" /><path d="M42 18 h16 M39 25 h22" stroke="#FFC93C" strokeWidth="3" /><circle cx="50" cy="3" r="5" fill="#FFC93C" /></g>;
    case 'reben': return <g fill="#9B6BFF" stroke="#6A3FD1" strokeWidth="2"><path d="M70 22 l14 -10 l2 18 z" /><path d="M70 22 l-14 -10 l-2 18 z" transform="translate(4 0)" /><circle cx="72" cy="22" r="5" /></g>;
    case 'cermin-mata': return <g fill="rgba(142,216,248,.35)" stroke="#3B2A4D" strokeWidth="3"><circle cx="37" cy="52" r="10" /><circle cx="63" cy="52" r="10" /><path d="M47 52 h6" /></g>;
    case 'bunga-telinga': return <g transform="translate(22 30)"><g fill="#FF3D6E">{[0, 72, 144, 216, 288].map(r => <ellipse key={r} cx="0" cy="-8" rx="6" ry="9" transform={`rotate(${r})`} />)}</g><circle r="3.5" fill="#FFC93C" /></g>;
    case 'topi-pelukis': return <g><ellipse cx="50" cy="24" rx="30" ry="9" fill="#9B6BFF" /><ellipse cx="44" cy="17" rx="22" ry="12" fill="#9B6BFF" /><circle cx="62" cy="10" r="4" fill="#9B6BFF" /><circle cx="36" cy="18" r="3" fill="#FFC93C" /><circle cx="48" cy="14" r="3" fill="#FF7EB6" /></g>;
    case 'mahkota': return <g><path d="M28 30 L30 8 L40 20 L50 4 L60 20 L70 8 L72 30 z" fill="#FFC93C" stroke="#D49A00" strokeWidth="2" strokeLinejoin="round" /><circle cx="50" cy="22" r="3.5" fill="#FF7EB6" /><circle cx="38" cy="25" r="2.5" fill="#2EC4B6" /><circle cx="62" cy="25" r="2.5" fill="#2EC4B6" /></g>;
    default: return null;
  }
}
