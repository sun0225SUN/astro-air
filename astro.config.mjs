import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

import sitemap from "@astrojs/sitemap";

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