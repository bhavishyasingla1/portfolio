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
   ├── /room   ──> Cloned "My Room in 3D" (Webpack 5, Three.js)
   ├── /world  ──> Cloned "Infinite World" (Vite, Three.js procedural terrain)
   └── /folio  ──> Cloned "Folio 2019" (Vite, Three.js physics & car playground)
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
  - Integrated path: `/room`
- **Experience 02 — Infinite World**:
  - Source: [https://github.com/brunosimon/infinite-world](https://github.com/brunosimon/infinite-world)
  - Location: `experiences/infinite-world/`
  - Integrated path: `/world`
- **Experience 03 — Folio 2019**:
  - Source: [https://github.com/brunosimon/folio-2019](https://github.com/brunosimon/folio-2019)
  - Location: `experiences/folio-2019/`
  - Integrated path: `/folio`
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
   - Real HTML `<a>` tags with `href="/room"`, `href="/world"`, `href="/folio"` so Googlebot and web crawlers can discover every experience without executing client JavaScript.
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
