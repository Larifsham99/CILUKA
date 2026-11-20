/* Audio CILUKA.
   PROTOTAIP: suara menggunakan Text-to-Speech peranti (ms-MY → id-ID) sebagai pengganti sementara.
   Versi sebenar akan menggunakan rakaman pelakon suara Malaysia (Pelan Produk, Bahagian 20).
   Kesan bunyi dijana dengan Web Audio — tiada fail audio diperlukan. */
(function () {
  let ctx = null;
  let voice = null;
  const settings = { voice: true, sfx: true };

  // Nama huruf dalam sebutan Bahasa Melayu (untuk TTS)
  const LETTER_NAME = {
    a: 'a', b: 'bi', c: 'si', d: 'di', e: 'i', f: 'ef', g: 'ji', h: 'ec', i: 'ai', j: 'je', k: 'ke', l: 'el', m: 'em',
    n: 'en', o: 'o', p: 'pi', q: 'kiu', r: 'ar', s: 'es', t: 'ti', u: 'yu', v: 'vi', w: 'dabelyu', x: 'eks', y: 'wai', z: 'zed'
  };

  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices();
    voice = vs.find(v => /^ms/i.test(v.lang)) || vs.find(v => /^id/i.test(v.lang)) || null;
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  function speak(text, opts = {}) {
    if (!settings.voice || !('speechSynthesis' in window) || !text) return Promise.resolve();
    return new Promise(resolve => {
      try {
        if (!opts.queue) speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = voice ? voice.lang : 'ms-MY';
        if (voice) u.voice = voice;
        u.rate = opts.rate || 0.92;
        u.pitch = opts.pitch || 1.25;
        u.onend = resolve; u.onerror = resolve;
        speechSynthesis.speak(u);
        setTimeout(resolve, 600 + text.length * 110); // jaminan jika onend tidak dipanggil
      } catch (e) { resolve(); }
    });
  }

  const letterName = l => LETTER_NAME[l] || l;

  function ac() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type = 'sine', vol = 0.18, slideTo) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + start;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  }

  const SFX = {
    pop() { tone(520, 0, 0.09, 'triangle', 0.16, 900); },
    correct() { tone(660, 0, 0.14, 'triangle'); tone(880, 0.1, 0.14, 'triangle'); tone(1320, 0.2, 0.22, 'triangle'); },
    boing() { tone(300, 0, 0.28, 'sine', 0.16, 160); },
    ciluk() { tone(330, 0, 0.22, 'sine', 0.08); tone(392, 0.18, 0.2, 'sine', 0.08); tone(784, 0.42, 0.28, 'triangle', 0.22); tone(1046, 0.5, 0.3, 'triangle', 0.12); },
    reward() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, i * 0.08, 0.3, 'sine', 0.12)); },
    tick(level) { tone(500 + level * 40, 0, 0.05, 'sine', 0.06); },
    sand() {
      const c = ac(); if (!c) return;
      const len = 0.06; const buf = c.createBuffer(1, c.sampleRate * len, c.sampleRate);
      const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      const s = c.createBufferSource(); const g = c.createGain(); const f = c.createBiquadFilter();
      f.type = 'highpass'; f.frequency.value = 2500; g.gain.value = 0.05;
      s.buffer = buf; s.connect(f).connect(g).connect(c.destination); s.start();
    }
  };

  function sfx(name, arg) { if (settings.sfx && SFX[name]) { try { SFX[name](arg); } catch (e) { } } }

  window.CAudio = { speak, sfx, letterName, settings, unlock: ac };
})();
