import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllRecipes, getRecipeBySlug } from '@/lib/content'
import RecipeDetail from '@/components/recipe/RecipeDetail'
import RecipeViewTracker from '@/components/recipe/RecipeViewTracker'
import type { Metadata } from 'next'

interface RecipePageProps {
  params: Promise<{ category: string; recipe: string }>
}

// Generate static params for all recipes
export async function generateStaticParams() {
  const recipes = getAllRecipes()

  return recipes.map((recipe) => {
    const [category, recipeName] = recipe.slug.split('/')
    return {
      category,
      recipe: recipeName,
    }
  })
}

// Generate metadata for SEO
export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { category, recipe: recipeName } = await params
  const slug = `${category}/${recipeName}`
  const recipe = getRecipeBySlug(slug)

  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    }
  }

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: 'article',
      images: recipe.image ? [recipe.image] : [],
    },
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { category, recipe: recipeName } = await params
  const slug = `${category}/${recipeName}`
  const recipe = getRecipeBySlug(slug)

  if (!recipe) {
    notFound()
  }

  // Render MDX content
  const content = <MDXRemote source={recipe.content} />

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: recipe.image,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.totalTime}M`,
    recipeYield: recipe.servings,
    recipeIngredient: recipe.ingredients,
    recipeCategory: recipe.category,
    keywords: recipe.tags.join(', '),
    datePublished: recipe.publishedAt,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RecipeViewTracker recipe={recipe}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <RecipeDetail recipe={recipe} renderedContent={content} />
        </div>
      </RecipeViewTracker>
    </>
  )
}
