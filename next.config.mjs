import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  reactStrictMode: true,
};

export default withSentryConfig(
  nextConfig,
  {
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: !process.env.SENTRY_AUTH_TOKEN,
  },
  {
    disableLogger: true,
    widenClientFileUpload: true,
  },
);
