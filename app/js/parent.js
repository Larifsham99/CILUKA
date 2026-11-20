/* Ruang Ibu Bapa — ringkasan, peta huruf, Buku Hebat (Dulu & Sekarang), tetapan, sandaran. */
(function () {
  const D = window.CilukaData;

  function strokesToPath(strokes) {
    return strokes.map(s => s.length === 1 ? `M${s[0][0]} ${s[0][1]}h0.1` : 'M' + s.map(q => q.join(' ')).join(' L')).join(' ');
  }
  function fmtDate(t) { return new Date(t).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' }); }

  function render(el) {
    const p = Store.p;
    const st = l => Kompas.status('L:' + l);
    const known = D.LETTER_ORDER.filter(l => st(l) >= 1);
    const strong = D.LETTER_ORDER.filter(l => st(l) === 2);
    const learning = D.LETTER_ORDER.filter(l => st(l) === 1);
    const confused = D.LETTER_ORDER.filter(l => Kompas.confusedWith(l).length).map(l => l + '–' + Kompas.confusedWith(l).join('/'));
    const written = Object.keys(p.writings);
    const name = escapeHTML(p.name);
    const week = p.days.filter(d => Date.now() - new Date(d).getTime() < 7 * 86400000).length;
    const avgMin = p.session.date ? Math.round(p.session.usedMs / 60000) : 0;

    let surat;
    if (!known.length && !p.words.length) {
      surat = `<p>${name} baru bermula. Selepas beberapa permainan, Pip akan menulis laporan di sini.</p>`;
    } else {
      surat = `<p>Minggu ini ${name} bermain <b>${week} hari</b>. Hari ini: <b>${avgMin} minit</b>.</p>
        <p>🌟 ${name} sudah bertemu <b>${known.length} daripada 26 huruf</b>${strong.length ? `, dan sudah kuat dengan huruf <b>${strong.join(', ')}</b>` : ''}.</p>
        ${learning.length ? `<p>🌱 Masih belajar: <b>${learning.join(', ')}</b>.</p>` : ''}
        ${confused.length ? `<p>🔁 Kadang-kadang tertukar: <b>${confused.join(', ')}</b>. Ini sangat biasa! Pip akan ulang kaji melalui permainan berbeza.</p>` : ''}
        <p>✍️ Huruf yang pernah ditulis: <b>${written.length ? written.join(', ') : '—'}</b>.</p>
        <p>🐣 Perkataan yang dieja: <b>${p.words.length ? p.words.map(w => w.toUpperCase()).join(', ') : '—'}</b>.</p>
        ${learning[0] ? `<p>💡 <b>Cara bantu di rumah:</b> cari 3 benda yang bermula dengan huruf <b>${learning[0]}</b> bersama ${name}.</p>` : ''}`;
    }

    el.innerHTML = `
      <div class="card"><h2>🐣 Surat Pip</h2>${surat}</div>

      <div class="card"><h2>🔤 Peta Huruf</h2>
        <div class="letter-grid">${D.LETTER_ORDER.slice().sort().map(l => `<div class="lg s${st(l)} ${Kompas.confusedWith(l).length ? 'conf' : ''}">${l}</div>`).join('')}</div>
        <div class="legend"><span style="--c:#d9f5bd">Kuat</span><span style="--c:#fff1c2">Sedang belajar</span><span style="--c:#f1ece4">Belum</span><span style="--c:#fff;box-shadow:inset 0 0 0 2px #FF7EB6">Tertukar</span></div>
      </div>

      <div class="card"><h2>📖 Buku Hebat — Dulu &amp; Sekarang</h2>
        ${written.length ? `<div class="writings">${written.map(l => {
          const w = p.writings[l];
          const cell = (rec, label) => `<div class="writing"><svg viewBox="-8 -8 116 116"><path d="${strokesToPath(rec.strokes)}" fill="none" stroke="#9B6BFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:0"/></svg>${label} · ${fmtDate(rec.date)}<br><button data-replay>▶ ulang</button></div>`;
          return cell(w.first, l + ' pertama') + (w.count > 1 ? cell(w.latest, l + ' terkini') : '');
        }).join('')}</div>` : '<p class="p-note">Tulisan pertama anak akan disimpan di sini secara automatik.</p>'}
        ${p.milestones.length ? `<p style="margin-top:12px"><b>Detik penting:</b></p>${p.milestones.map(m => `<p>⭐ ${escapeHTML(m.text)} <span class="p-note">(${fmtDate(m.date)})</span></p>`).join('')}` : ''}
      </div>

      <div class="card"><h2>⚙️ Tetapan</h2>
        <div class="p-row"><label for="pName">Nama panggilan</label><input id="pName" maxlength="20" value="${name}"></div>
        <div class="p-row"><label for="pSess">Panjang sesi</label>
          <select id="pSess">${[5, 10, 15, 0].map(m => `<option value="${m}" ${p.settings.sessionMin === m ? 'selected' : ''}>${m ? m + ' minit' : 'Tiada had'}</option>`).join('')}</select></div>
        <div class="p-row"><label for="pVoice">Suara</label><input type="checkbox" id="pVoice" ${p.settings.voice ? 'checked' : ''}></div>
        <div class="p-row"><label for="pSfx">Kesan bunyi</label><input type="checkbox" id="pSfx" ${p.settings.sfx ? 'checked' : ''}></div>
        <p class="p-note">Prototaip: suara menggunakan suara sintetik peranti. Versi sebenar akan menggunakan rakaman suara manusia.</p>
      </div>

      <div class="card"><h2>💾 Data &amp; Privasi</h2>
        <p class="p-note">Semua data anak disimpan dalam peranti ini sahaja. Tiada apa-apa dihantar ke internet.</p>
        <div class="p-row"><button class="p-btn" id="pExport">Simpan sandaran</button><label class="p-btn" for="pImport">Pulihkan</label><input type="file" id="pImport" accept="application/json" hidden></div>
        <div class="p-row"><button class="p-btn danger" id="pReset">Padam semua kemajuan</button></div>
      </div>`;

    el.querySelector('#pName').onchange = e => { p.name = e.target.value.trim() || 'Kawan Hebat'; Store.save(); };
    el.querySelector('#pSess').onchange = e => { p.settings.sessionMin = +e.target.value; Store.save(); };
    el.querySelector('#pVoice').onchange = e => { p.settings.voice = e.target.checked; CAudio.settings.voice = e.target.checked; Store.save(); };
    el.querySelector('#pSfx').onchange = e => { p.settings.sfx = e.target.checked; CAudio.settings.sfx = e.target.checked; Store.save(); };
    el.querySelector('#pExport').onclick = () => {
      const blob = new Blob([Store.exportData()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'ciluka-sandaran-' + Store.today() + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    };
    el.querySelector('#pImport').onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(t => { try { Store.importData(t); alert('Sandaran dipulihkan!'); location.reload(); } catch (err) { alert('Fail sandaran tidak sah.'); } });
    };
    el.querySelector('#pReset').onclick = () => {
      if (confirm('Padam semua kemajuan, tulisan dan perkataan? Tindakan ini tidak boleh dibatalkan.')) { Store.reset(); location.reload(); }
    };
    el.querySelectorAll('[data-replay]').forEach(b => b.onclick = () => {
      const path = b.closest('.writing').querySelector('path');
      path.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1600, easing: 'ease-in-out' });
    });
  }

  function escapeHTML(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  window.Parent = { render };
})();
