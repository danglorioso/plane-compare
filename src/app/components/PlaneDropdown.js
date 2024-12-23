import { useState, useEffect } from 'react';

export default function PlaneDropdown({ onPlaneSelect }) {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    async function fetchPlanes() {
      const response = await fetch('/api/planes');
      const data = await response.json();
      setPlanes(data.planes);
    }

    fetchPlanes();
  }, []);

  return (
    <select onChange={(e) => onPlaneSelect(e.target.value)}>
      <option value="">Select a plane</option>
      {planes.map((plane) => (
        <option key={plane.id} value={plane.id}>
          {plane.name}
        </option>
      ))}
    </select>
  );
}
