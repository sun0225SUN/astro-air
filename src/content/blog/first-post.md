---
title: First post
description: How posts in this blog are written and published.
pubDate: 2024-07-08
---

Posts live in `src/content/blog` as Markdown or MDX. Each file needs a title, a description, and a publication date. Astro checks that frontmatter against the blog collection schema before the site builds.

A new file becomes a page at `/blog/` plus the file name. Nested folders are part of the URL, so `notes/hello.md` is served at `/blog/notes/hello`.
