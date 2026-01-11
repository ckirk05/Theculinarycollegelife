import Image from 'next/image'
import { Recipe } from '@/types/recipe'
import Badge from '@/components/ui/Badge'
import { format } from 'date-fns'

interface RecipeDetailProps {
  recipe: Recipe
  renderedContent: React.ReactNode
}

export default function RecipeDetail({ recipe, renderedContent }: RecipeDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Hero Image */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8 bg-butter-100">
        {recipe.image && (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        )}
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="category">{recipe.category}</Badge>
          <Badge variant="difficulty">{recipe.difficulty}</Badge>
          {recipe.tags.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          {recipe.title}
        </h1>

        <p className="text-xl text-gray-600 mb-4">
          {recipe.description}
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <time dateTime={recipe.publishedAt}>
            {format(new Date(recipe.publishedAt), 'MMMM d, yyyy')}
          </time>
        </div>
      </header>

      {/* Recipe Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-butter-50 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-butter-700">{recipe.prepTime}</div>
          <div className="text-sm text-gray-600">Prep Time (min)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-butter-700">{recipe.cookTime}</div>
          <div className="text-sm text-gray-600">Cook Time (min)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-butter-700">{recipe.totalTime}</div>
          <div className="text-sm text-gray-600">Total Time (min)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-butter-700">{recipe.servings}</div>
          <div className="text-sm text-gray-600">Servings</div>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mb-8 p-6 bg-white rounded-xl shadow-md">
        <h2 className="font-display text-2xl font-bold mb-4 text-gray-900">Ingredients</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-butter-600 mt-1">•</span>
              <span className="text-gray-700">{ingredient}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      <section className="prose prose-lg max-w-none mb-8">
        {renderedContent}
      </section>
    </article>
  )
}
