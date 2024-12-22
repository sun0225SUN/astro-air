# Astro Air

A minimalism, personal blog theme for Astro

[![Built with Astro](https://astro.badg.es/v1/built-with-astro/tiny.svg)](https://astro.build) [![Netlify Status](https://api.netlify.com/api/v1/badges/a4eb6e88-606d-4ea6-9a53-179e03a7e2ef/deploy-status)](https://app.netlify.com/sites/astro-air/deploys)

>
> If you find this project helpful, please consider giving it a star ⭐️

## Showcase

- [Astro Air](https://astro-air.guoqi.dev)
- [Guoqi's blog](https://blog.sunguoqi.com)
- ...

> welcome to add your own blog to the list ❤️

## Features

- [x] 🌓 Dark mode support
- [x] 📱 Fully device responsive
- [x] 🎨 Clean and minimalist design
- [x] 📝 Markdown/MDX for content authoring
- [x] 🏄‍♂️ SSG static rendering, SEO friendly
- [x] 🌐 i18n support (EN/ZH)
- [x] 🔗 Social media integration
- [x] 📰 RSS feed & sitemap support
- [x] 🛠️ Google analysis integration
- [x] 💬 Commenting Integration (Twikoo)
- [ ] 🔍 Local search functionality
- [ ] 🎨 Enhance Transition and Animation
- [ ] ...and more

## Quick Start

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sun0225SUN/astro-air)

   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sun0225SUN/astro-air)


## Configuration

### Common Settings

1. Open `src/config/index.ts` and customize your site settings:

```typescript
export const common = {
  meta: {
    favicon: "/favicon.ico",
    url: "https://blog.sunguoqi.com",
  },
  googleAnalyticsId: "G-W37MQ05DRE",
  social: [
    {
      icon: Twitter,
      label: "X",
      link: "https://x.com/sun0225SUN",
    },
    {
      icon: Github,
      label: "GitHub",
      link: "https://github.com/sun0225SUN",
    },
  ],
  rss: true,
  navigation: {
    home: true,
    archive: true,
    custom: [
      {
        label: "CamLife",
        link: "https://camlife.cn",
      },
    ],
    about: true,
  },
  latestPosts: 8,
}
```

### ZH Settings

```typescript
export const zh = {
  ...common,
  siteName: "小孙同学",
  meta: {
    ...common.meta,
    title: "小孙同学",
    slogan: "一个浪漫的理性主义者",
    description: "读书、摄影、编程、旅行",
  },
  navigation: {
    ...common.navigation,
    custom: [
      {
        label: "影集",
        link: "https://camlife.cn",
      },
    ],
  },
}
```

### EN Settings

```typescript
export const en = {
  ...common,
  siteName: "Guoqi Sun",
  meta: {
    ...common.meta,
    title: "Guoqi Sun",
    slogan: "A Romantic Rationalist",
    description: "Reading, Photography, Programming, Traveling",
  },
  navigation: {
    ...common.navigation,
    custom: [
      {
        label: "CamLife",
        link: "https://camlife.cn",
      },
    ],
  },
}
```

## Writing Content

1. Create new blog posts in the `src/content/posts/` directory
2. Use the following frontmatter template:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
pubDate: YYYY-MM-DD
updatedDate(optional): YYYY-MM-DD
tags(optional): ["tag1", "tag2"]
ogImage(optional): "cover image URL"
---

Your content here...
```

## Update Theme

```bash
git remote add upstream https://github.com/sun0225SUN/astro-air

git fetch upstream

git merge upstream/main --allow-unrelated-histories

```

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

```bash
git clone https://github.com/sun0225SUN/astro-air

cd astro-air

pnpm install

pnpm dev
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
