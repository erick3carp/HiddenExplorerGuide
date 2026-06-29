import DestinationCard from '../../components/DestinationCard';
import { categories, publishedDestinations } from '../../lib/destinations';
import { createPageMetadata } from '../../lib/seo';

export const metadata = createPageMetadata({
  title: 'All Destinations',
  description:
    'Browse every published Hidden Explorer Guide destination for New Smyrna Beach, from beaches and parks to food stops and photo spots.',
  path: '/destinations',
});

export default function DestinationsPage() {
  return (
    <main className="container">
      <div className="section-head">
        <div>
          <p className="eyebrow">Directory</p>
          <h1>All destinations</h1>
          <p className="lead">A photo-ready content directory for the New Smyrna Beach guide launch.</p>
        </div>
        <div className="chips">
          {categories.map((category) => (
            <span className="chip" key={category}>{category}</span>
          ))}
        </div>
      </div>
      <div className="grid">
        {publishedDestinations.map((destination) => (
          <DestinationCard destination={destination} key={destination.id} />
        ))}
      </div>
    </main>
  );
}
