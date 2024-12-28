import { query } from '../db.js';

// Define the type for the result
interface Plane {
  icao_code: string;
  full_name: string;
}

export async function GET(request: Request): Promise<Response> {
  try {
    // Parse the query parameters to get the ICAO code
    const url = new URL(request.url);
    const icaoCode = url.searchParams.get('icao');

    if (!icaoCode) {
      return new Response(JSON.stringify({ error: 'ICAO code is required' }), {
        status: 400,
      });
    }

    // Query the database for the plane with the given ICAO code
    const result: Plane[] = await query(
      `SELECT icao_code, CONCAT(manufacturer, ' ', model) AS full_name FROM planes WHERE icao_code = $1;`,
      [icaoCode]
    );

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No plane found for the provided ICAO code' }),
        { status: 404 }
      );
    }

    // Return the concatenated full name for the plane
    const plane = result[0];
    return new Response(
      JSON.stringify({ icao_code: plane.icao_code, full_name: plane.full_name }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
