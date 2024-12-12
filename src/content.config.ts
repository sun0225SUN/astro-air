import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const schema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

const posts_zh = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/zh/posts" }),
  schema,
})

const posts_en = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/en/posts" }),
  schema,
})

export const collections = { zh: posts_zh, en: posts_en }
