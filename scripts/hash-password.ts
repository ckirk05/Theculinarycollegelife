/**
 * Quick script to hash a password
 * Usage: npx tsx scripts/hash-password.ts "your-password-here"
 */

import bcrypt from 'bcrypt'

const password = process.argv[2]

if (!password) {
  console.error('❌ Error: Please provide a password as an argument')
  console.error('Usage: npx tsx scripts/hash-password.ts "your-password-here"')
  process.exit(1)
}

if (password.length < 8) {
  console.error('❌ Error: Password must be at least 8 characters long')
  process.exit(1)
}

bcrypt.hash(password, 10).then((hash) => {
  console.log('\n✅ Password hash generated!\n')
  console.log('Add this to your .env.local file:\n')
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`)
  console.log('For Vercel, add this same variable in your project settings:')
  console.log('https://vercel.com/[your-username]/theculinarycollegelife/settings/environment-variables\n')
})
