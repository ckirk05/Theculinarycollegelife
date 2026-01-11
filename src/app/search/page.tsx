import { Suspense } from 'react'
import { getAllRecipes, getAllLifestylePosts } from '@/lib/content'
import SearchResults from '@/components/common/SearchResults'

export const metadata = {
  title: 'Search',
  description: 'Search recipes and lifestyle posts',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

async function SearchContent({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''

  // Fetch all content server-side
  const recipes = getAllRecipes()
  const posts = getAllLifestylePosts()

  return <SearchResults query={query} recipes={recipes} posts={posts} />
}

export default async function SearchPage(props: SearchPageProps) {
  const params = await props.searchParams
  const query = params.q || ''

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Search Results
        </h1>
        {query && (
          <p className="text-xl text-gray-600">
            Showing results for: <span className="font-semibold text-butter-700">&quot;{query}&quot;</span>
          </p>
        )}
      </header>

      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <SearchContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  )
}
