---
title: Your article title, written the way people search for it
description: One or two sentences (120–160 characters) that answer the reader's question. Used in Google results and link previews.
date: 2026-11-10
updated: 2026-11-10
topic: AI Tools
keywords: [AI, GitHub, Guide]
image: /articles/images/your-cover.webp
image_alt: Describe the cover image in one sentence
draft: true
---

`topic` must be one of the topics listed in `ARTICLE_TOPICS` at the top of `scripts/build-pages.js` (one per article; it becomes a filter on the Articles page). `keywords` are for search engines and the on-page search only, and are never shown.

Files starting with "_" are never published. Copy this file, rename it to the URL you want
(for example `best-ai-github-repos.md` becomes /articles/best-ai-github-repos), fill in the
frontmatter above and delete `draft: true` when it is ready. `image` is optional: a 1600×840
cover shown at the top and used in the share image. Leave it out and a text-only card is made.

Open with two or three sentences that tell the reader what they will get.

## Use H2 headings for each main section

They become the "On this page" menu and get their own shareable links.

### H3 for sub-points

- Lists, **bold**, `inline code`, [links](https://example.com) and tables all work.
- Images: `![Describe the image for accessibility](/articles/images/file.webp "Optional caption")`
  (put image files in `public/articles/images/`).

```js
// Code blocks are styled too
console.log('hello');
```

> Quotes get the neon accent bar.
