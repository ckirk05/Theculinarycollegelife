import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-butter-800">
              The Culinary College Life
            </h3>
            <p className="text-gray-600 text-sm">
              Delicious recipes and lifestyle inspiration for college students and food lovers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/recipes" className="text-gray-600 hover:text-butter-700 transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/lifestyle" className="text-gray-600 hover:text-butter-700 transition-colors">
                  Lifestyle Posts
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-600 hover:text-butter-700 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-butter-700 transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Recipe Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Recipe Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/recipes/breakfast" className="text-gray-600 hover:text-butter-700 transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link href="/recipes/lunch" className="text-gray-600 hover:text-butter-700 transition-colors">
                  Lunch
                </Link>
              </li>
              <li>
                <Link href="/recipes/dinner" className="text-gray-600 hover:text-butter-700 transition-colors">
                  Dinner
                </Link>
              </li>
              <li>
                <Link href="/recipes/snack" className="text-gray-600 hover:text-butter-700 transition-colors">
                  Snacks
                </Link>
              </li>
              <li>
                <Link href="/recipes/dessert" className="text-gray-600 hover:text-butter-700 transition-colors">
                  Desserts
                </Link>
              </li>
              <li>
                <Link href="/recipes/drinks" className="text-gray-600 hover:text-butter-700 transition-colors">
                  Drinks
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} The Culinary College Life. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
