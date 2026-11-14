import en from '../../messages/en.json'
import ja from '../../messages/ja.json'
import ko from '../../messages/ko.json'
import zh from '../../messages/zh.json'

export const locales = ['en', 'zh', 'ja', 'ko'] as const

export type Locale = (typeof locales)[number]

export const defaultLang: Locale = 'en'

export const languages: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
}

const ui = { en, zh, ja, ko } satisfies Record<Locale, typeof en>

type MessageTree = {
  [key: string]: string | MessageTree
}

type MessageKey<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string
        ? K
        : T[K] extends MessageTree
          ? `${K}.${MessageKey<T[K]>}`
          : never
    }[keyof T & string]

export type UiKey = MessageKey<typeof en>

function lookup(tree: MessageTree, key: string): string | undefined {
  let current: string | MessageTree | undefined = tree
  for (const segment of key.split('.')) {
    if (
      typeof current !== 'object' ||
      current === null ||
      !(segment in current)
    ) {
      return undefined
    }
    current = current[segment]
  }
  return typeof current === 'string' ? current : undefined
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value)
}

export function useTranslations(lang: string) {
  const locale = isLocale(lang) ? lang : defaultLang
  return function t(key: UiKey): string {
    return lookup(ui[locale], key) ?? lookup(ui[defaultLang], key) ?? key
  }
}
