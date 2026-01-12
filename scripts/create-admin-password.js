const bcrypt = require('bcrypt');

async function createPassword() {
  const password = 'Admin2024Culinary';

  console.log('\n=== ADMIN PASSWORD SETUP ===\n');
  console.log('Password:', password);

  const hash = await bcrypt.hash(password, 10);
  console.log('\nGenerated Hash:', hash);

  // Verify it works
  const matches = await bcrypt.compare(password, hash);
  console.log('Verification:', matches ? '✅ SUCCESS' : '❌ FAILED');

  console.log('\n=== FOR LOCAL (.env.local) ===');
  console.log('ADMIN_PASSWORD_HASH="' + hash + '"');

  console.log('\n=== FOR VERCEL ===');
  console.log('Key: ADMIN_PASSWORD_HASH');
  console.log('Value:', hash);
  console.log('(Copy the hash above exactly as-is into Vercel)\n');
}

createPassword();
