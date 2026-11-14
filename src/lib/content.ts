import { type CollectionEntry, getCollection } from 'astro:content'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { isLocale, type Locale } from '../i18n/ui'

function isPublished(data: { draft?: boolean }) {
  return import.meta.env.PROD ? data.draft !== true : true
}

export function entrySlug(id: string) {
  const slash = id.indexOf('/')
  return slash === -1 ? id : id.slice(slash + 1)
}

function inLocale(id: string, locale: Locale) {
  return id.startsWith(`${locale}/`)
}

export async function getBlogPosts(locale: Locale) {
  const posts = await getCollection(
    'blog',
    ({ id, data }) => inLocale(id, locale) && isPublished(data),
  )
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
}

export function taxonomySlug(value: string) {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/[\\/]+/g, '-')
    .replace(/\s+/g, '-')
}

export type Term = {
  name: string
  slug: string
  count: number
}

function collectTerms(
  posts: BlogPost[],
  locale: Locale,
  pick: (post: BlogPost) => string[],
) {
  const terms = new Map<string, Term>()
  for (const post of posts) {
    for (const name of pick(post)) {
      const slug = taxonomySlug(name)
      const existing = terms.get(slug)
      if (existing) {
        existing.count += 1
      } else {
        terms.set(slug, { name, slug, count: 1 })
      }
    }
  }
  return [...terms.values()].sort((a, b) =>
    a.name.localeCompare(b.name, locale),
  )
}

export async function getCategories(locale: Locale) {
  const posts = await getBlogPosts(locale)
  return collectTerms(posts, locale, (post) =>
    post.data.category ? [post.data.category] : [],
  )
}

export async function getTags(locale: Locale) {
  const posts = await getBlogPosts(locale)
  return collectTerms(posts, locale, (post) => post.data.tags)
}

export async function getPostsByCategory(locale: Locale, slug: string) {
  const posts = await getBlogPosts(locale)
  return posts.filter(
    (post) =>
      post.data.category !== undefined &&
      taxonomySlug(post.data.category) === slug,
  )
}

export async function getPostsByTag(locale: Locale, slug: string) {
  const posts = await getBlogPosts(locale)
  return posts.filter((post) =>
    post.data.tags.some((tag) => taxonomySlug(tag) === slug),
  )
}

export async function getCustomPages(locale: Locale) {
  const pages = await getCollection(
    'pages',
    ({ id, data }) => inLocale(id, locale) && isPublished(data),
  )
  return pages
    .filter((page) => entrySlug(page.id) !== 'blog')
    .sort(
      (a, b) =>
        (a.data.order ?? 0) - (b.data.order ?? 0) ||
        a.data.title.localeCompare(b.data.title, locale),
    )
}

export async function hasLocalePath(locale: Locale, path: string) {
  if (
    path === '' ||
    path === 'blog' ||
    path === 'blog/category' ||
    path === 'blog/tag'
  ) {
    return true
  }
  if (path.startsWith('blog/category/')) {
    const slug = path.slice('blog/category/'.length)
    const categories = await getCategories(locale)
    return categories.some((category) => category.slug === slug)
  }
  if (path.startsWith('blog/tag/')) {
    const slug = path.slice('blog/tag/'.length)
    const tags = await getTags(locale)
    return tags.some((tag) => tag.slug === slug)
  }
  if (path.startsWith('blog/')) {
    const slug = path.slice('blog/'.length)
    const posts = await getBlogPosts(locale)
    return posts.some((post) => entrySlug(post.id) === slug)
  }
  const pages = await getCustomPages(locale)
  return pages.some((page) => entrySlug(page.id) === path)
}

export function contentPath(pathname: string, locale: Locale) {
  const prefix = `/${locale}`
  if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) return ''
  return pathname.slice(prefix.length).replace(/^\/+|\/+$/g, '')
}

export async function localeHref(locale: Locale, path: string) {
  if (await hasLocalePath(locale, path))
    return getRelativeLocaleUrl(locale, path)
  if (path.startsWith('blog/category')) {
    return getRelativeLocaleUrl(locale, 'blog/category')
  }
  if (path.startsWith('blog/tag')) {
    return getRelativeLocaleUrl(locale, 'blog/tag')
  }
  if (path.startsWith('blog/')) return getRelativeLocaleUrl(locale, 'blog')
  return getRelativeLocaleUrl(locale)
}

export function localeFromParam(lang: string | undefined): Locale {
  if (isLocale(lang)) return lang
  throw new Error(`Unknown locale: ${lang}`)
}

export type BlogPost = CollectionEntry<'blog'>
export type CustomPage = CollectionEntry<'pages'>
