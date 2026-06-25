/* =========================================================
   ORDER PAGE — quick-tray builder for order.html
   ========================================================= */
(() => {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* featured quick-order items — name + numeric price */
  const QUICK = [
    { n: 'Single Smash & Fries', p: 10 },
    { n: 'Double Smash & Fries', p: 12 },
    { n: 'Brisket Sammich',      p: 14 },
    { n: 'One Meat & Two Sides', p: 13 },
    { n: '“Lil Bobby”',          p: 10 },
    { n: 'Side (single)',        p: 3  },
  ];

  /* ---------- NAV (drawer only; bar stays stuck on this page) ---------- */
  const burger = $('#burger');
  const links = $('#navLinks');
  const toggle = (open) => {
    links.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => toggle(!links.classList.contains('open')));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => toggle(false)));

  /* ---------- TRAY ---------- */
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const itemsEl = $('#trayItems');
  const countEl = $('#trayCount');
  const totalEl = $('#trayTotal');
  const cart = QUICK.map(q => ({ ...q, qty: 0 }));

  function render() {
    itemsEl.innerHTML = cart.map((it, i) => `
      <div class="tray__item">
        <div class="tray__item-info">
          <div class="tray__item-name">${esc(it.n)}</div>
          <div class="tray__item-price">$${it.p.toFixed(2)}</div>
        </div>
        <div class="stepper">
          <button type="button" data-i="${i}" data-d="-1" aria-label="Remove one ${esc(it.n)}">−</button>
          <span>${it.qty}</span>
          <button type="button" data-i="${i}" data-d="1" aria-label="Add one ${esc(it.n)}">+</button>
        </div>
      </div>`).join('');
    const count = cart.reduce((s, it) => s + it.qty, 0);
    const total = cart.reduce((s, it) => s + it.qty * it.p, 0);
    countEl.textContent = `${count} item${count === 1 ? '' : 's'}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }
  itemsEl.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const it = cart[+b.dataset.i];
    it.qty = Math.max(0, it.qty + +b.dataset.d);
    render();
  });
  render();

  /* ---------- SEND ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3800);
  }
  $('#traySend').addEventListener('click', (e) => {
    e.preventDefault();
    if (window.BB && window.BB.open(window.BB.TOAST_ORDER_URL)) return;
    const count = cart.reduce((s, it) => s + it.qty, 0);
    if (!count) { toast('Add somethin’ to your tray first, hon.'); return; }
    toast(`Tray's ready — call 662-801-5181 to finish your order (online checkout coming soon).`);
  });

  $('#year').textContent = new Date().getFullYear();
})();
