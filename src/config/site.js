/**
 * Site Configuration & Registry
 * Centralized settings for metadata, experiences, social profiles, and routing.
 */

export const SITE_CONFIG = {
  name: 'Bhavishya Singla',
  title: 'Bhavishya Singla — AI, Technology & Interactive 3D Worlds',
  shortTitle: 'Bhavishya Singla',
  headline: 'FIGURING THINGS OUT.',
  subtitle: 'AI · TECHNOLOGY · CREATIVITY',
  tagline: 'AI, Technology & Creative Engineering',
  description: 'Official portal of Bhavishya Singla exploring AI, technology, and creativity through three cloned interactive 3D WebGL experiences: My Room in 3D, Infinite World, and Folio.',
  url: 'https://bhavishyasingla.com',
  locale: 'en_US',
  author: {
    name: 'Bhavishya Singla',
    jobTitle: 'AI Builder & Creative Technologist',
    url: 'https://bhavishyasingla.com',
    sameAs: [
      'https://www.linkedin.com/in/bhavishyasingla1/',
      'https://www.youtube.com/@bhavishyasingla1',
      'https://www.instagram.com/bhavishyasingla1/',
      'https://x.com/Bhavishyas_1'
    ]
  },
  socials: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bhavishyasingla1/',
      rel: 'noopener noreferrer me'
    },
    {
      id: 'youtube',
      label: 'YouTube',
      url: 'https://www.youtube.com/@bhavishyasingla1',
      rel: 'noopener noreferrer me'
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/bhavishyasingla1/',
      rel: 'noopener noreferrer me'
    },
    {
      id: 'x',
      label: 'X',
      url: 'https://x.com/Bhavishyas_1',
      rel: 'noopener noreferrer me'
    }
  ],
  experiences: {
    room: {
      id: 'room',
      num: '01',
      title: 'MY ROOM IN 3D',
      shortTitle: 'MY ROOM',
      tag: 'ISOMETRIC 3D SPACE',
      path: '/room/',
      directPath: '/room/index.html',
      route: '/room',
      hash: '#room',
      description: 'Creative isometric 3D bedroom scene built with Three.js and Webpack.',
      sourceRepo: 'https://github.com/brunosimon/my-room-in-3d'
    },
    world: {
      id: 'world',
      num: '02',
      title: 'INFINITE WORLD',
      shortTitle: 'INFINITE WORLD',
      tag: 'PROCEDURAL TERRAIN',
      path: '/world/',
      directPath: '/world/index.html',
      route: '/world',
      hash: '#world',
      description: 'Procedurally generated infinite 3D terrain exploration in WebGL.',
      sourceRepo: 'https://github.com/brunosimon/infinite-world'
    },
    folio: {
      id: 'folio',
      num: '03',
      title: 'FOLIO',
      shortTitle: 'FOLIO',
      tag: 'PHYSICS PLAYGROUND',
      path: '/folio/',
      directPath: '/folio/index.html',
      route: '/folio',
      hash: '#folio',
      description: 'Interactive 3D car physics playground and exploration world by Bhavishya Singla.',
      sourceRepo: 'https://github.com/brunosimon/folio-2019'
    }
  }
};
