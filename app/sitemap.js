import { publishedDestinations } from '../lib/destinations';
import { siteUrl } from '../lib/seo';

const staticRoutes = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/explore', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/destinations', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/map', changeFrequency: 'weekly', priority: 0.8 },
];

function absoluteUrl(path) {
  return new URL(path, siteUrl).toString();
}

export default function sitemap() {
  const destinationRoutes = publishedDestinations.map((destination) => ({
    path: `/destination/${destination.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...destinationRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
