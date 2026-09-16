# MTC Reboot Conference — blog page

Pure HTML/CSS/JS, no build step. Open `index.html` in a browser, or upload the whole folder to any static host.

## Swap in your real photos

All images live in `/images` as placeholder graphics (labelled "REPLACE"). To swap them in, just replace the file with your real photo **using the same filename**, or update the `src=` in `index.html`:

| Slot | File | Used for |
|---|---|---|
| Hero | `images/hero.svg` → `hero.jpg` | Full-width top banner |
| Flyer | `images/flyer.svg` → `flyer.jpg` | Inline in the article |
| Day 1 | `images/day1-1.svg`, `day1-2.svg`, `day1-3.svg` | Arrival & refocusing gallery |
| Day 2 | `images/day2-1.svg`, `day2-2.svg`, `day2-3.svg` | Faculty sessions gallery |
| Day 3 | `images/day3-1.svg`, `day3-2.svg`, `day3-3.svg` | Commissioning & send-off gallery |

If you rename any file (e.g. to `.jpg`), update the matching `src="images/..."` in `index.html` to match.

Each `<figure>` has a `figcaption` — that's the small write-up under/over each photo. Edit the text directly in `index.html`.

## Update the links

- **Partner button** (`#partner` section and header): replace `href="#"` on `.btn-ember.btn-lg` with your real donation/get-involved URL.
- **Latest updates cards**: each `<a class="update-card" href="post-....html">` links to a placeholder page filename. Point these at your real blog post URLs once they exist.

## Notes

- Fonts (Fraunces + Inter) load from Google Fonts via `<link>` in `index.html`. If you need it fully offline, download the font files and self-host.
- The photo galleries open in a lightbox with keyboard (arrow keys / Esc) and click navigation — no extra setup needed.
- Colors are navy + a single warm "sunrise" accent, matching the John 9:4 "work while it is day" theme. Adjust the `:root` variables at the top of `css/styles.css` to retheme everything at once.
