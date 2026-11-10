/**
 * Static Page Generator
 * Runs before `vite dev` and `vite build` (see package.json). It writes:
 *   - <slug>.html              one page per project, from src/config/projects.js  → /ringping
 *   - articles/index.html      searchable article index                          → /articles/
 *   - articles/<slug>.html     one page per Markdown file in content/articles    → /articles/<slug>
 *   - public/sitemap.xml       every indexable URL
 *   - public/feed.xml          RSS feed of articles
 *   - the "latest article" block in index.html
 * Generated files are committed so the site also works without running this.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'fs';
import { resolve, join, basename } from 'path';
import { Marked, Renderer } from 'marked';
import { PROJECTS } from '../src/config/projects.js';
import { renderProjectOg, renderArticleOg, renderArticlesIndexOg } from './og/render.js';

// Google Apps Script web app that stores sign-ups in the Sheet and sends the emails (scripts/newsletter/Code.gs)
const SIGNUP_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwGv1Vq2Wi0bUmpwCdOrQcVWdPYd2tRq0pKvw7HiwLeBc44mbHoGf1x_ARYcBNIpk-4/exec';

const SITE = 'https://bhavishyasingla.com';
const SITE_UPDATED = '2026-11-10';
const ROOT = resolve();
const ARTICLES_SRC = join(ROOT, 'content', 'articles');
const ARTICLES_OUT = join(ROOT, 'articles');

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
const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
};

const write = (path, content) => {
  writeFileSync(path, content);
  console.log(`✓ ${path.replace(ROOT + '/', '')}`);
};

/* ───────────────────────── shared layout ───────────────────────── */

// Runs before first paint: sets the theme (stored choice, else OS preference) and flags JS.
const THEME_BOOT = `<script>(function(){var d=document.documentElement;d.classList.add('js');var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t})();</script>`;

const THEME_ICON = `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor"/></svg>`;

function head({ title, description, canonical, ogType = 'website', image = `${SITE}/og-image.png`, imageAlt = title, jsonld, extra = '' }) {
  return `  ${THEME_BOOT}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8V65GFWC76"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8V65GFWC76');
  </script>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <meta name="author" content="Bhavishya Singla" />

  <meta property="og:type" content="${ogType}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${esc(title)}" />
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

  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ym814ukuow");
  </script>

  <link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/src/styles/project-page.css" />
  <script type="module" src="/src/page.js"></script>

  <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
  </script>`;
}

function header(crumbs) {
  const trail = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `<span aria-current="page">${esc(c.label)}</span>`
        : `<a href="${c.href}">${esc(c.label)}</a><span aria-hidden="true">/</span>`
    )
    .join('\n        ');
  return `    <header class="pp-header">
      <a href="/" class="brand">BHAVISHYA SINGLA</a>
      <div class="header-actions">
        <nav class="pp-crumbs" aria-label="Breadcrumb">
        ${trail}
        </nav>
        <button type="button" class="theme-toggle" data-theme-toggle aria-label="Switch theme" aria-pressed="false">${THEME_ICON}</button>
      </div>
    </header>`;
}

const FOOTER = `    <footer class="pp-footer">
      <ul class="social-list">
        <li><a class="social-link" href="https://github.com/bhavishyasingla1" target="_blank" rel="noopener noreferrer me">GitHub</a></li>
        <li><a class="social-link" href="https://www.linkedin.com/in/bhavishyasingla1/" target="_blank" rel="noopener noreferrer me">LinkedIn</a></li>
        <li><a class="social-link" href="https://www.youtube.com/@bhavishyasingla1" target="_blank" rel="noopener noreferrer me">YouTube</a></li>
        <li><a class="social-link" href="https://www.instagram.com/bhavishyasingla1/" target="_blank" rel="noopener noreferrer me">Instagram</a></li>
        <li><a class="social-link" href="https://x.com/Bhavishyas_1" target="_blank" rel="noopener noreferrer me">X</a></li>
      </ul>
      <p class="pp-copy"><a href="/articles/">Articles</a> &middot; <a href="/#projects">Projects</a> &middot; &copy; ${SITE_UPDATED.slice(0, 4)} Bhavishya Singla</p>
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

const PERSON = { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Bhavishya Singla', url: SITE };

function signupForm(id, source) {
  return `      <section class="signup" aria-labelledby="${id}-title" data-reveal>
        <div class="signup-text">
          <p class="pp-label">Newsletter</p>
          <h2 class="signup-title" id="${id}-title">Stay in the loop.</h2>
          <p class="signup-desc">Join the list for occasional, important updates only. No spam, ever, and you can opt out any time by replying.</p>
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
  const source = pr.source ? `<span class="proof-source">on ${esc(pr.source)}${pr.asOf ? ` &middot; ${fmtDate(pr.asOf)}` : ''}</span>` : '';
  return `      <aside class="proof" aria-label="Traction" data-reveal>
        <p class="proof-items">${items.join('<span class="proof-sep" aria-hidden="true"></span>')}${source}</p>
        ${pr.url ? `<a class="proof-link" href="${pr.url}" target="_blank" rel="noopener">${esc(pr.cta || 'See listing')} <span aria-hidden="true">&nearr;</span></a>` : ''}
${pr.quote ? `        <blockquote class="proof-quote"><p>&ldquo;${esc(pr.quote)}&rdquo;</p><cite>Bhavishya Singla, creator of ${esc(p.name)}</cite></blockquote>
` : ''}      </aside>`;
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
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE}/${p.slug}#app`,
    name: p.name,
    url: p.url,
    description: p.summary,
    applicationCategory: p.category,
    operatingSystem: p.os,
    image: `${SITE}${p.logoPng}`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(p.proof?.url ? { installUrl: p.proof.url } : {}),
    ...(p.proof?.rating
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.proof.rating, ratingCount: p.proof.ratingCount, bestRating: 5 } }
      : {}),
    author: { '@id': `${SITE}/#person` },
    creator: { '@id': `${SITE}/#person` }
  };
}

function projectPage(p, i, og) {
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const title = `${p.name} — ${p.tagline.replace(/\.$/, '')} | Bhavishya Singla`;
  const canonical = `${SITE}/${p.slug}`;
  const total = String(PROJECTS.length).padStart(2, '0');

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
        about: { '@id': `${canonical}#app` },
        isPartOf: { '@id': `${SITE}/#website` }
      },
      PERSON,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE}/#projects` },
          { '@type': 'ListItem', position: 3, name: p.name, item: canonical }
        ]
      }
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

  const content = `${header([
    { label: 'Projects', href: '/#projects' },
    { label: `${p.num} of ${total}` }
  ])}

    <main id="content">
      <section class="pp-hero" aria-labelledby="pp-title">
        <div class="pp-hero-text">
          <p class="pp-eyebrow" data-enter="1"><span>${esc(p.num)}</span> &mdash; ${esc(p.tag)}</p>
          <h1 class="pp-title" id="pp-title">
            <span class="sr-only">${esc(p.name)}</span>
            <span aria-hidden="true">${p.headline
              .map((l, n) => `<span class="headline-line" data-enter="${n + 2}">${esc(l)}</span>`)
              .join('')}</span>
          </h1>
          <p class="pp-tagline" data-enter="4">${esc(p.tagline)}</p>
          <p class="pp-summary" data-enter="5">${esc(p.summary)}</p>
          <div class="pp-actions" data-enter="6">
            <a href="${p.url}" class="btn-explore pp-visit" target="_blank" rel="noopener">
              <span class="btn-text">${esc(p.cta || `VISIT ${p.domain.toUpperCase()}`)}</span>
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

      <section class="pp-section" aria-labelledby="pp-features-title">
        <div class="pp-section-head" data-reveal>
          <h2 class="pp-label" id="pp-features-title">${esc(p.featuresLabel || 'What it does')}</h2>
          <p class="pp-audience"><strong>Built for</strong> ${esc(p.audience)}</p>
        </div>
        <ol class="pp-features">
${features}
        </ol>
${p.note ? `        <p class="pp-note">${esc(p.note)}</p>\n` : ''}      </section>

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

function makeMarked(toc) {
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
        return `<h${level} id="${id}"><a class="heading-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${text}</h${level}>\n`;
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
        return `<figure><img src="${esc(href)}" alt="${esc(text)}" loading="lazy" decoding="async" />${cap}</figure>`;
      },
      table(token) {
        // Wrap tables so they scroll sideways on phones instead of breaking the layout
        return `<div class="table-scroll">${Renderer.prototype.table.call(this, token)}</div>`;
      }
    }
  });
  return marked;
}

function loadArticles() {
  if (!existsSync(ARTICLES_SRC)) return [];
  return readdirSync(ARTICLES_SRC)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => {
      const raw = readFileSync(join(ARTICLES_SRC, f), 'utf8');
      const { data, body } = parseFrontmatter(raw, f);
      if (data.draft === 'true') return null;
      const toc = [];
      const html = makeMarked(toc).parse(body);
      const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
      const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [];
      return {
        slug: basename(f, '.md'),
        title: data.title,
        description: data.description,
        date: data.date,
        updated: data.updated || data.date,
        tags,
        image: data.image,
        imageAlt: data.image_alt,
        dateLabel: fmtDate(data.date),
        html,
        toc,
        words,
        minutes: Math.max(1, Math.round(words / 220))
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

function articlePage(a, i, all) {
  const canonical = `${SITE}/articles/${a.slug}`;
  const newer = all[i - 1];
  const older = all[i + 1];
  const image = `${SITE}${a.og}`;
  const cover = a.image ? (a.image.startsWith('http') ? a.image : `${SITE}${a.image}`) : null;
  const title = `${a.title} | Bhavishya Singla`;

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
        wordCount: a.words,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE}/articles/#blog` }
      },
      PERSON,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Articles', item: `${SITE}/articles/` },
          { '@type': 'ListItem', position: 3, name: a.title, item: canonical }
        ]
      }
    ]
  };

  const extra = `  <meta property="article:published_time" content="${a.date}T00:00:00+00:00" />
  <meta property="article:modified_time" content="${a.updated}T00:00:00+00:00" />
  <meta property="article:author" content="${SITE}/" />
${a.tags.map((t) => `  <meta property="article:tag" content="${esc(t)}" />`).join('\n')}`;

  const toc = a.toc.length
    ? `        <nav class="ar-toc" aria-label="On this page">
          <p class="pp-label">On this page</p>
          <ol>
${a.toc.map((t) => `            <li><a href="#${t.id}">${t.text}</a></li>`).join('\n')}
          </ol>
        </nav>`
    : '';

  const pager = [
    older
      ? `<a class="ar-pager-link" href="/articles/${older.slug}"><span class="pp-label">&larr; Older</span><span class="ar-pager-title">${esc(older.title)}</span></a>`
      : '<span></span>',
    newer
      ? `<a class="ar-pager-link is-next" href="/articles/${newer.slug}"><span class="pp-label">Newer &rarr;</span><span class="ar-pager-title">${esc(newer.title)}</span></a>`
      : '<span></span>'
  ].join('\n        ');

  const content = `${header([
    { label: 'Articles', href: '/articles/' },
    { label: `${a.minutes} min read` }
  ])}

    <main id="content">
      <article class="ar" aria-labelledby="ar-title">
        <header class="ar-head">
          <p class="pp-eyebrow" data-enter="1"><time datetime="${a.date}">${fmtDate(a.date)}</time> &middot; ${a.minutes} MIN READ${a.updated !== a.date ? ` &middot; UPDATED <time datetime="${a.updated}">${fmtDate(a.updated)}</time>` : ''}</p>
          <h1 class="ar-title" id="ar-title" data-enter="2">${esc(a.title)}</h1>
          <p class="ar-lead" data-enter="3">${esc(a.description)}</p>
          ${a.tags.length ? `<ul class="ar-tags" data-enter="4" aria-label="Topics">${a.tags.map((t) => `<li><a href="/articles/?q=${encodeURIComponent(t)}">${esc(t)}</a></li>`).join('')}</ul>` : ''}
        </header>

        <div class="ar-layout">
          <aside class="ar-rail">
${toc}
            <a class="pp-back" href="/articles/">&larr; ALL ARTICLES</a>
          </aside>
          <div class="prose" data-enter="5">
${a.image ? `<figure class="ar-cover"><img src="${a.image}" alt="${esc(a.imageAlt || a.title)}" width="1600" height="840" fetchpriority="high" />${a.imageAlt ? `<figcaption>${esc(a.imageAlt)}</figcaption>` : ''}</figure>
` : ''}${a.html}
          </div>
        </div>
      </article>

${signupForm('signup-article', `/articles/${a.slug}`)}

${older || newer ? `      <nav class="ar-pager" aria-label="More articles" data-reveal>
        ${pager}
      </nav>` : ''}
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
    'Guides, notes and favourite GitHub repositories from Bhavishya Singla on AI, building products, performance and the web.';

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
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: 'Bhavishya Singla',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE}/articles/?q={search_term_string}` },
          'query-input': 'required name=search_term_string'
        }
      },
      PERSON,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Articles', item: canonical }
        ]
      }
    ]
  };

  const rows = all
    .map(
      (a) => `          <li class="al-item" data-search="${esc([a.title, a.description, ...a.tags].join(' ').toLowerCase())}">
            <a class="al-link" href="/articles/${a.slug}">
              <time class="al-date" datetime="${a.date}">${fmtDate(a.date)}</time>
              <span class="al-main">
                <span class="al-title">${esc(a.title)}</span>
                <span class="al-desc">${esc(a.description)}</span>
              </span>
              <span class="al-meta">${a.tags.length ? `<span>${a.tags.slice(0, 2).map(esc).join(' &middot; ')}</span>` : ''}<span>${a.minutes} MIN READ</span></span>
              <span class="exp-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>`
    )
    .join('\n');

  const content = `${header([{ label: 'Articles' }])}

    <main id="content">
      <section class="al-hero" aria-labelledby="al-title">
        <p class="pp-eyebrow" data-enter="1"><span>${String(all.length).padStart(2, '0')}</span> &mdash; Guides, notes &amp; repos I like</p>
        <h1 class="pp-title" id="al-title"><span class="headline-line" data-enter="2">ARTICLES.</span></h1>
        <form class="al-search" role="search" action="/articles/" data-enter="3">
          <label class="sr-only" for="article-search">Search articles</label>
          <input id="article-search" name="q" type="search" placeholder="Search articles" autocomplete="off" spellcheck="false" />
          <kbd class="al-kbd" aria-hidden="true">/</kbd>
        </form>
      </section>

      <ol class="al-list" id="article-list" data-enter="4">
${rows}
      </ol>
      <p class="al-empty" id="article-empty" hidden>No articles match <strong></strong>. Try another word.</p>

${signupForm('signup-index', '/articles/')}
    </main>`;

  return document_({
    bodyClass: 'is-articles',
    headHtml: head({ title, description, canonical, jsonld, image: `${SITE}${og}`, imageAlt: 'Articles by Bhavishya Singla' }),
    content
  });
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
  const url = (loc, lastmod, freq, prio, img) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}T00:00:00+00:00</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>${
      img
        ? `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${esc(img.title)}</image:title>
    </image:image>`
        : ''
    }
  </url>`;
  const entries = [
    url(`${SITE}/`, SITE_UPDATED, 'weekly', '1.0', {
      loc: `${SITE}/og-image.png`,
      title: 'Bhavishya Singla — AI, Technology & Interactive 3D Worlds'
    }),
    ...PROJECTS.map((p) =>
      url(`${SITE}/${p.slug}`, SITE_UPDATED, 'monthly', '0.9', { loc: `${SITE}${p.logoPng}`, title: `${p.name} logo` })
    ),
    url(`${SITE}/articles/`, all[0]?.updated || SITE_UPDATED, 'weekly', '0.8'),
    ...all.map((a) => url(`${SITE}/articles/${a.slug}`, a.updated, 'monthly', '0.7')),
    url(`${SITE}/room/`, '2026-09-22', 'monthly', '0.6'),
    url(`${SITE}/world/`, '2026-09-22', 'monthly', '0.6'),
    url(`${SITE}/folio/`, '2026-09-22', 'monthly', '0.6')
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
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

for (const [i, p] of PROJECTS.entries()) {
  const og = await renderProjectOg(p);
  write(join(ROOT, `${p.slug}.html`), projectPage(p, i, og));
}

const articles = loadArticles();
for (const a of articles) a.og = await renderArticleOg(a);
const indexOg = await renderArticlesIndexOg();

if (existsSync(ARTICLES_OUT)) rmSync(ARTICLES_OUT, { recursive: true });
mkdirSync(ARTICLES_OUT, { recursive: true });
write(join(ARTICLES_OUT, 'index.html'), articlesIndex(articles, indexOg));
articles.forEach((a, i) => write(join(ARTICLES_OUT, `${a.slug}.html`), articlePage(a, i, articles)));

write(join(ROOT, 'public', 'feed.xml'), rss(articles));
write(join(ROOT, 'public', 'sitemap.xml'), sitemap(articles));
injectLatestIntoLanding(articles);
