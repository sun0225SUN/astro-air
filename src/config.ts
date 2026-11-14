export const config = {
  title: 'Air',
  url: 'https://astro-air.guoqi.dev',
  defaultLocale: 'en',
  locales: ['en', 'zh', 'zh-tw', 'ja', 'ko'],
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
        'zh-tw': '影集',
        ja: 'アルバム',
        ko: '앨범',
      },
    },
    {
      link: 'https://cyc.earth',
      label: {
        default: 'Cycling',
        zh: '骑行',
        'zh-tw': '騎行',
        ja: 'サイクリング',
        ko: '라이딩',
      },
    },
    'about',
  ],
}
