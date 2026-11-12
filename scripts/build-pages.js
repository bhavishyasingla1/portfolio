/**
 * Static Page Generator
 * Runs before `vite dev` and `vite build` (see package.json). It writes:
 *   - <slug>.html              one case-study page per project (src/config/projects.js + case-studies.js) → /ringping
 *   - articles/index.html      searchable article index                          → /articles/
 *   - articles/<slug>.html     one page per Markdown file in content/articles    → /articles/<slug>
 *   - worlds/index.html        the three 3D worlds, with credits                 → /worlds/
 *   - contact.html, privacy.html                                                 → /contact, /privacy
 *   - 404.html
 *   - public/sitemap.xml       every indexable URL
 *   - public/feed.xml          RSS feed of articles
 *   - the "latest article" block in index.html
 * Generated files are committed so the site also works without running this.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'fs';
import { resolve, join, basename } from 'path';
import { Marked, Renderer } from 'marked';
import sharp from 'sharp';
import { PROJECTS } from '../src/config/projects.js';
import { CASE_STUDIES, WORLDS, CONTACT_EMAIL } from '../src/config/case-studies.js';
import { renderProjectOg, renderArticleOg, renderListOg } from './og/render.js';

// Google Apps Script web app that stores sign-ups in the Sheet and sends the emails (scripts/newsletter/Code.gs)
const SIGNUP_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwGv1Vq2Wi0bUmpwCdOrQcVWdPYd2tRq0pKvw7HiwLeBc44mbHoGf1x_ARYcBNIpk-4/exec';

const SITE = 'https://bhavishyasingla.com';
const SITE_UPDATED = '2026-11-12';
const ROOT = resolve();
const ARTICLES_SRC = join(ROOT, 'content', 'articles');
const ARTICLES_OUT = join(ROOT, 'articles');
const SHOTS = JSON.parse(readFileSync(join(ROOT, 'public', 'projects', 'shots', 'manifest.json'), 'utf8'));

// Every article belongs to exactly one of these. They are the filters on /articles/, in this order.
// Add a topic here only when several articles need it: a short list is what keeps it useful.
const ARTICLE_TOPICS = ['AI Tools', 'Claude', 'Video', 'Projects'];

const SOCIALS = [
  ['GitHub', 'https://github.com/bhavishyasingla1'],
  ['LinkedIn', 'https://www.linkedin.com/in/bhavishyasingla1/'],
  ['YouTube', 'https://www.youtube.com/@bhavishyasingla1'],
  ['Instagram', 'https://www.instagram.com/bhavishyasingla1/'],
  ['X', 'https://x.com/Bhavishyas_1']
];

/* ───────────────────────── helpers ───────────────────────── */

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
};
const fmtDateLong = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_LONG[m - 1]} ${y}`;
};

const write = (path, content) => {
  writeFileSync(path, content);
  console.log(`✓ ${path.replace(ROOT + '/', '')}`);
};

/** <img> for a processed product screenshot, with srcset and real dimensions (no layout shift). */
function shotImg(name, { alt = '', sizes = '(max-width: 768px) 100vw, 1088px', eager = false } = {}) {
  const m = SHOTS[name];
  if (!m) throw new Error(`Unknown screenshot "${name}". Run node scripts/shots/process.js`);
  const big = m.files[0];
  const srcset = m.files.map((f) => `${f.src} ${f.w}w`).join(', ');
  return `<img src="${big.src}" srcset="${srcset}" sizes="${sizes}" width="${big.w}" height="${big.h}" alt="${esc(alt)}" ${
    eager ? 'fetchpriority="high"' : 'loading="lazy"'
  } decoding="async" />`;
}

/** A screenshot in a window frame. The image links to the full-size file (opens in the lightbox with JS). */
function shotFrame(name, { alt, title = '', caption = '', label = '', sizes, eager = false, cls = '' } = {}) {
  const m = SHOTS[name];
  const big = m.files[0];
  return `<figure class="shot ${cls}" style="--shot-bg:${m.bg}">
            ${label ? `<div class="shot-bar" aria-hidden="true"><span class="shot-dots"><i></i><i></i><i></i></span><span class="shot-url">${esc(label)}</span></div>` : ''}
            <a class="shot-view" href="${big.src}" data-lightbox data-w="${big.w}" data-h="${big.h}" data-title="${esc(title)}" data-caption="${esc(caption)}" aria-label="Enlarge screenshot: ${esc(title || alt)}">
              ${shotImg(name, { alt, sizes, eager })}
              <span class="shot-zoom" aria-hidden="true"></span>
            </a>
            ${title || caption ? `<figcaption>${title ? `<strong>${esc(title)}</strong>` : ''}${caption ? `<span>${esc(caption)}</span>` : ''}</figcaption>` : ''}
          </figure>`;
}

/* ───────────────────────── shared layout ───────────────────────── */

// Runs before first paint: sets the theme (stored choice, else OS preference) and flags JS.
const THEME_BOOT = `<script>(function(){var d=document.documentElement;d.classList.add('js');var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t})();</script>`;

const THEME_ICON = `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor"/></svg>`;

// Analytics and the consent notice live in public/consent.js (shared with the home page and the 3D worlds).
const ANALYTICS = `<script src="/consent.js" defer></script>`;

// Hovering a link prerenders the next page, so moving around the site feels instant.
// The home page (hero video) and the 3D worlds are only prefetched, never prerendered.
const SPECULATION = `<script type="speculationrules">
  {
    "prerender": [{
      "where": { "and": [
        { "href_matches": "/*" },
        { "not": { "href_matches": "/" } },
        { "not": { "href_matches": "/room/*" } },
        { "not": { "href_matches": "/world/*" } },
        { "not": { "href_matches": "/folio/*" } },
        { "not": { "href_matches": "/*.xml" } },
        { "not": { "selector_matches": "[data-lightbox], [target=_blank]" } }
      ] },
      "eagerness": "moderate"
    }],
    "prefetch": [{ "where": { "href_matches": "/" }, "eagerness": "moderate" }]
  }
  </script>`;

function head({ title, description, canonical, ogType = 'website', image = `${SITE}/og-image.png`, imageAlt = title, jsonld, extra = '', robots = 'index, follow, max-image-preview:large, max-snippet:-1' }) {
  return `  ${THEME_BOOT}
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
${canonical ? `  <link rel="canonical" href="${canonical}" />\n` : ''}  <meta name="robots" content="${robots}" />
  <meta name="author" content="Bhavishya Singla" />

  <meta property="og:type" content="${ogType}" />
${canonical ? `  <meta property="og:url" content="${canonical}" />\n` : ''}  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${esc(imageAlt)}" />
  <meta property="og:site_name" content="Bhavishya Singla" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@Bhavishyas_1" />
  <meta name="twitter:creator" content="@Bhavishyas_1" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:image:alt" content="${esc(imageAlt)}" />
${extra}
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="alternate" type="application/rss+xml" title="Bhavishya Singla — Articles" href="/feed.xml" />
  <meta name="theme-color" content="#f2f2f4" />

  <link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/src/styles/project-page.css" />
  <link rel="stylesheet" href="/src/styles/enhance.css" />
  <script type="module" src="/src/page.js"></script>
  ${ANALYTICS}
  ${SPECULATION}

  <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
  </script>`;
}

const NAV = [
  { key: 'projects', label: 'Projects', href: '/#projects' },
  { key: 'worlds', label: '3D Worlds', href: '/worlds/' },
  { key: 'articles', label: 'Articles', href: '/articles/' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'contact', label: 'Contact', href: '/contact' }
];

function header(active) {
  const links = NAV.map(
    (n) => `<a href="${n.href}" class="site-nav-link"${n.key === active ? ' aria-current="true"' : ''}>${n.label}</a>`
  ).join('\n          ');
  return `    <header class="pp-header">
      <a href="/" class="brand" aria-label="Bhavishya Singla, home">BHAVISHYA SINGLA</a>
      <div class="header-actions">
        <nav class="site-nav" aria-label="Main">
          ${links}
        </nav>
        <button type="button" class="theme-toggle" data-theme-toggle aria-label="Switch theme" aria-pressed="false">${THEME_ICON}</button>
      </div>
    </header>`;
}

const FOOTER = `    <footer class="site-footer">
      <div class="sf-cta">
        <p class="sf-kicker">Got an idea, a question or a project?</p>
        <a class="sf-mail" href="/contact"><span>Say hi</span><span class="sf-mail-arrow" aria-hidden="true">&rarr;</span></a>
        <p class="sf-address"><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a><button type="button" class="share-btn" data-copy="${CONTACT_EMAIL}" data-copied="Copied">Copy</button></p>
      </div>
      <div class="sf-grid">
        <nav class="sf-col" aria-label="Projects">
          <h2 class="pp-label">Projects</h2>
          <ul>
${PROJECTS.map((p) => `            <li><a href="/${p.slug}">${esc(p.name)}</a></li>`).join('\n')}
          </ul>
        </nav>
        <nav class="sf-col" aria-label="3D worlds">
          <h2 class="pp-label">3D worlds</h2>
          <ul>
${WORLDS.map((w) => `            <li><a href="${w.path}">${esc(w.name)}</a></li>`).join('\n')}
            <li><a href="/worlds/">About the worlds</a></li>
          </ul>
        </nav>
        <nav class="sf-col" aria-label="Writing">
          <h2 class="pp-label">Writing</h2>
          <ul>
            <li><a href="/articles/">All articles</a></li>
${ARTICLE_TOPICS.map((t) => `            <li><a href="/articles/?topic=${encodeURIComponent(t)}">${esc(t)}</a></li>`).join('\n')}
            <li><a href="/aithisweek">AI This Week</a></li>
          </ul>
        </nav>
        <nav class="sf-col" aria-label="About this site">
          <h2 class="pp-label">Bhavishya</h2>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/">Home</a></li>
          </ul>
        </nav>
      </div>
      <div class="sf-bottom">
        <a href="/" class="brand">BHAVISHYA SINGLA</a>
        <ul class="social-list">
${SOCIALS.map(([label, url]) => `          <li><a class="social-link" href="${url}" target="_blank" rel="noopener noreferrer me">${label}</a></li>`).join('\n')}
        </ul>
        <p class="pp-copy">&copy; ${SITE_UPDATED.slice(0, 4)} &middot; Figuring things out.</p>
      </div>
    </footer>`;

const document_ = ({ bodyClass, headHtml, content }) => `<!DOCTYPE html>
<!-- Generated by scripts/build-pages.js. Edit the source data, not this file. -->
<html lang="en" dir="ltr">
<head>
${headHtml}
</head>
<body class="project-page ${bodyClass}">
  <div class="grid-background" aria-hidden="true"></div>
  <a class="skip-link" href="#content">Skip to content</a>

  <div class="pp-container">
${content}
${FOOTER}
  </div>
</body>
</html>
`;

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'Bhavishya Singla',
  url: `${SITE}/`,
  image: `${SITE}/bhavishya.png`,
  jobTitle: 'AI Builder & Creative Technologist',
  sameAs: SOCIALS.map(([, url]) => url)
};
const WEBSITE = { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Bhavishya Singla', publisher: { '@id': `${SITE}/#person` } };

const crumbList = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item }))
});

function signupForm(id, source) {
  return `      <section class="signup" aria-labelledby="${id}-title" data-reveal>
        <div class="signup-text">
          <p class="pp-label">Newsletter</p>
          <h2 class="signup-title" id="${id}-title">Stay in the loop.</h2>
          <p class="signup-desc">Join the list for occasional, important updates only. No spam, ever, and you can opt out any time by replying. <a href="/privacy">How your email is used</a>.</p>
        </div>
        <form class="signup-form" data-signup data-source="${esc(source)}" action="${SIGNUP_ENDPOINT}" method="post" novalidate>
          <div class="signup-row">
            <label class="sr-only" for="${id}-email">Email address</label>
            <input id="${id}-email" class="signup-input" type="email" name="email" required autocomplete="email" inputmode="email" placeholder="you@example.com" />
            <input class="signup-hp" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <button class="btn-explore signup-btn" type="submit"><span class="btn-text">SUBSCRIBE</span><span class="btn-arrow" aria-hidden="true">&rarr;</span></button>
          </div>
          <p class="signup-status" role="status" aria-live="polite"></p>
        </form>
      </section>`;
}

function proofStrip(p) {
  const pr = p.proof;
  if (!pr) return '';
  const items = [];
  if (pr.rating) {
    const stars = '★★★★★'.slice(0, Math.round(pr.rating));
    items.push(`<span class="proof-rating"><span class="proof-stars" aria-hidden="true">${stars}</span> <strong>${pr.rating.toFixed(1)}</strong> from ${pr.ratingCount} ratings</span>`);
  }
  if (pr.users) items.push(`<span><strong>${pr.users.toLocaleString('en-US')}</strong> users</span>`);
  if (pr.badge) items.push(`<span><strong>${esc(pr.badge)}</strong></span>`);
  const source = pr.source
    ? `<span class="proof-source">on ${esc(pr.source)}${pr.asOf ? ` &middot; ${fmtDate(pr.asOf)}` : ''}</span>`
    : pr.asOf
      ? `<span class="proof-source">as of ${fmtDate(pr.asOf)}</span>`
      : '';
  return `      <aside class="proof" aria-label="Traction" data-reveal>
        <p class="proof-items">${items.join('<span class="proof-sep" aria-hidden="true"></span>')}${source}</p>
        ${pr.url ? `<a class="proof-link" href="${pr.url}" target="_blank" rel="noopener">${esc(pr.cta || 'See listing')} <span aria-hidden="true">&nearr;</span></a>` : ''}
${pr.quote ? `        <blockquote class="proof-quote"><p>&ldquo;${esc(pr.quote)}&rdquo;</p><cite>Bhavishya Singla, creator of ${esc(p.name)}</cite></blockquote>
` : ''}      </aside>`;
}

/** Article cards used under projects ("Read more") and under articles ("Keep reading"). */
function articleCards(list, label, id) {
  if (!list.length) return '';
  return `      <section class="cards" aria-labelledby="${id}" data-reveal>
        <h2 class="pp-label" id="${id}">${esc(label)}</h2>
        <ul class="cards-grid">
${list
  .map(
    (a) => `          <li>
            <a class="card" href="/articles/${a.slug}">
              ${a.image ? `<span class="card-thumb"><img src="${a.image}" alt="" width="1600" height="840" loading="lazy" decoding="async" /></span>` : ''}
              <span class="card-meta">${esc(a.topic)} &middot; ${a.minutes} min read${a.videos.length ? ' &middot; Video' : ''}</span>
              <span class="card-title">${esc(a.title)}</span>
            </a>
          </li>`
  )
  .join('\n')}
        </ul>
      </section>`;
}

/* ───────────────────────── projects ───────────────────────── */

function projectEntity(p) {
  if (p.schemaType === 'Periodical') {
    return {
      '@type': 'Periodical',
      '@id': `${SITE}/${p.slug}#app`,
      name: p.name,
      url: p.url,
      description: p.summary,
      image: `${SITE}${p.logoPng}`,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      publisher: { '@id': `${SITE}/#person` },
      author: { '@id': `${SITE}/#person` }
    };
  }
  const cs = CASE_STUDIES[p.slug];
  const screenshots = [cs?.lead?.shot, ...(cs?.shots || []).map((s) => s.shot)].filter(Boolean).map((n) => `${SITE}${SHOTS[n].files[0].src}`);
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE}/${p.slug}#app`,
    name: p.name,
    url: p.url,
    sameAs: p.url,
    description: p.summary,
    applicationCategory: p.category,
    operatingSystem: p.os,
    image: `${SITE}${p.logoPng}`,
    ...(screenshots.length ? { screenshot: screenshots } : {}),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(p.proof?.url ? { installUrl: p.proof.url } : {}),
    ...(p.proof?.rating
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.proof.rating, ratingCount: p.proof.ratingCount, bestRating: 5 } }
      : {}),
    author: { '@id': `${SITE}/#person` },
    creator: { '@id': `${SITE}/#person` }
  };
}

function projectPage(p, i, og, articles) {
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const cs = CASE_STUDIES[p.slug] || {};
  const title = `${p.name} — ${p.tagline.replace(/\.$/, '')} | Bhavishya Singla`;
  const canonical = `${SITE}/${p.slug}`;
  const total = String(PROJECTS.length).padStart(2, '0');
  const visitLabel = p.cta || `VISIT ${p.domain.toUpperCase()}`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      projectEntity(p),
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description: p.summary,
        inLanguage: 'en-US',
        dateModified: `${SITE_UPDATED}T00:00:00+00:00`,
        about: { '@id': `${canonical}#app` },
        isPartOf: { '@id': `${SITE}/#website` },
        ...(cs.lead ? { primaryImageOfPage: `${SITE}${SHOTS[cs.lead.shot].files[0].src}` } : {})
      },
      PERSON,
      crumbList([
        ['Home', `${SITE}/`],
        ['Projects', `${SITE}/#projects`],
        [p.name, canonical]
      ])
    ]
  };

  const facts = p.facts
    .map(([k, v]) => `        <div class="pp-fact"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
    .join('\n');

  const features = p.features
    .map(
      ([t, d], n) => `          <li class="pp-feature" data-reveal>
            <span class="pp-feature-num">${String(n + 1).padStart(2, '0')}</span>
            <h3 class="pp-feature-title">${esc(t)}</h3>
            <p class="pp-feature-desc">${esc(d)}</p>
          </li>`
    )
    .join('\n');

  const lead = cs.lead
    ? `      <section class="cs-lead" aria-label="${esc(p.name)} screenshot" data-reveal>
          ${shotFrame(cs.lead.shot, { alt: cs.lead.alt, title: p.name, caption: cs.lead.caption, label: p.domain, eager: true, cls: 'is-lead' })}
      </section>\n`
    : '';

  const why = cs.why
    ? `      <section class="cs-why" aria-labelledby="cs-why-title">
        <p class="pp-label" data-reveal>Why it exists</p>
        <div class="cs-why-body" data-reveal>
          <h2 class="cs-h2" id="cs-why-title">${esc(cs.why.title)}</h2>
${cs.why.paras.map((t) => `          <p>${esc(t)}</p>`).join('\n')}
        </div>
      </section>\n`
    : '';

  const steps = cs.steps
    ? `      <section class="cs-how${cs.phone ? ' has-phone' : ''}" aria-labelledby="cs-how-title">
        <div class="cs-how-main">
          <h2 class="pp-label" id="cs-how-title" data-reveal>How it works</h2>
          <ol class="cs-steps">
${cs.steps
  .map(
    ([t, d], n) => `            <li class="cs-step" data-reveal>
              <span class="cs-step-num" aria-hidden="true">${n + 1}</span>
              <h3>${esc(t)}</h3>
              <p>${esc(d)}</p>
            </li>`
  )
  .join('\n')}
          </ol>
        </div>
${cs.phone ? `        <figure class="phone" data-reveal>
          <a class="phone-screen" href="${SHOTS[cs.phone.shot].files[0].src}" data-lightbox data-w="${SHOTS[cs.phone.shot].files[0].w}" data-h="${SHOTS[cs.phone.shot].files[0].h}" data-title="${esc(p.name)} on a phone" aria-label="Enlarge phone screenshot">
            ${shotImg(cs.phone.shot, { alt: cs.phone.alt, sizes: '(max-width: 768px) 60vw, 256px' })}
          </a>
        </figure>\n` : ''}      </section>\n`
    : '';

  const gallery = cs.shots?.length
    ? `      <section class="cs-gallery" aria-labelledby="cs-gallery-title">
        <div class="pp-section-head" data-reveal>
          <h2 class="pp-label" id="cs-gallery-title">Inside the product</h2>
          <p class="pp-audience">Real screens from ${esc(p.domain)}, captured ${fmtDateLong(cs.captured)}. Select any one to enlarge it.</p>
        </div>
        <div class="cs-shots">
${cs.shots
  .map((s) => `          <div class="cs-shot" data-reveal>${shotFrame(s.shot, { alt: s.alt, title: s.title, caption: s.caption, sizes: '(max-width: 768px) 100vw, 512px' })}</div>`)
  .join('\n')}
        </div>
      </section>\n`
    : '';

  const editions = cs.editions?.length
    ? `      <section class="cs-editions" aria-labelledby="cs-editions-title">
        <div class="pp-section-head" data-reveal>
          <h2 class="pp-label" id="cs-editions-title">Recent editions</h2>
          <p class="pp-audience">${esc(cs.editionsNote || '')} Each one opens on LinkedIn.</p>
        </div>
        <ul class="ed-grid">
${cs.editions
  .map(
    (e) => `          <li data-reveal>
            <a class="ed" href="${e.url}" target="_blank" rel="noopener">
              <span class="ed-cover">${shotImg(e.shot, { alt: '', sizes: '(max-width: 768px) 50vw, 256px' })}</span>
              <span class="ed-title">${esc(e.title)}</span>
            </a>
          </li>`
  )
  .join('\n')}
        </ul>
      </section>\n`
    : '';

  const decisions = cs.decisions?.length
    ? `      <section class="cs-decisions${cs.tall ? ' has-tall' : ''}" aria-labelledby="cs-decisions-title">
${cs.tall ? `        <div class="cs-tall" data-reveal>${shotFrame(cs.tall.shot, { alt: cs.tall.alt, title: p.name, caption: cs.tall.caption, label: 'linkedin.com', sizes: '(max-width: 768px) 100vw, 384px', cls: 'is-tall' })}</div>\n` : ''}        <div class="cs-decisions-main">
          <h2 class="pp-label" id="cs-decisions-title" data-reveal>Decisions that shaped it</h2>
          <dl class="cs-dl">
${cs.decisions.map(([t, d]) => `            <div class="cs-decision" data-reveal><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('\n')}
          </dl>
        </div>
      </section>\n`
    : '';

  const related = articleCards(
    (cs.related || []).map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean),
    `Writing about ${p.name}`,
    'cs-related-title'
  );

  const content = `${header('projects')}

    <main id="content">
      <section class="pp-hero" aria-labelledby="pp-title">
        <div class="pp-hero-text">
          <p class="pp-eyebrow" data-enter="1"><span>${esc(p.num)}</span> &mdash; ${esc(p.tag)}</p>
          <h1 class="pp-title" id="pp-title" aria-label="${esc(p.name)}">
            ${p.headline.map((l, n) => `<span class="headline-line" aria-hidden="true" data-enter="${n + 2}">${esc(l)}</span>`).join(' ')}
          </h1>
          <p class="pp-tagline" data-enter="4">${esc(p.tagline)}</p>
          <p class="pp-summary" data-enter="5">${esc(p.summary)}</p>
          <div class="pp-actions" data-enter="6">
            <a href="${p.url}" class="btn-explore pp-visit" target="_blank" rel="noopener">
              <span class="btn-text">${esc(visitLabel)}</span>
              <span class="btn-arrow" aria-hidden="true">&nearr;</span>
            </a>
            <a href="/#projects" class="pp-back">&larr; ALL PROJECTS</a>
          </div>
        </div>
        <figure class="pp-logo-tile${p.logoCover ? ' is-cover' : ''}" data-enter="3">
          <img src="${p.logo}" width="320" height="320" alt="${esc(p.name)} logo" fetchpriority="high" />
          <figcaption>${esc(p.domain)}</figcaption>
        </figure>
      </section>

${proofStrip(p)}

      <dl class="pp-facts" data-reveal>
${facts}
      </dl>

${lead}${why}${steps}
      <section class="pp-section" aria-labelledby="pp-features-title">
        <div class="pp-section-head" data-reveal>
          <h2 class="pp-label" id="pp-features-title">${esc(p.featuresLabel || 'What it does')}</h2>
          <p class="pp-audience"><strong>Built for</strong> ${esc(p.audience)}</p>
        </div>
        <ol class="pp-features">
${features}
        </ol>
${p.note ? `        <p class="pp-note">${esc(p.note)}</p>\n` : ''}      </section>

${gallery}${editions}${decisions}${related}
      <section class="cs-cta" aria-label="Try ${esc(p.name)}" data-reveal>
        <p class="cs-cta-line">${esc(p.tagline)}</p>
        <a href="${p.proof?.url || p.url}" class="btn-explore pp-visit" target="_blank" rel="noopener">
          <span class="btn-text">${esc((p.proof?.cta || visitLabel).toUpperCase())}</span>
          <span class="btn-arrow" aria-hidden="true">&nearr;</span>
        </a>
      </section>

      <nav class="pp-next" aria-label="Next project" data-reveal>
        <a href="/${next.slug}" class="pp-next-link">
          <span class="pp-label">Next project</span>
          <span class="pp-next-title"><span class="exp-num">${esc(next.num)}</span> ${esc(next.name.toUpperCase())}</span>
          <span class="exp-arrow" aria-hidden="true">&rarr;</span>
        </a>
      </nav>
    </main>`;

  return document_({
    bodyClass: 'is-project',
    headHtml: head({ title, description: p.summary, canonical, jsonld, image: `${SITE}${og}`, imageAlt: `${p.name}: ${p.tagline}` }),
    content
  });
}

/* ───────────────────────── articles ───────────────────────── */

function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing --- frontmatter ---`);
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!kv) continue;
    let [, k, v] = kv;
    v = v.trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    data[k] = v;
  }
  for (const req of ['title', 'description', 'date']) {
    if (!data[req]) throw new Error(`${file}: frontmatter needs "${req}"`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error(`${file}: date must be YYYY-MM-DD`);
  return { data, body: m[2] };
}

function makeMarked(toc, sizes = {}) {
  const marked = new Marked({ gfm: true });
  const used = new Set();
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        let id = slugify(text) || 'section';
        while (used.has(id)) id += '-';
        used.add(id);
        if (depth === 2) toc.push({ id, text });
        const level = Math.min(Math.max(depth, 2), 4); // the page owns the only <h1>
        // The "#" sits after the text and is hidden from assistive tech, so the heading reads cleanly everywhere
        return `<h${level} id="${id}">${text}<a class="heading-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a></h${level}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.startsWith(SITE);
        const t = title ? ` title="${esc(title)}"` : '';
        return external
          ? `<a href="${esc(href)}"${t} target="_blank" rel="noopener">${text}</a>`
          : `<a href="${esc(href)}"${t}>${text}</a>`;
      },
      image({ href, title, text }) {
        const cap = title ? `<figcaption>${esc(title)}</figcaption>` : '';
        // Real dimensions stop the page jumping as images load (better Core Web Vitals)
        const s = sizes[href];
        const dims = s ? ` width="${s.width}" height="${s.height}"` : '';
        const zoom = s ? ` data-lightbox data-w="${s.width}" data-h="${s.height}" data-title="${esc(title || text)}"` : '';
        return `<figure><a class="prose-zoom" href="${esc(href)}"${zoom} aria-label="Enlarge image: ${esc(text)}"><img src="${esc(href)}" alt="${esc(text)}"${dims} loading="lazy" decoding="async" /></a>${cap}</figure>`;
      },
      table(token) {
        // Wrap tables so they scroll sideways on phones instead of breaking the layout
        return `<div class="table-scroll">${Renderer.prototype.table.call(this, token)}</div>`;
      }
    }
  });
  return marked;
}

/**
 * Horizontal bar charts in Markdown, on a line of their own:
 *   {{bars title="Cost per video" data="Haiku:5.83,Sonnet:28.59,Opus:92" prefix="₹" suffix="" decimals="2" note="..."}}
 * One measure per chart (no dual axes), HTML bars in ink colour so they follow light/dark theme
 * and keep readable text on phones, values labelled at the bar end, hover titles, aria-label.
 * Always pair a chart with a Markdown table of the same numbers.
 */
function renderBars(body) {
  return body.replace(/^\{\{bars\s+([^}]*)\}\}\s*$/gm, (_, attrs) => {
    const get = (k, d = '') => (attrs.match(new RegExp(`${k}="([^"]*)"`)) || [])[1] ?? d;
    const title = get('title');
    const prefix = get('prefix');
    const suffix = get('suffix');
    const decimals = Number(get('decimals', '0'));
    const note = get('note');
    const rows = get('data')
      .split(',')
      .map((pair) => {
        const i = pair.lastIndexOf(':');
        return { label: pair.slice(0, i).trim(), value: Number(pair.slice(i + 1)) };
      });
    const max = Math.max(...rows.map((r) => r.value));
    const fmt = (v) => `${prefix}${v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
    const summary = `${title}: ${rows.map((r) => `${r.label} ${fmt(r.value)}`).join(', ')}`;
    const bars = rows
      .map(
        (r) => `<div class="chart-row" title="${esc(r.label)}: ${esc(fmt(r.value))}">
<span class="chart-label">${esc(r.label)}</span>
<span class="chart-track"><span class="chart-bar" style="--r:${(r.value / max).toFixed(4)}"></span><span class="chart-value">${esc(fmt(r.value))}</span></span>
</div>`
      )
      .join('\n');
    return `\n<figure class="chart" data-reveal>
<figcaption class="chart-title">${esc(title)}</figcaption>
<div class="chart-rows" role="img" aria-label="${esc(summary)}">
${bars}
</div>
${note ? `<p class="chart-note">${esc(note)}</p>` : ''}
</figure>\n`;
  });
}

/**
 * YouTube embeds in Markdown, on a line of their own:
 *   {{youtube id="pNG_sWsy4s0" title="Video title" date="2026-11-05" duration="PT36S"}}
 * Renders a click-to-play poster (no YouTube scripts until pressed) and adds a VideoObject
 * to the article's structured data. Put a thumbnail at public/articles/images/yt-<id>.webp.
 */
function extractVideos(body) {
  const videos = [];
  const out = body.replace(/^\{\{youtube\s+([^}]*)\}\}\s*$/gm, (_, attrs) => {
    const get = (k) => (attrs.match(new RegExp(`${k}="([^"]*)"`)) || [])[1] || '';
    const v = { id: get('id'), title: get('title'), date: get('date'), duration: get('duration'), vertical: get('vertical') === 'true' };
    if (!/^[\w-]{11}$/.test(v.id)) throw new Error(`Bad YouTube id: ${v.id}`);
    videos.push(v);
    const thumb = existsSync(join(ROOT, 'public', 'articles', 'images', `yt-${v.id}.webp`))
      ? `/articles/images/yt-${v.id}.webp`
      : `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
    v.thumb = thumb;
    // "PT1M18S" → "1:18"
    const d = v.duration.match(/^PT(?:(\d+)M)?(?:(\d+)S)?$/);
    const length = d ? `${Number(d[1] || 0)}:${String(d[2] || 0).padStart(2, '0')}` : '';
    const day = v.date ? fmtDate(v.date.slice(0, 10)) : '';
    const watch = v.vertical ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;
    const [w, h] = v.vertical ? [720, 1280] : [1280, 720];
    return `\n<figure class="yt${v.vertical ? ' is-vertical' : ''}" data-yt="${v.id}">
<div class="yt-frame"><button class="yt-play" type="button" aria-label="Play video: ${esc(v.title)}"><img src="${thumb}" alt="" width="${w}" height="${h}" loading="lazy" decoding="async" /><span class="yt-icon" aria-hidden="true"></span></button></div>
<figcaption><span class="yt-kicker">${v.vertical ? 'YouTube Short' : 'YouTube'}${length ? ` &middot; ${length}` : ''}${day ? ` &middot; ${day}` : ''}</span><strong class="yt-title">${esc(v.title)}</strong><a class="yt-open" href="${watch}" target="_blank" rel="noopener">Watch on YouTube <span aria-hidden="true">&nearr;</span></a></figcaption>
</figure>\n`;
  });
  return { body: out, videos };
}

async function imageSizes(body) {
  const sizes = {};
  for (const [, src] of body.matchAll(/!\[[^\]]*\]\((\/[^\s)]+)/g)) {
    const file = join(ROOT, 'public', src.replace(/^\//, ''));
    if (existsSync(file)) {
      const { width, height } = await sharp(file).metadata();
      sizes[src] = { width, height };
    } else {
      console.warn(`! image not found: public${src}`);
    }
  }
  return sizes;
}

async function loadArticles() {
  if (!existsSync(ARTICLES_SRC)) return [];
  const files = readdirSync(ARTICLES_SRC).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  const sizeMaps = {};
  for (const f of files) sizeMaps[f] = await imageSizes(readFileSync(join(ARTICLES_SRC, f), 'utf8'));
  return files
    .map((f) => {
      const raw = readFileSync(join(ARTICLES_SRC, f), 'utf8');
      const { data, body } = parseFrontmatter(raw, f);
      if (data.draft === 'true') return null;
      const toc = [];
      const { body: mdBody, videos } = extractVideos(renderBars(body));
      const html = makeMarked(toc, sizeMaps[f]).parse(mdBody);
      const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
      const tags = Array.isArray(data.keywords) ? data.keywords : data.keywords ? [data.keywords] : [];
      if (!ARTICLE_TOPICS.includes(data.topic)) throw new Error(`${f}: topic must be one of ${ARTICLE_TOPICS.join(', ')}`);
      // Projects this article links to, shown as "Mentioned in this article"
      const mentions = PROJECTS.filter((p) => new RegExp(`href="/${p.slug}"`).test(html));
      return {
        slug: basename(f, '.md'),
        title: data.title,
        description: data.description,
        date: data.date,
        updated: data.updated || data.date,
        tags,
        topic: data.topic,
        weight: Number(data.weight || 0),
        image: data.image,
        imageAlt: data.image_alt,
        seoTitle: data.seo_title,
        dateLabel: fmtDate(data.date),
        videos,
        html,
        toc,
        words,
        mentions,
        minutes: Math.max(1, Math.round(words / 220))
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.weight - a.weight || a.title.localeCompare(b.title)));
}

/** Other articles: the same topic first, then shared keywords, then the newest. */
function relatedArticles(a, all, n = 2) {
  return all
    .filter((o) => o.slug !== a.slug)
    .map((o) => ({ o, score: (o.topic === a.topic ? 10 : 0) + o.tags.filter((t) => a.tags.includes(t)).length }))
    .sort((x, y) => y.score - x.score || (x.o.date < y.o.date ? 1 : -1))
    .slice(0, n)
    .map((x) => x.o);
}

const AUTHOR_BOX = `      <aside class="author" aria-label="About the author" data-reveal>
        <img class="author-photo" src="/bhavishya.webp" alt="Bhavishya Singla" width="96" height="96" loading="lazy" decoding="async" />
        <div class="author-text">
          <p class="pp-label">Written by</p>
          <p class="author-name">Bhavishya Singla</p>
          <p class="author-bio">I build AI products and write about what I learn on the way: <a href="/ringping">Ring Ping</a>, <a href="/rankkiwi">Rank Kiwi</a>, <a href="/linkedinrank">LinkedInRank</a> and the weekly newsletter <a href="/aithisweek">AI This Week</a>.</p>
          <p class="author-links"><a href="/about">About me</a><a href="/contact">Get in touch</a><a href="https://www.linkedin.com/in/bhavishyasingla1/" target="_blank" rel="noopener me">LinkedIn</a><a href="https://x.com/Bhavishyas_1" target="_blank" rel="noopener me">X</a></p>
        </div>
      </aside>`;

function articlePage(a, i, all) {
  const canonical = `${SITE}/articles/${a.slug}`;
  const image = `${SITE}${a.og}`;
  const cover = a.image ? (a.image.startsWith('http') ? a.image : `${SITE}${a.image}`) : null;
  // Search results show ~60 characters: prefer a short seo_title, add the name only if it fits
  const base = a.seoTitle || a.title;
  const title = base.length + 19 <= 65 ? `${base} | Bhavishya Singla` : base;
  const shareText = encodeURIComponent(a.title);
  const shareUrl = encodeURIComponent(canonical);

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonical}#article`,
        headline: a.title,
        description: a.description,
        datePublished: `${a.date}T00:00:00+00:00`,
        dateModified: `${a.updated}T00:00:00+00:00`,
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#person` },
        mainEntityOfPage: canonical,
        url: canonical,
        image: cover ? [image, cover] : image,
        keywords: a.tags.join(', '),
        articleSection: a.topic,
        wordCount: a.words,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE}/articles/#blog` },
        ...(a.mentions.length ? { mentions: a.mentions.map((p) => ({ '@id': `${SITE}/${p.slug}#app` })) } : {})
      },
      PERSON,
      ...a.videos.map((v) => ({
        '@type': 'VideoObject',
        name: v.title,
        description: v.title,
        thumbnailUrl: v.thumb.startsWith('http') ? v.thumb : `${SITE}${v.thumb}`,
        ...(v.date ? { uploadDate: v.date } : {}),
        ...(v.duration ? { duration: v.duration } : {}),
        contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
        author: { '@id': `${SITE}/#person` }
      })),
      crumbList([
        ['Home', `${SITE}/`],
        ['Articles', `${SITE}/articles/`],
        [a.title, canonical]
      ])
    ]
  };

  const extra = `  <meta property="article:published_time" content="${a.date}T00:00:00+00:00" />
  <meta property="article:modified_time" content="${a.updated}T00:00:00+00:00" />
  <meta property="article:author" content="${SITE}/about" />
  <meta property="article:section" content="${esc(a.topic)}" />
${a.tags.map((t) => `  <meta property="article:tag" content="${esc(t)}" />`).join('\n')}
${a.image && !a.videos.length ? `  <link rel="preload" as="image" href="${a.image}" fetchpriority="high" />` : ''}`;

  const toc = a.toc.length
    ? `            <nav class="ar-toc" aria-label="On this page">
              <p class="pp-label">On this page</p>
              <ol>
${a.toc.map((t) => `                <li><a href="#${t.id}">${t.text}</a></li>`).join('\n')}
              </ol>
            </nav>`
    : '';

  const mentions = a.mentions.length
    ? `        <aside class="ar-mentions" aria-label="Projects mentioned in this article" data-reveal>
          <p class="pp-label">Mentioned in this article</p>
          <ul>
${a.mentions.map((p) => `            <li><a class="mention" href="/${p.slug}"><img src="${p.logo}" alt="" width="40" height="40" loading="lazy" decoding="async" /><span><strong>${esc(p.name)}</strong>${esc(p.tagline)}</span><span class="exp-arrow" aria-hidden="true">&rarr;</span></a></li>`).join('\n')}
          </ul>
        </aside>`
    : '';

  const content = `    <div class="read-progress" aria-hidden="true"><span></span></div>
${header('articles')}

    <main id="content">
      <article class="ar" aria-labelledby="ar-title">
        <header class="ar-head">
          <h1 class="ar-title" id="ar-title" data-enter="2">${esc(a.title)}</h1>
          <p class="ar-lead" data-enter="3">${esc(a.description)}</p>
          <div class="ar-byline" data-enter="4">
            <img src="/bhavishya.webp" alt="" width="40" height="40" decoding="async" />
            <p><a href="/about" rel="author">Bhavishya Singla</a><span><time datetime="${a.date}">${fmtDateLong(a.date)}</time> &middot; ${a.minutes} min read${a.updated !== a.date ? ` &middot; Updated <time datetime="${a.updated}">${fmtDateLong(a.updated)}</time>` : ''}</span></p>
            <div class="ar-share" aria-label="Share this article">
              <button type="button" class="share-btn" data-copy="${canonical}" data-copied="Copied">Copy link</button>
              <a class="share-btn" href="https://x.com/intent/post?text=${shareText}&amp;url=${shareUrl}" target="_blank" rel="noopener">Share on X</a>
              <a class="share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener">LinkedIn</a>
            </div>
          </div>
        </header>

        <div class="ar-layout">
          <aside class="ar-rail">
${toc}
            <p class="ar-topic"><span class="pp-label">Topic</span><a href="/articles/?topic=${encodeURIComponent(a.topic)}">${esc(a.topic)} <span aria-hidden="true">&rarr;</span></a></p>
            <a class="pp-back" href="/articles/">&larr; ALL ARTICLES</a>
          </aside>
          <div class="prose" data-enter="5">
${a.image && !a.videos.length ? `<figure class="ar-cover"><img src="${a.image}" alt="${esc(a.imageAlt || a.title)}" width="1600" height="840" fetchpriority="high" />${a.imageAlt ? `<figcaption>${esc(a.imageAlt)}</figcaption>` : ''}</figure>
` : ''}${a.html}
          </div>
        </div>
      </article>

${mentions}
${AUTHOR_BOX}

${signupForm('signup-article', `/articles/${a.slug}`)}

${articleCards(relatedArticles(a, all), 'Keep reading', 'ar-more-title')}
    </main>`;

  return document_({
    bodyClass: 'is-article',
    headHtml: head({ title, description: a.description, canonical, ogType: 'article', image, imageAlt: a.title, jsonld, extra }),
    content
  });
}

function articlesIndex(all, og) {
  const canonical = `${SITE}/articles/`;
  const title = 'Articles & Guides by Bhavishya Singla — AI, Building & the Web';
  const description =
    'Guides, experiments and the videos behind them: AI tools, Claude, AI video and the projects Bhavishya Singla is building.';

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE}/articles/#blog`,
        url: canonical,
        name: 'Articles by Bhavishya Singla',
        description,
        inLanguage: 'en-US',
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#person` },
        blogPost: all.map((a) => ({
          '@type': 'BlogPosting',
          '@id': `${SITE}/articles/${a.slug}#article`,
          headline: a.title,
          url: `${SITE}/articles/${a.slug}`,
          datePublished: `${a.date}T00:00:00+00:00`,
          description: a.description
        }))
      },
      WEBSITE,
      PERSON,
      crumbList([
        ['Home', `${SITE}/`],
        ['Articles', canonical]
      ])
    ]
  };

  // Topics filter the list in place (no extra URLs for crawlers to chase)
  const topics = ARTICLE_TOPICS.map((t) => [t, all.filter((a) => a.topic === t).length]).filter(([, n]) => n);

  const rows = all
    .map(
      (a, n) => `          <li class="al-item${n === 0 ? ' is-featured' : ''}" data-topic="${esc(a.topic)}" data-search="${esc([a.title, a.description, a.topic, ...a.tags].join(' ').toLowerCase())}">
            <a class="al-link" href="/articles/${a.slug}">
              ${a.image ? `<span class="al-thumb"><img src="${a.image}" alt="" width="1600" height="840" ${n === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />${a.videos.length ? '<span class="al-play" aria-hidden="true"></span>' : ''}</span>` : '<span class="al-thumb is-empty"></span>'}
              <span class="al-main">
                <span class="al-date">${n === 0 ? '<span class="al-new">Latest</span>' : ''}<span class="al-topic">${esc(a.topic)}</span><time datetime="${a.date}">${fmtDate(a.date)}</time></span>
                <span class="al-title">${esc(a.title)}</span>
                <span class="al-desc">${esc(a.description)}</span>
              </span>
              <span class="al-meta"><span>${a.minutes} MIN READ</span>${a.videos.length ? '<span>+ VIDEO</span>' : ''}</span>
              <span class="exp-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>`
    )
    .join('\n');

  const content = `${header('articles')}

    <main id="content">
      <section class="al-hero" aria-labelledby="al-title">
        <p class="pp-eyebrow" data-enter="1"><span>${String(all.length).padStart(2, '0')}</span> &mdash; Guides, experiments &amp; the videos behind them</p>
        <h1 class="pp-title" id="al-title"><span class="headline-line" data-enter="2">ARTICLES.</span></h1>
        <form class="al-search" role="search" action="/articles/" data-enter="3">
          <label class="sr-only" for="article-search">Search articles</label>
          <input id="article-search" name="q" type="search" placeholder="Search articles" autocomplete="off" spellcheck="false" />
          <kbd class="al-kbd" aria-hidden="true">/</kbd>
        </form>
        <div class="al-topics" data-enter="4" role="group" aria-label="Filter by topic">
          <button type="button" class="al-chip is-active" data-topic="" aria-pressed="true">All<span>${all.length}</span></button>
${topics.map(([t, n]) => `          <button type="button" class="al-chip" data-topic="${esc(t)}" aria-pressed="false">${esc(t)}<span>${n}</span></button>`).join('\n')}
        </div>
      </section>

      <ol class="al-list" id="article-list" data-enter="5">
${rows}
      </ol>
      <p class="al-empty" id="article-empty" hidden>Nothing matches <strong></strong>. <button type="button" class="al-reset">Show all articles</button></p>

${signupForm('signup-index', '/articles/')}
    </main>`;

  return document_({
    bodyClass: 'is-articles',
    headHtml: head({ title, description, canonical, jsonld, image: `${SITE}${og}`, imageAlt: 'Articles by Bhavishya Singla' }),
    content
  });
}

/* ───────────────────────── 3D worlds ───────────────────────── */

function worldsPage(og) {
  const canonical = `${SITE}/worlds/`;
  const title = '3D Worlds — Three Explorable WebGL Experiences | Bhavishya Singla';
  const description =
    'Three 3D worlds you can explore in the browser: a room, an endless landscape and a car playground. Built on Bruno Simon’s open-source Three.js projects and remixed by Bhavishya Singla.';

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: 'en-US',
        dateModified: `${SITE_UPDATED}T00:00:00+00:00`,
        isPartOf: { '@id': `${SITE}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: WORLDS.length,
          itemListElement: WORLDS.map((w, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'WebApplication',
              '@id': `${SITE}${w.path}#app`,
              name: w.full,
              url: `${SITE}${w.path}`,
              description: w.summary,
              image: `${SITE}${w.image}`,
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'All',
              browserRequirements: 'Requires WebGL and JavaScript.',
              isBasedOn: w.original.url,
              creator: { '@type': 'Person', name: 'Bruno Simon', url: 'https://bruno-simon.com/' },
              contributor: { '@id': `${SITE}/#person` },
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
            }
          }))
        }
      },
      PERSON,
      crumbList([
        ['Home', `${SITE}/`],
        ['3D Worlds', canonical]
      ])
    ]
  };

  const worlds = WORLDS.map(
    (w, i) => `        <article class="world${i % 2 ? ' is-flipped' : ''}" aria-labelledby="world-${w.id}" data-reveal>
          <a class="world-shot" href="${w.path}" aria-label="Open ${esc(w.full)}">
            <img src="${w.image}" alt="${esc(w.alt)}" width="1600" height="840" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />
            <span class="world-enter" aria-hidden="true"><span>ENTER</span><span>&rarr;</span></span>
          </a>
          <div class="world-text">
            <p class="pp-eyebrow"><span>${w.num}</span> &mdash; ${esc(w.kind)}</p>
            <h2 class="world-title" id="world-${w.id}">${esc(w.name.toUpperCase())}</h2>
            <p class="world-summary">${esc(w.summary)}</p>
            <dl class="world-facts">
              <div><dt>Controls</dt><dd>${esc(w.controls)}</dd></div>
              <div><dt>Good to know</dt><dd>${esc(w.best)}</dd></div>
              <div><dt>What I changed</dt><dd><ul>${w.changes.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></dd></div>
              <div><dt>Original</dt><dd><a href="${w.original.url}" target="_blank" rel="noopener">${esc(w.original.name)}</a> by Bruno Simon${w.original.license ? ` (${esc(w.original.license)} licence)` : ''}</dd></div>
            </dl>
            <a href="${w.path}" class="btn-explore pp-visit world-btn">
              <span class="btn-text">ENTER ${esc(w.name.toUpperCase())}</span>
              <span class="btn-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </article>`
  ).join('\n');

  const content = `${header('worlds')}

    <main id="content">
      <section class="al-hero wl-hero" aria-labelledby="wl-title">
        <p class="pp-eyebrow" data-enter="1"><span>03</span> &mdash; Explorable in your browser</p>
        <h1 class="pp-title" id="wl-title"><span class="headline-line" data-enter="2">3D WORLDS.</span></h1>
        <p class="pp-summary" data-enter="3">A room, an endless landscape and a car playground. Nothing to install: each one runs in the browser with WebGL.</p>
      </section>

      <div class="worlds">
${worlds}
      </div>

      <section class="cs-why wl-credit" aria-labelledby="wl-credit-title">
        <p class="pp-label" data-reveal>Credit</p>
        <div class="cs-why-body" data-reveal>
          <h2 class="cs-h2" id="wl-credit-title">These worlds started as Bruno Simon&rsquo;s open-source work.</h2>
          <p><a href="https://bruno-simon.com/" target="_blank" rel="noopener">Bruno Simon</a> is one of the best creative developers on the web and the teacher behind <a href="https://threejs-journey.com/" target="_blank" rel="noopener">Three.js Journey</a>. He publishes the source of several projects, and all three worlds here are built on them. I changed them to make them mine, and the list under each world says how.</p>
          <p>The full story, including how AI tools helped me find my way around a codebase I did not write, is in <a href="/articles/bruno-simon-3d-worlds-portfolio">How I turned Bruno Simon&rsquo;s open-source 3D worlds into my portfolio</a>.</p>
        </div>
      </section>
    </main>`;

  return document_({
    bodyClass: 'is-worlds',
    headHtml: head({ title, description, canonical, jsonld, image: `${SITE}${og}`, imageAlt: '3D Worlds by Bhavishya Singla' }),
    content
  });
}

/* ───────────────────────── contact & privacy ───────────────────────── */

function contactPage(og) {
  const canonical = `${SITE}/contact`;
  const title = 'Contact Bhavishya Singla';
  const description = `Send Bhavishya Singla a message, or email ${CONTACT_EMAIL}, to work together, ask about Ring Ping, Rank Kiwi or LinkedInRank, or just say hi.`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE}/#website` },
        mainEntity: { '@id': `${SITE}/#person` }
      },
      { ...PERSON, email: `mailto:${CONTACT_EMAIL}` },
      crumbList([
        ['Home', `${SITE}/`],
        ['Contact', canonical]
      ])
    ]
  };

  // value is what lands in my inbox as the subject; hint changes the message placeholder
  const topics = [
    ['Work together', 'A project, a collaboration or a role you think I would fit.'],
    ['Something I built', 'Feedback, a bug or an idea for Ring Ping, Rank Kiwi or LinkedInRank.'],
    ['Writing or videos', 'A reply to AI This Week, a correction, or a topic you want covered.'],
    ['Just saying hi', 'No reason needed.']
  ];

  const content = `${header('contact')}

    <main id="content">
      <section class="ct-hero" aria-labelledby="ct-title">
        <p class="pp-eyebrow" data-enter="1"><span>Contact</span> &mdash; I read everything</p>
        <h1 class="pp-title" id="ct-title"><span class="headline-line" data-enter="2">SAY HI.</span></h1>
        <p class="pp-summary" data-enter="3">Send a message with the form, or email me directly. A few lines about who you are and what you need is all it takes.</p>
      </section>

      <div class="ct-grid" data-enter="4">
        <form class="ct-form" data-contact action="${SIGNUP_ENDPOINT}" method="post" novalidate aria-labelledby="ct-form-title">
          <h2 class="pp-label" id="ct-form-title">Send a message</h2>
          <input type="hidden" name="type" value="contact" />

          <fieldset class="ct-topics">
            <legend>What is it about?</legend>
            <div class="ct-topic-list">
${topics
  .map(
    ([t, hint], i) => `              <label class="ct-topic">
                <input type="radio" name="topic" value="${esc(t)}" data-hint="${esc(hint)}"${i === 0 ? ' checked' : ''} />
                <span>${esc(t)}</span>
              </label>`
  )
  .join('\n')}
            </div>
          </fieldset>

          <div class="ct-row">
            <label class="ct-field">
              <span>Your name</span>
              <input type="text" name="name" required maxlength="100" autocomplete="name" />
            </label>
            <label class="ct-field">
              <span>Your email</span>
              <input type="email" name="email" required maxlength="254" autocomplete="email" inputmode="email" placeholder="you@example.com" />
            </label>
          </div>

          <label class="ct-field">
            <span>Message</span>
            <textarea name="message" required minlength="10" maxlength="4000" rows="7" placeholder="${esc(topics[0][1])}"></textarea>
          </label>
          <input class="signup-hp" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" />

          <div class="ct-send">
            <button class="btn-explore ct-submit" type="submit"><span class="btn-text">SEND MESSAGE</span><span class="btn-arrow" aria-hidden="true">&rarr;</span></button>
            <p class="ct-note">Goes straight to my inbox. I reply by email. <a href="/privacy#contact-form">What happens to your message</a>.</p>
          </div>
          <p class="ct-status" role="status" aria-live="polite"></p>
        </form>

        <aside class="ct-direct" aria-labelledby="ct-direct-title">
          <h2 class="pp-label" id="ct-direct-title">Or email me directly</h2>
          <a class="ct-address" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
          <div class="ct-actions">
            <button type="button" class="share-btn" data-copy="${CONTACT_EMAIL}" data-copied="Copied">Copy address</button>
            <a class="share-btn" href="${gmail}" target="_blank" rel="noopener">Open in Gmail <span aria-hidden="true">&nearr;</span></a>
            <a class="share-btn" href="mailto:${CONTACT_EMAIL}">Open mail app</a>
          </div>

          <h2 class="pp-label ct-elsewhere">Elsewhere</h2>
          <ul class="ct-social">
${[
  ['LinkedIn', 'https://www.linkedin.com/in/bhavishyasingla1/', 'Where the newsletter lives'],
  ['YouTube', 'https://www.youtube.com/@bhavishyasingla1', 'Videos and Shorts'],
  ['Instagram', 'https://www.instagram.com/bhavishyasingla1/', 'Reels'],
  ['X', 'https://x.com/Bhavishyas_1', 'Short notes while building'],
  ['GitHub', 'https://github.com/bhavishyasingla1', 'Code']
]
  .map(
    ([label, url, note]) => `            <li><a href="${url}" target="_blank" rel="noopener noreferrer me"><strong>${label}</strong><span>${note}</span><span class="exp-arrow" aria-hidden="true">&nearr;</span></a></li>`
  )
  .join('\n')}
          </ul>
        </aside>
      </div>
    </main>`;

  return document_({
    bodyClass: 'is-contact',
    headHtml: head({ title, description, canonical, jsonld, image: `${SITE}${og}`, imageAlt: 'Contact Bhavishya Singla' }),
    content
  });
}

/* ───────────────────────── about ───────────────────────── */

function aboutPage(og, articles) {
  const canonical = `${SITE}/about`;
  const title = 'About Bhavishya Singla — AI Builder & Creator';
  const description =
    'Bhavishya Singla builds AI products (Ring Ping, Rank Kiwi, LinkedInRank), writes the AI This Week newsletter, makes videos about AI and runs AI For Everyone, a Millennium Fellowship project.';

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: 'en-US',
        dateModified: `${SITE_UPDATED}T00:00:00+00:00`,
        isPartOf: { '@id': `${SITE}/#website` },
        mainEntity: { '@id': `${SITE}/#person` }
      },
      {
        ...PERSON,
        description:
          'Builds AI products and writes about building them. Maker of Ring Ping, Rank Kiwi and LinkedInRank, writer of the AI This Week newsletter and a Millennium Fellow.',
        knowsAbout: ['Artificial intelligence', 'AI literacy', 'Product development', 'Short-form video', 'Three.js']
      },
      WEBSITE,
      crumbList([
        ['Home', `${SITE}/`],
        ['About', canonical]
      ])
    ]
  };

  const find = (slug) => articles.find((a) => a.slug === slug);
  const link = (slug, text) => (find(slug) ? `<a href="/articles/${slug}">${text}</a>` : text);

  const doing = [
    ['Building', `Small AI products that each fix one annoying thing: <a href="/ringping">Ring Ping</a>, <a href="/rankkiwi">Rank Kiwi</a> and <a href="/linkedinrank">LinkedInRank</a>.`],
    ['Writing', `<a href="/aithisweek">AI This Week</a>, a newsletter on LinkedIn that helps freshers find their way in an AI-driven job market, and the <a href="/articles/">articles</a> on this site.`],
    ['Making videos', `Shorts about the AI tools I actually use, and ${link('outlier-score-micro-drama-series', 'an animated micro-drama')} that has my own products written into the plot.`],
    ['Teaching', `${link('ai-for-everyone-millennium-fellowship', 'AI For Everyone')}, my Millennium Fellowship project: content, school visits and college sessions on using AI critically and responsibly.`]
  ];

  const content = `${header('about')}

    <main id="content">
      <section class="ab-hero" aria-labelledby="ab-title">
        <div class="ab-hero-text">
          <p class="pp-eyebrow" data-enter="1"><span>About</span> &mdash; The person behind the site</p>
          <h1 class="pp-title" id="ab-title"><span class="headline-line" data-enter="2">HI, I&rsquo;M</span><span class="headline-line" data-enter="2">BHAVISHYA.</span></h1>
          <p class="pp-summary" data-enter="3">I build AI products, make videos about the tools I use, and write down what I learn along the way. The line on the home page is the honest summary: I am figuring things out, and doing it in public.</p>
          <div class="pp-actions" data-enter="4">
            <a href="/contact" class="btn-explore pp-visit"><span class="btn-text">SAY HI</span><span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
            <a href="/#projects" class="pp-back">SEE THE PROJECTS &rarr;</a>
          </div>
        </div>
        <figure class="ab-photo" data-enter="3">
          <img src="/hero-poster-alpha.webp?v=3" alt="Bhavishya Singla, standing and smiling in a charcoal hoodie" width="810" height="1440" fetchpriority="high" decoding="async" />
        </figure>
      </section>

      <section class="pp-section" aria-labelledby="ab-doing-title">
        <div class="pp-section-head" data-reveal>
          <h2 class="pp-label" id="ab-doing-title">What I do</h2>
          <p class="pp-audience">Four things, most weeks.</p>
        </div>
        <dl class="ab-list">
${doing.map(([t, d]) => `          <div data-reveal><dt>${t}</dt><dd>${d}</dd></div>`).join('\n')}
        </dl>
      </section>

      <section class="cs-why" aria-labelledby="ab-why-title">
        <p class="pp-label" data-reveal>How I work</p>
        <div class="cs-why-body" data-reveal>
          <h2 class="cs-h2" id="ab-why-title">Build the thing, show the bill, say what went wrong.</h2>
          <p>Most of what I publish starts as an experiment I wanted to run anyway. Can three AI models make the same video, and what does each one cost? Can a free tool clone my voice as well as a paid one? Can AI edit a whole reel for the price of a snack? I run it, write down the real numbers and share it, including the parts that did not work.</p>
          <p>I care more about whether people understand AI than whether they are impressed by it. Anyone can get an answer from a model in seconds. Knowing when to question that answer is the skill, and it is the one I try to teach, in videos, in classrooms and here.</p>
        </div>
      </section>

      <section class="pp-section" aria-labelledby="ab-built-title">
        <div class="pp-section-head" data-reveal>
          <h2 class="pp-label" id="ab-built-title">Things I have built</h2>
          <p class="pp-audience">Each one has a case study with real screenshots.</p>
        </div>
        <ul class="ab-projects">
${PROJECTS.map((p) => `          <li data-reveal><a class="mention" href="/${p.slug}"><img src="${p.logo}" alt="" width="40" height="40" loading="lazy" decoding="async" /><span><strong>${esc(p.name)}</strong>${esc(p.tagline)}</span><span class="exp-arrow" aria-hidden="true">&rarr;</span></a></li>`).join('\n')}
          <li data-reveal><a class="mention" href="/worlds/"><span class="ab-glyph" aria-hidden="true">3D</span><span><strong>3D Worlds</strong>Three explorable worlds, remixed from Bruno Simon&rsquo;s open-source work.</span><span class="exp-arrow" aria-hidden="true">&rarr;</span></a></li>
        </ul>
      </section>

${articleCards(articles.slice(0, 2), 'Latest writing', 'ab-latest-title')}

      <section class="cs-cta" aria-labelledby="ab-cta-title" data-reveal>
        <h2 class="cs-cta-line" id="ab-cta-title">Want to work on something together?</h2>
        <a href="/contact" class="btn-explore pp-visit"><span class="btn-text">GET IN TOUCH</span><span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
      </section>
    </main>`;

  return document_({
    bodyClass: 'is-about',
    headHtml: head({ title, description, canonical, jsonld, ogType: 'profile', image: `${SITE}${og}`, imageAlt: 'About Bhavishya Singla' }),
    content
  });
}

/* ───────────────────────── privacy ───────────────────────── */

function privacyPage() {
  const canonical = `${SITE}/privacy`;
  const title = 'Privacy | Bhavishya Singla';
  const description = 'What bhavishyasingla.com collects, why, and how to have it removed. Written in plain language.';

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: title, description, inLanguage: 'en-US', dateModified: `${SITE_UPDATED}T00:00:00+00:00`, isPartOf: { '@id': `${SITE}/#website` } },
      PERSON,
      crumbList([
        ['Home', `${SITE}/`],
        ['Privacy', canonical]
      ])
    ]
  };

  const content = `${header('')}

    <main id="content">
      <article class="ar" aria-labelledby="pv-title">
        <header class="ar-head">
          <h1 class="ar-title" id="pv-title" data-enter="2">Privacy</h1>
          <p class="ar-lead" data-enter="3">This is a personal site. It collects as little as it can. Here is exactly what, and how to have it removed.</p>
          <p class="pp-eyebrow" data-enter="4">Last updated <time datetime="${SITE_UPDATED}">${fmtDateLong(SITE_UPDATED)}</time></p>
        </header>

        <div class="ar-layout">
          <aside class="ar-rail">
            <nav class="ar-toc" aria-label="On this page">
              <p class="pp-label">On this page</p>
              <ol>
                <li><a href="#short-version">The short version</a></li>
                <li><a href="#analytics">Analytics</a></li>
                <li><a href="#newsletter">The email list</a></li>
                <li><a href="#contact-form">The contact form</a></li>
                <li><a href="#stored-on-your-device">Stored on your device</a></li>
                <li><a href="#other-services">Other services</a></li>
                <li><a href="#your-choices">Your choices</a></li>
              </ol>
            </nav>
          </aside>
          <div class="prose" data-enter="5">
            <h2 id="short-version">The short version</h2>
            <ul>
              <li>You can read everything here without an account.</li>
              <li>I measure visits so I know what is worth writing more of.</li>
              <li>If you join the email list, I keep your email address until you ask me to remove it.</li>
              <li>I do not sell data and there are no ads.</li>
            </ul>

            <h2 id="analytics">Analytics</h2>
            <p>The site uses three tools to understand how it is used:</p>
            <ul>
              <li><strong>Google Analytics</strong> counts page views and shows roughly where visitors come from.</li>
              <li><strong>Microsoft Clarity</strong> records how pages are scrolled and clicked, so I can find parts that are confusing. Text you type into forms is masked.</li>
              <li><strong>Cloudflare Web Analytics</strong> counts visits without cookies. Cloudflare also serves the site, so it processes your IP address to deliver pages, as any host does.</li>
            </ul>
            <p>Google Analytics and Clarity set cookies, and you decide whether they run:</p>
            <ul>
              <li>The first time you visit, a small notice lets you allow or turn off analytics. Your answer is remembered on this device.</li>
              <li>If you are visiting from Europe or the UK, neither tool loads until you say yes.</li>
              <li>If your browser sends the <a href="https://globalprivacycontrol.org/" target="_blank" rel="noopener">Global Privacy Control</a> signal, neither tool loads at all and you are not asked.</li>
              <li>The 3D worlds only ever load Google Analytics, never Clarity.</li>
            </ul>
            <p><button type="button" class="share-btn" data-consent-open>Change my analytics choice</button></p>

            <h2 id="newsletter">The email list</h2>
            <p>When you subscribe with the form on this site, I store your email address, the page you signed up from and the time. It is kept in a private Google Sheet and used for one thing: sending you the updates you asked for. You get a short thank-you email straight away.</p>
            <p>To leave the list, reply to any email or write to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> and I will delete your address.</p>
            <p><a href="/aithisweek">AI This Week</a> is separate. It is published on LinkedIn, and LinkedIn handles its subscriptions under its own privacy policy.</p>

            <h2 id="contact-form">The contact form</h2>
            <p>When you send a message from the <a href="/contact">contact page</a>, I receive your name, your email address, the topic you picked and what you wrote. It arrives in my inbox and a copy is kept in the same private Google Sheet, so nothing gets lost. I use it to reply to you and for nothing else. You are not added to the email list.</p>

            <h2 id="stored-on-your-device">Stored on your device</h2>
            <p>The site saves two things in your browser&rsquo;s local storage: whether you picked the light or the dark theme, and your analytics choice. Neither leaves your device.</p>

            <h2 id="other-services">Other services</h2>
            <ul>
              <li><strong>YouTube.</strong> Videos in articles load only when you press play, and they use YouTube&rsquo;s privacy-enhanced player.</li>
              <li><strong>Links to my projects.</strong> Ring Ping, Rank Kiwi and LinkedInRank are separate sites with their own privacy pages.</li>
              <li><strong>Email.</strong> If you write to me, I keep the conversation in my inbox like anyone would.</li>
            </ul>

            <h2 id="your-choices">Your choices</h2>
            <p>You can ask what I hold about you, ask me to correct it, or ask me to delete it. Write to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. You can also block cookies in your browser and the site will keep working.</p>
            <p>If this page changes, the date at the top changes with it.</p>
          </div>
        </div>
      </article>
    </main>`;

  return document_({
    bodyClass: 'is-article is-plain',
    headHtml: head({ title, description, canonical, jsonld }),
    content
  });
}

/* ───────────────────────── 404 ───────────────────────── */

function notFoundPage(all) {
  const latest = all
    .slice(0, 3)
    .map((a) => `<li><a href="/articles/${a.slug}">${esc(a.title)}</a></li>`)
    .join('');
  const headHtml = head({
    title: 'Page not found | Bhavishya Singla',
    description: 'This page does not exist. Head back to the home page, the projects or the articles.',
    canonical: null,
    robots: 'noindex',
    jsonld: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Page not found' }
  });
  const content = `${header('')}

    <main id="content" class="nf">
      <p class="pp-eyebrow" data-enter="1"><span>404</span> &mdash; Lost in the grid</p>
      <h1 class="pp-title" data-enter="2"><span class="headline-line">NOTHING</span><span class="headline-line">HERE.</span></h1>
      <p class="pp-summary" data-enter="3">This page wandered off. Maybe it is still driving around the playground. Try one of these instead:</p>
      <div class="pp-actions" data-enter="4">
        <a href="/" class="btn-explore pp-visit"><span class="btn-text">BACK HOME</span><span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
        <a href="/#projects" class="pp-back">PROJECTS</a>
        <a href="/worlds/" class="pp-back">3D WORLDS</a>
        <a href="/articles/" class="pp-back">ARTICLES</a>
      </div>
      ${latest ? `<div class="nf-latest" data-enter="5"><p class="pp-label">Latest articles</p><ul>${latest}</ul></div>` : ''}
    </main>`;
  return document_({ bodyClass: 'is-404', headHtml, content });
}

/* ───────────────────────── feeds & sitemap ───────────────────────── */

function rss(all) {
  const items = all
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE}/articles/${a.slug}</link>
      <guid isPermaLink="true">${SITE}/articles/${a.slug}</guid>
      <pubDate>${new Date(`${a.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(a.description)}</description>
      <media:content url="${SITE}${a.og}" medium="image" type="image/png" width="1200" height="630" />
${a.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Bhavishya Singla — Articles</title>
    <link>${SITE}/articles/</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Guides, notes and favourite GitHub repositories on AI, building products and the web.</description>
    <language>en-us</language>
${all[0] ? `    <lastBuildDate>${new Date(`${all[0].updated}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`;
}

function sitemap(all) {
  // <changefreq> and <priority> are ignored by Google, so entries carry only what is used: loc, lastmod, images.
  const url = (loc, lastmod, images = []) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>${images
      .map(
        (img) => `
    <image:image>
      <image:loc>${img}</image:loc>
    </image:image>`
      )
      .join('')}
  </url>`;
  const shotUrls = (slug) => {
    const cs = CASE_STUDIES[slug] || {};
    return [cs.lead?.shot, ...(cs.shots || []).map((s) => s.shot)].filter(Boolean).map((n) => `${SITE}${SHOTS[n].files[0].src}`);
  };
  const newest = all[0]?.updated || SITE_UPDATED;
  const entries = [
    url(`${SITE}/`, newest > SITE_UPDATED ? newest : SITE_UPDATED, [`${SITE}/og-image.png`]),
    ...PROJECTS.map((p) => url(`${SITE}/${p.slug}`, SITE_UPDATED, [`${SITE}${p.logoPng}`, ...shotUrls(p.slug)])),
    url(`${SITE}/articles/`, newest),
    ...all.map((a) => url(`${SITE}/articles/${a.slug}`, a.updated, a.image ? [`${SITE}${a.image}`] : [])),
    url(`${SITE}/worlds/`, SITE_UPDATED, WORLDS.map((w) => `${SITE}${w.image}`)),
    ...WORLDS.map((w) => url(`${SITE}${w.path}`, SITE_UPDATED)),
    url(`${SITE}/about`, SITE_UPDATED, [`${SITE}/bhavishya.png`]),
    url(`${SITE}/contact`, SITE_UPDATED),
    url(`${SITE}/privacy`, SITE_UPDATED)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`;
}

function llmsTxt(all) {
  return `# Bhavishya Singla

> Bhavishya Singla builds AI products and writes about building them. This site holds case studies of his projects, his articles, and three explorable 3D worlds.

## Projects
${PROJECTS.map((p) => `- [${p.name}](${SITE}/${p.slug}): ${p.summary} ${p.url.includes('linkedin.com') ? '' : `Product site: ${p.url}`}`.trim()).join('\n')}

## Articles
- [All articles](${SITE}/articles/): Guides and notes on AI, building products and the web. RSS: ${SITE}/feed.xml
${all.map((a) => `- [${a.title}](${SITE}/articles/${a.slug}): ${a.description}`).join('\n')}

## 3D worlds
- [About the 3D worlds](${SITE}/worlds/): What each world is, how to control it and what was changed. All three are built on open-source Three.js projects by Bruno Simon.
${WORLDS.map((w) => `- [${w.full}](${SITE}${w.path}): ${w.summary}`).join('\n')}

## About
- [About Bhavishya Singla](${SITE}/about): Who he is, what he builds and how he works.

## Contact
- Email: ${CONTACT_EMAIL}
- [Contact page](${SITE}/contact)
${SOCIALS.map(([label, url]) => `- ${label}: ${url}`).join('\n')}
`;
}

function injectLatestIntoLanding(all) {
  const path = join(ROOT, 'index.html');
  const html = readFileSync(path, 'utf8');
  const start = '<!-- latest-article:start -->';
  const end = '<!-- latest-article:end -->';
  if (!html.includes(start)) return;
  const latest = all[0];
  const block = latest
    ? `<a href="/articles/${latest.slug}" class="articles-edge-latest"><span class="articles-edge-kicker">Latest</span> ${esc(latest.title)}</a>`
    : '';
  const next = html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}${block}${end}`);
  if (next !== html) write(path, next);
}

/* ───────────────────────── run ───────────────────────── */

const articles = await loadArticles();
for (const a of articles) a.og = await renderArticleOg(a);

for (const [i, p] of PROJECTS.entries()) {
  const og = await renderProjectOg(p);
  write(join(ROOT, `${p.slug}.html`), projectPage(p, i, og, articles));
}

const indexOg = await renderListOg('articles', { title: 'ARTICLES.', eyebrowText: 'Guides, notes & repos I like', subtitle: 'AI, building products and the web.', path: '/articles', badge: 'READ' });
const worldsOg = await renderListOg('worlds', { title: '3D WORLDS.', eyebrowText: 'Explorable in your browser', subtitle: 'A room, an endless landscape and a car playground.', path: '/worlds', badge: 'ENTER' });
const aboutOg = await renderListOg('about', { title: 'HI, I’M BHAVISHYA.', eyebrowText: 'About', subtitle: 'AI products, videos and writing. Figuring things out in public.', path: '/about', badge: 'ABOUT' });
const contactOg = await renderListOg('contact', { title: 'SAY HI.', eyebrowText: 'Contact', subtitle: CONTACT_EMAIL, path: '/contact', badge: 'EMAIL' });

if (existsSync(ARTICLES_OUT)) rmSync(ARTICLES_OUT, { recursive: true });
mkdirSync(ARTICLES_OUT, { recursive: true });
write(join(ARTICLES_OUT, 'index.html'), articlesIndex(articles, indexOg));
articles.forEach((a, i) => write(join(ARTICLES_OUT, `${a.slug}.html`), articlePage(a, i, articles)));

mkdirSync(join(ROOT, 'worlds'), { recursive: true });
write(join(ROOT, 'worlds', 'index.html'), worldsPage(worldsOg));
write(join(ROOT, 'contact.html'), contactPage(contactOg));
write(join(ROOT, 'about.html'), aboutPage(aboutOg, articles));
write(join(ROOT, 'privacy.html'), privacyPage());

write(join(ROOT, '404.html'), notFoundPage(articles));
write(join(ROOT, 'public', 'feed.xml'), rss(articles));
write(join(ROOT, 'public', 'sitemap.xml'), sitemap(articles));
write(join(ROOT, 'public', 'llms.txt'), llmsTxt(articles));
injectLatestIntoLanding(articles);
