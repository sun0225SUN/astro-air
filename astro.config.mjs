// @ts-check
// @ts-check
import mdx from "@astrojs/mdx"
import netlify from "@astrojs/netlify"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { filterSitemapByDefaultLocale, i18n } from "astro-i18n-aut/integration"
import { defineConfig } from "astro/config"
import { defaultLanguage } from "./src/config"

const defaultLocale = defaultLanguage

const locales = {
  en: "en-US",
  zh: "zh-CN",
}

// https://astro.build/config
export default defineConfig({
  site: "https://localhost:4321/",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  vite: {
    worker: {
      plugins: () => [],
    },
  },
  integrations: [
    react(),
    tailwind(),
    mdx(),
    i18n({
      locales,
      defaultLocale,
      redirectDefaultLocale: false,
      exclude: ["**/atom/**", "**/robots/**", "**/*.xml.*", "**/*.txt.*"],
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
  adapter: process.env.NODE_ENV === "production" ? netlify() : undefined,
})
