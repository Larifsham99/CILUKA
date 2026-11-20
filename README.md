# CILUKA — Kecil-Kecil, Hebat-Hebat!

CILUKA ialah aplikasi permainan pembelajaran Bahasa Melayu untuk kanak-kanak berumur 3–6 tahun. Ia dibina sebagai PWA mobile-first: boleh dipasang pada telefon Android dan berfungsi tanpa internet selepas dipasang. Tiada iklan, tiada langganan, tiada akaun. Semua data anak disimpan dalam telefon.

- **Pelan produk:** [docs/CILUKA_Pelan_Produk.md](docs/CILUKA_Pelan_Produk.md)
- **Status pembangunan:** [DEVELOPMENT_STATUS.md](DEVELOPMENT_STATUS.md)
- **Prototaip awal (V0, rujukan sahaja):** [prototype-v0/](prototype-v0/)

## Teknologi

React 18 · TypeScript (strict) · Vite 6 · vite-plugin-pwa (Workbox) · CSS biasa (tiada rangka kerja CSS) · SVG asli untuk semua ilustrasi · Web Audio untuk kesan bunyi · localStorage untuk data · Vitest + Playwright untuk ujian.

## Cara menjalankan

```bash
npm install
npm run dev          # pelayan pembangunan: http://localhost:5173 (juga boleh dibuka dari telefon dalam rangkaian sama)
```

## Build production

```bash
npm run typecheck    # semakan TypeScript
npm test             # ujian unit (Vitest)
npm run build        # hasil dalam folder dist/
npm run preview      # pratonton build: http://localhost:4173
npm run test:e2e     # ujian hujung-ke-hujung (perlu `npm run preview` berjalan)
```

Folder `dist/` ialah laman statik. Muat naik ke mana-mana hosting statik HTTPS (cth. Netlify, Cloudflare Pages, GitHub Pages, Firebase Hosting). HTTPS diperlukan untuk service worker dan pemasangan PWA.

## Cara memasang pada telefon Android

1. Buka alamat CILUKA dalam **Google Chrome**.
2. Tunggu halaman dimuat sepenuhnya (aset disimpan untuk kegunaan luar talian).
3. Tekan menu **⋮** → **Pasang aplikasi** / **Tambah ke skrin utama**. (Atau dalam aplikasi: Ruang Ibu Bapa → Tetapan → **Pasang CILUKA**.)
4. Ikon CILUKA muncul di skrin utama. Ia dibuka skrin penuh dan berfungsi tanpa internet.

Untuk suara arahan yang lebih baik, pasang suara **Bahasa Melayu** dalam tetapan Text-to-Speech telefon (Tetapan → Pengurusan am → Output teks-ke-pertuturan).

## Struktur kod

```
src/
  audio/        suara (rakaman tempatan → suara peranti → teks) & kesan bunyi Web Audio
  characters/   Pip (maskot, 9 ekspresi) & avatar haiwan
  components/   UI asas, pintu ibu bapa, ilustrasi objek (SVG), lencana
  data/         huruf, perkataan, templat tulisan A–Z/a–z, dunia, dialog, ganjaran, jenis data
  games/        11 permainan + papan menulis
  hooks/        kedai keadaan (useStore)
  pages/        Peta Dunia, Pulau, Permainan, Profil, Koleksi, Ruang Ibu Bapa
  services/     enjin pembelajaran (Kompas Pip), tahap, misi harian, ganjaran
  storage/      storan setempat, pemulihan data rosak, sandaran
  utils/        tarikh (waktu Malaysia), penghala hash, pemasangan PWA
  worlds/       ilustrasi pulau
tests/e2e/      ujian Playwright
```

## Deploy (GitHub Pages)

Fail `.github/workflows/deploy-pages.yml` membina dan menerbitkan aplikasi secara automatik setiap kali kod di-push ke `main` atau `ccr-da07db69-i51u18`. Sekali sahaja: di GitHub, buka **Settings → Pages → Build and deployment → Source: GitHub Actions**. Alamat: `https://larifsham99.github.io/CILUKA/`.
