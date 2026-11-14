import { type CollectionEntry, getCollection } from 'astro:content'

function isPublished(data: { draft?: boolean }) {
  return import.meta.env.PROD ? data.draft !== true : true
}

export async function getBlogPosts() {
  const posts = await getCollection('blog', ({ data }) => isPublished(data))
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
}

export async function getCustomPages() {
  const pages = await getCollection('pages', ({ data }) => isPublished(data))
  return pages
    .filter((page) => page.id !== 'blog')
    .sort(
      (a, b) =>
        (a.data.order ?? 0) - (b.data.order ?? 0) ||
        a.data.title.localeCompare(b.data.title),
    )
}

export type BlogPost = CollectionEntry<'blog'>
export type CustomPage = CollectionEntry<'pages'>
