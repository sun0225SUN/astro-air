import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'
import { defaultLang, locales } from './src/i18n/ui'

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-air.guoqi.dev',
  integrations: [mdx()],
  i18n: {
    locales: [...locales],
    defaultLocale: defaultLang,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
})
