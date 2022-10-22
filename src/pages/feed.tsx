import { GetServerSidePropsContext } from 'next'
import { generateRssFeed } from '@/libs/feed'

const NoPage = () => null
export default NoPage

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  // RSSフィードを生成する
  const xml = await generateRssFeed()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate') // 24時間キャッシュ
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml) // レスポンスを返す

  return { props: {} }
}
