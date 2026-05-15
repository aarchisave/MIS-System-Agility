import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const pool = new Pool({
  connectionString: 'postgresql://postgres.dszhixicjssgjerwqbqp:postgres%4019%23@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function checkData() {
  try {
    const res = await pool.query('SELECT COUNT(*) FROM production_batches');
    console.log('Production Batches Count:', res.rows[0].count);
    
    const res2 = await pool.query('SELECT COUNT(*) FROM raw_materials');
    console.log('Raw Materials Count:', res2.rows[0].count);
    
    await pool.end();
  } catch (e) {
    console.error(e);
  }
}

checkData();
