export interface LifestylePost {
  slug: string
  title: string
  description: string
  image: string
  publishedAt: string
  tags: string[]
  author: string
  content: string
}

export interface LifestylePostFrontmatter {
  title: string
  description: string
  image: string
  publishedAt: string
  tags: string[]
  author: string
}
