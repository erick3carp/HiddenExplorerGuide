import { notFound } from 'next/navigation';
import CategoryBadge from '../../../components/CategoryBadge';
import { destinations, getDestination } from '../../../lib/destinations';

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export function generateMetadata({ params }) {
  const destination = getDestination(params.slug);
  if (!destination) return {};
  return {
    title: `${destination.name} | Hidden Explorer Guide`,
    description: destination.description,
  };
}

export default function DestinationPage({ params }) {
  const destination = getDestination(params.slug);
  if (!destination) notFound();

  const gallery = destination.gallery?.length ? destination.gallery : [destination.featuredImage];
  const mapQuery = destination.address ?? `${destination.latitude},${destination.longitude}`;
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}`;

  return (
    <main>
      <section className="profile-hero">
        <img className="hero-img" src={destination.featuredImage} alt={destination.name} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <CategoryBadge category={destination.category} />
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>
        </div>
      </section>

      <section className="container details">
        <div>
          <div className="info-grid">
            <div>
              <h3>Location</h3>
              <p>{destination.city}, {destination.state}</p>
            </div>
            <div>
              <h3>Best time</h3>
              <p>{destination.bestTime}</p>
            </div>
            <div>
              <h3>Parking</h3>
              <p>{destination.parking}</p>
            </div>
            <div>
              <h3>Photo tip</h3>
              <p>{destination.photoTip}</p>
            </div>
          </div>

          <h2>Photo gallery</h2>
          <div className="gallery">
            {gallery.map((image) => (
              <img src={image} alt={`${destination.name} photo`} key={image} />
            ))}
          </div>
        </div>

        <aside className="side-panel">
          <h2>Plan this stop</h2>
          <p>Duration: {destination.duration}</p>
          <p>
            <a className="button" href={googleMapsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </p>
        </aside>
      </section>
    </main>
  );
}
