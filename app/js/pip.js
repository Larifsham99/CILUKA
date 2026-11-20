/* Pip — anak burung tempua ajaib bertopi anyaman (SVG asli). */
(function () {
  let uid = 0;

  function svg() {
    const id = 'p' + (uid++);
    return `
<svg viewBox="0 0 120 132" role="img" aria-label="Pip">
  <defs>
    <radialGradient id="${id}b" cx="40%" cy="35%" r="70%">
      <stop offset="0" stop-color="#FFE27A"/>
      <stop offset=".6" stop-color="#FFC93C"/>
      <stop offset="1" stop-color="#FF9F6B"/>
    </radialGradient>
    <linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5FE0D3"/>
      <stop offset="1" stop-color="#1FA89C"/>
    </linearGradient>
    <pattern id="${id}w" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="8" height="8" fill="url(#${id}h)"/>
      <rect width="4" height="8" fill="rgba(255,255,255,.18)"/>
      <rect y="0" width="8" height="1.2" fill="rgba(0,0,0,.12)"/>
    </pattern>
  </defs>
  <ellipse cx="60" cy="126" rx="34" ry="5" fill="rgba(0,0,0,.14)"/>
  <g class="pip-body">
    <path class="tail" d="M92 104 q20 -2 22 -18 q-10 6 -18 4" fill="#9BDE4A" stroke="#6CB83A" stroke-width="2"/>
    <g class="wing-l"><ellipse cx="24" cy="92" rx="10" ry="17" fill="#FF9F6B" transform="rotate(20 24 92)"/></g>
    <g class="wing-r"><ellipse cx="96" cy="92" rx="10" ry="17" fill="#FF9F6B" transform="rotate(-20 96 92)"/></g>
    <circle cx="60" cy="86" r="38" fill="url(#${id}b)"/>
    <ellipse cx="60" cy="100" rx="22" ry="17" fill="#FFF3C9" opacity=".85"/>
    <path d="M44 124 l-4 6 M44 124 l0 7 M44 124 l4 6 M76 124 l-4 6 M76 124 l0 7 M76 124 l4 6" stroke="#FF9F6B" stroke-width="3" stroke-linecap="round"/>
    <g class="eyes">
      <ellipse cx="46" cy="78" rx="9" ry="11" fill="#fff"/>
      <ellipse cx="74" cy="78" rx="9" ry="11" fill="#fff"/>
      <circle cx="48" cy="80" r="6" fill="#3B2A4D"/>
      <circle cx="72" cy="80" r="6" fill="#3B2A4D"/>
      <circle cx="50" cy="77" r="2.2" fill="#fff"/>
      <circle cx="74" cy="77" r="2.2" fill="#fff"/>
    </g>
    <path class="brow" d="M38 64 q8 -5 15 -1 M67 63 q7 -4 15 1" stroke="#3B2A4D" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M55 89 l5 7 l5 -7 z" fill="#FF7A3D" stroke="#E5602A" stroke-width="1.5" stroke-linejoin="round"/>
    <ellipse cx="36" cy="94" rx="6" ry="4" fill="#FF7EB6" opacity=".55"/>
    <ellipse cx="84" cy="94" rx="6" ry="4" fill="#FF7EB6" opacity=".55"/>
    <path d="M24 60 Q60 -6 96 60 Q60 48 24 60 z" fill="url(#${id}w)" stroke="#178C82" stroke-width="2" stroke-linejoin="round"/>
    <path d="M26 59 Q60 47 94 59" stroke="#FFC93C" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path class="curl" d="M60 13 q4 -12 16 -8 q10 5 2 13 q-6 4 -8 -2" stroke="#1FA89C" stroke-width="3.2" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
  }

  function mount(el) {
    el.classList.add('pip');
    el.innerHTML = svg();
    return el;
  }

  function act(el, cls, ms) {
    if (!el) return;
    ['happy', 'think', 'wave', 'peek', 'sleep'].forEach(c => el.classList.remove(c));
    void el.offsetWidth;
    el.classList.add(cls);
    if (ms) setTimeout(() => el.classList.remove(cls), ms);
  }

  window.Pip = { mount, act };
})();
