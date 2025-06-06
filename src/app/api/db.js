import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}
