/**
 * Script for generated pages (projects, articles).
 * Theme toggle, scroll reveals and article search. Everything degrades to a
 * plain readable page without JavaScript.
 */

import { initTheme } from './ui/theme.js';

function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  items.forEach((el) => io.observe(el));
}

function initArticleSearch() {
  const input = document.getElementById('article-search');
  const list = document.getElementById('article-list');
  const empty = document.getElementById('article-empty');
  if (!input || !list) return;

  const items = [...list.querySelectorAll('.al-item')];
  const form = input.closest('form');

  const run = (value, { updateUrl = true } = {}) => {
    const terms = value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    items.forEach((item) => {
      const hay = item.dataset.search || '';
      const match = terms.every((t) => hay.includes(t));
      item.hidden = !match;
      if (match) shown++;
    });
    if (empty) {
      empty.hidden = shown > 0;
      const strong = empty.querySelector('strong');
      if (strong) strong.textContent = `“${value.trim()}”`;
    }
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (value.trim()) url.searchParams.set('q', value.trim());
      else url.searchParams.delete('q');
      window.history.replaceState(null, '', url);
    }
  };

  const initial = new URLSearchParams(window.location.search).get('q') || '';
  if (initial) {
    input.value = initial;
    run(initial, { updateUrl: false });
  }

  input.addEventListener('input', () => run(input.value));
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    run(input.value);
    const first = items.find((i) => !i.hidden)?.querySelector('a');
    if (first && input.value.trim()) first.focus();
  });

  // "/" focuses search, Escape clears it
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input && !/input|textarea/i.test(document.activeElement?.tagName || '')) {
      e.preventDefault();
      input.focus();
    } else if (e.key === 'Escape' && document.activeElement === input) {
      input.value = '';
      run('');
    }
  });
}

function initSignup() {
  document.querySelectorAll('form[data-signup]').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.signup-status');
    const label = button.querySelector('.btn-text');
    const idle = label.textContent;

    const setState = (state, message) => {
      form.dataset.state = state;
      status.textContent = message || '';
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
        setState('error', 'Please enter a valid email address.');
        input.focus();
        return;
      }
      setState('sending', '');
      button.disabled = true;
      label.textContent = 'SENDING';
      try {
        // text/plain keeps this a "simple" request, which Apps Script accepts cross-origin
        const res = await fetch(form.action, {
          method: 'POST',
          body: JSON.stringify({
            email,
            source: window.location.origin + (form.dataset.source || window.location.pathname),
            company: form.querySelector('[name="company"]')?.value || ''
          })
        });
        const data = await res.json().catch(() => ({ ok: res.ok }));
        if (data.ok) {
          form.reset();
          label.textContent = 'SUBSCRIBED';
          setState(
            'done',
            data.status === 'already_subscribed'
              ? "You're already on the list. Thank you!"
              : 'Done! Check your inbox for a thank-you note from me.'
          );
          window.gtag?.('event', 'sign_up', { method: 'newsletter', page: window.location.pathname });
          return;
        }
        throw new Error(data.error || 'failed');
      } catch (err) {
        label.textContent = idle;
        button.disabled = false;
        setState(
          'error',
          err.message === 'invalid_email'
            ? 'That email address looks off. Mind checking it?'
            : err.message === 'rate_limited'
              ? 'Easy there! Try again in a minute.'
              : 'Something went wrong. Please try again in a moment.'
        );
      }
    });

    input.addEventListener('input', () => {
      if (form.dataset.state === 'error') setState('idle', '');
    });
  });
}

initTheme();
initReveal();
initArticleSearch();
initSignup();
