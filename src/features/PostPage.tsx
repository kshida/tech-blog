import { NextSeo } from 'next-seo'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { PostBody, PostHeader, PostTitle } from '@/components/post'
import { PostType } from '@/types/post'
import { BASE_URL } from '@/utils/constants'

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
            <NextSeo
              title={`${post.title}`}
              openGraph={{
                title: post.title,
                type: 'article',
                url: `${BASE_URL}/posts/${post.slug}`,
                images: [
                  {
                    url: `${BASE_URL}${post.ogPath}`,
                    width: 1200,
                    height: 630,
                    alt: '',
                  },
                ],
              }}
            />
            <PostHeader title={post.title} date={post.date} />
            <PostBody title={post.title} content={post.content} slug={post.slug} />
          </article>
        )}
      </Container>
    </Layout>
  )
}
