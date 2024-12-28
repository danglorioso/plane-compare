'use client';
import { useState, useEffect } from 'react';

export default function PlaneDropdown({ onPlaneSelect }) {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        // Fetch unique list of planes from the server
        const response = await fetch('/api/fetchPlanes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Throw error if cannot call router handler
        if (!response.ok) throw new Error('Network response was not ok');

        // Parse the JSON response
        const data = await response.json();

        // Extract only the full_name (manufacturer + model) for the dropdown
        // Note: 'planes' is an array of tuples
        setPlanes(data.planes || []); 
      } catch (error) {
        console.error('Fetch planes error:', error);
      }
    };

    fetchPlanes();
  }, []);

  return (
    <select onChange={(e) => onPlaneSelect(e.target.value)}>
      <option value="">Select a plane</option>
      {/* Use each of array element as dropdown option */}
      {planes.map((plane, index) => (
        // Use the ICAO code (plane[0]) as the value
        <option key={index} value={plane[0]}>
          {plane[1]} {/* Display the concatenated full name */}
        </option>
      ))}
    </select>
  );
}