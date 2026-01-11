import Link from 'next/link'
import Image from 'next/image'
import { LifestylePost } from '@/types/post'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { format } from 'date-fns'

interface PostCardProps {
  post: LifestylePost
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/lifestyle/${post.slug}`}>
      <Card className="h-full hover:scale-[1.02] transition-transform">
        {/* Image */}
        <div className="relative w-full h-48 bg-butter-100">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-xl font-bold mb-2 text-gray-900 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span>{post.author}</span>
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
            </time>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{post.tags.length - 3}</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
