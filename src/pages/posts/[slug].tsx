import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { PostBody } from '@/components/PostBody'
import { PostHeader } from '@/components/PostHeader'
import { PostTitle } from '@/components/PostTitle'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import { BLOG_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'
import PostType from '@/types/post'

type Props = {
  post: PostType
}

const Post = ({ post }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className='my-16'>
              <Head>
                <title>
                  {post.title} | {BLOG_NAME}
                </title>
                <meta property='og:image' content={post.ogImage.url} />
              </Head>
              <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
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

export async function getStaticPaths() {
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
