/* =========================================================
   BOB & BARB'S — interactivity
   Plain JS, no dependencies. Edit the DATA blocks to make it yours.
   ========================================================= */
(() => {
  'use strict';

  /* ---------------------------------------------------------
     ⚙️  LIVE SERVICE LINKS — paste your real URLs here.
     Until you do, the buttons fall back to the demo flows below
     and show a friendly "coming soon" toast.

       TOAST_ORDER_URL  → your Toast online-ordering page
                          (e.g. https://order.toasttab.com/online/your-restaurant)
       RESY_RESERVE_URL → your Resy booking page
                          (e.g. https://resy.com/cities/.../venues/your-venue)
     --------------------------------------------------------- */
  const TOAST_ORDER_URL  = '';   // ← paste Toast online-ordering link
  const RESY_RESERVE_URL = '';   // ← paste Resy reservation link

  // open an external service link in a new tab; returns true if a link existed
  function openService(url) {
    if (!url) return false;
    window.open(url, '_blank', 'noopener');
    return true;
  }

  /* ---------------------------------------------------------
     DATA — swap these out for the real menu / events / prices
     --------------------------------------------------------- */
  const MENU = {
    pit: [
      { e: '🥩', n: 'Brisket',        p: '$22/lb', d: 'Smoked low and slow over hardwood. Peppery bark, pink ring, no shortcuts.', t: 'Sells out first' },
      { e: '🐖', n: 'Pulled Pork',    p: '$18/lb', d: 'Boston butt pulled to order. Don\'t be afraid of flavor.' },
      { e: '🍖', n: 'Smoked Ribs',    p: 'Market',  d: 'Fall-off-tender, glazed and char-kissed. While they last.', t: 'Weekend' },
      { e: '🍽️', n: '1 Meat & 2 Sides', p: '$13',  d: 'Served with pickled onions, sauce & sliced bread. The everyday plate.' },
      { e: '🍽️', n: '2 Meat & 2 Sides', p: '$23',  d: 'Can\'t pick just one? You don\'t have to.' },
    ],
    burgers: [
      { e: '🍔', n: 'Single Smash & Fries', p: '$10', d: 'Crispy-edged smashed patty, American, the works — with a basket of fries.', t: 'House favorite' },
      { e: '🍔', n: 'Double Smash & Fries', p: '$12', d: 'Two patties, double the lacy crust. Comes with fries.' },
      { e: '🔥', n: 'The Loaded Smash',     p: 'Market',d: 'Smash patty piled with slaw, brisket & onions — a knife-and-fork situation.', t: 'Go big' },
    ],
    sammich: [
      { e: '🥪', n: 'Brisket Sammich',  p: '$14', d: 'Chopped brisket, pickled onion, sauce. Add a side $3.' },
      { e: '🥪', n: 'Pulled Pork Sammich', p: '$11', d: 'Piled high. Jumbo $16. Add a side $3.' },
      { e: '🐷', n: '"Lil Bobby"', p: '$10', d: 'Pulled pork sammich, cut down to a Lil Bobby. Still mighty.' },
      { e: '🐄', n: '"Lil Barby"', p: '$10', d: 'Brisket sammich, Barb-sized. The lunch-hour legend.' },
      { e: '🍞', n: 'Hungry Sammich', p: '$6', d: 'When you just need a little somethin\'. No judgment.' },
    ],
    sides: [
      { e: '🥬', n: 'Collard Greens', p: '$3 / $8 / $12', d: 'Slow-cooked and seasoned right. Single · Pint · Quart.' },
      { e: '🫘', n: 'Pinto Beans',    p: '$3 / $8 / $12', d: 'Smoky, soul-warming. Single · Pint · Quart.' },
      { e: '🥔', n: 'Potato Salad',   p: '$3 / $8 / $12', d: 'Cool, creamy, classic. Single · Pint · Quart.' },
      { e: '🥗', n: 'Slaw',           p: '$3 / $8 / $12', d: 'Crisp and tangy — the cut to all that smoke.' },
    ],
    chitlins: [
      { e: '🍲', n: 'Chitlins', p: 'Seasonal', d: 'Cleaned and cooked the old way. Ask when they\'re on — they go quick.', t: 'When they\'re on' },
      { e: '🌭', n: 'Hot Links', p: 'Market', d: 'Snappy, smoky, a little heat. Pile \'em on a plate.' },
    ],
    sips: [
      { e: '🧊', n: 'Sweet Tea',     p: '$2', d: 'The house wine of Mississippi. Cold and proper.' },
      { e: '🥤', n: 'Soda',          p: '$2', d: 'Ice-cold cans, your usual suspects.' },
      { e: '🍺', n: 'Domestic Beer', p: '$3', d: 'Cold one to wash it down.' },
      { e: '🍻', n: 'Premium Beer',  p: '$4', d: 'A little fancier. Happy Hour Fri 3–6.', t: 'Happy Hour' },
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
    { e: '🍔', n: 'Single Smash & Fries', p: 10 },
    { e: '🍔', n: 'Double Smash & Fries', p: 12 },
    { e: '🥪', n: 'Brisket Sammich',      p: 14 },
    { e: '🍽️', n: '1 Meat & 2 Sides',     p: 13 },
    { e: '🐷', n: '"Lil Bobby"',          p: 10 },
    { e: '🥬', n: 'Side (single)',        p: 3  },
  ];

  // Upcoming Supper Club nights
  const EVENTS = [
    { d: '12', m: 'JUL', title: 'Whole-Hog & Bourbon',   sub: 'Five courses · vinyl & candlelight', status: 'few',  label: 'A few left' },
    { d: '26', m: 'JUL', title: 'Smoke & Sea',           sub: 'Coastal Mississippi meets the pit',   status: 'open', label: 'Booking' },
    { d: '09', m: 'AUG', title: "Pitmaster's Table",     sub: 'Chef\'s counter · 8 seats only',      status: 'full', label: 'Sold out' },
    { d: '23', m: 'AUG', title: 'Harvest Supper',        sub: 'Late-summer produce · wine pairings',  status: 'open', label: 'Booking' },
  ];

  // Gallery tiles — real shots from the @bnbqn2 feed. (Swap/add your own in assets/gallery/.)
  const GALLERY = [
    { emoji: '🍔', cap: 'The smash burger',        ar: '1',    img: 'assets/gallery/smashburger.jpg' },
    { emoji: '🍔', cap: 'Loaded up',               ar: '1',    img: 'assets/gallery/loadedburger.jpg' },
    { emoji: '🥩', cap: 'Brisket, done right',     ar: '1',    img: 'assets/gallery/brisket.jpg' },
    { emoji: '🍖', cap: 'Ribs & pickled onion',    ar: '1',    img: 'assets/gallery/ribonion.jpg' },
    { emoji: '🍽️', cap: 'Brisket & pulled pork',  ar: '1',    img: 'assets/gallery/combo.jpg' },
    { emoji: '🌮', cap: 'Loaded, Mississippi-style',ar: '1',   img: 'assets/gallery/tacos.jpg' },
    { emoji: '🔥', cap: 'In the dining room',      ar: '1',    img: 'assets/gallery/burntends.jpg' },
    { emoji: '🪧', cap: "New sign, same attitude",  ar: '1.68', img: 'assets/gallery/sign.jpg' },
  ];

  const FAQ = [
    { q: 'Do you take reservations for regular lunch & dinner?', a: 'Nope — the daytime Pit is first-come, first-served. Reservations are just for our Supper Club nights. Walk on in, grab a tray, and find a seat.' },
    { q: 'What time do you sell out?', a: 'When the meat\'s gone, it\'s gone — brisket and ribs usually go first, sometimes by mid-afternoon on weekends. Come early if your heart\'s set on a specific cut.' },
    { q: 'What exactly is the Supper Club?', a: 'A handful of nights a season we transform the dining room: candlelight, vinyl, white tablecloths, and a five-course chef\'s tasting menu. One seating, reservations only, and seats go fast. Check the calendar above.' },
    { q: 'Do you cater? Can you do a whole hog?', a: 'We sure do — drop-off trays, on-site live-fire service, and whole-hog roasts with about a week\'s notice. Hit the Catering section to request a quote.' },
    { q: 'Any vegetarian options?', a: 'Plenty of folks make a meal of our sides — smoked mac, cornbread, slaw, tater salad, collards, beans. Just ask and we\'ll steer you right.' },
    { q: 'Where do I park downtown?', a: 'Street parking runs along Main, with a public lot a block over. Catering and big pickups can use the loading spot out back — just give us a ring.' },
  ];

  /* =========================================================
     THE SUPPER CLUB (night) — a completely different restaurant.
     Different menu, different gallery, different story & FAQ.
     ========================================================= */
  const SUPPER_MENU = {
    tasting: [
      { e: '✦', n: 'The Seven-Course Tasting', p: '$185', d: 'A journey through the season — caviar to confection, composed nightly by the chef.', t: 'Per guest', s: true },
      { e: '✦', n: 'With Cellar Pairing',       p: '$310', d: 'Each course met, glass for glass, by a pour from our reserve list.', t: 'Per guest', s: true },
      { e: '✦', n: "The Chef's Counter",        p: 'By request', d: 'Eight seats at the pass — the full tasting, narrated course by course.', t: '8 seats', s: true },
    ],
    caviar: [
      { e: '◆', n: 'Ossetra Caviar Service', p: '30g · 50g', d: 'Royal ossetra, warm blini, crème fraîche, the traditional garnish.', t: 'For the table', s: true },
      { e: '◆', n: 'Gulf Oysters',           p: '½ · Dozen', d: 'Champagne mignonette, finger lime, cucumber ice.', s: true },
      { e: '◆', n: 'A5 Wagyu Tartare',       p: 'Market',    d: 'Hand-cut Texas wagyu, smoked yolk, black truffle, sourdough crisp.', s: true },
      { e: '◆', n: 'Hamachi Crudo',          p: '',          d: 'Yuzu kosho, avocado, charred jalapeño oil.', s: true },
    ],
    first: [
      { e: '✦', n: 'Foie Gras Torchon',         p: '', d: 'Sorghum gelée, toasted brioche, Hill Country pecans.', s: true },
      { e: '✦', n: 'Lobster Bisque',            p: '', d: 'Cognac, tarragon crème, brandy-poached claw.', s: true },
      { e: '✦', n: 'Heritage Tomato & Burrata', p: '', d: 'Aged balsamic, basil, Maldon salt, cold-pressed oil.', s: true },
      { e: '✦', n: 'Roasted Beet & Chèvre',     p: '', d: 'Local honey, candied walnut, micro herbs.', s: true },
    ],
    hearth: [
      { e: '✦', n: '45-Day Dry-Aged Ribeye', p: '8oz · 16oz', d: 'Akaushi beef, bone-marrow butter, roasted over the oak hearth.', t: 'Signature', s: true },
      { e: '✦', n: 'Filet of A5 Wagyu',      p: 'Market',     d: 'Pommes purée, charred cipollini, red-wine bordelaise.', s: true },
      { e: '✦', n: 'Whole Roasted Dover Sole', p: '',         d: 'Brown butter, capers, Meyer lemon, toasted almond.', s: true },
      { e: '✦', n: 'Rack of Lamb',           p: '',           d: 'Pistachio crust, fava, mint, rosemary jus.', s: true },
    ],
    sweets: [
      { e: '✦', n: 'Grand Marnier Soufflé',     p: '', d: 'Crème anglaise, candied orange. Twenty minutes — worth the wait.', t: 'To finish', s: true },
      { e: '✦', n: 'Dark Chocolate Marquise',   p: '', d: 'Burnt honey, smoked sea salt, gold leaf.', s: true },
      { e: '✦', n: 'The Cheese Trolley',        p: '', d: 'Artisan selection, quince, lavash, Hill Country honeycomb.', s: true },
    ],
    cellar: [
      { e: '✦', n: 'Sommelier Pairing',          p: 'Per guest', d: 'Five glasses chosen to walk beside the tasting menu.', s: true },
      { e: '✦', n: 'Barrel-Aged Old Fashioned',  p: '', d: 'House bourbon, smoked demerara, orange oil.', s: true },
      { e: '✦', n: 'Champagne by the Glass',     p: '', d: 'Grower cuvée, a rotating selection.', s: true },
      { e: '✦', n: 'The Reserve List',           p: '', d: 'Bordeaux, Napa cabernet, rare Texas vintages. Ask your captain.', s: true },
    ],
  };

  // Menu presentation per mode — copy, tabs, and the items to show.
  const MENU_MODES = {
    day: {
      kicker: 'The Goods', title: 'The Menu', defaultCat: 'pit', items: MENU,
      lede: "Smoked meats by the pound, smash burgers off the flat-top, sammiches and scratch-made sides. When it's gone, it's gone — so don't dawdle.",
      note: 'Plates served with pickled onions, sauce &amp; sliced bread. Sides by the single, pint, or quart. Market items priced daily — call to order at <a href="tel:+16628015181">662-801-5181</a>.',
      tabs: [['pit', 'From the Pit'], ['burgers', 'Smash Burgers'], ['sammich', 'Sammiches'], ['sides', "Sides &amp; Fixin's"], ['chitlins', 'Chitlins'], ['sips', 'Sips']],
    },
    night: {
      kicker: 'The Table', title: 'The Tasting Menu', defaultCat: 'tasting', items: SUPPER_MENU,
      lede: 'Caviar, dry-aged beef, and the morning’s Gulf catch — composed nightly by the chef. One seating, reservations only.',
      note: 'Menus change nightly with the season; cellar pairings available. Kindly advise us of any dietary needs when you reserve.',
      tabs: [['tasting', 'The Tasting'], ['caviar', 'Caviar &amp; Raw'], ['first', 'First Courses'], ['hearth', 'From the Hearth'], ['sweets', 'Sweets'], ['cellar', 'The Cellar']],
    },
  };

  // Refined plated-food imagery for the Supper Club gallery.
  // (Falls back to the elegant glyph tile if a photo can't load.)
  const U = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;
  const NIGHT_GALLERY = [
    { emoji: '🥩', cap: 'Dry-aged ribeye, oak hearth', ar: '1',    img: U('1546964124-0cce460f38ef') },
    { emoji: '🦪', cap: 'Gulf oysters & mignonette',   ar: '1',    img: U('1559339352-11d035aa65de') },
    { emoji: '🍽️', cap: "The chef's plating",          ar: '1',    img: U('1504674900247-0877df9cc836') },
    { emoji: '🥂', cap: 'From the cellar',             ar: '1',    img: U('1510812431401-41d2bd2722f3') },
    { emoji: '🍷', cap: 'Reserve pours',               ar: '1',    img: U('1474722883778-792e7990302f') },
    { emoji: '🍫', cap: 'Dark chocolate marquise',     ar: '1',    img: U('1551024601-bec78aea704b') },
    { emoji: '🐟', cap: 'Roasted Dover sole',          ar: '1',    img: U('1467003909585-2f8a72700288') },
    { emoji: '🕯️', cap: 'The dining room, after dark', ar: '1.68', img: U('1414235077428-338989a2e8c0') },
  ];

  const SUPPER_FAQ = [
    { q: 'How do I reserve a table?', a: 'Seats are released on Resy at the first of each month and tend to go within the hour. Use “Reserve on Resy” above, or inquire with us directly for private dining.' },
    { q: 'Is there a dress code?', a: 'Smart elegant. Jackets are welcome but not required — we simply ask that you arrive ready for a long, unhurried evening.' },
    { q: 'What does an evening look like?', a: 'One seating at seven o’clock, a single seven-course tasting menu, optional cellar pairings, and as much time as the night allows. Plan for roughly two and a half hours.' },
    { q: 'Can you accommodate dietary needs?', a: 'Gladly — note them when you reserve and the kitchen will compose around them. We ask for notice so the chef can source accordingly.' },
    { q: 'Do you offer private dining or buyouts?', a: 'Yes. The Cellar Room seats up to twelve, and full buyouts are available on select evenings. See Private Dining to inquire.' },
    { q: 'Where are you, and is there valet?', a: 'Downtown Tupelo. Valet is available on supper-club evenings and for private events on request.' },
  ];

  // Night version of the story block (the day copy is captured from the page).
  const STORY_NIGHT = {
    kicker: 'The Supper Club',
    title: 'An invitation, <em>after dark.</em>',
    img: U('1414235077428-338989a2e8c0'),
    imgAlt: 'A candlelit supper-club dining room',
    body: `
      <p class="reveal">When the pit cools, the room is transformed. Candlelight,
      low vinyl, pressed linen, and a single seating for those in the know &mdash;
      the quiet, considered other half of the house, entirely by reservation.</p>
      <p class="reveal">The chef composes a <strong>seven-course tasting</strong>
      each evening from caviar, dry-aged beef, and the morning's Gulf catch, met
      glass for glass from a reserve cellar. No menu to order from. No rush. Just
      an evening made for you.</p>
      <p class="reveal story__twist">Established, private, and unhurried &mdash;
      the finest table in Tupelo, set after dark.</p>`,
  };

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
  const modeHint = $('#modeHint');
  const heroTag = $('#heroTag');
  const heroHours = $('#heroHours');

  const heroEyebrow = $('#heroEyebrow');
  const heroSlab = $('#heroSlab');
  const heroMetaLead = $('#heroMetaLead');
  const heroScrollText = $('#heroScrollText');

  const COPY = {
    day: {
      label: 'The Pit',
      hint: 'Enter the Supper Club ✦',
      eyebrow: 'Same name. Same attitude. Now in Tupelo.',
      slab: "Q'n 2 · BBQ & Smash Burgers",
      tag: "BBQ & smash burgers, smoked low and slow. Don't be afraid of flavor.",
      metaLead: "<strong>Now slangin'</strong> · Downtown Tupelo, MS",
      hours: "Wed–Fri 11–7 · Sat 11–5 · slangin' til it's gone",
      scroll: 'smell that?',
    },
    night: {
      label: 'Supper Club',
      hint: '☀ Back to The Pit',
      eyebrow: 'By reservation · Downtown Tupelo',
      slab: 'The Supper Club',
      tag: 'A seven-course tasting, a reserve cellar, and a single seating. By reservation only.',
      metaLead: '<strong>Members &amp; reservations</strong> · Downtown Tupelo',
      hours: 'Select evenings · one seating at 7 o’clock',
      scroll: 'after dark',
    },
  };

  const applyMode = (night, save = true) => {
    document.body.classList.toggle('is-night', night);
    document.body.classList.toggle('is-day', !night);
    modeBtn.setAttribute('aria-pressed', String(night));
    const c = night ? COPY.night : COPY.day;
    modeLabel.textContent = c.label;
    if (modeHint) modeHint.textContent = c.hint;
    heroEyebrow.textContent = c.eyebrow;
    heroSlab.textContent = c.slab;
    heroTag.textContent = c.tag;
    heroMetaLead.innerHTML = c.metaLead;
    heroHours.innerHTML = c.hours;
    heroScrollText.textContent = c.scroll;
    // Swap the entire experience — not just the palette.
    setMenuMode(night ? 'night' : 'day');
    renderGallery(night ? NIGHT_GALLERY : GALLERY);
    renderFaq(night ? SUPPER_FAQ : FAQ);
    setStory(night);
    if (save) localStorage.setItem('bb-mode', night ? 'night' : 'day');
  };

  modeBtn.addEventListener('click', () => applyMode(!document.body.classList.contains('is-night')));
  // NOTE: the initial restore is called at the very end of this file, once every
  // render function and its DOM hooks are initialized (avoids a TDZ error when a
  // returning visitor had night mode saved).

  /* ---------------------------------------------------------
     3. MENU — mode-driven tabs, copy & items
     --------------------------------------------------------- */
  const menuGrid = $('#menuGrid');
  const menuTabs = $('#menuTabs');
  let menuMode = 'day';

  function renderMenu(cat) {
    const items = MENU_MODES[menuMode].items[cat] || [];
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

  function setMenuMode(mode) {
    if (!MENU_MODES[mode]) return;
    menuMode = mode;
    const conf = MENU_MODES[mode];
    $('#menuKicker').textContent = conf.kicker;
    $('#menuTitle').textContent = conf.title;
    $('#menuLede').textContent = conf.lede;
    $('#menuNote').innerHTML = conf.note;
    menuTabs.innerHTML = conf.tabs.map(([cat, label], i) =>
      `<button class="menu__tab ${i === 0 ? 'is-active' : ''}" data-cat="${cat}" role="tab">${label}</button>`
    ).join('');
    renderMenu(conf.defaultCat);
  }

  menuTabs.addEventListener('click', (e) => {
    const t = e.target.closest('.menu__tab');
    if (!t) return;
    $$('.menu__tab', menuTabs).forEach(x => x.classList.toggle('is-active', x === t));
    renderMenu(t.dataset.cat);
  });

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
    // If a real Toast link is set, send folks straight there.
    if (openService(TOAST_ORDER_URL)) return;
    const count = cart.reduce((s, it) => s + it.qty, 0);
    if (!count) { toast("Add somethin' to your tray first, hon."); return; }
    toast(`🔥 ${count} item${count === 1 ? '' : 's'} ready — connect your Toast link to check out online.`);
  });
  renderOrder();

  // "Order on Toast" buttons (hero + order section) jump straight to Toast.
  $$('[data-toast-order]').forEach(btn => btn.addEventListener('click', (e) => {
    if (openService(TOAST_ORDER_URL)) { e.preventDefault(); return; }
    // no link yet → let the anchor fall through to the #order section
    toast('Online ordering on Toast is coming soon — call 662-801-5181 to order.');
  }));

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
    // Hand the booking off to Resy if a link is configured.
    if (openService(RESY_RESERVE_URL)) {
      reserveNote.textContent = 'Opening Resy to finish your reservation…';
      reserveNote.className = 'reserve__formnote success';
      return;
    }
    const name = $('#rName').value.trim().split(' ')[0];
    reserveNote.textContent = `🥂 Thank you, ${name}! Your request is in — we’ll confirm by email. (Add your Resy link to book instantly.)`;
    reserveNote.className = 'reserve__formnote success';
    reserveForm.reset();
    toast('Table requested — check your inbox soon!');
  });

  // "Reserve on Resy" buttons jump straight to Resy when a link is set.
  $$('[data-resy]').forEach(btn => btn.addEventListener('click', (e) => {
    if (openService(RESY_RESERVE_URL)) { e.preventDefault(); return; }
    toast('Resy booking is coming soon — fill out the form or call 662-801-5181.');
  }));

  /* ---------------------------------------------------------
     6. GALLERY + LIGHTBOX
     --------------------------------------------------------- */
  const galleryGrid = $('#galleryGrid');
  let galleryData = GALLERY;

  function renderGallery(data) {
    galleryData = data;
    galleryGrid.innerHTML = data.map((g, i) => `
      <figure class="gallery__tile" data-i="${i}">
        <div class="gallery__tile-inner" style="--ar:${g.ar}">
          <div class="gallery__fallback">${g.emoji}</div>
          ${g.img ? `<img src="${g.img}" alt="${g.cap}" loading="lazy"
                onload="this.style.position='relative';this.style.zIndex=1"
                onerror="this.remove()">` : ''}
        </div>
        <figcaption class="gallery__cap">${g.cap}</figcaption>
      </figure>`).join('');
  }

  const lb = $('#lightbox');
  const lbImg = $('#lightboxImg');
  const lbCap = $('#lightboxCap');
  let lbIndex = 0;

  function openLb(i) {
    lbIndex = (i + galleryData.length) % galleryData.length;
    const g = galleryData[lbIndex];
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
  function renderFaq(data) {
    faqList.innerHTML = data.map((f, i) => `
      <div class="faq__item">
        <button class="faq__q" aria-expanded="false" aria-controls="faqa${i}">
          ${f.q}<span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__a" id="faqa${i}" role="region"><div class="faq__a-inner">${f.a}</div></div>
      </div>`).join('');
  }

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

  /* ---------------------------------------------------------
     11. STORY swap (The Pit ↔ The Supper Club)
     --------------------------------------------------------- */
  const storyKicker = $('#storyKicker');
  const storyTitle  = $('#storyTitle');
  const storyBody   = $('#storyBody');
  const storyImg    = $('#storyImg');
  // capture the day version straight from the page markup
  const STORY_DAY = {
    kicker: storyKicker.textContent,
    title:  storyTitle.innerHTML,
    body:   storyBody.innerHTML,
    img:    storyImg.getAttribute('src'),
    imgAlt: storyImg.getAttribute('alt'),
  };
  function setStory(night) {
    const s = night ? STORY_NIGHT : STORY_DAY;
    storyKicker.textContent = s.kicker;
    storyTitle.innerHTML = s.title;
    storyBody.innerHTML = s.body;
    storyImg.src = s.img;
    storyImg.alt = s.imgAlt;
    // freshly injected paragraphs aren't observed by the reveal IO, so show them
    $$('.reveal', storyBody).forEach(el => el.classList.add('is-in'));
  }

  /* ---------------------------------------------------------
     12. BOOT — render everything for the saved (or default) mode.
     Runs last so every render function above is initialized.
     --------------------------------------------------------- */
  applyMode(localStorage.getItem('bb-mode') === 'night', false);

  /* footer year */
  $('#year').textContent = new Date().getFullYear();
})();
