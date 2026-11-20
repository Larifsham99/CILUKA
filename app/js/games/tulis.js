/* Studio Calit Comot — menulis huruf dengan jari (Pelan Produk, Bahagian 13).
   Sistem "Titik Semak": setiap strok ada titik semak berurutan; arah dikesan daripada urutan.
   Toleransi menyesuaikan diri, tangga bantuan 4 tahap, tiada skrin gagal. */
(function () {
  const D = window.CilukaData;
  const REPS = 3;

  function start(G, mission) {
    const L = mission.target in D.STROKES ? mission.target : 'a';
    const tpl = D.STROKES[L];
    const p = Store.p;
    let medium = p.settings.medium || 'pasir';
    const baseGuide = Kompas.zone('W:' + L); // 1 penuh, 2 pudar, 3 titik mula sahaja
    let rep = 0, guide, strokeIdx, nextIdx, hitCount, fails, totalHints, wrongDir, ink, cur, drawing, done, tolBoost;
    let S = 300, dpr = 1, raf = 0, lastTick = 0, lastSand = 0, demo = null;

    G.setWorld('w-studio-' + medium);
    G.prompt(`<span>Tulis</span><span class="big-letter">${L}</span><button class="say" aria-label="Dengar semula">🔊</button>`);
    G.$('.say').onclick = () => { CAudio.sfx('pop'); CAudio.speak('Huruf ' + CAudio.letterName(L)); };

    G.body.innerHTML = `
      <div class="studio">
        <div class="medium-switch">
          <button data-m="pasir">🏖️ Pasir</button>
          <button data-m="cahaya">✨ Cahaya</button>
        </div>
        <div class="canvas-wrap ${medium}"><canvas></canvas><div class="alive"></div></div>
        <div class="studio-tools">
          <button class="round-btn" data-act="demo" aria-label="Tunjuk cara">👻</button>
          <button class="round-btn" data-act="clear" aria-label="Padam">🧽</button>
        </div>
      </div>`;
    const wrap = G.$('.canvas-wrap');
    const cv = G.$('canvas');
    const cx = cv.getContext('2d');
    const aliveEl = G.$('.alive');

    G.body.querySelectorAll('.medium-switch button').forEach(b => {
      b.classList.toggle('on', b.dataset.m === medium);
      b.onclick = () => {
        medium = b.dataset.m; p.settings.medium = medium; Store.save();
        wrap.className = 'canvas-wrap ' + medium; G.setWorld('w-studio-' + medium);
        G.body.querySelectorAll('.medium-switch button').forEach(x => x.classList.toggle('on', x === b));
        CAudio.sfx('pop');
      };
    });
    G.$('[data-act="clear"]').onclick = () => { CAudio.sfx('pop'); resetRep(); };
    G.$('[data-act="demo"]').onclick = () => { CAudio.sfx('pop'); totalHints++; playDemo(); };

    function layout() {
      const body = G.body.getBoundingClientRect();
      S = Math.floor(Math.max(220, Math.min(body.width - 32, body.height - 190, 440)));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = S * dpr; cv.height = S * dpr;
      cv.style.width = S + 'px'; cv.style.height = S + 'px';
      wrap.style.width = S + 'px'; wrap.style.height = S + 'px';
    }
    // template (0..100) → piksel
    const pad = () => S * 0.1, sc = () => S * 0.8 / 100;
    const toPx = ([x, y]) => [pad() + x * sc(), pad() + y * sc()];
    const toTpl = ([x, y]) => [(x - pad()) / sc(), (y - pad()) / sc()];
    const tol = () => S * 0.8 * ((baseGuide === 1 ? 0.13 : baseGuide === 2 ? 0.11 : 0.09) + tolBoost);

    function resetRep() {
      guide = Math.min(3, baseGuide + rep);
      strokeIdx = 0; nextIdx = 0; hitCount = 0; fails = 0; ink = []; cur = null; drawing = false; done = false;
      wrongDir = wrongDir || false; tolBoost = tolBoost || 0;
      aliveEl.innerHTML = ''; aliveEl.className = 'alive';
      cv.style.visibility = 'visible';
    }

    /* ---------------- Lukisan ---------------- */
    function strokePath(pts) {
      cx.beginPath();
      pts.forEach((q, i) => { const [x, y] = toPx(q); i ? cx.lineTo(x, y) : cx.moveTo(x, y); });
    }
    function drawInk(pts, live) {
      if (pts.length < 1) return;
      cx.lineCap = 'round'; cx.lineJoin = 'round';
      const w = S * 0.055;
      const path = () => { cx.beginPath(); pts.forEach(([x, y], i) => i ? cx.lineTo(x, y) : cx.moveTo(x, y)); if (pts.length === 1) cx.lineTo(pts[0][0] + .1, pts[0][1]); };
      if (medium === 'pasir') {
        path(); cx.strokeStyle = 'rgba(255,255,255,.55)'; cx.lineWidth = w; cx.save(); cx.translate(1.5, 2); cx.stroke(); cx.restore();
        path(); cx.strokeStyle = '#b8874a'; cx.lineWidth = w * .82; cx.stroke();
        path(); cx.strokeStyle = 'rgba(120,80,30,.35)'; cx.lineWidth = w * .35; cx.stroke();
      } else {
        cx.save(); cx.shadowColor = live ? '#FFC93C' : '#FF7EB6'; cx.shadowBlur = S * 0.05;
        path(); cx.strokeStyle = live ? '#FFE27A' : '#FFB3D6'; cx.lineWidth = w * .75; cx.stroke();
        cx.restore();
        path(); cx.strokeStyle = '#fff'; cx.lineWidth = w * .25; cx.stroke();
      }
    }

    function frame(t) {
      raf = requestAnimationFrame(frame);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.clearRect(0, 0, S, S);
      const light = medium === 'cahaya';
      // garis asas
      cx.strokeStyle = light ? 'rgba(255,255,255,.08)' : 'rgba(140,100,40,.12)'; cx.lineWidth = 2; cx.setLineDash([]);
      [44, 90].forEach(y => { const yy = toPx([0, y])[1]; cx.beginPath(); cx.moveTo(S * .06, yy); cx.lineTo(S * .94, yy); cx.stroke(); });

      if (!done) {
        // panduan huruf
        tpl.forEach((st, i) => {
          const isDone = i < strokeIdx;
          if (guide <= 2 || isDone) {
            cx.lineCap = 'round'; cx.lineJoin = 'round';
            const a = guide === 1 ? 1 : 0.45;
            strokePath(st);
            cx.strokeStyle = light ? `rgba(155,107,255,${.35 * a})` : `rgba(255,255,255,${.75 * a})`;
            cx.lineWidth = S * 0.11; cx.stroke();
            if (guide === 1) {
              strokePath(st); cx.setLineDash([S * .025, S * .03]);
              cx.strokeStyle = light ? 'rgba(255,255,255,.35)' : 'rgba(120,80,30,.4)'; cx.lineWidth = 3; cx.stroke(); cx.setLineDash([]);
            }
          }
        });
        // jejak yang sudah menyala pada strok semasa
        const st = tpl[strokeIdx];
        if (st && nextIdx > 0 && st.length > 1) {
          strokePath(st.slice(0, nextIdx + 1));
          cx.strokeStyle = 'rgba(255,201,60,.55)'; cx.lineWidth = S * 0.11; cx.lineCap = 'round'; cx.stroke();
        }
        // titik mula + anak panah
        if (st) {
          const [sx, sy] = toPx(st[0]);
          const pulse = 1 + 0.18 * Math.sin(t / 220);
          cx.beginPath(); cx.arc(sx, sy, S * 0.045 * pulse, 0, Math.PI * 2);
          cx.fillStyle = '#9B6BFF'; cx.shadowColor = '#9B6BFF'; cx.shadowBlur = 14; cx.fill(); cx.shadowBlur = 0;
          cx.fillStyle = '#fff'; cx.font = `800 ${Math.round(S * 0.045)}px Baloo 2, sans-serif`; cx.textAlign = 'center'; cx.textBaseline = 'middle';
          cx.fillText(String(strokeIdx + 1), sx, sy + 1);
          if (st.length > 3 && guide <= 2) {
            const [ax, ay] = toPx(st[Math.min(4, st.length - 1)]);
            const ang = Math.atan2(ay - sy, ax - sx);
            const d = S * 0.09;
            cx.save(); cx.translate(sx + Math.cos(ang) * d, sy + Math.sin(ang) * d); cx.rotate(ang);
            cx.beginPath(); cx.moveTo(S * .03, 0); cx.lineTo(-S * .015, -S * .022); cx.lineTo(-S * .015, S * .022); cx.closePath();
            cx.fillStyle = 'rgba(155,107,255,.85)'; cx.fill(); cx.restore();
          }
        }
      }
      ink.forEach(s => drawInk(s, false));
      if (cur) drawInk(cur, true);
      if (demo) {
        const k = Math.min(1, (t - demo.t0) / demo.dur);
        const pts = demo.pts; const i = Math.min(pts.length - 1, Math.floor(k * (pts.length - 1)));
        if (demo.draw) { demo.ink.length = 0; pts.slice(0, i + 1).forEach(q => demo.ink.push(toPx(q))); }
        const [x, y] = toPx(pts[i]);
        cx.beginPath(); cx.arc(x, y, S * 0.05, 0, Math.PI * 2);
        cx.fillStyle = demo.draw ? '#9B6BFF' : 'rgba(255,255,255,.85)'; cx.shadowColor = '#fff'; cx.shadowBlur = 20; cx.fill(); cx.shadowBlur = 0;
        if (k >= 1) { const cb = demo.cb; demo = null; cb && cb(); }
      }
    }

    /* ---------------- Input ---------------- */
    function pos(e) { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    let pointerId = null;

    cv.addEventListener('pointerdown', e => {
      if (done || demo || pointerId !== null) return; // satu jari sahaja (abaikan tapak tangan)
      CAudio.unlock();
      pointerId = e.pointerId; cv.setPointerCapture(e.pointerId);
      const pt = pos(e);
      cur = [pt]; drawing = true;
      const st = tpl[strokeIdx];
      const startPx = toPx(st[0]), endPx = toPx(st[st.length - 1]);
      if (st.length > 3 && dist(pt, startPx) > tol() * 1.3 && dist(pt, endPx) < tol() * 1.3) {
        wrongDir = true;
        drawing = false; // arah terbalik — tunjuk arah betul
        G.say(D.LINES.wrongDir[0]);
        G.pip('think', 1200);
        CAudio.sfx('boing');
      }
      advance(pt);
    });
    cv.addEventListener('pointermove', e => {
      if (e.pointerId !== pointerId || !cur) return;
      const pt = pos(e);
      const last = cur[cur.length - 1];
      if (dist(pt, last) < 2) return;
      cur.push(pt);
      if (medium === 'pasir' && performance.now() - lastSand > 70) { lastSand = performance.now(); CAudio.sfx('sand'); }
      if (drawing) advance(pt);
    });
    const up = e => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      if (!cur) return;
      const st = tpl[strokeIdx];
      const complete = drawing && (st.length === 1 ? nextIdx >= 1 : nextIdx >= st.length - 2 && hitCount / st.length >= 0.6);
      if (complete) {
        ink.push(cur); cur = null; CAudio.sfx('correct');
        nextStroke();
      } else {
        cur = null;
        failStroke();
      }
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);

    function advance(pt) {
      const st = tpl[strokeIdx];
      const look = Math.min(st.length - 1, nextIdx + 3);
      for (let j = look; j >= nextIdx; j--) {
        if (dist(pt, toPx(st[j])) < tol()) {
          hitCount += 1;
          nextIdx = j + 1;
          if (performance.now() - lastTick > 60) { lastTick = performance.now(); CAudio.sfx('tick', Math.min(12, Math.round(nextIdx / st.length * 12))); }
          break;
        }
      }
    }

    function nextStroke() {
      strokeIdx++; nextIdx = 0; hitCount = 0; fails = 0;
      if (strokeIdx >= tpl.length) letterDone();
    }

    function failStroke() {
      fails++; nextIdx = 0; hitCount = 0;
      if (fails === 1) { G.say(pick(D.LINES.writeStart)); }
      else if (fails === 2) { totalHints++; tolBoost = Math.min(0.06, tolBoost + 0.03); G.say('Tengok Comot tunjuk!'); playDemo(); }
      else { totalHints += 2; G.say(D.LINES.writeAssist[0]); assist(); }
    }

    function playDemo() {
      const st = tpl[strokeIdx]; if (!st) return;
      demo = { pts: st.length === 1 ? [st[0], st[0]] : st, t0: performance.now(), dur: 1100, draw: false };
    }
    function assist() {
      const st = tpl[strokeIdx];
      const arr = [];
      ink.push(arr);
      demo = { pts: st.length === 1 ? [st[0], st[0]] : st, t0: performance.now(), dur: 1200, draw: true, ink: arr, cb: () => { CAudio.sfx('correct'); nextStroke(); } };
    }

    /* ---------------- Huruf hidup ---------------- */
    function letterDone() {
      done = true;
      const stars = totalHints === 0 && !wrongDir ? 3 : totalHints <= 1 ? 2 : 1;
      Kompas.record('W:' + L, { correct: true, hints: Math.min(3, totalHints), game: 'tulis' });
      if (rep === 0) Kompas.record('L:' + L, { correct: true, hints: 1, game: 'tulis' });

      const strokes = ink.map(s => s.filter((_, i) => i % 2 === 0 || i === s.length - 1).map(q => toTpl(q).map(v => Math.round(v))));
      const w = p.writings[L] || (p.writings[L] = { count: 0 });
      const rec = { strokes, date: Date.now() };
      if (!w.first) w.first = rec;
      w.latest = rec; w.count++;
      Store.save();
      Store.milestone('firstWrite', 'Tulisan pertama: huruf ' + L, { letter: L });

      cv.style.visibility = 'hidden';
      aliveEl.innerHTML = aliveSVG(strokes);
      CAudio.sfx('ciluk');
      G.fx.flash('Ciluk... BA!');
      G.fx.stars(wrap);
      G.pip('happy');
      G.say(D.LINES.writeDone[0], { speak: false });
      CAudio.speak('Tengok! Huruf ' + CAudio.letterName(L) + ' dah bangun!');
      rep++;
      G.progress(rep, REPS);
      G.timer(() => {
        aliveEl.classList.add('walk');
        G.timer(() => {
          if (rep >= REPS) {
            G.fx.confetti(); CAudio.sfx('reward');
            G.say('Huruf ' + L + ' dah pindah ke Kampung Huruf!');
            G.timer(() => G.done({ stars }), 1800);
          } else {
            resetRep();
            G.say(rep === 1 ? 'Sekali lagi! Kali ni panduan makin sikit.' : 'Last sekali! Kamu boleh!');
          }
        }, 1500);
      }, 2200);
    }

    function aliveSVG(strokes) {
      let minX = 100, minY = 100, maxX = 0, maxY = 0;
      strokes.flat().forEach(([x, y]) => { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); });
      const cxm = (minX + maxX) / 2;
      const d = strokes.map(s => s.length === 1 ? `M${s[0][0]} ${s[0][1]}h0.1` : 'M' + s.map(q => q.join(' ')).join(' L')).join(' ');
      const col = medium === 'pasir' ? '#9B6BFF' : '#FFE27A';
      const eyeY = Math.max(6, minY - 2), fy = maxY + 4;
      return `<svg viewBox="-12 -12 124 124">
        <g class="alive-body">
          <path d="${d}" fill="none" stroke="rgba(0,0,0,.15)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" transform="translate(1.5 2.5)"/>
          <path d="${d}" fill="none" stroke="${col}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
          <g transform="translate(${cxm} ${eyeY})">
            <ellipse cx="-6" cy="0" rx="5" ry="6" fill="#fff" stroke="#3B2A4D" stroke-width="1.2"/><circle cx="-5" cy="1" r="2.6" fill="#3B2A4D"/>
            <ellipse cx="6" cy="0" rx="5" ry="6" fill="#fff" stroke="#3B2A4D" stroke-width="1.2"/><circle cx="7" cy="1" r="2.6" fill="#3B2A4D"/>
          </g>
          <path d="M${cxm - 8} ${fy} l-4 6 h6 M${cxm + 8} ${fy} l4 6 h-6" stroke="#FF9F6B" stroke-width="3" fill="none" stroke-linecap="round"/>
        </g></svg>`;
    }

    layout();
    resetRep();
    totalHints = 0; wrongDir = false; tolBoost = 0;
    G.progress(0, REPS);
    raf = requestAnimationFrame(frame);
    G.say(pick(D.LINES.writeStart), { speak: false });
    CAudio.speak('Jom tulis huruf ' + CAudio.letterName(L) + '! Mula dari titik bersinar.');
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    G.onExit(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); });
  }

  const pick = a => a[Math.floor(Math.random() * a.length)];
  window.Games = window.Games || {};
  window.Games.tulis = { start };
})();
