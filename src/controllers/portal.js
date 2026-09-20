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
    this.heroVideo = document.getElementById('hero-video');
    this.heroContent = document.querySelector('.hero-content');
    this.gridBackground = document.getElementById('grid-background');

    this.alignGrid = this.alignGrid.bind(this);

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
    this.alignGrid();
    requestAnimationFrame(() => this.alignGrid());
    setTimeout(() => this.alignGrid(), 100);
  }

  bindEvents() {
    window.addEventListener('resize', this.alignGrid);
    if (this.heroVideo) {
      this.heroVideo.addEventListener('loadedmetadata', this.alignGrid);
      this.heroVideo.addEventListener('canplay', this.alignGrid);
      this.heroVideo.addEventListener('playing', this.alignGrid);
    }
    if (window.ResizeObserver && this.heroVideo) {
      const ro = new ResizeObserver(() => this.alignGrid());
      ro.observe(this.heroVideo);
      if (this.landingPanel) {
        ro.observe(this.landingPanel);
      }
    }
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

    if (this.heroVideo) {
      this.heroVideo.play().catch(() => {});
    }

    this.alignGrid();
    requestAnimationFrame(() => this.alignGrid());
    setTimeout(() => this.alignGrid(), 150);

    if (updateHistory) {
      this.router.navigateToLanding();
    }
  }

  showSelector(updateHistory = true) {
    this.stage.close();
    this.body.classList.add('mode-selector');

    if (this.heroVideo) {
      this.heroVideo.pause();
    }

    if (this.gridBackground) {
      this.gridBackground.style.removeProperty('--grid-size');
      this.gridBackground.style.removeProperty('--grid-offset-x');
      this.gridBackground.style.removeProperty('--grid-offset-y');
    }

    if (this.heroContent) {
      this.heroContent.style.removeProperty('padding-left');
    }

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
    if (this.heroVideo) {
      this.heroVideo.pause();
    }
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

  alignGrid() {
    if (!this.heroVideo || !this.gridBackground) return;
    if (this.landingPanel && !this.landingPanel.classList.contains('is-active')) return;

    const rect = this.heroVideo.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Video native coordinates: 1080 x 1920
    // Grid spacing: exactly 172px
    // First vertical grid line: x = 13px
    // First horizontal grid line: y = 5px
    const scale = rect.width / 1080;
    const gridSize = 172 * scale;
    const firstLineX = rect.left + 13 * scale;
    const firstLineY = rect.top + 5 * scale;

    let offsetX = firstLineX % gridSize;
    let offsetY = firstLineY % gridSize;
    if (offsetX < 0) offsetX += gridSize;
    if (offsetY < 0) offsetY += gridSize;

    this.gridBackground.style.setProperty('--grid-size', `${gridSize.toFixed(3)}px`);
    this.gridBackground.style.setProperty('--grid-offset-x', `${offsetX.toFixed(3)}px`);
    this.gridBackground.style.setProperty('--grid-offset-y', `${offsetY.toFixed(3)}px`);

    // Lock hero text flush to the adjacent vertical grid line for architectural symmetry
    if (this.heroContent && window.innerWidth > 900) {
      const container = document.querySelector('.site-container');
      const baseLeft = container
        ? container.getBoundingClientRect().left + parseFloat(window.getComputedStyle(container).paddingLeft || 0)
        : 48;

      const currentPos = baseLeft + 39.5;
      const lineIndex = Math.round((currentPos - offsetX) / gridSize);
      let targetLine = offsetX + lineIndex * gridSize;
      let snapPadding = targetLine - baseLeft;
      if (snapPadding < 20) {
        targetLine += gridSize;
        snapPadding = targetLine - baseLeft;
      }

      this.heroContent.style.paddingLeft = `${snapPadding.toFixed(2)}px`;
    } else if (this.heroContent) {
      this.heroContent.style.removeProperty('padding-left');
    }
  }
}
