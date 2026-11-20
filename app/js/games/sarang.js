/* Sarang Kata — Magic Word Builder (Pelan Produk, Bahagian 14).
   Cari huruf → tenun dalam sarang → gabung suku kata → telur menetas → objek tinggal di Laman Pip. */
(function () {
  const D = window.CilukaData;

  function start(G, mission) {
    const W = D.WORDS.find(w => w.w === mission.target) || D.WORDS[1];
    const letters = W.w.split('');
    const lvl = Kompas.zone('S:' + W.w);
    let need = letters.slice();          // huruf yang masih perlu dicari
    let tray = [];                       // huruf yang dikumpul
    let slot = 0, mistakes = 0, hints = 0;

    G.setWorld('w-sarang');
    const intro = 'Ada sesuatu dalam telur ni! Pip rasa ia ' + W.w.toUpperCase() + '! Jom cari huruf ' + letters.map(CAudio.letterName).join(', ') + '!';

    /* ---------- Fasa 1: Pemburuan huruf ---------- */
    function hunt() {
      const extras = lvl >= 2 ? Kompas.distractors(letters[0], 6).filter(l => !letters.includes(l)).slice(0, lvl - 1) : [];
      const pool = Kompas.shuffle(letters.concat(extras));
      const covers = Kompas.shuffle(D.COVERS);
      renderPrompt();
      G.body.innerHTML = `<div class="sarang" style="--n:${Math.min(6, Math.max(4, letters.length))}"><div class="hunt"></div><div class="tray"></div></div>`;
      const grid = G.$('.hunt');
      pool.forEach((l, i) => {
        const s = document.createElement('button');
        s.className = 'spot'; s.dataset.l = l;
        s.innerHTML = `<span class="letter">${l.toUpperCase()}<span class="eyes-mini">👀</span></span><span class="cover">${covers[i % covers.length]}</span>`;
        s.onclick = () => peek(s);
        grid.appendChild(s);
      });
      G.say(D.LINES.sarangIntro[0], { speak: false });
      CAudio.speak(intro);
      G.progress(0, letters.length);
    }

    function renderPrompt() {
      const got = letters.length - need.length;
      G.prompt(`<span style="font-size:30px">🥚</span>` + letters.map((l, i) =>
        `<span class="big-letter" style="font-size:30px;opacity:${i < got ? 1 : .25}">${l.toUpperCase()}</span>`).join('') +
        `<button class="say" aria-label="Dengar semula">🔊</button>`);
      G.$('.say').onclick = () => { CAudio.sfx('pop'); CAudio.speak(W.w); };
    }

    function peek(s) {
      if (s.classList.contains('revealed')) return;
      CAudio.unlock();
      s.classList.add('revealed');
      CAudio.sfx('ciluk');
      const l = s.dataset.l;
      const k = need.indexOf(l);
      if (k >= 0) {
        need.splice(k, 1);
        s.classList.add('correct');
        CAudio.speak(CAudio.letterName(l));
        G.fx.stars(s);
        G.timer(() => {
          s.classList.add('gone');
          tray.push(l);
          const t = document.createElement('span');
          t.className = 'tile pop'; t.textContent = l;
          G.$('.tray').appendChild(t);
          renderPrompt();
          G.progress(letters.length - need.length, letters.length);
          if (!need.length) G.timer(weave, 900);
        }, 650);
      } else {
        s.classList.add('wrong');
        CAudio.sfx('boing');
        G.say('Eh, itu huruf ' + l.toUpperCase() + ', kita tak perlukan dia hari ni!');
        G.timer(() => s.classList.remove('revealed', 'wrong'), 1300);
      }
    }

    /* ---------- Fasa 2: Tenun ---------- */
    function weave() {
      G.body.innerHTML = `
        <div class="sarang" style="--n:${Math.max(4, letters.length)}">
          <div class="weave">
            <div class="egg"><span class="ghost">${W.e}</span></div>
            <div class="big-nest"></div>
            <div class="slots">${letters.map(l => `<span class="slot">${lvl >= 3 ? '' : l}</span>`).join('')}</div>
          </div>
          <div class="tray"></div>
        </div>`;
      const trayEl = G.$('.tray');
      Kompas.shuffle(tray).forEach(l => {
        const b = document.createElement('button');
        b.className = 'tile pop'; b.textContent = l; b.dataset.l = l;
        b.onclick = () => place(b);
        trayEl.appendChild(b);
      });
      markNext();
      G.say(D.LINES.weave[0], { speak: false });
      CAudio.speak('Sekarang kita tenun! ' + W.w + '!');
    }

    function markNext() {
      G.body.querySelectorAll('.slot').forEach((s, i) => s.classList.toggle('next', i === slot));
    }

    function place(b) {
      if (b.classList.contains('used')) return;
      const want = letters[slot];
      if (b.dataset.l === want) {
        b.classList.add('used');
        const s = G.body.querySelectorAll('.slot')[slot];
        s.textContent = want; s.classList.add('filled');
        CAudio.sfx('pop');
        CAudio.speak(CAudio.letterName(want));
        Kompas.record('L:' + want, { correct: true, hints: 0, game: 'sarang' });
        slot++;
        markNext();
        G.$('.egg').classList.remove('shake'); void G.$('.egg').offsetWidth; G.$('.egg').classList.add('shake');
        if (slot >= letters.length) G.timer(blend, 700);
      } else {
        mistakes++;
        CAudio.sfx('boing');
        b.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'none' }], { duration: 350 });
        Kompas.record('L:' + want, { correct: false, chosen: b.dataset.l, game: 'sarang' });
        if (mistakes >= 2) {
          hints = 2;
          const right = [...G.body.querySelectorAll('.tray .tile:not(.used)')].find(t => t.dataset.l === want);
          if (right) right.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 600, iterations: 3 });
          G.say('Cari huruf ' + want.toUpperCase() + ' — yang bergoyang tu!');
        } else {
          G.say('Hmm, bukan yang itu. Kita perlukan huruf ' + want.toUpperCase() + '.');
        }
        CAudio.speak('Kita perlukan huruf ' + CAudio.letterName(want));
      }
    }

    /* ---------- Fasa 3: Gabung suku kata + menetas ---------- */
    async function blend() {
      const slots = [...G.body.querySelectorAll('.slot')];
      let k = 0;
      for (const sy of W.syl) {
        const n = sy.length;
        slots.forEach(s => s.classList.remove('lit'));
        slots.slice(k, k + n).forEach(s => s.classList.add('lit'));
        await CAudio.speak(sy, { rate: 0.8 });
        await wait(250);
        if (!G.isActive()) return;
        k += n;
      }
      slots.forEach(s => s.classList.add('lit'));
      await CAudio.speak(W.w + '!', { rate: 0.85 });
      G.say('Jom sebut sama-sama: ' + W.w.toUpperCase() + '!', { speak: false });
      await CAudio.speak('Jom sebut sama-sama! ' + W.w + '!');
      await wait(1100);
      if (G.isActive()) hatch();
    }

    function hatch() {
      const egg = G.$('.egg');
      G.say(D.LINES.hatch[0], { speak: false });
      CAudio.speak('Sarang bergegar... Ciluk... BA!');
      egg.classList.add('shake');
      G.timer(() => egg.classList.add('cracked'), 700);
      G.timer(() => {
        egg.classList.add('hatch');
        G.$('.weave').classList.add('done');
        CAudio.sfx('ciluk');
        G.fx.flash('Ciluk... BA!');
        const h = document.createElement('div'); h.className = 'hatched'; h.textContent = W.e;
        const t = document.createElement('div'); t.className = 'hatched-word'; t.textContent = W.w.toUpperCase();
        G.$('.sarang').append(h, t);
        G.fx.confetti();
        CAudio.sfx('reward');
        G.pip('happy');
        Kompas.record('S:' + W.w, { correct: true, hints: Math.min(3, hints || (mistakes ? 1 : 0)), game: 'sarang' });
        const p = Store.p;
        const first = !p.words.length;
        if (!p.words.includes(W.w)) {
          p.words.push(W.w);
          p.laman[W.w] = { x: 12 + Math.random() * 76, y: 30 + Math.random() * 45 };
        }
        Store.save();
        if (first) Store.milestone('firstWord', 'Perkataan pertama dieja: ' + W.w.toUpperCase(), { word: W.w });
        const line = first ? D.LINES.firstWord[0] : W.w.toUpperCase() + ' dah tinggal di Laman Pip!';
        G.timer(() => { G.say(line, { speak: false }); CAudio.speak(W.w + '! ' + line); }, 900);
        G.timer(() => G.done({ stars: mistakes ? 2 : 3 }), 4200);
      }, 1500);
    }

    hunt();
  }

  const wait = ms => new Promise(r => setTimeout(r, ms));
  window.Games = window.Games || {};
  window.Games.sarang = { start };
})();
