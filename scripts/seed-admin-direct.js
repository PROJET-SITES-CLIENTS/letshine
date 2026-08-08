const { Client } = require('pg');
const bcrypt = require('bcryptjs');

async function seed() {
  const connectionString = 'postgresql://neondb_owner:npg_G02ocxmAEKhX@ep-little-haze-ayhwy8di.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require';
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    
    // Hash password
    const adminPassword = bcrypt.hashSync("admin123", 12);
    
    // Check if admin exists
    const checkRes = await client.query('SELECT * FROM "User" WHERE email = $1', ['admin@letsshine.africa']);
    if (checkRes.rows.length === 0) {
      await client.query(`
        INSERT INTO "User" ("id", "email", "name", "password", "role", "country", "createdAt", "updatedAt") 
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      `, [
        'c-admin-id-12345', 
        'admin@letsshine.africa', 
        "Admin LET'S SHINE", 
        adminPassword, 
        'ADMIN', 
        'Guinée'
      ]);
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('✅ Admin user already exists!');
    }

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.end();
  }
}

seed();
