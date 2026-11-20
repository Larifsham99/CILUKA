# Skrip Rakaman Suara CILUKA

Senarai ini dijana oleh `scripts/gen-voice-script.ts`. Jumlah: **174 klip**.

## Cara guna
1. Rakam setiap baris dengan suara manusia (Bahasa Melayu Malaysia, sebutan standard prasekolah, nada mesra kanak-kanak).
2. Simpan setiap klip sebagai **`public/audio/<kunci>.mp3`** (mono, 44.1 kHz, ~64 kbps). Contoh: `public/audio/huruf-b.mp3`, `public/audio/bola.mp3`.
3. Jalankan `npm run audio:manifest` untuk mengemas kini `public/audio/manifest.json`.
4. Build semula. Aplikasi akan menggunakan rakaman dahulu; bahagian yang belum dirakam masih menggunakan suara telefon.

Ayat yang mengandungi huruf (cth. "Cari huruf B") dicantum automatik: klip `cari-huruf` + klip `huruf-b`.

| Kumpulan | Kunci (nama fail) | Apa yang disebut |
|---|---|---|
| Nama huruf | `huruf-a` | A — sebut "a" |
| Nama huruf | `huruf-b` | B — sebut "bi" |
| Nama huruf | `huruf-c` | C — sebut "si" |
| Nama huruf | `huruf-d` | D — sebut "di" |
| Nama huruf | `huruf-e` | E — sebut "i" |
| Nama huruf | `huruf-f` | F — sebut "ef" |
| Nama huruf | `huruf-g` | G — sebut "ji" |
| Nama huruf | `huruf-h` | H — sebut "ec (ech)" |
| Nama huruf | `huruf-i` | I — sebut "ai" |
| Nama huruf | `huruf-j` | J — sebut "je" |
| Nama huruf | `huruf-k` | K — sebut "ke" |
| Nama huruf | `huruf-l` | L — sebut "el" |
| Nama huruf | `huruf-m` | M — sebut "em" |
| Nama huruf | `huruf-n` | N — sebut "en" |
| Nama huruf | `huruf-o` | O — sebut "o" |
| Nama huruf | `huruf-p` | P — sebut "pi" |
| Nama huruf | `huruf-q` | Q — sebut "kiu" |
| Nama huruf | `huruf-r` | R — sebut "ar" |
| Nama huruf | `huruf-s` | S — sebut "es" |
| Nama huruf | `huruf-t` | T — sebut "ti" |
| Nama huruf | `huruf-u` | U — sebut "yu" |
| Nama huruf | `huruf-v` | V — sebut "vi" |
| Nama huruf | `huruf-w` | W — sebut "dabel-yu" |
| Nama huruf | `huruf-x` | X — sebut "eks" |
| Nama huruf | `huruf-y` | Y — sebut "wai" |
| Nama huruf | `huruf-z` | Z — sebut "zed" |
| Perkataan | `bola` | bola |
| Perkataan | `buku` | buku |
| Perkataan | `susu` | susu |
| Perkataan | `mata` | mata |
| Perkataan | `kaki` | kaki |
| Perkataan | `baju` | baju |
| Perkataan | `roti` | roti |
| Perkataan | `topi` | topi |
| Perkataan | `nasi` | nasi |
| Perkataan | `dadu` | dadu |
| Perkataan | `gigi` | gigi |
| Perkataan | `yoyo` | yoyo |
| Perkataan | `ibu` | ibu |
| Perkataan | `ikan` | ikan |
| Perkataan | `ayam` | ayam |
| Perkataan | `ular` | ular |
| Perkataan | `epal` | epal |
| Perkataan | `oren` | oren |
| Perkataan | `kasut` | kasut |
| Perkataan | `cawan` | cawan |
| Perkataan | `bulan` | bulan |
| Perkataan | `rumah` | rumah |
| Perkataan | `pokok` | pokok |
| Perkataan | `hujan` | hujan |
| Perkataan | `lampu` | lampu |
| Perkataan | `bas` | bas |
| Perkataan | `jam` | jam |
| Perkataan | `wau` | wau |
| Perkataan | `bunga` | bunga |
| Perkataan | `kucing` | kucing |
| Perkataan | `payung` | payung |
| Perkataan | `pisang` | pisang |
| Perkataan | `kereta` | kereta |
| Perkataan | `matahari` | matahari |
| Suku kata | `bo` | bo |
| Suku kata | `la` | la |
| Suku kata | `bu` | bu |
| Suku kata | `ku` | ku |
| Suku kata | `su` | su |
| Suku kata | `ma` | ma |
| Suku kata | `ta` | ta |
| Suku kata | `ka` | ka |
| Suku kata | `ki` | ki |
| Suku kata | `ba` | ba |
| Suku kata | `ju` | ju |
| Suku kata | `ro` | ro |
| Suku kata | `ti` | ti |
| Suku kata | `to` | to |
| Suku kata | `pi` | pi |
| Suku kata | `na` | na |
| Suku kata | `si` | si |
| Suku kata | `da` | da |
| Suku kata | `du` | du |
| Suku kata | `gi` | gi |
| Suku kata | `yo` | yo |
| Suku kata | `i` | i |
| Suku kata | `kan` | kan |
| Suku kata | `a` | a |
| Suku kata | `yam` | yam |
| Suku kata | `u` | u |
| Suku kata | `lar` | lar |
| Suku kata | `e` | e |
| Suku kata | `pal` | pal |
| Suku kata | `o` | o |
| Suku kata | `ren` | ren |
| Suku kata | `sut` | sut |
| Suku kata | `ca` | ca |
| Suku kata | `wan` | wan |
| Suku kata | `lan` | lan |
| Suku kata | `ru` | ru |
| Suku kata | `mah` | mah |
| Suku kata | `po` | po |
| Suku kata | `kok` | kok |
| Suku kata | `hu` | hu |
| Suku kata | `jan` | jan |
| Suku kata | `lam` | lam |
| Suku kata | `pu` | pu |
| Suku kata | `nga` | nga |
| Suku kata | `cing` | cing |
| Suku kata | `pa` | pa |
| Suku kata | `yung` | yung |
| Suku kata | `sang` | sang |
| Suku kata | `ke` | ke |
| Suku kata | `re` | re |
| Suku kata | `ha` | ha |
| Suku kata | `ri` | ri |
| Dialog Pip | `ciluk-ba-hai-aku-pip-jom-kita-mengembara-bersama` | Ciluk... BA! Hai! Aku Pip. Jom kita mengembara bersama! |
| Dialog Pip | `selamat-pagi-jom-kita-cari-huruf-hari-ini` | Selamat pagi! Jom kita cari huruf hari ini! |
| Dialog Pip | `hai-pip-dah-sediakan-misi-istimewa` | Hai! Pip dah sediakan misi istimewa! |
| Dialog Pip | `hai-kawan-hebat-jom-main-misi-hari-ini` | Hai kawan hebat! Jom main misi hari ini! |
| Dialog Pip | `jom-kita-sambung-pengembaraan` | Jom kita sambung pengembaraan! |
| Dialog Pip | `dah-malam-kita-main-sekejap-je-ya` | Dah malam. Kita main sekejap je, ya! |
| Dialog Pip | `selamat-datang-kembali-pip-rindu-kamu` | Selamat datang kembali! Pip rindu kamu! |
| Dialog Pip | `misi-hari-ini-dah-siap-hebatnya-kamu` | Misi hari ini dah siap! Hebatnya kamu! |
| Dialog Pip | `hebat-kamu-berjaya` | Hebat! Kamu berjaya! |
| Dialog Pip | `betul-pandainya` | Betul! Pandainya! |
| Dialog Pip | `yeay-betul` | Yeay! Betul! |
| Dialog Pip | `bagus-kita-semakin-pandai` | Bagus! Kita semakin pandai! |
| Dialog Pip | `wah-hebatnya` | Wah, hebatnya! |
| Dialog Pip | `kamu-tak-putus-asa-itu-baru-hebat` | Kamu tak putus asa! Itu baru hebat! |
| Dialog Pip | `ha-dah-jumpa-bagus` | Ha, dah jumpa! Bagus! |
| Dialog Pip | `tak-mengapa-cuba-sekali-lagi` | Tak mengapa, cuba sekali lagi. |
| Dialog Pip | `eh-bukan-yang-itu-cuba-lagi` | Eh, bukan yang itu. Cuba lagi! |
| Dialog Pip | `hampir-cuba-sekali-lagi` | Hampir! Cuba sekali lagi. |
| Dialog Pip | `pip-tolong-sikit-tengok-yang-bersinar-tu` | Pip tolong sikit. Tengok yang bersinar tu! |
| Dialog Pip | `kamu-boleh-pip-ada-di-sini` | Kamu boleh! Pip ada di sini. |
| Dialog Pip | `perlahan-lahan-pun-tak-apa` | Perlahan-lahan pun tak apa. |
| Dialog Pip | `tiga-bintang-kamu-memang-hebat` | Tiga bintang! Kamu memang hebat! |
| Dialog Pip | `dua-bintang-bagus-sangat` | Dua bintang! Bagus sangat! |
| Dialog Pip | `kamu-dah-siap-jom-cuba-lagi-untuk-lebih-bintang` | Kamu dah siap! Jom cuba lagi untuk lebih bintang! |
| Dialog Pip | `pulau-ni-masih-berkunci-jom-main-pulau-lain-dulu` | Pulau ni masih berkunci. Jom main pulau lain dulu! |
| Dialog Pip | `hebat-hari-ini-jom-berehat-esok-kita-sambung-pengembaraan-lagi` | Hebat hari ini! Jom berehat. Esok kita sambung pengembaraan lagi! |
| Dialog Pip | `hihihi-geli` | Hihihi! Geli! |
| Dialog Pip | `pip-tengah-fikir-pasal-kuih` | Pip tengah fikir pasal kuih! |
| Dialog Pip | `ciluk-ba` | Ciluk... BA! |
| Arahan permainan | `dengar-nama-huruf-kemudian-tekan-huruf-yang-betul` | Dengar nama huruf, kemudian tekan huruf yang betul. |
| Arahan permainan | `tekan-satu-huruf-kemudian-pasangannya-besar-kecil` | Tekan satu huruf, kemudian pasangannya (besar ↔ kecil). |
| Arahan permainan | `pecahkan-belon-yang-ada-huruf-yang-pip-sebut` | Pecahkan belon yang ada huruf yang Pip sebut. |
| Arahan permainan | `letak-jari-di-titik-ungu-kemudian-ikut-laluan` | Letak jari di titik ungu, kemudian ikut laluan. |
| Arahan permainan | `dengar-bunyi-kemudian-tekan-huruf-yang-sepadan` | Dengar bunyi, kemudian tekan huruf yang sepadan. |
| Arahan permainan | `susun-suku-kata-supaya-jadi-perkataan` | Susun suku kata supaya jadi perkataan. |
| Arahan permainan | `cari-huruf-yang-hilang-dalam-perkataan` | Cari huruf yang hilang dalam perkataan. |
| Arahan permainan | `tekan-huruf-ikut-susunan-untuk-membina-perkataan` | Tekan huruf ikut susunan untuk membina perkataan. |
| Arahan permainan | `baca-atau-dengar-perkataan-kemudian-pilih-gambarnya` | Baca atau dengar perkataan, kemudian pilih gambarnya. |
| Arahan permainan | `buka-dua-kad-cari-pasangan-yang-sama` | Buka dua kad. Cari pasangan yang sama. |
| Arahan permainan | `tekan-papan-huruf-yang-betul-untuk-memandu-kereta-betul-nitro` | Tekan papan huruf yang betul untuk memandu kereta. Betul = nitro! |
| Arahan permainan | `jawab-soalan-campuran-untuk-menjadi-juara` | Jawab soalan campuran untuk menjadi juara. |
| Frasa | `cari-huruf` | Cari huruf |
| Frasa | `pandu-ke-huruf` | Pandu ke huruf |
| Frasa | `pecahkan-belon-huruf` | Pecahkan belon huruf |
| Frasa | `jom-tulis-huruf` | Jom tulis huruf |
| Frasa | `mana-huruf` | Mana huruf |
| Frasa | `itu-huruf` | Itu huruf |
| Frasa | `kita-cari-huruf` | Kita cari huruf |
| Frasa | `kita-perlukan-huruf` | Kita perlukan huruf |
| Frasa | `dengar-baik-baik` | Dengar baik-baik |
| Frasa | `huruf-apa` | Huruf apa |
| Frasa | `huruf-apa-yang-hilang` | Huruf apa yang hilang |
| Frasa | `pandu-ke-hurufnya` | Pandu ke hurufnya |
| Frasa | `besar` | besar |
| Frasa | `kecil` | kecil |
| Frasa | `jom-bina-perkataan` | Jom bina perkataan |
| Frasa | `padankan-huruf-besar-dengan-huruf-kecil-yang-sama` | Padankan huruf besar dengan huruf kecil yang sama. |
| Frasa | `mana-gambar` | Mana gambar |
| Frasa | `jom-sebut-sama-sama` | Jom sebut sama-sama |
| Frasa | `kamu-tempat-pertama-juara-lumba` | Kamu tempat pertama! Juara lumba! |
| Frasa | `tempat-kedua-hebat` | Tempat kedua! Hebat! |
| Frasa | `kamu-sampai-ke-garisan-penamat-bagus` | Kamu sampai ke garisan penamat! Bagus! |
