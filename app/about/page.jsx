import Image from 'next/image';
import { createPageMetadata } from '../../lib/seo';

export const metadata = createPageMetadata({
  title: 'About',
  description:
    'Learn how Hidden Explorer Guide helps travelers discover photo-ready places, quiet corners, and local stories around New Smyrna Beach.',
  path: '/about',
});

export default function AboutPage() {
  const values = [
    {
      icon: '01',
      title: 'Local Finds',
      text: 'Places chosen for character, atmosphere, and real reasons to visit.',
    },
    {
      icon: '02',
      title: 'Photo First',
      text: 'Every public guide entry is shaped around useful visuals and on-location details.',
    },
    {
      icon: '03',
      title: 'Quiet Corners',
      text: 'A focus on parks, streets, food spots, and overlooked stops beyond the obvious.',
    },
    {
      icon: '04',
      title: 'Simple Planning',
      text: 'Fast profiles, map links, and practical notes help turn curiosity into a stop.',
    },
    {
      icon: '05',
      title: 'Honest Context',
      text: 'Each place is described with clear expectations, timing, parking, and photo tips.',
    },
    {
      icon: '06',
      title: 'Growing Guide',
      text: 'New destinations stay behind the scenes until the photos and details are ready.',
    },
  ];

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
        <h2>Make local exploring easier, richer, and more visual.</h2>
        <p className="lead">
          Hidden Explorer Guide helps people discover photo-ready places around New Smyrna Beach with practical details,
          honest descriptions, and a map-first way to plan. The goal is to highlight the parks, streets, food stops,
          historic corners, and quiet views that make a trip feel personal.
        </p>
      </section>

      <section className="container about-section">
        <div className="about-card-grid">
          {values.map((value) => (
            <article className="about-icon-card" key={value.title}>
              <span className="about-card-icon">{value.icon}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
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
