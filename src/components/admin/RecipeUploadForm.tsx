'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import ImageUpload from './ImageUpload'
import TagsInput from './TagsInput'
import IngredientsInput from './IngredientsInput'
import MarkdownEditor from './MarkdownEditor'
import { RecipeCategory, Difficulty } from '@/types/recipe'

interface RecipeFormData {
  title: string
  description: string
  category: RecipeCategory | ''
  image: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: Difficulty | ''
  tags: string[]
  ingredients: string[]
  content: string
}

const POPULAR_TAGS = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
  'quick',
  'healthy',
  'comfort-food',
  'budget-friendly',
  'meal-prep',
  'one-pot',
  'no-bake',
  'kid-friendly',
]

export default function RecipeUploadForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    category: '',
    image: '',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: '',
    tags: [],
    ingredients: [],
    content: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof RecipeFormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const updateField = <K extends keyof RecipeFormData>(
    field: K,
    value: RecipeFormData[K]
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
    const newErrors: Partial<Record<keyof RecipeFormData, string>> = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.image) newErrors.image = 'Image is required'
    if (formData.prepTime <= 0) newErrors.prepTime = 'Prep time must be greater than 0'
    if (formData.cookTime <= 0) newErrors.cookTime = 'Cook time must be greater than 0'
    if (formData.servings <= 0) newErrors.servings = 'Servings must be greater than 0'
    if (!formData.difficulty) newErrors.difficulty = 'Difficulty is required'
    if (formData.tags.length === 0) newErrors.tags = 'Add at least one tag'
    if (formData.ingredients.length === 0) newErrors.ingredients = 'Add at least one ingredient'
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
      const response = await fetch('/api/upload/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        // Redirect to the new recipe after 2 seconds
        setTimeout(() => {
          router.push(`/recipes/${data.slug}`)
        }, 2000)
      } else {
        setErrors({ title: data.error || 'Failed to upload recipe' })
      }
    } catch (error) {
      setErrors({ title: 'Failed to upload recipe. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
          Recipe Uploaded Successfully!
        </h2>
        <p className="text-gray-600 mb-4">
          Redirecting you to the recipe page...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Recipe Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., Fluffy Buttermilk Pancakes"
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
          placeholder="A brief description of your recipe..."
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-butter-400/20 resize-y ${
            errors.description ? 'border-red-500' : 'border-gray-300 focus:border-butter-400'
          }`}
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description}</p>
        )}
      </div>

      {/* Category & Difficulty */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value as RecipeCategory)}
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-butter-400/20 ${
              errors.category ? 'border-red-500' : 'border-gray-300 focus:border-butter-400'
            }`}
          >
            <option value="">Select a category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
            <option value="dessert">Dessert</option>
            <option value="drinks">Drinks</option>
          </select>
          {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Difficulty *
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => updateField('difficulty', e.target.value as Difficulty)}
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-butter-400/20 ${
              errors.difficulty ? 'border-red-500' : 'border-gray-300 focus:border-butter-400'
            }`}
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          {errors.difficulty && (
            <p className="text-sm text-red-600 mt-1">{errors.difficulty}</p>
          )}
        </div>
      </div>

      {/* Time & Servings */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Prep Time (min) *
          </label>
          <input
            type="number"
            value={formData.prepTime || ''}
            onChange={(e) => updateField('prepTime', parseInt(e.target.value) || 0)}
            min="1"
            placeholder="15"
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-butter-400/20 ${
              errors.prepTime ? 'border-red-500' : 'border-gray-300 focus:border-butter-400'
            }`}
          />
          {errors.prepTime && <p className="text-sm text-red-600 mt-1">{errors.prepTime}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Cook Time (min) *
          </label>
          <input
            type="number"
            value={formData.cookTime || ''}
            onChange={(e) => updateField('cookTime', parseInt(e.target.value) || 0)}
            min="1"
            placeholder="20"
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-butter-400/20 ${
              errors.cookTime ? 'border-red-500' : 'border-gray-300 focus:border-butter-400'
            }`}
          />
          {errors.cookTime && <p className="text-sm text-red-600 mt-1">{errors.cookTime}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Servings *
          </label>
          <input
            type="number"
            value={formData.servings || ''}
            onChange={(e) => updateField('servings', parseInt(e.target.value) || 0)}
            min="1"
            placeholder="4"
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-butter-400/20 ${
              errors.servings ? 'border-red-500' : 'border-gray-300 focus:border-butter-400'
            }`}
          />
          {errors.servings && <p className="text-sm text-red-600 mt-1">{errors.servings}</p>}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Recipe Image *
        </label>
        <ImageUpload
          category="recipes"
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

      {/* Ingredients */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Ingredients *
        </label>
        <IngredientsInput
          value={formData.ingredients}
          onChange={(ingredients) => updateField('ingredients', ingredients)}
        />
        {errors.ingredients && (
          <p className="text-sm text-red-600 mt-1">{errors.ingredients}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Recipe Instructions *
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
          {submitting ? 'Uploading Recipe...' : 'Upload Recipe'}
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
