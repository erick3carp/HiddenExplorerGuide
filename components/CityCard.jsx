import Link from 'next/link';
import DestinationImage from './DestinationImage';
import { getPublishedDestinationCount } from '../lib/cities';

export default function CityCard({ city }) {
  const publishedDestinationCount = getPublishedDestinationCount(city);

  return (
    <article className="card">
      <div className="card-media" style={{ position: 'relative' }}>
        <DestinationImage
          src={city.heroImage}
          alt={`${city.name}, ${city.state}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="card-body">
        <div className="card-title">
          <h3>{city.name}</h3>
          <span className="badge">Live</span>
        </div>
        <p>{city.description}</p>
        <div className="meta">
          <span>{city.state}</span>
          <span>{publishedDestinationCount} published destinations</span>
          <span>Slug: {city.slug}</span>
        </div>
        <Link className="button" href={`/cities/${city.slug}`} aria-label={`Explore ${city.name}`}>
          Explore City
        </Link>
      </div>
    </article>
  );
}
