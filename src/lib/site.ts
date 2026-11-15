import { config } from '../config'

export function siteDescription(locale: string) {
  const descriptions: Record<string, string> = config.description
  return descriptions[locale] ?? config.description.default
}
