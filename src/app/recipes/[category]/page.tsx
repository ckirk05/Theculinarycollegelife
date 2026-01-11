import { getRecipesByCategory } from '@/lib/content'
import RecipeGrid from '@/components/recipe/RecipeGrid'
import { RecipeCategory } from '@/types/recipe'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

const validCategories: RecipeCategory[] = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'drinks']

const categoryInfo: Record<RecipeCategory, { title: string; description: string }> = {
  breakfast: {
    title: 'Breakfast Recipes',
    description: 'Start your day right with delicious breakfast ideas',
  },
  lunch: {
    title: 'Lunch Recipes',
    description: 'Quick and satisfying lunch recipes for busy days',
  },
  dinner: {
    title: 'Dinner Recipes',
    description: 'Hearty dinner recipes perfect for any evening',
  },
  snack: {
    title: 'Snack Recipes',
    description: 'Tasty snacks for anytime cravings',
  },
  dessert: {
    title: 'Dessert Recipes',
    description: 'Sweet treats to satisfy your sweet tooth',
  },
  drinks: {
    title: 'Drink Recipes',
    description: 'Refreshing beverages for any occasion',
  },
}

// Generate static params for all categories
export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }))
}

// Generate metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params

  if (!validCategories.includes(category as RecipeCategory)) {
    return {
      title: 'Category Not Found',
    }
  }

  const info = categoryInfo[category as RecipeCategory]

  return {
    title: info.title,
    description: info.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params

  // Check if category is valid
  if (!validCategories.includes(category as RecipeCategory)) {
    notFound()
  }

  const recipes = getRecipesByCategory(category as RecipeCategory)
  const info = categoryInfo[category as RecipeCategory]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900 capitalize">
          {info.title}
        </h1>
        <p className="text-xl text-gray-600">
          {info.description}
        </p>
      </header>

      <RecipeGrid
        recipes={recipes}
        emptyMessage={`No ${category} recipes yet. Check back soon!`}
      />
    </div>
  )
}
