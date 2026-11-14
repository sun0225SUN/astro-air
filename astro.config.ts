import { readFileSync, writeFileSync } from 'node:fs'
import { cp, readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { satteri } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'
import { config } from './src/config'
import { defaultLang, locales } from './src/i18n'
import { modifiedTimePlugin, readingTimePlugin } from './src/lib/markdown'

syncDefaultLocaleRewrites(defaultLang)

// https://astro.build/config
export default defineConfig({
  site: config.url,
  env: {
    schema: {
      UMAMI_URL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      UMAMI_WEBSITE_ID: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
  integrations: [mdx(), unprefixDefaultLocale(defaultLang)],
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
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
})

// The configured default locale is built under /<code>. Move it to the site
// root so that language has no prefix and `/` is not a redirect page.
function unprefixDefaultLocale(locale: string) {
  return {
    name: 'unprefix-default-locale',
    hooks: {
      'astro:build:done': async ({ dir }: { dir: URL }) => {
        const root = fileURLToPath(dir)
        const source = join(root, locale)
        const entries = await readdir(source)
        await Promise.all(
          entries.map(async (entry) => {
            const target = join(root, entry)
            await rm(target, { recursive: true, force: true })
            await cp(join(source, entry), target, { recursive: true })
          }),
        )
        await rm(source, { recursive: true, force: true })
      },
    },
  }
}

// Old prefixed URLs for the default locale should serve the root pages.
// The locale code comes from src/config.ts, not a fixed language.
function syncDefaultLocaleRewrites(locale: string) {
  const file = fileURLToPath(new URL('./vercel.json', import.meta.url))
  const current = JSON.parse(readFileSync(file, 'utf8')) as {
    rewrites?: { source: string; destination: string }[]
  }
  const rewrites = [
    { source: `/${locale}`, destination: '/' },
    { source: `/${locale}/`, destination: '/' },
    { source: `/${locale}/:path*`, destination: '/:path*' },
  ]
  if (JSON.stringify(current.rewrites) === JSON.stringify(rewrites)) return
  current.rewrites = rewrites
  writeFileSync(file, `${JSON.stringify(current, null, 2)}\n`)
}
