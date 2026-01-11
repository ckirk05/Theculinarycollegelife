'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isRecipesOpen, setIsRecipesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  const navLinkClass = (path: string) => {
    const base = 'px-4 py-2 rounded-lg transition-colors'
    return isActive(path)
      ? `${base} bg-butter-100 text-butter-800 font-medium`
      : `${base} hover:bg-butter-50 text-gray-700`
  }

  const recipeCategories = [
    { name: 'Breakfast', path: '/recipes/breakfast' },
    { name: 'Lunch', path: '/recipes/lunch' },
    { name: 'Dinner', path: '/recipes/dinner' },
    { name: 'Snack', path: '/recipes/snack' },
    { name: 'Dessert', path: '/recipes/dessert' },
    { name: 'Drinks', path: '/recipes/drinks' },
  ]

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-2">
        <Link href="/" className={navLinkClass('/')}>
          Home
        </Link>

        {/* Recipes Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsRecipesOpen(true)}
          onMouseLeave={() => setIsRecipesOpen(false)}
        >
          <Link href="/recipes" className={navLinkClass('/recipes')}>
            Recipes
          </Link>
          {isRecipesOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50">
              <Link
                href="/recipes"
                className="block px-4 py-2 hover:bg-butter-50 text-gray-700"
              >
                All Recipes
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              {recipeCategories.map(category => (
                <Link
                  key={category.path}
                  href={category.path}
                  className="block px-4 py-2 hover:bg-butter-50 text-gray-700"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/lifestyle" className={navLinkClass('/lifestyle')}>
          Lifestyle
        </Link>

        <Link href="/about" className={navLinkClass('/about')}>
          About
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-butter-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50">
          <Link
            href="/"
            className="block px-4 py-2 hover:bg-butter-50 text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/recipes"
            className="block px-4 py-2 hover:bg-butter-50 text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            All Recipes
          </Link>
          {recipeCategories.map(category => (
            <Link
              key={category.path}
              href={category.path}
              className="block px-4 py-2 pl-8 hover:bg-butter-50 text-gray-600 text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/lifestyle"
            className="block px-4 py-2 hover:bg-butter-50 text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lifestyle
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 hover:bg-butter-50 text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  )
}
