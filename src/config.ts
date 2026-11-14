import { file } from 'bun'
import { parse } from 'yaml'

type SiteConfig = {
  title: string
  url: string
}

function required(value: unknown, key: string) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`src/config.yml is missing ${key}`)
  }
  return value
}

const parsed = parse(
  await file(`${process.cwd()}/src/config.yml`).text(),
) as SiteConfig

export const config = {
  title: required(parsed?.title, 'title'),
  url: required(parsed?.url, 'url'),
}
