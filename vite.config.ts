import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['icons/*.svg', 'icons/*.png'],
      manifest: {
        name: 'CILUKA — Kecil-Kecil, Hebat-Hebat!',
        short_name: 'CILUKA',
        description: 'Dunia pengembaraan belajar huruf, menulis dan mengeja untuk kanak-kanak 3–6 tahun.',
        lang: 'ms',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#7FD0F6',
        theme_color: '#FFC93C',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,mp3,ogg}'],
        navigateFallback: 'index.html'
      }
    })
  ],
  test: { environment: 'jsdom' }
} as any);
