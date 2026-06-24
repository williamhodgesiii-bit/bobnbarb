/* =========================================================
   BOB & BARB'S — interactivity
   Plain JS, no dependencies. Edit the DATA blocks to make it yours.
   ========================================================= */
(() => {
  'use strict';

  /* ---------------------------------------------------------
     DATA — swap these out for the real menu / events / prices
     --------------------------------------------------------- */
  const MENU = {
    pit: [
      { e: '🥩', n: 'Brisket',        p: '$26/lb', d: 'Post-oak smoked 16 hours. Black-pepper bark, pink ring, the works.', t: 'Sells out first' },
      { e: '🐖', n: 'Pulled Pork',    p: '$18/lb', d: 'Boston butt, low and slow, pulled to order. Sauce optional, but why.' },
      { e: '🍖', n: 'St. Louis Ribs', p: '$24/rack',d: 'Hickory-kissed, tender-with-a-tug. Dry rub or glazed.' },
      { e: '🌭', n: 'Jalapeño Hot Links', p: '$9',  d: 'House-ground, snappy casing, a slow Mississippi burn.', t: 'Spicy' },
      { e: '🦃', n: 'Smoked Turkey',  p: '$17/lb', d: 'Brined two days so it never dries out. The sleeper hit.' },
      { e: '🔥', n: 'Burnt Ends',     p: '$14',    d: 'Brisket point, cubed, candied in the smoker. Friday & Saturday only.', t: 'Weekend drop' },
    ],
    plates: [
      { e: '🍽️', n: 'The Two-Meat Plate', p: '$19', d: 'Pick two, two sides, white bread, pickles & onion. The classic.' },
      { e: '🥪', n: 'Chopped Brisket Sammie', p: '$13', d: 'Piled on a brioche bun with slaw and a pickle spear.' },
      { e: '🌮', n: 'Pulled Pork Tacos',  p: '$12', d: 'Three soft tacos, charred corn salsa, crema, cilantro.' },
      { e: '🥗', n: 'Smokehouse Salad',  p: '$14', d: 'Greens, smoked turkey, cornbread croutons, buttermilk-ranch.' },
      { e: '👑', n: "The Whole Hog Board", p: '$48', d: 'For the table — brisket, ribs, pork, links, all four sides.', t: 'Feeds 3–4' },
    ],
    sides: [
      { e: '🧀', n: 'Smoked Mac & Cheese', p: '$6', d: 'Three cheeses, finished in the pit for a smoky crust.' },
      { e: '🫘', n: 'Burnt-End Baked Beans', p: '$6', d: 'Sweet, smoky, studded with chopped burnt ends.' },
      { e: '🥬', n: 'Vinegar Slaw',  p: '$5', d: 'Crisp and tangy — the cut to all that richness.' },
      { e: '🌽', n: 'Cast-Iron Cornbread', p: '$5', d: 'Honey butter, crackly edges. Don\'t skip it.' },
      { e: '🥔', n: 'Loaded Tater Salad', p: '$5', d: 'Bacon, scallion, a whisper of mustard.' },
      { e: '🍃', n: 'Collard Greens', p: '$5', d: 'Slow-cooked with smoked turkey and a little heat.' },
    ],
    sweets: [
      { e: '🍌', n: "Barb's Banana Puddin'", p: '$7', d: 'Vanilla wafers, fresh banana, torched meringue. A house legend.', t: 'Famous' },
      { e: '🥧', n: 'Bourbon Pecan Pie',  p: '$8', d: 'Gooey, boozy, served warm with cream.' },
      { e: '🍫', n: 'Skillet Brownie',    p: '$8', d: 'Smoked-salt caramel and vanilla bean ice cream.' },
      { e: '🍑', n: 'Peach Cobbler',      p: '$7', d: 'Mississippi peaches, biscuit top, seasonal.' },
    ],
    sips: [
      { e: '🧊', n: 'Sweet Tea',          p: '$3', d: 'The house wine of the South. Free refills.' },
      { e: '🍋', n: 'Smoked Lemonade',    p: '$4', d: 'Tart, just-smoky, dangerously drinkable.' },
      { e: '🍺', n: 'Local Drafts',       p: '$6', d: 'Rotating Mississippi taps. Ask what\'s pouring.' },
      { e: '🥃', n: 'Bourbon Flight',     p: '$15',d: 'Three pours, your pitmaster\'s picks.', t: 'After 4p' },
    ],
    supper: [
      { e: '✦', n: 'Amuse — Smoked Deviled Egg', p: 'Course 1', d: 'Trout roe, pickled mustard seed, smoked paprika oil.', s: true },
      { e: '✦', n: 'Brisket Tartare',  p: 'Course 2', d: 'Hand-cut prime point, charred shallot, crispy potato, cured yolk.', s: true },
      { e: '✦', n: 'Pit-Roasted Quail', p: 'Course 3', d: 'Sorghum glaze, bourbon-soaked cornbread, collard purée.', s: true },
      { e: '✦', n: 'The Pitmaster\'s Beef Rib', p: 'Course 4', d: 'Single dry-aged rib, bone marrow jus, smoked bone-marrow butter.', s: true },
      { e: '✦', n: "Barb's Puddin', Plated", p: 'Course 5', d: 'Deconstructed banana pudding, brown-butter wafer, rum caramel.', s: true },
    ],
  };

  // Quick-order featured items (name, emoji, numeric price)
  const QUICK = [
    { e: '🥩', n: 'Brisket Plate',      p: 19 },
    { e: '🍖', n: 'Half Rack Ribs',     p: 16 },
    { e: '🥪', n: 'Brisket Sammie',     p: 13 },
    { e: '🐖', n: 'Pulled Pork Plate',  p: 15 },
    { e: '🧀', n: 'Smoked Mac',         p: 6  },
    { e: '🍌', n: "Banana Puddin'",     p: 7  },
  ];

  // Upcoming Supper Club nights
  const EVENTS = [
    { d: '12', m: 'JUL', title: 'Whole-Hog & Bourbon',   sub: 'Five courses · vinyl & candlelight', status: 'few',  label: 'A few left' },
    { d: '26', m: 'JUL', title: 'Smoke & Sea',           sub: 'Coastal Mississippi meets the pit',   status: 'open', label: 'Booking' },
    { d: '09', m: 'AUG', title: "Pitmaster's Table",     sub: 'Chef\'s counter · 8 seats only',      status: 'full', label: 'Sold out' },
    { d: '23', m: 'AUG', title: 'Harvest Supper',        sub: 'Late-summer produce · wine pairings',  status: 'open', label: 'Booking' },
  ];

  // Gallery tiles. img = optional photo URL (falls back to emoji art if it fails to load).
  const GALLERY = [
    { emoji: '🔥', cap: 'The pit at 5am',        ar: '0.8', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=70' },
    { emoji: '🥩', cap: 'Brisket, sliced',        ar: '1.2', img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=70' },
    { emoji: '🍖', cap: 'Ribs off the smoker',    ar: '1',   img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=70' },
    { emoji: '🌶️', cap: 'House rub',              ar: '0.9', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=70' },
    { emoji: '🍺', cap: 'Cold ones, local taps',  ar: '1.25',img: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=70' },
    { emoji: '🕯️', cap: 'Supper Club, after dark',ar: '0.85',img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=70' },
    { emoji: '🌽', cap: 'Cast-iron cornbread',    ar: '1',   img: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=70' },
    { emoji: '🥧', cap: 'Pie of the day',         ar: '1.1', img: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=70' },
    { emoji: '🍌', cap: "Barb's banana puddin'",  ar: '0.95',img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=70' },
  ];

  const FAQ = [
    { q: 'Do you take reservations for regular lunch & dinner?', a: 'Nope — the daytime Pit is first-come, first-served. Reservations are just for our Supper Club nights. Walk on in, grab a tray, and find a seat.' },
    { q: 'What time do you sell out?', a: 'When the meat\'s gone, it\'s gone — brisket and ribs usually go first, sometimes by mid-afternoon on weekends. Come early if your heart\'s set on a specific cut.' },
    { q: 'What exactly is the Supper Club?', a: 'A handful of nights a season we transform the dining room: candlelight, vinyl, white tablecloths, and a five-course chef\'s tasting menu. One seating, reservations only, and seats go fast. Check the calendar above.' },
    { q: 'Do you cater? Can you do a whole hog?', a: 'We sure do — drop-off trays, on-site live-fire service, and whole-hog roasts with about a week\'s notice. Hit the Catering section to request a quote.' },
    { q: 'Any vegetarian options?', a: 'Plenty of folks make a meal of our sides — smoked mac, cornbread, slaw, tater salad, collards, beans. Just ask and we\'ll steer you right.' },
    { q: 'Where do I park downtown?', a: 'Street parking runs along Main, with a public lot a block over. Catering and big pickups can use the loading spot out back — just give us a ring.' },
  ];

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. NAV — stuck state, mobile drawer, smooth close
     --------------------------------------------------------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const burger = $('#navBurger');
  const navLinks = $('#navLinks');
  const toggleNav = (open) => {
    navLinks.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => toggleNav(!navLinks.classList.contains('is-open')));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => toggleNav(false)));

  /* ---------------------------------------------------------
     2. DAY / NIGHT MODE — re-themes the whole site
     --------------------------------------------------------- */
  const modeBtn = $('#modeToggle');
  const modeLabel = $('#modeLabel');
  const heroTag = $('#heroTag');
  const heroHours = $('#heroHours');

  const COPY = {
    day: {
      label: 'The Pit',
      tag: "Low-and-slow Mississippi 'cue by day. A candlelit supper club by night.",
      hours: "Pit open Tue–Sun, 11a 'til the meat runs out",
    },
    night: {
      label: 'Supper Club',
      tag: 'Candlelight, vinyl, and a five-course chef’s menu. Reservations only.',
      hours: 'Supper Club · select Fri & Sat · one seating at 7p',
    },
  };

  const applyMode = (night, save = true) => {
    document.body.classList.toggle('is-night', night);
    document.body.classList.toggle('is-day', !night);
    modeBtn.setAttribute('aria-pressed', String(night));
    const c = night ? COPY.night : COPY.day;
    modeLabel.textContent = c.label;
    heroTag.textContent = c.tag;
    heroHours.innerHTML = c.hours;
    if (night && $('#menuGrid').dataset.cat !== 'supper') {
      // nudge the menu toward the supper club when night falls
      switchMenu('supper');
    } else if (!night && $('#menuGrid').dataset.cat === 'supper') {
      switchMenu('pit');
    }
    if (save) localStorage.setItem('bb-mode', night ? 'night' : 'day');
  };

  modeBtn.addEventListener('click', () => applyMode(!document.body.classList.contains('is-night')));
  // NOTE: the initial restore is called at the end of the MENU section below,
  // once renderMenu/switchMenu and their elements are initialized (avoids a TDZ
  // ReferenceError when a returning visitor had night mode saved).

  /* ---------------------------------------------------------
     3. MENU — tabbed, animated
     --------------------------------------------------------- */
  const menuGrid = $('#menuGrid');
  const tabs = $$('.menu__tab');

  function renderMenu(cat) {
    const items = MENU[cat] || [];
    menuGrid.dataset.cat = cat;
    menuGrid.innerHTML = items.map((it, i) => `
      <article class="menu-item ${it.s ? 'menu-item--supper' : ''}" style="animation-delay:${i * 55}ms">
        <span class="menu-item__emoji">${it.e}</span>
        <div class="menu-item__body">
          <div class="menu-item__top">
            <span class="menu-item__name">${it.n}</span>
            <span class="menu-item__price">${it.p}</span>
          </div>
          <p class="menu-item__desc">${it.d}</p>
          ${it.t ? `<span class="menu-item__tag">${it.t}</span>` : ''}
        </div>
      </article>`).join('');
  }

  function switchMenu(cat) {
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.cat === cat));
    renderMenu(cat);
  }

  tabs.forEach(t => t.addEventListener('click', () => switchMenu(t.dataset.cat)));
  renderMenu('pit');

  // now that the menu is wired up, restore the saved day/night preference
  applyMode(localStorage.getItem('bb-mode') === 'night', false);

  /* ---------------------------------------------------------
     4. ORDER BUILDER — a little demo cart
     --------------------------------------------------------- */
  const orderItemsEl = $('#orderItems');
  const orderCountEl = $('#orderCount');
  const orderTotalEl = $('#orderTotal');
  const cart = QUICK.map(q => ({ ...q, qty: 0 }));

  function renderOrder() {
    orderItemsEl.innerHTML = cart.map((it, i) => `
      <div class="order__item">
        <span class="order__item-emoji">${it.e}</span>
        <div class="order__item-info">
          <div class="order__item-name">${it.n}</div>
          <div class="order__item-price">$${it.p.toFixed(2)}</div>
        </div>
        <div class="order__step">
          <button type="button" data-i="${i}" data-d="-1" aria-label="Remove one">−</button>
          <span class="order__step-qty">${it.qty}</span>
          <button type="button" data-i="${i}" data-d="1" aria-label="Add one">+</button>
        </div>
      </div>`).join('');
    const count = cart.reduce((s, it) => s + it.qty, 0);
    const total = cart.reduce((s, it) => s + it.qty * it.p, 0);
    orderCountEl.textContent = `${count} item${count === 1 ? '' : 's'}`;
    orderTotalEl.textContent = `$${total.toFixed(2)}`;
  }
  orderItemsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const it = cart[+btn.dataset.i];
    it.qty = Math.max(0, it.qty + +btn.dataset.d);
    renderOrder();
  });
  $('#orderSend').addEventListener('click', (e) => {
    e.preventDefault();
    const count = cart.reduce((s, it) => s + it.qty, 0);
    if (!count) { toast("Add somethin' to your tray first, hon."); return; }
    toast(`🔥 ${count} item${count === 1 ? '' : 's'} fired to the pit! (Demo — connect Toast/Square here.)`);
  });
  renderOrder();

  /* ---------------------------------------------------------
     5. RESERVATIONS — events + form
     --------------------------------------------------------- */
  const eventsEl = $('#reserveEvents');
  const eventSelect = $('#rEvent');
  eventsEl.innerHTML = EVENTS.map(ev => `
    <li class="reserve__event">
      <div class="reserve__event-date"><b>${ev.d}</b><span>${ev.m}</span></div>
      <div class="reserve__event-info"><h4>${ev.title}</h4><p>${ev.sub}</p></div>
      <span class="reserve__event-status ${ev.status}">${ev.label}</span>
    </li>`).join('');
  eventSelect.innerHTML = EVENTS
    .filter(ev => ev.status !== 'full')
    .map(ev => `<option value="${ev.m} ${ev.d} — ${ev.title}">${ev.m} ${ev.d} — ${ev.title}</option>`)
    .join('') || '<option>No nights open — join the list below</option>';

  const reserveForm = $('#reserveForm');
  const reserveNote = $('#reserveNote');
  reserveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    ['rName', 'rEmail'].forEach(id => {
      const f = $('#' + id);
      const bad = !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
      f.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    if (!ok) { reserveNote.textContent = 'Mind the highlighted fields, please.'; reserveNote.className = 'reserve__formnote'; return; }
    const name = $('#rName').value.trim().split(' ')[0];
    reserveNote.textContent = `🥂 Thank you, ${name}! Your request is in — we’ll confirm by email. (Demo — wire to Resy/Tock/OpenTable.)`;
    reserveNote.className = 'reserve__formnote success';
    reserveForm.reset();
    toast('Table requested — check your inbox soon!');
  });

  /* ---------------------------------------------------------
     6. GALLERY + LIGHTBOX
     --------------------------------------------------------- */
  const galleryGrid = $('#galleryGrid');
  galleryGrid.innerHTML = GALLERY.map((g, i) => `
    <figure class="gallery__tile" data-i="${i}">
      <div class="gallery__tile-inner" style="--ar:${g.ar}">
        <div class="gallery__fallback">${g.emoji}</div>
        ${g.img ? `<img src="${g.img}" alt="${g.cap}" loading="lazy"
              onload="this.style.position='relative';this.style.zIndex=1"
              onerror="this.remove()">` : ''}
      </div>
      <figcaption class="gallery__cap">${g.cap}</figcaption>
    </figure>`).join('');

  const lb = $('#lightbox');
  const lbImg = $('#lightboxImg');
  const lbCap = $('#lightboxCap');
  let lbIndex = 0;

  function openLb(i) {
    lbIndex = (i + GALLERY.length) % GALLERY.length;
    const g = GALLERY[lbIndex];
    lbImg.style.backgroundImage = g.img ? `url("${g.img}")` : 'none';
    lbImg.textContent = g.img ? '' : g.emoji;
    lbCap.textContent = g.cap;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
  }
  function closeLb() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); }

  galleryGrid.addEventListener('click', (e) => {
    const tile = e.target.closest('.gallery__tile');
    if (tile) openLb(+tile.dataset.i);
  });
  $('#lightboxClose').addEventListener('click', closeLb);
  $('#lightboxNext').addEventListener('click', () => openLb(lbIndex + 1));
  $('#lightboxPrev').addEventListener('click', () => openLb(lbIndex - 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') openLb(lbIndex + 1);
    if (e.key === 'ArrowLeft') openLb(lbIndex - 1);
  });

  /* ---------------------------------------------------------
     6b. FAQ ACCORDION
     --------------------------------------------------------- */
  const faqList = $('#faqList');
  faqList.innerHTML = FAQ.map((f, i) => `
    <div class="faq__item">
      <button class="faq__q" aria-expanded="false" aria-controls="faqa${i}">
        ${f.q}<span class="faq__icon" aria-hidden="true">+</span>
      </button>
      <div class="faq__a" id="faqa${i}" role="region"><div class="faq__a-inner">${f.a}</div></div>
    </div>`).join('');

  faqList.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq__q');
    if (!btn) return;
    const item = btn.parentElement;
    const panel = item.querySelector('.faq__a');
    const open = item.classList.contains('is-open');
    // close siblings (classic accordion)
    $$('.faq__item', faqList).forEach(it => {
      it.classList.remove('is-open');
      it.querySelector('.faq__a').style.maxHeight = '';
      it.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
    });
    if (!open) {
      item.classList.add('is-open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  /* ---------------------------------------------------------
     7. NEWSLETTER
     --------------------------------------------------------- */
  const newsForm = $('#newsForm');
  const newsNote = $('#newsNote');
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsNote.textContent = "You're on the list — we'll holler before the next Supper Club night. 🤠";
    newsForm.reset();
  });

  /* ---------------------------------------------------------
     8. SCROLL REVEAL + COUNT-UP STATS
     --------------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = +el.dataset.count;
      const isYear = target > 1900;
      const dur = 1200; const t0 = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = isYear ? Math.round(target * eased) : Math.round(target * eased);
        if (k < 1) requestAnimationFrame(tick);
        else el.textContent = isYear ? `'${String(target).slice(2)}` : target;
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$('.stat__num').forEach(el => countIO.observe(el));

  /* ---------------------------------------------------------
     9. HERO EMBERS — canvas particle field
     --------------------------------------------------------- */
  if (!reduceMotion) initEmbers();
  function initEmbers() {
    const cv = $('#embers');
    const ctx = cv.getContext('2d');
    let w, h, parts, raf;
    const COUNT = () => Math.min(90, Math.floor(window.innerWidth / 14));

    function resize() {
      w = cv.width = cv.offsetWidth * devicePixelRatio;
      h = cv.height = cv.offsetHeight * devicePixelRatio;
    }
    function spawn() {
      return {
        x: Math.random() * w,
        y: h + Math.random() * h * 0.4,
        r: (Math.random() * 2 + 0.6) * devicePixelRatio,
        vy: (Math.random() * 0.6 + 0.25) * devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * 0.02 + 0.005,
        ph: Math.random() * Math.PI * 2,
      };
    }
    function init() { resize(); parts = Array.from({ length: COUNT() }, spawn); }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const gold = document.body.classList.contains('is-night');
      for (const p of parts) {
        p.y -= p.vy; p.x += p.vx + Math.sin((p.y + p.ph) * 0.01) * 0.3 * devicePixelRatio;
        p.ph += p.tw;
        const flick = p.a * (0.6 + 0.4 * Math.sin(p.ph * 6));
        if (p.y < -10) Object.assign(p, spawn(), { y: h + 10 });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = gold
          ? `rgba(225,185,110,${flick})`
          : `rgba(255,${120 + Math.random() * 60 | 0},60,${flick})`;
        ctx.shadowBlur = 8 * devicePixelRatio;
        ctx.shadowColor = gold ? 'rgba(216,166,82,0.8)' : 'rgba(255,110,40,0.8)';
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    init();
    frame();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(init, 200); });
    // pause when hero off-screen
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { if (!raf) frame(); }
      else { cancelAnimationFrame(raf); raf = null; }
    }, { threshold: 0 }).observe(cv);
  }

  /* ---------------------------------------------------------
     10. TOAST helper
     --------------------------------------------------------- */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-show'), 3600);
  }

  /* footer year */
  $('#year').textContent = new Date().getFullYear();
})();
