import { getRelativeLocaleUrl } from 'astro:i18n'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { config } from '../config'
import { defaultLang, locales, useTranslations } from '../i18n'
import { entrySlug, getBlogPosts } from '../lib/content'

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error(
      'Set `url` in src/config.ts before generating the RSS feed.',
    )
  }

  const posts = (
    await Promise.all(locales.map((locale) => getBlogPosts(locale)))
  )
    .flat()
    .filter((post) => post.data.draft !== true)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

  return rss({
    title: config.title,
    description: useTranslations(defaultLang)('site.description'),
    site: context.site,
    items: posts.map((post) => {
      const locale = post.id.slice(0, post.id.indexOf('/'))
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: getRelativeLocaleUrl(locale, `blog/${entrySlug(post.id)}`),
      }
    }),
    customData: '<language>en</language>',
  })
}
