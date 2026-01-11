# The Culinary College Life

A beautiful, modern food and lifestyle blog built with Next.js 15, featuring recipes organized by meal type and lifestyle blog posts. Designed with a light, minimalistic aesthetic and butter yellow color scheme.

## 🌟 Features

- **Recipe Management**: 12 delicious recipes across 6 categories (breakfast, lunch, dinner, snack, dessert, drinks)
- **Lifestyle Blog**: 5 engaging blog posts about cooking, meal prep, and college life
- **Search Functionality**: Full-text search across recipes and blog posts using Fuse.js
- **Responsive Design**: Mobile-first design that looks great on all devices
- **SEO Optimized**: Structured data, meta tags, and Open Graph support
- **Static Site Generation**: Fast page loads with Next.js SSG
- **Markdown Content**: Easy content management with MDX support

## 🎨 Design

- **Color Scheme**: Butter yellow (#ffe970) primary color with warm, minimalistic design
- **Typography**: Inter for body text, Playfair Display for headings
- **Components**: Reusable UI components with Tailwind CSS
- **Navigation**: Responsive navigation with dropdown menus and mobile support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ckirk05/Theculinarycollegelife.git
cd Theculinarycollegelife
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
theculinarycollegelife/
├── content/                    # Markdown content
│   ├── recipes/               # Recipe files organized by category
│   │   ├── breakfast/
│   │   ├── lunch/
│   │   ├── dinner/
│   │   ├── snack/
│   │   ├── dessert/
│   │   └── drinks/
│   └── lifestyle/             # Lifestyle blog posts
├── public/
│   └── images/                # Static images
│       ├── recipes/
│       ├── lifestyle/
│       └── gallery/
├── src/
│   ├── app/                   # Next.js app router pages
│   ├── components/            # React components
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── recipe/           # Recipe-specific components
│   │   ├── lifestyle/        # Blog post components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                   # Utility functions
│   │   ├── content.ts        # Content fetching
│   │   ├── search.ts         # Search implementation
│   │   └── filters.ts        # Filtering logic
│   ├── types/                 # TypeScript type definitions
│   └── styles/                # Global styles
├── tailwind.config.ts         # Tailwind configuration
├── next.config.js             # Next.js configuration
└── package.json
```

## 📝 Adding Content

### Adding a Recipe

1. Create a new `.md` file in `content/recipes/[category]/`
2. Use this frontmatter template:

```markdown
---
title: "Recipe Title"
description: "Brief description"
category: "breakfast" # breakfast|lunch|dinner|snack|dessert|drinks
image: "/images/recipes/your-image.jpg"
prepTime: 10
cookTime: 20
servings: 4
difficulty: "easy" # easy|medium|hard
tags: ["vegetarian", "quick", "healthy"]
ingredients:
  - "Ingredient 1"
  - "Ingredient 2"
publishedAt: "2024-01-15"
---

## Instructions

Write your recipe instructions here...
```

### Adding a Blog Post

1. Create a new `.md` file in `content/lifestyle/`
2. Use this frontmatter template:

```markdown
---
title: "Post Title"
description: "Brief description"
image: "/images/lifestyle/your-image.jpg"
publishedAt: "2024-01-15"
tags: ["cooking-tips", "college-life"]
author: "Your Name"
---

Write your blog post content here...
```

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter and next-mdx-remote
- **Search**: Fuse.js
- **Date Handling**: date-fns
- **Fonts**: Google Fonts (Inter, Playfair Display)

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Pages

- **Homepage** (`/`) - Hero section, featured recipes, category grid
- **All Recipes** (`/recipes`) - Grid of all recipes
- **Recipe Category** (`/recipes/[category]`) - Recipes filtered by category
- **Recipe Detail** (`/recipes/[category]/[recipe]`) - Full recipe page
- **Lifestyle Blog** (`/lifestyle`) - All blog posts
- **Blog Post** (`/lifestyle/[slug]`) - Individual blog post
- **Search** (`/search`) - Search results page
- **Gallery** (`/gallery`) - Photo gallery

## 📊 Content Overview

### Recipes (12 total)

- **Breakfast**: Fluffy Buttermilk Pancakes, Overnight Oats
- **Lunch**: Chicken Caesar Wrap, Mediterranean Bowl
- **Dinner**: One-Pot Pasta Primavera, Sheet Pan Lemon Herb Chicken
- **Snacks**: No-Bake Energy Bites, Homemade Hummus & Veggie Plate
- **Desserts**: Classic Chocolate Chip Cookies, Microwave Brownie Mug Cake
- **Drinks**: Energizing Green Smoothie, Creamy Iced Coffee

### Blog Posts (5 total)

- Welcome to My Kitchen: A College Cooking Journey
- 10 Kitchen Essentials Every College Student Needs
- Meal Prep Sundays: My Game-Changing Routine
- How I Grocery Shop on $40 a Week
- 5 Cooking Mistakes I Made (So You Don't Have To)

## 🎯 Future Enhancements

- Recipe filtering by dietary restrictions and cook time
- User comments and ratings
- Recipe print view
- Newsletter signup
- Instagram feed integration
- Recipe scaling calculator
- Nutrition information

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ and lots of butter yellow
