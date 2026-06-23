'use client';

import { useState } from 'react';

const testErrorMessage = 'HiddenExplorerGuide Sentry preview test - Week 1';

export default function SentryTestPage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error(testErrorMessage);
  }

  return (
    <main className="container">
      <h1>Sentry preview test</h1>
      <p className="lead">
        Trigger one controlled error to verify the Preview environment.
      </p>
      <button className="button" type="button" onClick={() => setShouldThrow(true)}>
        Trigger test error
      </button>
    </main>
  );
}
