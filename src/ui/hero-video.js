/**
 * Hero video: two stacked layers, crossfaded on theme change.
 *   #hero-video        the original (light background, baked-in grid that matches the page)
 *   .hero-video-alpha  a transparent cut-out for dark mode
 *     Safari / iOS (WebKit) → HEVC with alpha (.mov); everyone else → VP9 with alpha (.webm).
 *     Safari plays VP9 WebM but drops its transparency, hence the split.
 * The hidden layer is paused to save battery, and re-synced to the visible one's
 * time just before it fades in, so the dance never jumps.
 */

const isWebKit = () => {
  const ua = navigator.userAgent;
  return /AppleWebKit/.test(ua) && !/Chrome\/|Chromium|Edg\/|OPR\/|Android|Firefox\//.test(ua);
};

const currentTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

export function initHeroVideo() {
  const base = document.getElementById('hero-video');
  if (!base) return;
  const mobile = window.matchMedia('(max-width: 768px)');

  const alpha = document.createElement('video');
  alpha.className = 'hero-video hero-video-alpha';
  alpha.muted = true;
  alpha.loop = true;
  alpha.playsInline = true;
  alpha.setAttribute('playsinline', '');
  alpha.setAttribute('aria-hidden', 'true');
  alpha.preload = 'none';

  const alphaSource = () => {
    const size = mobile.matches ? '-mobile' : '';
    return isWebKit()
      ? { src: `/hero-alpha${size}.mov`, type: 'video/quicktime; codecs="hvc1"', poster: `/hero-poster-alpha${size}.webp` }
      : { src: `/hero-alpha${size}.webm`, type: 'video/webm; codecs="vp9"', poster: `/hero-poster-alpha${size}.webp` };
  };

  let loadedSrc = '';
  const ensureAlpha = (preload = 'auto') => {
    const { src, type, poster } = alphaSource();
    if (loadedSrc === src) return;
    loadedSrc = src;
    alpha.poster = poster;
    alpha.preload = preload;
    alpha.replaceChildren(Object.assign(document.createElement('source'), { src, type }));
    alpha.load();
  };

  // Keep the overlay exactly on top of the base video (its box is laid out by the page CSS)
  const place = () => {
    alpha.style.left = `${base.offsetLeft}px`;
    alpha.style.top = `${base.offsetTop}px`;
    alpha.style.width = `${base.offsetWidth}px`;
    alpha.style.height = `${base.offsetHeight}px`;
  };
  base.insertAdjacentElement('afterend', alpha);
  place();
  new ResizeObserver(place).observe(base);
  window.addEventListener('resize', place);

  const sync = (from, to) => {
    if (Number.isFinite(from.currentTime) && to.readyState >= 1 && Number.isFinite(to.duration) && to.duration > 0) {
      to.currentTime = from.currentTime % to.duration;
    }
  };

  const playIfVisible = (v) => v.play().catch(() => {});

  const apply = (theme) => {
    if (theme === 'dark') {
      ensureAlpha();
      const start = () => {
        sync(base, alpha);
        playIfVisible(alpha);
        // pause the hidden layer once the fade has finished
        setTimeout(() => currentTheme() === 'dark' && base.pause(), 600);
      };
      if (alpha.readyState >= 2) start();
      else alpha.addEventListener('loadeddata', start, { once: true });
    } else {
      sync(alpha, base);
      playIfVisible(base);
      setTimeout(() => currentTheme() === 'light' && alpha.pause(), 600);
    }
  };

  if (currentTheme() === 'dark') {
    apply('dark');
  } else {
    // Warm the dark layer in the background so the first switch is instant
    const warm = () => ensureAlpha('auto');
    ('requestIdleCallback' in window ? requestIdleCallback : (fn) => setTimeout(fn, 2500))(warm, { timeout: 4000 });
  }

  document.addEventListener('themechange', (e) => apply(e.detail.theme));
  mobile.addEventListener?.('change', () => {
    loadedSrc = '';
    if (currentTheme() === 'dark' || alpha.preload === 'auto') ensureAlpha();
    if (currentTheme() === 'dark') apply('dark');
  });

  // While a panel (worlds / projects) covers the hero, pause both layers; resume the visible one after
  new MutationObserver(() => {
    if (document.body.classList.contains('mode-selector')) {
      base.pause();
      alpha.pause();
    } else {
      const visible = currentTheme() === 'dark' ? alpha : base;
      const hidden = visible === alpha ? base : alpha;
      hidden.pause();
      playIfVisible(visible);
    }
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
}
