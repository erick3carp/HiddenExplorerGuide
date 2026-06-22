'use client';

import dynamic from 'next/dynamic';

const DestinationMap = dynamic(() => import('./DestinationMap'), {
  ssr: false,
  loading: () => <div className="map-loading">Loading map...</div>,
});

export default function MapLoader({ destinations }) {
  return <DestinationMap destinations={destinations} />;
}
