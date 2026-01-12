# Deployment Guide

Your website is ready to deploy! Follow this guide to get your site live on Vercel (recommended) or Netlify.

## ✅ Pre-Deployment Checklist

All done! Your code is:
- ✅ Built successfully (31 static pages generated)
- ✅ Committed to git
- ✅ Pushed to GitHub: https://github.com/ckirk05/Theculinarycollegelife

## 🚀 Deploy to Vercel (Recommended for Next.js)

Vercel is the easiest way to deploy Next.js applications. It's free for personal projects and offers:
- Automatic deployments from GitHub
- Global CDN
- Automatic HTTPS
- Preview deployments for every PR
- Zero configuration needed

### Step-by-Step Instructions:

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Find and select "Theculinarycollegelife" from your repositories
   - Click "Import"

3. **Configure Project** (Vercel auto-detects Next.js settings)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Environment Variables** (Optional)
   - No environment variables needed for now
   - You can add them later in project settings

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at `https://theculinarycollegelife.vercel.app` (or similar)

6. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain (if you have one)
   - Follow Vercel's DNS instructions

### After Deployment:

- **Auto-deploys**: Every time you push to GitHub, Vercel automatically rebuilds and deploys
- **Preview URLs**: Every PR gets its own preview URL
- **Analytics**: Enable in project settings to track visitors

## 🌐 Alternative: Deploy to Netlify

If you prefer Netlify:

1. **Go to Netlify**
   - Visit https://netlify.com
   - Sign up with GitHub

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select "Theculinarycollegelife"

3. **Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - Click "Deploy site"

4. **Configure Next.js Plugin**
   - Netlify may prompt you to install the Next.js plugin
   - Click "Install" if prompted

## 📊 Post-Deployment Tasks

### 1. Test Your Live Site
- Check all pages load correctly
- Test navigation menu
- Try the search functionality
- View recipes on mobile and desktop
- Read a blog post

### 2. Update Social Media Links
- Share your site URL on social media
- Update any bios with your new link

### 3. Analytics (Optional)
- Add Google Analytics 4
- Enable Vercel Analytics (free tier available)

### 4. SEO Configuration

After deployment, update the metadata base URL:

**File: `src/app/layout.tsx`**

Add this to your metadata export:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.vercel.app'),
  title: {
    default: 'The Culinary College Life',
    template: '%s | The Culinary College Life',
  },
  // ... rest of metadata
}
```

Replace `https://your-domain.vercel.app` with your actual Vercel URL.

### 5. Add Real Images

Currently using placeholder images. Replace them with real photos:

1. Add images to appropriate folders:
   - `public/images/recipes/`
   - `public/images/lifestyle/`
   - `public/images/gallery/`

2. Update image paths in markdown files

3. Commit and push:
```bash
git add public/images
git commit -m "Add real recipe and lifestyle images"
git push
```

Vercel will automatically redeploy with new images!

## 🔄 Making Updates

To update your site after deployment:

1. Make changes locally
2. Test with `npm run dev`
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. Vercel automatically deploys in 2-3 minutes

## 🐛 Troubleshooting

### Build Fails on Vercel

Check the build logs in Vercel dashboard. Common issues:
- Missing dependencies: Make sure `package.json` is up to date
- Build errors: Test locally with `npm run build` first

### Images Not Loading

- Verify image paths start with `/` (e.g., `/images/recipes/pancakes.jpg`)
- Check images are in the `public/` directory
- Image files should be committed to git

### Search Not Working

- Search requires JavaScript to be enabled
- Check browser console for errors
- Ensure all recipes and posts have valid frontmatter

## 📈 Performance Tips

Your site is already optimized, but you can improve further:

1. **Optimize Images**: Use WebP format, compress before uploading
2. **Enable Caching**: Vercel does this automatically
3. **Monitor Performance**: Use Lighthouse in Chrome DevTools

## 🎉 You're Live!

Once deployed, your site will be accessible worldwide with:
- Lightning-fast load times
- Automatic HTTPS
- Global CDN distribution
- 99.9% uptime

Share your new website with the world!

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: https://github.com/ckirk05/Theculinarycollegelife/issues

## Next Steps

1. ✅ Deploy to Vercel (5 minutes)
2. ⏳ Add real images
3. ⏳ Customize content
4. ⏳ Share with friends!
