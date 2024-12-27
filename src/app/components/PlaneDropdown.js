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

        // Update state with planes
        setPlanes(data.planes || []); // Default to empty array if planes are missing
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
        <option key={index} value={plane.full_name}>
          {plane.full_name}
        </option>
      ))}
    </select>
  );
}
