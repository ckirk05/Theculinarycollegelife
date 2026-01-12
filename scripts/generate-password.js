const bcrypt = require('bcrypt')
const crypto = require('crypto')

async function generatePassword() {
  const password = process.argv[2]

  if (!password) {
    console.error('❌ Please provide a password as an argument')
    console.log('Usage: node scripts/generate-password.js your-password')
    process.exit(1)
  }

  try {
    console.log('🔐 Generating password hash...\n')

    // Generate password hash
    const hash = await bcrypt.hash(password, 10)

    // Generate session secret
    const sessionSecret = crypto.randomBytes(32).toString('hex')

    console.log('✅ Password hash generated successfully!\n')
    console.log('Add these to your .env.local file:\n')
    console.log('ADMIN_PASSWORD_HASH=' + hash)
    console.log('SESSION_SECRET=' + sessionSecret)
    console.log('NODE_ENV=development')
    console.log('\n⚠️  Keep your .env.local file secure and never commit it to git!')
  } catch (error) {
    console.error('❌ Error generating password hash:', error)
    process.exit(1)
  }
}

generatePassword()
