import { publishedDestinations } from './destinations';

export const cities = [
  {
    id: 1,
    name: 'New Smyrna Beach',
    slug: 'new-smyrna-beach',
    state: 'Florida',
    description: 'A coastal city known for beaches, local history, parks, and scenic places to explore.',
    heroImage: '/photos/grayce-kenemer-barck-north-beach/hero-beach.jpg',
    published: true,
  },
  {
    id: 2,
    name: 'Port Orange',
    slug: 'port-orange',
    state: 'Florida',
    description: '',
    heroImage: '',
    published: false,
  },
  {
    id: 3,
    name: 'Ormond Beach',
    slug: 'ormond-beach',
    state: 'Florida',
    description: '',
    heroImage: '',
    published: false,
  },
];

export const publishedCities = cities.filter((city) => city.published);

export function getCity(slug) {
  return cities.find((city) => city.slug === slug);
}

export function getPublishedDestinationsForCity(city) {
  return publishedDestinations.filter((destination) => destination.city === city.name);
}

export function getPublishedDestinationCount(city) {
  return getPublishedDestinationsForCity(city).length;
}
