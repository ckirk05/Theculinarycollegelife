const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your desired admin password: ', async (password) => {
  if (!password || password.length < 6) {
    console.log('\n❌ Password must be at least 6 characters long');
    rl.close();
    return;
  }

  console.log('\n🔐 Generating password hash...\n');

  const hash = await bcrypt.hash(password, 10);

  console.log('✅ Password hash generated!\n');
  console.log('Copy this hash and paste it into your .env.local file:\n');
  console.log(hash);
  console.log('\n📝 Your .env.local file should look like this:\n');
  console.log('ADMIN_PASSWORD_HASH=' + hash);
  console.log('SESSION_SECRET=' + generateRandomString(32));
  console.log('NODE_ENV=development');
  console.log('\n');

  rl.close();
});

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
