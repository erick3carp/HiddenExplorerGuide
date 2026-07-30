'use client';

import { useMemo, useState } from 'react';
import DestinationCard from './DestinationCard';

const categories = ['Beach', 'Park', 'Restaurant', 'Photo Spot', 'Family Activity', 'Nature'];

export default function ExploreFilters({ destinations }) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('All Cities');
  const [category, setCategory] = useState('All');

  const cityOptions = useMemo(() => {
    return Array.from(new Set(destinations.map((destination) => destination.city))).sort();
  }, [destinations]);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return destinations.filter((destination) => {
      const cityMatch = city === 'All Cities' || destination.city === city;
      const categoryMatch = category === 'All' || destination.category === category;
      const textMatch = !text || [destination.name, destination.description, destination.city].join(' ').toLowerCase().includes(text);
      return cityMatch && categoryMatch && textMatch;
    });
  }, [category, city, destinations, query]);

  const resultLabel = `${filtered.length} ${filtered.length === 1 ? 'location' : 'locations'} found`;

  return (
    <section>
      <div className="filter-panel">
        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search beaches, parks, restaurants, photo spots..."
        />
        <div className="chips" aria-label="City filters">
          {['All Cities', ...cityOptions].map((item) => (
            <button
              className={`chip ${city === item ? 'active' : ''}`}
              key={item}
              type="button"
              onClick={() => setCity(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="chips" aria-label="Category filters">
          {['All', ...categories].map((item) => (
            <button
              className={`chip ${category === item ? 'active' : ''}`}
              key={item}
              type="button"
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="result-row">
        <span>{resultLabel}</span>
        <span>{city === 'All Cities' ? 'All cities' : city}</span>
      </div>
      {filtered.length === 0 ? (
        <div className="side-panel" role="status">
          <h2>No places found</h2>
          <p>Try changing your search, city, or category filters.</p>
          <button
            className="button"
            type="button"
            onClick={() => {
              setQuery('');
              setCity('All Cities');
              setCategory('All');
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((destination) => (
            <DestinationCard destination={destination} key={destination.id} />
          ))}
        </div>
      )}
    </section>
  );
}
