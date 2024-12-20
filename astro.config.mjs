import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://localhost:4321/",
  vite: {
    worker: {
      plugins: () => [],
    },
  },
  integrations: [react(), tailwind(), mdx()],
  viewTransitions: true,
})
