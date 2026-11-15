export const config = {
  defaultLocale: 'en',
  locales: ['en', 'zh', 'zh-tw', 'ja', 'ko'],
  title: 'Air',
  description: {
    default:
      'Astro Air is a minimal multilingual blog theme made for independent writers. Clear typography and a comfortable reading experience come first, with light and dark themes, archives, categories, tags, RSS, responsive layouts, and Markdown/MDX authoring built in. It stays lightweight while leaving plenty of room for personal customization.',
    zh: 'Astro Air 是一款为独立写作者打造的极简多语言博客主题。它以清晰的排版和舒适的阅读体验为核心，内置深浅色主题、文章归档、分类与标签、RSS 订阅和响应式布局，并支持 Markdown/MDX 内容创作。保持足够轻盈，也为个性化扩展留出空间。',
    'zh-tw':
      'Astro Air 是一款為獨立寫作者打造的極簡多語部落格主題。它以清晰的排版與舒適的閱讀體驗為核心，內建深淺色主題、文章歸檔、分類與標籤、RSS 訂閱和響應式版面，並支援 Markdown/MDX 內容創作。保持足夠輕盈，也為個人化擴充保留空間。',
    ja: 'Astro Air は、個人で活動する書き手のためのミニマルな多言語ブログテーマです。読みやすいタイポグラフィと心地よい読書体験を中心に、ライト・ダークテーマ、アーカイブ、カテゴリー、タグ、RSS、レスポンシブレイアウト、Markdown/MDX 執筆環境を備えています。軽快さを保ちながら、自分らしく拡張できる余白も残しています。',
    ko: 'Astro Air는 독립적으로 글을 쓰는 사람을 위한 미니멀 다국어 블로그 테마입니다. 명확한 타이포그래피와 편안한 읽기 경험을 중심으로 라이트·다크 테마, 아카이브, 분류, 태그, RSS, 반응형 레이아웃, Markdown/MDX 작성 환경을 기본 제공합니다. 가볍게 유지하면서도 자신만의 방식으로 확장할 여백을 남겨 둡니다.',
  },
  favicon: [
    { href: '/favicon.svg', type: 'image/svg+xml' },
    { href: '/favicon.ico' },
  ],

  url: 'https://astro-air.guoqi.dev',
  author: 'Guoqi Sun',
  blog: {
    // A positive integer, or 'all' to show every post.
    perPage: 10,
  } satisfies { perPage: number | 'all' },
  // Excalifont for Latin. Xiaolai, slightly larger, for other scripts.
  handwriting: true,
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

export function siteDescription(locale: string) {
  const descriptions: Record<string, string> = config.description
  return descriptions[locale] ?? config.description.default
}
