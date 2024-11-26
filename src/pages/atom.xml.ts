import rss from "@astrojs/rss"
import type { CollectionEntry } from "astro:content"
import sanitizeHtml from "sanitize-html"
import { config } from "~/config"
import { getPosts } from "~/utils"

export async function GET() {
  const posts = await getPosts()

  return rss({
    title: config.meta.title,
    description: config.meta.description,
    site:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4321"
        : config.meta.url,
    items: posts.map((post: CollectionEntry<"posts">) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.slug}/`,
      content: sanitizeHtml(post.body),
    })),
    customData: "",
  })
}
