import { getRelativeLocaleUrl } from 'astro:i18n'
import { config } from '../config'
import { defaultLang, type Locale, useTranslations } from '../i18n'
import { entrySlug, getCustomPages } from './content'

type NavLabel = string | Record<string, string>

function linkLabel(label: NavLabel, locale: string) {
  if (typeof label === 'string') return label
  return (
    label[locale] ??
    label.default ??
    label[defaultLang] ??
    Object.values(label).find((item) => item.length > 0) ??
    ''
  )
}

function defaultLabel(label: NavLabel) {
  if (typeof label === 'string') return label
  return label.default ?? label[defaultLang] ?? linkLabel(label, defaultLang)
}

export async function navLinks(locale: Locale) {
  const t = useTranslations(locale)
  const pages = await getCustomPages(locale)

  return config.nav.flatMap((item) => {
    if (item === 'home') {
      return [
        {
          href: getRelativeLocaleUrl(locale),
          label: t('nav.home'),
          name: 'home',
        },
      ]
    }
    if (item === 'blog' || item === 'archive') {
      return [
        {
          href: getRelativeLocaleUrl(locale, 'blog'),
          label: t('nav.archive'),
          name: 'archive',
        },
      ]
    }
    if (item === 'tags') {
      return [
        {
          href: getRelativeLocaleUrl(locale, 'blog/tag'),
          label: t('nav.tags'),
          name: 'tags',
        },
      ]
    }
    if (typeof item === 'string') {
      const page = pages.find((entry) => entrySlug(entry.id) === item)
      if (!page) return []
      return [
        {
          href: getRelativeLocaleUrl(locale, item),
          label: page.data.title,
          name: item,
        },
      ]
    }
    return [
      {
        href: item.link,
        label: linkLabel(item.label, locale),
        name: defaultLabel(item.label),
        external: /^(https?:|mailto:)/.test(item.link),
      },
    ]
  })
}
