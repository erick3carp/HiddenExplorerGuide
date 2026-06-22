import Link from 'next/link';
import MapLoader from '../../components/MapLoader';
import { publishedDestinations } from '../../lib/destinations';

export default function MapPage() {
  return (
    <main className="container">
      <p className="eyebrow">Interactive map</p>
      <h1>Plan by location</h1>
      <p className="lead">Explore the photo-ready places on a live map view. Filter by category, open a pin, and jump into the destination profile.</p>
      <MapLoader destinations={publishedDestinations} />
     <section className="map-panel">
    <div className="map-panel-header">
    <p className="eyebrow">Explore by map</p>
    <h2>New Smyrna Beach locations</h2>
    <p className="lead">
      Browse curated places from the map and open each profile for photos,
      notes, and visitor details.
    </p>
  </div>

  <div className="map-list">
    {publishedDestinations.map((destination) => (
      <Link
        className="map-item"
        href={`/destination/${destination.slug}`}
        key={destination.id}
      >
        <span className="map-item-label">Location</span>
        <strong>{destination.name}</strong>
        <span>View profile →</span>
      </Link>
    ))}
  </div>
</section>
    </main>
  );
}
