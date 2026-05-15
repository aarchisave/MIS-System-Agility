import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('ERROR: DATABASE_URL not found in .env');
  process.exit(1);
}

const client = new Client({
  connectionString: connectionString,
});

async function runMigrations() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL');

    const migrationsDir = path.resolve(__dirname, '../migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      console.log(`Executing: ${file}`);
      const sql = fs.readFileSync(filePath, 'utf8');
      await client.query(sql);
      console.log(`Successfully executed ${file}`);
    }

    console.log('All migrations completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err.message);
  } finally {
    await client.end();
  }
}

runMigrations();
