import { query } from '../db.js';

export async function GET() {
  try {
    // Query the database and concatenate manufacturer and model to create a full name
    const result = await query('SELECT DISTINCT CONCAT(manufacturer, \' \', model) AS full_name FROM planes;');

    // Return planes as JSON
    return new Response(JSON.stringify({ planes: result }), {
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
