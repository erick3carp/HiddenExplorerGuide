import ExploreFilters from '../../components/ExploreFilters';
import { publishedDestinations } from '../../lib/destinations';

export default function ExplorePage() {
  return (
    <main className="container">
      <p className="eyebrow">Search and filter</p>
      <h1>Explore New Smyrna Beach</h1>
      <p className="lead">Find beaches, parks, restaurants, photo spots, nature stops, and family-friendly places with local photos ready for this launch.</p>
      <ExploreFilters destinations={publishedDestinations} />
    </main>
  );
}
