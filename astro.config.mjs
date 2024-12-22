import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://astro-air.netlify.app",
  vite: {
    worker: {
      plugins: () => [],
    },
  },
  integrations: [react(), tailwind(), mdx(), sitemap()],
})
