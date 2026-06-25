import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Hidden Explorer Guide',
};

export default function NotFound() {
  return (
    <main className="container">
      <section className="side-panel" style={{ margin: '32px auto', maxWidth: 720 }}>
        <p className="eyebrow">404</p>
        <h1>We could not find that place.</h1>
        <p className="lead">
          The page or destination may have moved, changed, or is not part of the guide yet.
        </p>
        <div className="actions">
          <Link className="button" href="/">
            Back to Home
          </Link>
          <Link className="button" href="/explore" style={{ background: 'var(--ink)', color: '#fff' }}>
            Explore destinations
          </Link>
        </div>
      </section>
    </main>
  );
}
