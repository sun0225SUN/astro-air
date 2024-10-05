import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { site } from "~/config"

interface PostProps {
  slug: string
  data: {
    title: string
    pubDate: Date
  }
}

export async function GET() {
  const posts = await getCollection("posts")
  return rss({
    title: site.title,
    description: site.description,
    site:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4321"
        : site.url,
    items: posts.map((post: PostProps) => ({
      ...post.data,
      link: `/posts/${post.slug}/`,
    })),
  })
}
