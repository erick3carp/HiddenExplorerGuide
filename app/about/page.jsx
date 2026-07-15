import Image from 'next/image';
import { createPageMetadata } from '../../lib/seo';

export const metadata = createPageMetadata({
  title: 'About',
  description:
    'Learn how Hidden Explorer Guide helps travelers discover photo-ready places, quiet corners, and local stories around New Smyrna Beach.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main>
      <section className="about-hero">
        <Image
          className="hero-img about-hero-img"
          src="/photos/canal-st-historic/hero-canal-st.jpg"
          alt="Historic street in New Smyrna Beach"
          width={2400}
          height={1800}
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="about-hero-content">
          <p className="eyebrow">About Hidden Explorer Guide</p>
          <h1>Discover Places Beyond the Guidebooks</h1>
        </div>
      </section>

      <section className="container about-section">
        <p className="eyebrow">Mission</p>
        <h2>Discover more. Explore local.</h2>
        <p className="lead">
          Hidden Explorer Guide exists to help people discover and explore the places that make every community unique.
           Our mission is to be a trusted guide for local exploration by providing practical information, 
           honest recommendations, beautiful photography, and local insights that help visitors and residents
            confidently explore parks, beaches, trails, historic sites, downtown districts, scenic viewpoints,
             and hidden gems—one destination at a time.
        </p>
      </section>

      <section className="container about-story">
        <div>
          <p className="eyebrow">Our Story</p>
          <h2>Built from real walks, saved places, and the urge to look twice.</h2>
          <p>
            Hidden Explorer Guide started as a way to organize the places worth remembering: a beach access with the
            right morning light, a historic street with texture, a park that rewards a slower pace, and restaurants that
            fit naturally into a day of exploring.
          </p>
          <p>
            Instead of listing every possible stop, the guide keeps the public collection focused on destinations that
            have photos, useful context, and enough detail to help someone decide whether it belongs in their day.
          </p>
        </div>
        <div className="about-story-image-frame">
          <Image
            className="about-story-image"
            src="/photos/plantation-sugar-mill-ruins/hero-ruins.JPG"
            alt="Sugar Mill Ruins surrounded by greenery"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
      </section>

      <section className="container about-section about-vision">
        <p className="eyebrow">Vision</p>
        <h2>A living guide for curious local travel.</h2>
        <p className="lead">
          The vision is to keep expanding Hidden Explorer Guide into a thoughtful travel companion: more destinations,
          better maps, stronger photo notes, and curated routes that help visitors and locals find the places that make
          the area feel alive.
        </p>
      </section>
    </main>
  );
}
