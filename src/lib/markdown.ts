import { fileURLToPath, spawnSync } from 'bun'
import getReadingTime from 'reading-time'
import { type Data, defineMdastPlugin } from 'satteri'

function frontmatterOf(data: Data) {
  const astro = data.astro
  if (!astro || typeof astro !== 'object') return
  return (astro as { frontmatter?: Record<string, unknown> }).frontmatter
}

export const modifiedTimePlugin = defineMdastPlugin({
  name: 'modified-time',
  before(_root, context) {
    if (!context.fileURL) return

    const filepath = fileURLToPath(context.fileURL)
    let lastModified = ''
    try {
      const result = spawnSync([
        'git',
        'log',
        '-1',
        '--pretty=format:%cI',
        '--',
        filepath,
      ])
      if (result.exitCode !== 0) return
      lastModified = result.stdout.toString().trim()
    } catch {
      return
    }
    if (!lastModified) return

    const frontmatter = frontmatterOf(context.data)
    if (!frontmatter) return
    frontmatter.lastModified = lastModified
  },
})

export const readingTimePlugin = defineMdastPlugin({
  name: 'reading-time',
  after(root, context) {
    const readingTime = getReadingTime(context.textContent(root))
    const frontmatter = frontmatterOf(context.data)
    if (!frontmatter) return
    frontmatter.minutesRead = readingTime.text
    frontmatter.readingMinutes = Math.max(1, Math.ceil(readingTime.minutes))
  },
})
