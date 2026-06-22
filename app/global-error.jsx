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
          <button onClick={reset} type="button">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
