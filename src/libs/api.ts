import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Items } from '../types/post'
import { PER_PAGE } from '../utils/constants'

const postsDirectory = join(process.cwd(), '_posts')

export const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory)
}

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
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
  }
}
