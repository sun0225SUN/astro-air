---
title: 第一篇文章
description: 這個博客裡的文章是怎麼寫、怎麼發佈的。
pubDate: 2024-07-08
category: 筆記
tags:
  - 寫作
  - Markdown
---

文章放在 `src/content/blog/<語言>` 裡，可以是 Markdown 或 MDX。每篇都要有標題、簡介和發佈日期。構建之前，Astro 會按博客集合的 schema 檢查這些字段。

新文件的地址是 `/<語言>/blog/` 加上文件名。子目錄會成為路徑的一部分，所以 `notes/hello.md` 對應 `/<語言>/blog/notes/hello`。
