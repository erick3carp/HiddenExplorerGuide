'use client';

import { useMemo, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { categories } from '../lib/destinations';

const center = [29.027, -80.914];
const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;
const baseTileLayer = mapTilerKey
  ? {
      attribution:
        '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      url: `https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.png?key=${mapTilerKey}`,
    }
  : {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    };

function markerIcon(category) {
  return L.divIcon({
    className: 'pin-shell',
    html: `<span class="pin-dot ${category.replace(/\s+/g, '-')}"></span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -12],
  });
}

export default function DestinationMap({ destinations }) {
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return destinations.filter((destination) => category === 'All' || destination.category === category);
  }, [category, destinations]);

  return (
    <section className="map-experience" aria-label="Destination map">
      <div className="map-toolbar">
        <div className="chips" aria-label="Map category filters">
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
        <span>{filtered.length} pins shown</span>
      </div>

      <div className="map-shell">
        <MapContainer center={center} zoom={12} scrollWheelZoom={false} className="leaflet-map">
          <TileLayer
            attribution={baseTileLayer.attribution}
            url={baseTileLayer.url}
          />
          {filtered.map((destination) => (
            <Marker
              icon={markerIcon(destination.category)}
              key={destination.id}
              position={[destination.latitude, destination.longitude]}
            >
              <Popup>
                <div className="map-popup">
                  <strong>{destination.name}</strong>
                  <span>{destination.category}</span>
                  <p>{destination.description}</p>
                  <a href={`/destination/${destination.slug}`}>View profile</a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
