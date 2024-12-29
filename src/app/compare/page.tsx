'use client'

import { useState } from 'react';
import PlaneDropdown from '../components/PlaneDropdown';
import ComparisonTable from '../components/ComparisonTable';

export default function Home() {
  // Store ICAO codes for selected planes
  const [plane1Id, setPlane1Id] = useState(null);
  const [plane2Id, setPlane2Id] = useState(null);

  return (
    <div className="container mx-auto p-4 max-w-screen-sm">
      <h1 className="text-2xl font-bold mb-4">Compare Planes</h1>
      
      <div className="flex space-x-4 mb-4">
        {/* Pass the ICAO code to setPlane[1|2]Id when plane is selected */}
        <PlaneDropdown onPlaneSelect={setPlane1Id} />
        <PlaneDropdown onPlaneSelect={setPlane2Id} />
      </div>

      {/* Send ICAO codes for plane1Id and plane2Id to ComparisonTable */}
      <div className="flex justify-center items-center h-screen">
        <ComparisonTable plane1Id={plane1Id} plane2Id={plane2Id} />
      </div>
    
    </div>
  );
}
