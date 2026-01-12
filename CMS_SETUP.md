# Admin CMS Setup Guide

This guide will help you set up and use the admin CMS for uploading recipes and blog posts.

## Quick Start

### Step 1: Generate Your Password Hash

Run this command in your terminal (make sure you're in the project directory):

```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('your-password-here', 10).then(hash => console.log(hash))"
```

Replace `your-password-here` with your desired password. This will output a hash like:

```
$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKL
```

Copy this hash.

### Step 2: Create Environment Variables

Create a file named `.env.local` in the project root (next to `package.json`):

```env
ADMIN_PASSWORD_HASH=<paste-your-hash-here>
SESSION_SECRET=your-random-32-character-secret-key-here
NODE_ENV=development
```

**Important**:
- Replace `<paste-your-hash-here>` with the hash from Step 1
- Generate a random string for `SESSION_SECRET` (e.g., use a password generator)
- Never commit `.env.local` to git (it's already in `.gitignore`)

### Step 3: Restart Development Server

```bash
npm run dev
```

### Step 4: Access the Admin Panel

1. Open your browser to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Enter the password you chose in Step 1
3. You'll be redirected to the admin dashboard

## Using the CMS

### Uploading a Recipe

1. Click "Upload Recipe" on the dashboard
2. Fill in all required fields:
   - **Title**: Name of your recipe
   - **Description**: Brief summary (shows in recipe cards)
   - **Category**: Choose from breakfast, lunch, dinner, snack, dessert, or drinks
   - **Difficulty**: Easy, medium, or hard
   - **Prep Time**: Minutes to prepare ingredients
   - **Cook Time**: Minutes to cook
   - **Servings**: Number of servings
   - **Image**: Drag and drop or click to upload (max 5MB)
   - **Tags**: Type and press Enter to add tags
   - **Ingredients**: Add ingredients one by one (include measurements)
   - **Instructions**: Write your recipe steps in markdown format

3. Click "Upload Recipe"
4. You'll be redirected to the new recipe page

### Uploading a Blog Post

1. Click "Upload Blog Post" on the dashboard
2. Fill in all required fields:
   - **Title**: Blog post title
   - **Description**: Brief summary (shows in post cards)
   - **Author**: Your name
   - **Image**: Featured image (max 5MB)
   - **Tags**: Type and press Enter to add tags
   - **Content**: Write your post in markdown format

3. Click "Upload Post"
4. You'll be redirected to the new blog post page

## Markdown Tips

The content editor supports markdown formatting:

- `# Heading 1`, `## Heading 2`, `### Heading 3`
- `**bold**`, `*italic*`
- `[link text](url)`
- Bullet lists: `- Item`
- Numbered lists: `1. Item`
- Blockquotes: `> Quote`

You can also upload a `.md` file instead of typing directly.

## Important: Development Only

**The CMS only works in local development.**

Why? Vercel (and most serverless platforms) have read-only file systems in production. Your uploaded content can't be saved to files on the server.

### Production Workflow

1. Use the CMS locally to create content
2. New files appear in:
   - Recipes: `content/recipes/[category]/[slug].md`
   - Blog posts: `content/lifestyle/[slug].md`
   - Images: `public/images/recipes/` or `public/images/lifestyle/`
3. Commit these files to git
4. Push to GitHub
5. Vercel automatically rebuilds and deploys with your new content

### Example Git Workflow

```bash
# After creating content via CMS
git add content/ public/images/
git commit -m "Add new recipe: Chocolate Chip Cookies"
git push origin main
```

## Troubleshooting

### "Invalid credentials" error
- Check that your `.env.local` file exists
- Verify the password hash was generated correctly
- Make sure you're using the same password you hashed

### Image upload fails
- Check file size (max 5MB)
- Ensure file type is JPEG, PNG, or WebP
- Try a different browser if drag-and-drop isn't working

### Recipe/blog post not appearing
- Check that all required fields were filled
- Look in `content/recipes/` or `content/lifestyle/` for the generated file
- Refresh the page or restart dev server

### Session expired
- Sessions last 1 hour for security
- Just log in again at `/admin`

## Security Notes

- Never commit `.env.local` to git
- Use a strong password
- Change `SESSION_SECRET` if you suspect it's compromised
- The CMS is protected by middleware - all admin routes require authentication

## Need Help?

Check the main README.md for more details, or open an issue on GitHub.
