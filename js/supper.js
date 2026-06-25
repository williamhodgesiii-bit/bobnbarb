/* =========================================================
   THE SUPPER CLUB — interactivity for supper-club.html
   Tasting menu, cellar list, and the reservation calendar.
   ========================================================= */
(() => {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* ---------- THE TASTING (edit me) ----------
     Seven courses, grounded in Mississippi — Gulf, Delta, sorghum, bourbon. */
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  const TASTING = [
    { n: 'Gulf Oysters',          d: 'Champagne mignonette, finger lime, cucumber ice.' },
    { n: 'Smoked Deviled Egg',    d: 'Trout roe, pickled mustard seed, smoked paprika oil.' },
    { n: 'Brisket Tartare',       d: 'Hand-cut prime point, charred shallot, cured yolk, potato crisp.' },
    { n: 'Delta Catfish',         d: 'Brown butter, capers, Meyer lemon, toasted pecan.' },
    { n: 'Pit-Roasted Quail',     d: 'Sorghum glaze, bourbon cornbread, collard purée.' },
    { n: 'Dry-Aged Beef Rib',     d: 'A single oak-roasted rib, bone-marrow jus.' },
    { n: "Banana Puddin', Plated",d: 'Brown-butter wafer, cane-syrup caramel, vanilla cream.' },
  ];

  const CELLAR = [
    { n: 'Sommelier Pairing', price: '$100', d: 'Five glasses chosen to walk beside the menu.' },
    { n: 'Barrel-Aged Old Fashioned', d: 'House bourbon, smoked demerara, orange oil.' },
    { n: 'Champagne by the Glass', d: 'Grower cuvée, a rotating selection.' },
    { n: 'The Reserve List', d: 'Bordeaux, Napa cabernet, rare Southern vintages — ask your captain.' },
  ];

  /* Open Supper Club nights — date + seats remaining + room total. */
  const EVENTS = [
    { date: '2026-07-11', title: 'Whole-Hog & Bourbon', sub: 'Seven courses · vinyl & candlelight', seats: 5,  total: 24 },
    { date: '2026-07-25', title: 'Smoke & Sea',         sub: 'The Gulf meets the pit',              seats: 14, total: 24 },
    { date: '2026-08-08', title: "Pitmaster's Table",   sub: "Chef's counter · eight seats",         seats: 0,  total: 8  },
    { date: '2026-08-22', title: 'Harvest Supper',      sub: 'Late-summer Delta produce',           seats: 18, total: 24 },
    { date: '2026-09-12', title: 'Cellar Dinner',       sub: 'Reserve-list pours · seven courses',   seats: 22, total: 24 },
  ];

  /* ---------- NAV ---------- */
  const snav = $('#snav');
  const setStuck = () => snav.classList.toggle('stuck', window.scrollY > 30);
  setStuck();
  window.addEventListener('scroll', setStuck, { passive: true });

  const sburger = $('#sburger');
  const slinks = $('#snavLinks');
  const toggle = (open) => {
    slinks.classList.toggle('open', open);
    sburger.classList.toggle('open', open);
    sburger.setAttribute('aria-expanded', String(open));
  };
  sburger.addEventListener('click', () => toggle(!slinks.classList.contains('open')));
  $$('#snavLinks a').forEach(a => a.addEventListener('click', () => toggle(false)));

  /* ---------- TASTING + CELLAR ---------- */
  $('#tasting').innerHTML = TASTING.map((c, i) => `
    <div class="course">
      <span class="course__num" aria-hidden="true">${ROMAN[i]}</span>
      <div>
        <div class="course__name">${esc(c.n)}</div>
        <p class="course__desc">${esc(c.d)}</p>
      </div>
    </div>`).join('');

  $('#cellar').innerHTML = CELLAR.map(c => `
    <div class="cellar__item">
      <h4>${esc(c.n)}${c.price ? `<span>${esc(c.price)}</span>` : ''}</h4>
      <p>${esc(c.d)}</p>
    </div>`).join('');

  /* ---------- TOAST ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3800);
  }

  /* "Reserve" buttons hand off to Resy when configured. */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-resy]');
    if (!btn) return;
    if (window.BB && window.BB.open(window.BB.RESY_RESERVE_URL)) { e.preventDefault(); return; }
    // let in-page anchors still scroll to #reserve, but show a note
    if (btn.getAttribute('href') === '#reserve') { toast('Reservations open soon — call 662-801-5181 to book.'); return; }
    e.preventDefault();
    toast('Reservations open soon — call 662-801-5181 to book.');
  });

  /* ---------- RESERVATION CALENDAR ---------- */
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const status = (ev) => {
    if (ev.seats <= 0) return { key: 'full', label: 'Sold out' };
    if (ev.seats <= Math.max(2, Math.round(ev.total * 0.25))) return { key: 'few', label: 'Few left' };
    return { key: 'open', label: 'Booking' };
  };

  const byDay = {};
  EVENTS.forEach(ev => { ev._d = new Date(ev.date + 'T00:00:00'); byDay[`${ev._d.getFullYear()}-${ev._d.getMonth()}-${ev._d.getDate()}`] = ev; });
  const sorted = [...EVENTS].sort((a, b) => a._d - b._d);
  const mIdx = (y, m) => y * 12 + m;
  const minM = mIdx(sorted[0]._d.getFullYear(), sorted[0]._d.getMonth());
  const maxM = mIdx(sorted[sorted.length - 1]._d.getFullYear(), sorted[sorted.length - 1]._d.getMonth());

  const grid = $('#calGrid'), monthEl = $('#calMonth'), prev = $('#calPrev'), next = $('#calNext'), detail = $('#detail');
  const first = sorted.find(e => e.seats > 0) || sorted[0];
  let vy = first._d.getFullYear(), vm = first._d.getMonth();
  let sel = `${vy}-${vm}-${first._d.getDate()}`;

  function renderCal() {
    const idx = mIdx(vy, vm);
    prev.disabled = idx <= minM; next.disabled = idx >= maxM;
    monthEl.textContent = `${MONTHS[vm]} ${vy}`;
    const firstDow = new Date(vy, vm, 1).getDay();
    const days = new Date(vy, vm + 1, 0).getDate();
    let cells = '';
    for (let i = 0; i < firstDow; i++) cells += `<span class="cal-cell cal-cell--empty"></span>`;
    for (let d = 1; d <= days; d++) {
      const key = `${vy}-${vm}-${d}`, ev = byDay[key];
      if (ev) {
        const st = status(ev), s = key === sel ? ' sel' : '';
        cells += `<button type="button" class="cal-cell cal-cell--event ${st.key}${s}" data-key="${key}" aria-label="${MONTHS[vm]} ${d} — ${esc(ev.title)}, ${st.label}">${d}<span class="cal-cell__dot"></span></button>`;
      } else {
        const past = new Date(vy, vm, d) < today;
        cells += `<span class="cal-cell${past ? ' cal-cell--past' : ''}">${d}</span>`;
      }
    }
    grid.innerHTML = cells;
  }

  function renderDetail() {
    const ev = sel ? byDay[sel] : null;
    if (!ev) { detail.innerHTML = `<p class="detail__empty">Select an evening to see what remains.</p>`; return; }
    const st = status(ev), d = ev._d, sold = ev.seats <= 0;
    const pct = Math.max(0, Math.min(100, Math.round((ev.seats / ev.total) * 100)));
    detail.innerHTML = `
      <span class="detail__dow">${DAYS[d.getDay()]}</span>
      <div class="detail__d">${d.getDate()}</div>
      <span class="detail__mo">${MONTHS[d.getMonth()]} ${d.getFullYear()}</span>
      <h3 class="detail__title">${esc(ev.title)}</h3>
      <p class="detail__sub">${esc(ev.sub)}</p>
      <span class="detail__status ${st.key}">${st.label}</span>
      <div class="detail__seats">
        <div class="detail__bar"><span style="width:${pct}%"></span></div>
        <p class="detail__seats-label">${sold ? 'No seats remaining' : `${ev.seats} of ${ev.total} seats remain`} · one seating at seven</p>
      </div>
      ${sold
        ? `<a class="gbtn gbtn--block" href="mailto:howdy@bobandbarbs.com?subject=Waitlist%20${encodeURIComponent(ev.title)}">Join the Waitlist</a>`
        : `<a class="gbtn gbtn--solid gbtn--block" href="#" data-resy>Reserve This Evening</a>`}
      <p class="detail__note">${sold ? 'Cancellations do open up — we’ll be in touch.' : 'Confirmed through Resy · seats held with a card.'}</p>`;
  }

  function select(key) { sel = key; renderCal(); renderDetail(); }
  grid.addEventListener('click', (e) => { const c = e.target.closest('.cal-cell--event'); if (c) select(c.dataset.key); });
  prev.addEventListener('click', () => { if (mIdx(vy, vm) <= minM) return; if (--vm < 0) { vm = 11; vy--; } renderCal(); });
  next.addEventListener('click', () => { if (mIdx(vy, vm) >= maxM) return; if (++vm > 11) { vm = 0; vy++; } renderCal(); });
  renderCal(); renderDetail();

  /* ---------- SCROLL REVEAL ---------- */
  const io = new IntersectionObserver((ents) => {
    ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  $('#year').textContent = new Date().getFullYear();
})();
