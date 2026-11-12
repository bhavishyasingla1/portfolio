/**
 * Analytics + consent for every page (home page, generated pages and the 3D worlds).
 *
 *   Global Privacy Control on, or the visitor said no  → nothing loads.
 *   Visitor said yes                                   → Google Analytics, then Microsoft Clarity once the page is idle.
 *   No answer yet, visiting from Europe or the UK      → nothing loads until they say yes (opt-in).
 *   No answer yet, anywhere else                       → analytics runs, and a small notice offers to turn it off.
 *
 * The choice is kept in localStorage ("analytics": "yes" | "no"). Any element with [data-consent-open]
 * (the button on /privacy) brings the notice back. On the 3D worlds the script tag carries data-ga-only,
 * so session recording never runs inside a 3D scene.
 */
(function () {
  var GA = 'G-8V65GFWC76';
  var CLARITY = 'ym814ukuow';
  var KEY = 'analytics';
  var me = document.currentScript;
  var gaOnly = !!(me && me.hasAttribute('data-ga-only'));
  var framed = window.top !== window.self;
  var gpc = !!navigator.globalPrivacyControl;
  var loaded = false;

  function read() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }
  function save(v) {
    try {
      localStorage.setItem(KEY, v);
    } catch (e) {
      /* private mode: the choice lasts for this page only */
    }
  }

  // Opt-in regions, judged from the device time zone (no network request, nothing stored)
  function needsOptIn() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      return /^Europe\//.test(tz) || /^Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe)$/.test(tz) || /^Arctic\//.test(tz);
    } catch (e) {
      return false;
    }
  }

  function load() {
    if (loaded) return;
    loaded = true;
    window['ga-disable-' + GA] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA);
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(g);

    if (gaOnly) return;
    var clarity = function () {
      if (window['ga-disable-' + GA]) return; // turned off while we were waiting
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', CLARITY);
    };
    if ('requestIdleCallback' in window) requestIdleCallback(clarity, { timeout: 5000 });
    else setTimeout(clarity, 3000);
  }

  function stop() {
    window['ga-disable-' + GA] = true;
    if (typeof window.clarity === 'function') {
      try {
        window.clarity('consent', false);
        window.clarity('stop');
      } catch (e) {
        /* not loaded yet */
      }
    }
  }

  var CSS =
    '.cn{position:fixed;z-index:2147483000;left:50%;bottom:20px;transform:translate(-50%,16px);width:min(560px,calc(100vw - 32px));' +
    'display:flex;align-items:center;gap:16px;padding:14px 14px 14px 18px;background:var(--color-bg,#f2f2f4);color:var(--color-text-primary,#0c0c0e);' +
    'border:1px solid var(--color-text-primary,#0c0c0e);box-shadow:6px 6px 0 var(--color-accent,#1f3dff);opacity:0;' +
    'transition:opacity .28s ease,transform .36s cubic-bezier(.16,1,.3,1);font:400 13px/1.5 Inter,system-ui,sans-serif}' +
    '.cn.is-in{opacity:1;transform:translate(-50%,0)}' +
    '.cn p{margin:0;flex:1;min-width:0}.cn a{color:inherit;text-decoration:underline;text-underline-offset:3px}' +
    '.cn-btns{display:flex;gap:8px;flex:none}' +
    '.cn button{appearance:none;cursor:pointer;height:36px;padding:0 14px;border:1px solid var(--color-text-primary,#0c0c0e);background:transparent;color:inherit;' +
    'font:600 10px/1 Inter,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;border-radius:0;transition:background-color .2s ease,color .2s ease,border-color .2s ease}' +
    '.cn button.cn-yes{background:var(--color-text-primary,#0c0c0e);color:var(--color-bg,#f2f2f4)}' +
    '.cn button:hover{background:var(--color-accent,#1f3dff);border-color:var(--color-accent,#1f3dff);color:#fff}' +
    '.cn button:focus-visible{outline:2px solid var(--color-accent,#1f3dff);outline-offset:3px}' +
    '@media (max-width:560px){.cn{flex-direction:column;align-items:stretch;gap:12px;bottom:12px;padding:16px}.cn-btns button{flex:1}}' +
    '@media (prefers-reduced-motion:reduce){.cn{transition:none}}';

  var bar = null;
  function hide() {
    if (!bar) return;
    var el = bar;
    bar = null;
    el.classList.remove('is-in');
    setTimeout(function () { el.remove(); }, 380);
  }

  function show(asking) {
    if (bar) return;
    if (!document.getElementById('cn-css')) {
      var st = document.createElement('style');
      st.id = 'cn-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    bar = document.createElement('div');
    bar.className = 'cn';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Analytics');
    var text = gpc
      ? 'Your browser sends Global Privacy Control, so analytics stays off here.'
      : asking
        ? 'May I count your visit? It shows me which pages are worth writing more of. No ads, nothing sold.'
        : 'This site counts visits to see what is worth writing more of. No ads, nothing sold.';
    bar.innerHTML =
      '<p>' + text + ' <a href="/privacy">Privacy</a></p><div class="cn-btns">' +
      (gpc
        ? '<button type="button" class="cn-yes" data-cn="close">OK</button>'
        : '<button type="button" data-cn="no">' + (asking ? 'No thanks' : 'Turn off') + '</button><button type="button" class="cn-yes" data-cn="yes">' + (asking ? 'Allow' : 'OK') + '</button>') +
      '</div>';
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cn]');
      if (!b) return;
      var v = b.getAttribute('data-cn');
      if (v === 'yes') { save('yes'); load(); }
      if (v === 'no') { save('no'); stop(); }
      hide();
    });
    // On the home page (desktop) sit above the corner links instead of on top of them
    if (document.querySelector('.social-edge') && window.innerWidth > 1024) bar.style.bottom = '104px';
    document.body.appendChild(bar);
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (bar) bar.classList.add('is-in'); }); });
  }

  var choice = read();
  var optIn = needsOptIn();

  if (!gpc && choice !== 'no' && (choice === 'yes' || !optIn)) load();

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    // The notice appears once, on full pages only: never inside the home page's 3D frame,
    // and on a 3D world's own page only where the law asks for a yes first.
    if (!gpc && !choice && !framed && (!gaOnly || optIn)) setTimeout(function () { show(optIn); }, 1400);
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-consent-open]');
      if (!t) return;
      e.preventDefault();
      show(read() !== 'yes' && (optIn || read() === 'no'));
    });
  });
})();
