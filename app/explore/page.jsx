import ExploreFilters from '../../components/ExploreFilters';
import { publishedDestinations } from '../../lib/destinations';
import { createPageMetadata } from '../../lib/seo';

export const metadata = createPageMetadata({
  title: 'Explore Local Places',
  description:
    'Search and filter beaches, parks, historic sites, nature stops, photo spots, and family-friendly places across local communities.',
  path: '/explore',
});

export default function ExplorePage() {
  return (
    <main className="container">
      <p className="eyebrow">Search and filter</p>
      <h1>Explore Local Places</h1>
      <p className="lead">Discover beaches, parks, historic sites, nature stops, photo spots, and family-friendly places across local communities.</p>
      <ExploreFilters destinations={publishedDestinations} />
    </main>
  );
}
