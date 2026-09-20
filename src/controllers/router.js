/**
 * Router & Navigation Controller
 * Implements HTML5 History API (pushState) and canonical URL management per google.md.
 */

import { SITE_CONFIG } from '../config/site.js';

export class AppRouter {
  constructor(portal) {
    this.portal = portal;
    this.init();
  }

  init() {
    window.addEventListener('popstate', (e) => {
      this.handleRoute(false);
    });
  }

  handleRoute(isInitial = false) {
    const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const hash = window.location.hash.toLowerCase();

    if (pathname === '/room' || hash === '#room') {
      this.portal.openExperienceDirect('room', false);
    } else if (pathname === '/world' || hash === '#world') {
      this.portal.openExperienceDirect('world', false);
    } else if (pathname === '/folio' || hash === '#folio') {
      this.portal.openExperienceDirect('folio', false);
    } else if (hash === '#explore') {
      this.portal.showSelector(false);
    } else {
      this.portal.showLanding(false);
    }
  }

  navigateToLanding() {
    if (window.location.pathname !== '/' || window.location.hash) {
      window.history.pushState({ view: 'landing' }, '', '/');
    }
  }

  navigateToSelector() {
    if (window.location.hash !== '#explore') {
      window.history.pushState({ view: 'selector' }, '', '#explore');
    }
  }

  navigateToExperience(expId) {
    const config = SITE_CONFIG.experiences[expId];
    if (!config) return;
    window.history.pushState({ view: 'experience', expId }, '', config.route);
  }
}
