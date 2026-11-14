import { config } from '../config'

export function postsPerPage(): number | 'all' {
  return config.blog.perPage
}

export function pageCount(total: number) {
  const size = postsPerPage()
  if (size === 'all') return 1
  return Math.max(1, Math.ceil(total / size))
}

export function pageItems<T>(items: T[], page: number) {
  const size = postsPerPage()
  if (size === 'all') return items
  const start = (page - 1) * size
  return items.slice(start, start + size)
}

export function pagePath(base: string, page: number) {
  if (page <= 1) return base
  return `${base}/page/${page}`
}
