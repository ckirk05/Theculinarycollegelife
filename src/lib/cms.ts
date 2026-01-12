import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { RecipeCategory, Difficulty } from '@/types/recipe'

/**
 * Generate a URL-safe slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60)
}

/**
 * Ensure slug is unique by appending a number if necessary
 */
export async function ensureUniqueSlug(baseSlug: string, directory: string): Promise<string> {
  let slug = baseSlug
  let counter = 1

  while (existsSync(path.join(directory, `${slug}.md`))) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}

/**
 * Generate frontmatter for a recipe
 */
export interface RecipeData {
  title: string
  description: string
  category: RecipeCategory
  image: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: Difficulty
  tags: string[]
  ingredients: string[]
  content: string
}

export function generateRecipeFrontmatter(data: RecipeData): string {
  const publishedAt = new Date().toISOString().split('T')[0]

  // Format ingredients and tags as YAML arrays
  const ingredientsYaml = data.ingredients.map(ing => `  - "${ing.replace(/"/g, '\\"')}"`).join('\n')
  const tagsYaml = data.tags.map(tag => `"${tag}"`).join(', ')

  const frontmatter = `---
title: "${data.title.replace(/"/g, '\\"')}"
description: "${data.description.replace(/"/g, '\\"')}"
category: "${data.category}"
image: "${data.image}"
prepTime: ${data.prepTime}
cookTime: ${data.cookTime}
servings: ${data.servings}
difficulty: "${data.difficulty}"
tags: [${tagsYaml}]
ingredients:
${ingredientsYaml}
publishedAt: "${publishedAt}"
---

${data.content}`

  return frontmatter
}

/**
 * Generate frontmatter for a blog post
 */
export interface BlogData {
  title: string
  description: string
  image: string
  tags: string[]
  author: string
  content: string
}

export function generateBlogFrontmatter(data: BlogData): string {
  const publishedAt = new Date().toISOString().split('T')[0]

  const tagsYaml = data.tags.map(tag => `"${tag}"`).join(', ')

  const frontmatter = `---
title: "${data.title.replace(/"/g, '\\"')}"
description: "${data.description.replace(/"/g, '\\"')}"
image: "${data.image}"
publishedAt: "${publishedAt}"
tags: [${tagsYaml}]
author: "${data.author.replace(/"/g, '\\"')}"
---

${data.content}`

  return frontmatter
}

/**
 * Write recipe to file system
 */
export async function writeRecipe(data: RecipeData): Promise<{ success: boolean; slug: string; path: string; error?: string }> {
  try {
    const slug = generateSlug(data.title)
    const directory = path.join(process.cwd(), 'content', 'recipes', data.category)

    // Ensure directory exists
    if (!existsSync(directory)) {
      await mkdir(directory, { recursive: true })
    }

    // Get unique slug
    const uniqueSlug = await ensureUniqueSlug(slug, directory)

    // Generate markdown content
    const markdown = generateRecipeFrontmatter(data)

    // Write file
    const filepath = path.join(directory, `${uniqueSlug}.md`)
    await writeFile(filepath, markdown, 'utf-8')

    return {
      success: true,
      slug: `${data.category}/${uniqueSlug}`,
      path: filepath,
    }
  } catch (error) {
    console.error('Write recipe error:', error)
    return {
      success: false,
      slug: '',
      path: '',
      error: error instanceof Error ? error.message : 'Failed to write recipe',
    }
  }
}

/**
 * Write blog post to file system
 */
export async function writeBlogPost(data: BlogData): Promise<{ success: boolean; slug: string; path: string; error?: string }> {
  try {
    const slug = generateSlug(data.title)
    const directory = path.join(process.cwd(), 'content', 'lifestyle')

    // Ensure directory exists
    if (!existsSync(directory)) {
      await mkdir(directory, { recursive: true })
    }

    // Get unique slug
    const uniqueSlug = await ensureUniqueSlug(slug, directory)

    // Generate markdown content
    const markdown = generateBlogFrontmatter(data)

    // Write file
    const filepath = path.join(directory, `${uniqueSlug}.md`)
    await writeFile(filepath, markdown, 'utf-8')

    return {
      success: true,
      slug: uniqueSlug,
      path: filepath,
    }
  } catch (error) {
    console.error('Write blog post error:', error)
    return {
      success: false,
      slug: '',
      path: '',
      error: error instanceof Error ? error.message : 'Failed to write blog post',
    }
  }
}
