import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().min(1).optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    // Higher numbers stay above other pinned posts. Omit or use 0 to leave a post in date order.
    pin: z.number().int().min(0).max(99).optional().default(0),
    category: z.string().min(1).optional(),
    tags: z.array(z.string().min(1)).default([]),
  }),
})

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = { blog, pages }
