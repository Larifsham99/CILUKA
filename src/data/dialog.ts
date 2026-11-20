/** Dialog Pip — ditulis terlebih dahulu, dipilih mengikut keadaan permainan (bukan chatbot). */
export const LINES = {
  welcomeFirst: ['Ciluk... BA! Hai! Aku Pip. Jom kita mengembara bersama!'],
  welcomeMorning: ['Selamat pagi! Jom kita cari huruf hari ini!', 'Hai! Pip dah sediakan misi istimewa!'],
  welcomeDay: ['Hai kawan hebat! Jom main misi hari ini!', 'Jom kita sambung pengembaraan!'],
  welcomeNight: ['Dah malam. Kita main sekejap je, ya!'],
  welcomeBack: ['Selamat datang kembali! Pip rindu kamu!'],
  missionDone: ['Misi hari ini dah siap! Hebatnya kamu!'],
  correct: ['Hebat! Kamu berjaya!', 'Betul! Pandainya!', 'Yeay! Betul!', 'Bagus! Kita semakin pandai!', 'Wah, hebatnya!'],
  correctAfterTry: ['Kamu tak putus asa! Itu baru hebat!', 'Ha, dah jumpa! Bagus!'],
  wrong: ['Tak mengapa, cuba sekali lagi.', 'Eh, bukan yang itu. Cuba lagi!', 'Hampir! Cuba sekali lagi.'],
  hint: ['Pip tolong sikit. Tengok yang bersinar tu!'],
  encourage: ['Kamu boleh! Pip ada di sini.', 'Perlahan-lahan pun tak apa.'],
  complete3: ['Tiga bintang! Kamu memang hebat!'],
  complete2: ['Dua bintang! Bagus sangat!'],
  complete1: ['Kamu dah siap! Jom cuba lagi untuk lebih bintang!'],
  locked: ['Pulau ni masih berkunci. Jom main pulau lain dulu!'],
  rest: ['Hebat hari ini! Jom berehat. Esok kita sambung pengembaraan lagi!'],
  tickle: ['Hihihi! Geli!', 'Pip tengah fikir pasal kuih!', 'Ciluk... BA!']
};

export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
