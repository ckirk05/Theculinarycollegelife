import { NextRequest, NextResponse } from 'next/server'
import { writeBlogPost, BlogData } from '@/lib/cms'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields: (keyof BlogData)[] = [
      'title',
      'description',
      'image',
      'tags',
      'author',
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

    // Write blog post to file system
    const result = await writeBlogPost(data)

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
    console.error('Blog upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload blog post' },
      { status: 500 }
    )
  }
}
