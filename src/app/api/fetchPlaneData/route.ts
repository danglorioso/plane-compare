import { query } from '../db.js';

// Define the type for a plane statistic row
interface PlaneStatistic {
  icao_code: string;
  iata_type_code: string;
  manufacturer: string;
  model: string;
  engine_type: string;
  length_ft: number;
  height_ft: number;
  wingspan_ft: number;
  max_speed_kt: number;
  ceiling_ft: number;
  range_nm: number;
}

// Define the type for the accumulated plane data
type PlaneData = Record<string, Omit<PlaneStatistic, 'icao_code'>>;

export async function GET(request: Request): Promise<Response> {
  try {
    // Parse the query parameters for `id` or `ids`
    const url = new URL(request.url);
    const ids = 
      url.searchParams.get('ids')?.split(',') || 
      (url.searchParams.get('id') ? [url.searchParams.get('id')] : []);

    // Return early error if no plane IDs provided
    if (ids.length === 0) {
      return new Response(JSON.stringify({ error: 'No planes selected' }), {
        status: 400,
      });
    }

    // Build the query using `ANY` operator to fetch multiple planes
    const queryText = `SELECT * FROM planes WHERE icao_code = ANY($1);`;

    // Fetch the data for the selected planes
    const result: PlaneStatistic[] = await query(queryText, [ids]);

    // Structure the data in a flexible format
    const planeData: PlaneData = result.reduce((acc: PlaneData, row: PlaneStatistic) => {
      const { icao_code, ...statistics } = row;
      acc[icao_code] = statistics;
      return acc;
    }, {});

    return new Response(JSON.stringify({ planeData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
