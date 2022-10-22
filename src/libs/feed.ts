import dayjs from 'dayjs'
import { Feed } from 'feed'
import { getAllPosts } from './api'

export const generateRssFeed = async () => {
  const baseUrl = 'https://kshida-blog.com'

  const feed = new Feed({
    title: "kshida's blog",
    description: '文系エンジニアが日々の学びを分かりやすい形でアウトプットしていきます。',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    copyright: "©2022 kshida's blog",
    updated: dayjs().toDate(),
    feed: `${baseUrl}/feed`,
    author: {
      name: 'K.Shida',
    },
  })
  // 記事一覧を取得
  const posts = getAllPosts(['title', 'date', 'slug', 'content'])
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${baseUrl}/${post.slug}`,
      link: `${baseUrl}/${post.slug}`,
      description: `${post.content.slice(0, 300)}...`,
      date: dayjs(post.date).toDate(),
    })
  })
  // RSS 2.0
  return feed.rss2()
}
