export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert' | 'drinks'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Recipe {
  slug: string
  title: string
  description: string
  category: RecipeCategory
  image: string
  prepTime: number
  cookTime: number
  totalTime: number
  servings: number
  difficulty: Difficulty
  tags: string[]
  ingredients: string[]
  publishedAt: string
  content: string
}

export interface RecipeFilters {
  category?: RecipeCategory
  difficulty?: Difficulty
  maxTime?: number
  tags?: string[]
  searchQuery?: string
}

export interface RecipeFrontmatter {
  title: string
  description: string
  category: RecipeCategory
  image: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: Difficulty
  tags: string[]
  ingredients: string[]
  publishedAt: string
}
