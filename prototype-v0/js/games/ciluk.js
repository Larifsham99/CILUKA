/* Mini game #1 — Ciluk-BA Huruf (Kampung Huruf).
   Huruf bersembunyi di belakang objek. Anak mengintai untuk mencari huruf sasaran. */
(function () {
  const D = window.CilukaData;

  function start(G, mission) {
    const target = mission.target;
    const others = Kompas.unlockedLetters().filter(l => l !== target);
    // 5 pusingan: 3 untuk huruf sasaran, 2 ulang kaji huruf lain (jika ada)
    const rounds = [target, others[0] || target, target, others[1] || target, target];
    if (mission.review && mission.review !== target) rounds[1] = mission.review;
    let r = 0, wrongs = 0, hints = 0, t0 = 0, idleT = null, busy = false;

    G.setWorld('w-kampung');

    const isNew = !(Store.p.items['L:' + target] || {}).seen;

    function round() {
      const goal = rounds[r];
      wrongs = 0; hints = 0; busy = false;
      const lvl = Kompas.zone('L:' + goal);
      const n = [4, 6, 9][lvl - 1];
      const letters = Kompas.shuffle([goal].concat(Kompas.distractors(goal, n - 1)));
      const covers = Kompas.shuffle(D.COVERS);

      G.prompt(`<span>Cari</span><span class="big-letter">${goal}</span><button class="say" aria-label="Dengar semula">🔊</button>`);
      const grid = document.createElement('div');
      grid.className = 'hide-grid n' + n;
      letters.forEach((l, i) => {
        const s = document.createElement('button');
        s.className = 'spot';
        s.dataset.l = l;
        s.setAttribute('aria-label', 'Tempat sorok');
        s.innerHTML = `<span class="letter">${l}<span class="eyes-mini">👀</span></span><span class="cover">${covers[i % covers.length]}</span>`;
        s.addEventListener('click', () => tap(s, goal));
        grid.appendChild(s);
      });
      G.body.innerHTML = '';
      G.body.appendChild(grid);
      G.progress(r, rounds.length);

      const ask = () => CAudio.speak('Cari huruf ' + CAudio.letterName(goal) + '!');
      G.$('.say').onclick = (e) => { e.stopPropagation(); CAudio.sfx('pop'); ask(); };
      if (r === 0 && isNew) {
        G.say('Ciluk-BA! Huruf ' + goal + ' sedang bersembunyi. Jom cari!', { speak: false });
      }
      ask();
      t0 = performance.now();
      armIdle(goal);
    }

    function armIdle(goal) {
      clearTimeout(idleT);
      idleT = G.timer(() => {
        hints = Math.max(hints, 1);
        G.say(D.LINES.idle[0]);
        const s = G.body.querySelector(`.spot[data-l="${goal}"]:not(.revealed)`);
        if (s) s.classList.add('hint');
      }, 9000);
    }

    function tap(s, goal) {
      if (busy || s.classList.contains('revealed')) return;
      CAudio.unlock();
      s.classList.add('revealed');
      CAudio.sfx('ciluk');
      const l = s.dataset.l;
      const ms = performance.now() - t0;
      if (l === goal) {
        busy = true;
        clearTimeout(idleT);
        s.classList.add('correct');
        Kompas.record('L:' + goal, { correct: true, hints, ms, game: 'ciluk' });
        G.fx.flash('Ciluk... BA!');
        G.fx.stars(s);
        G.pip('happy');
        const line = wrongs ? D.LINES.correctAfterTry[0] : pick(D.LINES.correct);
        G.say(line, { speak: false });
        CAudio.speak(line + ' Huruf ' + CAudio.letterName(goal) + '!');
        if (Store.milestone('firstLetter', 'Huruf pertama dijumpai: ' + goal, { letter: goal })) { }
        r++;
        G.progress(r, rounds.length);
        G.timer(() => {
          if (r >= rounds.length) finish(); else round();
        }, 1700);
      } else {
        wrongs++;
        s.classList.add('wrong');
        CAudio.sfx('boing');
        Kompas.record('L:' + goal, { correct: false, chosen: l, game: 'ciluk' });
        if (wrongs === 1) G.say(pick(D.LINES.wrong1), { speak: false });
        CAudio.speak('Ini huruf ' + CAudio.letterName(l) + '.');
        if (wrongs >= 2) {
          hints = 2;
          G.say(D.LINES.wrong2[0]);
          const c = G.body.querySelector(`.spot[data-l="${goal}"]:not(.revealed)`);
          if (c) c.classList.add('hint');
        }
        G.pip('think', 1200);
        G.timer(() => { s.classList.remove('revealed', 'wrong'); }, 1200);
        armIdle(goal);
      }
    }

    function finish() {
      G.fx.confetti();
      CAudio.sfx('reward');
      G.say('Hebat! Semua huruf dah jumpa!');
      G.timer(() => G.done({ stars: 3 }), 1800);
    }

    round();
  }

  const pick = a => a[Math.floor(Math.random() * a.length)];
  window.Games = window.Games || {};
  window.Games.ciluk = { start };
})();
