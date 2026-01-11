import { Recipe } from '@/types/recipe'
import RecipeCard from './RecipeCard'

interface RecipeGridProps {
  recipes: Recipe[]
  emptyMessage?: string
}

export default function RecipeGrid({ recipes, emptyMessage = 'No recipes found.' }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}
    </div>
  )
}
