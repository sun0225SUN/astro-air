import rss from "@astrojs/rss"
import { en, zh } from "~/config"
import { getPostsByLocale } from "~/utils"
import { getLanguagePaths } from "~/utils/langs"

export function getStaticPaths() {
  return getLanguagePaths()
}

export async function GET(request: { url: URL }) {
  const isEn = request.url.pathname.includes("en")

  const lang = isEn ? "en" : "zh"
  const config = isEn ? en : zh

  const posts = await getPostsByLocale(lang)

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
