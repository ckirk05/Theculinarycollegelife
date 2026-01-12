'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function AdminDashboard() {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      setLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-butter-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">The Culinary College Life CMS</p>
            </div>
            <div className="flex gap-4">
              <Link href="/">
                <Button variant="outline">View Site</Button>
              </Link>
              <Button
                variant="secondary"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            What would you like to create?
          </h2>
          <p className="text-gray-600">
            Choose an option below to add content to your website
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Recipe Card */}
          <Link href="/admin/upload/recipe">
            <Card className="p-8 hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="text-center">
                <div className="text-5xl mb-4">🍳</div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Upload Recipe
                </h3>
                <p className="text-gray-600 mb-4">
                  Add a new recipe with images, ingredients, and instructions
                </p>
                <Button variant="primary" className="w-full">
                  Create Recipe
                </Button>
              </div>
            </Card>
          </Link>

          {/* Upload Blog Post Card */}
          <Link href="/admin/upload/blog">
            <Card className="p-8 hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="text-center">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Upload Blog Post
                </h3>
                <p className="text-gray-600 mb-4">
                  Write a new lifestyle post to share your stories
                </p>
                <Button variant="primary" className="w-full">
                  Create Post
                </Button>
              </div>
            </Card>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-butter-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">
            💡 How the CMS Works
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Upload images and markdown files for your content</li>
            <li>• Content is saved to your local file system</li>
            <li>• Changes appear immediately on your site at localhost:3000</li>
            <li>• Commit and push to GitHub to deploy to production</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
