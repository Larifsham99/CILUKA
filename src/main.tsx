import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/andika/400.css';
import '@fontsource/andika/700.css';
import '@fontsource/baloo-2/600.css';
import '@fontsource/baloo-2/800.css';
import './styles/global.css';
import App from './App';
import { requestPersistence } from './storage/storage';

requestPersistence();

// Cangkuk ujian automatik (hanya aktif dengan ?ujian dalam URL) — tidak menjejaskan pengguna.
if (new URLSearchParams(location.search).has('ujian')) {
  Promise.all([import('./data/strokes'), import('./data/words')]).then(([st, w]) => {
    (window as unknown as Record<string, unknown>).__ciluka = { strokesFor: st.strokesFor, WORD_MAP: w.WORD_MAP };
  });
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);

// Daftar service worker (luar talian). Tidak didaftarkan semasa pembangunan.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  import('virtual:pwa-register').then(({ registerSW }) => registerSW({ immediate: true })).catch(() => undefined);
}
document.getElementById('splash')?.remove();
