/**
 * Projects view: logo tiles → sliding detail carousel.
 * Tiles are real links to /<slug>; a plain click opens the detail card in place,
 * cmd/ctrl-click or middle-click still opens the full page.
 * Inside the carousel: ← → keys, swipe, prev/next buttons and dots.
 */

import { PROJECTS } from '../config/projects.js';

const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function slideHtml(p, i) {
  const cta = p.cta || `Visit ${p.domain}`;
  const proof = p.proof?.rating
    ? `<p class="pjd-proof"><span aria-hidden="true">★★★★★</span> <strong>${p.proof.rating.toFixed(1)}</strong> from ${p.proof.ratingCount} ratings · <strong>${p.proof.users}</strong> users</p>`
    : p.proof?.badge
      ? `<p class="pjd-proof"><strong>${esc(p.proof.badge)}</strong></p>`
      : '';
  return `
    <article class="pjd-slide${p.logoCover ? ' is-cover' : ''}" data-index="${i}" aria-roledescription="slide" aria-label="${i + 1} of ${PROJECTS.length}: ${esc(p.name)}" ${i ? 'aria-hidden="true"' : ''}>
      <figure class="pjd-logo"><img src="${p.logo}" width="320" height="320" alt="${esc(p.name)} logo" /></figure>
      <div class="pjd-text">
        <p class="pjd-eyebrow"><span>${p.num}</span> &mdash; ${esc(p.tag)}</p>
        <h2 class="pjd-name">${esc(p.name)}</h2>
        <p class="pjd-tagline">${esc(p.tagline)}</p>
        <p class="pjd-summary">${esc(p.summary)}</p>
        ${proof}
        <div class="pjd-actions">
          <a class="btn-explore pjd-primary" href="/${p.slug}"><span class="btn-text">FULL DETAILS</span><span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
          <a class="pjd-secondary" href="${p.url}" target="_blank" rel="noopener">${esc(cta.toUpperCase())} <span aria-hidden="true">&nearr;</span></a>
        </div>
      </div>
    </article>`;
}

export function initProjects({ onOpenChange } = {}) {
  const stage = document.getElementById('pj-stage');
  const detail = document.getElementById('pj-detail');
  if (!stage || !detail) return { close: () => false, isOpen: () => false };

  detail.innerHTML = `
    <div class="pjd-bar">
      <button type="button" class="pjd-close" aria-label="Back to all projects">&larr; ALL PROJECTS</button>
      <div class="pjd-nav">
        <button type="button" class="pjd-arrow" data-dir="-1" aria-label="Previous project">&larr;</button>
        <span class="pjd-count" aria-live="polite"><span class="pjd-current">01</span> / ${String(PROJECTS.length).padStart(2, '0')}</span>
        <button type="button" class="pjd-arrow" data-dir="1" aria-label="Next project">&rarr;</button>
      </div>
    </div>
    <div class="pjd-viewport"><div class="pjd-track">${PROJECTS.map(slideHtml).join('')}</div></div>
    <div class="pjd-dots" role="tablist" aria-label="Choose project">${PROJECTS.map(
      (p, i) => `<button type="button" role="tab" class="pjd-dot" data-go="${i}" aria-label="${esc(p.name)}"></button>`
    ).join('')}</div>`;

  const track = detail.querySelector('.pjd-track');
  const slides = [...detail.querySelectorAll('.pjd-slide')];
  const dots = [...detail.querySelectorAll('.pjd-dot')];
  const current = detail.querySelector('.pjd-current');
  let index = 0;
  let open = false;

  const go = (i, { animate = true } = {}) => {
    index = (i + PROJECTS.length) % PROJECTS.length;
    track.style.transition = animate ? '' : 'none';
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    if (!animate) requestAnimationFrame(() => (track.style.transition = ''));
    slides.forEach((s, n) => {
      s.classList.toggle('is-active', n === index);
      if (n === index) s.removeAttribute('aria-hidden');
      else s.setAttribute('aria-hidden', 'true');
      s.querySelectorAll('a').forEach((a) => (a.tabIndex = n === index ? 0 : -1));
    });
    dots.forEach((d, n) => d.setAttribute('aria-selected', String(n === index)));
    current.textContent = String(index + 1).padStart(2, '0');
  };

  const show = (i) => {
    go(i, { animate: false });
    detail.hidden = false;
    // next frame so the slide-in transition runs
    requestAnimationFrame(() => stage.classList.add('is-detail'));
    open = true;
    onOpenChange?.(true);
    setTimeout(() => detail.querySelector('.pjd-close')?.focus({ preventScroll: true }), 450);
  };

  const close = () => {
    if (!open) return false;
    stage.classList.remove('is-detail');
    open = false;
    onOpenChange?.(false);
    setTimeout(() => {
      if (!open) detail.hidden = true;
    }, 550);
    stage.querySelectorAll('.pj-tile')[index]?.focus({ preventScroll: true });
    return true;
  };

  stage.querySelectorAll('.pj-tile').forEach((tile, i) => {
    tile.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let the page open
      e.preventDefault();
      show(i);
    });
  });

  detail.querySelector('.pjd-close').addEventListener('click', close);
  detail.querySelectorAll('.pjd-arrow').forEach((b) => b.addEventListener('click', () => go(index + Number(b.dataset.dir))));
  dots.forEach((d) => d.addEventListener('click', () => go(Number(d.dataset.go))));

  window.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'ArrowRight') go(index + 1);
    else if (e.key === 'ArrowLeft') go(index - 1);
  });

  // Swipe (touch) with a light rubber-band while dragging
  let startX = 0;
  let startY = 0;
  let dx = 0;
  let dragging = false;
  const viewport = detail.querySelector('.pjd-viewport');
  viewport.addEventListener(
    'touchstart',
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      dx = 0;
      dragging = true;
    },
    { passive: true }
  );
  viewport.addEventListener(
    'touchmove',
    (e) => {
      if (!dragging) return;
      dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) < Math.abs(e.touches[0].clientY - startY)) return;
      track.style.transition = 'none';
      track.style.transform = `translate3d(calc(${-index * 100}% + ${dx * 0.6}px), 0, 0)`;
    },
    { passive: true }
  );
  viewport.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    else go(index);
  });

  go(0, { animate: false });
  return { close, isOpen: () => open };
}
