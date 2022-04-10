import { remark } from 'remark'
import html from 'remark-html'
import slug from 'remark-slug'
import toc from 'remark-toc'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(slug)
    .use(toc, {
      heading: '目次',
      prefix: 'user-content-',
      maxDepth: 2
    })
    .use(html)
    .process(markdown)
  return result.toString()
}
