/**
 * Application Entry Point
 * Bootstraps configuration, SEO Schema.org structured data, and PortalController.
 */

import './styles/index.css';
import { PortalController } from './controllers/portal.js';
import { getStructuredData } from './config/schema.js';
import { initTheme } from './ui/theme.js';
import { initHeroVideo } from './ui/hero-video.js';

function injectSchema() {
  const existingSchema = document.getElementById('schema-jsonld');
  if (!existingSchema) {
    const script = document.createElement('script');
    script.id = 'schema-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(getStructuredData());
    document.head.appendChild(script);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  injectSchema();
  initTheme();
  initHeroVideo();
  const portal = new PortalController();
  portal.start();
});
