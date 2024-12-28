// import { query } from '../db.js';

// export async function GET(request) {
//     try {
//         // Get ICAO codes from the query parameters (e.g., ?planeIds=G450,G650)
//         const url = new URL(request.url);
//         const planeIds = url.searchParams.get('planeIds')?.split(',') || [];

//         // Return error if called and no planes selected
//         if (planeIds.length === 0) {
//             return new Response(JSON.stringify({ error: 'No planes selected' }), {
//                 status: 400,
//             });
//         }

//     // Build a query to fetch data for the selected planes
//     const placeholders = planeIds.map(() => '?').join(', ');
//     const queryText = `
//       SELECT * FROM plane_statistics
//       WHERE icao_code IN (${placeholders});
//     `;

//     // Fetch the data for the selected planes
//     const result = await query(queryText, planeIds);

//     // Return the data in a structure that supports future flexibility
//     const planeData = result.reduce((acc, row) => {
//       const { icao_code, ...statistics } = row;
//       acc[icao_code] = statistics;
//       return acc;
//     }, {});

//     return new Response(JSON.stringify({ planeData }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });

//     } catch (error) {
//         console.error("Database query error:", error);
//         return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//           status: 500,
//         });
//     }

// }