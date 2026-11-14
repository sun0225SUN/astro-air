import { satteri } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'
import { defaultLang, locales } from './src/i18n/ui'
import { mdastModifiedTimePlugin } from './src/mdast/mdast-modified-time'

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-air.guoqi.dev',
  integrations: [mdx()],
  markdown: {
    processor: satteri({
      mdastPlugins: [mdastModifiedTimePlugin],
    }),
  },
  i18n: {
    locales: [...locales],
    defaultLocale: defaultLang,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
})
