import Fuse from 'fuse.js'
import { Recipe } from '@/types/recipe'
import { LifestylePost } from '@/types/post'

export type SearchResult = {
  type: 'recipe' | 'lifestyle'
  item: Recipe | LifestylePost
  score: number
}

export function searchContent(
  recipes: Recipe[],
  posts: LifestylePost[],
  query: string
): SearchResult[] {
  if (!query.trim()) {
    return []
  }

  const recipesFuse = new Fuse(recipes, {
    keys: ['title', 'description', 'tags', 'ingredients', 'category'],
    threshold: 0.3,
    includeScore: true,
  })

  const postsFuse = new Fuse(posts, {
    keys: ['title', 'description', 'tags', 'author'],
    threshold: 0.3,
    includeScore: true,
  })

  const recipeResults = recipesFuse.search(query).map(result => ({
    type: 'recipe' as const,
    item: result.item,
    score: result.score || 0,
  }))

  const postResults = postsFuse.search(query).map(result => ({
    type: 'lifestyle' as const,
    item: result.item,
    score: result.score || 0,
  }))

  return [...recipeResults, ...postResults]
    .sort((a, b) => a.score - b.score)
    .slice(0, 20)
}
