const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@letsshine.africa';
  const password = 'AdminPassword123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN'
    },
    create: {
      email,
      name: 'Admin LET\'S SHINE',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Admin password updated for:', user.email);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
