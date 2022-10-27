export interface PostType {
  slug: string
  title: string
  date: string
  content: string
  ogPath: string
  tags: string[]
  type: number
  coverImage?: string
  excerpt?: string
}

export const Platform = {
  Blog: 0,
  Zenn: 1,
} as const
