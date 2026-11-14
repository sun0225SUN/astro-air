import { type CollectionEntry, getCollection } from 'astro:content'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { isLocale, type Locale } from '../i18n'
import { pageCount } from './pagination'

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

function listPage(path: string, prefix: string) {
  if (!path.startsWith(`${prefix}/page/`)) return
  const page = Number(path.slice(`${prefix}/page/`.length))
  if (!Number.isInteger(page) || page < 2) return
  return page
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
  const blogPage = listPage(path, 'blog')
  if (blogPage) {
    const posts = await getBlogPosts(locale)
    return blogPage <= pageCount(posts.length)
  }
  const categoryPage = /^blog\/category\/(.+)\/page\/(\d+)$/.exec(path)
  if (categoryPage) {
    const page = Number(categoryPage[2])
    const posts = await getPostsByCategory(locale, categoryPage[1])
    return page >= 2 && page <= pageCount(posts.length)
  }
  const tagPage = /^blog\/tag\/(.+)\/page\/(\d+)$/.exec(path)
  if (tagPage) {
    const page = Number(tagPage[2])
    const posts = await getPostsByTag(locale, tagPage[1])
    return page >= 2 && page <= pageCount(posts.length)
  }
  if (path.startsWith('blog/')) {
    const posts = await getBlogPosts(locale)
    if (path.startsWith('blog/category/')) {
      const slug = path.slice('blog/category/'.length)
      return posts.some(
        (post) =>
          post.data.category !== undefined &&
          taxonomySlug(post.data.category) === slug,
      )
    }
    if (path.startsWith('blog/tag/')) {
      const slug = path.slice('blog/tag/'.length)
      return posts.some((post) =>
        post.data.tags.some((tag) => taxonomySlug(tag) === slug),
      )
    }
    const slug = path.slice('blog/'.length)
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

export function pageLocale(
  currentLocale: string | undefined,
  param?: string,
): Locale {
  return localeFromParam(currentLocale ?? param)
}

export type BlogPost = CollectionEntry<'blog'>
export type CustomPage = CollectionEntry<'pages'>
