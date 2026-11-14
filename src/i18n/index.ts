import en from '../../messages/en.json'
import ja from '../../messages/ja.json'
import ko from '../../messages/ko.json'
import zh from '../../messages/zh.json'
import zhTw from '../../messages/zh-tw.json'
import { config } from '../config'

const messages = { en, zh, 'zh-tw': zhTw, ja, ko }

export type Locale = keyof typeof messages

function knownLocale(code: string): Locale {
  if (!(code in messages)) {
    throw new Error(`src/config.ts locale "${code}" has no messages file`)
  }
  return code as Locale
}

export const locales = config.locales.map((locale) => knownLocale(locale))

export const defaultLang = knownLocale(config.defaultLocale)

const ui = Object.fromEntries(
  locales.map((locale) => [locale, messages[locale]]),
) as Record<Locale, typeof en>

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

export function localePaths() {
  return locales.map((lang) => ({ params: { lang } }))
}

export function nextLocale(current: Locale): Locale {
  const index = locales.indexOf(current)
  return locales[(index + 1) % locales.length] ?? defaultLang
}

export function useTranslations(lang: string) {
  const locale = isLocale(lang) ? lang : defaultLang
  return function t(
    key: UiKey,
    values?: Record<string, string | number>,
  ): string {
    let message = lookup(ui[locale], key) ?? lookup(ui[defaultLang], key) ?? key
    if (!values) return message
    for (const [name, value] of Object.entries(values)) {
      message = message.replaceAll(`{${name}}`, String(value))
    }
    return message
  }
}
