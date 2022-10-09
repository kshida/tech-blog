import { PostZennListPage } from '@/features/PostZennListPage'
import { getZennRssFeed } from '@/libs/api'
import { PER_PAGE } from '@/utils/constants'

export default PostZennListPage

export const getStaticProps = async (context: { params: { page: string } }) => {
  const page = +context.params.page
  const offset = PER_PAGE * (page - 1)
  const posts = await getZennRssFeed()

  return {
    props: {
      pagePosts: posts.pagePosts.slice(offset, offset + PER_PAGE),
      totalCount: posts.totalCount,
    },
  }
}

export const getStaticPaths = async () => {
  const posts = await getZennRssFeed()
  const totalCount = posts.totalCount
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  return {
    paths: range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => `/posts/zenn/${number}`),
    fallback: false,
  }
}
