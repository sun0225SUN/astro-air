// @ts-check
// @ts-check
import netlify from "@astrojs/netlify"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), mdx()],
  adapter: process.env.NODE_ENV === "production" ? netlify() : undefined,
})