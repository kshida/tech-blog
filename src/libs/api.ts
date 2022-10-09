import fs from 'fs'
import { join } from 'path'
import dayjs from 'dayjs'
import matter from 'gray-matter'
import Parser from 'rss-parser'
import { PostType, Platform } from '@/types/post'
import { PER_PAGE } from '@/utils/constants'

const postsDirectory = join(process.cwd(), '_posts')

export const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory)
}

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const items: PostType = {
    slug: '',
    title: '',
    date: '',
    content: '',
    ogImage: {
      url: '',
    },
    tags: [],
    type: Platform.Blog,
  }

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'title') {
      items[field] = data['title']
    }
    if (field === 'date') {
      items[field] = data['date']
    }
    if (field === 'content') {
      items[field] = content
    }
    if (field === 'ogImage') {
      items[field] = data['ogImage']['url']
    }
    if (field === 'tags') {
      items[field] = data['tags']
    }
    if (field === 'type') {
      items[field] = data['type']
    }
  })

  return items
}

export const getAllPosts = (fields: string[] = []) => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export const getPagePosts = (
  fields: string[] = [],
  offset: number = 0,
  limit: number = PER_PAGE,
) => {
  const posts = getAllPosts(fields)
  const pagePosts = posts.slice(offset, offset + limit)
  const totalCount = posts.length
  return {
    pagePosts: pagePosts,
    totalCount: totalCount,
    type: Platform.Blog,
  }
}

export const getZennRssFeed = async () => {
  const feed = await new Parser().parseURL('https://zenn.dev/kshida/feed?all=1')
  return {
    pagePosts: feed.items.map(
      (item): PostType => ({
        slug: item.link ?? 'https://zenn.dev/kshida',
        title: item.title ?? '',
        date: item.pubDate ? dayjs(item.pubDate).format('YYYY-MM-DD') : '',
        content: '',
        ogImage: {
          url: '',
        },
        tags: ['zenn'],
        type: Platform.Zenn,
      }),
    ),
    totalCount: feed.items.length,
    type: Platform.Zenn,
  }
}
