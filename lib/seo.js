export const siteName = 'Hidden Explorer Guide';

export const defaultDescription =
  'Authentic New Smyrna Beach destinations through local photography and field-tested guides.';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://hiddenexplorerguide.com';

export const metadataBase = new URL(siteUrl);

export const defaultOgImage = {
  url: '/photos/grayce-kenemer-barck-north-brach/hero-beach.jpg',
  width: 2400,
  height: 1800,
  alt: 'New Smyrna Beach shoreline',
};

export function canonicalPath(path = '/') {
  return path;
}

export function createPageMetadata({ title, description = defaultDescription, path = '/' }) {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath(path),
    },
    openGraph: {
      title,
      description,
      url: canonicalPath(path),
      siteName,
      images: [defaultOgImage],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}
