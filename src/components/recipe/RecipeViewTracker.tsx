'use client'

import { useEffect } from 'react'
import { Recipe } from '@/types/recipe'

interface RecipeViewTrackerProps {
  recipe: Recipe
  children: React.ReactNode
}

export default function RecipeViewTracker({ recipe, children }: RecipeViewTrackerProps) {
  useEffect(() => {
    // Track view count in localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recipe-views')
      let viewCounts: Record<string, number> = {}

      if (stored) {
        try {
          viewCounts = JSON.parse(stored)
        } catch (e) {
          console.error('Failed to parse recipe views', e)
        }
      }

      // Increment view count for this recipe
      viewCounts[recipe.slug] = (viewCounts[recipe.slug] || 0) + 1

      // Save back to localStorage
      localStorage.setItem('recipe-views', JSON.stringify(viewCounts))
    }
  }, [recipe.slug])

  return <>{children}</>
}
