import { PostListPage } from '@/features/PostListPage'
import { PER_PAGE } from '@/utils/constants'
import { getAllPosts, getPagePosts } from 'libs/api'

export default PostListPage

export const getStaticProps = async (context: { params: { page: string } }) => {
  const page = +context.params.page
  const offset = PER_PAGE * (page - 1)
  const posts = getPagePosts(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'],
    offset,
    PER_PAGE,
  )

  return {
    props: {
      pagePosts: posts.pagePosts,
      totalCount: posts.totalCount,
    },
  }
}

export const getStaticPaths = () => {
  const posts = getAllPosts(['slug'])
  const totalCount = posts.length
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  return {
    paths: range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => `/posts/list/${number}`),
    fallback: false,
  }
}
