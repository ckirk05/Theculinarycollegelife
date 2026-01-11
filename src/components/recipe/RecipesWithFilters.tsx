'use client'

import { useState, useEffect, useMemo } from 'react'
import { Recipe } from '@/types/recipe'
import RecipeGrid from './RecipeGrid'
import Badge from '../ui/Badge'

interface RecipesWithFiltersProps {
  recipes: Recipe[]
}

type SortOption = 'newest' | 'oldest' | 'popular'

export default function RecipesWithFilters({ recipes }: RecipesWithFiltersProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})

  // Load view counts from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recipe-views')
      if (stored) {
        try {
          setViewCounts(JSON.parse(stored))
        } catch (e) {
          console.error('Failed to parse recipe views', e)
        }
      }
    }
  }, [])

  // Get all unique tags from recipes
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [recipes])

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([])
  }

  // Filter and sort recipes
  const filteredAndSortedRecipes = useMemo(() => {
    // Filter by tags (AND logic - recipe must have ALL selected tags)
    let filtered = recipes
    if (selectedTags.length > 0) {
      filtered = recipes.filter(recipe =>
        selectedTags.every(tag => recipe.tags.includes(tag))
      )
    }

    // Sort
    let sorted = [...filtered]
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        break
      case 'oldest':
        sorted.sort((a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        )
        break
      case 'popular':
        sorted.sort((a, b) => {
          const aViews = viewCounts[a.slug] || 0
          const bViews = viewCounts[b.slug] || 0
          return bViews - aViews
        })
        break
    }

    return sorted
  }, [recipes, selectedTags, sortBy, viewCounts])

  return (
    <div>
      {/* Filters and Sort Section */}
      <div className="mb-8 space-y-6">
        {/* Sort Options */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sort by:
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSortBy('newest')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'newest'
                  ? 'bg-butter-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Newest First
            </button>
            <button
              onClick={() => setSortBy('oldest')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'oldest'
                  ? 'bg-butter-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Oldest First
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'popular'
                  ? 'bg-butter-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Most Popular
            </button>
          </div>
        </div>

        {/* Filter by Tags */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              Filter by tags:
            </label>
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-butter-700 hover:text-butter-800 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'category' : 'default'}
                className="cursor-pointer hover:opacity-80"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          {allTags.length === 0 && (
            <p className="text-sm text-gray-500">No tags available</p>
          )}
        </div>

        {/* Active filters display */}
        {selectedTags.length > 0 && (
          <div className="text-sm text-gray-600">
            Showing recipes with: {selectedTags.join(', ')}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        {filteredAndSortedRecipes.length} {filteredAndSortedRecipes.length === 1 ? 'recipe' : 'recipes'} found
      </div>

      {/* Recipe Grid */}
      <RecipeGrid
        recipes={filteredAndSortedRecipes}
        emptyMessage="No recipes match your filters. Try adjusting your selection."
      />
    </div>
  )
}
