import { IndexPage } from '@/features/IndexPage'
import { getPagePosts } from '@/libs/api'
export default IndexPage

export const getStaticProps = async () => {
  const recentPosts = getPagePosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]).pagePosts

  return {
    props: { recentPosts },
  }
}
