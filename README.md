# 🔥 Bob & Barb's Q'n 2 — BBQ, Burgers & Supper Club

A modern, interactive website for **Bob & Barb's Q'n 2**, the barbecue &
smash-burger joint coming to **downtown Tupelo, Mississippi** — a low-and-slow
pit by day and a candlelit, reservation-only **Supper Club** on select weekend
nights. Brand voice and the real menu/photos come straight from the
[@bnbqn2](https://instagram.com/bnbqn2) feed. *Don't be afraid of flavor.*

**Call to order: 662-801-5181** · Wed–Fri 11–7 · Sat 11–5

The signature feature is the **Day / Night mode toggle** in the nav (☀ *The Pit*
↔ ☾ *The Supper Club*). It doesn't just recolor the site — it swaps it for a
different restaurant: a different menu, gallery, story, FAQ, and sections, plus
a sleek high-end palette. Online ordering is hidden after dark.

## ✨ Features

- **Two restaurants, one toggle** — by day, a warm butcher-paper BBQ "Pit"; by
  night, a pristine, near-black, champagne-gold "Supper Club" with an entirely
  different fine-dining menu, gallery, story, and FAQ. The flaming marquee,
  catering, and online ordering give way to a tasting menu and Private Dining.
- **Animated hero** — a live canvas ember/spark field (turns gold at night) with
  drifting smoke and a neon-script logo. Hero copy swaps with the mode.
- **Interactive menu** — mode-aware tabbed categories: BBQ by day (From the Pit,
  Smash Burgers, Sammiches, Sides, Chitlins, Sips); a tasting menu by night
  (The Tasting, Caviar & Raw, First Courses, From the Hearth, Sweets, The Cellar).
- **Quick-Tray order builder** — a demo cart (daytime only) wired to a
  configurable Toast online-ordering link.
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
| Gallery photos | `GALLERY` array → files in `assets/gallery/` (real @bnbqn2 shots) |
| Day/Night hero copy | `COPY` object |

Brand colors, fonts, and spacing are CSS variables at the top of
**`css/styles.css`** (`:root` for day, `body.is-night` for night).

Address, phone, email, hours, and social links are plain HTML in
**`index.html`** (search for `123 Main Street`, `662`, `howdy@`, and the
`visit__hours` / `visit__socials` blocks).

### Wiring up the real services

The order and reservation buttons are already wired — just drop in your links.
At the very top of **`js/main.js`** set:

```js
const TOAST_ORDER_URL  = 'https://order.toasttab.com/online/your-restaurant';
const RESY_RESERVE_URL = 'https://resy.com/cities/.../venues/your-venue';
```

- **Online ordering (Toast)** — every "Order on Toast" button (hero + the Quick
  Tray's checkout) opens `TOAST_ORDER_URL` in a new tab. Until it's set, they
  fall back to the on-page demo tray and a friendly "coming soon" message.
- **Reservations (Resy)** — the "Reserve on Resy" buttons and the booking form
  hand off to `RESY_RESERVE_URL`. Until it's set, the form runs as a demo.
- **Newsletter** — point `newsForm` at Mailchimp/Klaviyo/Beehiiv.

## 🌐 Deploy on Vercel

This repo is Vercel-ready (`vercel.json` sets clean URLs + asset caching; it's a
static site, so there's **no build step**).

**Option A — Import the Git repo (easiest, ~1 min):**
1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in with GitHub.
2. Import **`williamhodgesiii-bit/bobnbarb`**.
3. Framework Preset: **Other**. Leave Build Command and Output Directory blank.
4. Click **Deploy**. You'll get a live `*.vercel.app` URL, and every push
   redeploys automatically.
   - This site currently lives on the branch `claude/kind-fermat-scb0df`. Either
     merge it into your production branch, or in **Project → Settings → Git** set
     that branch as the Production Branch (or just open the preview URL Vercel
     builds for the branch).

**Option B — Vercel CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod      # run from the repo root
```

Any other static host (Netlify, Cloudflare Pages, GitHub Pages) works too — no
configuration needed.

---

*Made with smoke in Tupelo. May all your meat dreams come true.* 🐖
