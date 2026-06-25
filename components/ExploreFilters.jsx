'use client';

import { useMemo, useState } from 'react';
import DestinationCard from './DestinationCard';

const categories = ['Beach', 'Park', 'Restaurant', 'Photo Spot', 'Family Activity', 'Nature'];

export default function ExploreFilters({ destinations }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return destinations.filter((destination) => {
      const categoryMatch = category === 'All' || destination.category === category;
      const textMatch = !text || [destination.name, destination.description, destination.city].join(' ').toLowerCase().includes(text);
      return categoryMatch && textMatch;
    });
  }, [category, destinations, query]);

  return (
    <section>
      <div className="filter-panel">
        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search beaches, parks, restaurants, photo spots..."
        />
        <div className="chips">
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
        <span>{filtered.length} locations found</span>
        <span>New Smyrna Beach only</span>
      </div>
      {filtered.length === 0 ? (
        <div className="side-panel" role="status">
          <h2>No destinations found</h2>
          <p>Try a different search or clear the current filters to see every destination.</p>
          <button
            className="button"
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
          >
            Clear filters
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
