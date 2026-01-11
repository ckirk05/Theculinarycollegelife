import Link from 'next/link'
import { getAllRecipes, getAllLifestylePosts } from '@/lib/content'
import RecipeGrid from '@/components/recipe/RecipeGrid'
import Button from '@/components/ui/Button'

export default function Home() {
  const recipes = getAllRecipes().slice(0, 3)
  const posts = getAllLifestylePosts().slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-butter-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Welcome to The Culinary College Life
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Delicious recipes and lifestyle inspiration for college students and food lovers
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/recipes">
              <Button variant="primary">Browse Recipes</Button>
            </Link>
            <Link href="/lifestyle">
              <Button variant="outline">Read Blog</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Recipes
              </h2>
              <p className="text-gray-600">
                Check out our latest and greatest recipes
              </p>
            </div>
            <Link href="/recipes" className="text-butter-700 hover:text-butter-800 font-medium">
              View All →
            </Link>
          </div>
          <RecipeGrid recipes={recipes} emptyMessage="No recipes yet. Check back soon!" />
        </div>
      </section>

      {/* Recipe Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Breakfast', icon: '🥞', path: '/recipes/breakfast' },
              { name: 'Lunch', icon: '🥗', path: '/recipes/lunch' },
              { name: 'Dinner', icon: '🍝', path: '/recipes/dinner' },
              { name: 'Snacks', icon: '🍿', path: '/recipes/snack' },
              { name: 'Desserts', icon: '🍰', path: '/recipes/dessert' },
              { name: 'Drinks', icon: '🧋', path: '/recipes/drinks' },
            ].map(category => (
              <Link
                key={category.path}
                href={category.path}
                className="bg-white rounded-xl p-6 text-center hover:shadow-butter transition-shadow"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <div className="font-semibold text-gray-900">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Lifestyle Posts */}
      {posts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Latest Posts
                </h2>
                <p className="text-gray-600">
                  Read about my culinary journey and lifestyle tips
                </p>
              </div>
              <Link href="/lifestyle" className="text-butter-700 hover:text-butter-800 font-medium">
                View All →
              </Link>
            </div>
            <div className="text-center text-gray-500 py-8">
              Lifestyle posts coming soon!
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
