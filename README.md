# Astro Air

A minimalism, personal blog theme for Astro.

> If you find this project helpful, please consider giving it a star ⭐️

[![Built with Astro](https://astro.badg.es/v1/built-with-astro/tiny.svg)](https://astro.build) [![Netlify Status](https://api.netlify.com/api/v1/badges/3e2c71b9-071f-4846-9321-41c949134ebf/deploy-status)](https://app.netlify.com/sites/astro-air/deploys)

<img style="border-radius: 10px;" src="https://cdn.jsdelivr.net/gh/sun0225SUN/astro-air/public/preview.png" alt="Astro Air">

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
- [x] 🎨 Enhance Transition and Animation
- [ ] 🔍 Local search functionality
- [ ] ...and more

## Quick Start

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sun0225SUN/astro-air)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sun0225SUN/astro-air)

## Configuration

- Open `src/config/index.ts` and customize your site settings

- Open `src/config/links.ts` and customize your site links

- Open `src/config/zh(en)/about.mdx(intro.mdx、links.mdx)` and customize your pages content

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

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.


# Astro Starter Kit: Basics

```sh
bun create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
