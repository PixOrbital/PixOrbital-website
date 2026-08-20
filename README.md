# PixOrbital Website

A production-ready marketing site for **PixOrbital**, a Data Science, Machine
Learning, AI, and Data Analytics company. Built as a static site — plain
HTML, CSS, and JavaScript, no framework, no build step.

Visual design follows the **Steampunk Vitoriano** design system (brass,
copper, mahogany, parchment palette; IM Fell English display/body type;
JetBrains Mono for technical values; forged-metal borders; spring-physics
motion) reinterpreted for a data/AI company — gears and orbital motifs used
as a metaphor for pipelines and models, not literal steampunk costuming.

---

## 1. Project overview

Single-page site (`index.html`) with anchor-linked sections:

Home → About → Why PixOrbital → Services → Solutions → Technology →
Projects → Process → Insights → Contact → Footer

All content is real (no lorem ipsum, no invented clients, awards, or
statistics). A few fields are intentionally left as placeholders where no
real information was provided — see **Section 8** for the full list.

---

## 2. Folder structure

```text
pixorbital/
├── index.html          All page content and structure
├── style.css            All styling (design tokens, layout, components)
├── script.js             All interactivity (nav, form, animations)
├── images/
│   ├── logo.svg           Header/footer logo mark
│   ├── favicon.svg         Browser tab icon
│   ├── og-image.png        1200×630 social share image (Open Graph/Twitter)
│   └── icons/               Empty — reserved for any future custom icon assets
├── assets/                 Empty — reserved for future downloadable assets
└── README.md              This file
```

All icons used throughout the site (service icons, solution icons, nav
hamburger, back-to-top, etc.) are inline SVG directly in `index.html` —
there are no separate icon image files to manage.

---

## 3. Technologies used

- **HTML5** — semantic markup (`header`, `main`, `section`, `article`,
  `footer`, proper heading hierarchy)
- **CSS3** — custom properties (design tokens), CSS Grid, Flexbox, CSS
  multi-column (Insights masonry layout), no preprocessor
- **Vanilla JavaScript** — no framework, no dependencies. Handles mobile
  navigation, contact form validation, scroll-reveal animation, the
  active-section nav indicator, header scroll shadow, back-to-top, and the
  footer year
- **Google Fonts** — IM Fell English, JetBrains Mono (loaded via `<link>`
  in `index.html`; swap or self-host here if you'd prefer not to depend on
  Google Fonts)

No build tools, bundlers, or package manager are required. The site runs
directly from these files.

---

## 4. How to run locally

Because it's a fully static site, you don't need a server for basic
viewing:

1. Download/copy the `pixorbital/` folder.
2. Open `index.html` directly in a browser (double-click it, or drag it
   into a browser tab).

If you'd prefer a local server (recommended if you plan to test things like
relative-path edge cases), any of these work from inside the `pixorbital/`
folder:

```bash
# Python 3
python3 -m http.server 8000

# Node (if you have it)
npx serve .
```

Then visit `http://localhost:8000`.

---

## 5. How to modify contact information

The email address `contact@pixorbital.com` appears in **three places** —
update all three if it changes:

1. `index.html` — Contact section: `<a class="contact-email" href="mailto:...">`
2. `index.html` — Footer: `<a href="mailto:...">contact@pixorbital.com</a>`
3. `script.js` — inside `initContactForm()`, the `mailtoUrl` construction:
   ```js
   const mailtoUrl = `mailto:contact@pixorbital.com?subject=...`;
   ```

**Note on the contact form:** there is no backend. Submitting the form
opens the visitor's email client with a pre-filled message addressed to the
email above — nothing is sent to a server. If you later want real form
submissions (e.g. saved to a database or sent via an email API), you'll
need to connect the form to a backend or a form service (Formspree, Netlify
Forms, etc.) and update the `submit` handler in `script.js` accordingly.

If you add a phone number or office address later, add them into the
Contact section (`#contact`) and the Footer's Contact column in
`index.html` — neither currently exists, by design, since none was
provided.

---

## 6. How to modify blog posts (Insights section)

Each article is a self-contained block in `index.html` inside
`<section id="insights">`. The first `<article class="insight-card
insight-card--featured">` is the featured post; the remaining five sit
inside `<div class="insights-columns">`.

To edit an existing post, change the text inside its `<h3>`, `<p>`,
category `<span class="insight-category">`, and the "min read" value.

To add a new post, copy one of the `<article class="insight-card">` blocks
inside `.insights-columns` and edit its contents. To change the featured
post, swap which article carries the `insight-card--featured` class.

**Publish dates** currently read "Add publish date" as a placeholder —
replace with a real date once you have one, in whatever format you prefer
(e.g. `March 2026`).

**Read Article links** currently point back to `#insights` since there are
no individual article pages yet. When you build out full article pages,
update each link's `href` to point to the real page (e.g.
`/insights/data-cleaning-ml.html`).

---

## 7. How to replace images

- **Logo** (`images/logo.svg`) — used in the header and footer. Replace the
  file directly, keeping the same filename, or update the `src` in
  `index.html` if you rename it.
- **Favicon** (`images/favicon.svg`) — browser tab icon. Same approach.
- **OG image** (`images/og-image.png`) — the 1200×630 image shown when the
  site is shared on social media / messaging apps. Replace with your own
  branded image at the same dimensions for best results, keeping the
  filename or updating the `og:image` / `twitter:image` meta tags in
  `index.html`'s `<head>`.
- **Icon graphics** throughout the site (service icons, solution icons,
  process nodes, etc.) are hand-drawn inline SVG inside `index.html`, not
  image files — edit the `<svg>...</svg>` markup directly, or replace a
  whole `<span class="...-icon">...</span>` block with your own icon markup.

---

## 8. Placeholders you should replace before launch

| What | Where | Current value |
|---|---|---|
| Canonical URL | `index.html` `<head>`, `<link rel="canonical">` | `https://www.pixorbital.in/` |
| Open Graph URL | `index.html` `<head>`, `og:url` | `https://www.pixorbital.in/` |
| Open Graph/Twitter image URL | `index.html` `<head>`, `og:image` / `twitter:image` | `https://www.pixorbital.in/images/og-image.png` |
| Blog publish dates | `index.html`, each `.insight-meta` | "Add publish date" |

Once you have your real domain, do a find-and-replace for
`https://www.pixorbital.in` across `index.html` and swap in your actual
domain.

Deliberately **not** included anywhere on the site (per the original
brief): phone number, office address, client names/logos, testimonials,
awards, or certifications. Add these only when you have real information to
put in their place.

---

## 9. How to deploy

This is a static site — any static host works. A few common options:

### Netlify / Vercel (easiest)
Drag the `pixorbital/` folder onto Netlify's deploy page, or connect a Git
repository and set the publish directory to the project root (no build
command needed).

### GitHub Pages
1. Push the contents of `pixorbital/` to a GitHub repository.
2. In the repo's Settings → Pages, set the source to the branch/root
   containing `index.html`.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

### Traditional hosting (file manager or FTP)
Upload the entire contents of the `pixorbital/` folder (not the folder
itself — its *contents*) to your host's public web root (often called
`public_html`, `www`, or `htdocs`), preserving the `images/` and `assets/`
subfolders. Once `index.html` sits at the root of your domain, the site is
live.

No environment variables, build steps, or server-side configuration are
required in any case.
