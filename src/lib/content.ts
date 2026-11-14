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
  if (path === '' || path === 'blog') return true
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
  if (path.startsWith('blog/')) return getRelativeLocaleUrl(locale, 'blog')
  return getRelativeLocaleUrl(locale)
}

export function localeFromParam(lang: string | undefined): Locale {
  if (isLocale(lang)) return lang
  throw new Error(`Unknown locale: ${lang}`)
}

export type BlogPost = CollectionEntry<'blog'>
export type CustomPage = CollectionEntry<'pages'>
