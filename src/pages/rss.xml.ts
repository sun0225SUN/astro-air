import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { config } from '../config'
import en from '../../messages/en.json'
import { entrySlug } from '../lib/content'

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error(
      'Set `site` in astro.config.ts before generating the RSS feed.',
    )
  }

  const posts = await getCollection('blog', ({ data }) => data.draft !== true)
  const items = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => {
      const locale = post.id.slice(0, post.id.indexOf('/'))
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/${locale}/blog/${entrySlug(post.id)}`,
      }
    })

  return rss({
    title: config.title,
    description: en.site.description,
    site: context.site,
    items,
    customData: '<language>en</language>',
  })
}
