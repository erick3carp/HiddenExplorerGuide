import ExploreFilters from '../../components/ExploreFilters';
import { publishedDestinations } from '../../lib/destinations';
import { createPageMetadata } from '../../lib/seo';

export const metadata = createPageMetadata({
  title: 'Explore New Smyrna Beach',
  description:
    'Search and filter New Smyrna Beach beaches, parks, restaurants, photo spots, nature stops, and family-friendly places.',
  path: '/explore',
});

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
