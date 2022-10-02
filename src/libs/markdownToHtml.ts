import rehypeShiki from '@leafac/rehype-shiki'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkToc from 'remark-toc'
import * as shiki from 'shiki'
import { unified } from 'unified'

export const markdownToHtml = async (markdown: string) => {
  const result = unified()
    .use(remarkToc, {
      heading: '目次',
      maxDepth: 2,
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
