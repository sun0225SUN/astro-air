import { getCollection } from "astro:content"

export const formatDate = (
  date: Date | string | undefined,
  format: string = "YYYY-MM-DD",
): string => {
  const validDate = date ? new Date(date) : new Date()

  const tokens: Record<string, string> = {
    YYYY: validDate.getFullYear().toString(),
    MM: String(validDate.getMonth() + 1).padStart(2, "0"),
    DD: String(validDate.getDate()).padStart(2, "0"),
    HH: String(validDate.getHours()).padStart(2, "0"),
    mm: String(validDate.getMinutes()).padStart(2, "0"),
    ss: String(validDate.getSeconds()).padStart(2, "0"),
  }

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => tokens[match])
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
