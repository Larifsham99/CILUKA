# Status Pembangunan CILUKA

Kemas kini terakhir: 20 November 2026 · Versi 1.0.0

## Siap dan diuji

### Asas
- [x] React 18 + TypeScript strict + Vite 6, struktur modul (`src/audio, characters, components, data, games, hooks, pages, services, storage, utils, worlds`)
- [x] Sistem reka bentuk: palet 7 warna, Andika (bentuk huruf sekolah: a & g satu tingkat) + Baloo 2, dimuat dari pakej tempatan (berfungsi offline)
- [x] Penghala hash (berfungsi offline/PWA), skrin pemuatan, ErrorBoundary, notis data rosak
- [x] PWA: manifest, ikon 192/512/SVG, service worker Workbox (precache semua aset), pemasangan dari Tetapan

### Pengalaman anak
- [x] **Peta Dunia** dengan 8 pulau terapung (SVG asli), laluan berliku, awan bergerak, siang/petang/malam (waktu Malaysia), keadaan berkunci dengan kemajuan (cth. 2/4)
- [x] Bar atas: avatar + nama + tahap + bar XP, jumlah bintang, butang Koleksi, kunci ibu bapa (sentuh & tahan)
- [x] **Misi Hari Ini**: 4 langkah (huruf, menulis, memori, ejaan) dipilih ikut kelemahan anak; butang Main terus ke langkah seterusnya
- [x] **Pip**: maskot SVG asli, 9 ekspresi (gembira, terkejut, berfikir, sedih, semangat, teruja, meraikan, tidur, biasa), dialog bertulis ikut keadaan
- [x] Halaman pulau: kad permainan besar, 5 titik tahap, bintang
- [x] Rangka permainan: Mula (pilih tahap) → Main → Betul/Salah → Keputusan (bintang, XP, lencana baharu, tahap baharu) → Main Lagi / Tahap Seterusnya / Misi Seterusnya

### 12 permainan × 5 tahap (semuanya boleh dimain)
| Permainan | Pulau | Mekanik |
|---|---|---|
| Cari Huruf | Taman Huruf | pilih huruf disebut; tahap tinggi: huruf serupa & huruf besar |
| Padan Huruf | Taman Huruf | tekan huruf besar → huruf kecil; tahap 4–5: pasangan keliru |
| Belon Huruf | Taman Huruf | pecahkan belon terapung; belon terlepas kembali (tiada kalah) |
| Tulis Ajaib | Lembah Contengan | jari pada kanvas: garisan & bentuk → A–Z → a–z → titik sahaja → tanpa panduan |
| Kad Ingat | Rimba Ingat | kad memori 2–6 pasang; tahap 4–5 huruf besar ↔ kecil |
| Cari Bunyi | Hutan Bunyi | bunyi awal perkataan → huruf; tahap 3+ tanpa gambar |
| Teka Suku Kata | Kampung Suku Kata | BU + KU = BUKU, dengan suku kata pengganggu |
| Huruf Hilang | Stesen Ejaan | B _ L A; tahap 4–5 dua huruf hilang |
| Bina Kata | Stesen Ejaan | susun huruf ikut gambar; tahap 5 audio sahaja |
| Padan Gambar | Pulau Kata Ajaib | perkataan → gambar; tahap 4–5 gambar → perkataan |
| Cabaran Bintang | Istana Bintang | soalan campuran (huruf, bunyi, ejaan, perkataan) |
| Lumba Huruf | Litar Lumba | kereta berlumba; tekan papan huruf betul untuk pandu ke lorongnya; betul = nitro; tahap 5 bunyi awal |

### Sistem pembelajaran (Kompas Pip)
- [x] Skor Kuasa setiap item (huruf, bunyi, tulisan, ejaan, suku kata, perkataan)
- [x] 5 status: Belum diperkenalkan · Sedang belajar · Perlu latihan · Hampir menguasai · Telah menguasai — "menguasai" memerlukan ≥ 6 cubaan, ketepatan terkini ≥ 80 % dan betul dalam ≥ 2 jenis permainan
- [x] Radar Keliru: pasangan seperti M–N dikesan dan dimasukkan sebagai pengganggu & fokus dalam permainan **lain**
- [x] Huruf diperkenalkan berperingkat ikut urutan BM (a, i, u, b, m, s, k, …)
- [x] Tahap dibuka berdasarkan bintang **dan** ketepatan merentasi ≥ 5 cubaan
- [x] Pulau dibuka berdasarkan penguasaan huruf / perkataan dieja

### Ganjaran
- [x] Bintang (terbaik per tahap — tidak boleh dikutip berulang), XP (penuh 2 kali sehari setiap tahap, kemudian 2 XP), 8 tahap pemain
- [x] 14 lencana + 8 trofi pulau, 24 pelekat, 6 aksesori avatar (boleh dipakai)
- [x] Peti Misteri: sekali sehari selepas misi siap; tiada sistem "rarity"

### Ibu bapa
- [x] Pintu ibu bapa (soalan tambah + papan nombor) untuk Ruang Ibu Bapa, tambah profil, reset, sambung selepas rehat
- [x] Laporan: ringkasan, Peta Huruf 26 huruf (5 status + tertukar), 6 bidang kemahiran, kelemahan, cadangan, graf 7 hari, aktiviti terkini; "Data belum cukup" apabila cubaan terlalu sedikit
- [x] Portfolio: huruf dikuasai, perkataan dieja, rekod tulisan (pertama & terkini, vektor kecil), sijil (simpan sebagai PNG), lencana
- [x] Profil: tambah, ubah, padam, tukar (sehingga 6)
- [x] Tetapan: kesan bunyi, suara, had sesi (10/15/20/30 minit/tiada), buka semua pulau, sandaran eksport/import JSON, reset kemajuan, pasang aplikasi
- [x] Skrin rehat selepas had sesi; sambung hanya dengan pintu ibu bapa

## Ujian yang telah dijalankan (20 Nov 2026)
- `npm run typecheck` — lulus, 0 ralat
- `npm test` — 14/14 ujian unit lulus (penguasaan, keliru, tahap, pulau, bintang, had XP, peti, data rosak, rekod berganda, sandaran)
- `npm run build` — berjaya; precache 43 fail (~864 KB)
- `tests/e2e/play-all.cjs` — **47/47 lulus**: cipta profil, peta, misi, pintu ibu bapa, **11 permainan dimainkan hingga selesai** (termasuk menulis dengan jari pada kanvas), simpanan selepas muat semula, lencana, laporan, portfolio, profil kedua berasingan, tukar profil, reset, **dibuka tanpa internet**, tiada limpahan mendatar pada 360/390/430/768 px, tiada ralat JavaScript
- `tests/e2e/levels-smoke.cjs` — **55/55 lulus**: setiap permainan pada setiap tahap 1–5

Ujian dijalankan dalam Chromium tanpa kepala (Playwright) pada saiz telefon. **Belum diuji pada telefon Android fizikal** — sila uji pada sekurang-kurangnya satu telefon sebenar sebelum dijual.

## Belum siap / batasan yang diketahui
- **Suara**: suara sintetik telefon digunakan HANYA jika suara Bahasa Melayu (ms-MY) atau Indonesia (id-ID) ada; suara Inggeris tidak lagi digunakan. Nama huruf dieja ikut sebutan tadika Malaysia (I = "ai", H = "ec", K = "kei"), bunyi huruf guna suku kata pertama (bola → "bo"), simbol & perkataan huruf besar dinormalkan. Untuk sebutan 100% tepat, rakam 174 klip dalam `docs/SKRIP_RAKAMAN_SUARA.md` ke `public/audio/` dan jalankan `npm run audio:manifest` — aplikasi akan guna rakaman itu secara automatik.
- **Templat tulisan** A–Z & a–z perlu disemak oleh guru prasekolah (arah dan susunan strok).
- **Bank perkataan**: 34 perkataan dengan ilustrasi. Perlu dikembangkan (sasaran pelan: ~120).
- **Penyimpanan**: localStorage sahaja. Data boleh hilang jika data pelayar dipadam — sandaran manual tersedia; sandaran awan belum dibina (pelan V1.1).
- **Pembayaran RM19 / lesen**: belum dibina (memerlukan gerbang pembayaran & pelayan lesen kecil).
- **Misi Rumah (offline)**: hanya satu cadangan pada skrin rehat; senarai 36 misi dengan pengesahan ibu bapa belum dibina.
- **iOS**: tidak diuji; PWA di iOS mempunyai batasan storan dan pemasangan.
- Ujian hujung-ke-hujung menggunakan cangkuk `?ujian` dalam URL untuk membaca templat tulisan; tidak menjejaskan pengguna biasa.

## Cadangan seterusnya
1. Uji pada 2–3 telefon Android sebenar (termasuk telefon bajet) dan dengan 5–10 kanak-kanak.
2. Rakam suara manusia untuk huruf, bunyi, perkataan dan dialog Pip; isi `AUDIO_ASSETS`.
3. Kembangkan bank perkataan dan ilustrasi.
4. Bina pembayaran + lesen, kemudian sandaran awan disulitkan.
