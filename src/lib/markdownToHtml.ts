import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkToc from 'remark-toc'
import * as shiki from 'shiki'
import rehypeShiki from '@leafac/rehype-shiki'

export default async function markdownToHtml(markdown: string) {
  const result = unified()
    .use(remarkToc, {
      heading: '目次',
      maxDepth: 2
    })
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({
        theme: 'nord',
      }),
    })
    .use(rehypeStringify)
    .processSync(markdown)
  return result.toString()
}
