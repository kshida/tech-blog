import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { PostBody, PostHeader, PostTitle } from '@/components/post'
import { PostType } from '@/types/post'
import { BLOG_NAME } from '@/utils/constants'

interface Props {
  post: PostType
}

export const PostPage: React.FC<Props> = ({ post }) => {
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
          <article>
            <Head>
              <title>
                {post.title} | {BLOG_NAME}
              </title>
              <meta property='og:image' content={post.ogImage.url} />
            </Head>
            <PostHeader title={post.title} date={post.date} />
            <PostBody content={post.content} />
          </article>
        )}
      </Container>
    </Layout>
  )
}
