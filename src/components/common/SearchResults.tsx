'use client'

import { useState, useEffect } from 'react'
import { searchContent } from '@/lib/search'
import RecipeCard from '@/components/recipe/RecipeCard'
import PostCard from '@/components/lifestyle/PostCard'
import { Recipe } from '@/types/recipe'
import { LifestylePost } from '@/types/post'

interface SearchResultsProps {
  query: string
  recipes: Recipe[]
  posts: LifestylePost[]
}

export default function SearchResults({ query, recipes, posts }: SearchResultsProps) {
  const [results, setResults] = useState<Array<{ type: 'recipe' | 'lifestyle'; item: Recipe | LifestylePost }>>([])
  const [filter, setFilter] = useState<'all' | 'recipe' | 'lifestyle'>('all')

  useEffect(() => {
    if (query) {
      const searchResults = searchContent(recipes, posts, query)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query, recipes, posts])

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true
    return result.type === filter
  })

  const recipeCount = results.filter(r => r.type === 'recipe').length
  const postCount = results.filter(r => r.type === 'lifestyle').length

  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          Enter a search term in the search bar above to find recipes and posts.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            filter === 'all'
              ? 'border-butter-400 text-butter-700'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          All ({results.length})
        </button>
        <button
          onClick={() => setFilter('recipe')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            filter === 'recipe'
              ? 'border-butter-400 text-butter-700'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Recipes ({recipeCount})
        </button>
        <button
          onClick={() => setFilter('lifestyle')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            filter === 'lifestyle'
              ? 'border-butter-400 text-butter-700'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Lifestyle ({postCount})
        </button>
      </div>

      {/* Results */}
      {filteredResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No results found for &quot;{query}&quot;. Try a different search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result, index) => (
            <div key={`${result.type}-${index}`}>
              {result.type === 'recipe' ? (
                <RecipeCard recipe={result.item as Recipe} />
              ) : (
                <PostCard post={result.item as LifestylePost} />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
