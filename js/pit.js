/* =========================================================
   THE PIT — interactivity for index.html
   Plain JS, no dependencies. Edit MENU / GALLERY below.
   ========================================================= */
(() => {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- THE MENU (edit me) ----------
     Each section renders as a column block on the printed sheet.
     item = { n: name, p: price, d: description, t: little stamp (optional) } */
  const MENU = [
    { id: 'pit', title: 'From the Pit', items: [
      { n: 'Brisket',            p: '$22 / lb', d: 'Smoked low and slow over hardwood. Peppery bark, pink ring, no shortcuts.', t: 'Goes first' },
      { n: 'Pulled Pork',        p: '$18 / lb', d: 'Boston butt, pulled to order and piled high.' },
      { n: 'Smoked Ribs',        p: 'Market',   d: 'Char-kissed and tender. Weekends, while they last.' },
      { n: 'Hot Links',          p: 'Market',   d: 'Snappy, smoky, a little heat.' },
      { n: 'Chitlins',           p: 'Seasonal', d: 'Cleaned and cooked the old way. Ask when they’re on — they go quick.' },
      { n: 'One Meat & Two Sides', p: '$13',    d: 'The everyday plate. Pickled onions, sauce & sliced bread.' },
      { n: 'Two Meat & Two Sides', p: '$23',    d: 'Can’t pick just one? You don’t have to.' },
    ]},
    { id: 'burgers', title: 'Smash Burgers', items: [
      { n: 'Single Smash & Fries', p: '$10', d: 'Crispy-edged smash patty, American, the works — with a basket of fries.', t: 'Favorite' },
      { n: 'Double Smash & Fries', p: '$12', d: 'Two patties, double the lacy crust. Comes with fries.' },
      { n: 'The Loaded Smash',     p: 'Market', d: 'Piled with slaw, brisket & onions. A knife-and-fork situation.' },
    ]},
    { id: 'sammich', title: 'Sammiches', items: [
      { n: 'Brisket Sammich',     p: '$14', d: 'Chopped brisket, pickled onion, sauce. Add a side $3.' },
      { n: 'Pulled Pork Sammich', p: '$11', d: 'Piled high. Jumbo $16. Add a side $3.' },
      { n: '“Lil Bobby”', p: '$10', d: 'Pulled pork sammich, cut down to size. Still mighty.' },
      { n: '“Lil Barby”', p: '$10', d: 'Brisket sammich, Barb-sized. The lunch-hour legend.' },
      { n: 'Hungry Sammich',      p: '$6',  d: 'When you just need a little somethin’. No judgment.' },
    ]},
    { id: 'sides', title: 'Sides & Fixin’s', items: [
      { n: 'Collard Greens', p: '3 / 8 / 12', d: 'Slow-cooked and seasoned right. Single · pint · quart.' },
      { n: 'Pinto Beans',    p: '3 / 8 / 12', d: 'Smoky and soul-warming.' },
      { n: 'Potato Salad',   p: '3 / 8 / 12', d: 'Cool, creamy, classic.' },
      { n: 'Slaw',           p: '3 / 8 / 12', d: 'Crisp and tangy — the cut to all that smoke.' },
    ]},
    { id: 'drinks', title: 'Something Cold', items: [
      { n: 'Sweet Tea',     p: '$2', d: 'The house wine of Mississippi. Cold and proper.' },
      { n: 'Soda',          p: '$2', d: 'Ice-cold cans, the usual suspects.' },
      { n: 'Domestic Beer', p: '$3', d: 'Cold one to wash it down.' },
      { n: 'Premium Beer',  p: '$4', d: 'A little fancier. Happy Hour Fri 3–6.', t: 'Happy hour' },
    ]},
  ];

  /* ---------- THE GALLERY (real @bnbqn2 shots) ---------- */
  const GALLERY = [
    { cap: 'The smash burger',     img: 'assets/gallery/smashburger.jpg' },
    { cap: 'Brisket, done right',  img: 'assets/gallery/brisket.jpg' },
    { cap: 'Loaded up',            img: 'assets/gallery/loadedburger.jpg' },
    { cap: 'Ribs & pickled onion', img: 'assets/gallery/ribonion.jpg' },
    { cap: 'Brisket & pulled pork',img: 'assets/gallery/combo.jpg' },
    { cap: 'Burnt ends',           img: 'assets/gallery/burntends.jpg' },
    { cap: 'Mississippi-style',    img: 'assets/gallery/tacos.jpg' },
    { cap: 'Same attitude',        img: 'assets/gallery/sign.jpg' },
  ];

  /* ---------- NAV: stuck state + mobile drawer ---------- */
  const nav = $('#nav');
  const setStuck = () => nav.classList.toggle('stuck', window.scrollY > 30);
  setStuck();
  window.addEventListener('scroll', setStuck, { passive: true });

  const burger = $('#burger');
  const links = $('#navLinks');
  const toggle = (open) => {
    links.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => toggle(!links.classList.contains('open')));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => toggle(false)));

  /* ---------- MENU: render the printed sheet ---------- */
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  $('#menuCols').innerHTML = MENU.map(sec => `
    <section class="m-sec">
      <div class="m-sec__head">
        <span class="m-sec__diamond" aria-hidden="true">◆</span>
        <h3>${esc(sec.title)}</h3>
      </div>
      ${sec.items.map(it => `
        <div class="m-item">
          <div class="m-item__line">
            <span class="m-item__name">${esc(it.n)}${it.t ? ` <span class="m-item__tag">${esc(it.t)}</span>` : ''}</span>
            <span class="m-item__dots" aria-hidden="true"></span>
            <span class="m-item__price">${esc(it.p)}</span>
          </div>
          <p class="m-item__desc">${esc(it.d)}</p>
        </div>`).join('')}
    </section>`).join('');

  /* ---------- GALLERY + LIGHTBOX ---------- */
  const grid = $('#galleryGrid');
  grid.innerHTML = GALLERY.map((g, i) => `
    <figure class="shot" data-i="${i}">
      <img src="${g.img}" alt="${esc(g.cap)}" loading="lazy" />
      <figcaption>${esc(g.cap)}</figcaption>
    </figure>`).join('');

  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let idx = 0;
  const openLb = (i) => {
    idx = (i + GALLERY.length) % GALLERY.length;
    lbImg.style.backgroundImage = `url("${GALLERY[idx].img}")`;
    lbCap.textContent = GALLERY[idx].cap;
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
  };
  const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };
  grid.addEventListener('click', (e) => {
    const t = e.target.closest('.shot'); if (t) openLb(+t.dataset.i);
  });
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbNext').addEventListener('click', () => openLb(idx + 1));
  $('#lbPrev').addEventListener('click', () => openLb(idx - 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') openLb(idx + 1);
    if (e.key === 'ArrowLeft') openLb(idx - 1);
  });

  /* ---------- NEWSLETTER (demo) ---------- */
  const newsForm = $('#newsForm'), newsNote = $('#newsNote');
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsNote.textContent = 'You’re on the list — we’ll holler before the next Supper Club night.';
    newsForm.reset();
  });

  /* ---------- SCROLL REVEAL ---------- */
  const io = new IntersectionObserver((ents) => {
    ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- YEAR ---------- */
  $('#year').textContent = new Date().getFullYear();
})();
