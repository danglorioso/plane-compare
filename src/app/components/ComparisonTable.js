'use client';

import { useState, useEffect } from 'react';

export default function ComparisonTable({ plane1Id, plane2Id }) {
  const [plane1, setPlane1] = useState(null);
  const [plane2, setPlane2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch plane data for the given IDs
    async function fetchPlaneData(ids, setPlanes) {
      if (ids.length > 0) {
        const response = await fetch(`/api/fetchPlaneData?ids=${ids.join(',')}`);
        const data = await response.json();
        setPlanes(data.planeData);
      }
    }

    const fetchPlanes = async () => {
      setLoading(true);

      const ids = [plane1Id, plane2Id].filter(Boolean); // Filter out undefined or null IDs
      await fetchPlaneData(ids, (data) => {
        if (data[plane1Id]) setPlane1(data[plane1Id]);
        if (data[plane2Id]) setPlane2(data[plane2Id]);
      });

      setLoading(false);
    };

    fetchPlanes();
  }, [plane1Id, plane2Id]);

  // Display loading message while fetching data
  if (loading) return <p>Loading plane data...</p>;

  // Display message if no planes are selected
  if (!plane1 && !plane2) return <p>Select planes to compare.</p>;

  // Define stats to display
  const statistics = [
    { label: 'Manufacturer', key: 'manufacturer' },
    { label: 'Model', key: 'model' },
    { label: 'Engine Type', key: 'engine_type' },
    { label: 'Length (ft)', key: 'length_ft' },
    { label: 'Height (ft)', key: 'height_ft' },
    { label: 'Wingspan (ft)', key: 'wingspan_ft' },
    { label: 'Top Speed (kt)', key: 'max_speed_kt' },
    { label: 'Ceiling (ft)', key: 'ceiling_ft' },
    { label: 'Range (nm)', key: 'range_nm' },
  ];

  const plane1Name = plane1?.manufacturer + ' ' + plane1?.model;
  const plane2Name = plane2?.manufacturer + ' ' + plane2?.model;

  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          {/* Title for each column (aircraft name) */}
          <th className="border border-gray-300 px-4 py-2">Statistic</th>
          <th className="border border-gray-300 px-4 py-2">{plane1Name || 'Plane 1'}</th>
          <th className="border border-gray-300 px-4 py-2">{plane2Name || 'Plane 2'}</th>
        </tr>
      </thead>
      <tbody>
        {/* Traverse the 'statistics' array and render a row for each item */}
        {statistics.map(({ label, key }) => (
          <tr key={key}>
            <td className="border border-gray-300 px-4 py-2">{label}</td>
            <td className="border border-gray-300 px-4 py-2">{plane1?.[key] || 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{plane2?.[key] || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
