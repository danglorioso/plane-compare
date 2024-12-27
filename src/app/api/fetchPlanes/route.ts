import { query } from '../db.js';

// Define the type for each row in the result
interface Plane {
  icao_code: string;
  full_name: string;
}
export async function GET() {
  try {
    // Query the database and concatenate manufacturer and model to create a full name
        const result: Plane[] = await query(`SELECT icao_code, CONCAT(manufacturer, \' \', model) AS full_name  FROM planes;`);

    // Map result to return tuples (ICAO code, full name)
    const planes = result.map(row => [row.icao_code, row.full_name]);

    // Return planes as JSON with ICAO code and concatenated manufacturer + model
    return new Response(JSON.stringify({ planes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  
  } catch (error) {
    console.error("Database query error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
