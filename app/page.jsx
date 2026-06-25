import Link from 'next/link';
import Image from 'next/image';
import DestinationCard from '../components/DestinationCard';
import { publishedDestinations } from '../lib/destinations';

export default function HomePage() {
  const featured = publishedDestinations.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <Image
          className="hero-img"
          src="/photos/grayce-kenemer-barck-north-brach/hero-beach.jpg"
          alt="New Smyrna Beach shoreline"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div>
            <p className="eyebrow">New Smyrna Beach MVP</p>
            <h1>Hidden Explorer Guide</h1>
            <p>Authentic destinations, local photography, field notes, and map planning for travelers who want more than the obvious stops.</p>
            <div className="actions">
              <Link className="button" href="/explore">Explore locations</Link>
              <Link className="button secondary" href="/map">View map</Link>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><strong>{publishedDestinations.length}</strong><span>curated locations</span></div>
            <div className="stat"><strong>{publishedDestinations.length * 5}</strong><span>photo slots planned</span></div>
            <div className="stat"><strong>6</strong><span>travel categories</span></div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Start here</p>
            <h2>Featured field notes</h2>
          </div>
          <Link href="/destinations">View all destinations</Link>
        </div>
        <div className="grid">
          {featured.map((destination) => (
            <DestinationCard destination={destination} key={destination.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
