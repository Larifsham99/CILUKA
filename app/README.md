# CILUKA — Prototaip V0

Prototaip pertama CILUKA (Fasa 0 dalam [Pelan Produk](../docs/CILUKA_Pelan_Produk.md)). PWA tanpa build step: HTML, CSS dan JavaScript biasa.

## Cara jalankan

```bash
cd app
python3 -m http.server 8080
# buka http://localhost:8080 di telefon/pelayar
```

## Apa yang ada

| Bahagian | Fail | Penerangan |
|---|---|---|
| Laman Pip (home) | `js/app.js` | Pip menyambut, 3 belon misi harian, siang/petang/malam ikut jam, objek perkataan yang dieja (Kata Jadi Benda), Kebun Rajin, pulau berkunci di sebalik awan |
| Ciluk-BA Huruf | `js/games/ciluk.js` | Huruf bersembunyi di belakang objek; pengganggu pintar daripada pasangan keliru; bantuan berperingkat |
| Studio Calit Comot | `js/games/tulis.js` | Menulis dengan jari: sistem titik semak, kesan arah salah, toleransi adaptif, tangga bantuan (demo → magnet → tulis bersama), medium Pasir & Cahaya, huruf yang ditulis menjadi hidup |
| Sarang Kata | `js/games/sarang.js` | Cari huruf → tenun → gabung suku kata → telur menetas → objek ke Laman Pip |
| Kompas Pip | `js/kompas.js` | Skor Kuasa, Kotak Ingatan, Radar Keliru, Zon Hebat, Penjana 3 Misi |
| Ruang Ibu Bapa | `js/parent.js` | Sentuh & tahan 🔒 + soalan matematik. Surat Pip, Peta Huruf, Buku Hebat (Dulu & Sekarang + ulang tayang tulisan), tetapan sesi, sandaran |
| Masa skrin sihat | `js/app.js` | Had sesi (lalai 10 minit), skrin rehat dengan Misi Rumah, sambung hanya oleh ibu bapa |
| Offline | `sw.js` | Service worker cache-first |

## Batasan prototaip

- **Suara** menggunakan Text-to-Speech peranti (ms-MY/id-ID). Versi sebenar perlu rakaman pelakon suara.
- **Objek** menggunakan emoji sebagai pemegang tempat; seni diorama sebenar belum dihasilkan.
- **Templat tulisan** ada untuk huruf a, i, u, o, b, m, n, s, k, l, t, d, p — perlu disemak oleh guru prasekolah.
- Satu profil sahaja; sokongan 4 profil belum dibina.
