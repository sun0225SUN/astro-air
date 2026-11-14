# Astro Air

[中文](./README.zh-CN.md)

A minimal multilingual blog theme for [Astro](https://astro.build).

Live site: [astro-air.guoqi.dev](https://astro-air.guoqi.dev)

## Features

- English, Simplified Chinese, Japanese, and Korean
- Home, archive, tags, categories, and custom pages
- Reading time, and a last-modified time taken from Git
- A table of contents that smooth-scrolls to the heading
- Light and dark themes, with a view transition between pages
- One RSS feed for every published post
- Pagination, or a single page that lists every post

## Requirements

[Bun](https://bun.sh) 1.4.4 or newer. `package.json` pins `packageManager` to `bun@1.4.4`.

## Start

```bash
git clone https://github.com/sun0225SUN/astro-air
cd astro-air
git switch dev
bun install
bun dev
```

`defaultLocale` in `src/config.ts` is served at `/`, with no language prefix. The other locales keep a prefix, such as `/zh/` when English is the default. Changing `defaultLocale` moves that language to the domain root. There is no redirect page.

| Command | Purpose |
| --- | --- |
| `bun dev` | Start the dev server |
| `bun run build` | Build the static site into `dist/` |
| `bun run preview` | Serve the build |
| `bun run lint` | Check formatting and lint with Biome |
| `bun run format` | Format with Biome |

Package scripts run on Bun. `bunfig.toml` sets that, because the Astro CLI ships with a Node shebang.

## Layout

```text
src/config.ts              Site title, URL, locales, navigation, page size
messages/                  Interface copy, one JSON file per locale
src/content/blog/<locale>  Posts
src/content/pages/<locale> Standalone pages such as about and links
src/i18n/                  Locale list and the t() lookup
src/pages/                 Routes
public/                    Favicon, fonts, and other static files
```

## Configuration

`src/config.ts` is the only site config:

```ts
export const config = {
  title: 'Air',
  url: 'https://astro-air.guoqi.dev',
  defaultLocale: 'en',
  locales: ['en', 'zh', 'ja', 'ko'],
  blog: {
    // A positive integer, or 'all' to show every post.
    perPage: 10,
  },
  nav: [
    'home',
    'archive',
    'tags',
    'about',
  ],
}
```

`url` is the canonical site address. Astro uses it for the RSS feed.

`locales` is both the list and the order of languages. The language button cycles through that list and stays on the same page when the translation exists. Each code needs a `messages/<code>.json` file with the same nested keys as `messages/en.json`. A missing file fails the build. `t('blog.latest')` reads those nested keys.

`nav` mixes three kinds of items, in the order they should appear:

| Item | Result |
| --- | --- |
| `'home'` | Home. The label comes from `nav.home`. |
| `'archive'` or `'blog'` | The archive at `/blog`. The label comes from `nav.archive`. |
| `'tags'` | The tag index at `/blog/tag`. The label comes from `nav.tags`. |
| `'about'` | A page whose file name is `about`, using that page's title. |
| `{ link, label }` | Any URL. `label.default` is the fallback. Add `zh`, `ja`, or another locale key to override it. |

`blog.perPage` is a positive integer, or `'all'` to show every post on one page.

## Write a post

Add a `.md` or `.mdx` file under `src/content/blog/<locale>/`. The file name is the slug. A folder becomes part of the URL, so `notes/hello.md` is served at `/<locale>/blog/notes/hello`.

```markdown
---
title: First post
description: How posts in this blog are written and published.
pubDate: 2024-07-08
updatedDate: 2024-08-01
draft: false
category: Notes
tags:
  - writing
  - markdown
---
```

`title`, `description`, and `pubDate` are required. `updatedDate`, `draft`, `category`, and `tags` are optional. Tags default to an empty list.

`draft: true` stays visible while you run `bun dev`, and is left out of `bun run build` and the RSS feed.

Translate a post by adding the same file name under each locale folder. A locale that has no file has no page for that slug.

The archive groups posts by year and shows `MM-DD` beside the title. The home page and tag pages show `YYYY-MM-DD`. Visited titles turn purple.

Headings from `h2` and `h3` become the table of contents on wide screens. Clicking one smooth-scrolls to that heading.

## Write a page

Standalone pages live in `src/content/pages/<locale>/`. The file name, without the extension, is the URL. `about.mdx` is `/<locale>/about`.

```markdown
---
title: About
description: A custom page stored with the other standalone pages.
order: 1
draft: false
---
```

`title` and `description` are required. `order` sorts pages when something lists them. `draft` behaves the same way it does for posts.

To put a page in the header, add its slug to `nav`, for example `'about'`. A file named `blog` is reserved and is not treated as a custom page.

MDX files can import components from `src/components/`.

## Interface copy

Edit `messages/en.json`, `messages/zh.json`, `messages/ja.json`, and `messages/ko.json`. Keys are nested. In a component, `t('post.readingTime', { minutes })` replaces `{minutes}` in the string.

To add a language:

1. Append its code to `locales` in `src/config.ts`.
2. Add `messages/<code>.json` with the same keys as `messages/en.json`.
3. Put posts and pages in `src/content/blog/<code>/` and `src/content/pages/<code>/`.

`defaultLocale` must be one of `locales`.

## Analytics

Umami loads only when both variables are set. Copy `.env.example` to `.env` for local builds, and set the same variables in the host for production.

```bash
UMAMI_URL=https://umami.example
UMAMI_WEBSITE_ID=your-website-id
```

`UMAMI_URL` is the Umami origin, without a trailing slash. The site adds `/script.js` and `/recorder.js`, and passes `UMAMI_WEBSITE_ID` as `data-website-id`.

## RSS

`/rss.xml` lists every published post in every locale. Each item links to its locale-prefixed URL. Drafts are omitted.

## License

[GPL-3.0-only](./LICENSE)
