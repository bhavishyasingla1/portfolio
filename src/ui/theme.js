/**
 * Theme toggle (light / dark)
 * The initial theme is set by an inline <head> script before first paint
 * (see THEME_BOOT in scripts/build-pages.js and index.html) to avoid a flash.
 * This module wires the toggle button and keeps <meta name="theme-color"> in sync.
 */

const STORAGE_KEY = 'theme';
const THEME_COLORS = { light: '#f2f2f4', dark: '#0c0c0e' };

function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme, { persist = true, animate = true } = {}) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add('theme-transition');
    clearTimeout(applyTheme.timer);
    applyTheme.timer = setTimeout(() => root.classList.remove('theme-transition'), 450);
  }
  root.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* storage unavailable: theme still applies for this visit */
    }
  }
}

export function initTheme() {
  applyTheme(currentTheme(), { persist: false, animate: false });

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  });

  // Follow the OS setting until the visitor makes an explicit choice
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener?.('change', (e) => {
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      /* ignore */
    }
    if (!stored) applyTheme(e.matches ? 'dark' : 'light', { persist: false });
  });
}
