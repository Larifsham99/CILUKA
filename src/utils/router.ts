/** Penghala hash ringkas — berfungsi offline dan dalam PWA tanpa konfigurasi pelayan. */
import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'profiles' }
  | { name: 'world'; id: string }
  | { name: 'game'; id: string; level?: number; mission: boolean }
  | { name: 'collection' }
  | { name: 'parent' };

export function parseHash(hash: string): Route {
  const h = hash.replace(/^#\/?/, '');
  const [path, query = ''] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  const q = new URLSearchParams(query);
  switch (parts[0]) {
    case 'profil': return { name: 'profiles' };
    case 'dunia': return parts[1] ? { name: 'world', id: parts[1] } : { name: 'home' };
    case 'main': {
      const lvl = Number(q.get('tahap'));
      return parts[1] ? { name: 'game', id: parts[1], level: lvl >= 1 && lvl <= 5 ? lvl : undefined, mission: q.get('misi') === '1' } : { name: 'home' };
    }
    case 'koleksi': return { name: 'collection' };
    case 'ibubapa': return { name: 'parent' };
    default: return { name: 'home' };
  }
}

export function go(path: string, replace = false) {
  const url = '#/' + path.replace(/^#?\/?/, '');
  if (replace) history.replaceState(null, '', url); else location.hash = url;
  if (replace) window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function useRoute(): Route {
  const [r, setR] = useState(() => parseHash(location.hash));
  useEffect(() => {
    const on = () => setR(parseHash(location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return r;
}
