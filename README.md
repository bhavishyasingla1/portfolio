# BhavishyaSingla.com — Figuring Things Out

A high-contrast, Swiss editorial minimalist doorway connecting three real, cloned interactive 3D WebGL experiences by Bruno Simon, engineered strictly to Google Search Essentials and AI Search standards.

---

## Architecture Overview

```
BhavishyaSingla.com
   │
   ├── Landing Page ("FIGURING THINGS OUT." / "AI · TECHNOLOGY · CREATIVITY")
   │      └── [ EXPLORE WORLD → ] (Neon green hover interaction)
   │
   ├── Experience Selector (01 — MY ROOM, 02 — INFINITE WORLD, 03 — FOLIO)
   │
   ├── /room/   ──> Cloned "My Room in 3D" (Webpack 5, Three.js)
   ├── /world/  ──> Cloned "Infinite World" (Vite, Three.js procedural terrain)
   └── /folio/  ──> Cloned "Folio 2019" (Vite, Three.js physics & car playground)
```

---

## Directory & Folder Structure

```
Bhavishya's Portfolio/
├── google.md                   # Complete Google SEO & AI Search Mastery blueprint
├── README.md                   # Repository documentation & architecture guide
├── index.html                  # Semantic HTML5 document with Master <head> & JSON-LD
├── vite.config.js              # Production bundler & experience rewrite middleware
├── package.json                # Unified scripts for development, build, and audits
│
├── src/                        # Modular application source
│   ├── main.js                 # Entry point & structured data bootstrap
│   ├── config/
│   │   ├── site.js             # Centralized site registry, socials, and metadata
│   │   └── schema.js           # Schema.org JSON-LD generator (WebSite, Person, ItemList)
│   ├── styles/
│   │   ├── variables.css       # Design tokens (colors, grid size, fonts, neon accents)
│   │   ├── reset.css           # Modern CSS reset & accessibility utilities
│   │   ├── typography.css      # Swiss editorial typography rules
│   │   ├── components.css      # Buttons, experience links, exit stage controls
│   │   └── index.css           # Master stylesheet aggregating modular CSS
│   └── controllers/
│       ├── router.js           # HTML5 History API & deep routing controller
│       ├── stage.js            # Experience stage lifecycle & WebGL memory cleanup
│       └── portal.js           # View state coordinator (Landing ↔ Selector ↔ Stage)
│
├── experiences/                # Isolated cloned repositories (Source Code)
│   ├── my-room-in-3d/          # Cloned repository from Bruno Simon
│   ├── infinite-world/         # Cloned repository from Bruno Simon
│   └── folio-2019/             # Cloned repository from Bruno Simon (MIT License)
│
├── public/                     # Static production assets & built experiences
│   ├── room/                   # Pre-compiled My Room in 3D application
│   ├── world/                  # Pre-compiled Infinite World application
│   ├── folio/                  # Pre-compiled Folio 2019 application
│   ├── favicon.svg             # SERP brand favicon
│   ├── og-image.svg            # Open Graph social preview (1200x630)
│   ├── site.webmanifest        # PWA & Web App Manifest
│   ├── robots.txt              # RFC 9309 master robots.txt with AI crawlers
│   ├── sitemap.xml             # W3C datetime standard XML sitemap
│   ├── llms.txt                # Machine-readable AI summary
│   └── llms-full.txt           # Detailed AI context documentation
│
└── scripts/                    # Automation scripts
    ├── build-experiences.js    # Compiles and syncs all 3 experiences to public/
    └── verify-seo.sh           # Automated CLI audit testing HTTP codes & metadata
```

---

## 1. Where Each Repository Lives

All three cloned open-source repositories are stored in the `/experiences` directory:

- **Experience 01 — My Room in 3D**:
  - Source: [https://github.com/brunosimon/my-room-in-3d](https://github.com/brunosimon/my-room-in-3d)
  - Location: `experiences/my-room-in-3d/`
  - Integrated path: `/room/`
- **Experience 02 — Infinite World**:
  - Source: [https://github.com/brunosimon/infinite-world](https://github.com/brunosimon/infinite-world)
  - Location: `experiences/infinite-world/`
  - Integrated path: `/world/`
- **Experience 03 — Folio 2019**:
  - Source: [https://github.com/brunosimon/folio-2019](https://github.com/brunosimon/folio-2019)
  - Location: `experiences/folio-2019/`
  - Integrated path: `/folio/`
  - Original MIT license and attribution preserved in `experiences/folio-2019/license.md`.

---

## 2. How to Run Each Project Locally

### Running the Unified Main Website
```bash
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Running Experiences Independently

#### My Room in 3D
```bash
cd experiences/my-room-in-3d
npm install
npm run dev
```
Runs at `http://localhost:8080/`.

#### Infinite World
```bash
cd experiences/infinite-world
npm install
npm run dev
```
Runs at `http://localhost:5173/` (or next available port).

#### Folio 2019
```bash
cd experiences/folio-2019
npm install
npm run dev
```
Runs at `http://localhost:5173/` (or next available port).

---

## 3. Build & Verification Commands

```bash
# Build the main website into dist/
npm run build

# Recompile all 3 experiences from experiences/ into public/
npm run build:experiences

# Build experiences and website in one command
npm run build:all

# Run automated SEO & Protocol audit (verifies HTTP 200, robots, sitemap, JSON-LD)
npm run audit:seo
```

---

## 4. Google SEO & AI Search Standards Implemented (`google.md`)

1. **Master `<head>` Architecture**:
   - Optimal Title: `Bhavishya Singla — AI, Technology & Interactive 3D Worlds` (61 characters).
   - High-impact Meta Description (160 characters).
   - Self-referencing Canonical tag (`https://bhavishyasingla.com/`).
   - Robots snippet controls: `max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
   - Open Graph (1200x630) and Twitter Card tags.
2. **Schema.org Structured Data (JSON-LD)**:
   - Full `@graph` including `WebSite`, `Person` (Knowledge Graph entity with verified `sameAs` links), and `ItemList` of the 3 experiences.
3. **Crawlable Hyperlinks**:
   - Real HTML `<a>` tags with `href="/room/"`, `href="/world/"`, `href="/folio/"` so Googlebot and web crawlers can discover every experience without executing client JavaScript.
4. **AI Search & GEO Optimization**:
   - High-density Answer Capsule in semantic HTML for Gemini, Perplexity, and AI Overviews.
   - Machine-readable endpoints: `/llms.txt` and `/llms-full.txt`.
5. **Technical Infrastructure**:
   - RFC 9309 compliant `robots.txt` explicitly admitting Googlebot, Google-Extended, GPTBot, ClaudeBot, PerplexityBot, and Applebot.
   - Valid XML Sitemap with accurate W3C datetime `<lastmod>` timestamps.
   - Web App Manifest (`site.webmanifest`) declaring theme color and icon geometry.

---

## 5. How to Update or Remove an Experience Later

### Updating an Experience
1. Navigate to the experience folder: `cd experiences/<name>`
2. Pull updates or edit code.
3. Recompile via `npm run build:experiences`.

### Removing or Swapping an Experience
1. Modify the centralized registry in `src/config/site.js`.
2. Update the corresponding links in `index.html`.
3. Re-run `npm run build:all` and verify with `npm run audit:seo`.

---

## License & Attribution
- "My Room in 3D" by Bruno Simon ([github.com/brunosimon/my-room-in-3d](https://github.com/brunosimon/my-room-in-3d))
- "Infinite World" by Bruno Simon ([github.com/brunosimon/infinite-world](https://github.com/brunosimon/infinite-world))
- "Folio 2019" by Bruno Simon ([github.com/brunosimon/folio-2019](https://github.com/brunosimon/folio-2019), MIT License)

---

## Projects & Articles (generated pages)

`npm run dev` and `npm run build` first run `scripts/build-pages.js`, which writes:

| Output | Source | URL |
| --- | --- | --- |
| `ringping.html`, `rankkiwi.html`, `linkedinrank.html`, `aithisweek.html` | `src/config/projects.js` | `/ringping` … |
| `articles/index.html` (searchable list) | every `content/articles/*.md` | `/articles/` |
| `articles/<slug>.html` | `content/articles/<slug>.md` | `/articles/<slug>` |
| `public/sitemap.xml`, `public/feed.xml` | all of the above | |
| "Latest" link in the bottom-left Articles corner of `index.html` | newest article | |

**Write an article:** copy `content/articles/_template.md` to `content/articles/your-url.md`, fill in
`title`, `description`, `date` and `tags`, remove `draft: true`, and run `npm run dev`. Files starting
with `_` are never published. Article images go in `public/articles/images/`.

**Add a project:** add an entry to `src/config/projects.js`, its logo to `public/projects/`, and a row to the
Explore Projects list in `index.html`.

**Theme:** light/dark tokens live in `src/styles/variables.css`; the toggle is `src/ui/theme.js`.

---

## Email list (Google Sheet + Apps Script)

The sign-up box at the end of every article (and on the Articles page) posts to a Google Apps Script web app attached to the
**bhavishyasingla.com** Google Sheet. The code lives in `scripts/newsletter/Code.gs` (a copy of what's in
Extensions → Apps Script). The endpoint URL is `SIGNUP_ENDPOINT` in `scripts/build-pages.js`.

- **Sign-up:** adds a row to `Sheet1`, sends the subscriber a personal thank-you, and emails Bhavishya a notification.
  Duplicates are ignored and bots are filtered (honeypot field + rate limit).
- **Unsubscribe:** people reply to any email; set their **Status** cell to `Unsubscribed`.
- **After editing `Code.gs`:** paste it into Apps Script, then Deploy → Manage deployments → edit → *New version*
  (keeps the same URL).

## Share images

`scripts/og/render.js` draws a 1200×630 preview for every project and article into `public/og/` during the
page build. If an article has `image:` in its frontmatter, the photo appears on the right of its card and at
the top of the article. JPG, PNG or WebP all work.

## Contact form, topics and analytics consent

- **Contact form** (`/contact`): posts to the same Apps Script web app as the email sign-up. `handleContact_` in
  `scripts/newsletter/Code.gs` stores each message in a "Messages" sheet and emails it to you with Reply-To set to
  the sender. If the request fails, the page offers a ready-made email instead, so a message is never lost.
- **Article topics**: every article has exactly one `topic` from `ARTICLE_TOPICS` in `scripts/build-pages.js`
  (the filters on `/articles/`). `keywords` in the frontmatter are for search only and are never shown.
- **Video articles**: `{{youtube id="…" title="…" date="…" duration="PT33S" vertical="true"}}` renders a click-to-play
  card (9:16 for Shorts). Put the frame at `public/articles/images/yt-<id>.webp`. Covers for these articles are drawn by
  `scripts/illustrations/covers.js` (`npm run covers`) with the official logos in `scripts/illustrations/logos/`.
- **Analytics consent**: `public/consent.js` is the only place analytics loads from (home page, generated pages and
  the 3D worlds). It respects Global Privacy Control, asks first in Europe and the UK, and remembers the answer.

## Hero video

One transparent cut-out plays in both themes, so switching theme only changes the page behind it.
`hero-alpha.webm` (VP9 with alpha) is used by Chrome, Firefox and Android; `hero-alpha.mov` (HEVC with alpha)
by Safari and iPhone. A small inline script in `index.html` picks the right file before the page finishes loading.
Desktop files are 1080×1920 and the `-mobile` ones 720×1280. They are cached for a year, so bump `ver` in that
inline script (and the two poster preloads) whenever you replace them.

## Article illustrations

The chibi covers are drawn in code: `scripts/illustrations/chibi.js` is the character and
`scripts/illustrations/covers.js` builds one scene per article (`node scripts/illustrations/covers.js`).
Charts in articles use `{{bars ...}}` and videos use `{{youtube ...}}`; see the comments in `scripts/build-pages.js`.
