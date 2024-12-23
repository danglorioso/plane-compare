'use client'

import { useState } from 'react';
import PlaneDropdown from '../components/PlaneDropdown';
import ComparisonTable from '../components/ComparisonTable';

export default function Home() {
  const [plane1Id, setPlane1Id] = useState(null);
  const [plane2Id, setPlane2Id] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Compare Planes</h1>
      <div className="flex space-x-4 mb-4">
        <PlaneDropdown onPlaneSelect={setPlane1Id} />
        <PlaneDropdown onPlaneSelect={setPlane2Id} />
      </div>
      <ComparisonTable plane1Id={plane1Id} plane2Id={plane2Id} />
    </div>
  );
}
