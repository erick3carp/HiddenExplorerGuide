import Link from 'next/link';
import MapLoader from '../../components/MapLoader';
import CategoryBadge from '../../components/CategoryBadge';
import DestinationImage from '../../components/DestinationImage';
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

        {publishedDestinations.length === 0 ? (
          <div className="side-panel" role="status">
            <h3>No destinations available yet</h3>
            <p>New places will appear here as they are added to the guide.</p>
          </div>
        ) : (
          <div className="map-list">
            {publishedDestinations.map((destination) => (
              <article className="map-preview-card" key={destination.id}>
                <DestinationImage
                  className="map-preview-image"
                  src={destination.featuredImage}
                  alt=""
                />
                <div className="map-preview-body">
                  <CategoryBadge category={destination.category} />
                  <h3>{destination.name}</h3>
                  <Link
                    className="map-preview-link"
                    href={`/destination/${destination.slug}`}
                  >
                    View Guide &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
