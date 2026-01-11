import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/types/recipe'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <Card className="h-full hover:scale-[1.02] transition-transform">
        {/* Image */}
        <div className="relative w-full h-48 bg-butter-100">
          {recipe.image && (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="category">{recipe.category}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-xl font-bold mb-2 text-gray-900 line-clamp-2">
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{recipe.totalTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{recipe.servings} servings</span>
            </div>
            <Badge variant="difficulty" className="text-xs">
              {recipe.difficulty}
            </Badge>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 3).map(tag => (
              <Badge key={tag} className="text-xs">
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{recipe.tags.length - 3}</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
