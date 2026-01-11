import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Recipe, RecipeCategory, RecipeFrontmatter } from '@/types/recipe'
import { LifestylePost, LifestylePostFrontmatter } from '@/types/post'

const contentDirectory = path.join(process.cwd(), 'content')
const recipesDirectory = path.join(contentDirectory, 'recipes')
const lifestyleDirectory = path.join(contentDirectory, 'lifestyle')

// Helper function to ensure directory exists
function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    return false
  }
  return true
}

// Helper function to get all markdown files in a directory recursively
function getMarkdownFiles(dir: string): string[] {
  if (!ensureDirectoryExists(dir)) {
    return []
  }

  const files: string[] = []
  const items = fs.readdirSync(dir)

  items.forEach(item => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath))
    } else if (item.endsWith('.md')) {
      files.push(fullPath)
    }
  })

  return files
}

// Get all recipes
export function getAllRecipes(): Recipe[] {
  const files = getMarkdownFiles(recipesDirectory)

  const recipes = files.map(filePath => {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as RecipeFrontmatter

    // Extract category from file path
    const relativePath = path.relative(recipesDirectory, filePath)
    const category = relativePath.split(path.sep)[0] as RecipeCategory

    // Generate slug from filename
    const fileName = path.basename(filePath, '.md')
    const slug = `${category}/${fileName}`

    const recipe: Recipe = {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      category: frontmatter.category || category,
      image: frontmatter.image,
      prepTime: frontmatter.prepTime,
      cookTime: frontmatter.cookTime,
      totalTime: frontmatter.prepTime + frontmatter.cookTime,
      servings: frontmatter.servings,
      difficulty: frontmatter.difficulty,
      tags: frontmatter.tags || [],
      ingredients: frontmatter.ingredients || [],
      publishedAt: frontmatter.publishedAt,
      content,
    }

    return recipe
  })

  // Sort by published date (newest first)
  return recipes.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

// Get recipes by category
export function getRecipesByCategory(category: RecipeCategory): Recipe[] {
  const allRecipes = getAllRecipes()
  return allRecipes.filter(recipe => recipe.category === category)
}

// Get recipe by slug
export function getRecipeBySlug(slug: string): Recipe | undefined {
  const allRecipes = getAllRecipes()
  return allRecipes.find(recipe => recipe.slug === slug)
}

// Get all lifestyle posts
export function getAllLifestylePosts(): LifestylePost[] {
  const files = getMarkdownFiles(lifestyleDirectory)

  const posts = files.map(filePath => {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as LifestylePostFrontmatter

    // Generate slug from filename
    const fileName = path.basename(filePath, '.md')

    const post: LifestylePost = {
      slug: fileName,
      title: frontmatter.title,
      description: frontmatter.description,
      image: frontmatter.image,
      publishedAt: frontmatter.publishedAt,
      tags: frontmatter.tags || [],
      author: frontmatter.author,
      content,
    }

    return post
  })

  // Sort by published date (newest first)
  return posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

// Get lifestyle post by slug
export function getLifestylePostBySlug(slug: string): LifestylePost | undefined {
  const allPosts = getAllLifestylePosts()
  return allPosts.find(post => post.slug === slug)
}

// Get all unique tags from recipes and posts
export function getAllTags(): string[] {
  const recipes = getAllRecipes()
  const posts = getAllLifestylePosts()

  const recipeTags = recipes.flatMap(recipe => recipe.tags)
  const postTags = posts.flatMap(post => post.tags)

  return [...new Set([...recipeTags, ...postTags])].sort()
}

// Get recipes by tag
export function getRecipesByTag(tag: string): Recipe[] {
  const allRecipes = getAllRecipes()
  return allRecipes.filter(recipe => recipe.tags.includes(tag))
}
