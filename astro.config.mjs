// @ts-check
import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-air.guoqi.dev',
  integrations: [mdx()],
})
