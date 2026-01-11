import { getAllRecipes } from '@/lib/content'
import RecipeGrid from '@/components/recipe/RecipeGrid'

export const metadata = {
  title: 'All Recipes',
  description: 'Browse all our delicious recipes',
}

export default function RecipesPage() {
  const recipes = getAllRecipes()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          All Recipes
        </h1>
        <p className="text-xl text-gray-600">
          Discover delicious recipes for every meal and occasion
        </p>
      </header>

      <RecipeGrid recipes={recipes} />
    </div>
  )
}
