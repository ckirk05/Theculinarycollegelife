#!/usr/bin/env tsx
/**
 * Script to generate a bcrypt hash for the admin password
 *
 * Usage:
 *   npx tsx scripts/generate-password-hash.ts
 *
 * Then enter your desired password when prompted.
 */

import bcrypt from 'bcrypt'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer)
    })
  })
}

async function main() {
  console.log('🔐 Admin Password Hash Generator\n')
  console.log('This will generate a bcrypt hash for your admin password.')
  console.log('The hash will be stored in your .env.local file.\n')

  const password = await question('Enter your admin password: ')

  if (!password || password.length < 8) {
    console.error('\n❌ Error: Password must be at least 8 characters long')
    rl.close()
    process.exit(1)
  }

  console.log('\n⏳ Generating hash...')

  const hash = await bcrypt.hash(password, 10)

  console.log('\n✅ Hash generated successfully!\n')
  console.log('Copy this hash to your .env.local file:\n')
  console.log('ADMIN_PASSWORD_HASH=' + hash)
  console.log('\n📝 Next steps:')
  console.log('1. Create or edit .env.local in your project root')
  console.log('2. Add the line above to .env.local')
  console.log('3. Restart your dev server (npm run dev)')
  console.log('4. Add the same variable to Vercel environment variables\n')

  rl.close()
}

main().catch((error) => {
  console.error('Error:', error)
  rl.close()
  process.exit(1)
})
