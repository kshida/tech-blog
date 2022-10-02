import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps } from 'next'
import { PostPage } from '@/features/PostPage'
import { markdownToHtml } from '@/libs/markdownToHtml'
import { Items } from '@/types/post'
import { getPostBySlug, getAllPosts } from 'libs/api'

export default PostPage

interface Props {
  post: Items
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const post = getPostBySlug(params!.slug, ['title', 'date', 'slug', 'content', 'ogImage', 'tags'])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export const getStaticPaths = () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
