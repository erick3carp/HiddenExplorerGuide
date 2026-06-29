import { notFound } from 'next/navigation';
import CategoryBadge from '../../../components/CategoryBadge';
import DestinationImage from '../../../components/DestinationImage';
import { destinations, getDestination } from '../../../lib/destinations';
import { defaultOgImage, siteName, siteUrl } from '../../../lib/seo';

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export function generateMetadata({ params }) {
  const destination = getDestination(params.slug);
  if (!destination) {
    return {
      title: 'Destination Not Found',
      description: 'The requested Hidden Explorer Guide destination could not be found.',
      alternates: {
        canonical: `/destination/${params.slug}`,
      },
    };
  }

  const title = `${destination.name} | ${siteName}`;
  const path = `/destination/${destination.slug}`;
  const image = destination.featuredImage
    ? {
        url: destination.featuredImage,
        width: 2400,
        height: 1800,
        alt: destination.name,
      }
    : defaultOgImage;

  return {
    title,
    description: destination.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description: destination.description,
      url: path,
      siteName,
      images: [image],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: destination.description,
      images: [image.url],
    },
  };
}

function absoluteUrl(path) {
  return new URL(path, siteUrl).toString();
}

function buildDestinationJsonLd(destination) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: destination.name,
    description: destination.description,
    url: absoluteUrl(`/destination/${destination.slug}`),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
  };

  if (destination.featuredImage) {
    jsonLd.image = absoluteUrl(destination.featuredImage);
  }

  if (destination.address || destination.city || destination.state) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      ...(destination.address ? { streetAddress: destination.address } : {}),
      ...(destination.city ? { addressLocality: destination.city } : {}),
      ...(destination.state ? { addressRegion: destination.state } : {}),
    };
  }

  if (destination.latitude && destination.longitude) {
    jsonLd.geo = {
      '@type': 'GeoCoordinates',
      latitude: destination.latitude,
      longitude: destination.longitude,
    };
  }

  if (destination.category) {
    jsonLd.touristType = destination.category;
  }

  return jsonLd;
}

export default function DestinationPage({ params }) {
  const destination = getDestination(params.slug);
  if (!destination) notFound();

  const gallery = destination.gallery?.length ? destination.gallery : [destination.featuredImage];
  const jsonLd = buildDestinationJsonLd(destination);
  const mapQuery = destination.address ?? `${destination.latitude},${destination.longitude}`;
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}`;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="profile-hero">
        <DestinationImage
          className="hero-img"
          src={destination.featuredImage}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
        />
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
            {gallery.map((image, index) => (
              <div className="gallery-image-frame" key={`${image || 'missing'}-${index}`}>
                <DestinationImage
                  className="gallery-image"
                  src={image}
                  alt={`${destination.name} photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
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
