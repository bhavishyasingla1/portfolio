/**
 * Script for generated pages (projects, articles, worlds, about, contact, privacy).
 * Theme toggle, scroll reveals, article filters, the contact form, screenshot lightbox,
 * reading progress and copy buttons. Everything degrades to a plain readable page without JavaScript.
 */

import { initTheme } from './ui/theme.js';

/** Phone menu: the Menu button opens the main links as a full-screen panel. */
function initNav() {
  const nav = document.getElementById('site-nav');
  const openBtn = document.querySelector('[data-nav-open]');
  if (!nav || !openBtn) return;
  const root = document.documentElement;
  const rest = [...document.querySelectorAll('main, .site-footer')];
  const phone = window.matchMedia('(max-width: 768px)');

  const set = (open) => {
    root.classList.toggle('nav-open', open);
    openBtn.setAttribute('aria-expanded', String(open));
    rest.forEach((el) => (el.inert = open));
    if (open) nav.querySelector('[data-nav-close]')?.focus({ preventScroll: true });
    else openBtn.focus({ preventScroll: true });
  };

  openBtn.addEventListener('click', () => set(true));
  nav.querySelector('[data-nav-close]')?.addEventListener('click', () => set(false));
  // a link was chosen: close straight away so the next page is not hidden behind the panel on back/forward
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && root.classList.contains('nav-open')) set(false);
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('nav-open')) set(false);
  });
  phone.addEventListener('change', (e) => {
    if (!e.matches && root.classList.contains('nav-open')) set(false);
  });
  window.addEventListener('pageshow', () => root.classList.contains('nav-open') && set(false));
}

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
  const chips = [...document.querySelectorAll('.al-chip')];
  const form = input.closest('form');
  const known = new Set(chips.map((c) => c.dataset.topic));
  let topic = '';

  // Two filters that combine: one topic (the chips) and free-text search. Both live in the URL.
  const run = ({ updateUrl = true } = {}) => {
    const value = input.value;
    const terms = value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    items.forEach((item) => {
      const match = (!topic || item.dataset.topic === topic) && terms.every((t) => (item.dataset.search || '').includes(t));
      item.hidden = !match;
      if (match) shown++;
    });
    // The large "featured" layout is for the newest article in the unfiltered list only
    items[0]?.classList.toggle('is-featured', !topic && !terms.length);
    chips.forEach((c) => {
      const on = c.dataset.topic === topic;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', String(on));
    });
    if (empty) {
      empty.hidden = shown > 0;
      const strong = empty.querySelector('strong');
      if (strong) strong.textContent = [topic, value.trim() && `“${value.trim()}”`].filter(Boolean).join(' + ');
    }
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (value.trim()) url.searchParams.set('q', value.trim());
      else url.searchParams.delete('q');
      if (topic) url.searchParams.set('topic', topic);
      else url.searchParams.delete('topic');
      window.history.replaceState(null, '', url);
    }
  };

  const params = new URLSearchParams(window.location.search);
  const wanted = params.get('topic') || '';
  // Old links used ?q=<topic>: treat a query that is exactly a topic name as that topic
  const q = params.get('q') || '';
  const asTopic = [...known].find((t) => t && t.toLowerCase() === q.toLowerCase());
  topic = known.has(wanted) ? wanted : asTopic || '';
  input.value = asTopic ? '' : q;
  if (topic || input.value) run({ updateUrl: false });

  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      topic = chip.dataset.topic || '';
      run();
    })
  );

  empty?.querySelector('.al-reset')?.addEventListener('click', () => {
    topic = '';
    input.value = '';
    run();
    input.focus();
  });

  input.addEventListener('input', () => run());
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    run();
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
      run();
    }
  });
}

/**
 * Contact form. Posts to the same Apps Script web app as the email sign-up (scripts/newsletter/Code.gs),
 * which emails the message to Bhavishya. If that fails for any reason, the visitor is handed a ready-made
 * email with everything they typed, so a message is never lost.
 */
function initContact() {
  const form = document.querySelector('form[data-contact]');
  if (!form) return;
  const status = form.querySelector('.ct-status');
  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector('.btn-text');
  const idle = label.textContent;
  const message = form.elements.message;
  const address = document.querySelector('.ct-address')?.textContent.trim() || '';

  const setState = (state, html) => {
    form.dataset.state = state;
    status.innerHTML = html || '';
  };
  const invalid = (field, text) => {
    setState('error', text);
    field.setAttribute('aria-invalid', 'true');
    field.focus();
  };

  // The chosen topic changes the hint inside the message box
  form.querySelectorAll('input[name="topic"]').forEach((radio) =>
    radio.addEventListener('change', () => {
      if (radio.checked) message.placeholder = radio.dataset.hint || '';
    })
  );

  form.addEventListener('input', (e) => {
    e.target.removeAttribute?.('aria-invalid');
    if (form.dataset.state === 'error') setState('idle', '');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      type: 'contact',
      topic: form.elements.topic.value,
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      message: message.value.trim(),
      company: form.elements.company.value,
      source: window.location.origin + window.location.pathname
    };
    if (!data.name) return invalid(form.elements.name, 'Please add your name.');
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(data.email)) return invalid(form.elements.email, 'Please enter a valid email address, so I can reply.');
    if (data.message.length < 10) return invalid(message, 'Please write a few words about what you need.');

    setState('sending', '');
    button.disabled = true;
    label.textContent = 'SENDING';
    try {
      // text/plain keeps this a "simple" request, which Apps Script accepts cross-origin
      const res = await fetch(form.action, { method: 'POST', body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({ ok: false }));
      // An older copy of the script answers a contact message as if it were a sign-up: treat that as not sent
      if (!out.ok || out.status !== 'sent') throw new Error(out.error || 'failed');
      form.reset();
      message.placeholder = form.querySelector('input[name="topic"]:checked')?.dataset.hint || '';
      label.textContent = 'SENT';
      status.textContent = `Thank you, ${data.name.split(' ')[0]}. Your message is in my inbox and I will reply by email.`;
      form.dataset.state = 'done';
      window.gtag?.('event', 'generate_lead', { method: 'contact_form', topic: data.topic });
    } catch (err) {
      label.textContent = idle;
      button.disabled = false;
      if (err.message === 'rate_limited') return setState('error', 'You just sent a message. Give it a minute before sending another.');
      if (err.message === 'invalid_email') return invalid(form.elements.email, 'That email address looks off. Mind checking it?');
      const mailto = `mailto:${address}?subject=${encodeURIComponent(data.topic)}&body=${encodeURIComponent(`${data.message}\n\n${data.name}`)}`;
      setState('error', `That did not go through. <a href="${mailto}">Send it as an email instead</a>: your message is already filled in.`);
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

// Click-to-play YouTube: the iframe (and YouTube's scripts) load only when asked
function initVideos() {
  document.querySelectorAll('figure.yt[data-yt]').forEach((fig) => {
    const btn = fig.querySelector('.yt-play');
    btn?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${fig.dataset.yt}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = btn.getAttribute('aria-label')?.replace(/^Play video: /, '') || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      btn.replaceWith(iframe);
      fig.classList.add('is-playing');
    });
  });
}

/**
 * Lightbox for screenshots and article images. Every trigger is a plain link to the image,
 * so without JavaScript it simply opens the file. Arrow keys move through the page's images.
 */
function initLightbox() {
  const links = [...document.querySelectorAll('a[data-lightbox]')];
  if (!links.length || !('showModal' in HTMLDialogElement.prototype)) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Image viewer');
  dialog.innerHTML = `
    <div class="lb-bar"><span class="lb-count" aria-live="polite"></span><button type="button" class="lb-close" aria-label="Close viewer">CLOSE</button></div>
    <div class="lb-stage">
      <button type="button" class="lb-prev" aria-label="Previous image">&larr;</button>
      <img alt="" />
      <button type="button" class="lb-next" aria-label="Next image">&rarr;</button>
    </div>
    <p class="lb-caption"><strong></strong><span></span></p>`;
  document.body.appendChild(dialog);

  const img = dialog.querySelector('img');
  const title = dialog.querySelector('.lb-caption strong');
  const text = dialog.querySelector('.lb-caption span');
  const count = dialog.querySelector('.lb-count');
  const prev = dialog.querySelector('.lb-prev');
  const next = dialog.querySelector('.lb-next');
  let index = 0;
  let opener = null;

  const show = (i) => {
    index = (i + links.length) % links.length;
    const link = links[index];
    const fresh = img.cloneNode();
    fresh.src = link.href;
    fresh.alt = link.querySelector('img')?.alt || link.dataset.title || '';
    if (link.dataset.w) {
      fresh.width = link.dataset.w;
      fresh.height = link.dataset.h;
    }
    dialog.querySelector('.lb-stage img').replaceWith(fresh); // restarts the fade-in
    title.textContent = link.dataset.title || '';
    text.textContent = link.dataset.caption || '';
    count.textContent = `${index + 1} / ${links.length}`;
    const many = links.length > 1;
    prev.hidden = next.hidden = !many;
    // warm the neighbour so the next arrow press is instant
    if (many) new Image().src = links[(index + 1) % links.length].href;
  };

  links.forEach((link, i) =>
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let people open the file in a new tab
      e.preventDefault();
      opener = link;
      show(i);
      dialog.showModal();
    })
  );

  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  dialog.querySelector('.lb-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    // a click on the dark area (not the picture or a button) closes it
    if (e.target === dialog || e.target.classList.contains('lb-stage')) dialog.close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
  dialog.addEventListener('close', () => opener?.focus());

  // swipe left / right on touch screens
  let startX = null;
  dialog.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
  dialog.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 48) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
}

// Reading progress bar and "you are here" in the table of contents
function initReading() {
  const bar = document.querySelector('.read-progress span');
  const prose = document.querySelector('.is-article .prose');
  if (!prose) return;

  if (bar) {
    let ticking = false;
    const update = () => {
      const rect = prose.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(1, Math.max(0, -rect.top / (total || 1)));
      bar.style.setProperty('--p', done.toFixed(4));
      ticking = false;
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  const tocLinks = [...document.querySelectorAll('.ar-toc a')];
  if (!tocLinks.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(tocLinks.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  const headings = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  const visible = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      // the current section is the last heading above the middle of the screen
      const current = headings.filter((h) => h.getBoundingClientRect().top < window.innerHeight * 0.4).pop() || headings[0];
      tocLinks.forEach((a) => a.classList.toggle('is-current', byId.get(current?.id) === a));
    },
    { rootMargin: '0px 0px -60% 0px', threshold: [0, 1] }
  );
  headings.forEach((h) => io.observe(h));
}

// "Copy link", "Copy address" and copy buttons on code blocks
function initCopy() {
  const flash = (btn, label) => {
    const idle = btn.textContent;
    btn.textContent = label;
    btn.classList.add('is-done');
    setTimeout(() => {
      btn.textContent = idle;
      btn.classList.remove('is-done');
    }, 1800);
  };
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      return false;
    }
  };

  document.querySelectorAll('[data-copy]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      if (await copy(btn.dataset.copy)) flash(btn, btn.dataset.copied || 'Copied');
    })
  );

  document.querySelectorAll('.prose pre').forEach((pre) => {
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    pre.replaceWith(wrap);
    wrap.appendChild(pre);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      if (await copy(pre.innerText.trimEnd())) flash(btn, 'Copied');
    });
    wrap.appendChild(btn);
  });
}

initTheme();
initNav();
initReveal();
initArticleSearch();
initSignup();
initContact();
initVideos();
initLightbox();
initReading();
initCopy();
