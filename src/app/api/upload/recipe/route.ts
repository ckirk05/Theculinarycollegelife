import { NextRequest, NextResponse } from 'next/server'
import { writeRecipe, RecipeData } from '@/lib/cms'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields: (keyof RecipeData)[] = [
      'title',
      'description',
      'category',
      'image',
      'prepTime',
      'cookTime',
      'servings',
      'difficulty',
      'tags',
      'ingredients',
      'content',
    ]

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate arrays
    if (!Array.isArray(data.tags) || data.tags.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tags must be a non-empty array' },
        { status: 400 }
      )
    }

    if (!Array.isArray(data.ingredients) || data.ingredients.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Ingredients must be a non-empty array' },
        { status: 400 }
      )
    }

    // Validate numbers
    if (data.prepTime <= 0 || data.cookTime <= 0 || data.servings <= 0) {
      return NextResponse.json(
        { success: false, error: 'Times and servings must be greater than 0' },
        { status: 400 }
      )
    }

    // Validate category
    const validCategories = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'drinks']
    if (!validCategories.includes(data.category)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
        { status: 400 }
      )
    }

    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'hard']
    if (!validDifficulties.includes(data.difficulty)) {
      return NextResponse.json(
        { success: false, error: 'Invalid difficulty' },
        { status: 400 }
      )
    }

    // Write recipe to file system
    const result = await writeRecipe(data)

    if (result.success) {
      return NextResponse.json({
        success: true,
        slug: result.slug,
        path: result.path,
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Recipe upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload recipe' },
      { status: 500 }
    )
  }
}
