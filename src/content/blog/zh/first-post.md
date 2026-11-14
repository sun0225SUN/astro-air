---
title: 第一篇文章
description: 这个博客里的文章是怎么写、怎么发布的。
pubDate: 2024-07-08
---

文章放在 `src/content/blog/<语言>` 里，可以是 Markdown 或 MDX。每篇都要有标题、简介和发布日期。构建之前，Astro 会按博客集合的 schema 检查这些字段。

新文件的地址是 `/<语言>/blog/` 加上文件名。子目录会成为路径的一部分，所以 `notes/hello.md` 对应 `/<语言>/blog/notes/hello`。
