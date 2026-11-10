/**
 * Hero video theme switch.
 * Light theme: the original video (its light background and baked-in grid match the page).
 * Dark theme: a transparent cut-out so the person stands directly on the dark grid.
 *   Safari / iOS (WebKit) → HEVC with alpha (.mov). Everyone else → VP9 with alpha (.webm).
 *   Safari can play VP9 WebM but drops its transparency, hence the explicit split.
 */

const SOURCES = {
  light: {
    poster: { desktop: '/hero-poster.webp', mobile: '/hero-poster-mobile.webp' },
    video: { desktop: ['/hero-image.mp4', 'video/mp4'], mobile: ['/hero-image-mobile.mp4', 'video/mp4'] }
  },
  darkWebKit: {
    poster: { desktop: '/hero-poster-alpha.webp', mobile: '/hero-poster-alpha-mobile.webp' },
    video: {
      desktop: ['/hero-alpha.mov', 'video/quicktime; codecs="hvc1"'],
      mobile: ['/hero-alpha-mobile.mov', 'video/quicktime; codecs="hvc1"']
    }
  },
  dark: {
    poster: { desktop: '/hero-poster-alpha.webp', mobile: '/hero-poster-alpha-mobile.webp' },
    video: {
      desktop: ['/hero-alpha.webm', 'video/webm; codecs="vp9"'],
      mobile: ['/hero-alpha-mobile.webm', 'video/webm; codecs="vp9"']
    }
  }
};

const isWebKit = () => {
  const ua = navigator.userAgent;
  return /AppleWebKit/.test(ua) && !/Chrome\/|Chromium|Edg\/|OPR\/|Android|Firefox\//.test(ua);
};

export function initHeroVideo() {
  const video = document.getElementById('hero-video');
  if (!video) return;
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  let current = 'light';

  const apply = (theme) => {
    const key = theme === 'dark' ? (isWebKit() ? 'darkWebKit' : 'dark') : 'light';
    const size = mobileQuery.matches ? 'mobile' : 'desktop';
    const id = `${key}:${size}`;
    if (id === current) return;
    const firstRun = current === 'light' && key === 'light';
    current = id;
    if (firstRun) return; // markup already holds the light sources

    const set = SOURCES[key];
    const [src, type] = set.video[size];
    const wasPlaying = !video.paused;
    const time = video.currentTime;

    video.poster = set.poster[size];
    video.replaceChildren(Object.assign(document.createElement('source'), { src, type }));
    video.classList.toggle('is-alpha', key !== 'light');
    video.load();
    video.addEventListener(
      'loadedmetadata',
      () => {
        if (time && Number.isFinite(video.duration)) video.currentTime = time % video.duration;
        if (wasPlaying || video.autoplay) video.play().catch(() => {});
      },
      { once: true }
    );
  };

  current = 'light:' + (mobileQuery.matches ? 'mobile' : 'desktop');
  const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  if (theme === 'dark') apply('dark');

  document.addEventListener('themechange', (e) => apply(e.detail.theme));
  mobileQuery.addEventListener?.('change', () => apply(document.documentElement.dataset.theme));
}
