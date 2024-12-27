'use client';
import { useState, useEffect } from 'react';

export default function PlaneDropdown({ onPlaneSelect }) {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await fetch('/api/fetchPlanes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Extract only the full_name (manufacturer + model) for the dropdown
        setPlanes(data.planes || []); // Assuming 'planes' is an array of tuples
      } catch (error) {
        console.error('Fetch planes error:', error);
      }
    };

    fetchPlanes();
  }, []);

  return (
    <select onChange={(e) => onPlaneSelect(e.target.value)}>
      <option value="">Select a plane</option>
      {planes.map((plane, index) => (
        // Use the ICAO code (plane[0]) as the value
        <option key={index} value={plane[0]}>
          {plane[1]} {/* Display the concatenated full name */}
        </option>
      ))}
    </select>
  );
}