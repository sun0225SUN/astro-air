import { getCollection } from "astro:content"

export async function getPosts() {
  const posts = await getCollection("posts")
  posts.sort((a, b) => {
    const aDate = a.data.pubDate ? new Date(a.data.pubDate) : new Date()
    const bDate = b.data.pubDate ? new Date(b.data.pubDate) : new Date()
    return bDate.getTime() - aDate.getTime()
  })
  return posts
}
