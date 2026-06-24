'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main style={{ fontFamily: 'Arial, sans-serif', margin: '64px auto', maxWidth: 720, padding: 20 }}>
          <h1>Hidden Explorer Guide is temporarily unavailable.</h1>
          <p>The error has been recorded. Please try again.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <button
              onClick={reset}
              type="button"
              style={{ minHeight: 44, border: 0, borderRadius: 5, padding: '0 18px', background: '#f6c453', color: '#10202a', fontWeight: 800, cursor: 'pointer' }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, borderRadius: 5, padding: '0 18px', background: '#10202a', color: '#fff', fontWeight: 800, textDecoration: 'none' }}
            >
              Back to Home
            </a>
            <a
              href="/explore"
              style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, border: '1px solid rgba(16, 32, 42, 0.2)', borderRadius: 5, padding: '0 18px', color: '#10202a', fontWeight: 800, textDecoration: 'none' }}
            >
              Explore destinations
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
