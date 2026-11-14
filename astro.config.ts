import { satteri } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { config } from './src/config'
import { defaultLang, locales } from './src/i18n'
import { modifiedTimePlugin, readingTimePlugin } from './src/lib/markdown'

// https://astro.build/config
export default defineConfig({
  site: config.url,
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: satteri({
      mdastPlugins: [modifiedTimePlugin, readingTimePlugin],
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
