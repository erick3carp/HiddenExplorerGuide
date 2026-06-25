import Link from 'next/link';
import CategoryBadge from './CategoryBadge';
import DestinationImage from './DestinationImage';

export default function DestinationCard({ destination }) {
  return (
    <Link href={`/destination/${destination.slug}`} className="card">
      <div className="card-media" style={{ position: 'relative' }}>
        <DestinationImage
          src={destination.featuredImage}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="card-body">
        <div className="card-title">
          <h3>{destination.name}</h3>
          <CategoryBadge category={destination.category} />
        </div>
        <p>{destination.description}</p>
        <div className="meta">
          <span>{destination.city}, {destination.state}</span>
          <span>{destination.duration}</span>
          <span>{destination.bestTime}</span>
        </div>
      </div>
    </Link>
  );
}
