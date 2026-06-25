'use client';

import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="container">
      <p className="eyebrow">Something went wrong</p>
      <h1>We could not load this page.</h1>
      <p className="lead">The error has been recorded. Try the request again.</p>
      <div className="actions">
        <button className="button" onClick={reset} type="button">
          Try again
        </button>
        <Link className="button" href="/" style={{ background: 'var(--ink)', color: '#fff' }}>
          Back to Home
        </Link>
        <Link
          className="button"
          href="/explore"
          style={{ background: '#fff', color: 'var(--ink)', outline: '1px solid var(--line)' }}
        >
          Explore destinations
        </Link>
      </div>
    </main>
  );
}
