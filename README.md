# 🔥 Bob & Barb's — Barbecue & Supper Club

A modern, interactive website for **Bob & Barb's**, a barbecue joint reborn in
**downtown Tupelo, Mississippi** — a low-and-slow pit by day and a candlelit,
reservation-only **Supper Club** on select weekend nights.

The signature feature is the **Day / Night mode toggle** in the nav (☀ *The Pit*
↔ ☾ *The Supper Club*) that re-themes the entire site — palette, copy, embers,
and menu — to match the restaurant's two personalities.

## ✨ Features

- **Day / Night re-theming** — one click flips the whole site from a warm,
  butcher-paper "Pit" look to a brass-and-charcoal "Supper Club" mood.
- **Animated hero** — a live canvas ember/spark field (turns gold at night) with
  drifting smoke and a neon-script logo.
- **Interactive menu** — tabbed categories (From the Pit, Plates & Sammies,
  Sides, Sweets, Sips, and the Supper Club tasting menu).
- **Quick-Tray order builder** — a demo cart with live totals, ready to wire to
  Toast / Square / ChowNow.
- **Supper Club reservations** — upcoming-nights list with availability badges
  and a validated booking form (ready for Resy / Tock / OpenTable).
- **Masonry gallery** with a keyboard-navigable lightbox.
- Scroll-reveal animations, count-up stats, a hover-pausing marquee, mobile nav,
  newsletter signup, and a "smell that?" scroll cue.
- **Zero dependencies, no build step.** Just HTML, CSS, and vanilla JS.
- Respects `prefers-reduced-motion` and is fully responsive.

## 📁 Structure

```
index.html        # all markup / sections
css/styles.css    # theming (CSS variables), layout, animations
js/main.js        # interactivity + all editable DATA (menu, events, gallery)
```

## 🚀 Run it

It's a static site — no server required. Either:

```bash
# just open it
open index.html

# …or serve it (nicer for testing)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🛠️ Make it yours

Almost everything you'll want to change lives in the `DATA` blocks at the top of
**`js/main.js`**:

| What | Where |
|------|-------|
| Menu items & prices | `MENU` object |
| Quick-order items | `QUICK` array |
| Supper Club nights | `EVENTS` array |
| Gallery photos | `GALLERY` array (swap the `img` URLs for your own photos) |
| Day/Night hero copy | `COPY` object |

Brand colors, fonts, and spacing are CSS variables at the top of
**`css/styles.css`** (`:root` for day, `body.is-night` for night).

Address, phone, email, hours, and social links are plain HTML in
**`index.html`** (search for `123 Main Street`, `662`, `howdy@`, and the
`visit__hours` / `visit__socials` blocks).

### Wiring up the real services

The order, reservation, and newsletter flows are functional demos. To go live:

- **Online ordering** — point `#orderSend` (in `main.js`) at your Toast/Square/
  ChowNow ordering URL, or embed their widget in the `#order` section.
- **Reservations** — replace the `reserveForm` submit handler with a Resy/Tock/
  OpenTable embed or a POST to your booking backend.
- **Newsletter** — point `newsForm` at Mailchimp/Klaviyo/Beehiiv.

## 🌐 Deploy

Drop the folder on any static host — **GitHub Pages, Netlify, Vercel, or
Cloudflare Pages**. No configuration needed.

---

*Made with smoke in Tupelo. May all your meat dreams come true.* 🐖
