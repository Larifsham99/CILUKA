/* Storan setempat CILUKA — semua data anak kekal dalam peranti (Pelan Produk, Bahagian 21). */
(function () {
  const KEY = 'ciluka.v0';
  const today = () => new Date().toISOString().slice(0, 10);

  function blankProfile() {
    return {
      name: 'Kawan Hebat',
      created: Date.now(),
      lastOpen: 0,
      days: [],            // tarikh-tarikh bermain (Kebun Rajin)
      items: {},           // Kompas Pip: 'L:a' kenal huruf, 'W:a' tulis huruf, 'S:bola' eja perkataan
      avgMs: 2500,         // purata masa jawab anak ini sendiri
      words: [],           // perkataan yang telah ditetaskan (Kata Jadi Benda)
      laman: {},           // kedudukan objek di Laman Pip
      writings: {},        // Buku Hebat: tulisan pertama & terkini
      milestones: [],
      missions: null,
      session: { date: '', usedMs: 0 },
      settings: { sessionMin: 10, voice: true, sfx: true }
    };
  }

  let state;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : null;
    } catch (e) { state = null; }
    if (!state || !state.profile) state = { v: 0, profile: blankProfile() };
    const def = blankProfile();
    for (const k in def) if (!(k in state.profile)) state.profile[k] = def[k];
    return state;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storan penuh/disekat — teruskan tanpa simpan */ }
  }

  function reset() {
    state = { v: 0, profile: blankProfile() };
    save();
  }

  function exportData() { return JSON.stringify(state); }
  function importData(text) {
    const obj = JSON.parse(text);
    if (!obj || !obj.profile) throw new Error('Fail sandaran tidak sah');
    state = obj; save();
  }

  // Minta storan berterusan supaya pelayar kurang cenderung memadam data
  if (navigator.storage && navigator.storage.persist) { navigator.storage.persist().catch(() => { }); }

  load();
  window.Store = {
    get p() { return state.profile; },
    save, reset, today, exportData, importData,
    milestone(type, text, extra) {
      const p = state.profile;
      if (p.milestones.some(m => m.type === type)) return false;
      p.milestones.push(Object.assign({ type, text, date: Date.now() }, extra || {}));
      save();
      return true;
    }
  };
})();
