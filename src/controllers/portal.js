/**
 * Portal Controller
 * Manages view transitions and top-level user interactions.
 */

import { ExperienceStage } from './stage.js';
import { AppRouter } from './router.js';
import { initProjects } from '../ui/projects.js';

export class PortalController {
  constructor() {
    this.body = document.body;
    this.landingPanel = document.getElementById('view-landing');
    this.selectorPanel = document.getElementById('view-selector');
    this.projectsPanel = document.getElementById('view-projects');
    this.subPanels = [this.selectorPanel, this.projectsPanel].filter(Boolean);
    this.heroVideo = document.getElementById('hero-video');
    this.heroContent = document.querySelector('.hero-content');
    this.siteHeader = document.querySelector('.site-header');
    this.gridBackground = document.getElementById('grid-background');

    this.alignGrid = this.alignGrid.bind(this);

    this.stage = new ExperienceStage({
      stage: document.getElementById('experience-stage'),
      container: document.getElementById('iframe-container'),
      title: document.getElementById('stage-title'),
      loading: document.getElementById('stage-loading')
    });

    this.projects = initProjects();
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

    // Explore Projects CTA click
    const btnProjects = document.getElementById('btn-projects');
    if (btnProjects) {
      btnProjects.addEventListener('click', (e) => {
        e.preventDefault();
        this.showProjects(true);
      });
    }

    // Back buttons (worlds selector and projects index)
    ['btn-selector-back', 'btn-projects-back'].forEach((id) => {
      const btnBack = document.getElementById(id);
      if (btnBack) {
        btnBack.addEventListener('click', (e) => {
          e.preventDefault();
          this.showLanding(true);
        });
      }
    });

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
        if (this.projects.isOpen()) {
          this.projects.close();
        } else if (this.stage.isActive()) {
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
    this.projects.close();
    clearTimeout(this.subPanelTimer);
    this.body.classList.remove('mode-selector');

    this.subPanels.forEach((panel) => {
      panel.classList.remove('is-active');
      panel.setAttribute('aria-hidden', 'true');
    });

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
    this.showSubPanel(this.selectorPanel);
    this.prefetchWorldAssets();

    if (updateHistory) {
      this.router.navigateToSelector();
    }
  }

  showProjects(updateHistory = true) {
    this.showSubPanel(this.projectsPanel);

    if (updateHistory) {
      this.router.navigateToProjects();
    }
  }

  /**
   * Warm the HTTP cache with the Infinite World avatar while the visitor is
   * still choosing, so the character is ready the moment the world opens.
   */
  prefetchWorldAssets() {
    if (this.didPrefetchWorld) return;
    this.didPrefetchWorld = true;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/world/models/player.glb';
    link.as = 'fetch';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  showSubPanel(targetPanel) {
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
    if (this.siteHeader) {
      this.siteHeader.style.removeProperty('padding-left');
    }
    document.documentElement.style.removeProperty('--social-edge-right');

    this.landingPanel.classList.add('is-exiting');
    this.landingPanel.classList.remove('is-active');
    this.landingPanel.setAttribute('aria-hidden', 'true');

    this.subPanels.forEach((panel) => {
      if (panel !== targetPanel) {
        panel.classList.remove('is-active');
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    clearTimeout(this.subPanelTimer);
    this.subPanelTimer = setTimeout(() => {
      targetPanel.classList.add('is-active');
      targetPanel.setAttribute('aria-hidden', 'false');
    }, 150);
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

    // Apply pixel-snapped grid to background across all screens (desktop, tablet, mobile)
    this.gridBackground.style.setProperty('--grid-size', `${gridSize.toFixed(3)}px`);
    this.gridBackground.style.setProperty('--grid-offset-x', `${offsetX.toFixed(3)}px`);
    this.gridBackground.style.setProperty('--grid-offset-y', `${offsetY.toFixed(3)}px`);

    // Lock brand and hero text flush to the grid lines for architectural symmetry on desktop landscape
    const isDesktop = window.innerWidth > 1024 && window.innerWidth > window.innerHeight;
    if (isDesktop) {
      document.documentElement.style.setProperty('--grid-size', `${gridSize.toFixed(3)}px`);

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

      // Brand and hero content sit flush on the exact same primary grid line for clean architectural symmetry
      if (this.siteHeader) {
        this.siteHeader.style.paddingLeft = `${snapPadding.toFixed(2)}px`;
      }
      if (this.heroContent) {
        this.heroContent.style.paddingLeft = `${snapPadding.toFixed(2)}px`;
      }
      // Articles corner (bottom-left) sits on the same vertical grid line as the headline
      document.documentElement.style.setProperty('--articles-edge-left', `${(baseLeft + snapPadding).toFixed(2)}px`);

      // Align right edge of socials anchored to the video right edge with comfortable ~14px inset
      const rightOffset = Math.max(24, window.innerWidth - rect.right) + 14;
      document.documentElement.style.setProperty('--social-edge-right', `${rightOffset.toFixed(2)}px`);

      // Snap socials baseline/bottom directly to the horizontal grid line below
      const socials = document.querySelector('.social-edge');
      const socialLink = document.querySelector('.social-link');
      if (socials && socialLink) {
        const targetLineY = offsetY + Math.round((window.innerHeight - 50 - offsetY) / gridSize) * gridSize;
        const lRect = socialLink.getBoundingClientRect();
        const curBottom = parseFloat(window.getComputedStyle(socials).bottom || 57);
        const diff = targetLineY - lRect.bottom;
        const snappedBottom = curBottom - diff;
        document.documentElement.style.setProperty('--social-edge-bottom', `${snappedBottom.toFixed(2)}px`);
      }

      // Vertical grid alignment: snap button top border to a horizontal grid line
      const btn = document.getElementById('btn-explore');
      if (this.heroContent && btn) {
        const currentBtnTop = btn.getBoundingClientRect().top;
        const rawBtnTop = currentBtnTop - (this.heroShiftY || 0);
        const targetBtnTop = offsetY + Math.round((rawBtnTop - offsetY) / gridSize) * gridSize;
        this.heroShiftY = targetBtnTop - rawBtnTop;
        this.heroContent.style.transform = `translateY(${this.heroShiftY.toFixed(2)}px)`;
      }
    } else {
      // Mobile screen cleanup: clear desktop-specific padding snaps
      document.documentElement.style.removeProperty('--grid-size');

      if (this.heroContent) {
        this.heroContent.style.removeProperty('padding-left');
        this.heroContent.style.removeProperty('transform');
      }
      if (this.siteHeader) this.siteHeader.style.removeProperty('padding-left');
      document.documentElement.style.removeProperty('--social-edge-right');
      document.documentElement.style.removeProperty('--social-edge-bottom');
      document.documentElement.style.removeProperty('--articles-edge-left');
      this.heroShiftY = 0;
    }
  }
}
