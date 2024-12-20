import { getCollection } from "astro:content"

export const formatDate = (date: Date | string | undefined): string => {
  const validDate = date ? new Date(date) : new Date()

  const year = validDate.getFullYear()
  const month = String(validDate.getMonth() + 1).padStart(2, "0")
  const day = String(validDate.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export const getPostsByLocale = async (locale: string) => {
  const posts =
    locale === "en"
      ? await getCollection("enPosts")
      : await getCollection("zhPosts")
  return posts.sort(
    (a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
}
