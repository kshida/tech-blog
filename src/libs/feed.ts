import fs from 'fs'
import dayjs from 'dayjs'
import { Feed } from 'feed'
import { getAllPosts } from './api'

export const generateRssFeed = () => {
  const baseUrl = 'https://kshida-blog.com'

  const feed = new Feed({
    title: "kshida's blog",
    description: '文系エンジニアが日々の学びを分かりやすい形でアウトプットしていきます。',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    copyright: "©2022 kshida's blog",
    updated: dayjs().toDate(),
    feed: `${baseUrl}/rss/feed.xml`,
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
  // RSSフィード情報を public/rss 配下に保存する
  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
}
