export const config = {
  title: 'Air',
  url: 'https://astro-air.guoqi.dev',
  defaultLocale: 'en',
  locales: ['en', 'zh', 'ja', 'ko'],
  blog: {
    // A positive integer, or 'all' to show every post.
    perPage: 10,
  } satisfies { perPage: number | 'all' },
  nav: [
    'home',
    'archive',
    'tags',
    {
      link: 'https://camlife.app',
      label: {
        default: 'Camlife',
        zh: '影集',
        ja: 'アルバム',
      },
    },
    {
      link: 'https://cyc.earth',
      label: {
        default: 'Cycling',
        zh: '骑行',
      },
    },
    'about',
  ],
}
