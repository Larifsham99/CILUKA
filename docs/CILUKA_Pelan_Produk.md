# CILUKA — Pelan Produk Induk

**"Kecil-Kecil, Hebat-Hebat!"**

Dokumen perancangan produk dan pembangunan idea · Versi 1.0 · November 2026
Sasaran: Kanak-kanak 3–6 tahun di Malaysia · Platform: Mobile-first PWA · Harga: RM19 sekali bayar

> Dokumen ini ialah kerja **perancangan produk sahaja**. Tiada kod, tiada prototaip, tiada UI akhir. Setiap idea dinilai dari sudut pembelajaran, keseronokan, kos dan realiti pembangunan oleh pasukan kecil.

---

## Kandungan

1. Ringkasan eksekutif
2. Visi produk
3. Identiti brand
4. Nama alternatif
5. Konsep maskot
6. Art direction
7. Konsep home screen
8. Dunia permainan
9. Learning journey
10. Skill tree
11. Smart Learning Engine — *Kompas Pip*
12. 46 mini game
13. Magic Writing Studio — *Studio Calit Comot*
14. Magic Word Builder — *Sarang Kata*
15. Sistem ganjaran
16. Misi harian
17. Parent dashboard
18. Child portfolio — *Buku Hebat*
19. Misi offline — *Misi Rumah*
20. Audio dan animasi
21. Sistem profil
22. Masa skrin yang sihat
23. Ciri WOW
24. Model RM19
25. V1 must-have (dan matriks penilaian idea)
26. Ciri yang ditangguhkan
27. Roadmap
28. Keunikan dan positioning
29. Risiko produk
30. Cadangan akhir

---

## 1. Ringkasan Eksekutif

**CILUKA** berasal daripada permainan paling tua yang setiap bayi Malaysia kenal: *"Ciluk... BA!"* Detik seorang anak menjumpai sesuatu yang tersembunyi dan ketawa — itulah **jiwa produk ini**.

**Idea teras:**
> *Huruf-huruf di Kepulauan Ciluka telah bersembunyi. Tugas anak ialah menjumpainya, menghidupkannya, dan menenunnya menjadi perkataan — supaya pulau itu hidup semula.*

Setiap pembelajaran dalam CILUKA berakhir dengan satu **detik "Ciluk-BA!"** — sesuatu tersembunyi didedahkan, sesuatu yang mati menjadi hidup, sesuatu yang kosong menjadi penuh. Ini bukan hiasan; ia **mekanik tanda tangan** yang membezakan CILUKA daripada aplikasi ABC lain.

### Tujuh tiang produk

| Tiang | Nama dalam CILUKA | Fungsi |
|---|---|---|
| Dunia permainan | **Kepulauan Ciluka** | 9 pulau terapung, setiap satu satu kemahiran |
| Maskot | **Pip** | Anak burung tempua ajaib yang menenun sarang daripada perkataan |
| Enjin adaptif | **Kompas Pip** | Mengesan huruf kuat/lemah, memilih misi, mengulang kaji secara tersembunyi |
| Studio menulis | **Studio Calit Comot** | Menulis di pasir, langit, cahaya, roti canai — huruf yang ditulis menjadi hidup |
| Pembina perkataan | **Sarang Kata** | Kumpul huruf → tenun perkataan → objek "menetas" |
| Pulau sendiri | **Laman Pip** | Pulau anak yang **dibina daripada perkataan yang dieja sendiri** |
| Untuk ibu bapa | **Surat Pip, Buku Hebat, Misi Rumah** | Laporan mudah, portfolio emosi, aktiviti luar skrin |

### Tiga keputusan strategik paling penting

1. **Pedagogi Bahasa Melayu sebenar, bukan fonik Inggeris yang diterjemah.** Bahasa Melayu dibaca melalui **suku kata** (ba-bi-bu-be-bo). Kebanyakan aplikasi "ABC" mengabaikan hakikat ini. CILUKA dibina di sekelilingnya dan diselaraskan dengan semangat KSPK (Kurikulum Standard Prasekolah Kebangsaan).
2. **"Kata Jadi Benda".** Anak tidak membeli hiasan pulau dengan syiling. Anak **mengeja** RUMAH — dan rumah muncul. Mengeja POKOK — pokok tumbuh. Ganjaran = pembelajaran itu sendiri.
3. **Offline-first, tiada server mahal.** Semua data anak disimpan dalam peranti. Kos operasi hanya hosting statik + pengesahan lesen. Ini yang membolehkan RM19 sekali bayar menjadi model yang mampan.

### Skop V1 (ringkas)

- Laman Pip (home) + **6 pulau boleh dimain**, 3 pulau "di sebalik awan" (dibuka melalui kemas kini percuma).
- **18 mini game** terpilih daripada 46 idea.
- Studio menulis untuk 26 huruf kecil + 26 huruf besar + nama sendiri.
- Sarang Kata dengan ~120 perkataan.
- Kompas Pip (versi ringkas berasaskan peraturan).
- Sehingga 4 profil anak, parent dashboard, Surat Pip mingguan, Buku Hebat asas, 30+ Misi Rumah.
- Tiada iklan. Tiada langganan. Tiada pembelian dalam aplikasi untuk anak.

---

## 2. Visi Produk

### Pernyataan visi
> **Menjadikan setiap anak Malaysia berasa "aku boleh!" ketika belajar membaca dan menulis — melalui sebuah dunia yang mereka rindu untuk kembali, dalam masa skrin yang singkat dan bermakna.**

### Misi
Mengubah 10 minit masa skrin sehari menjadi 10 minit kemajuan yang boleh dilihat oleh ibu bapa — tanpa iklan, tanpa langganan, tanpa ketagihan.

### Tujuh prinsip reka bentuk (penapis untuk setiap keputusan)

| # | Prinsip | Maksud praktikal |
|---|---|---|
| 1 | **Main dahulu, belajar sentiasa** | Anak nampak permainan; sistem nampak latihan. Setiap aktiviti ada objektif pembelajaran yang ditulis. |
| 2 | **Satu skrin, satu tugas** | Tiada menu bertingkat. Anak tahu apa perlu dibuat dalam 3 saat tanpa membaca. |
| 3 | **Suara dahulu, teks kemudian** | Kanak-kanak 3–4 tahun belum membaca. Semua arahan disuarakan; teks hanya untuk ibu bapa atau sebagai bahan belajar. |
| 4 | **Tiada "GAGAL"** | Tiada skrin "Game Over", tiada X merah besar. Hanya "Eh, cuba lagi!" dan bantuan berperingkat. |
| 5 | **Berakhir dengan bangga, bukan ketagih** | Sesi yang habis dengan jelas, ganjaran berasaskan kemahiran, bukan masa. |
| 6 | **Ibu bapa sebagai rakan, bukan polis** | Laporan yang menerangkan, mencadangkan dan menghargai — bukan menghukum. |
| 7 | **Kecil tetapi lengkap** | Lebih baik 18 permainan yang digilap sempurna daripada 46 yang separuh siap. |

### Perjalanan emosi — satu kisah

**Hari 1 — Aisyah, 4 tahun.** Ibu memasang CILUKA. Skrin dibuka dengan awan yang bergerak; seekor burung kecil bertopi anyaman mengintai dari belakang awan. *"Ciluk... BA! Hai! Aku Pip. Huruf-huruf aku semua lari bersembunyi. Boleh tolong aku cari?"* Aisyah menekan Pip. Dalam 3 minit pertama, dia menjumpai huruf "a" di belakang langsir sebuah rumah kampung. Huruf itu melompat, membuka mata, dan berkata "a!". Aisyah ketawa.

**Minggu 1.** Aisyah menulis huruf "a" di atas pasir. Huruf itu bangun dan berjalan pulang ke Kampung Huruf. Kampung itu yang tadinya sunyi kini ada seorang penduduk. Esoknya dia mahu "cari kawan untuk a".

**Bulan 1.** Aisyah mengeja B-O-L-A. Sarang Pip bergegar, bersinar, dan — *Ciluk-BA!* — sebiji bola terkeluar dan melantun di Laman Pip. Setiap kali Aisyah membuka aplikasi, dia menekan bola itu dan ia berkata "bola!".

**Bulan 3.** Ibu menerima Surat Pip: *"Aisyah sudah mengenal 21 daripada 26 huruf dan boleh menulis namanya sendiri tanpa panduan."* Di Buku Hebat, ibu memainkan semula tulisan pertama "a" Aisyah yang herot-berot, bersebelahan dengan "a" terkini yang kemas. Ibu menghantar tangkapan itu ke grup WhatsApp keluarga.

Itulah produk yang kita bina.

---

## 3. Identiti Brand

### Personaliti brand

| Sifat | Bagaimana ia muncul |
|---|---|
| **Ceria** | Warna terang, bunyi ketawa kecil, animasi melantun |
| **Ingin tahu** | Sentiasa ada sesuatu tersembunyi untuk dijumpai |
| **Berani mencuba** | Kesilapan dianggap sebahagian pengembaraan |
| **Hangat** | Pip seperti kawan sebaya, bukan cikgu garang |
| **Malaysia** | Kampung, pasar malam, wau, roti canai, keretapi, bunyi kompang — tanpa menjadi klise pelancongan |

### Nada suara (tone of voice)

**Kepada anak** (Pip dan watak):
- Ayat pendek: maksimum 8–10 perkataan.
- Bahasa Melayu Malaysia santai: "Jom!", "Wah!", "Eh?", "Hebatnya!", "Cuba lagi, ya!"
- Tiada sindiran, tiada perkataan negatif seperti "salah", "bodoh", "gagal".
- Gunakan "kita" lebih daripada "kamu" — kita belajar bersama.

**Kepada ibu bapa:**
- Jelas, tenang, menghormati. Seperti cikgu tadika yang baik bercakap selepas kelas.
- Tiada jargon akademik. "Aisyah masih keliru antara b dan d" — bukan "kelemahan diskriminasi visual grafem".

### Logo — konsep

**Wordmark "CILUKA"** dalam huruf bulat, tebal, seperti dibuat daripada tanah liat lembut.

- Huruf **U** menjadi sebuah "tempat bersembunyi" berbentuk mangkuk/sarang — Pip mengintai keluar dari dalamnya, hanya mata dan hujung topi anyaman yang kelihatan.
- Huruf **A** di hujung sedikit condong seperti sedang melompat — membawa tenaga "BA!".
- Varian ikon aplikasi: hanya sarang + mata Pip yang mengintai, berlatarkan Sunshine Yellow. Mudah dikenali walaupun kecil di skrin telefon.

**Sonic logo:** dua not menaik yang lembut — *"Ciluk..."* (not rendah, berbisik) — *"BA!"* (not tinggi, ceria) diikuti ketawa kecil Pip. Dimainkan ketika aplikasi dibuka dan ketika setiap pendedahan besar.

### Palet warna dengan peranan

Warna tidak digunakan sesuka hati — setiap warna ada **tugas**.

| Warna | Cadangan hex | Peranan |
|---|---|---|
| **Sunshine Yellow** | `#FFC93C` | Warna utama brand, butang utama "MAIN", Pip |
| **Orange Peach** | `#FF9F6B` | Kehangatan, tubuh Pip, latar sambutan |
| **Aqua Turquoise** | `#2EC4B6` | Navigasi, laut, topi anyaman Pip |
| **Sky Blue** | `#8ED8F8` | Langit, latar asas yang menenangkan |
| **Lime Green** | `#9BDE4A` | Kejayaan, pertumbuhan, "betul!" |
| **Candy Pink** | `#FF7EB6` | Ganjaran, pelekat, detik istimewa |
| **Purple Pop** | `#9B6BFF` | Misteri, sihir, kawasan berkunci, Peti Ciluk |

**Peraturan 60-30-10 setiap skrin:** 60% warna latar dunia (lembut), 30% warna sokongan, 10% warna aksi (biasanya Sunshine Yellow untuk tindakan utama). Maksimum **3 warna dominan** pada satu skrin.

**Peraturan aksesibiliti:** jangan sekali-kali bergantung pada warna sahaja (contohnya hijau = betul). Sentiasa ada bentuk, animasi atau bunyi sokongan — kerana kira-kira 1 dalam 12 kanak-kanak lelaki mempunyai buta warna.

### Tipografi — keputusan pedagogi, bukan estetik semata-mata

Ini detail yang ramai pembangun terlepas: **bentuk huruf dalam aplikasi mesti sama dengan bentuk huruf yang diajar di tadika Malaysia.**

- Huruf **"a"** dan **"g"** mesti bentuk satu tingkat (seperti tulisan tangan), bukan bentuk dua tingkat seperti fon Arial/Times.
- Huruf "l" kecil, "I" besar dan "1" mesti mudah dibezakan.
- **Cadangan:** fon jenis "literasi" seperti **Andika** (lesen SIL Open Font, percuma, direka khusus untuk literasi awal) untuk semua huruf pembelajaran.
- Fon UI/brand: fon bulat dan mesra seperti **Baloo 2** atau **Nunito** — hanya untuk tajuk dan kawasan ibu bapa.

---

## 4. Nama Alternatif

Prompt meminta penilaian jujur sama ada ada nama yang lebih kuat. Berikut penilaian:

| Nama | Kekuatan | Kelemahan | Skor /10 |
|---|---|---|---|
| **CILUKA** | Berakar daripada "cilukba" — semua ibu bapa Malaysia faham serta-merta; unik; boleh didaftar tanda dagangan; terus mencadangkan mekanik "sorok & jumpa" | Bunyi "-luka" boleh dibaca sebagai "luka" oleh sesetengah orang | **8.5** |
| Cilukba! | Paling dikenali | Perkataan umum — sukar didaftar tanda dagangan, sukar dicari di Google/App Store | 6 |
| Hurufia | Jelas tentang huruf | Generik, kedengaran seperti aplikasi lain | 5 |
| Pulau Ejaja | Comel, ada dunia | Terhad kepada ejaan; susah disebut anak 3 tahun | 6 |
| Sarang Kata | Puitis, berkait dengan maskot | Kurang ceria untuk anak; lebih sesuai sebagai nama ciri | 6.5 |
| Kiki Kata | Mudah disebut | Tiada makna budaya | 5 |

### Cadangan: **Kekalkan CILUKA.**

Sebab: ia satu-satunya nama yang **membawa mekanik, emosi dan budaya sekali gus**. Risiko "luka" diurus dengan:
1. Sebutan rasmi dalam sonic logo: *"Ciluk... A!"* — penekanan pada "Ciluk".
2. Logo yang menonjolkan Pip mengintai — maksud "cilukba" jelas secara visual.
3. Tagline sentiasa disertakan dalam pemasaran awal: *"CILUKA — Kecil-Kecil, Hebat-Hebat!"*

**Tindakan sebelum pelancaran:** semak pangkalan data MyIPO (tanda dagangan), ketersediaan domain (.my dan .com), nama akaun TikTok/Instagram/Facebook, dan carian App Store/Play Store.

### Nama sub-ciri (sistem penamaan yang konsisten)

Semua nama ciri mengikut gaya "Bahasa Melayu mesra + sedikit lucu":
- Kompas Pip (enjin adaptif) · Studio Calit Comot (menulis) · Sarang Kata (pembina perkataan) · Laman Pip (pulau sendiri) · Peti Ciluk (peti misteri harian) · Album Ciluk (koleksi) · Surat Pip (laporan ibu bapa) · Buku Hebat (portfolio) · Misi Rumah (aktiviti offline) · Lencana Hebat (badge).

---

## 5. Konsep Maskot

### Empat pilihan yang dipertimbangkan

| Pilihan | Rupa | Kekuatan | Kelemahan |
|---|---|---|---|
| **A. Pip si Anak Tempua** | Burung bulat kecil bertopi anyaman | Burung tempua terkenal **menenun sarang** — metafora sempurna untuk "menenun huruf jadi perkataan"; haiwan tempatan; neutral jantina | Burung ialah maskot yang biasa — perlu siluet tersendiri |
| B. Comot si Titisan Dakwat | Gumpalan dakwat yang boleh berubah bentuk menjadi huruf | Sangat unik, sangat mudah dianimasikan, berkait dengan menulis | Sukar dikenali sebagai "kawan"; boleh nampak "kotor" |
| C. Bubu si Awan Kecil | Awan comel yang suka bersembunyi | Sesuai dengan "ciluk-ba" | Kurang personaliti, siluet lemah |
| D. Kancil Bijak | Sang Kancil versi comel | Sangat Malaysia | Terlalu banyak digunakan oleh produk lain; ada konotasi "menipu" |

### Keputusan: **Pip si Anak Tempua** sebagai maskot utama, **Comot** sebagai watak sokongan di studio menulis.

Gabungan ini memberi kita yang terbaik dari kedua-duanya: Pip untuk emosi dan pengembaraan, Comot untuk keajaiban menulis.

### Reka bentuk Pip

- **Tubuh:** bulat seperti bola, warna gradien Sunshine Yellow ke Orange Peach. Lembut seperti anak patung kain (plush).
- **Mata:** besar, berkilat, dengan kening yang sangat ekspresif (kening ialah kunci ekspresi tanpa perlu mulut yang kompleks).
- **Topi anyaman:** kerucut kecil yang ditenun daripada daun (corak anyaman mengkuang) berwarna Aqua Turquoise. Satu helai anyaman terjuntai dan melingkar di hujung — **inilah ciri siluet unik Pip**.
- **Sayap:** kecil, berfungsi seperti tangan — menunjuk, melambai, bertepuk.
- **Ekor:** satu helai daun melingkar.
- **Ujian siluet:** jika Pip dihitamkan sepenuhnya, bentuk "bola + topi kerucut + lingkaran" masih boleh dikenali.

### Personaliti dan latar cerita

**Latar:** Kepulauan Ciluka dahulu penuh dengan perkataan — rumah, pokok, sungai semuanya wujud kerana ada perkataan untuknya. Suatu malam, **Ribut Senyap** bertiup, dan semua huruf terkejut lalu lari bersembunyi di seluruh pulau. Tanpa huruf, Pip tidak boleh menenun sarangnya, dan pulau mula pudar.

**Ribut Senyap bukan penjahat.** Kelak didedahkan bahawa ia sebenarnya awan kecil yang sunyi kerana tiada siapa bercakap dengannya. Di penghujung, anak "mengeja" kawan untuknya. Tiada keganasan, tiada musuh yang menakutkan.

**Personaliti Pip:**
- Ingin tahu, sedikit cuai, sangat berani walaupun kecil.
- Kadang-kadang **membuat kesilapan sendiri** — dan meminta anak membetulkannya (lihat "Ajar Pip" di bawah).
- Suka ketawa, suka menari bila gembira, mengantuk bila malam.

### Mengapa Pip sesuai untuk 3 DAN 6 tahun

Masalah biasa: maskot terlalu "bayi" sehingga anak 6 tahun berasa malu. Penyelesaian CILUKA:

1. **Pip ialah kawan sebaya, bukan bayi.** Ia ada misi sendiri (menenun sarang), bukan sekadar comel.
2. **Mekanik "Ajar Pip" (Protégé Effect).** Untuk anak yang lebih mahir, Pip sengaja tersilap: *"Aku rasa BOLA dieja B-U-L-A... betul tak?"* Anak membetulkan Pip. Kajian pendidikan menunjukkan kanak-kanak belajar lebih mendalam apabila mereka "mengajar" orang lain — dan anak 5–6 tahun **suka** berasa lebih pandai daripada maskot.
3. **Kostum dan pangkat** — Pip berkembang (topi lebih besar, sarang lebih hebat) seiring dengan anak.

### Lembaran ekspresi (12 ekspresi wajib)

1. Gembira biasa · 2. Teruja (mata bersinar) · 3. Bangga (dada membusung) · 4. Terkejut "Ciluk-BA!" · 5. Berfikir (sayap di dagu) · 6. Keliru (kepala senget, tanda soal) · 7. Sedih kecil (tetapi tetap tersenyum menyokong) · 8. Mengantuk · 9. Ketawa terbahak · 10. Malu-malu · 11. Menunjuk · 12. Sorok (menutup mata dengan sayap)

### State animasi (untuk enjin animasi)

`idle` (bernafas, berkelip, topi bergoyang) · `sorok` · `ciluk-ba` · `sambut` · `tunjuk` · `sorak` · `tari` · `fikir` · `keliru` · `pujuk` · `mengantuk` · `tidur` · `terbang-masuk` · `terbang-keluar`

### Dialog Pip — 25 interaksi berasaskan keadaan

Pip **bukan chatbot AI**. Semua dialog ditulis, dirakam oleh pelakon suara, dan dipilih oleh peraturan berdasarkan keadaan permainan. Setiap situasi ada 3–5 variasi supaya tidak berulang.

| # | Keadaan permainan (trigger) | Contoh dialog Pip |
|---|---|---|
| 1 | Kali pertama buka aplikasi | "Ciluk... BA! Hai! Aku Pip. Huruf-huruf aku semua lari bersembunyi. Boleh tolong aku cari?" |
| 2 | Buka aplikasi (biasa, pagi) | "Selamat pagi, kawan hebat! Pip dah sediakan 3 misi untuk kita!" |
| 3 | Buka aplikasi (malam, selepas 8 malam) | "Wah, dah malam! Kita main sekejap je, ya. Lepas tu kita tidur." |
| 4 | Kembali selepas 3+ hari | "Selamat datang kembali! Pip rindu! Huruf-huruf pun tanya mana kamu pergi." |
| 5 | Jawapan betul (biasa) | "Betul! Hebatnya!" / "Yeay, kita jumpa!" |
| 6 | Jawapan betul selepas beberapa kali cuba | "Kamu tak putus asa! Itu baru hebat!" |
| 7 | Jawapan salah pertama | "Eh, bukan yang itu! Cuba kita tengok sekali lagi." |
| 8 | Jawapan salah kedua | "Hmm, susah sikit, kan? Pip tolong. Tengok yang bersinar ni!" |
| 9 | Tiada sentuhan selama 8 saat | "Psst... huruf tu ada dekat sini je. Cuba tekan!" |
| 10 | Menemui huruf baharu buat pertama kali | "Ciluk-BA! Kita jumpa huruf **m**! Mmm... macam bunyi makan sedap!" |
| 11 | Menguasai satu huruf (mastery) | "Huruf **b** dah jadi kawan baik kamu! Dia nak pindah ke Kampung Huruf!" |
| 12 | Menulis huruf dengan arah salah | "Ooh, cantik! Tapi huruf ni suka mula dari atas. Jom cuba ikut titik bersinar." |
| 13 | Tulisan berjaya | "Tengok! Huruf yang kamu tulis dah bangun!" |
| 14 | Perkataan pertama dieja | "Kamu dah eja perkataan pertama! Pip nak menangis gembira!" |
| 15 | Sarang menetaskan objek | "Sarang bergegar... Ciluk... BA! Sebiji BOLA!" |
| 16 | Mod "Ajar Pip" | "Pip rasa IKAN dieja I-K-A-M... betul ke? Tolong ajar Pip!" |
| 17 | Anak membetulkan Pip | "Oh! Terima kasih, Cikgu Kecil! Pip dah faham sekarang." |
| 18 | Pulau baharu dibuka | "Awan dah pergi! Ada pulau baharu! Jom kita pergi tengok!" |
| 19 | Misi harian selesai semua | "Tiga-tiga misi siap! Peti Ciluk dah boleh dibuka!" |
| 20 | Sesi hampir tamat (1 minit lagi) | "Lagi satu permainan, lepas tu kita rehat, ya." |
| 21 | Sesi tamat | "Hebat hari ini! Jom berehat. Esok kita sambung pengembaraan lagi!" |
| 22 | Ulang kaji huruf lemah (tersembunyi) | "Eh, huruf **n** sorok lagi! Dia suka main sorok-sorok dengan kamu." |
| 23 | Selepas Misi Rumah disahkan ibu bapa | "Kamu jumpa 3 benda huruf B kat rumah? Wah, kamu pengembara sejati!" |
| 24 | Menyentuh Pip tanpa sebab (Easter egg) | "Hihihi! Geli!" / "Pip tengah fikir pasal kuih!" |
| 25 | Hari jadi anak (jika ibu bapa set) | "Hari ni hari istimewa kamu! Pip ada hadiah dalam Peti Ciluk!" |
| 26 | Perayaan (Hari Raya/CNY/Deepavali/Krismas/Merdeka) | "Selamat Hari Raya! Jom kita hias Laman Pip dengan pelita!" |
| 27 | Cubaan banyak kali dan masih bergelut | "Kita rehat dari huruf ni sekejap. Nanti dia datang balik, kita cuba lagi!" |

**Peraturan dialog:**
- Pip tidak bercakap lebih daripada 1 ayat sebelum anak boleh bertindak.
- Dialog boleh dilangkau dengan sentuhan.
- Bunyi suara Pip ditapis (ducking) supaya muzik latar perlahan ketika Pip bercakap.

### Watak sokongan

| Watak | Rupa | Dunia | Peranan |
|---|---|---|---|
| **Comot** | Titisan dakwat ungu yang berubah bentuk | Studio Calit Comot | Menunjukkan cara menulis, menjadi huruf |
| **Uhu** | Burung hantu tembam bertelinga besar | Hutan Bunyi | Penjaga bunyi, "mendengar" untuk anak |
| **Mak Cik Kuih** | Pemilik gerai kuih yang riang | Pasar Suku Kata | Pelanggan dan penjual suku kata |
| **Kak Kondo** | Konduktor keretapi bertopi | Stesen Ejaan | Pemberi misi ejaan |
| **Utan** | Anak orang utan pelupa | Rimba Ingat | Minta tolong ingat sesuatu |
| **Penyu Pena** | Penyu tua yang bijak | Pulau Kata Ajaib | Pencerita makna perkataan |
| **Puteri Bintang / Putera Bintang** | Pasangan bintang kecil (dipilih anak) | Istana Bintang | Penjaga cabaran |
| **Si Senyap** | Awan kelabu kecil yang malu | Merata | "Antagonis" yang sebenarnya sunyi |
| **Warga Huruf** | 26 watak huruf kecil dengan mata dan kaki | Kampung Huruf | Koleksi hidup — muncul selepas anak menulisnya |

---

## 6. Art Direction

### Gaya visual: "Diorama Lembut"

Bayangkan setiap pulau seperti **mainan diorama** yang diperbuat daripada tanah liat, kain felt dan kayu — dilihat dari sudut sedikit atas, dengan cahaya matahari petang yang hangat.

- **Bahan:** permukaan lembut seperti clay/plush, tekstur halus, tiada permukaan plastik berkilat.
- **Bentuk:** organik, bulat, tiada sudut tajam. Rumah sedikit senget, pokok berbentuk gula-gula kapas.
- **Cahaya:** rim light hangat, bayang lembut di bawah setiap objek (memberi "kedalaman" walaupun 2D).
- **Kedalaman:** 3–4 lapisan parallax (langit → pulau jauh → pulau utama → objek depan). Apabila anak menyeret skrin, lapisan bergerak pada kelajuan berbeza — memberi rasa 3D yang murah dari segi prestasi.
- **Pulau terapung:** setiap pulau ada "akar" batu yang terjuntai di bawahnya, dengan air terjun kecil jatuh ke awan.

### Kejujuran teknikal: 3D sebenar vs "rupa 3D"

| Pendekatan | Kebaikan | Keburukan | Cadangan |
|---|---|---|---|
| 3D masa nyata (WebGL/Three.js) | Fleksibel, boleh putar | Berat, bateri cepat habis, lambat di telefon Android murah, kos pembangunan tinggi | ❌ Tidak untuk V1 |
| **3D pra-render + animasi 2D** | Rupa 3D premium, ringan, stabil | Kurang fleksibel (sudut tetap) | ✅ **Pilihan V1** |
| 2D flat sepenuhnya | Paling ringan | Nampak seperti template, hilang WOW | ❌ |

**Cadangan:** Latar dan objek dimodelkan dalam alat 3D (contohnya Blender), dirender sebagai imej (WebP), kemudian dihidupkan dalam 2D. Watak (Pip, Comot, Warga Huruf) dianimasikan menggunakan alat animasi vektor bertingkah laku (contohnya **Rive**, yang menyokong *state machine* — sangat sesuai untuk reaksi Pip yang bergantung kepada keadaan) atau Lottie. Hasilnya: rupa studio permainan, saiz kecil, lancar di telefon RM500.

### Identiti visual setiap dunia (ringkas — butiran di Bahagian 8)

| Dunia | Warna dominan | Mood | Motif Malaysia |
|---|---|---|---|
| Laman Pip | Sunshine Yellow + Lime | Rumah, selamat | Halaman rumah kampung |
| Taman Calit | Orange Peach + Sky | Bebas, kreatif | Pantai, wau, layang-layang |
| Kampung Huruf | Sunshine + Turquoise | Mesra, sibuk | Rumah kampung bertiang, jambatan kayu |
| Hutan Bunyi | Lime + Turquoise gelap | Misteri lembut | Hutan hujan, kunang-kunang, air terjun |
| Pasar Suku Kata | Candy Pink + Orange | Meriah, malam | Pasar malam, lampu gerai, kuih-muih |
| Stesen Ejaan | Sky Blue + Merah | Bergerak, teruja | Stesen keretapi lama, landasan menuju bukit |
| Pulau Kata Ajaib | Purple Pop + Turquoise | Ajaib, tenang | Laut, terumbu, penyu |
| Rimba Ingat | Lime gelap + Orange | Penuh teka-teki | Pokok besar, akar berbelit, corak batik |
| Istana Bintang | Purple + Emas | Megah, berani | Istana di awan, wau bulan, bintang |

### Motif Malaysia — tanpa klise

- **Ya:** rumah kampung bertiang, corak anyaman, wau bulan, keretapi lama, pasar malam, pokok kelapa, rambutan, kucing kampung, tanglung, pelita, kolam, ketupat.
- **Inklusif:** perayaan dan makanan pelbagai kaum; avatar dengan pelbagai warna kulit, pilihan tudung, songkok, rambut kerinting/lurus.
- **Tidak:** Menara Berkembar di setiap skrin, bendera berlebihan, gaya "brosur pelancongan".

### Bahasa UI kanak-kanak

- **Butang:** seperti "jeli" fizikal — ada ketebalan, bayang, dan **menekan ke bawah** apabila disentuh. Saiz minimum sasaran sentuhan **64–72 piksel** (lebih besar daripada garis panduan dewasa kerana jari kecil kurang tepat).
- **Ruang:** jarak antara butang sekurang-kurangnya 16 piksel untuk elak tersentuh salah.
- **Ikon:** ilustrasi asli dalam gaya diorama yang sama. Tiada ikon generik "hamburger menu".
- **Tiada teks pada butang anak.** Ikon + suara apabila ditekan lama.
- **Zon selamat:** butang penting tidak diletakkan di tepi skrin (mudah tersentuh secara tidak sengaja ketika memegang telefon).
- **Butang "keluar ke ibu bapa":** kecil, di penjuru atas, memerlukan sentuh-dan-tahan.

### Bahasa UI ibu bapa

Kawasan ibu bapa sengaja **berbeza** — tenang, bersih, latar putih krim, tipografi jelas, carta ringkas. Ini memberi isyarat: *"Ini ruang orang dewasa. Ia serius dan boleh dipercayai."*

### Aksesibiliti

- Pilihan "kurangkan animasi" (untuk anak yang mudah terlebih rangsang, termasuk sesetengah anak autistik).
- Kontras teks minimum mengikut standard WCAG AA di kawasan ibu bapa.
- Sokongan anak kidal (lihat Bahagian 13).
- Semua maklum balas audio ada pasangan visual (untuk anak yang bermain tanpa bunyi).

---

## 7. Konsep Home Screen

Home screen ialah 10 saat pertama yang menentukan sama ada anak berkata "Jom!" atau meletakkan telefon. Tiga konsep dipertimbangkan:

### Konsep A — "Peta Kepulauan" (Map Saga)

Peta menegak yang panjang. Anak menatal ke atas melalui laluan berliku yang menghubungkan pulau-pulau. Setiap nod ialah satu tahap.

| Kekuatan | Kelemahan |
|---|---|
| Kemajuan sangat jelas ("aku dah sampai sini") | **Sangat biasa** — gaya permainan teka-teki mudah alih yang diketahui semua orang |
| Mudah dibina | Memaksa laluan linear — bertentangan dengan pembelajaran adaptif |
| Ibu bapa faham serta-merta | Tiada rasa "milik sendiri"; dunia terasa seperti senarai |

### Konsep B — "Laman Pip" (Pulau Sendiri)

Home ialah pulau kecil milik anak. Pip tinggal di situ dengan sarangnya. Semua objek yang anak pernah eja (bola, rumah, pokok) ada di situ dan boleh disentuh. Misi datang sebagai belon yang terbang masuk. Pulau-pulau lain dicapai dengan sampan/belon.

| Kekuatan | Kelemahan |
|---|---|
| Rasa memiliki yang sangat kuat | Pulau-pulau lain "tersembunyi" — kemajuan keseluruhan kurang jelas |
| Setiap kunjungan, anak nampak hasil usahanya | Pada hari pertama, pulau kosong — kurang WOW |
| Sangat unik dan emosional | Risiko anak hanya bermain dengan objek, bukan masuk misi |

### Konsep C — "Teropong Ciluk" (Diorama Panorama)

Panorama mendatar yang luas — anak menyeret jari untuk melihat seluruh kepulauan. Pulau yang belum dibuka diselubungi awan ungu yang bergerak. Apabila dibuka, awan "Ciluk-BA!" tersingkap.

| Kekuatan | Kelemahan |
|---|---|
| WOW visual tertinggi | Anak 3 tahun mungkin tidak tahu ke mana nak pergi |
| Misteri yang sangat kuat (awan) | Terlalu banyak pilihan dalam satu skrin |
| Dunia terasa luas dan hidup | Lebih berat dari segi aset |

### ✅ Pilihan: Konsep Hibrid **"Laman Pip dengan Kepulauan di Ufuk"** (B + C)

**Susun atur (bayangan dalam perkataan, bukan reka bentuk UI akhir):**

```
┌─────────────────────────────────────┐
│ ☁️   [pulau jauh di sebalik awan]  ☁️ │  ← Lapisan belakang: Kepulauan Ciluka.
│    🏝️ Kampung Huruf   ☁️? ☁️?        │     Pulau yang dibuka bercahaya;
│         🏝️ Hutan Bunyi               │     yang berkunci diselubungi awan ungu.
│                                     │
│        🎈    🎈    🎈               │  ← 3 belon misi harian, diikat pada sarang Pip.
│           \   |   /                 │     Setiap belon ada ikon misi (pensel, telinga, sarang).
│          🪺 [PIP]                    │  ← Pip di tengah, melambai, bercakap.
│   🌳 ⚽       🏠      🐟             │  ← Laman Pip: objek yang anak pernah eja.
│ ═══════════════════════════════════ │
│ [👤]                    [🌻 Kebun]  │  ← Penjuru: avatar anak (tukar profil),
└─────────────────────────────────────┘     Kebun Rajin (kemajuan harian).
                                    [🔒 ibu bapa — sentuh & tahan]
```

**Apa yang berlaku dalam 10 saat pertama setiap kali dibuka:**
1. **0–2 saat:** Awan berarak, sonic logo "Ciluk... BA!", Pip terbang masuk.
2. **2–5 saat:** Pip melambai dan bercakap mengikut keadaan (pagi/malam/kembali selepas lama).
3. **5–8 saat:** 3 belon misi naik dari sarang Pip. Belon pertama **bergoyang lebih kuat** — isyarat "tekan saya".
4. **8+ saat:** Jika anak tidak menekan apa-apa, Pip menunjuk ke belon pertama.

**Mengapa ini yang terkuat:**
- **Anak tahu apa nak buat tanpa membaca** — belon yang bergoyang + Pip yang menunjuk.
- **Pilihan terkawal** — hanya 3 belon (misi) sebagai tindakan utama; pulau di ufuk untuk anak yang mahu meneroka sendiri.
- **Kemajuan kelihatan dua cara** — objek di Laman Pip (hasil sendiri) dan awan yang tersingkap (perjalanan).
- **Misteri sentiasa ada** — awan ungu, Peti Ciluk, objek yang bergerak sendiri.
- **Masalah "hari pertama kosong" diselesaikan** — Laman Pip bermula dengan sarang Pip yang belum siap dan satu objek hadiah (contohnya sebiji BOLA yang akan dieja dalam misi pertama — anak nampak bayangnya dahulu, kemudian "menghidupkannya").

**Butiran hidup (life details) yang murah tetapi berkesan:**
- Kitaran siang/malam mengikut jam peranti: pagi cerah, petang jingga, malam berbintang dengan kunang-kunang.
- Objek di Laman Pip bergerak perlahan sendiri (ikan melompat, bola bergolek sedikit).
- Sentuh mana-mana objek → ia bersuara menyebut namanya ("rumah!"). Ini **ulang kaji perbendaharaan kata yang tersembunyi**.

---

## 8. Dunia Permainan — Kepulauan Ciluka

Sembilan pulau + satu pulau rumah. Setiap pulau = satu kluster kemahiran, satu watak, satu "rasa".

**Peraturan reka bentuk dunia:**
- Setiap pulau ada **3 zon** (contohnya Kampung Huruf: Jeti → Kampung → Bukit), dibuka secara berperingkat.
- Setiap pulau ada **3–6 mini game** yang berbeza mekaniknya.
- Setiap pulau ada **"Detik Pulau Hidup"** — perubahan visual besar apabila zon diselesaikan.
- Pulau-pulau tidak dibuka secara linear sepenuhnya: **Kompas Pip** membuka pulau berdasarkan kesediaan kemahiran (Bahagian 11).

---

### 🏡 0. Laman Pip — Pulau Rumah

- **Pembelajaran:** perbendaharaan kata, ulang kaji pasif, rasa pencapaian.
- **Apa anak buat:** menyentuh objek yang dieja (setiap objek menyebut namanya), menyusun objek di pulau, memberi makan kucing yang dieja, melihat sarang Pip yang makin besar, membuka Peti Ciluk.
- **Unlock:** sentiasa terbuka. Berkembang daripada sebuah batu kecil kepada pulau penuh dalam 3 "saiz" (Pulau Kecil → Pulau Sederhana → Pulau Besar) mengikut jumlah perkataan dikuasai.
- **Ganjaran:** objek perkataan, kostum Pip, hiasan perayaan.

---

### 🌊 1. Taman Calit — Pantai Pra-Menulis

- **Identiti visual:** pantai pasir putih, laut Sky Blue, wau berterbangan, kerang-kerang. Warna Orange Peach.
- **Pembelajaran:** Peringkat 1 skill tree — garisan lurus, lengkung, zigzag, bulatan, kawalan jari, koordinasi mata-tangan.
- **Watak:** **Comot** (pertama kali diperkenalkan di sini) dan kawanan ketam kecil.
- **Apa anak buat:** membantu semut menyeberang pasir (jejak laluan), menarik tali wau mengikut angin (lengkung), menyambung cahaya kerang (titik), melukis ombak (zigzag).
- **Zon:** Gigi Air → Bukit Pasir → Tanjung Wau.
- **Detik Pulau Hidup:** setiap garisan yang dilukis menjadi sesuatu — garisan lurus menjadi jambatan, zigzag menjadi ombak, bulatan menjadi matahari. Selepas zon akhir, wau besar berbentuk Pip terbang di langit pulau.
- **Unlock:** terbuka sejak awal (pintu masuk untuk anak 3 tahun).
- **Ganjaran:** kerang koleksi untuk Album Ciluk, wau untuk Laman Pip.

---

### 🏘️ 2. Kampung Huruf — Kampung yang Kosong

- **Identiti visual:** rumah kampung bertiang dengan bumbung berbentuk huruf, jambatan kayu, pokok kelapa. Sunshine Yellow + Turquoise.
- **Pembelajaran:** Peringkat 2 — mengenal A–Z, huruf besar/kecil, memadankan, membezakan huruf yang hampir serupa.
- **Watak:** **Warga Huruf** — 26 watak huruf kecil. Setiap satu ada personaliti ("b" suka bola, "s" suka bersiul, "o" suka berguling).
- **Apa anak buat:** mencari huruf yang bersembunyi di belakang langsir, tempayan, pokok; menolong "Mak Huruf Besar" mencari "anak huruf kecil"; menghantar surat ke rumah yang betul.
- **Zon:** Jeti → Kampung → Bukit Huruf.
- **Detik Pulau Hidup:** kampung bermula **kosong dan pudar**. Setiap huruf yang dikuasai (dijumpai + ditulis) **berpindah masuk** ke rumahnya — lampu rumah menyala, asap dapur keluar, huruf melambai dari tingkap. Apabila 26 huruf ada, kampung mengadakan **kenduri** (animasi perayaan).
- **Unlock:** terbuka sejak awal.
- **Ganjaran:** Warga Huruf (koleksi hidup), Lencana "Kawan Semua Huruf".

> **Ini salah satu idea paling kuat:** kampung yang terisi secara fizikal ialah **visualisasi kemajuan yang difahami oleh anak 3 tahun**. Tiada carta, tiada peratus — hanya rumah yang lampunya menyala.

---

### 🌳 3. Hutan Bunyi — Hutan yang Bernyanyi

- **Identiti visual:** hutan hujan malam yang lembut, cendawan bercahaya, kunang-kunang, air terjun. Lime + Turquoise gelap.
- **Pembelajaran:** Peringkat 3 — bunyi huruf, bunyi awal perkataan, diskriminasi pendengaran (m/n, b/p).
- **Watak:** **Uhu** si burung hantu yang telinganya besar tetapi "lupa bunyi".
- **Apa anak buat:** mendengar haiwan hutan "memanggil" dengan bunyi huruf, memancing ikan yang namanya bermula dengan bunyi tertentu, membuka peti yang bergegar dengan bunyi misteri.
- **Zon:** Pinggir Hutan → Gua Gema → Air Terjun Lagu.
- **Detik Pulau Hidup:** hutan bermula senyap dan gelap. Setiap bunyi yang dikuasai menghidupkan satu "lampu bunyi" (cendawan bercahaya yang berbunyi bila disentuh). Akhirnya hutan menjadi **orkestra** — anak boleh menyentuh cendawan dan "bermain muzik huruf".
- **Unlock:** selepas 6 huruf pertama dikenal.
- **Ganjaran:** cendawan muzik untuk Laman Pip, haiwan hutan untuk Album.
- **Nota pedagogi Bahasa Melayu:** bunyi vokal "e" ada dua — **e pepet** (seperti dalam *emak*, *kereta*) dan **e taling** (seperti dalam *ekor*, *meja*). Hutan Bunyi memperkenalkan kedua-duanya secara berasingan, dengan watak "Pak E" dan "Mak E" yang berbeza warna. Ini detail yang membezakan aplikasi BM sebenar daripada aplikasi terjemahan.

---

### 🏮 4. Pasar Suku Kata — Pasar Malam Ajaib

- **Identiti visual:** pasar malam meriah dengan lampu gerai berwarna, asap kuih, tanglung. Candy Pink + Orange.
- **Pembelajaran:** Peringkat 5 — suku kata terbuka (ba, bi, bu, be, bo), menggabung suku kata, memecahkan perkataan.
- **Watak:** **Mak Cik Kuih**, penjual kuih yang setiap kuihnya bertulis suku kata.
- **Apa anak buat:** mengambil pesanan pelanggan ("Nak kuih **bu**!"), mencampur huruf di mesin ais kacang (B + A = BA), menggabung dua kuih menjadi perkataan (bo + la = BOLA).
- **Zon:** Gerai Pertama → Lorong Lampu → Pentas Pasar.
- **Detik Pulau Hidup:** setiap keluarga suku kata yang dikuasai (contohnya keluarga B: ba-bi-bu-be-bo) membuka satu **gerai baharu** yang menyala. Pasar makin meriah, makin ramai pelanggan watak.
- **Unlock:** selepas vokal (a, i, u, e, o) dan sekurang-kurangnya 5 konsonan dikenal.
- **Ganjaran:** kuih-muih koleksi, gerai mini untuk Laman Pip.

> **Mengapa pasar malam?** Kerana ia pengalaman universal kanak-kanak Malaysia merentas kaum, penuh warna dan bunyi, dan metafora "membeli suku kata" sangat semula jadi.

---

### 🚂 5. Stesen Ejaan — Keretapi Huruf

- **Identiti visual:** stesen keretapi lama yang comel, landasan berliku ke bukit, gerabak berwarna-warni. Sky Blue + merah.
- **Pembelajaran:** Peringkat 6 — mengeja, mengisi huruf hilang, menyusun huruf, mengeja berdasarkan audio.
- **Watak:** **Kak Kondo**, konduktor keretapi yang semangat.
- **Apa anak buat:** menyusun gerabak huruf supaya keretapi boleh bergerak, membaiki papan tanda stesen yang hurufnya jatuh, menghantar penumpang huruf ke gerabak betul.
- **Zon:** Stesen Kecil → Jejantas → Terowong Bukit.
- **Detik Pulau Hidup:** setiap perkataan yang dieja menambah satu stesen di laluan keretapi. Akhirnya keretapi boleh membawa Pip **mengelilingi seluruh kepulauan**.
- **Lokasi Sarang Kata** (ciri utama — Bahagian 14) — dibuka di stesen akhir, tetapi versi mudahnya muncul lebih awal di Laman Pip.
- **Unlock:** selepas 3 keluarga suku kata dikuasai.
- **Ganjaran:** gerabak koleksi, tiket keretapi (stiker).

---

### 🐢 6. Pulau Kata Ajaib — Perkataan Menjadi Nyata

- **Identiti visual:** pulau tropika dengan laut jernih, terumbu karang, penyu. Purple Pop + Turquoise.
- **Pembelajaran:** Peringkat 7 — membaca perkataan mudah, memadankan perkataan dengan objek, makna.
- **Watak:** **Penyu Pena**, penyu tua yang menulis cerita di atas pasir dengan siripnya.
- **Apa anak buat:** membaca perkataan pada botol yang terdampar dan memilih objek yang betul; "membaca" ayat pendek untuk menyelesaikan cerita Penyu Pena (contohnya "Ikan itu ___" → pilih gambar); menghantar surat ke rumah watak.
- **Zon:** Pantai Botol → Terumbu Cerita → Gua Mutiara.
- **Detik Pulau Hidup:** setiap perkataan yang **dibaca** (bukan dieja) membuat makhluk laut muncul di terumbu.
- **Unlock:** selepas 20 perkataan dieja.
- **Status:** V1.5 (bukan V1).

---

### 🌿 7. Rimba Ingat — Hutan Teka-Teki

- **Identiti visual:** pokok gergasi dengan akar berbelit, corak batik pada daun, cahaya matahari menembusi kanopi. Lime gelap + Orange.
- **Pembelajaran:** memori kerja, padanan, pola, urutan, logik — **kemahiran asas** yang menyokong membaca (kanak-kanak perlu ingat urutan huruf untuk mengeja).
- **Watak:** **Utan**, anak orang utan yang selalu terlupa di mana dia letak barang.
- **Apa anak buat:** membantu Utan mencari pasangan kad, meneruskan corak batik, mengulang urutan bunyi burung, menyusun cerita bergambar.
- **Zon:** Akar → Dahan → Puncak Kanopi.
- **Unik:** semua permainan memori di sini **menggunakan huruf dan perkataan sebagai bahan** — jadi ia juga ulang kaji.
- **Unlock:** terbuka sejak awal (sesuai untuk anak 3 tahun yang belum kenal huruf — mereka boleh bermain versi gambar).
- **Status:** 2 permainan dalam V1 (diletakkan dalam Kampung Huruf), pulau penuh dalam V1.5.

---

### 🏰 8. Istana Bintang — Cabaran Penguasaan

- **Identiti visual:** istana di atas awan, menara berbentuk wau bulan, bintang berkelip. Purple + emas.
- **Pembelajaran:** Peringkat 8 — misi gabungan, ujian penguasaan, "boss level".
- **Watak:** **Puteri Bintang / Putera Bintang** (anak pilih) dan **Si Senyap**.
- **Apa anak buat:** menyelesaikan "Cabaran Bintang" — misi gabungan yang memerlukan pelbagai kemahiran (contohnya: dengar bunyi → cari huruf → tulis → eja perkataan). Setiap tingkat istana = satu cabaran besar.
- **"Boss" tanpa keganasan:** Si Senyap menyerap huruf ke dalam awannya. Anak **membebaskan** huruf dengan mengeja/menulisnya. Di tingkat akhir, Si Senyap menangis kerana sunyi — anak mengeja **KAWAN**, dan Si Senyap bertukar menjadi awan pelangi yang ceria. Ia kemudian tinggal di Laman Pip.
- **Unlock:** setiap tingkat dibuka apabila pulau berkaitan selesai. Dalam V1, setiap pulau ada "pintu bintang" kecil sebagai boss mini.
- **Ganjaran:** **Sijil Hebat** (boleh dicetak), mahkota Pip, Lencana Bintang.

---

### ☁️ 9. Gua Ciluk — Pulau Misteri Berputar

- **Identiti visual:** gua berkilauan ungu yang muncul dan hilang.
- **Fungsi:** kandungan **berputar setiap minggu** (diambil daripada kandungan sedia ada, disusun semula oleh Kompas Pip) — "Cabaran Mingguan" dan acara perayaan.
- **Mengapa ia penting:** memberi rasa "ada benda baharu" tanpa perlu server atau kandungan baharu setiap minggu. Semua kandungan sudah ada dalam aplikasi; hanya susunan dan tema yang berubah mengikut kalendar peranti.
- **Status:** V1.1.

---

### 🎨 Studio Calit Comot (bukan pulau, tetapi "bilik ajaib")

Boleh dicapai dari mana-mana pulau melalui pintu berkilau Comot. Butiran di Bahagian 13.

---

## 9. Learning Journey

### Falsafah: "Dua sungai, satu laut"

Pembelajaran literasi awal ada dua aliran yang berjalan **serentak**, bukan bergilir:

```
SUNGAI MENGENAL  →  bentuk → huruf → bunyi → suku kata → ejaan → perkataan
SUNGAI MENULIS   →  garisan → bentuk → jejak huruf → tulis huruf → tulis perkataan → tulis nama
                                    ↘                                       ↙
                                         LAUT MEMBACA (Istana Bintang)
```

Anak 3 tahun mungkin kuat dalam mengenal tetapi lemah dalam motor halus (tangan kecil). Anak 6 tahun mungkin boleh menulis tetapi belum faham suku kata. **CILUKA membenarkan setiap sungai mengalir pada kelajuan sendiri**, dan Kompas Pip memastikan kedua-duanya maju.

### Pedagogi Bahasa Melayu — mengapa CILUKA berbeza

| Aplikasi ABC biasa | CILUKA |
|---|---|
| "A for Apple" — model fonik Inggeris | Vokal dahulu (a, i, u, e, o), kemudian konsonan dalam kumpulan |
| Huruf diajar A hingga Z mengikut urutan | Huruf diajar mengikut **kekerapan dan kegunaan dalam BM** (a, i, u, b, m, s, k, t... dahulu; q, x, z, v kemudian — jarang dalam BM) |
| Lompat dari huruf terus ke perkataan | **Suku kata sebagai jambatan** — kaedah yang digunakan secara meluas di prasekolah Malaysia |
| "e" satu bunyi | Bezakan e pepet dan e taling |
| Digraf diabaikan | **ng, ny, sy, kh, gh** diajar sebagai "huruf kembar" |

### Urutan pengenalan huruf yang dicadangkan (Bahasa Melayu)

| Kumpulan | Huruf | Sebab |
|---|---|---|
| 1 | **a, i, u** | Vokal paling stabil bunyinya |
| 2 | **b, m, s, k** | Konsonan yang membentuk banyak perkataan awal (BOLA, MATA, SUSU, KAKI) |
| 3 | **o, e** (pepet & taling) | Melengkapkan vokal |
| 4 | **t, p, n, l, d** | Membuka perkataan seperti TOPI, PAPA, NASI, LAMPU, DADU |
| 5 | **r, g, h, j, c, y, w** | Melengkapkan perkataan harian |
| 6 | **ng, ny** (dan sy, kh, gh untuk lanjutan) | Digraf penting (KUCING, BUNGA, NYANYI) |
| 7 | **f, v, q, x, z** | Jarang dalam perkataan asli BM; terutamanya untuk melengkapkan abjad |

**Nota:** Turutan ini perlu disemak oleh pakar pendidikan awal kanak-kanak dan guru prasekolah sebelum dimuktamadkan.

### Huruf kecil atau huruf besar dahulu?

**Untuk mengenal:** kedua-duanya, dengan **huruf kecil sebagai utama** (kerana 95% teks yang anak akan baca ialah huruf kecil). Huruf besar diperkenalkan sebagai "Mak/Ayah" kepada huruf kecil.

**Untuk menulis:** huruf kecil dahulu, diajar mengikut **keluarga pergerakan** (bukan A–Z):
- **Keluarga Lurus:** l, i, t, j
- **Keluarga Bulat (bermula seperti "c"):** c, o, a, d, g, q, e, s
- **Keluarga Bukit:** n, m, h, r, b, p, k
- **Keluarga Lembah:** u, y, w, v
- **Keluarga Silang:** x, z, f

Mengajar mengikut keluarga bermakna setiap huruf baharu menggunakan semula pergerakan yang sudah dikuasai — anak lebih cepat berjaya, kurang kecewa.

### Permainan Kenalan — penempatan awal tanpa "ujian"

Hari pertama, anak tidak diberi ujian. Pip berkata: *"Jom kita main sekejap, Pip nak kenal kamu!"* — dan anak bermain **3 permainan pendek (sekitar 3 minit)**:

1. **Ciluk-BA Huruf** dengan 6 huruf → mengukur pengenalan huruf.
2. **Jejak Semut** dengan 2 garisan → mengukur kawalan motor.
3. **Siapa Panggil?** dengan 3 bunyi → mengukur kesedaran bunyi.

Berdasarkan hasil (dan umur yang dimasukkan ibu bapa sebagai **titik permulaan sahaja**), Kompas Pip menetapkan "titik mula" anak:

| Profil | Titik mula |
|---|---|
| **Pengembara Kecil** (belum kenal huruf) | Taman Calit + Kampung Huruf Kumpulan 1 |
| **Penjejak Huruf** (kenal beberapa huruf) | Kampung Huruf Kumpulan 2–3 + Hutan Bunyi |
| **Penenun Kata** (kenal kebanyakan huruf) | Pasar Suku Kata + Studio menulis huruf |
| **Wira Ejaan** (boleh membaca suku kata) | Stesen Ejaan + Sarang Kata |

Jika penempatan tersilap, Kompas Pip membetulkannya secara automatik dalam beberapa sesi pertama (sistem menyesuaikan, bukan menilai).

### Pengalaman dari sudut anak

Anak **tidak pernah melihat** perkataan seperti "Peringkat 3" atau "Tahap Fonik". Anak hanya nampak:
- Pulau yang awannya tersingkap.
- Rumah di Kampung Huruf yang lampunya menyala.
- Gerai pasar malam yang dibuka.
- Objek baharu di Laman Pip.
- Topi Pip yang makin besar.

Skill tree hanya kelihatan dalam bentuk penuh kepada **ibu bapa** — anak melihatnya sebagai dunia.

---

## 10. Skill Tree — "Pokok Hebat"

Untuk ibu bapa, skill tree digambarkan sebagai **Pokok Hebat** — sebatang pokok yang dahannya mewakili kemahiran. Daun hijau = dikuasai, daun kuning = sedang belajar, tunas = belum bermula. (Untuk anak, ia ditunjukkan secara tidak langsung melalui dunia.)

### Struktur

Setiap **nod** ialah satu kemahiran kecil yang boleh diukur. Setiap nod ada:
- **Prasyarat** (nod lain yang perlu "sedang dipelajari" atau "dikuasai").
- **Kriteria penguasaan** (lihat di bawah).
- **Permainan yang melatihnya** (sekurang-kurangnya 2, supaya latihan tidak membosankan).

### Peringkat 1 — Kenal Bentuk (Taman Calit)

| Nod | Kemahiran | Kriteria penguasaan |
|---|---|---|
| 1.1 | Sentuh & seret dengan kawalan | Selesaikan 3 seretan tanpa terlepas |
| 1.2 | Garisan lurus (menegak, mendatar) | 4 jejak dengan liputan ≥ 70% |
| 1.3 | Garisan condong | 4 jejak ≥ 70% |
| 1.4 | Lengkung (seperti "c") | 4 jejak ≥ 70% |
| 1.5 | Zigzag | 3 jejak ≥ 70% |
| 1.6 | Bulatan | 4 jejak ≥ 70%, arah lawan jam (arah yang digunakan untuk a, d, g, o) |
| 1.7 | Bentuk asas (segi tiga, segi empat) | Kenal dan jejak |

### Peringkat 2 — Kenal Huruf (Kampung Huruf)

| Nod | Kemahiran |
|---|---|
| 2.1 | Kenal vokal kecil (a, i, u, e, o) |
| 2.2 | Kenal konsonan Kumpulan 2, 4, 5, 7 (setiap kumpulan satu nod) |
| 2.3 | Kenal huruf besar |
| 2.4 | Padankan huruf besar–kecil |
| 2.5 | Cari huruf dalam kumpulan huruf lain (visual search) |
| 2.6 | Bezakan huruf serupa: **b/d, p/q, m/n, u/n, i/l, h/n, f/t** |
| 2.7 | Kenal urutan abjad (A–Z) — nod sokongan, bukan prasyarat |

### Peringkat 3 — Bunyi (Hutan Bunyi)

| Nod | Kemahiran |
|---|---|
| 3.1 | Kesedaran bunyi umum (bunyi sama/berbeza) |
| 3.2 | Bunyi vokal |
| 3.3 | Bunyi konsonan |
| 3.4 | Padankan bunyi → huruf |
| 3.5 | Kenal bunyi awal perkataan |
| 3.6 | Bezakan bunyi serupa (m/n, b/p, d/t, g/k) |
| 3.7 | e pepet vs e taling |

### Peringkat 4 — Menulis (Studio Calit Comot)

| Nod | Kemahiran |
|---|---|
| 4.1 | Jejak bentuk asas (bersambung dengan Peringkat 1) |
| 4.2 | Jejak huruf mengikut keluarga (5 sub-nod: Lurus, Bulat, Bukit, Lembah, Silang) |
| 4.3 | Tulis dengan titik panduan (separa) |
| 4.4 | Tulis tanpa panduan (hanya titik mula) |
| 4.5 | Tulis huruf yang didengar (dikte) |
| 4.6 | Tulis huruf besar |
| 4.7 | Tulis nama sendiri (dengan panduan → tanpa panduan) |
| 4.8 | Tulis perkataan pendek |

### Peringkat 5 — Suku Kata (Pasar Suku Kata)

| Nod | Kemahiran |
|---|---|
| 5.1 | Kesedaran suku kata (kira tepukan: "BO-LA" = 2) — boleh dimulakan seawal 3 tahun, sebelum kenal huruf |
| 5.2 | Suku kata terbuka KV (ba-bi-bu-be-bo) mengikut keluarga konsonan |
| 5.3 | Gabung 2 suku kata (bo + la → bola) |
| 5.4 | Pecahkan perkataan kepada suku kata |
| 5.5 | Suku kata tertutup KVK (bas, ban, -kan, -ngan) |
| 5.6 | Susun suku kata menjadi perkataan 3 suku kata |

### Peringkat 6 — Mengeja (Stesen Ejaan)

| Nod | Kemahiran |
|---|---|
| 6.1 | Kenal huruf dalam perkataan ("Ada huruf B dalam BOLA?") |
| 6.2 | Isi satu huruf yang hilang |
| 6.3 | Isi satu suku kata yang hilang |
| 6.4 | Susun huruf (dengan gambar + audio) |
| 6.5 | Eja berdasarkan audio sahaja |
| 6.6 | Eja tanpa bantuan (dari ingatan) |
| 6.7 | Kesan ejaan salah ("Ajar Pip") |

### Peringkat 7 — Membina & Membaca Perkataan (Sarang Kata + Pulau Kata Ajaib)

| Nod | Kemahiran |
|---|---|
| 7.1 | Bina perkataan KV-KV (BOLA, BUKU, SUSU) |
| 7.2 | Bina perkataan V-KV / V-KVK (IBU, IKAN) |
| 7.3 | Bina perkataan dengan KVK (RUMAH, MASJID) |
| 7.4 | Bina perkataan dengan digraf (KUCING, BUNGA) |
| 7.5 | Baca perkataan dan padankan dengan gambar |
| 7.6 | Baca frasa 2–3 perkataan ("ikan besar", "kucing tidur") |

### Peringkat 8 — Cabaran (Istana Bintang)

| Nod | Kemahiran |
|---|---|
| 8.1 | Misi gabungan (dengar → cari → tulis → eja) |
| 8.2 | Cabaran Bintang per pulau (boss mini) |
| 8.3 | Cabaran masa lembut (tiada kalah — hanya "lagi cepat, lagi banyak bintang") |
| 8.4 | Mystery challenge (Gua Ciluk) |
| 8.5 | Cabaran Akhir: Membebaskan Si Senyap |

### Fleksibiliti — tidak semua anak ikut laluan sama

- **Prasyarat lembut:** nod boleh dibuka apabila prasyarat **"sedang dipelajari" (≥ 50%)**, bukan semestinya dikuasai sepenuhnya. Ini mengelakkan anak "tersekat".
- **Cabang selari:** Peringkat 4 (menulis) berjalan selari dengan 2, 3 dan 5. Anak yang lemah motor halus masih boleh maju dalam mengenal dan suku kata.
- **Lompat ke hadapan:** jika anak menjawab betul dengan cepat dalam nod baharu (contohnya 5 betul berturut-turut, tanpa hint, cepat), Kompas Pip menawarkan **"Cabaran Lompat"** — lulus, dan nod itu terus dikuasai.

---

## 11. Smart Learning Engine — **Kompas Pip**

> *"Pip sentiasa tahu ke mana kita patut pergi seterusnya."*

Kompas Pip ialah otak CILUKA. Ia berjalan **sepenuhnya dalam peranti**, tanpa server, tanpa AI berat. Ia direka supaya boleh dibina oleh seorang pembangun dalam beberapa minggu, tetapi cukup bijak untuk memberi pengalaman yang terasa peribadi.

### Apa yang Kompas Pip jejak

Setiap **item** (satu huruf, satu bunyi, satu suku kata, satu perkataan, satu bentuk tulisan) mempunyai rekod kecil:

| Data | Maksud |
|---|---|
| **Skor Kuasa** (0–100) | Tahap penguasaan semasa |
| **Kotak** (1–5) | Kedudukan dalam sistem ulangan berjarak |
| **Cubaan terkini** (8 terakhir) | Betul/salah, masa jawab, hint digunakan |
| **Pasangan keliru** | Contohnya "b sering dijawab apabila sasaran ialah d" |
| **Tarikh terakhir dimain** | Untuk mengesan kemahiran yang "lama tidak digunakan" |
| **Konteks kejayaan** | Permainan mana anak berjaya (contohnya kuat dalam mengenal visual tetapi lemah dalam bunyi untuk huruf yang sama) |

Saiz data ini sangat kecil — beberapa ratus KB sahaja per anak walaupun selepas setahun.

### Lima mekanisme Kompas Pip

#### 1. Skor Kuasa — mengira penguasaan

Selepas setiap cubaan, Skor Kuasa dikemas kini:

| Hasil cubaan | Perubahan skor |
|---|---|
| Betul, cepat, tanpa hint | **+12** |
| Betul, perlahan atau selepas hint pertama | **+6** |
| Betul selepas hint kedua/ketiga | **+2** |
| Salah | **−8** |
| Salah kerana memilih **pasangan keliru** yang diketahui | **−8** dan tambah kiraan pasangan keliru |

"Cepat" dan "perlahan" diukur **berbanding purata anak itu sendiri**, bukan piawaian umum (anak 3 tahun memang lebih perlahan; itu bukan kelemahan).

| Skor | Status | Warna (untuk ibu bapa) |
|---|---|---|
| 0–39 | Baru kenal | Tunas |
| 40–74 | Sedang belajar | Daun kuning |
| 75–100 | **Dikuasai** — dengan syarat: betul dalam **sekurang-kurangnya 2 jenis permainan berbeza** dan **dalam 2 hari berbeza** | Daun hijau |

> Syarat "2 permainan + 2 hari" sangat penting: ia memastikan anak benar-benar tahu huruf itu, bukan sekadar ingat kedudukannya dalam satu permainan.

#### 2. Kotak Ingatan — ulangan berjarak (spaced repetition)

Diilhamkan daripada sistem kad Leitner — ringkas dan terbukti berkesan:

| Kotak | Diulang selepas |
|---|---|
| 1 | Sesi yang sama / esok |
| 2 | 2 hari |
| 3 | 4 hari |
| 4 | 8 hari |
| 5 | 16 hari (penguasaan jangka panjang) |

Betul → naik satu kotak. Salah → turun ke Kotak 1. Item yang "sudah sampai masa" diulang secara tersembunyi di dalam misi.

#### 3. Radar Keliru — mengesan pasangan yang mengelirukan

Apabila anak memilih **d** ketika sasaran ialah **b** sebanyak 2 kali atau lebih dalam 8 cubaan terakhir, pasangan **b–d** ditanda sebagai **"pasangan keliru"**.

Apa yang berlaku:
- Permainan seterusnya yang melibatkan **b** akan **sengaja meletakkan d sebagai pilihan pengganggu** (latihan diskriminasi yang disasarkan).
- Kompas Pip menjana **Misi Kembar** — 2–3 permainan berbeza yang melatih pasangan itu:
  - Belon Huruf dengan hanya b dan d.
  - Kembar Tak Serupa (bayang huruf).
  - Jejak huruf b, kemudian d — dengan Comot menunjukkan "b mula dengan tiang, perut di kanan; d mula dengan perut".
  - Siapa Panggil? dengan bunyi /b/ dan /d/.
- Apabila anak betul 4 kali berturut-turut dalam pertembungan b–d, tanda keliru dibuang.

**Senarai pasangan keliru lalai** (dimuat awal supaya pengganggu bijak sejak hari pertama): b/d, p/q, b/p, d/q, m/n, n/u, m/w, i/l, l/t, f/t, h/n, a/o, e/c, g/q, s/z; dan bunyi m/n, b/p, d/t, g/k, e pepet/e taling.

#### 4. Zon Hebat — kawalan kesukaran (Zon Perkembangan Proksimal)

Sasaran: anak berjaya **70–85%** daripada masa. Terlalu senang = bosan; terlalu susah = kecewa.

| Kadar betul (8 cubaan terakhir) | Tindakan |
|---|---|
| > 90% dan cepat | Naikkan kesukaran: lebih banyak pilihan, pengganggu lebih serupa, kurang petunjuk visual |
| 70–90% | Kekalkan |
| 50–69% | Turunkan sedikit: kurangkan pilihan, tambah petunjuk |
| < 50% | Turunkan dan **tukar permainan** — hentikan permainan semasa dengan lembut, beri sesuatu yang anak sudah kuasai (supaya anak berakhir dengan kejayaan) |

**Tombol kesukaran** yang boleh dilaraskan dalam hampir setiap permainan:
- Bilangan pilihan (2 → 3 → 4 → 6)
- Keserupaan pengganggu (rawak → pasangan keliru)
- Petunjuk (audio + gambar → audio sahaja → tiada)
- Kelajuan objek bergerak
- Toleransi jejak tulisan

#### 5. Penjana Misi — memilih apa yang dimainkan hari ini

Setiap hari, Kompas Pip memilih **3 misi** menggunakan resipi:

| Slot | Peratus kandungan | Tujuan |
|---|---|---|
| **Misi 1 — Pengembaraan** | Item baharu di sempadan kemahiran (nod "sedang belajar") | Kemajuan |
| **Misi 2 — Ulang Kaji Rahsia** | Item yang "sampai masa" dalam Kotak Ingatan + pasangan keliru | Mengukuhkan kelemahan |
| **Misi 3 — Seronok** | Item yang sudah dikuasai, dalam permainan kegemaran anak atau permainan yang lama tidak dimain | Keyakinan, keseronokan, penamat yang baik |

**Peraturan kepelbagaian:**
- Tiada mekanik permainan yang sama digunakan dua kali dalam 3 misi.
- Item lemah **mesti muncul dalam permainan berbeza** daripada permainan di mana ia gagal sebelum ini.
- Sekurang-kurangnya satu misi melibatkan pergerakan jari (menulis/jejak) jika anak sudah di peringkat itu.
- Misi terakhir dalam sesi sentiasa sesuatu yang anak **mungkin berjaya** — sesi berakhir dengan rasa bangga.

### Contoh dalam tindakan

**Profil Ali (5 tahun):** Kuasai a, i, u, b, m, s, k, o, t, p. Keliru: **m dan n**. Huruf "r" belum diperkenalkan. Huruf "s" sudah 9 hari tidak dimain.

**Misi hari ini yang dijana Kompas Pip:**
1. 🎈 **Pengembaraan:** *Ciluk-BA Huruf* — memperkenalkan **r** (huruf baharu), dengan Warga Huruf "r" yang suka mengaum "rrr!".
2. 🎈 **Ulang Kaji Rahsia:** *Pancing Bunyi* — mencari ikan yang namanya bermula dengan **m** dan **n** (MATA, NASI, MEJA, NANAS), plus satu ikan **s** (SUSU) kerana sudah sampai masa ulang kaji.
3. 🎈 **Seronok:** *Gabung Kuih* di Pasar Suku Kata dengan suku kata yang Ali sudah kuasai — Ali kumpul kuih dan menetaskan perkataan **BOLA** untuk Laman Pip.

Ali hanya nampak: *"Hari ini Pip ada 3 misi untuk kamu!"* — dia tidak tahu ia direka untuk m dan n.

### Mengapa tidak menggunakan AI/model pembelajaran mesin?

| Pilihan | Penilaian jujur |
|---|---|
| Enjin berasaskan peraturan (Kompas Pip) | ✅ Boleh diramal, boleh diuji, boleh diterangkan kepada ibu bapa, tiada kos server, berfungsi offline, cukup berkesan untuk domain sempit (26 huruf, ~300 suku kata, ~500 perkataan) |
| Model ML/AI awan | ❌ Kos server berulang (tidak sesuai untuk RM19 sekali bayar), isu privasi data kanak-kanak, sukar diterangkan, berlebihan untuk masalah ini |

**Laluan naik taraf masa depan:** selepas ada data agregat tanpa nama (dengan persetujuan), pemberat skor (+12, −8 dan sebagainya) boleh ditala semula untuk versi seterusnya — tanpa mengubah seni bina.


---

## 12. 46 Mini Game

**Peraturan reka bentuk mini game:**
- Setiap permainan **30–120 saat** satu pusingan. Pendek = sesuai untuk tumpuan anak 3–6 tahun.
- Setiap permainan mesti ada **mekanik interaksi yang berbeza** (tekan, seret, jejak, susun, pilih bergerak, ingat urutan, kemudi).
- **Tiada kalah.** "Cara menang" bermaksud cara menyelesaikan pusingan; anak sentiasa sampai ke penamat (dengan bantuan jika perlu). Bintang (1–3) mencerminkan ketepatan dan kebebasan daripada hint.
- **Tag V1:** ✅ = dalam V1 · 🔜 = V1.5 · 🌙 = masa depan.
- Semua boleh dibina dengan **teknologi web 2D biasa** tanpa server.

**Legenda tahap kesukaran:** ★ = 3–4 tahun · ★★ = 4–5 tahun · ★★★ = 5–6 tahun (tetapi Kompas Pip menetapkan tahap berdasarkan kemahiran, bukan umur).

---

### A. Kenal Huruf

#### 1. Ciluk-BA Huruf ✅
- **Dunia:** Kampung Huruf
- **Cara bermain:** Pip menyebut "Cari huruf **m**!". Huruf-huruf bersembunyi di belakang langsir, tempayan, pokok pisang dan reban ayam. Anak menyentuh tempat sorok untuk mengintai — "Ciluk... BA!" — huruf terkejut dan ketawa. Jika betul, huruf melompat keluar; jika bukan, huruf itu melambai dan sorok semula.
- **Kemahiran:** pengenalan huruf visual, pengecaman huruf sasaran.
- **Mekanik utama:** sentuh untuk mendedahkan (reveal) + ingatan lokasi.
- **Cara menang:** jumpa 5 huruf sasaran.
- **Ganjaran:** huruf yang dijumpai muncul dalam Album Ciluk; bintang.
- **Kesukaran:** ★ 3 tempat sorok, pengganggu rawak → ★★★ 9 tempat sorok, pengganggu daripada pasangan keliru, huruf boleh berpindah tempat.
- **Nota:** permainan tanda tangan CILUKA.

#### 2. Belon Huruf ✅
- **Dunia:** Taman Calit / Laman Pip
- **Cara bermain:** belon berhuruf terapung naik perlahan. Pip menyebut huruf; anak mencucuk belon yang betul. Belon pecah menjadi konfeti dan bunyi huruf.
- **Kemahiran:** pengenalan huruf pantas, perhatian visual.
- **Mekanik utama:** tekan sasaran yang bergerak.
- **Cara menang:** pecahkan 8 belon betul.
- **Ganjaran:** bintang; belon terakhir membawa hadiah kecil (pelekat).
- **Kesukaran:** ★ belon perlahan, 2 jenis huruf → ★★★ lebih cepat, 4–5 huruf, huruf besar dan kecil bercampur ("pecahkan semua **b**, besar atau kecil").
- **Nota:** belon yang terlepas tidak dikira "salah" — ia hanya terbang dan muncul semula.

#### 3. Mak Cari Anak ✅
- **Dunia:** Kampung Huruf
- **Cara bermain:** "Mak Huruf Besar" (contoh **B**) sedang mencari anaknya. Di halaman, ramai "anak huruf kecil" bermain. Anak menyeret **b** kecil ke pelukan **B** besar. Mereka berpelukan dan pulang ke rumah.
- **Kemahiran:** padanan huruf besar–kecil.
- **Mekanik utama:** seret dan lepas (drag & drop) dengan cerita.
- **Cara menang:** satukan 5 keluarga.
- **Ganjaran:** rumah keluarga huruf menyala di kampung.
- **Kesukaran:** ★ pasangan yang bentuknya sama (C/c, O/o, S/s) → ★★★ pasangan yang bentuknya berbeza (A/a, G/g, R/r, D/d).

#### 4. Bayang Huruf ✅
- **Dunia:** Kampung Huruf (waktu senja)
- **Cara bermain:** bayang hitam sebuah huruf terpancar di dinding rumah. Tiga huruf berwarna berdiri di depan lampu pelita. Anak memilih huruf yang memiliki bayang itu.
- **Kemahiran:** diskriminasi visual — terutamanya huruf serupa (b/d, p/q).
- **Mekanik utama:** padanan bentuk ke bayang.
- **Cara menang:** 6 padanan.
- **Ganjaran:** pelita untuk Laman Pip.
- **Kesukaran:** ★ huruf sangat berbeza → ★★★ pasangan keliru sahaja (b, d, p, q bersama).

#### 5. Pintu Ajaib 🔜
- **Dunia:** Istana Bintang / Kampung Huruf
- **Cara bermain:** sederet pintu berwarna, setiap satu dengan huruf. Pip berkata "Ketuk pintu **s**!" Anak mengetuk (tap 2 kali). Pintu terbuka dan mendedahkan kejutan lucu (kucing tidur, ayam menari, Pip berpakaian pelik) yang namanya bermula dengan huruf itu (**s**: Sotong menari!).
- **Kemahiran:** pengenalan huruf + kaitan huruf–perkataan.
- **Mekanik utama:** pilih + ganjaran kejutan (surprise reveal).
- **Cara menang:** buka 5 pintu betul.
- **Ganjaran:** kejutan yang dibuka disimpan dalam Album ("Koleksi Kejutan").
- **Kesukaran:** ★ 2 pintu → ★★★ 6 pintu, sebutan huruf diganti dengan bunyi huruf.

#### 6. Kedai Runcit Huruf 🔜
- **Dunia:** Kampung Huruf
- **Cara bermain:** barang-barang (tin, kotak, botol) dengan huruf dan nombor bercampur tiba di kedai. Anak menyusun ke rak: "rak huruf" dan "rak nombor". Lanjutan: rak "huruf lurus" (l, t, i) vs "huruf bulat" (o, c, a).
- **Kemahiran:** diskriminasi huruf vs bukan huruf, klasifikasi ciri bentuk.
- **Mekanik utama:** menyusun kategori (sorting).
- **Cara menang:** isi semua rak.
- **Ganjaran:** troli kedai untuk Laman Pip.
- **Kesukaran:** ★ huruf vs bentuk → ★★ huruf vs nombor → ★★★ mengikut ciri bentuk.

#### 7. Kunang Kelip 🔜
- **Dunia:** Hutan Bunyi (malam)
- **Cara bermain:** dalam gelap, kunang-kunang berkumpul membentuk huruf selama 2 saat, kemudian bertaburan. Anak memilih huruf yang tadi terbentuk daripada 3 pilihan.
- **Kemahiran:** ingatan visual huruf, pengenalan bentuk utuh.
- **Mekanik utama:** lihat sekejap → ingat → pilih.
- **Cara menang:** 6 jawapan betul.
- **Ganjaran:** balang kunang-kunang yang bercahaya di Laman Pip pada waktu malam.
- **Kesukaran:** ★ 3 saat, pilihan berbeza → ★★★ 1.5 saat, pilihan serupa, kemudian dua huruf sekali gus.

#### 8. Keretapi Abjad ✅
- **Dunia:** Stesen Ejaan
- **Cara bermain:** keretapi abjad A–Z berhenti, tetapi beberapa gerabak kosong. Huruf-huruf berdiri di platform. Anak menyeret huruf yang betul ke gerabak kosong supaya keretapi boleh bergerak (sambil lagu abjad dimainkan).
- **Kemahiran:** urutan abjad.
- **Mekanik utama:** melengkapkan urutan.
- **Cara menang:** isi semua gerabak kosong.
- **Ganjaran:** keretapi berjalan sambil menyanyi lagu ABC versi CILUKA; tiket stiker.
- **Kesukaran:** ★ 1 gerabak kosong, sekitar huruf awal → ★★★ 5 gerabak kosong bertaburan.

---

### B. Bunyi dan Fonik

#### 9. Siapa Panggil? ✅
- **Dunia:** Hutan Bunyi
- **Cara bermain:** haiwan-haiwan bersembunyi di dalam semak, setiap semak dengan huruf di depannya. Uhu berkata: "Siapa yang panggil **/mmm/**?" Bunyi kedengaran. Anak menyentuh semak dengan huruf **m** — dan **monyet** melompat keluar.
- **Kemahiran:** padanan bunyi → huruf.
- **Mekanik utama:** dengar → pilih.
- **Cara menang:** 6 haiwan dijumpai.
- **Ganjaran:** haiwan hutan untuk Album.
- **Kesukaran:** ★ 2 semak, bunyi sangat berbeza → ★★★ 4 semak, pasangan bunyi keliru (m/n, b/p).

#### 10. Peti Misteri Bunyi ✅
- **Dunia:** Hutan Bunyi / Laman Pip
- **Cara bermain:** sebuah peti bergegar dan mengeluarkan bunyi awal perkataan ("/k/... /k/..."). Anak memilih huruf untuk "kunci" peti. Peti terbuka — **Ciluk-BA!** — **kucing** melompat keluar sambil mengiau.
- **Kemahiran:** bunyi awal perkataan, kaitan bunyi–huruf–objek.
- **Mekanik utama:** misteri + dedah.
- **Cara menang:** buka 5 peti.
- **Ganjaran:** objek yang keluar boleh "dibawa pulang" sebagai pelekat.
- **Kesukaran:** ★ 2 kunci huruf → ★★★ 4 kunci, termasuk digraf (ng, ny).

#### 11. Pancing Bunyi ✅
- **Dunia:** Hutan Bunyi (Air Terjun)
- **Cara bermain:** ikan berenang di kolam, setiap ikan membawa gambar (bola, nasi, mata, susu). Uhu berkata "Pancing ikan yang bermula dengan bunyi **/m/**!" Anak menyentuh ikan untuk memancing. Apabila diangkat, ikan menyebut namanya ("**m**ata!").
- **Kemahiran:** kesedaran fonem awal (tanpa melihat huruf dalam perkataan).
- **Mekanik utama:** tangkap objek bergerak dengan pengesahan audio.
- **Cara menang:** isi baldi dengan 5 ikan betul.
- **Ganjaran:** ikan untuk kolam Laman Pip.
- **Kesukaran:** ★ ikan perlahan, 2 bunyi → ★★★ ikan lebih laju, bunyi akhir perkataan ("pancing ikan yang **berakhir** dengan /t/").

#### 12. Gua Gema 🔜
- **Dunia:** Hutan Bunyi (Gua Gema)
- **Cara bermain:** anak menjerit ke dalam gua (secara simbolik — menekan butang mikrofon). Gua menggemakan satu perkataan, kemudian gema menjadi lebih pendek: "IKAN... ikan... i-... i-..." Anak memilih huruf bunyi pertama. Mod lanjutan: anak menyebut sendiri ke dalam gua (dirakam secara tempatan sahaja, dimainkan semula dengan kesan gema — **tiada pengecaman suara**, hanya keseronokan mendengar suara sendiri).
- **Kemahiran:** pengasingan fonem awal, artikulasi.
- **Mekanik utama:** audio + rakam suara sendiri.
- **Cara menang:** 5 gema dijawab.
- **Ganjaran:** kristal gua.
- **Kesukaran:** ★ perkataan bermula vokal → ★★★ perkataan dengan konsonan bergabung.

#### 13. Katak Lompat 🔜
- **Dunia:** Hutan Bunyi (kolam)
- **Cara bermain:** katak berada di tepi kolam. Daun teratai berhuruf terapung. Bunyi huruf dimainkan; anak menyentuh daun yang betul dan katak melompat ke situ. Rangkaian lompatan membawa katak menyeberang kolam.
- **Kemahiran:** bunyi → huruf dalam urutan; pra-ejaan (lompatan boleh mengeja perkataan pendek di tahap tinggi).
- **Mekanik utama:** pilih laluan (path choosing).
- **Cara menang:** katak sampai ke seberang.
- **Ganjaran:** katak menyanyi dalam koir Hutan Bunyi.
- **Kesukaran:** ★ 4 lompatan dengan bunyi berbeza → ★★★ lompatan mengeja "I-K-A-N".

#### 14. Radio Pip ✅
- **Dunia:** Laman Pip / Hutan Bunyi
- **Cara bermain:** Pip mempunyai radio lama. Dua bunyi dimainkan ("/m/... /n/"). Anak menekan **dua belon sama warna** jika bunyi sama, **dua belon berbeza warna** jika bunyi berbeza.
- **Kemahiran:** diskriminasi pendengaran — asas penting untuk m/n, b/p, d/t.
- **Mekanik utama:** sama/berbeza (dua pilihan sahaja — sangat sesuai untuk anak 3 tahun).
- **Cara menang:** 8 jawapan.
- **Ganjaran:** radio Pip memainkan lagu pendek.
- **Kesukaran:** ★ bunyi haiwan (lembu vs kucing) → ★★ bunyi huruf berbeza → ★★★ pasangan bunyi keliru.

---

### C. Menulis (butiran teknikal di Bahagian 13)

#### 15. Jejak Semut ✅
- **Dunia:** Taman Calit
- **Cara bermain:** seekor semut mahu sampai ke gula. Anak melukis laluan untuk semut mengikut garis panduan (lurus, lengkung, zigzag). Semut berjalan di atas garisan yang dilukis.
- **Kemahiran:** kawalan motor, pra-menulis.
- **Mekanik utama:** jejak laluan.
- **Cara menang:** semut sampai ke gula dalam 4 laluan.
- **Ganjaran:** koloni semut di Laman Pip yang berjalan dalam barisan comel.
- **Kesukaran:** ★ garisan lurus pendek lebar → ★★★ zigzag panjang dan sempit.

#### 16. Cahaya Kunang (Sambung Titik) ✅
- **Dunia:** Taman Calit (malam) / Studio
- **Cara bermain:** kunang-kunang bernombor berkelip dalam gelap. Anak menyambung titik dengan jari, menghasilkan garisan bercahaya. Apabila siap, bentuk/huruf menyala dan bertukar menjadi objek (bulatan → bulan).
- **Kemahiran:** urutan, motor halus, pembentukan huruf.
- **Mekanik utama:** sambung titik.
- **Cara menang:** siapkan gambar.
- **Ganjaran:** objek cahaya untuk langit malam Laman Pip.
- **Kesukaran:** ★ 3–4 titik besar → ★★★ huruf penuh dengan 8–10 titik kecil.

#### 17. Tulis Atas Pasir ✅
- **Dunia:** Studio Calit Comot (Medium Pasir)
- **Cara bermain:** anak menulis huruf di atas pasir pantai mengikut titik panduan. Jari meninggalkan alur pasir realistik. Selepas siap, ombak datang — dan sebelum memadam tulisan, huruf itu **bangun** dan berlari ke daratan.
- **Kemahiran:** penulisan huruf berpandu.
- **Mekanik utama:** jejak huruf dengan tekstur.
- **Cara menang:** tulis huruf 3 kali (setiap kali panduan berkurang).
- **Ganjaran:** huruf hidup → masuk Kampung Huruf.
- **Kesukaran:** ★ garis putus-putus penuh → ★★★ hanya titik mula.

#### 18. Lukis Langit ✅
- **Dunia:** Studio Calit Comot (Medium Awan)
- **Cara bermain:** anak mengemudi sebuah kapal terbang kecil dengan jari; asap putih di belakangnya membentuk huruf besar di langit.
- **Kemahiran:** penulisan huruf saiz besar (pergerakan bahu dan lengan — penting untuk anak muda).
- **Mekanik utama:** jejak dengan objek kemudi.
- **Cara menang:** siapkan huruf; awan huruf terapung di langit.
- **Ganjaran:** awan berbentuk huruf di langit Laman Pip.
- **Kesukaran:** ★ huruf lurus (l, t) → ★★★ huruf berlengkung kompleks (g, s).

#### 19. Roti Canai Comot 🔜
- **Dunia:** Studio Calit Comot (Medium Kedai Mamak)
- **Cara bermain:** Comot menjadi tukang roti. Anak menulis huruf di atas roti canai menggunakan kuah kari (atau di atas kek dengan aising). Pelanggan watak datang dan "makan" huruf itu sambil menyebutnya.
- **Kemahiran:** menulis huruf / nama sendiri.
- **Mekanik utama:** menulis bebas dengan tekstur lucu.
- **Cara menang:** siapkan 3 pesanan.
- **Ganjaran:** gerai mamak mini untuk Laman Pip.
- **Kesukaran:** ★★ huruf berpandu → ★★★ "pelanggan nak nama dia!" (menulis perkataan).

#### 20. Tali Wau ✅
- **Dunia:** Taman Calit (Tanjung Wau)
- **Cara bermain:** wau bulan terbang tinggi. Angin bertiup mengikut laluan berbentuk (lengkung, gelombang, gelung). Anak menyeret jari mengikut laluan angin supaya wau tidak jatuh; wau meninggalkan jejak berwarna.
- **Kemahiran:** gerakan lengkung berterusan, kawalan kelajuan.
- **Mekanik utama:** jejak berterusan (tanpa angkat jari).
- **Cara menang:** wau sampai ke awan.
- **Ganjaran:** wau baharu (corak berbeza) untuk Laman Pip.
- **Kesukaran:** ★ lengkung lebar → ★★★ gelung kecil (persediaan menulis e, l bersambung).

#### 21. Huruf Hidup (Tulis Tanpa Panduan) ✅
- **Dunia:** Studio Calit Comot (Papan Ajaib)
- **Cara bermain:** Comot berbisik sebuah huruf ("Tulis **k**!"). Papan kosong, hanya titik mula yang bercahaya. Anak menulis dari ingatan. Jika berjaya dikenali, huruf mendapat mata, tangan, kaki, dan menari.
- **Kemahiran:** menulis huruf yang didengar (dikte), ingatan bentuk huruf.
- **Mekanik utama:** penulisan bebas + pengecaman bentuk.
- **Cara menang:** 3 huruf berjaya ditulis.
- **Ganjaran:** "kostum" huruf (setiap huruf hidup boleh dipakaikan topi).
- **Kesukaran:** ★★ huruf yang baru dijejak → ★★★ huruf rawak yang sudah dikuasai.

#### 22. Nama Aku! ✅
- **Dunia:** Studio Calit Comot
- **Cara bermain:** ibu bapa memasukkan nama anak (atau nama panggilan). Comot membentangkan "panji nama". Anak menulis setiap huruf namanya mengikut panduan; akhirnya panji terbang di atas rumah anak di Laman Pip.
- **Kemahiran:** menulis nama sendiri — milestone emosi yang sangat besar.
- **Mekanik utama:** penulisan perkataan bertingkat.
- **Cara menang:** siapkan nama.
- **Ganjaran:** panji nama; rekod pertama masuk **Buku Hebat**.
- **Kesukaran:** ★★ semua huruf berpandu → ★★★ tanpa panduan.

---

### D. Suku Kata

#### 23. Gerai Kuih Suku Kata ✅
- **Dunia:** Pasar Suku Kata
- **Cara bermain:** pelanggan watak datang ke gerai Mak Cik Kuih: "Saya nak kuih **bu**!" Anak memilih kuih yang bertulis **bu** daripada dulang (ba, bi, bu, be, bo) dan meletakkannya dalam beg plastik. Pelanggan menjamah dan berkata "Sedapnya, **bu**!"
- **Kemahiran:** mengenal suku kata terbuka.
- **Mekanik utama:** layan pesanan (order fulfilment).
- **Cara menang:** layan 6 pelanggan.
- **Ganjaran:** kuih untuk Album; gerai menjadi lebih meriah.
- **Kesukaran:** ★★ satu keluarga konsonan, 3 pilihan → ★★★ campuran keluarga, pelanggan memesan 2 kuih sekali gus.

#### 24. Kompang Suku Kata ✅
- **Dunia:** Pasar Suku Kata (Pentas)
- **Cara bermain:** perkataan disebut dengan gambar ("RU-MAH"). Anak memukul kompang mengikut bilangan suku kata — **dum-dum**. Lampu pentas menyala untuk setiap pukulan.
- **Kemahiran:** kesedaran suku kata (fonologi) — **boleh dimain oleh anak 3 tahun yang belum kenal huruf**.
- **Mekanik utama:** ketuk mengikut irama.
- **Cara menang:** 6 perkataan.
- **Ganjaran:** kompang mini di Laman Pip yang boleh dipukul.
- **Kesukaran:** ★ perkataan 1–2 suku kata → ★★★ 3–4 suku kata (KE-RE-TA, KE-RU-SI, RA-MA-RA-MA).

#### 25. Gabung Kuih ✅
- **Dunia:** Pasar Suku Kata
- **Cara bermain:** dua kuih suku kata (**bo** dan **la**) diletakkan di atas dulang. Anak menyeret kuih kedua ke sebelah kuih pertama. Kuih bercantum, berkilau — dan **Ciluk-BA!** — bertukar menjadi **BOLA**. Suku kata disebut, kemudian perkataan penuh.
- **Kemahiran:** blending suku kata — inti membaca BM.
- **Mekanik utama:** gabung dua elemen → transformasi.
- **Cara menang:** gabungkan 5 perkataan.
- **Ganjaran:** perkataan yang dibentuk muncul sebagai objek di Laman Pip.
- **Kesukaran:** ★★ 2 suku kata dengan susunan betul → ★★★ 3 suku kata bercampur (perlu susun).

#### 26. Sampan Suku Kata 🔜
- **Dunia:** Pasar Suku Kata (Sungai di belakang pasar)
- **Cara bermain:** sampan kecil membawa suku kata hanyut di sungai. Gambar perkataan di jeti (contohnya **ikan**). Anak menangkap sampan dalam urutan betul (**i**, kemudian **kan**).
- **Kemahiran:** urutan suku kata, ejaan suku kata.
- **Mekanik utama:** tangkap objek bergerak dalam urutan.
- **Cara menang:** 5 perkataan dibentuk.
- **Ganjaran:** sampan untuk Laman Pip.
- **Kesukaran:** ★★ arus perlahan, tiada pengganggu → ★★★ arus laju, ada suku kata pengganggu.

#### 27. Mesin Ais Kacang ✅
- **Dunia:** Pasar Suku Kata
- **Cara bermain:** sebuah mesin ais kacang ajaib dengan dua corong: corong **konsonan** dan corong **vokal**. Anak memasukkan **B** + **A** → mesin berputar → keluar ais kacang dengan tulisan **BA** dan sebutan "ba!". Mod latihan: mesin meminta "Buat **BU**!".
- **Kemahiran:** pembentukan suku kata (KV) — kaedah "ba-bi-bu-be-bo" yang digunakan di tadika Malaysia.
- **Mekanik utama:** gabungan bahan (crafting).
- **Cara menang:** siapkan 5 pesanan ais.
- **Ganjaran:** perisa ais kacang baharu (koleksi lucu).
- **Kesukaran:** ★★ mod bebas (eksplorasi — apa sahaja yang dicampur akan berbunyi) → ★★★ pesanan khusus.
- **Nota:** mod bebas sangat bernilai — anak bereksperimen dan **mendengar** hasilnya, membina pemahaman sistematik tanpa tekanan.

#### 28. Pecah Kelapa 🔜
- **Dunia:** Pasar Suku Kata (gerai air kelapa)
- **Cara bermain:** sebiji kelapa besar dengan perkataan **KELAPA** tertulis. Anak "memotong" (leret jari) kelapa di tempat yang betul untuk memecahkannya kepada suku kata: **ke | la | pa**. Setiap potongan betul memercikkan air kelapa.
- **Kemahiran:** segmentasi suku kata (kebalikan blending).
- **Mekanik utama:** leret untuk memotong (swipe-slice).
- **Cara menang:** 5 kelapa dipecahkan.
- **Ganjaran:** pokok kelapa untuk Laman Pip.
- **Kesukaran:** ★★ 2 suku kata dengan petunjuk garis → ★★★ 3 suku kata tanpa petunjuk.

---

### E. Ejaan

#### 29. Gerabak Kata ✅
- **Dunia:** Stesen Ejaan
- **Cara bermain:** gambar **BAS** di papan stesen. Gerabak huruf B, A, S bertaburan di landasan simpang. Anak menyeret gerabak supaya bersambung dalam urutan betul. Keretapi berbunyi "pon pon!" dan bergerak.
- **Kemahiran:** menyusun huruf menjadi perkataan.
- **Mekanik utama:** susun urutan (sequencing).
- **Cara menang:** 4 perkataan, keretapi sampai ke stesen seterusnya.
- **Ganjaran:** stesen baharu di laluan keretapi.
- **Kesukaran:** ★★ 3 huruf, slot berbayang menunjukkan bentuk → ★★★ 5–6 huruf dengan huruf pengganggu.

#### 30. Huruf Tercicir ✅
- **Dunia:** Stesen Ejaan
- **Cara bermain:** papan tanda stesen tertulis **K_CING** — satu huruf telah jatuh ke landasan. Tiga huruf berada di landasan. Anak memilih huruf yang betul dan meletakkannya kembali. Papan tanda menyala dan kucing muncul di platform.
- **Kemahiran:** mengenal huruf dalam perkataan, ejaan separa.
- **Mekanik utama:** isi tempat kosong.
- **Cara menang:** baiki 5 papan tanda.
- **Ganjaran:** papan tanda stesen (koleksi).
- **Kesukaran:** ★★ huruf pertama hilang → ★★★ huruf tengah hilang, atau satu suku kata hilang.

#### 31. Doktor Kata (Ajar Pip) ✅
- **Dunia:** Stesen Ejaan / Laman Pip
- **Cara bermain:** Pip cuba mengeja dan tersilap: "Pip tulis **B-U-L-A**. Betul ke?" Gambar bola ditunjukkan. Anak menekan huruf yang salah (**U**) dan menggantikannya dengan **O**. Pip: "Oh! Terima kasih, Cikgu Kecil!"
- **Kemahiran:** mengesan ralat ejaan, pemahaman mendalam (Protégé Effect).
- **Mekanik utama:** cari dan baiki ralat — **peranan terbalik**.
- **Cara menang:** ajar Pip 4 perkataan.
- **Ganjaran:** Lencana "Cikgu Kecil"; Pip memakai cermin mata lucu.
- **Kesukaran:** ★★ ralat jelas (huruf sangat berbeza) → ★★★ ralat halus (b/d, huruf tertinggal, huruf tertukar susunan).
- **Nota:** sangat disukai anak 5–6 tahun. Ini salah satu cara terbaik menjaga anak yang lebih besar terus terlibat.

#### 32. Eja Dengar ✅
- **Dunia:** Stesen Ejaan (Pejabat Pos Stesen)
- **Cara bermain:** telefon lama di stesen berdering. Suara berkata "Tolong eja **SUSU**!" — **tiada gambar**. Anak mengeja menggunakan papan huruf.
- **Kemahiran:** ejaan berdasarkan audio sahaja (dikte).
- **Mekanik utama:** input papan huruf.
- **Cara menang:** 4 perkataan.
- **Ganjaran:** setem pos (koleksi).
- **Kesukaran:** ★★ papan huruf terhad (hanya huruf yang diperlukan + 2 pengganggu) → ★★★ papan huruf penuh.

#### 33. Sarang Kata ✅ ⭐ (ciri utama)
- **Dunia:** Laman Pip / Stesen Ejaan
- **Ringkas:** kumpul huruf dari seluruh pulau, tenun dalam sarang, tetaskan objek. Butiran penuh di **Bahagian 14**.

#### 34. Posmen Pip 🔜
- **Dunia:** Pulau Kata Ajaib / Kampung Huruf
- **Cara bermain:** Pip menjadi posmen dengan basikal. Sampul surat bertulis perkataan (**IKAN**, **BUKU**, **KUCING**). Rumah-rumah mempunyai gambar di pintu. Anak membaca perkataan dan menyeret surat ke rumah yang betul.
- **Kemahiran:** membaca perkataan (decode) dan padankan dengan makna.
- **Mekanik utama:** baca → hantar.
- **Cara menang:** hantar 6 surat.
- **Ganjaran:** watak penghuni rumah melambai dan memberi "surat balasan" (pelekat).
- **Kesukaran:** ★★ perkataan 2 suku kata dengan sebutan bila disentuh → ★★★ tiada sebutan, perkataan hampir serupa (BUKU / BAKU / KUKU).

---

### F. Memori dan Logik

#### 35. Kad Ingat Utan ✅
- **Dunia:** Rimba Ingat (dalam V1 di Kampung Huruf)
- **Cara bermain:** Utan meletakkan kad terbalik di atas akar pokok. Anak membalik dua kad untuk mencari pasangan. Pasangan boleh jadi: huruf–huruf, huruf besar–kecil, gambar–huruf awal, gambar–perkataan.
- **Kemahiran:** memori kerja + ulang kaji huruf/perkataan.
- **Mekanik utama:** kad memori klasik (tetapi kandungan adaptif).
- **Cara menang:** semua pasangan dijumpai.
- **Ganjaran:** daun batik (koleksi).
- **Kesukaran:** ★ 4 kad (2 pasangan) → ★★★ 12 kad dengan pasangan konsep (gambar ↔ perkataan).

#### 36. Corak Batik 🔜
- **Dunia:** Rimba Ingat
- **Cara bermain:** sehelai kain batik belum siap. Corak berulang (bunga–daun–bunga–daun–?). Anak memilih motif seterusnya. Tahap tinggi: corak huruf (a–b–a–b–?) atau suku kata (ba–bi–ba–bi–?).
- **Kemahiran:** pengecaman pola, pemikiran logik.
- **Mekanik utama:** lengkapkan pola.
- **Cara menang:** siapkan kain.
- **Ganjaran:** kain batik digantung di Laman Pip (corak unik ikut pilihan anak).
- **Kesukaran:** ★ AB → ★★ ABB, ABC → ★★★ AABBCC dan corak huruf.

#### 37. Mana Lain? 🔜
- **Dunia:** Rimba Ingat
- **Cara bermain:** empat objek di atas dahan; satu tidak sepadan (3 bermula dengan **b**, satu dengan **m**; atau 3 huruf sama, 1 terbalik). Anak menyentuh yang berbeza; ia jatuh dengan lucu ke dalam semak.
- **Kemahiran:** klasifikasi, diskriminasi visual/bunyi.
- **Mekanik utama:** odd-one-out.
- **Cara menang:** 6 pusingan.
- **Ganjaran:** buah rimba (koleksi).
- **Kesukaran:** ★ beza warna/bentuk → ★★★ beza bunyi awal atau huruf cermin (b vs d).

#### 38. Ikut Pip 🔜
- **Dunia:** Rimba Ingat / Laman Pip
- **Cara bermain:** Pip menyentuh beberapa cendawan berhuruf dalam urutan (setiap satu berbunyi). Anak mengulangi urutan yang sama.
- **Kemahiran:** memori kerja auditori-visual — penting untuk mengingat urutan huruf dalam ejaan.
- **Mekanik utama:** ulang urutan (Simon says).
- **Cara menang:** ulang 5 urutan.
- **Ganjaran:** Pip menari mengikut urutan yang anak cipta.
- **Kesukaran:** ★ 2 langkah → ★★★ 5 langkah; pada tahap tertinggi, urutan itu mengeja perkataan sebenar (Pip: "Eh! Kita eja **IBU**!").

#### 39. Susun Cerita 🔜
- **Dunia:** Pulau Kata Ajaib (Penyu Pena)
- **Cara bermain:** Penyu Pena menjatuhkan 3 gambar cerita (anak tanam benih → benih tumbuh → bunga mekar). Anak menyusun mengikut urutan. Cerita dimainkan sebagai animasi pendek dengan narasi.
- **Kemahiran:** urutan, pemahaman naratif — asas kefahaman membaca.
- **Mekanik utama:** susun gambar.
- **Cara menang:** 3 cerita.
- **Ganjaran:** cerita disimpan dalam "Rak Cerita" di Laman Pip.
- **Kesukaran:** ★ 3 gambar jelas → ★★★ 4–5 gambar, dengan satu ayat ringkas setiap gambar.

---

### G. Pengembaraan (gabungan kemahiran)

#### 40. Lebah Madu Huruf 🔜
- **Dunia:** Taman Calit (Taman Bunga) / Istana
- **Cara bermain:** anak mengemudi lebah dengan jari. Bunga-bunga berhuruf. Misi: kumpul madu dari bunga **I**, **B**, **U** mengikut urutan untuk mengisi sarang madu dengan perkataan **IBU**.
- **Kemahiran:** ejaan + kawalan motor.
- **Mekanik utama:** kemudi + kutip mengikut urutan.
- **Cara menang:** isi 3 sarang madu (3 perkataan).
- **Ganjaran:** sarang lebah untuk Laman Pip.
- **Kesukaran:** ★★ bunga diam, perkataan 3 huruf → ★★★ bunga bergoyang, angin, perkataan lebih panjang.

#### 41. Peta Harta Karun ✅
- **Dunia:** Kepulauan (merentas pulau) — mod Misi Mingguan
- **Cara bermain:** Pip menjumpai peta koyak. Setiap cebisan peta tersembunyi di pulau berbeza dan dibuka dengan menyelesaikan cabaran pendek (cari huruf, tulis bentuk, gabung kuih, eja perkataan). Apabila semua cebisan dikumpul, peta menunjukkan **X** di Laman Pip — anak "menggali" dan menemui peti harta.
- **Kemahiran:** gabungan; naratif membina motivasi.
- **Mekanik utama:** pencarian berbilang langkah (quest).
- **Cara menang:** kumpul 4 cebisan peta.
- **Ganjaran:** harta istimewa (kostum Pip mingguan).
- **Kesukaran:** cebisan disesuaikan oleh Kompas Pip mengikut tahap.

#### 42. Selamatkan Huruf ✅
- **Dunia:** Istana Bintang (Boss mini setiap pulau)
- **Cara bermain:** Si Senyap telah menyerap huruf-huruf ke dalam gelembung awan kelabu. Setiap gelembung pecah apabila anak menyelesaikan cabaran huruf itu — sebut bunyi, tulis, atau eja perkataan yang mengandunginya. Huruf yang bebas bersorak dan pulang.
- **Kemahiran:** penguasaan gabungan (boss level).
- **Mekanik utama:** cabaran berbilang mekanik dalam satu pusingan.
- **Cara menang:** bebaskan semua huruf (5–8 gelembung).
- **Ganjaran:** **Sijil Hebat** untuk pulau itu + Lencana Bintang.
- **Kesukaran:** cabaran diambil daripada item yang sudah "dikuasai" — boss ialah **perayaan penguasaan**, bukan halangan yang menakutkan.

#### 43. Peti Ciluk (Mystery Box) ✅
- **Dunia:** Laman Pip
- **Cara bermain:** selepas 3 misi harian siap, Peti Ciluk muncul berkilau ungu. Untuk membukanya, anak menyelesaikan "kunci" — satu cabaran 20 saat (contohnya tulis huruf kegemaran, atau sebut bunyi). Peti terbuka dengan animasi besar.
- **Kemahiran:** ulang kaji ringan.
- **Mekanik utama:** cabaran ringkas + pendedahan.
- **Cara menang:** buka peti.
- **Ganjaran:** satu item yang bermakna (lihat Bahagian 15 — tiada sistem kekerapan/"rarity" ala loot box).
- **Kesukaran:** sentiasa mudah — ini hadiah, bukan ujian.

#### 44. Puzzle Pulau 🔜
- **Dunia:** Gua Ciluk
- **Cara bermain:** gambar jigsaw sebuah pemandangan (contohnya pasar malam). Setiap kepingan puzzle diperoleh dengan menjawab satu soalan pendek. Anak meletakkan kepingan sendiri.
- **Kemahiran:** penyelesaian ruang + ulang kaji gabungan.
- **Mekanik utama:** jigsaw.
- **Cara menang:** gambar lengkap — dan **gambar menjadi hidup** (animasi).
- **Ganjaran:** gambar hidup boleh dilihat dalam Album.
- **Kesukaran:** ★ 4 kepingan → ★★★ 12 kepingan.

#### 45. Bas Sekolah Pip 🔜
- **Dunia:** Kampung Huruf → Stesen Ejaan (jalan raya)
- **Cara bermain:** Pip memandu bas sekolah. Di setiap perhentian, watak menunggu dengan papan nama. Pip berkata "Kita hanya ambil penumpang yang nama dia bermula dengan **S**!" Anak menekan watak yang betul untuk naik bas (Sani, Siti, Sotong...).
- **Kemahiran:** bunyi awal, membaca perkataan awal.
- **Mekanik utama:** pilih dalam aliran (objek tiba berterusan).
- **Cara menang:** bas penuh (6 penumpang).
- **Ganjaran:** bas sekolah untuk Laman Pip.
- **Kesukaran:** ★★ nama diucap → ★★★ nama hanya ditulis.

#### 46. Cikgu Kecil (Kelas Pip) 🌙
- **Dunia:** Laman Pip (sekolah kecil)
- **Cara bermain:** Pip dan kawan-kawan (Utan, Uhu, Comot) duduk di kelas. Anak menjadi **cikgu**. Murid-murid "menjawab" soalan, kadang-kadang betul, kadang-kadang salah. Anak menekan ✓ atau ✗ dan membetulkan jawapan yang salah.
- **Kemahiran:** penilaian kendiri, pemahaman mendalam semua peringkat.
- **Mekanik utama:** semakan peranan terbalik berskala.
- **Cara menang:** "tanda" 8 jawapan.
- **Ganjaran:** papan hitam kelas yang memaparkan "Cikgu [Nama]".
- **Kesukaran:** soalan diambil dari item dikuasai anak — anak sentiasa berasa pakar.

---

### Ringkasan pemilihan mini game V1 (18 permainan)

| Dunia | Permainan V1 |
|---|---|
| Taman Calit | Jejak Semut, Tali Wau, Cahaya Kunang, Belon Huruf |
| Kampung Huruf | Ciluk-BA Huruf, Mak Cari Anak, Bayang Huruf, Kad Ingat Utan |
| Hutan Bunyi | Siapa Panggil?, Peti Misteri Bunyi, Pancing Bunyi, Radio Pip |
| Pasar Suku Kata | Gerai Kuih, Kompang Suku Kata, Gabung Kuih, Mesin Ais Kacang |
| Stesen Ejaan | Keretapi Abjad, Gerabak Kata, Huruf Tercicir, Doktor Kata, Eja Dengar |
| Studio Calit Comot | Tulis Atas Pasir, Lukis Langit, Huruf Hidup, Nama Aku! |
| Laman Pip / Istana | Sarang Kata, Selamatkan Huruf, Peti Ciluk, Peta Harta Karun |

*(Jumlah tersenarai melebihi 18 kerana beberapa "permainan" studio berkongsi enjin tracing yang sama — dari segi pembangunan, ia satu sistem dengan 4 "medium". Kiraan mekanik unik V1 ialah 18; 28 pengalaman yang dirasai anak.)*

**Kenapa ini cara pintar:** satu enjin (contoh: enjin tracing, enjin seret-dan-lepas, enjin pilih-objek-bergerak) boleh menjana beberapa permainan berbeza dengan tukar aset, cerita dan peraturan. Pasukan kecil membina **~8 enjin** dan mendapat **~28 pengalaman**.

| Enjin teras | Permainan yang menggunakannya |
|---|---|
| Sentuh-dedah | Ciluk-BA Huruf, Peti Misteri Bunyi, Pintu Ajaib |
| Pilih objek bergerak | Belon Huruf, Pancing Bunyi, Sampan, Bas Sekolah |
| Seret & lepas / susun | Mak Cari Anak, Keretapi Abjad, Gerabak Kata, Gabung Kuih, Huruf Tercicir |
| Pilih statik (audio/visual) | Bayang Huruf, Siapa Panggil?, Radio Pip, Gerai Kuih |
| Jejak & tulis | Jejak Semut, Tali Wau, Cahaya Kunang, Tulis Pasir, Lukis Langit, Huruf Hidup, Nama Aku |
| Ketuk irama | Kompang Suku Kata |
| Kad memori | Kad Ingat Utan |
| Papan huruf / ralat | Eja Dengar, Doktor Kata, Sarang Kata |

---

## 13. Magic Writing Studio — **Studio Calit Comot**

> *Di sebuah bilik ajaib di sebalik pintu berkilau, tinggal Comot — titisan dakwat ungu yang boleh menjadi apa sahaja. Comot tak pandai bercakap banyak, tetapi dia pandai menunjuk. Bila kamu menulis, Comot ikut di hujung jari kamu.*

### Pengalaman

Pintu studio terbuka dengan bunyi "plop!". Comot melompat keluar dan meregang menjadi pensel. Bilik studio mempunyai **4 medium**, setiap satu dengan rasa dan bunyi berbeza:

| Medium | Rupa & rasa | Bunyi | Tujuan |
|---|---|---|---|
| **Pasir Pantai** | Alur pasir dengan butiran halus, ombak di latar | Desir pasir | Jejak dengan tekstur — rasa "menulis sebenar" |
| **Langit Awan** | Kapal terbang kecil meninggalkan asap | Deruman lembut | Huruf saiz besar — pergerakan lengan |
| **Cahaya Ajaib** | Garisan neon bercahaya di latar gelap, percikan bintang | Dentingan bertingkat (pitch naik apabila jejak betul) | Maklum balas paling jelas |
| **Papan Kapur Ajaib** | Papan hijau tadika, kapur warna-warni | Geseran kapur | Menulis tanpa panduan, "serius" |
| *(V1.5)* Kedai Mamak | Kuah kari atas roti canai | Bunyi lucu | Seronok, menulis nama/perkataan |

**Medium membuka secara berperingkat** sebagai ganjaran, bukan semua sekali gus.

### Keajaiban tanda tangan: **"Huruf yang kamu tulis menjadi hidup"**

Apabila anak berjaya menulis huruf:
1. Huruf **bergetar** dan bersinar.
2. **Ciluk-BA!** — dua mata terbuka pada huruf itu.
3. Tangan dan kaki kecil tumbuh.
4. Huruf menyebut dirinya ("**k**!") dan melakukan aksi personalitinya (k menendang bola, s bersiul, o berguling).
5. Huruf **berjalan keluar** dari studio — dan kini tinggal di Kampung Huruf.

**Yang penting:** huruf hidup itu menggunakan **bentuk tulisan sebenar anak** (sedikit dikemaskan, tetapi masih mengekalkan ciri tulisan anak). Huruf "a" Aisyah yang sedikit senget akan kekal senget di Kampung Huruf. Ini memberi rasa milik yang luar biasa: *"Itu huruf AKU."*

Secara teknikal, ini boleh dicapai dengan menggunakan laluan (stroke) yang dilukis anak, dilicinkan, dan ditambah mata/anggota sebagai lapisan animasi di atasnya — tidak memerlukan teknologi canggih.

### Progression 8 langkah

| Langkah | Apa anak buat | Panduan | Toleransi |
|---|---|---|---|
| 1. Kenal Bentuk | Melihat Comot menjadi bentuk; menyentuh untuk "menggeletek" | Animasi | — |
| 2. Gerak Tangan | Garisan bebas — semut, wau, ombak (Taman Calit) | Laluan lebar | Sangat longgar |
| 3. Jejak Laluan | Mengikut laluan bentuk (lurus, lengkung, bulatan) | Laluan + anak panah | Longgar |
| 4. Jejak Huruf | Huruf penuh dengan garis putus-putus, nombor strok, anak panah | Penuh | Sederhana |
| 5. Tulis Berpandu | Huruf pudar 30% + titik mula | Separa | Sederhana |
| 6. Tulis Tanpa Panduan | Hanya titik mula (kemudian tiada) | Minimum | Sederhana-ketat |
| 7. Tulis Perkataan | 2–4 huruf dalam baris, dengan garis asas | Garis asas | Sederhana |
| 8. Tulis Nama Sendiri | Nama sendiri — milestone | Berperingkat | Sederhana |

### Teknologi input — cadangan praktikal

#### 1. Model huruf (templat strok)

Setiap huruf disimpan sebagai **senarai strok berurutan**, setiap strok sebagai titik-titik laluan dengan arah. Contoh "a" (satu tingkat): strok 1 = lengkung lawan jam bermula dari kanan atas; strok 2 = garis menegak di kanan, dari atas ke bawah.

**Templat mesti mengikut cara pembentukan huruf yang diajar di prasekolah Malaysia** — perlu disahkan oleh guru prasekolah kerana ada variasi (contohnya sama ada "b" bermula dari tiang atau tidak).

#### 2. Pengesanan laluan: sistem "Titik Semak" (checkpoint)

Setiap strok dibahagikan kepada **titik semak** (contohnya 8–15 titik sepanjang laluan). Ketika anak menulis:
- Jika jari melalui berhampiran titik semak (dalam radius toleransi), titik itu "dinyalakan" (bersinar).
- Titik semak mesti dinyalakan **dalam urutan** untuk dikira — ini cara mengesan arah.
- Strok dikira siap apabila **≥ 75%** titik semak dinyalakan dalam urutan dan titik akhir dicapai.

Ini mudah dibina, ringan, dan memberi maklum balas visual segera (titik yang menyala).

#### 3. Toleransi yang menyesuaikan diri

| Konteks | Radius toleransi (berbanding tinggi huruf) |
|---|---|
| Langkah 2–3, anak 3 tahun / baru | ~15% |
| Langkah 4 (biasa) | ~11% |
| Langkah 5–6 | ~8% |
| Kompas Pip mengesan kecewa (3 cubaan gagal) | Tambah 3% secara automatik |

Toleransi juga diskala mengikut saiz skrin (telefon kecil vs tablet).

#### 4. Mengesan arah salah

Jika titik semak dinyalakan dalam **urutan terbalik** (contohnya anak melukis tiang "b" dari bawah ke atas):
- Tulisan tidak dipadam serta-merta.
- Comot muncul dengan ekspresi "fikir", kemudian **menunjukkan** arah betul dengan anak panah beranimasi dari titik mula.
- Pip/Comot berkata: *"Ooh, cantik! Tapi huruf ni suka mula dari atas."*
- **Arah salah tidak dikira gagal pada Langkah 2–4** — anak tetap boleh siap, cuma bintang kurang dan Kompas Pip mencatat "arah perlu dibimbing". Pada Langkah 5–6, anak diminta cuba semula sekali dengan bimbingan.

**Mengapa arah penting:** arah yang betul membina kelancaran dan tulisan bersambung kelak. Tetapi untuk anak 3–4 tahun, keyakinan lebih penting daripada kesempurnaan.

#### 5. Penilaian tulisan bebas (Langkah 6–8)

Untuk menulis **tanpa panduan**, sistem perlu "mengenal" huruf yang ditulis. Cadangan jujur:

| Kaedah | Ketepatan | Kerumitan | Cadangan |
|---|---|---|---|
| Rangkaian neural pengecaman tulisan tangan | Tinggi | Tinggi, model besar, data latihan tulisan kanak-kanak sukar didapati | ❌ V1 |
| **Pengecam awan titik ringkas** (keluarga algoritma "$P / $Q recognizer" — dikenali dalam penyelidikan antara muka, ringan, berjalan dalam pelayar) | Baik untuk set kecil | Rendah | ✅ **V1** |
| Bandingkan dengan templat sahaja (jarak titik) | Sederhana | Sangat rendah | ✅ sebagai sandaran |

**Helah penting:** sistem **tidak perlu mengenal semua 26 huruf** sekali gus. Ia hanya perlu menjawab: *"Adakah ini lebih menyerupai huruf sasaran (k) berbanding 3–4 huruf pengganggu yang serupa (h, l, x)?"* Masalah klasifikasi kecil ini jauh lebih tepat dan stabil.

Ambang lulus sengaja **murah hati**. Lebih baik sekali-sekala meluluskan huruf yang tidak sempurna daripada menolak usaha yang jujur — seorang guru tadika pun begitu.

#### 6. Tangga bantuan (hint ladder)

| Tahap | Pencetus | Bantuan |
|---|---|---|
| 0 | — | Titik mula bercahaya berdenyut |
| 1 | 5 saat tiada sentuhan | Comot melompat ke titik mula dan menunjuk |
| 2 | 1 cubaan gagal | "Tangan hantu" — animasi jari lutsinar menulis huruf itu sekali |
| 3 | 2 cubaan gagal | Comot "memegang" — garisan anak sedikit ditarik ke arah laluan betul (bantuan magnet) |
| 4 | 3 cubaan gagal | "Kita tulis sama-sama" — Comot menulis separuh, anak menghabiskan; kemudian beralih ke huruf lain dan akan kembali kemudian |

#### 7. Mengelakkan kecewa — peraturan emas

- **Tiada skrin gagal.** Setiap cubaan menghasilkan sesuatu yang cantik (garisan bercahaya, alur pasir).
- **Bintang minimum 1** apabila anak menyiapkan huruf, walaupun dengan bantuan.
- **Maksimum 3 cubaan** pada huruf sama sebelum beralih ke huruf lain (huruf itu akan kembali melalui Kotak Ingatan).
- **Butang padam** besar dan jelas (span pasir / awan bertiup).
- **Abaikan sentuhan tapak tangan** — hanya satu titik sentuhan digunakan; sentuhan tambahan diabaikan.
- **Tiada had masa** dalam studio.

#### 8. Sokongan khas

- **Anak kidal:** pilihan dalam tetapan ibu bapa — titik mula dan panduan anak panah tidak ditutup oleh tangan; susun atur butang dicerminkan.
- **Stylus:** disokong secara automatik (sentuhan sama), tetapi produk direka untuk jari.
- **Huruf besar:** dibuka selepas keluarga huruf kecil berkaitan dikuasai.
- **Skrin kecil:** huruf dipaparkan sekurang-kurangnya 60% ketinggian kawasan menulis.

### Nilai sebenar

Studio ini menjawab keluhan ibu bapa paling biasa: *"Anak saya kenal huruf, tapi tak pandai tulis."* Dengan rekod tulisan dalam Buku Hebat, ibu bapa **melihat** tulisan anak berkembang — sesuatu yang aplikasi tracing biasa tidak tunjukkan.

**Batasan jujur:** menulis di skrin dengan jari **tidak menggantikan** memegang pensel di atas kertas (cengkaman pensel, tekanan). CILUKA menguatkan **bentuk dan arah**; Misi Rumah (Bahagian 19) menggalakkan latihan pensel sebenar. Nyatakan ini dengan jujur kepada ibu bapa — ia membina kepercayaan.

---

## 14. Magic Word Builder — **Sarang Kata**

> *Pip ialah anak burung tempua. Burung tempua menenun sarang yang paling cantik di dunia. Tapi sarang Pip istimewa — ia ditenun daripada HURUF. Dan bila perkataan siap ditenun... sesuatu akan menetas.*

### Mengapa "sarang" dan bukan "papan huruf"

Kebanyakan aplikasi ejaan: susun huruf → betul → bintang. Selesai.

Sarang Kata mengubahnya menjadi **kitaran pengembaraan + ciptaan**:
1. Huruf perlu **dicari** di dunia (bukan diberi).
2. Huruf **ditenun** (bukan sekadar disusun).
3. Perkataan **menetas menjadi objek sebenar** yang tinggal di pulau anak.
4. Objek itu **kekal dan berinteraksi** — perkataan menjadi milik anak.

### Aliran pengalaman — contoh "BOLA"

**Langkah 1 — Misi diterima.**
Pip di sarangnya, melihat sebiji telur berkilau. Bayang samar sebiji bola kelihatan di dalam telur.
Pip: *"Ada sesuatu dalam telur ni! Pip rasa... ia **BOLA**! Jom kita cari huruf B, O, L, A!"*
Di atas telur, 4 slot huruf kosong berbentuk bayang huruf.

**Langkah 2 — Cari huruf (Pemburuan).**
Pemandangan Laman Pip (atau satu pulau) — huruf B, O, L, A bersembunyi di tempat berbeza: B di belakang pokok, O bergolek di pantai, L tergantung di ampaian, A dalam pasu bunga. Anak mengintai dan mengutip ("Ciluk-BA!"). Setiap huruf yang dikutip **terbang** ke sarang dan menyebut bunyinya.
*(Untuk anak 3–4 tahun: huruf yang dicari bercahaya lebih terang. Untuk 5–6 tahun: ada huruf pengganggu yang perlu diabaikan — "Eh, itu huruf K, kita tak perlukan dia hari ni!")*

**Langkah 3 — Tenun (Susun).**
Huruf-huruf terapung di sekeliling sarang. Anak menyeret setiap huruf ke slot betul. Setiap kali huruf dimasukkan, helai anyaman bercahaya menyambungkannya — bunyi "**b**... **o**... **l**... **a**".
Bantuan: slot berbayang menunjukkan bentuk huruf (boleh dihilangkan pada tahap tinggi).

**Langkah 4 — Gabung (Blend).**
Apabila semua huruf dalam tempat, sarang berbunyi: "**bo**... **la**..." — suku kata menyala satu persatu. Kemudian: "**BOLA!**"
Anak diajak menyebut bersama (Pip: *"Jom sebut sama-sama: BOLA!"*). Tiada pengecaman suara — hanya jeda yang memberi masa anak menyebut.

**Langkah 5 — Menetas (Ciluk-BA!).**
Sarang bergegar. Telur retak. Cahaya. **Ciluk... BA!** Sebiji bola melompat keluar, melantun, dan terbang ke Laman Pip.

**Langkah 6 — Lihat dan dengar.**
Bola mendarat di Laman Pip. Gambar sebenar (ilustrasi) + perkataan BOLA tertulis di bawahnya + disebut sekali lagi. Pip bermain dengan bola.

**Langkah 7 — Kekal dan berinteraksi.**
Bola kini sentiasa di Laman Pip. Setiap kali anak menyentuhnya, ia melantun dan berkata "**bola**!". Perkataan masuk ke **Kamus Ajaib** (bahagian Album). Anak boleh menyusun di mana bola diletakkan.

### "Kata Jadi Benda" — Pulau yang dibina daripada perkataan

Ini prinsip besar CILUKA: **Laman Pip dibina SEPENUHNYA daripada perkataan yang anak eja.**

| Eja | Apa yang muncul | Interaksi |
|---|---|---|
| POKOK | Pokok tumbuh | Sentuh → daun gugur, burung terbang |
| RUMAH | Rumah kampung kecil | Sentuh → pintu buka, lampu menyala |
| KUCING | Kucing oren | Sentuh → mengiau, bergolek |
| IKAN | Ikan dalam kolam (perlu KOLAM dahulu!) | Sentuh → melompat |
| BUNGA | Bunga mekar | Sentuh → kupu-kupu |
| BAS | Bas kecil | Sentuh → hon "pon pon!" |
| MASJID / TOKONG / KUIL / GEREJA | Bangunan komuniti | Sentuh → bunyi lembut (sesuai budaya) |
| NASI | Pinggan nasi untuk Pip | Sentuh → Pip makan dengan gembira |
| HUJAN | Awan hujan sekejap | Sentuh → hujan turun, pokok bergoyang |

**Kombinasi pintar (logik pembelajaran tersembunyi):**
- IKAN memerlukan KOLAM dahulu → anak *mahu* mengeja KOLAM.
- KUCING + IKAN → kucing akan merenung kolam dengan lucu.
- POKOK + BUAH → buah tumbuh di pokok.

Kombinasi ini mencipta **motivasi intrinsik** untuk mengeja lebih banyak perkataan — bukan kerana diberi syiling, tetapi kerana anak mahu dunia sendiri lebih hidup.

### Progression perkataan

Disusun mengikut **struktur suku kata Bahasa Melayu** (K = konsonan, V = vokal):

| Tahap | Struktur | Contoh perkataan | Catatan |
|---|---|---|---|
| **1. Telur Kecil** | KV + KV, suku kata berulang | **SUSU, PAPA, MAMA, KAKA, BABA** (*bubu, dadu, kuku, kaki*) | Suku kata sama — paling mudah |
| **2. Telur Biasa** | KV + KV | **BOLA, BUKU, MATA, KAKI, BAJU, ROTI, MEJA, TOPI, NASI, LORI, GIGI, PADI, SAPU** | Asas utama |
| **3. Telur Vokal** | V + KV, V + KVK | **IBU, UBI, ABU, IKAN, ULAR, AYAM, AYAH, ITIK, EMAK** | Vokal di awal |
| **4. Telur Tertutup** | KVK (1 suku kata) & KV + KVK | **BAS, BAN, BOT, CAT; RUMAH, KOLAM, MAKAN, MINUM, BULAN, JALAN** | Suku kata tertutup |
| **5. Telur Kembar** | Dengan digraf ng / ny | **BUNGA, KUCING, PISANG, PINGGAN, NYAMUK, NYANYI, TANGAN, BURUNG** | "Huruf kembar" |
| **6. Telur Besar** | 3 suku kata | **KERETA, KERUSI, SELIPAR, KELAPA, BELON, BUAYA, KURA-KURA, RAMA-RAMA, SEKOLAH** | Perhatian e pepet |
| **7. Telur Emas** | KVK + KVK dan lebih panjang | **MASJID, KAMBING, GAJAH, HARIMAU, KOMPUTER, PELANGI, PAYUNG, LAYANG-LAYANG** | Cabaran |
| **8. Telur Pelangi** | Frasa 2 perkataan | **BOLA MERAH, KUCING TIDUR, IKAN BESAR, NASI LEMAK, ROTI CANAI** | Pra-membaca ayat |

*Nota: setiap perkataan perlu disemak oleh guru Bahasa Melayu prasekolah — contohnya perkataan dengan digraf "ng" seperti BURUNG mesti diletakkan di Tahap 5, bukan lebih awal.*

### Bank perkataan V1 — kategori (sekitar 120 perkataan)

Dipilih mengikut: (1) dekat dengan kehidupan anak Malaysia, (2) boleh digambarkan dengan jelas, (3) struktur suku kata berperingkat, (4) inklusif budaya.

| Kategori | Contoh |
|---|---|
| **Keluarga** | IBU, AYAH, EMAK, ABAH, ADIK, ABANG, KAKAK, ATUK, NENEK, MAMA, PAPA |
| **Badan** | MATA, KAKI, TANGAN, GIGI, HIDUNG, TELINGA, RAMBUT, MULUT |
| **Makanan & minuman** | NASI, SUSU, ROTI, IKAN, AYAM, TELUR, PISANG, BETIK, MANGGA, AIR, TEH, KUIH, NASI LEMAK, ROTI CANAI, KETUPAT |
| **Haiwan** | KUCING, ITIK, AYAM, IKAN, LEMBU, KAMBING, GAJAH, ULAR, BURUNG, MONYET, KATAK, RAMA-RAMA, SEMUT |
| **Rumah** | RUMAH, PINTU, MEJA, KERUSI, KATIL, BANTAL, LAMPU, PINGGAN, CAWAN, SUDU, TV |
| **Sekolah** | BUKU, BEG, PENSEL, PEMADAM, CIKGU, KELAS, SEKOLAH |
| **Mainan** | BOLA, BELON, PATUNG, WAU, GASING, BASIKAL |
| **Kenderaan** | BAS, KERETA, LORI, BOT, KAPAL, MOTOSIKAL, KERETAPI |
| **Alam** | POKOK, BUNGA, MATAHARI, BULAN, BINTANG, HUJAN, AWAN, PELANGI, LAUT, SUNGAI, BATU |
| **Tempat** | MASJID, SURAU, TOKONG, KUIL, GEREJA, KEDAI, PASAR, TAMAN, PANTAI |
| **Pakaian** | BAJU, SELUAR, KASUT, TOPI, TUDUNG, SONGKOK, STOKIN, SELIPAR |
| **Warna** *(V1.5)* | MERAH, BIRU, HIJAU, KUNING, PUTIH, HITAM |

### Variasi mod Sarang Kata (agar tidak membosankan)

| Mod | Perbezaan |
|---|---|
| **Pemburuan** (asas) | Cari huruf di dunia → tenun |
| **Telur Misteri** | Tiada nama perkataan diberi; hanya bayang samar objek → anak teka dan eja (5–6 tahun) |
| **Telur Dengar** | Hanya audio, tiada bayang (dikte) |
| **Telur Rosak** | Pip tersilap tenun → anak membaiki (Ajar Pip) |
| **Telur Pilihan Sendiri** | Anak memilih objek dari 3 bayang yang dia mahu tetaskan — **memberi autonomi** (prinsip penting motivasi) |

### Collectible yang berkaitan

- **Kamus Ajaib:** setiap perkataan yang ditetaskan — gambar, perkataan, sebutan. Dihias seperti buku skrap.
- **Lencana Penenun:** 10, 25, 50, 100 perkataan.
- **Telur Emas** (jarang, tetapi **berasaskan pencapaian** — contohnya mengeja tanpa sebarang bantuan) menetaskan versi istimewa objek (bola berkilau, kucing bertopi).

### Nilai sebenar

- **Untuk anak:** setiap perkataan = sesuatu yang **dicipta**, bukan markah. Pulau sendiri yang hidup = bukti kebolehan yang boleh dilihat, disentuh dan ditunjukkan kepada ibu bapa.
- **Untuk ibu bapa:** Laman Pip ialah **laporan kemajuan visual**. Ibu bapa boleh berkata, *"Tunjuk mama apa yang kamu dah eja!"* — dan anak akan menunjuk setiap objek di pulaunya dengan bangga, sambil menyebut nama.

---

## 15. Sistem Ganjaran

### Falsafah: "Ganjaran = bukti kemahiran, bukan umpan masa"

Ganjaran CILUKA direka mengikut tiga prinsip motivasi kanak-kanak yang sihat:
1. **Kecekapan** — ganjaran menunjukkan "aku dah boleh buat ini".
2. **Autonomi** — anak boleh memilih (objek mana nak tetaskan, kostum mana nak pakai).
3. **Hubungan** — ganjaran dikongsi dengan Pip dan ibu bapa.

### Peta ganjaran

| Ganjaran | Bagaimana diperoleh | Apa ia wakili | Di mana kelihatan |
|---|---|---|---|
| **Bintang (1–3)** | Setiap pusingan permainan | Ketepatan + kebebasan daripada bantuan | Selepas permainan; terkumpul dalam Balang Bintang |
| **Objek perkataan** | Mengeja perkataan dalam Sarang Kata | Perkataan dikuasai | Laman Pip, Kamus Ajaib |
| **Warga Huruf** | Huruf dikuasai (kenal + tulis) | Huruf dikuasai | Kampung Huruf |
| **Pulau hidup** | Zon/pulau diselesaikan | Kemahiran besar dikuasai | Lampu, gerai, cendawan menyala |
| **Pelekat Album Ciluk** | Penemuan (haiwan, kuih, kerang, kejutan) | Penerokaan | Album Ciluk |
| **Lencana Hebat** | Milestone kemahiran | Penguasaan nod skill tree | Rak Lencana |
| **Kostum Pip** | Milestone besar, Peti Ciluk, perayaan | Perjalanan panjang | Pip memakainya |
| **Pangkat Pengembara** | Gabungan kemahiran | "Level" anak | Topi Pip makin besar |
| **Sijil Hebat** | Boss pulau / tahap besar | Pencapaian rasmi | Boleh dicetak / dikongsi oleh ibu bapa |
| **Kebun Rajin** | Setiap hari bermain (min. 1 misi) | Konsistensi | Penjuru home screen |

### Pangkat Pengembara (pengganti XP & Level)

XP dalam bentuk nombor tidak bermakna bagi anak 3–6 tahun. CILUKA mengira XP secara **dalaman**, tetapi anak melihatnya sebagai **topi anyaman Pip yang makin tinggi dan cantik**:

| Pangkat | Kriteria (contoh) | Topi Pip |
|---|---|---|
| 1. Pengembara Kecil | Bermula | Topi kecil hijau |
| 2. Penjejak Huruf | 10 huruf dikuasai | + satu bulu |
| 3. Pendengar Hutan | 10 bunyi dikuasai | + loceng kecil |
| 4. Peniaga Suku Kata | 3 keluarga suku kata | + lampu tanglung |
| 5. Penenun Kata | 15 perkataan | + anyaman emas |
| 6. Wira Ejaan | 40 perkataan + nama sendiri | + bintang |
| 7. **Hebat Ciluka** | Semua pulau V1 | Mahkota anyaman |

### Album Ciluk — buku koleksi

Buku skrap digital dengan halaman:
- **Warga Huruf** (26 + huruf besar)
- **Kamus Ajaib** (perkataan yang ditetaskan)
- **Haiwan Hutan Bunyi**
- **Kuih Pasar Malam**
- **Kerang Pantai**
- **Tiket & Setem Keretapi**
- **Koleksi Kejutan** (dari Pintu Ajaib)
- **Lencana Hebat**

Setiap item: sentuh → animasi + sebutan. Halaman yang belum lengkap menunjukkan **bayang** item yang belum dijumpai — membina rasa ingin tahu tanpa tekanan.

### Peti Ciluk — misteri tanpa loot box

Peti Ciluk muncul **sekali sehari**, hanya selepas 3 misi harian siap.

**Peraturan reka bentuk etika:**
- ❌ **Tiada sistem kekerapan (rarity)** seperti "biasa / jarang / legenda". Semua isi peti sama nilainya.
- ❌ Tiada animasi "hampir menang" atau putaran bertegang yang menyerupai mesin judi.
- ❌ Tidak boleh dibuka dengan wang, masa tambahan, atau tonton iklan.
- ✅ Isi **dipilih**, bukan rawak sepenuhnya: Kompas Pip memilih item yang berkaitan dengan kemahiran yang anak latih hari ini (contohnya hari anak berlatih **k**, peti mengandungi topi **k**ucing untuk Pip).
- ✅ Kejutan yang sihat — anak tidak tahu *apa*, tetapi tahu ia *pasti* sesuatu yang bagus.

### Kebun Rajin — pengganti "streak" yang tidak menghukum

Kebanyakan aplikasi menggunakan "streak" (rantai hari berturut-turut) yang **menghukum** apabila terputus — menyebabkan kebimbangan dan desakan untuk bermain setiap hari.

CILUKA menggantikannya dengan **Kebun Rajin**: sebuah pasu bunga di penjuru skrin.
- Setiap hari anak bermain (min. 1 misi), satu tunas/bunga tumbuh.
- **Jika anak tidak bermain beberapa hari, tiada apa-apa layu atau mati.** Kebun hanya menunggu.
- Pip berkata semasa kembali: *"Kebun kita tunggu kamu! Jom tanam bunga baharu!"*

### Laman Pip — island building

Diterangkan dalam Bahagian 14 ("Kata Jadi Benda"). Tambahan:
- **Mod Susun:** anak boleh menyeret objek ke tempat lain di pulau (kreativiti, autonomi).
- **Saiz pulau berkembang** mengikut perkataan dikuasai — Pulau Kecil (0–15 perkataan) → Sederhana (16–50) → Besar (51+). Setiap pengembangan disertai animasi "pulau tumbuh" yang besar.
- **Hiasan perayaan** bermusim (pelita, tanglung, lampu kelip Deepavali, pokok Krismas, jalur gemilang) — dibuka automatik mengikut kalendar peranti.

### Sijil Hebat

- Dijana dalam peranti (tiada server) sebagai imej/PDF bersaiz A4.
- Mengandungi: nama anak, pencapaian ("Telah Menguasai 26 Huruf!"), tarikh, tandatangan Pip, **contoh tulisan sebenar anak**.
- Ibu bapa boleh mencetak dan menampal di peti sejuk — **objek fizikal di rumah = pemasaran percuma** dan kebanggaan sebenar.

### Peraturan anti-ketagihan untuk ganjaran

1. Ganjaran besar **hanya untuk kemahiran**, bukan masa bermain.
2. **Had harian lembut:** selepas sesi tamat, permainan masih boleh dimain (jika ibu bapa benarkan), tetapi **tiada ganjaran baharu** diberi selepas had sesi — menghapuskan insentif untuk bermain berlebihan.
3. Tiada kiraan detik ("Hadiah tamat dalam 2 jam!").
4. Tiada perbandingan dengan anak lain.
5. Tiada notifikasi tolak (push) kepada anak.

---

## 16. Misi Harian

### Prinsip: "Pip pilih 3, kamu main 3, kita rehat"

Apabila anak membuka CILUKA, dia **tidak** melihat 20 pilihan. Dia melihat **3 belon misi**.

*"Hari ni Pip pilih 3 misi untuk kamu!"*

Sesi tipikal: **3 misi × 2–3 minit = 6–10 minit.**

### Jenis misi dan cara ia dipilih

#### 1. Misi Harian (setiap hari, 3 belon)

Resipi Kompas Pip (Bahagian 11):

| Belon | Ikon | Kandungan | Logik pemilihan |
|---|---|---|---|
| 🎈 1 — Pengembaraan | Kompas | Kemahiran baharu | Nod "sedang belajar" dengan Skor Kuasa terendah yang prasyaratnya dipenuhi |
| 🎈 2 — Ulang Kaji Rahsia | Kanta pembesar | Kelemahan & ulang kaji | Item "sampai masa" dalam Kotak Ingatan + pasangan keliru aktif |
| 🎈 3 — Seronok | Bintang | Kemahiran dikuasai, permainan kegemaran | Permainan yang paling kerap anak pilih secara sukarela atau sudah lama tidak dimain |

**Peraturan susunan:** belon 3 sentiasa dimain terakhir (jika anak memilih belon 3 dahulu, belon 1 dan 2 akan disusun semula supaya misi "mudah" masih menjadi penamat).

**Fleksibiliti:** anak boleh menekan belon dalam apa-apa urutan. Anak juga boleh meneroka pulau secara bebas — tetapi misi sentiasa menjadi "laluan cepat" yang jelas.

#### 2. Misi Kejutan

- Muncul secara rawak **~1 dalam 4 hari**: watak sokongan (Utan, Uhu, Mak Cik Kuih) terbang masuk dengan permintaan.
- Contoh: *"Utan terlupa di mana dia letak 3 pisang! Boleh tolong?"* (Kad Ingat dengan perkataan PISANG.)
- Menggantikan Misi 3 hari itu (tidak menambah masa).
- **Tujuan:** kejutan menjaga keseronokan dan rasa dunia "hidup".

#### 3. Cabaran Mingguan (Gua Ciluk / Peta Harta Karun)

- Bermula setiap Isnin (ikut kalendar peranti), boleh disiapkan sepanjang minggu.
- 4 cebisan peta tersembunyi dalam misi minggu itu (setiap cebisan menggantikan sebahagian misi harian, bukan tambahan).
- Ganjaran: kostum Pip mingguan / item istimewa Laman Pip.

#### 4. Cabaran Penguasaan (Pintu Bintang)

- Muncul apabila Kompas Pip mengesan anak **hampir menguasai** satu kluster (contohnya semua vokal ≥ 70).
- Pip: *"Pintu Bintang dah bersinar! Kamu dah sedia nak cuba?"* — anak **boleh memilih untuk tidak** (tiada paksaan).
- Lulus → Sijil + Lencana + pulau "hidup" sepenuhnya.

#### 5. Misi Ibu Bapa & Anak (Main Berdua)

- Diaktifkan oleh ibu bapa (dari dashboard) atau dicadangkan sekali seminggu.
- **Satu telefon, dua pemain:** contohnya, ibu bapa menyebut perkataan, anak mengeja; atau ibu bapa dan anak bergilir menulis huruf dan "meneka" huruf siapa lebih cantik (kedua-dua menang).
- Skrin memaparkan arahan ringkas untuk ibu bapa di bahagian atas (teks kecil), dan arahan audio untuk anak.
- Contoh: **"Teka Huruf Ibu"** — ibu/ayah menulis huruf di skrin, anak meneka huruf itu. Peranan bertukar.

#### 6. Misi Rumah (Offline)

- Dipaparkan sebagai belon berbeza warna (hijau daun) — **"Misi Luar Skrin"**.
- Contoh: *"Misi rumah hari ini! Cari 3 benda yang bermula dengan B!"*
- Ibu bapa mengesahkan selepas anak menyelesaikannya (lihat Bahagian 19).
- Ganjaran: pelekat istimewa "Pengembara Dunia Sebenar".

### Kalendar misi seminggu (contoh)

| Hari | Belon 1 | Belon 2 | Belon 3 | Tambahan |
|---|---|---|---|---|
| Isnin | Pengembaraan | Ulang Kaji | Seronok | Peta Harta Karun bermula |
| Selasa | Pengembaraan | Ulang Kaji | **Misi Kejutan** | — |
| Rabu | Pengembaraan | Ulang Kaji + cebisan peta | Seronok | Misi Rumah ditawarkan |
| Khamis | Pengembaraan | Ulang Kaji | Seronok | — |
| Jumaat | Pengembaraan + cebisan peta | Ulang Kaji | Seronok | — |
| Sabtu | Main Berdua | Ulang Kaji | Seronok | Misi Rumah |
| Ahad | Seronok bebas | Ulang kaji ringan | Peta: cebisan terakhir | Surat Pip mingguan untuk ibu bapa |

### Kes khas

- **Anak baharu (minggu 1):** misi lebih pendek, lebih banyak "Seronok", dan penempatan diperhalusi.
- **Kembali selepas lama (>7 hari):** Misi 1 diganti dengan **ulang kaji pemanasan** — memastikan kejayaan awal sebelum kemahiran baharu.
- **Anak menolak satu misi berulang kali:** Kompas Pip menukar mekanik permainan untuk item yang sama (anak mungkin tidak suka permainan itu, bukan kemahiran itu).

---

## 17. Parent Dashboard — **Ruang Ibu Bapa**

### Pintu masuk yang selamat

- Butang kecil (ikon kunci) di penjuru home screen — **sentuh dan tahan 3 saat**, kemudian jawab soalan mudah untuk dewasa (contohnya "Taip 7 + 5") atau PIN 4 digit yang ditetapkan ibu bapa.
- Ini mengelakkan anak masuk secara tidak sengaja ke tetapan atau pembelian.

### Reka bentuk: "Tiga skrol, tiga jawapan"

Ibu bapa sibuk. Dashboard menjawab 3 soalan sahaja di skrin utama:
1. **Bagaimana anak saya?** (ringkasan)
2. **Apa yang perlu dibantu?** (kelemahan + cadangan)
3. **Apa yang boleh saya buat?** (aktiviti untuk ibu bapa)

### Skrin utama — kad ringkasan

```
┌────────────────────────────────────────┐
│  👧 Aisyah · Pangkat: Penjejak Huruf     │
│                                        │
│  "Minggu ini Aisyah bermain 5 hari,      │
│   purata 9 minit sehari. Dia kini        │
│   mengenal 18 daripada 26 huruf."        │
│                                        │
│  🔤 Huruf      ████████████░░░░  18/26  │
│  ✍️ Menulis    ██████░░░░░░░░░░   9/26  │
│  🔊 Bunyi      ████████░░░░░░░░  12/26  │
│  🧩 Suku kata  ███░░░░░░░░░░░░░   2/18 keluarga │
│  📖 Perkataan  ██░░░░░░░░░░░░░░   7     │
│                                        │
│  💪 Kuat: a, b, i, k, m, s, u           │
│  🌱 Perlu latihan: m–n (keliru), r      │
│                                        │
│  💡 Cadangan minggu ini:                │
│  "Main 'Cari Huruf M & N' di rumah —     │
│   lihat Misi Rumah #7"                  │
└────────────────────────────────────────┘
```

### Bahagian dashboard

#### A. Kemajuan anak
- **Pokok Hebat** (skill tree visual) — daun hijau/kuning/tunas.
- **Peta huruf** — 26 huruf dalam grid; setiap huruf berwarna mengikut status (dikuasai / sedang belajar / belum / keliru). Sentuh huruf → lihat butiran ("Huruf **r**: dikenali 6 kali daripada 9 cubaan. Belum ditulis tanpa panduan.").
- **Kemahiran menulis:** huruf yang boleh ditulis berpandu vs tanpa panduan, dengan **contoh tulisan terkini**.
- **Tahap mengeja:** tahap telur semasa dalam Sarang Kata.
- **Perkataan dikuasai:** senarai + gambar.

#### B. Laporan
- **Perkembangan mingguan** (Surat Pip — lihat di bawah).
- **Aktiviti paling banyak dimainkan** — dan *mengapa itu bagus* atau *apa yang boleh dicuba*.
- **Kemahiran yang bertambah baik** minggu ini.
- **Kemahiran yang perlu dibantu** — dengan cadangan konkrit.
- **Misi seterusnya** yang dirancang Kompas Pip (ibu bapa boleh nampak "logik di sebalik tabir").

#### C. Kawalan
- Had sesi (5 / 10 / 15 minit / tiada had)
- Waktu tidur (CILUKA "tidur" selepas jam yang ditetapkan)
- Bunyi: suara, muzik, kesan bunyi (berasingan)
- Anak kidal
- Kurangkan animasi
- Urus profil
- Sandaran data (eksport / import)

#### D. Untuk ibu bapa
- **Misi Rumah** — senarai aktiviti offline + sahkan misi.
- **Tip ringkas** — 1 tip mingguan berdasarkan kemajuan anak (contohnya *"Anak yang keliru b dan d adalah sangat normal sehingga umur 7 tahun. Cuba ajar dengan 'katil': b dan d seperti hujung katil."*).
- **Buku Hebat** (portfolio).

### Surat Pip — laporan mingguan yang hangat

Setiap Ahad, ibu bapa menerima "surat" dalam aplikasi (dan pilihan untuk menjana imej yang boleh dikongsi). Ditulis dalam bahasa biasa, dijana daripada templat ayat berdasarkan data (bukan AI — ayat telah ditulis oleh penulis manusia; sistem mengisi tempat kosong dan memilih ayat sesuai).

> **Surat Pip untuk Ibu & Ayah Aisyah** — Minggu 6
>
> Assalamualaikum dan salam sejahtera! 🐣
>
> Minggu ini Aisyah bermain **5 hari**, dengan purata **9 minit** sehari. Masa yang sangat sihat!
>
> 🌟 **Berita gembira:** Aisyah kini mengenal **18 daripada 26 huruf**! Minggu ini dia menguasai huruf **t**, **p** dan **n**.
>
> ✍️ **Menulis:** Aisyah semakin yakin menjejak huruf. Dia kini boleh menulis **5 huruf tanpa panduan**: a, i, u, l, t. Tulisannya makin kemas — lihat perbandingan dalam Buku Hebat!
>
> 🌱 **Masih belajar:** Aisyah kadang-kadang tertukar **m** dan **n**. Ini sangat biasa! Pip sedang membantu melalui permainan berbeza.
>
> 💡 **Cara ibu/ayah boleh bantu:** Bila nampak benda di rumah yang bermula dengan M (meja, mangkuk) atau N (nasi, nanas), sebut bersama Aisyah sambil tekan bibir untuk "mmm" dan sentuh hidung untuk "nnn".
>
> 🎯 **Minggu depan:** Pip akan memperkenalkan suku kata **ba-bi-bu-be-bo** di Pasar Suku Kata.
>
> Terima kasih kerana menemani Aisyah belajar!
> — Pip 🐣

**Ciri kongsi:** butang "Kongsi kepada keluarga" menjana imej kad ringkas (tanpa data sensitif) yang boleh dihantar melalui WhatsApp. Di Malaysia, kongsian datuk-nenek di grup WhatsApp keluarga ialah **saluran pemasaran organik terkuat** untuk produk kanak-kanak.

### Prinsip bahasa laporan

| Elakkan | Gunakan |
|---|---|
| "Kelemahan" | "Masih belajar" |
| "Gagal 4 kali" | "Sedang berlatih" |
| "Prestasi rendah" | "Perlukan sedikit masa lagi" |
| Peratus berdesimal (63.4%) | "12 daripada 26" |
| Perbandingan dengan purata kebangsaan | Perbandingan dengan **diri sendiri** minggu lepas |

**Mengapa tiada perbandingan dengan anak lain:** ia menimbulkan kebimbangan ibu bapa, tekanan kepada anak, dan memerlukan data awan. Setiap anak berkembang pada kadar sendiri — CILUKA menghormati itu.

---

## 18. Child Portfolio — **Buku Hebat**

> *"Buku kecil yang menyimpan saat-saat besar."*

### Mengapa ini penting

Aplikasi pembelajaran biasa memadam bukti usaha anak — markah ditimpa, tulisan hilang. Ibu bapa tidak dapat **melihat perjalanan**. Buku Hebat menjadikan CILUKA sesuatu yang ibu bapa **tidak mahu padam** — nilai emosi yang meningkatkan perceived value jauh melebihi RM19.

### Apa yang direkodkan secara automatik

| Milestone | Apa disimpan |
|---|---|
| 🥇 **Huruf pertama dijumpai** | Tarikh, huruf, animasi |
| ✍️ **Tulisan pertama** (setiap huruf) | **Rakaman strok sebenar** (boleh dimainkan semula seperti video) |
| 🏅 **Huruf pertama dikuasai** | Tarikh, huruf |
| 🔊 **Bunyi pertama** | Tarikh |
| 🧩 **Suku kata pertama digabung** | Perkataan |
| 🐣 **Perkataan pertama ditetaskan** | Perkataan, objek, tarikh |
| 📛 **Nama sendiri ditulis buat pertama kali** | **Rakaman tulisan nama** — milestone utama |
| 🎓 **Setiap Sijil Hebat** | Salinan sijil |
| 🖍️ **Lukisan bebas** *(V1.5)* | Dari mod lukis bebas studio |
| 🎤 **Suara pertama** *(V1.5, pilihan)* | Rakaman anak menyebut perkataan (disimpan dalam peranti sahaja) |

### Ciri emosi utama

#### 1. "Dulu & Sekarang" ⭐
Untuk setiap huruf, Buku Hebat menunjukkan **tulisan pertama bersebelahan tulisan terkini**, dengan tarikh. Ibu bapa boleh **memainkan semula** kedua-dua rakaman (huruf terlukis semula strok demi strok, mengikut kelajuan asal anak).

> *"Ini 'a' Aisyah pada 3 Januari (umur 4 tahun 2 bulan) ... dan ini 'a' Aisyah pada 15 Mac."*

Data strok sangat kecil (beberapa KB per tulisan) — boleh disimpan bertahun-tahun dalam peranti.

#### 2. Garis Masa Hebat
Satu garis masa menegak dengan setiap milestone sebagai kad. Ibu bapa menatal dan melihat **cerita** perkembangan anak dari bulan ke bulan.

#### 3. Surat Bulanan Kenangan
Setiap bulan, Buku Hebat menjana satu **halaman kenangan** yang cantik (imej): "Bulan Mac Aisyah" — dengan 3 tulisan terbaik, perkataan baharu, dan satu milestone utama. Boleh disimpan atau dikongsi.

#### 4. Eksport
- Eksport sebagai **PDF** (dijana dalam peranti) — "Buku Hebat Aisyah 2026".
- Ibu bapa boleh mencetak sebagai kenangan, atau menunjukkan kepada guru tadika.
- **Peluang masa depan:** pilihan cetak buku fizikal melalui rakan kongsi percetakan (pendapatan tambahan, tanpa langganan).

### Privasi
- Semua data Buku Hebat **kekal dalam peranti**.
- Tiada muat naik automatik.
- Kongsi hanya apabila ibu bapa sendiri memilih, dan imej kongsi tidak mengandungi nama penuh (hanya nama panggilan jika ibu bapa mahu).

---

## 19. Misi Offline — **Misi Rumah**

> *"Pengembara sejati tak hanya main dalam telefon. Jom cari huruf di dunia sebenar!"*

### Mekanik

1. Pip mencadangkan satu Misi Rumah (berdasarkan kemahiran semasa anak — contohnya huruf yang sedang dipelajari).
2. Skrin menunjukkan misi dengan ilustrasi + audio untuk anak; teks ringkas untuk ibu bapa.
3. Telefon **diletakkan**. Anak (dengan ibu bapa) melakukan aktiviti.
4. Ibu bapa membuka misi semula dan menekan **"Sahkan ✓"** (di belakang pintu ibu bapa ringkas).
5. *(Pilihan V1.5)* Ambil gambar kenangan — disimpan dalam Buku Hebat.
6. Anak menerima **pelekat "Pengembara Dunia Sebenar"** — pelekat paling istimewa dalam Album (bingkai emas).

**Kompas Pip mencatat** Misi Rumah sebagai sumbangan kecil kepada Skor Kuasa item berkaitan (ibu bapa mengesahkan).

### 36 Misi Rumah

#### Huruf & Bunyi
1. **Pemburu B** — Cari 3 benda di rumah yang bermula dengan B (bantal, baju, buku).
2. **Huruf di Dapur** — Cari huruf yang ada pada kotak/bungkusan makanan di dapur. Huruf apa yang kamu kenal?
3. **Huruf Nama Aku** — Cari huruf pertama nama kamu pada buku, kotak atau papan tanda.
4. **Bunyi Siapa?** — Ibu/ayah sebut bunyi (/m/), anak cari benda yang bermula dengan bunyi itu.
5. **Huruf Badan** — Bentuk huruf menggunakan badan (I = berdiri tegak, C = bengkok, O = tangan bulat atas kepala). Ibu/ayah teka!
6. **Huruf Daripada Benda** — Bina huruf menggunakan stoking, pensel, sudu atau tali.
7. **Huruf Playdoh/Tepung** — Gulung doh menjadi ular, bentuk huruf hari ini.
8. **Huruf di Jalan** — Dalam kereta/bas, cari huruf K pada papan tanda.
9. **Tulis di Pasir/Tepung** — Tabur tepung di dulang, tulis huruf dengan jari.
10. **Huruf Tersorok** — Ibu/ayah sorok kad huruf di rumah (tulis di kertas), anak cari dan sebut — *Ciluk-BA versi sebenar!*

#### Bentuk & Warna
11. **Pemburu Bulat** — Cari 3 benda berbentuk bulat.
12. **Merah di Mana?** — Cari sesuatu berwarna merah, kemudian sebut namanya. Apa huruf pertamanya?
13. **Segi Empat di Rumah** — Cari pintu, tingkap, buku — semuanya segi empat!
14. **Garisan Lurus & Lengkung** — Lukis garisan dengan krayon di atas kertas mengikut ibu/ayah.

#### Suku Kata
15. **Tepuk Nama** — Tepuk suku kata nama semua ahli keluarga (A-YAH = 2 tepuk!).
16. **Benda Dua Tepuk** — Cari benda yang namanya ada dua suku kata (ME-JA, PIN-TU, BU-KU).
17. **Lompat Suku Kata** — Lompat sekali untuk setiap suku kata: KE-RE-TA = 3 lompat.
18. **Suku Kata Makanan** — Semasa makan, tepuk suku kata makanan (NA-SI, I-KAN, A-YAM).
19. **Lagu Ba-Bi-Bu** — Nyanyi "ba-bi-bu-be-bo" bersama sambil menepuk.

#### Perkataan & Ejaan
20. **Label Rumah** — Ibu/ayah tulis perkataan di kertas (PINTU, MEJA, KATIL), anak tampal pada benda yang betul.
21. **Eja Bersama** — Pilih satu perkataan dari Laman Pip, eja menggunakan huruf magnet/kertas.
22. **Cari Perkataan Aku** — Cari perkataan yang kamu sudah eja di CILUKA pada buku cerita atau bungkusan (contohnya SUSU pada kotak susu).
23. **Senarai Belanja Kecil** — Anak "tulis" (atau lukis) satu barang untuk senarai belanja ibu/ayah.
24. **Kad Ucapan** — Tulis nama sendiri pada kad untuk atuk/nenek.

#### Pendengaran & Memori
25. **Diam & Dengar** — Duduk diam selama 1 minit. Bunyi apa yang kamu dengar? Sebut namanya.
26. **Ingat Barang** — Ibu/ayah letak 4 barang, tutup dengan kain, ambil satu. Apa yang hilang?
27. **Ikut Corak** — Susun sudu-garpu-sudu-garpu... apa seterusnya?
28. **Pesan Berantai** — Ibu/ayah bisik satu perkataan; anak sampaikan kepada ahli keluarga lain.

#### Motor & Pergerakan
29. **Jalan Atas Garisan** — Lekatkan pita pada lantai berbentuk huruf; anak berjalan mengikut arah huruf.
30. **Tulis di Udara** — Tulis huruf besar di udara dengan jari, ibu/ayah teka.
31. **Tulis di Belakang** — Ibu/ayah tulis huruf di belakang anak dengan jari; anak teka (dan sebaliknya).
32. **Gunting & Tampal** — Gunting huruf dari surat khabar/majalah lama dan tampal huruf nama sendiri.

#### Keluarga & Cerita
33. **Cerita Sebelum Tidur** — Semasa membaca buku, anak tunjuk huruf yang dia kenal.
34. **Ajar Ibu/Ayah** — Anak menjadi cikgu: ajar ibu/ayah satu perkataan yang dia eja hari ini.
35. **Wawancara Atuk** — Tanya atuk/nenek: "Apa permainan atuk masa kecil?" Lukis jawapan.
36. **Pasar Malam Sebenar** — Semasa ke pasar malam, cari 3 makanan dan sebut huruf pertamanya.

**Nota:** misi yang melibatkan gunting, tepung atau keluar rumah sentiasa disertai peringatan ringkas "dengan pengawasan ibu/ayah".

---

## 20. Audio dan Animasi

### A. Reka bentuk audio

#### Lapisan audio

| Lapisan | Kandungan | Kawalan |
|---|---|---|
| **Suara** | Pip, watak, narator, sebutan huruf/suku kata/perkataan | Slider berasingan |
| **Kesan bunyi (SFX)** | Butang, betul, ciluk-ba, ganjaran, alam | Slider berasingan |
| **Muzik** | Latar setiap pulau | Slider berasingan |
| **Mute semua** | Satu butang | Sentiasa tersedia di Ruang Ibu Bapa; juga ikut suis senyap peranti |

**Ducking automatik:** muzik diperlahankan ~60% ketika suara bercakap. Arahan **tidak pernah** ditenggelamkan oleh muzik.

#### Suara — keputusan penting

| Pilihan | Penilaian |
|---|---|
| Text-to-Speech (TTS) Bahasa Melayu | ❌ untuk kandungan teras. Kualiti TTS BM berbeza-beza, sebutan suku kata dan e pepet/taling tidak selalu tepat, kedengaran robotik — bertentangan dengan arahan "elakkan suara robotik". |
| **Rakaman pelakon suara Malaysia** | ✅ **Wajib** untuk huruf, bunyi, suku kata, perkataan dan dialog Pip. |

**Pelakon suara yang diperlukan (V1):**
1. **Pip** — suara ceria, sedikit tinggi (pelakon dewasa yang boleh menyuarakan watak kanak-kanak; neutral jantina).
2. **Narator / Cikgu** — suara hangat, jelas, sebutan standard yang digunakan di prasekolah Malaysia. Untuk sebutan huruf, bunyi, suku kata dan perkataan.
3. **Watak sokongan** — 1–2 pelakon serba boleh untuk Uhu, Mak Cik Kuih, Kak Kondo, Comot (Comot boleh berbunyi "comel" tanpa perkataan).

**Anggaran klip audio V1:**

| Jenis | Bilangan |
|---|---|
| Nama huruf (26) + bunyi huruf (26 + digraf) | ~60 |
| Suku kata KV (konsonan × 5 vokal) + KVK terpilih | ~150 |
| Perkataan (120) × 2 variasi (biasa + perlahan) | ~240 |
| Perkataan dieja suku kata demi suku kata | ~120 |
| Dialog Pip (27 situasi × 3–5 variasi) | ~120 |
| Arahan permainan (18 permainan × ~6 baris) | ~110 |
| Watak sokongan | ~80 |
| **Jumlah** | **~900 klip** |

Dengan format audio termampat (contohnya Opus/AAC mono), ini sekitar **15–30 MB** — boleh diterima untuk PWA dengan cache berperingkat.

**Peraturan sebutan Bahasa Melayu:**
- Bunyi huruf (fonem) dirakam **pendek dan bersih** — "/m/" bukan "mə" (elak menambah vokal schwa pada konsonan, kesilapan biasa yang mengelirukan blending).
- **E pepet** dan **e taling** dirakam berasingan dan ditanda dalam data perkataan.
- Semua sebutan disemak oleh guru Bahasa Melayu prasekolah.

#### Kesan bunyi (SFX)
- **Butang:** "pop" lembut, berbeza sedikit pitch untuk setiap jenis (memberi rasa fizikal).
- **Betul:** dentingan menaik 3 not (bunyi tanda tangan CILUKA).
- **Belum betul:** bunyi "boing" lembut yang lucu — **bukan** buzzer atau bunyi salah yang keras.
- **Ciluk-BA:** bisikan "ciluk..." + "BA!" + ketawa Pip — bunyi paling ikonik.
- **Ganjaran:** cimes kristal + sorakan kecil.
- **Alam:** ombak, burung, cengkerik, angin — ambien lembut per pulau.

#### Muzik
- Setiap pulau ada **gelung muzik 60–90 saat** (ringan, tidak meletihkan).
- Instrumen dengan rasa Malaysia secara halus: **kompang** (Pasar Suku Kata), **seruling** (Hutan Bunyi), **gambus** (Kampung Huruf), **sape** Sarawak (Rimba Ingat), **kulintangan/gamelan** (Istana Bintang) — digabungkan dengan ukulele, glockenspiel, marimba.
- Tempo sederhana (90–110 BPM). Tiada muzik terlalu laju yang meningkatkan keterujaan berlebihan.
- **Muzik berhenti sepenuhnya di Studio Calit Comot** semasa menulis — hanya bunyi medium (pasir, kapur). Membantu fokus.

### B. Animasi

#### Senarai animasi dan tujuan

| Animasi | Tujuan | Tempoh |
|---|---|---|
| **Maklum balas butang** | Butang tertekan ke bawah + melantun | 100–150 ms |
| **Reaksi watak** | Pip bersorak / berfikir / memujuk | 0.5–1.5 s |
| **Idle** | Pip bernafas, berkelip, objek bergerak perlahan | Gelung |
| **Ciluk-BA** | Pendedahan tanda tangan | 0.8–1.2 s |
| **Konfeti** | Kejayaan pusingan | 1–1.5 s |
| **Star burst** | Bintang terkumpul | 0.6 s |
| **Portal** | Masuk ke pulau / studio | 0.8 s |
| **Buka kunci (unlock)** | Awan tersingkap, pulau baharu | 2–3 s (sekali sahaja, boleh dilangkau) |
| **Kemajuan** | Rumah menyala, gerai dibuka, pulau tumbuh | 1.5–2.5 s |
| **Transisi dunia** | Pip terbang dari Laman Pip ke pulau | 1 s |
| **Huruf hidup** | Huruf ditulis → mata → kaki → berjalan | 2 s |
| **Telur menetas** | Sarang Kata | 2 s |

**Peraturan masa:** animasi ganjaran **tidak pernah melebihi 3 saat** dan sentiasa boleh dilangkau dengan sentuhan. Anak mahu terus bermain — animasi panjang membosankan selepas kali ke-5.

#### Bajet prestasi (penting untuk telefon Android murah)

- **Sasaran:** 60 fps pada telefon pertengahan; 30 fps stabil pada telefon bajet (contoh: telefon RM400–600).
- **Mod ringan automatik:** jika fps jatuh, kurangkan zarah (konfeti), lapisan parallax, dan animasi idle latar.
- **Zarah maksimum:** ~40 serentak.
- **Aset:** imej WebP, sprite atlas, animasi vektor (Rive/Lottie) untuk watak — saiz kecil, tajam pada semua resolusi.
- **Muat berperingkat:** hanya aset pulau semasa dimuat; pulau lain dimuat di latar belakang.
- **Saiz pemasangan awal PWA:** sasaran **< 25 MB** untuk muat awal (Laman Pip + Taman Calit + Kampung Huruf), selebihnya dimuat secara beransur-ansur dan disimpan untuk offline.

#### Mod "Kurangkan Animasi"
Untuk anak yang mudah terlebih rangsang: konfeti dibuang, transisi menjadi pudar ringkas, idle dikurangkan. Semua maklum balas pembelajaran (betul/belum) kekal.

---

## 21. Sistem Profil

### Reka bentuk

| Ciri | Keputusan |
|---|---|
| **Bilangan profil** | Sehingga **4 anak** per pembelian (adik-beradik) — nilai besar untuk keluarga Malaysia |
| **Maklumat yang disimpan** | Nama panggilan (boleh jadi nama samaran), avatar, tahun lahir (pilihan, hanya untuk cadangan titik mula), tangan dominan, tetapan |
| **Maklumat yang TIDAK dikumpul** | Nama penuh, tarikh lahir penuh, sekolah, lokasi, gambar wajah, nombor telefon anak, emel anak |
| **Avatar** | Pilih daripada watak ilustrasi CILUKA (pelbagai warna kulit, rambut, tudung, songkok, cermin mata) — **tiada gambar sebenar** |
| **Kemajuan** | Berasingan sepenuhnya untuk setiap profil |
| **Tukar profil** | Sentuh avatar di home screen → pilih avatar lain (tiada kata laluan untuk anak; ini dalam keluarga) |

### Pemilihan profil oleh anak

Anak 3 tahun tidak boleh membaca nama. Skrin pilih profil menunjukkan **avatar besar** dengan bunyi nama (jika ibu bapa merakam nama — ciri pilihan) atau hanya avatar yang dikenali anak.

### Penyimpanan

**Prinsip: data anak tinggal dalam peranti.**

- Semua profil, kemajuan, Buku Hebat dan tetapan disimpan secara **setempat** dalam pelayar (storan pangkalan data pelayar seperti IndexedDB).
- **Simpan automatik** selepas setiap pusingan permainan (tiada butang "simpan").
- Aplikasi meminta **"storan berterusan"** daripada pelayar untuk mengurangkan risiko data dipadam.

### ⚠️ Risiko jujur: storan pelayar boleh hilang

| Situasi | Risiko |
|---|---|
| Ibu bapa mengosongkan data pelayar | Kemajuan hilang |
| Safari iOS — laman web yang tidak dipasang ke skrin utama boleh dipadam storannya selepas tempoh tidak digunakan | Kemajuan hilang |
| Tukar telefon | Kemajuan tidak berpindah |

**Mitigasi (wajib dalam V1):**
1. **Galakkan "Pasang ke Skrin Utama"** dengan panduan bergambar semasa onboarding (PWA yang dipasang lebih selamat dari segi storan).
2. **Sandaran manual:** butang "Simpan Sandaran" menjana fail sandaran (atau kod) yang boleh disimpan di Google Drive/WhatsApp ibu bapa sendiri. "Pulihkan" untuk import.
3. **Peringatan sandaran** bulanan yang lembut di Ruang Ibu Bapa.
4. **(SHOULD HAVE, V1.1) Sandaran awan ringan** — fail sandaran **disulitkan** di peranti dan disimpan di storan objek yang murah, dikaitkan dengan akaun pembelian ibu bapa. Kos sangat rendah (beberapa KB–MB per keluarga), tetapi perlu dasar privasi yang jelas.

### Akaun & lesen

- **Hanya ibu bapa** mempunyai "akaun" — sekadar emel/nombor telefon + kod lesen untuk pembelian.
- Pengesahan lesen sekali semasa pengaktifan, kemudian berfungsi offline. Semakan ringan berkala (contohnya sekali sebulan apabila ada internet) untuk mengehadkan perkongsian lesen yang melampau (contohnya maksimum 3–5 peranti per lesen).

### Pematuhan

- Selaraskan dengan **Akta Perlindungan Data Peribadi 2010 (PDPA Malaysia)** dan pindaannya.
- Dasar privasi yang ringkas dan mudah dibaca untuk ibu bapa: *"Kami tidak mengumpul data anak anda. Semuanya kekal dalam telefon anda."* — ini sendiri ialah **titik jualan**.
- Jika kelak diterbitkan di Google Play / App Store kategori kanak-kanak, patuhi dasar Families / Kids Category (tiada iklan pihak ketiga, tiada analitik yang menjejak anak).

---

## 22. Masa Skrin yang Sihat

### Prinsip

> CILUKA berjaya apabila anak **meletakkan telefon dengan gembira**, bukan apabila anak bermain paling lama.

### Ciri-ciri

#### 1. Pilihan sesi
Ibu bapa memilih semasa onboarding (boleh ditukar):
- **5 minit** — "Sesi Kecil" (disyorkan untuk 3 tahun)
- **10 minit** — "Sesi Biasa" (lalai disyorkan)
- **15 minit** — "Sesi Panjang"
- Tiada had (tidak disyorkan; perlu PIN)

Saranan umum pakar kesihatan kanak-kanak ialah mengehadkan masa skrin kanak-kanak prasekolah — CILUKA menyokong ibu bapa mengikutinya, dengan **lalai 10 minit**.

#### 2. Penamat yang lembut, bukan mengejut
- **Tanda visual awal:** apabila tinggal ~2 minit, langit Laman Pip mula senja, Pip menguap kecil.
- **1 minit lagi:** *"Lagi satu permainan, lepas tu kita rehat, ya."*
- **Tidak memotong permainan di tengah** — anak dibenarkan menghabiskan pusingan semasa (maksimum +2 minit).
- **Skrin rehat:** Pip naik ke sarang, menyelimutkan dirinya dengan daun, dan berkata: *"Hebat hari ini! Jom berehat. Esok kita sambung pengembaraan lagi!"* Laman Pip menjadi malam yang tenang.
- **Cadangan Misi Rumah** di skrin rehat — mengalihkan anak kepada aktiviti dunia sebenar.

#### 3. Selepas sesi tamat
- Aplikasi memaparkan Pip tidur. Untuk terus bermain, perlu **pintu ibu bapa**.
- Jika ibu bapa membuka semula, permainan boleh diteruskan tetapi **tiada ganjaran baharu** (Bahagian 15) — tiada insentif untuk melanjutkan.
- Pilihan "masa rehat": CILUKA terkunci selama tempoh yang ditetapkan (contohnya 2 jam) melainkan ibu bapa buka.

#### 4. Mod Waktu Tidur
- Ibu bapa menetapkan masa (contohnya 8:30 malam). Selepas itu, apabila CILUKA dibuka, Pip sedang tidur dan berbisik *"Shhh... dah malam. Jom tidur, esok kita main!"*
- Warna aplikasi lebih malap dan hangat selepas maghrib (jam peranti).

#### 5. Simpan automatik
Setiap pusingan disimpan serta-merta — anak tidak pernah "kehilangan" kemajuan apabila sesi tamat atau telefon diambil.

#### 6. Komitmen "Tiada"
- ❌ **Tiada iklan** — langsung, selamanya.
- ❌ **Tiada pay-to-win** — tiada apa yang boleh dibeli untuk mendapatkan ganjaran.
- ❌ **Tiada pembelian dalam aplikasi** di bahagian anak.
- ❌ **Tiada leaderboard awam** atau perbandingan antara kanak-kanak.
- ❌ **Tiada notifikasi tolak** kepada anak; notifikasi kepada ibu bapa hanya jika diaktifkan (contohnya "Surat Pip minggu ini sudah tiba").
- ❌ **Tiada streak yang menghukum.**
- ❌ **Tiada kiraan detik ganjaran** ("tamat dalam 1 jam!").
- ❌ **Tiada autoplay** permainan seterusnya tanpa tindakan anak.
- ❌ **Tiada pautan luar / media sosial** di bahagian anak.

#### 7. Ringkasan masa skrin untuk ibu bapa
Dashboard menunjukkan masa sebenar bermain setiap hari — **dengan nada positif**: *"Minggu ini Aisyah bermain purata 9 minit sehari — dalam julat sihat."*

---

## 23. Ciri WOW

Sepuluh detik yang membuatkan anak berkata *"Jom main lagi!"* dan ibu bapa berkata *"Ini bukan aplikasi biasa."*

| # | Ciri WOW | Untuk siapa | Kos bina | V1? |
|---|---|---|---|---|
| 1 | **"Ciluk-BA!" sebagai bahasa produk** — setiap penemuan, unlock dan kejayaan didedahkan dengan detik ciluk-ba yang dikenali setiap anak Malaysia | Anak | Rendah | ✅ |
| 2 | **Huruf yang kamu tulis menjadi hidup** — dalam bentuk tulisan anak sendiri, berjalan ke Kampung Huruf | Anak + ibu bapa | Sederhana | ✅ |
| 3 | **Kata Jadi Benda** — pulau anak dibina sepenuhnya daripada perkataan yang dieja; setiap objek bercakap apabila disentuh | Anak | Sederhana | ✅ |
| 4 | **Telur menetas di Sarang Kata** — mengeja ialah menenun, perkataan ialah kelahiran | Anak | Rendah–Sederhana | ✅ |
| 5 | **Kampung yang hidup semula** — kampung kosong menjadi meriah, satu rumah satu huruf | Anak + ibu bapa | Rendah | ✅ |
| 6 | **"Dulu & Sekarang" dalam Buku Hebat** — ulang tayang tulisan pertama vs terkini | Ibu bapa | Rendah | ✅ |
| 7 | **Ajar Pip / Cikgu Kecil** — anak membetulkan maskot; anak 6 tahun berasa pandai | Anak 5–6 | Rendah | ✅ (Doktor Kata) |
| 8 | **Dunia mengikut jam** — pagi cerah, malam berbintang, Pip mengantuk waktu malam | Anak | Rendah | ✅ |
| 9 | **Surat Pip boleh dikongsi ke WhatsApp keluarga** | Ibu bapa, datuk nenek | Rendah | ✅ |
| 10 | **Si Senyap — "boss" yang dibebaskan dengan kawan**, bukan dikalahkan | Anak | Sederhana | ✅ (mini) / penuh V1.5 |
| 11 | **Mesin Ais Kacang** — eksperimen bebas suku kata yang berbunyi | Anak | Rendah | ✅ |
| 12 | **Perayaan semua kaum** — Laman Pip berhias untuk Raya, CNY, Deepavali, Krismas, Gawai, Kaamatan, Merdeka | Keluarga | Rendah (aset) | 🔜 V1.1 |

### Idea WOW yang **ditolak** atau ditangguhkan — dengan sebab jujur

| Idea | Mengapa tidak (sekarang) | Alternatif |
|---|---|---|
| Pengecaman suara anak membaca | Teknologi pengecaman suara kanak-kanak BM kurang tepat; kesilapan menghukum anak yang betul; isu privasi audio | "Sebut bersama" dengan jeda tanpa penilaian; rakam & main semula sahaja |
| Pip memanggil nama anak dengan suara | Tidak boleh merakam setiap nama; TTS akan janggal | Pip memanggil "kawan hebat"; nama ditunjukkan di panji. *Masa depan:* rakam ~300 nama panggilan paling biasa di Malaysia |
| AR (huruf muncul di bilik melalui kamera) | Berat, tidak stabil di telefon bajet, menambah masa skrin | Misi Rumah ("Huruf Tersorok") memberi rasa yang sama di dunia sebenar |
| Dunia 3D boleh diputar | Prestasi & kos | Diorama pra-render + parallax |
| Multiplayer dalam talian | Server, keselamatan kanak-kanak | Main Berdua pada satu telefon |
| AI chatbot Pip | Kos, risiko kandungan tidak sesuai, privasi | Dialog bertulis berasaskan keadaan |

---

## 24. Model RM19 — Sekali Bayar

### Mengapa RM19 boleh dipercayai sebagai "berbaloi"

**Penanda aras dalam minda ibu bapa Malaysia:**

| Perbandingan | Harga |
|---|---|
| Satu buku latihan prasekolah | RM8–15 |
| Satu set kad imbas | RM15–30 |
| Satu bulan kelas membaca/tuisyen prasekolah | RM80–200 |
| Satu bulan langganan aplikasi pendidikan antarabangsa | ~RM30–60 *sebulan* |
| **CILUKA — seumur hidup, sehingga 4 anak** | **RM19 sekali** |

**Mesej utama:** *"Harga sebuah buku latihan. Nilai setahun pembelajaran. Untuk semua anak di rumah."*

### Apa yang pengguna dapat selepas membeli (V1)

1. **6 pulau dunia pengembaraan** + Laman Pip sendiri (3 pulau lagi melalui kemas kini percuma).
2. **28 pengalaman permainan** (18 mekanik unik).
3. **Studio menulis** untuk 26 huruf kecil, 26 huruf besar, dan nama sendiri — dalam 4 medium.
4. **~120 perkataan** Bahasa Melayu dalam Sarang Kata.
5. **Kompas Pip** — laluan pembelajaran peribadi untuk setiap anak.
6. **Sehingga 4 profil anak.**
7. **Ruang Ibu Bapa** dengan Surat Pip mingguan.
8. **Buku Hebat** — portfolio yang boleh dieksport dan dicetak.
9. **36 Misi Rumah.**
10. **Sijil Hebat** yang boleh dicetak.
11. **Berfungsi offline** — sesuai untuk perjalanan balik kampung.
12. **Kemas kini percuma** untuk semua kandungan V1.x.
13. **Tiada iklan, tiada langganan, tiada pembelian tersembunyi.**

### Pengalaman pertama selepas membeli (onboarding — 3 minit)

| Masa | Siapa | Apa berlaku |
|---|---|---|
| 0:00 | Ibu bapa | Skrin selamat datang ringkas: *"Terima kasih! Mari sediakan CILUKA untuk si kecil anda."* |
| 0:20 | Ibu bapa | Panduan "Pasang ke Skrin Utama" (bergambar, ikut jenis telefon) |
| 0:50 | Ibu bapa | Cipta profil: nama panggilan, tahun lahir (pilihan), pilih avatar *bersama anak* |
| 1:20 | Ibu bapa | Pilih panjang sesi (lalai 10 minit) + tetapkan PIN |
| 1:40 | Ibu bapa → anak | *"Sekarang, serahkan telefon kepada si kecil!"* |
| 1:45 | **Anak** | **Ciluk... BA!** Pip muncul. Permainan Kenalan bermula (3 permainan pendek) |
| 4:30 | Anak | Huruf pertama hidup, bola pertama menetas — Laman Pip ada objek pertama |
| 5:00 | Ibu bapa (kemudian) | Notifikasi dalam Ruang Ibu Bapa: *"Pip dah kenal Aisyah! Dia mula di Kampung Huruf."* |

### Strategi percubaan (trial)

**Cadangan: "Pulau Percuma"** — tanpa bayaran, pengguna boleh bermain:
- Laman Pip + Taman Calit penuh + 5 huruf pertama di Kampung Huruf + 1 perkataan Sarang Kata.
- Cukup untuk merasa 3 ciri WOW (Ciluk-BA, huruf hidup, telur menetas).
- Selepas itu, awan ungu menutupi pulau lain dengan mesej kepada ibu bapa (di belakang pintu ibu bapa — **tidak pernah dipaparkan kepada anak** sebagai tekanan jualan).

**Mengapa perlu percubaan:** ibu bapa Malaysia sangat berhati-hati membayar untuk aplikasi kerana terlalu banyak aplikasi percuma. Membiarkan mereka **melihat anak ketawa** dalam 5 minit pertama ialah alat jualan terkuat.

### Ciri yang membuatkan produk kelihatan premium

1. **Kualiti suara manusia** — perbezaan paling ketara berbanding aplikasi percuma.
2. **Animasi yang bertindak balas** — setiap sentuhan ada reaksi.
3. **Konsistensi dunia** — semuanya satu cerita, satu gaya seni, satu maskot.
4. **Laporan ibu bapa yang ditulis dengan baik** — tiada aplikasi percuma memberikan ini.
5. **Sijil fizikal di peti sejuk.**
6. **Tiada iklan** — kesunyian daripada iklan terasa mewah.
7. **Pembungkusan:** halaman jualan yang cantik, video 30 saat anak sebenar bermain (dengan kebenaran), testimoni guru tadika.

### Saluran jualan & kos

| Saluran | Kebaikan | Keburukan |
|---|---|---|
| **Jualan terus (laman web + gerbang pembayaran tempatan FPX/e-dompet)** | Yuran rendah (~1.5–3%), kawalan penuh, PWA terus | Perlu pemasaran sendiri; ibu bapa kurang biasa "membeli laman web" |
| Google Play (PWA dibungkus sebagai aplikasi) | Kepercayaan, penemuan | Yuran platform (15–30%); dasar kategori kanak-kanak |
| Apple App Store | Pasaran iOS | Yuran 15–30%, semakan ketat; PWA di iOS ada batasan |

**Cadangan:** lancarkan dengan **jualan terus** (margin tertinggi — hampir keseluruhan RM19 diterima), kemudian Google Play pada V1.5 untuk kepercayaan dan jangkauan. Harga di kedai aplikasi boleh dinaikkan sedikit untuk menampung yuran.

**Kos operasi berterusan (anggaran kualitatif):** hosting statik + CDN (sangat rendah), pelayan pengesahan lesen kecil (rendah), emel transaksi (rendah). **Tiada kos per pengguna yang ketara** — inilah yang menjadikan RM19 sekali bayar mampan.

### Pendapatan masa depan tanpa langganan

Pek pengembangan **sekali bayar** (pilihan, untuk ibu bapa sahaja, tidak pernah dipaparkan kepada anak):
- **Pek English Island** (RM9–12)
- **Pek Jawi** (RM9–12)
- **Pek Nombor & Matematik Awal** (RM9–12)
- **Buku Hebat bercetak** (fizikal, melalui rakan percetakan)
- **Lesen Tadika/Sekolah** (B2B — harga berbeza, untuk 20–30 tablet)

---

## 25. V1 — Produk Pertama

### Matriks penilaian idea utama

Skala 1–5 (5 = terbaik). Untuk "Kemudahan" dan "Kos", 5 = paling mudah / paling murah.

| Idea | Nilai belajar | Seronok | WOW | Manfaat ibu bapa | Unik | Mudah bina | Kos rendah | Sesuai 3–6 | Main berulang | Sesuai RM19 | **Jumlah /50** | Keputusan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kompas Pip (adaptif) | 5 | 3 | 3 | 5 | 4 | 3 | 5 | 5 | 5 | 5 | **43** | ✅ MUST |
| Ciluk-BA Huruf | 4 | 5 | 4 | 3 | 5 | 5 | 5 | 5 | 4 | 5 | **45** | ✅ MUST |
| Studio menulis + huruf hidup | 5 | 4 | 5 | 5 | 5 | 3 | 4 | 5 | 4 | 5 | **45** | ✅ MUST |
| Sarang Kata + Kata Jadi Benda | 5 | 5 | 5 | 4 | 5 | 3 | 4 | 4 | 5 | 5 | **45** | ✅ MUST |
| Kampung Huruf hidup semula | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 5 | 4 | 5 | **42** | ✅ MUST |
| Pasar Suku Kata | 5 | 4 | 4 | 4 | 5 | 4 | 4 | 4 | 4 | 5 | **43** | ✅ MUST |
| Misi Harian 3 belon | 4 | 4 | 3 | 5 | 3 | 4 | 5 | 5 | 5 | 5 | **43** | ✅ MUST |
| Surat Pip / dashboard | 3 | 1 | 3 | 5 | 4 | 4 | 5 | 5 | 3 | 5 | **38** | ✅ MUST |
| Buku Hebat (Dulu & Sekarang) | 3 | 2 | 5 | 5 | 5 | 4 | 5 | 5 | 3 | 5 | **42** | ✅ MUST (asas) |
| Masa skrin sihat | 3 | 2 | 2 | 5 | 3 | 5 | 5 | 5 | 3 | 5 | **38** | ✅ MUST |
| Misi Rumah | 4 | 3 | 3 | 5 | 4 | 5 | 5 | 5 | 4 | 5 | **43** | ✅ MUST |
| Doktor Kata / Ajar Pip | 5 | 4 | 4 | 3 | 5 | 4 | 5 | 3 | 4 | 4 | **41** | ✅ MUST |
| Rimba Ingat (pulau penuh) | 3 | 4 | 3 | 3 | 3 | 4 | 4 | 5 | 4 | 4 | **37** | 🟡 SHOULD |
| Pulau Kata Ajaib (membaca) | 5 | 3 | 3 | 4 | 3 | 3 | 3 | 3 | 3 | 4 | **34** | 🟡 SHOULD |
| Gua Ciluk berputar | 3 | 4 | 4 | 2 | 4 | 3 | 4 | 4 | 5 | 4 | **37** | 🟡 SHOULD |
| Sandaran awan | 1 | 1 | 1 | 5 | 2 | 3 | 3 | 5 | 1 | 4 | **26** | 🟡 SHOULD (keperluan, bukan seronok) |
| Rakaman suara anak | 3 | 4 | 4 | 5 | 4 | 3 | 4 | 4 | 3 | 4 | **38** | 🟡 SHOULD |
| Pengecaman suara | 4 | 3 | 4 | 4 | 3 | 1 | 2 | 2 | 3 | 2 | **28** | 🔵 FUTURE |
| AR | 2 | 4 | 5 | 2 | 3 | 1 | 2 | 2 | 2 | 2 | **25** | ❌ Tolak buat masa ini |
| Pek English / Jawi / Nombor | 5 | 4 | 3 | 5 | 3 | 3 | 3 | 5 | 4 | 5 | **40** | 🔵 FUTURE (pendapatan) |

### ✅ MUST HAVE — V1

**Dunia & pengalaman**
1. Laman Pip (home screen hibrid) dengan Kata Jadi Benda, kitaran siang/malam, 3 belon misi.
2. **6 pulau boleh dimain:** Taman Calit, Kampung Huruf, Hutan Bunyi, Pasar Suku Kata, Stesen Ejaan, Studio Calit Comot.
3. Istana Bintang versi mini: satu "Pintu Bintang" (Selamatkan Huruf) untuk setiap pulau.
4. 3 pulau di sebalik awan (Rimba Ingat, Pulau Kata Ajaib, Gua Ciluk) — dipaparkan sebagai misteri yang akan dibuka melalui kemas kini percuma.
5. Pip dengan 12 ekspresi dan ~27 situasi dialog; Comot, Uhu, Mak Cik Kuih, Kak Kondo, Utan (dalam permainan memori).

**Kandungan pembelajaran**
6. 26 huruf (kecil & besar) + digraf ng, ny.
7. Bunyi semua huruf, e pepet/taling.
8. Suku kata KV untuk semua konsonan utama + KVK terpilih.
9. ~120 perkataan dalam 7 tahap telur.
10. Studio menulis: 4 medium, 8 langkah progression, huruf kecil + besar + nama sendiri.

**Permainan**
11. 18 mekanik unik / 28 pengalaman (senarai di Bahagian 12).

**Sistem**
12. Kompas Pip: Skor Kuasa, Kotak Ingatan, Radar Keliru, Zon Hebat, Penjana Misi.
13. Permainan Kenalan (penempatan).
14. Misi Harian (3 belon) + Misi Kejutan + Cabaran Penguasaan.
15. Ganjaran: bintang, objek perkataan, Warga Huruf, Album Ciluk, Lencana, Pangkat (topi Pip), Peti Ciluk, Kebun Rajin, Sijil Hebat.

**Ibu bapa**
16. Ruang Ibu Bapa dengan pintu selamat, ringkasan, peta huruf, Pokok Hebat.
17. Surat Pip mingguan + kongsi imej.
18. Buku Hebat asas: milestone automatik + Dulu & Sekarang + eksport PDF.
19. 36 Misi Rumah dengan pengesahan.
20. Tetapan: had sesi, waktu tidur, bunyi berasingan, kidal, kurangkan animasi.

**Teknikal & perniagaan**
21. PWA offline-first, pasang ke skrin utama, simpan automatik.
22. Sehingga 4 profil, storan setempat, sandaran manual (eksport/import).
23. Pembelian RM19 + kod lesen + Pulau Percuma (trial).
24. Prestasi lancar di telefon Android bajet.
25. Dasar privasi mesra ibu bapa; pematuhan PDPA.

### Apa yang sengaja TIDAK ada dalam V1
- Pulau Kata Ajaib, Rimba Ingat penuh, Gua Ciluk.
- Pengecaman suara, AR, multiplayer, AI.
- Bahasa Inggeris, Jawi, nombor.
- Sandaran awan.
- Rakaman suara anak.

### Anggaran pasukan dan masa V1 (realistik)

| Peranan | Bilangan | Catatan |
|---|---|---|
| Product lead / pereka permainan | 1 | Boleh digabungkan dengan pengasas |
| Pembangun front-end (web/PWA, permainan 2D) | 1–2 | Kemahiran Canvas/WebGL 2D, animasi |
| Artis / ilustrator 3D-look + animator | 1–2 | Boleh separuh masa/kontrak |
| Pakar pendidikan awal kanak-kanak / guru prasekolah | 1 (perunding) | Semakan kandungan, urutan, sebutan |
| Pelakon suara + studio rakaman | Kontrak | ~900 klip |
| Penguji kanak-kanak | 10–20 keluarga | Ujian kebolehgunaan berkala |

**Anggaran masa:** sekitar **5–7 bulan** dari prototaip ke V1 untuk pasukan 3–5 orang (termasuk fasa pengesahan). Ini anggaran kasar dan bergantung kepada pengalaman pasukan.

---

## 26. Ciri yang Perlu Ditangguhkan

### 🟡 SHOULD HAVE (V1.1 – V1.5)

| Ciri | Sebab ditangguhkan | Bila |
|---|---|---|
| **Pulau Kata Ajaib** (membaca perkataan & frasa) | Memerlukan cukup perkataan dikuasai terlebih dahulu; anak awal V1 belum sampai | V1.5 |
| **Rimba Ingat** pulau penuh | 2 permainan memori sudah ada dalam V1 | V1.5 |
| **Gua Ciluk** (cabaran berputar mingguan) | Lebih bernilai selepas pengguna bermain beberapa minggu | V1.1 |
| **Hiasan perayaan bermusim** | Aset tambahan; boleh dilancarkan tepat pada musim | V1.1 (mula dengan perayaan terdekat) |
| **Sandaran awan disulitkan** | Memerlukan backend kecil + dasar privasi | V1.1 |
| **Rakaman suara anak** (Buku Hebat, Gua Gema) | Perlu pengurusan storan & kebenaran mikrofon | V1.5 |
| **Gambar Misi Rumah** | Storan & privasi gambar | V1.5 |
| **Medium Kedai Mamak** dan permainan 🔜 lain (Pintu Ajaib, Kunang Kelip, Katak Lompat, Sampan, Pecah Kelapa, Posmen Pip, Corak Batik, Ikut Pip, Susun Cerita, Lebah Madu, Puzzle Pulau, Bas Sekolah) | Kandungan tambahan selepas enjin teras stabil | V1.1 – V1.5 (gunakan enjin sedia ada) |
| **Main Berdua** (lebih banyak mod) | V1 ada asas sahaja | V1.5 |
| **Google Play** (PWA dibungkus) | Fokus jualan terus dahulu | V1.5 |
| **Rakaman nama oleh ibu bapa** untuk pilih profil | Bagus tetapi tidak kritikal | V1.1 |
| **Bahagian warna** dalam bank perkataan | Tambahan kandungan | V1.1 |

### 🔵 FUTURE EXPANSION (V2+)

| Pengembangan | Penerangan | Model |
|---|---|---|
| **Pek English Island** | Pulau baharu dengan fonik Inggeris (sistem berbeza daripada BM — perlu kurikulum sendiri). Ramai ibu bapa Malaysia mahu dwibahasa | Pek sekali bayar |
| **Pek Jawi** | Huruf Jawi, menulis kanan-ke-kiri dalam Studio. Permintaan tinggi dalam kalangan ibu bapa Muslim | Pek sekali bayar |
| **Pek Nombor** | Kenal nombor, mengira, menulis angka — enjin tracing & Kompas Pip boleh digunakan semula | Pek sekali bayar |
| **Bahasa Cina / Tamil** (pengenalan asas) | Inklusiviti pasaran Malaysia | Pek |
| **Mod Tadika (B2B)** | Banyak murid, laporan kelas untuk guru, tanpa data awan | Lesen institusi |
| **Buku Hebat bercetak** | Buku fizikal kenangan | Produk fizikal |
| **Pengecaman suara membaca** | Apabila teknologi suara kanak-kanak BM matang dan boleh berjalan dalam peranti | Kemas kini |
| **Cerita interaktif** (buku digital bersuara, menggunakan perkataan yang anak sudah kuasai) | "Buku pertama yang aku boleh baca sendiri" | Pek |
| **Pasaran serantau** (Brunei, Singapura, Indonesia — perlu penyesuaian bahasa) | Pengembangan | Lokalisasi |
| **Barangan fizikal** (patung Pip, kad huruf CILUKA, buku aktiviti) | Brand menjadi IP | Produk fizikal |

---

## 27. Cadangan Roadmap

### Fasa 0 — Pengesahan (4–6 minggu)
**Matlamat: buktikan 3 andaian paling berisiko sebelum membina semuanya.**

| Andaian | Ujian |
|---|---|
| Anak 3–6 tahun boleh menulis dengan jari dan sistem tracing toleransi kita tidak mengecewakan | Prototaip kasar Studio (1 medium, 5 huruf) diuji dengan 10–15 anak |
| Ciluk-BA + huruf hidup + telur menetas benar-benar membuatkan anak teruja | Prototaip 3 permainan; perhati: adakah anak minta main lagi? |
| Ibu bapa sanggup bayar RM19 | Halaman jualan + senarai tunggu + pra-tempahan (atau survei harga dengan 50–100 ibu bapa) |

**Juga:** muktamadkan urutan huruf dan bank perkataan dengan guru prasekolah; uji suara Pip dengan anak (pilih daripada 3 calon pelakon suara).

### Fasa 1 — Asas (bulan 1–2)
- Gaya seni dimuktamadkan; Pip, Comot dimodelkan dan dianimasikan.
- Enjin teras: sentuh-dedah, seret-lepas, jejak & tulis, pilih bergerak.
- Kompas Pip versi pertama + struktur data.
- Laman Pip + Taman Calit + Kampung Huruf boleh dimain.
- Rakaman audio gelombang 1 (huruf, bunyi).

### Fasa 2 — Kandungan (bulan 3–4)
- Hutan Bunyi, Pasar Suku Kata, Stesen Ejaan, Sarang Kata.
- Semua 18 mekanik V1.
- Rakaman audio gelombang 2 (suku kata, perkataan, dialog).
- Ruang Ibu Bapa, Surat Pip, Buku Hebat.

### Fasa 3 — Penggilapan & Beta (bulan 5–6)
- **Beta tertutup** dengan 30–50 keluarga selama 3–4 minggu.
- Ukur: berapa hari anak kembali, berapa lama sesi, adakah huruf dikuasai meningkat, apa yang ibu bapa kata tentang laporan.
- Tala Kompas Pip (pemberat skor, ambang kesukaran) berdasarkan data beta (dikongsi secara sukarela).
- Ujian prestasi pada 5–6 telefon bajet sebenar.
- Halaman jualan, sistem pembayaran, lesen.

### Fasa 4 — Pelancaran V1 (bulan 6–7)
- Pelancaran jualan terus.
- Pemasaran: video pendek anak sebenar bermain (TikTok, Facebook, Instagram), komuniti ibu bapa, guru tadika sebagai duta, harga pelancaran awal (contohnya RM15 untuk 1,000 pembeli pertama — *early bird*).
- Sokongan pelanggan melalui WhatsApp Business.

### Fasa 5 — V1.1 (1–2 bulan selepas pelancaran)
- Gua Ciluk, hiasan perayaan, sandaran awan, permainan 🔜 pertama (4–6 permainan), pembetulan pepijat.

### Fasa 6 — V1.5 (4–6 bulan selepas pelancaran)
- Pulau Kata Ajaib, Rimba Ingat penuh, rakaman suara, Main Berdua lanjutan, Google Play.

### Fasa 7 — V2 (9–12 bulan selepas pelancaran)
- Pek pengembangan berbayar pertama (cadangan: **Pek Nombor** dahulu kerana menggunakan semula enjin sedia ada dengan kos paling rendah; kemudian Jawi atau English berdasarkan survei pembeli).
- Pilot Mod Tadika dengan 3–5 tadika.

### Metrik kejayaan

| Metrik | Sasaran awal (penanda petunjuk) |
|---|---|
| Penukaran Pulau Percuma → beli | 8–15% |
| Anak kembali bermain pada hari ke-7 | > 50% |
| Purata hari bermain seminggu | 4–5 hari |
| Purata sesi | 7–12 minit (bukan lebih panjang!) |
| Huruf dikuasai dalam 30 hari pertama (anak 4–5 tahun yang bermula dari sifar) | 10+ |
| Kadar pemulangan wang | < 3% |
| Ibu bapa yang berkongsi Surat Pip | > 20% |

**Nota:** metrik "masa skrin" sengaja diukur sebagai **julat sihat**, bukan "lebih tinggi lebih baik".

---

## 28. Keunikan dan Positioning

### Kenyataan positioning

> **Untuk ibu bapa Malaysia** yang mahu masa skrin anak membina kemahiran sebenar, **CILUKA ialah dunia pengembaraan membaca dan menulis Bahasa Melayu** yang menyesuaikan diri dengan setiap anak — **tidak seperti aplikasi ABC percuma** yang penuh iklan, berulang, dan tidak menunjukkan apa yang anak pelajari. Satu bayaran RM19, untuk semua anak di rumah, selamanya.

### CILUKA bukan... CILUKA ialah...

| Bukan | Tetapi |
|---|---|
| Aplikasi ABC | **Dunia** dengan cerita, maskot dan pulau yang hidup |
| Aplikasi worksheet | **Permainan** dengan 18 mekanik berbeza |
| Aplikasi flashcard | **Perjalanan** — huruf → bunyi → suku kata → perkataan |
| Aplikasi kuiz | **Adaptif** — Kompas Pip memilih latihan untuk kelemahan anak |
| Aplikasi tracing | **Studio menulis** di mana huruf anak menjadi hidup |
| Aplikasi terjemahan dari Inggeris | **Dibina untuk Bahasa Melayu** — suku kata, e pepet, digraf |
| Pengasuh digital | **Rakan ibu bapa** — Surat Pip, Misi Rumah, Buku Hebat |

### Mengapa ibu bapa patut pilih CILUKA berbanding aplikasi percuma

1. **"Saya tahu apa anak saya belajar."** — Surat Pip dan peta huruf. Aplikasi percuma tidak memberitahu apa-apa.
2. **"Tiada iklan yang muncul tiba-tiba."** — Anak tidak tersentuh iklan dan keluar ke YouTube.
3. **"Ia faham Bahasa Melayu."** — Kaedah suku kata yang sama seperti tadika.
4. **"Ia tidak membuatkan anak saya ketagih."** — Sesi berakhir dengan Pip tidur. Tiada streak. Tiada desakan.
5. **"Anak saya mahu buka sendiri."** — Dunia, maskot, Kata Jadi Benda.
6. **"Saya boleh simpan tulisan pertama anak saya."** — Buku Hebat.
7. **"Satu kali bayar, semua anak."** — Tiada kejutan bil bulanan.
8. **"Berfungsi tanpa internet."** — Dalam kereta, di kampung, di klinik.
9. **"Data anak saya tidak dijual."** — Semuanya dalam telefon sendiri.

### Parit pertahanan (moat) — apa yang sukar ditiru pesaing

| Parit | Mengapa sukar ditiru |
|---|---|
| **Brand & IP Pip** | Watak yang anak sayang tidak boleh disalin tanpa melanggar hak |
| **Pedagogi BM yang disahkan guru** | Pesaing antarabangsa tidak melabur dalam BM; pesaing tempatan biasanya tidak mempunyai enjin adaptif |
| **Bank audio manusia** | ~900 klip berkualiti — kerja berbulan |
| **Buku Hebat** | Lebih lama ibu bapa guna, lebih banyak kenangan — **kos untuk bertukar ke aplikasi lain meningkat** |
| **Komuniti & kepercayaan** | Ibu bapa, guru tadika, testimoni |

### Mesej pemasaran (contoh)

- *"Anak bermain. Ibu bapa nampak hasilnya."*
- *"Huruf yang anak tulis... jadi hidup!"*
- *"Tiada iklan. Tiada langganan. Tiada ketagihan. Hanya Pip."*
- *"RM19. Sekali. Untuk semua anak di rumah."*
- *"Ciluk... BA! Huruf pun jumpa!"*

---

## 29. Risiko Produk

| # | Risiko | Kebarangkalian | Kesan | Mitigasi |
|---|---|---|---|---|
| 1 | **Storan pelayar dipadam** (terutamanya iOS) → kemajuan & Buku Hebat hilang | Sederhana | **Tinggi** (kemarahan, pemulangan wang) | Galak pasang PWA, minta storan berterusan, sandaran manual sejak V1, sandaran awan V1.1 |
| 2 | **Tracing terlalu ketat/longgar** → anak kecewa atau tidak belajar | Tinggi (pada awalnya) | Tinggi | Ujian awal Fasa 0, toleransi adaptif, ambang murah hati, tangga bantuan |
| 3 | **Kos & masa produksi audio** lebih tinggi daripada jangkaan | Sederhana | Sederhana | Skrip audio dimuktamadkan awal; rakam berkelompok; guna semula klip merentas permainan |
| 4 | **Skop terlalu besar** → V1 lewat atau tidak stabil | **Tinggi** | Tinggi | Pegang senarai MUST HAVE; strategi "8 enjin, 28 pengalaman"; awan untuk pulau masa depan |
| 5 | **Prestasi lemah di telefon bajet** | Sederhana | Tinggi (ulasan buruk) | Gaya pra-render, bajet aset, mod ringan automatik, ujian pada telefon sebenar |
| 6 | **Ibu bapa tidak mahu bayar** kerana banyak aplikasi percuma | Tinggi | Tinggi | Pulau Percuma, video anak sebenar, testimoni guru, harga early bird, jaminan pulang wang 7 hari |
| 7 | **Perkongsian lesen / cetak rompak** PWA | Sederhana | Sederhana | Had peranti per lesen, semakan berkala ringan; terima bahawa sedikit kebocoran berlaku — harga rendah mengurangkan insentif cetak rompak |
| 8 | **Kandungan pedagogi tidak tepat** (urutan huruf, sebutan, e pepet) | Sederhana | Tinggi (kepercayaan guru & ibu bapa) | Pakar pendidikan sebagai perunding sejak awal; semakan guru prasekolah |
| 9 | **Nama "CILUKA" dibaca sebagai "luka"** | Rendah | Rendah–Sederhana | Sonic logo, visual Pip mengintai, tagline; uji dengan 50 ibu bapa sebelum muktamad |
| 10 | **Kebergantungan pada pendapatan sekali bayar** — pendapatan menurun selepas gelombang pelancaran | Tinggi (jangka panjang) | Tinggi | Pek pengembangan, B2B tadika, barangan fizikal, Buku Hebat bercetak, pasaran serantau |
| 11 | **Pesaing besar meniru** ciri | Sederhana | Sederhana | Kelajuan, brand Pip, kedalaman BM, komuniti |
| 12 | **Dasar kedai aplikasi** (kategori kanak-kanak, yuran) | Sederhana | Sederhana | Jualan terus dahulu; reka produk mengikut dasar kanak-kanak sejak awal (tiada analitik penjejak, tiada pautan luar) |
| 13 | **Isu privasi / PDPA** | Rendah (kerana data setempat) | Tinggi jika berlaku | Minimumkan data, dasar privasi jelas, tiada analitik pihak ketiga di bahagian anak |
| 14 | **Anak bawah 3 tahun** menggunakan aplikasi | Sederhana | Rendah | Mod ringkas automatik jika penempatan menunjukkan kemahiran motor sangat awal; nasihat umur pada halaman jualan |
| 15 | **Anak keperluan khas** (disleksia, ADHD, autisme) mungkin bergelut | Sederhana | Sederhana | Kurangkan animasi, sesi pendek, toleransi tinggi, tiada tekanan masa; *masa depan*: fon & mod mesra disleksia |
| 16 | **Ganjaran menjadi "kerja"** — anak hanya kejar objek, bukan belajar | Rendah–Sederhana | Sederhana | Objek **hanya** daripada pembelajaran; Kata Jadi Benda; tiada ganjaran selepas had sesi |
| 17 | **Ibu bapa salah faham laporan** atau risau berlebihan | Sederhana | Sederhana | Bahasa laporan positif; tip "ini normal"; tiada perbandingan dengan anak lain |

---

## 30. Cadangan Akhir Produk

### Lima keputusan yang menentukan kejayaan CILUKA

1. **Jadikan "Ciluk-BA!" jiwa produk.**
   Bukan sekadar nama — setiap penemuan, kejayaan dan unlock ialah detik ciluk-ba. Ini memberi CILUKA identiti yang **tidak boleh ditiru** dan serta-merta difahami oleh setiap keluarga Malaysia.

2. **Bina untuk Bahasa Melayu, bukan terjemah daripada Inggeris.**
   Suku kata sebagai jambatan membaca. E pepet dan e taling. Digraf ng dan ny. Bentuk huruf satu tingkat seperti di tadika. Inilah yang akan membuatkan guru prasekolah mengesyorkan CILUKA — dan cadangan guru ialah pemasaran paling dipercayai.

3. **Ganjaran ialah pembelajaran itu sendiri.**
   Huruf yang ditulis menjadi penduduk kampung. Perkataan yang dieja menjadi objek di pulau. Tiada syiling, tiada kedai, tiada loot box. Ini menyelesaikan dua masalah sekali gus: motivasi anak dan kepercayaan ibu bapa.

4. **Menangi hati ibu bapa melalui bukti, bukan janji.**
   Surat Pip yang hangat, peta huruf yang jelas, dan **Buku Hebat "Dulu & Sekarang"** — ini yang menukar RM19 daripada "harga aplikasi" kepada "kenangan yang tidak ternilai". Inilah juga sebab ibu bapa tidak akan bertukar ke aplikasi lain.

5. **Kecil, stabil dan cepat — kemudian berkembang.**
   V1 dengan 6 pulau dan 18 mekanik yang digilap sempurna lebih kuat daripada 9 pulau yang separuh siap. Bina 8 enjin, jana 28 pengalaman. Uji tracing dengan anak sebenar **sebelum** membina segalanya.

### Langkah seterusnya yang dicadangkan (2 minggu akan datang)

1. ☐ Semak ketersediaan tanda dagangan "CILUKA" (MyIPO), domain dan akaun media sosial.
2. ☐ Lantik perunding pendidikan awal kanak-kanak / guru prasekolah BM.
3. ☐ Muktamadkan urutan huruf, keluarga tulisan, dan bank 120 perkataan bersama perunding.
4. ☐ Lakar 3 variasi rupa Pip; uji dengan 10–15 anak (mana yang mereka tunjuk dan senyum).
5. ☐ Bina prototaip kasar **Studio menulis (1 medium, 5 huruf)** + **Ciluk-BA Huruf** + **telur menetas** — dan uji dengan anak sebenar.
6. ☐ Lancarkan halaman senarai tunggu dan survei harga kepada 50–100 ibu bapa.
7. ☐ Dapatkan sebut harga pelakon suara dan studio rakaman.

### Kata penutup

Apabila ibu bapa melihat CILUKA, mereka akan nampak sebuah dunia yang dibina dengan teliti untuk anak mereka — dalam bahasa mereka, mengikut cara anak mereka belajar, dan menghormati masa keluarga mereka.

Apabila anak membuka CILUKA, mereka akan nampak seekor burung kecil bertopi anyaman mengintai dari sebalik awan, dan mendengar:

> ***"Ciluk... BA! Jom kita cari huruf!"***

Dan mereka akan berkata: ***"Jom masuk! Aku nak main lagi!"***

---

**CILUKA — Kecil-Kecil, Hebat-Hebat!** 🐣
