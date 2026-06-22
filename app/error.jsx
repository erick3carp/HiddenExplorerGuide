'use client';

import * as Sentry from '@sentry/nextjs';
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
      <button className="button" onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
