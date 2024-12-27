import { query } from './db.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await query(
        'SELECT DISTINCT CONCAT(manufacturer, \' \', model) AS full_name FROM planes;'
      );

      res.status(200).json({ planes: result.rows });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
