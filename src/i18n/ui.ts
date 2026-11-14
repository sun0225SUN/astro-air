import en from './locales/en.json'
import ja from './locales/ja.json'
import ko from './locales/ko.json'
import zh from './locales/zh.json'

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

export type UiKey = keyof typeof en

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value)
}

export function useTranslations(lang: string) {
  const locale = isLocale(lang) ? lang : defaultLang
  return function t(key: UiKey) {
    return ui[locale][key] ?? ui[defaultLang][key]
  }
}
