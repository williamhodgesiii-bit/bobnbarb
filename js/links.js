/* =========================================================
   BOB & BARB'S — live service links (one place to edit)
   Paste your real URLs here and every page picks them up.
     TOAST_ORDER_URL  → your Toast online-ordering page
     RESY_RESERVE_URL → your Resy (or OpenTable) booking page
   Until set, buttons fall back to a friendly "call us" flow.
   ========================================================= */
window.BB = {
  TOAST_ORDER_URL:  '',   // e.g. https://order.toasttab.com/online/your-restaurant
  RESY_RESERVE_URL: '',   // e.g. https://resy.com/cities/.../venues/your-venue
  PHONE: '662-801-5181',

  open(url) { if (!url) return false; window.open(url, '_blank', 'noopener'); return true; },
};
