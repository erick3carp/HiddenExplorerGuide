import * as Sentry from '@sentry/nextjs';

export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  Sentry.init({
    dsn,
    enabled: Boolean(dsn),
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
    sendDefaultPii: false,
    tracesSampleRate: 0.1,
  });
}

export const onRequestError = Sentry.captureRequestError;
