/**
 * Schema.org JSON-LD Structured Data Generator
 * Implements specifications from google.md for rich results, Entity Knowledge Graph, and AI search.
 */

import { SITE_CONFIG } from './site.js';

export function getStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.url}/#website`,
        url: `${SITE_CONFIG.url}/`,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        inLanguage: 'en-US',
        publisher: {
          '@id': `${SITE_CONFIG.url}/#person`
        }
      },
      {
        '@type': 'Person',
        '@id': `${SITE_CONFIG.url}/#person`,
        name: SITE_CONFIG.author.name,
        url: SITE_CONFIG.url,
        jobTitle: SITE_CONFIG.author.jobTitle,
        description: 'AI Builder and Creative Technologist exploring artificial intelligence, software engineering, and interactive 3D computing.',
        sameAs: SITE_CONFIG.author.sameAs
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_CONFIG.url}/#experiences`,
        name: 'Interactive 3D Experiences & Worlds',
        description: 'Three interactive 3D WebGL experiences integrated into BhavishyaSingla.com',
        numberOfItems: 3,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'CreativeWork',
              name: SITE_CONFIG.experiences.room.title,
              headline: SITE_CONFIG.experiences.room.title,
              description: SITE_CONFIG.experiences.room.description,
              url: `${SITE_CONFIG.url}/room`
            }
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'CreativeWork',
              name: SITE_CONFIG.experiences.world.title,
              headline: SITE_CONFIG.experiences.world.title,
              description: SITE_CONFIG.experiences.world.description,
              url: `${SITE_CONFIG.url}/world`
            }
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'CreativeWork',
              name: SITE_CONFIG.experiences.folio.title,
              headline: SITE_CONFIG.experiences.folio.title,
              description: SITE_CONFIG.experiences.folio.description,
              url: `${SITE_CONFIG.url}/folio`
            }
          }
        ]
      }
    ]
  };
}
