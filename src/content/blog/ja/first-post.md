---
title: 最初の記事
description: このブログの記事を書いて公開する手順。
pubDate: 2024-07-08
category: ノート
tags:
  - 執筆
  - Markdown
---

記事は `src/content/blog/<言語>` に Markdown または MDX で置きます。タイトル、説明、公開日が必要です。ビルド前に、Astro がブログコレクションの schema でこれらを確認します。

新しいファイルの URL は `/<言語>/blog/` にファイル名を足したものです。フォルダもパスになるので、`notes/hello.md` は `/<言語>/blog/notes/hello` になります。
