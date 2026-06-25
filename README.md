# Bob & Barb's Q'n 2 — Barbecue & Supper Club

The website for **Bob & Barb's Q'n 2** in **downtown Tupelo, Mississippi** — a
hardwood-smoked barbecue & smash-burger counter by day, and a candlelit,
reservation-only **Supper Club** on select weekend nights.

Brand voice, the real menu, and the photos come straight from the
[@bnbqn2](https://instagram.com/bnbqn2) feed. *Don't be afraid of flavor.*

**Call to order: 662-801-5181** · Wed–Fri 11–7 · Sat 11–5

## Two worlds, two designs

The site is deliberately built as **two distinct establishments** that share a
roof — not one page with a recolor toggle. Each gets its own page, type, palette,
and pacing:

| | **The Pit** (day) | **The Supper Club** (night) |
|---|---|---|
| Pages | `index.html`, `order.html` | `supper-club.html` |
| Feel | scrappy, warm, hand-set | hushed, candlelit, editorial |
| Type | Anton + Oswald + Courier Prime + a Yellowtail wordmark | Cormorant Garamond + Jost |
| Palette | kraft paper, brick red, ember | near-black, champagne gold, ivory |
| Menu | a printed butcher-paper sheet with leader dots | a centered seven-course tasting |

You cross between them through quiet links — "Supper Club ↗" up in the Pit's nav,
and "The Pit ↗" in the Supper Club's. No gimmicks.

## Pages

```
index.html         The Pit — story, the printed menu, gallery, catering, visit
order.html         Pickup ordering — how it works + a quick-tray builder
supper-club.html   The Supper Club — the evening, the tasting, reservations
404.html           a smoke-themed not-found page
```

```
css/base.css       tiny shared foundation (reset, grain, reveal, lightbox)
css/pit.css        The Pit + Order design system
css/supper.css     The Supper Club design system
js/links.js        your live service links (shared by every page) — edit this
js/pit.js          The Pit menu + gallery + nav
js/order.js        the quick-tray order builder
js/supper.js       the tasting menu + reservation calendar
assets/gallery/    the real @bnbqn2 photos
```

## Run it

It's a static site — no build step.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Make it yours

- **Service links (do this first):** open **`js/links.js`** and paste your real
  Toast and Resy URLs:
  ```js
  window.BB = {
    TOAST_ORDER_URL:  'https://order.toasttab.com/online/your-restaurant',
    RESY_RESERVE_URL: 'https://resy.com/cities/.../venues/your-venue',
    ...
  };
  ```
  Until they're set, the order/reserve buttons fall back to a friendly
  "call us" message.
- **The Pit menu** lives in the `MENU` array at the top of **`js/pit.js`**.
- **Quick-tray items** live in `QUICK` in **`js/order.js`**.
- **The tasting menu, cellar list & Supper Club nights** live in `TASTING`,
  `CELLAR`, and `EVENTS` at the top of **`js/supper.js`**.
- **Photos** are in `assets/gallery/` (edit the `GALLERY` array in `js/pit.js`).
- **Address, phone, hours, socials** are plain HTML — search the files for
  `662-801-5181`, `howdy@`, `Tupelo`, and the `hours` / `find__socials` blocks.

## Deploy on Vercel

`vercel.json` turns on clean URLs (so `/order` and `/supper-club` work) and
caches assets. It's a static site, so there's **no build step** — import the repo
at [vercel.com/new](https://vercel.com/new), framework preset **Other**, leave
build/output blank, and deploy. Any static host (Netlify, Cloudflare Pages,
GitHub Pages) works too.

---

*Made with smoke in Tupelo.*
