import Image from 'next/image'
import { LifestylePost } from '@/types/post'
import Badge from '@/components/ui/Badge'
import { format } from 'date-fns'

interface PostDetailProps {
  post: LifestylePost
  renderedContent: React.ReactNode
}

export default function PostDetail({ post, renderedContent }: PostDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Hero Image */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8 bg-butter-100">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        )}
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          {post.title}
        </h1>

        <p className="text-xl text-gray-600 mb-4">
          {post.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-b border-gray-200 py-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">By {post.author}</span>
          </div>
          <span>•</span>
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
          </time>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {renderedContent}
      </div>
    </article>
  )
}
