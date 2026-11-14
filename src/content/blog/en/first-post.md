---
title: First post
description: How posts in this blog are written and published.
pubDate: 2024-07-08
category: Notes
tags:
  - writing
  - markdown
---

Posts live in `src/content/blog/<locale>` as Markdown or MDX. Each file needs a title, a description, and a publication date. Astro checks that frontmatter against the blog collection schema before the site builds.

A new file becomes a page at `/<locale>/blog/` plus the file name. Nested folders are part of the URL, so `notes/hello.md` is served at `/<locale>/blog/notes/hello`.
