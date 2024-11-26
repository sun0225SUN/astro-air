import type { CollectionEntry } from "astro:content"
import { getCollection } from "astro:content"

export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getPosts = async () => {
  const posts = await getCollection("posts")
  return posts.sort(
    (a: CollectionEntry<"posts">, b: CollectionEntry<"posts">) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
}
