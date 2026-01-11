import { LifestylePost } from '@/types/post'
import PostCard from './PostCard'

interface PostGridProps {
  posts: LifestylePost[]
  emptyMessage?: string
}

export default function PostGrid({ posts, emptyMessage = 'No posts found.' }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
