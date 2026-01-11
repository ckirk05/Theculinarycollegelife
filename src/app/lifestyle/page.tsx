import { getAllLifestylePosts } from '@/lib/content'
import PostGrid from '@/components/lifestyle/PostGrid'

export const metadata = {
  title: 'Lifestyle Blog',
  description: 'Read about cooking tips, college life, and culinary adventures',
}

export default function LifestylePage() {
  const posts = getAllLifestylePosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Lifestyle Blog
        </h1>
        <p className="text-xl text-gray-600">
          Stories, tips, and inspiration from the kitchen and beyond
        </p>
      </header>

      <PostGrid posts={posts} emptyMessage="No posts yet. Check back soon!" />
    </div>
  )
}
