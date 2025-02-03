import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import tailwindcss from "@tailwindcss/vite"
import expressiveCode from "astro-expressive-code"
import { defineConfig } from "astro/config"

import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  output: "static",
  prefetch: true,
  site: "https://astro-air.guoqi.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
    expressiveCode({
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      themes: ["material-theme-lighter", "material-theme-darker"],
      defaultProps: {
        showLineNumbers: true,
      },
    }),
    mdx(),
    robotsTxt(),
  ],
})
