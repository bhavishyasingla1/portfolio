/**
 * Experience Stage Controller
 * Manages dynamic lifecycle, iframe injection, and WebGL/audio cleanup.
 */

import { SITE_CONFIG } from '../config/site.js';

export class ExperienceStage {
  constructor(elements) {
    this.stageEl = elements.stage;
    this.containerEl = elements.container;
    this.titleEl = elements.title;
    this.loadingEl = elements.loading;
    this.activeIframe = null;
    this.currentExpId = null;
  }

  loadExperience(expId) {
    const config = SITE_CONFIG.experiences[expId];
    if (!config) return;

    this.currentExpId = expId;

    if (this.titleEl) {
      this.titleEl.textContent = config.shortTitle;
    }

    if (this.loadingEl) {
      this.loadingEl.classList.remove('is-hidden');
    }

    // Unload prior iframe
    this.cleanup();

    // Create fresh iframe
    const iframe = document.createElement('iframe');
    iframe.src = config.path;
    iframe.title = config.title;
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen');
    iframe.setAttribute('allowfullscreen', 'true');

    iframe.onload = () => {
      setTimeout(() => {
        if (this.loadingEl) {
          this.loadingEl.classList.add('is-hidden');
        }
      }, 350);
    };

    this.containerEl.appendChild(iframe);
    this.activeIframe = iframe;

    this.stageEl.classList.add('is-active');
    this.stageEl.setAttribute('aria-hidden', 'false');
  }

  close() {
    this.stageEl.classList.remove('is-active');
    this.stageEl.setAttribute('aria-hidden', 'true');

    // Immediately remove iframe to free WebGL context, textures, animations and mute audio
    this.cleanup();
    this.currentExpId = null;
  }

  cleanup() {
    if (this.containerEl) {
      this.containerEl.innerHTML = '';
    }
    this.activeIframe = null;
  }

  isActive() {
    return this.currentExpId !== null;
  }
}
