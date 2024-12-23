import { useState, useEffect } from 'react';

export default function ComparisonTable({ plane1Id, plane2Id }) {
  const [plane1, setPlane1] = useState(null);
  const [plane2, setPlane2] = useState(null);

  useEffect(() => {
    async function fetchPlaneData(id, setPlane) {
      if (id) {
        const response = await fetch(`/api/planes?id=${id}`);
        const data = await response.json();
        setPlane(data.plane);
      }
    }

    fetchPlaneData(plane1Id, setPlane1);
    fetchPlaneData(plane2Id, setPlane2);
  }, [plane1Id, plane2Id]);

  if (!plane1 && !plane2) return <p>Select planes to compare</p>;

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th>Statistic</th>
          <th>{plane1?.name || 'Plane 1'}</th>
          <th>{plane2?.name || 'Plane 2'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Manufacturer</td>
          <td>{plane1?.manufacturer || 'N/A'}</td>
          <td>{plane2?.manufacturer || 'N/A'}</td>
        </tr>
        <tr>
          <td>Top Speed</td>
          <td>{plane1?.top_speed || 'N/A'}</td>
          <td>{plane2?.top_speed || 'N/A'}</td>
        </tr>
        <tr>
          <td>Range</td>
          <td>{plane1?.range || 'N/A'}</td>
          <td>{plane2?.range || 'N/A'}</td>
        </tr>
        <tr>
          <td>Capacity</td>
          <td>{plane1?.capacity || 'N/A'}</td>
          <td>{plane2?.capacity || 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  );
}
