import { Recipe, RecipeFilters } from '@/types/recipe'

export function filterRecipes(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  let filtered = [...recipes]

  if (filters.category) {
    filtered = filtered.filter(recipe => recipe.category === filters.category)
  }

  if (filters.difficulty) {
    filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty)
  }

  if (filters.maxTime) {
    filtered = filtered.filter(recipe => recipe.totalTime <= filters.maxTime!)
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(recipe =>
      filters.tags!.some(tag => recipe.tags.includes(tag))
    )
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    )
  }

  return filtered
}
