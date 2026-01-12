# Admin Password Setup Guide

This guide will help you set up a secure admin password for your CMS.

## Step 1: Generate Password Hash

Run this command, replacing `YOUR_PASSWORD` with your desired password (minimum 8 characters):

```bash
npx tsx scripts/hash-password.ts "YOUR_PASSWORD"
```

**Example:**
```bash
npx tsx scripts/hash-password.ts "MySecurePass123!"
```

This will output something like:
```
✅ Password hash generated!

Add this to your .env.local file:

ADMIN_PASSWORD_HASH=$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGH
```

## Step 2: Set Up Local Environment

1. Create a file named `.env.local` in your project root (if it doesn't exist)
2. Add the hash from Step 1:

```env
ADMIN_PASSWORD_HASH=$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGH
SESSION_SECRET=your-random-secret-key-change-this-in-production
```

**Generate SESSION_SECRET**: You can generate a random secret with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Save the file

## Step 3: Restart Development Server

```bash
npm run dev
```

## Step 4: Test Login

1. Go to http://localhost:3000/admin
2. Enter the password you used in Step 1
3. You should be redirected to the admin dashboard

## Step 5: Deploy to Vercel

### Add Environment Variables to Vercel

1. Go to your Vercel project: https://vercel.com
2. Select your project "theculinarycollegelife"
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

   **Variable 1:**
   - Name: `ADMIN_PASSWORD_HASH`
   - Value: (paste the hash from Step 1)
   - Environment: Select all (Production, Preview, Development)

   **Variable 2:**
   - Name: `SESSION_SECRET`
   - Value: (paste the random secret from Step 2)
   - Environment: Select all (Production, Preview, Development)

5. Click **Save**

### Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**

OR just push any change to GitHub:
```bash
git add .
git commit -m "Update environment variables"
git push
```

## Security Best Practices

1. **Never commit .env.local** - It's already in .gitignore, keep it that way
2. **Use a strong password** - At least 12 characters with mixed case, numbers, and symbols
3. **Different passwords** - Use different passwords for local development and production
4. **Session secret** - Use a different SESSION_SECRET for production (random 32+ character string)

## Changing Your Password

To change your admin password:

1. Generate a new hash with your new password:
   ```bash
   npx tsx scripts/hash-password.ts "NewPassword123!"
   ```

2. Update `.env.local` with the new hash

3. Update Vercel environment variables with the new hash

4. Restart your dev server or redeploy to Vercel

## Troubleshooting

### "Invalid password" error

- Make sure you copied the entire hash including the `$2b$10$...` part
- Check that there are no extra spaces or line breaks in your .env.local
- Verify the ADMIN_PASSWORD_HASH variable is set in Vercel

### "ADMIN_PASSWORD_HASH not found" error

- Make sure .env.local exists in your project root
- Restart your dev server after creating/editing .env.local
- For Vercel, ensure the environment variable is added and deployed

### Still having issues?

- Check the browser console for errors (F12 → Console tab)
- Check Vercel deployment logs in the Vercel dashboard
- Ensure bcrypt is installed: `npm install bcrypt`

## Example: Complete Setup

```bash
# 1. Generate hash
npx tsx scripts/hash-password.ts "MyAdminPass123!"

# 2. Generate session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 3. Create .env.local with both values
# (copy the outputs from commands above)

# 4. Restart dev server
npm run dev

# 5. Test at http://localhost:3000/admin
```

## Next Steps

Once your admin password is set up:

1. Access your admin panel at `/admin`
2. Upload recipes and blog posts
3. Manage your content

For more help, see the main [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md).
