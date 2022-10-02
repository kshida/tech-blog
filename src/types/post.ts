export interface PostType {
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  tags: string[]
}

export interface Items {
  [key: string]: string
}
