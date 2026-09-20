/**
 * Portal Controller
 * Manages view transitions and top-level user interactions.
 */

import { ExperienceStage } from './stage.js';
import { AppRouter } from './router.js';

export class PortalController {
  constructor() {
    this.body = document.body;
    this.landingPanel = document.getElementById('view-landing');
    this.selectorPanel = document.getElementById('view-selector');

    this.stage = new ExperienceStage({
      stage: document.getElementById('experience-stage'),
      container: document.getElementById('iframe-container'),
      title: document.getElementById('stage-title'),
      loading: document.getElementById('stage-loading')
    });

    this.router = new AppRouter(this);
    this.bindEvents();
  }

  start() {
    this.router.handleRoute(true);
  }

  bindEvents() {
    // Brand link returns to home smoothly without full page reload
    const brandLink = document.getElementById('brand-link');
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.stage.isActive()) {
          this.stage.close();
        }
        this.showLanding(true);
      });
    }

    // Explore CTA click
    const btnExplore = document.getElementById('btn-explore');
    if (btnExplore) {
      btnExplore.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSelector(true);
      });
    }

    // Back from selector click
    const btnBack = document.getElementById('btn-selector-back');
    if (btnBack) {
      btnBack.addEventListener('click', (e) => {
        e.preventDefault();
        this.showLanding(true);
      });
    }

    // Experience links
    const expLinks = document.querySelectorAll('.experience-link');
    expLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const expId = link.dataset.experience;
        if (expId) {
          this.openExperience(expId, true);
        }
      });
    });

    // Exit stage button
    const btnExitStage = document.getElementById('btn-exit-stage');
    if (btnExitStage) {
      btnExitStage.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeExperience();
      });
    }

    // Keyboard support: Escape exits stage or selector
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.stage.isActive()) {
          this.closeExperience();
        } else if (this.body.classList.contains('mode-selector')) {
          this.showLanding(true);
        }
      }
    });

    // Message listener for iframe exit control
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'EXIT_EXPERIENCE') {
        this.closeExperience();
      }
    });
  }

  showLanding(updateHistory = true) {
    this.stage.close();
    this.body.classList.remove('mode-selector');

    this.selectorPanel.classList.remove('is-active');
    this.selectorPanel.setAttribute('aria-hidden', 'true');

    this.landingPanel.classList.remove('is-exiting');
    this.landingPanel.classList.add('is-active');
    this.landingPanel.setAttribute('aria-hidden', 'false');

    if (updateHistory) {
      this.router.navigateToLanding();
    }
  }

  showSelector(updateHistory = true) {
    this.stage.close();
    this.body.classList.add('mode-selector');

    this.landingPanel.classList.add('is-exiting');
    this.landingPanel.classList.remove('is-active');
    this.landingPanel.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
      this.selectorPanel.classList.add('is-active');
      this.selectorPanel.setAttribute('aria-hidden', 'false');
    }, 150);

    if (updateHistory) {
      this.router.navigateToSelector();
    }
  }

  openExperience(expId, updateHistory = true) {
    this.stage.loadExperience(expId);
    if (updateHistory) {
      this.router.navigateToExperience(expId);
    }
  }

  openExperienceDirect(expId) {
    this.body.classList.add('mode-selector');
    this.landingPanel.classList.add('is-exiting');
    this.landingPanel.classList.remove('is-active');
    this.selectorPanel.classList.add('is-active');
    this.stage.loadExperience(expId);
  }

  closeExperience() {
    this.stage.close();
    this.showSelector(true);
  }
}
