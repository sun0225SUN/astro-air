import { langs } from "~/i18n/ui"

export function getLanguagePaths() {
  return langs.map((lang) => ({
    params: { lang },
  }))
}
