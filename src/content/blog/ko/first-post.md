---
title: 첫 글
description: 이 블로그에서 글을 쓰고 공개하는 방법.
pubDate: 2024-07-08
category: 노트
tags:
  - 글쓰기
  - Markdown
---

글은 `src/content/blog/<언어>`에 Markdown 또는 MDX로 둡니다. 제목, 설명, 공개일이 필요합니다. 빌드 전에 Astro가 블로그 컬렉션 schema로 이 값을 확인합니다.

새 파일의 주소는 `/<언어>/blog/`에 파일 이름을 붙인 것입니다. 폴더도 경로가 되므로 `notes/hello.md`는 `/<언어>/blog/notes/hello`가 됩니다.
