/* CILUKA — pengawal utama: Laman Pip, laluan skrin, sesi sihat, kesan visual. */
(function () {
  const D = window.CilukaData;
  const $ = s => document.querySelector(s);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const p = () => Store.p;

  CAudio.settings.voice = p().settings.voice;
  CAudio.settings.sfx = p().settings.sfx;

  /* ---------------- Skrin ---------------- */
  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  }

  /* ---------------- Kesan visual ---------------- */
  const fxEl = $('#fx');
  const FX = {
    confetti() {
      const cols = ['#FFC93C', '#FF7EB6', '#2EC4B6', '#9B6BFF', '#9BDE4A', '#FF9F6B'];
      for (let i = 0; i < 36; i++) {
        const c = document.createElement('i');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + '%';
        c.style.background = cols[i % cols.length];
        c.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
        c.style.animationDelay = Math.random() * .3 + 's';
        fxEl.appendChild(c);
        setTimeout(() => c.remove(), 3400);
      }
    },
    stars(target) {
      const r = target.getBoundingClientRect(), a = $('#app').getBoundingClientRect();
      const x = r.left - a.left + r.width / 2, y = r.top - a.top + r.height / 2;
      for (let i = 0; i < 6; i++) {
        const s = document.createElement('span');
        s.className = 'star-burst'; s.textContent = '⭐';
        const ang = i / 6 * Math.PI * 2;
        s.style.left = x + 'px'; s.style.top = y + 'px';
        s.style.setProperty('--dx', Math.cos(ang) * 80 + 'px'); s.style.setProperty('--dy', Math.sin(ang) * 80 + 'px');
        fxEl.appendChild(s);
        setTimeout(() => s.remove(), 1000);
      }
    },
    flash(text) {
      const f = document.createElement('div');
      f.className = 'ciluk-flash'; f.textContent = text;
      fxEl.appendChild(f);
      setTimeout(() => f.remove(), 1200);
    }
  };

  /* ---------------- Gelembung cakap ---------------- */
  function bubble(el, text, opts = {}) {
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), opts.ms || Math.max(2600, text.length * 75));
    if (opts.speak !== false) CAudio.speak(text);
  }

  /* ---------------- Laman Pip (home) ---------------- */
  const homePip = Pip.mount($('#homePip'));
  let homeIdle = null;

  function skyMode() {
    const h = new Date().getHours();
    $('#home').classList.toggle('evening', h >= 17 && h < 19);
    $('#home').classList.toggle('night', h >= 19 || h < 6);
    return h;
  }

  function renderLaman() {
    const lam = $('#laman');
    lam.innerHTML = '';
    const words = p().words;
    if (!words.length) {
      lam.innerHTML = '<div class="laman-empty">Perkataan yang kamu eja akan tumbuh di sini 🌱</div>';
      return;
    }
    words.forEach(w => {
      const data = D.WORDS.find(x => x.w === w); if (!data) return;
      const pos = p().laman[w] || { x: 50, y: 50 };
      const b = document.createElement('button');
      b.className = 'laman-item'; b.textContent = data.e;
      b.style.left = pos.x + '%'; b.style.top = pos.y + '%';
      b.style.animationDelay = -Math.random() * 4 + 's';
      b.setAttribute('aria-label', w);
      b.onclick = () => {
        CAudio.unlock(); CAudio.sfx('pop');
        b.classList.remove('boing'); void b.offsetWidth; b.classList.add('boing');
        CAudio.speak(w); // ulang kaji perbendaharaan kata yang tersembunyi
      };
      lam.appendChild(b);
    });
  }

  function renderBalloons() {
    const m = Kompas.missions();
    const wrap = $('#balloons');
    wrap.innerHTML = '';
    const nextIdx = m.list.findIndex(x => !x.done);
    m.list.forEach((mi, i) => {
      const b = document.createElement('button');
      b.className = 'balloon' + (mi.done ? ' done' : '') + (i === nextIdx ? ' next' : '');
      b.innerHTML = `${mi.icon}<span class="string"></span>`;
      b.setAttribute('aria-label', mi.label);
      b.onclick = () => {
        CAudio.unlock(); CAudio.sfx('pop');
        if (mi.done) { bubble($('#homeBubble'), 'Misi ni dah siap! Hebat!'); return; }
        startGame(mi, i);
      };
      wrap.appendChild(b);
    });
    $('#gardenCount').textContent = p().days.length;
    return nextIdx;
  }

  function greet() {
    const pr = p();
    const h = skyMode();
    let line;
    if (!pr.lastOpen) line = D.LINES.first[0];
    else if (Date.now() - pr.lastOpen > 3 * 86400000) line = D.LINES.back[0];
    else if (h >= 19 || h < 6) line = D.LINES.night[0];
    else line = pick(h < 12 ? D.LINES.morning : D.LINES.afternoon);
    if (Kompas.missions().list.every(x => x.done)) line = D.LINES.allDone[0];
    pr.lastOpen = Date.now(); Store.save();
    Pip.act(homePip, 'peek', 1000);
    setTimeout(() => { Pip.act(homePip, 'wave', 2200); bubble($('#homeBubble'), line, { speak: false }); }, 600);
    return line;
  }

  function goHome() {
    exitGame();
    show('home');
    skyMode();
    renderLaman();
    const nextIdx = renderBalloons();
    clearTimeout(homeIdle);
    homeIdle = setTimeout(() => {
      if (nextIdx >= 0 && $('#home').classList.contains('active')) bubble($('#homeBubble'), pick(D.LINES.pointBalloon));
    }, 9000);
  }

  homePip.onclick = () => { CAudio.unlock(); Pip.act(homePip, 'happy', 1000); bubble($('#homeBubble'), pick(D.LINES.tickle)); };
  homePip.style.pointerEvents = 'auto';

  document.querySelectorAll('.island.open').forEach(b => b.onclick = () => {
    CAudio.unlock(); CAudio.sfx('pop');
    if (b.dataset.island === 'kampung') startGame({ type: 'ciluk', target: Kompas.pickLetter('review') }, -1);
    else startGame({ type: 'tulis', target: Kompas.pickWriteLetter() }, -1);
  });
  document.querySelectorAll('.island.locked').forEach(b => b.onclick = () => {
    CAudio.sfx('boing'); bubble($('#homeBubble'), 'Pulau tu masih diselubungi awan. Nanti kita buka sama-sama!');
  });
  $('#garden').onclick = () => {
    CAudio.unlock(); CAudio.sfx('pop');
    bubble($('#homeBubble'), `Kebun Rajin kita ada ${p().days.length} bunga! Satu bunga untuk setiap hari kamu main.`);
  };

  /* ---------------- Permainan ---------------- */
  const gamePip = Pip.mount(document.createElement('div'));
  const gameBubble = document.createElement('div'); gameBubble.className = 'bubble';
  $('#gamePip').append(gameBubble, gamePip);
  let current = null; // { timers, exits, mission, index, t0 }

  function makeAPI(ctx) {
    const body = $('#gameBody');
    return {
      body,
      $: s => $('#game').querySelector(s),
      prompt: html => { $('#prompt').innerHTML = html; },
      progress: (n, total) => { $('#progress').innerHTML = Array.from({ length: total }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join(''); },
      say: (text, opts) => bubble(gameBubble, text, opts),
      pip: (cls, ms) => Pip.act(gamePip, cls, ms || 1200),
      fx: FX,
      setWorld: cls => { $('#game').className = 'screen active ' + cls; },
      timer: (fn, ms) => { const t = setTimeout(() => { if (current === ctx) fn(); }, ms); ctx.timers.push(t); return t; },
      onExit: fn => ctx.exits.push(fn),
      isActive: () => current === ctx,
      done: res => finishGame(ctx, res)
    };
  }

  function startGame(mission, index) {
    exitGame();
    clearTimeout(homeIdle);
    const ctx = { timers: [], exits: [], mission, index, t0: Date.now() };
    current = ctx;
    $('#gameBody').innerHTML = ''; $('#prompt').innerHTML = ''; $('#progress').innerHTML = '';
    show('game');
    Pip.act(gamePip, 'peek', 1000);
    requestAnimationFrame(() => Games[mission.type].start(makeAPI(ctx), mission));
  }

  function exitGame() {
    if (!current) return;
    const ctx = current;
    current = null;
    ctx.timers.forEach(clearTimeout);
    ctx.exits.forEach(fn => { try { fn(); } catch (e) { } });
    addSessionTime(Date.now() - ctx.t0);
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }

  function finishGame(ctx, res) {
    if (current !== ctx) return;
    const pr = p();
    if (ctx.index >= 0 && pr.missions && pr.missions.list[ctx.index]) pr.missions.list[ctx.index].done = true;
    const t = Store.today();
    if (!pr.days.includes(t)) pr.days.push(t);
    Store.save();
    exitGame();
    const all = pr.missions && pr.missions.list.every(x => x.done);
    if (sessionOver() || (all && ctx.index >= 0)) restScreen(all);
    else goHome();
  }

  $('#backBtn').onclick = () => { CAudio.sfx('pop'); goHome(); };

  /* ---------------- Masa skrin sihat ---------------- */
  function addSessionTime(ms) {
    const s = p().session, t = Store.today();
    if (s.date !== t) { s.date = t; s.usedMs = 0; }
    s.usedMs += ms; Store.save();
  }
  function sessionOver() {
    const lim = p().settings.sessionMin;
    const s = p().session;
    return lim > 0 && s.date === Store.today() && s.usedMs >= lim * 60000;
  }

  const restPip = Pip.mount($('#restPip'));
  function restScreen(allDone) {
    show('rest');
    Pip.act(restPip, 'sleep');
    const L = Kompas.pickLetter('new');
    $('#restMission').innerHTML = '🏡 <b>Misi Rumah:</b> ' + pick(D.OFFLINE).replace(/\{L\}/g, L.toUpperCase());
    CAudio.speak((allDone ? 'Tiga-tiga misi siap! ' : '') + D.LINES.rest[0]);
  }
  holdButton($('#restContinue'), () => {
    p().session.usedMs = 0;
    if (p().missions.list.every(x => x.done)) Kompas.missions(true);
    Store.save();
    goHome();
  });

  /* ---------------- Pintu ibu bapa (sentuh & tahan) ---------------- */
  function holdButton(el, fn) {
    let t = null;
    const startHold = e => { e.preventDefault(); el.classList.add('holding'); t = setTimeout(() => { el.classList.remove('holding'); fn(); }, 2000); };
    const stopHold = () => { el.classList.remove('holding'); clearTimeout(t); };
    el.addEventListener('pointerdown', startHold);
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => el.addEventListener(ev, stopHold));
    el.addEventListener('contextmenu', e => e.preventDefault());
  }
  holdButton($('#parentLock'), () => {
    const a = 3 + Math.floor(Math.random() * 6), b = 4 + Math.floor(Math.random() * 5);
    const g = document.createElement('div');
    g.className = 'gate';
    g.innerHTML = `<form class="gate-card"><label for="gateAns">Untuk ibu bapa: berapakah ${a} + ${b}?</label>
      <input id="gateAns" type="number" inputmode="numeric" autocomplete="off">
      <div class="gate-row"><button type="button" class="p-btn" data-x>Batal</button><button class="p-btn go">Masuk</button></div>
      <p class="gate-err" hidden>Jawapan belum betul. Cuba lagi.</p></form>`;
    $('#app').appendChild(g);
    const f = g.querySelector('form'), inp = g.querySelector('input');
    setTimeout(() => inp.focus(), 50);
    g.querySelector('[data-x]').onclick = () => g.remove();
    f.onsubmit = e => {
      e.preventDefault();
      if (+inp.value === a + b) { g.remove(); Parent.render($('#parentBody')); show('parent'); }
      else { g.querySelector('.gate-err').hidden = false; inp.value = ''; }
    };
  });
  $('#parentClose').onclick = () => goHome();

  /* ---------------- Mula ---------------- */
  goHome();
  const greeting = greet();
  // Pelayar hanya membenarkan suara selepas sentuhan pertama
  document.addEventListener('pointerdown', () => { CAudio.unlock(); if ($('#home').classList.contains('active')) CAudio.speak(greeting); }, { once: true, capture: true });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => { });
  }
  window.CilukaApp = { goHome, startGame };
})();
