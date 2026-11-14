import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { defineMdastPlugin } from 'satteri'

export const mdastModifiedTimePlugin = defineMdastPlugin({
  name: 'mdast-modified-time',
  before(_root, context) {
    if (!context.fileURL) return

    const filepath = fileURLToPath(context.fileURL)
    let lastModified = ''
    try {
      lastModified = execFileSync(
        'git',
        ['log', '-1', '--pretty=format:%cI', '--', filepath],
        { encoding: 'utf8' },
      ).trim()
    } catch {
      return
    }
    if (!lastModified) return

    const astro = context.data.astro
    if (!astro || typeof astro !== 'object') return
    const frontmatter = (astro as { frontmatter?: Record<string, unknown> })
      .frontmatter
    if (!frontmatter) return
    frontmatter.lastModified = lastModified
  },
})
