import getReadingTime from 'reading-time'
import { defineMdastPlugin } from 'satteri'

export const mdastReadingTimePlugin = defineMdastPlugin({
  name: 'mdast-reading-time',
  after(root, context) {
    const textOnPage = context.textContent(root)
    const readingTime = getReadingTime(textOnPage)
    const astro = context.data.astro
    if (!astro || typeof astro !== 'object') return
    const frontmatter = (astro as { frontmatter?: Record<string, unknown> })
      .frontmatter
    if (!frontmatter) return
    frontmatter.minutesRead = readingTime.text
    frontmatter.readingMinutes = Math.max(1, Math.ceil(readingTime.minutes))
  },
})
