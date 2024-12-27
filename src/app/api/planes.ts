// import { query } from '../../lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const planes = await query('SELECT * FROM planes ORDER BY name');
//       res.status(200).json({ planes });
//     } catch (error) {
//       console.error('Error fetching planes:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }
