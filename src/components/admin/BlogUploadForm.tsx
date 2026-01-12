'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import ImageUpload from './ImageUpload'
import TagsInput from './TagsInput'
import MarkdownEditor from './MarkdownEditor'

interface BlogFormData {
  title: string
  description: string
  author: string
  image: string
  tags: string[]
  content: string
}

const POPULAR_TAGS = [
  'college-life',
  'cooking-tips',
  'kitchen-essentials',
  'meal-prep',
  'budget-cooking',
  'time-management',
  'student-life',
  'healthy-eating',
  'dorm-cooking',
  'quick-meals',
]

export default function BlogUploadForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    description: '',
    author: '',
    image: '',
    tags: [],
    content: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BlogFormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const updateField = <K extends keyof BlogFormData>(
    field: K,
    value: BlogFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BlogFormData, string>> = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.author.trim()) newErrors.author = 'Author is required'
    if (!formData.image) newErrors.image = 'Image is required'
    if (formData.tags.length === 0) newErrors.tags = 'Add at least one tag'
    if (!formData.content.trim()) newErrors.content = 'Content is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/upload/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        // Redirect to the new post after 2 seconds
        setTimeout(() => {
          router.push(`/lifestyle/${data.slug}`)
        }, 2000)
      } else {
        setErrors({ title: data.error || 'Failed to upload blog post' })
      }
    } catch (error) {
      setErrors({ title: 'Failed to upload blog post. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
          Blog Post Uploaded Successfully!
        </h2>
        <p className="text-gray-600 mb-4">
          Redirecting you to the post page...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Post Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., My First Year Cooking in College"
          className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-butter-400/20 ${
            errors.title ? 'border-red-500' : 'border-gray-300 focus:border-butter-400'
          }`}
        />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="A brief description of your post..."
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-butter-400/20 resize-y ${
            errors.description ? 'border-red-500' : 'border-gray-300 focus:border-butter-400'
          }`}
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description}</p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Author Name *
        </label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => updateField('author', e.target.value)}
          placeholder="Your name"
          className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-butter-400/20 ${
            errors.author ? 'border-red-500' : 'border-gray-300 focus:border-butter-400'
          }`}
        />
        {errors.author && <p className="text-sm text-red-600 mt-1">{errors.author}</p>}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Featured Image *
        </label>
        <ImageUpload
          category="lifestyle"
          onUploadComplete={(path) => updateField('image', path)}
          currentImage={formData.image}
        />
        {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Tags *
        </label>
        <TagsInput
          value={formData.tags}
          onChange={(tags) => updateField('tags', tags)}
          suggestions={POPULAR_TAGS}
        />
        {errors.tags && <p className="text-sm text-red-600 mt-1">{errors.tags}</p>}
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Post Content *
        </label>
        <MarkdownEditor
          value={formData.content}
          onChange={(content) => updateField('content', content)}
        />
        {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button
          type="submit"
          variant="primary"
          disabled={submitting}
          className="flex-1"
        >
          {submitting ? 'Uploading Post...' : 'Upload Post'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/dashboard')}
          disabled={submitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
