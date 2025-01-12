import rss from "@astrojs/rss"
import { defaultLanguage, en, zh } from "~/config"
import { getPostsByLocale } from "~/utils"

export async function GET() {
  const posts = await getPostsByLocale(defaultLanguage)
  const config = defaultLanguage === "en" ? en : zh

  return rss({
    title: config.meta.title,
    description: config.meta.description,
    site:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4321"
        : config.meta.url,
    items: posts.map((post: any) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`,
      content: post.rendered ? post.rendered.html : post.data.description,
    })),
    customData: "",
  })
}
