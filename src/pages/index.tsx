import dayjs from 'dayjs'
import { IndexPage } from '@/features/IndexPage'
import { getPagePosts, getZennRssFeed } from '@/libs/api'
import { generateRssFeed } from '@/libs/feed'
export default IndexPage

export const getStaticProps = async () => {
  generateRssFeed() // RSSフィードを生成する
  const pagePosts = getPagePosts(['title', 'date', 'slug', 'tags']).pagePosts
  const zennPosts = await getZennRssFeed()
  const recentPosts = pagePosts
    .concat(zennPosts.pagePosts)
    .sort((a, b) => {
      return dayjs(a.date).isAfter(b.date) ? -1 : 1
    })
    .slice(0, 10)

  return {
    props: { recentPosts },
  }
}
