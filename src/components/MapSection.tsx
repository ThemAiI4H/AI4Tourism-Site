'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

gsap.registerPlugin(ScrollTrigger);

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const locations = [
  {
    id: 1,
    name: 'Roma',
    lat: 41.9028,
    lng: 12.4964,
    region: 'Lazio',
    description: 'La Città Eterna, cuore pulsante dell\'Italia antica e moderna.',
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=300&h=200&fit=crop',
    attractions: ['Colosseo', 'Vaticano', 'Fontana di Trevi']
  },
  {
    id: 2,
    name: 'Firenze',
    lat: 43.7696,
    lng: 11.2558,
    region: 'Toscana',
    description: 'Culla del Rinascimento italiano e patria di Dante.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
    attractions: ['Duomo', 'Uffizi', 'Ponte Vecchio']
  },
  {
    id: 3,
    name: 'Venezia',
    lat: 45.4408,
    lng: 12.3155,
    region: 'Veneto',
    description: 'La Regina dell\'Adriatico, città unica costruita sull\'acqua.',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=300&h=200&fit=crop',
    attractions: ['Piazza San Marco', 'Canale Grande', 'Palazzo Ducale']
  },
  {
    id: 4,
    name: 'Napoli',
    lat: 40.8518,
    lng: 14.2681,
    region: 'Campania',
    description: 'Il calore del Mediterraneo e la pizza più famosa del mondo.',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
    attractions: ['Centro Storico', 'Vesuvio', 'Costiera Amalfitana']
  },
  {
    id: 5,
    name: 'Milano',
    lat: 45.4642,
    lng: 9.1900,
    region: 'Lombardia',
    description: 'Capitale della moda italiana e centro finanziario.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
    attractions: ['Duomo', 'Galleria Vittorio Emanuele', 'Castello Sforzesco']
  },
  {
    id: 6,
    name: 'Pisa',
    lat: 43.7228,
    lng: 10.4017,
    region: 'Toscana',
    description: 'Famosa in tutto il mondo per la sua Torre Pendente.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
    attractions: ['Torre di Pisa', 'Duomo', 'Battistero']
  }
];

// Component to handle map center changes
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

export default function MapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([42.5, 12.5]);
  const [mapZoom, setMapZoom] = useState(6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.map-container', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        scrollTrigger: {
          trigger: '.map-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMarkerClick = (location: typeof locations[0]) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    setMapZoom(12);
  };

  const handleLocationButtonClick = (location: typeof locations[0]) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    setMapZoom(12);
  };

  const resetView = () => {
    setMapCenter([42.5, 12.5]);
    setMapZoom(6);
    setSelectedLocation(null);
  };

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="#EF4444" stroke="white" stroke-width="3"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
        <circle cx="16" cy="16" r="16" fill="#EF4444" fill-opacity="0.2">
          <animate attributeName="r" values="16;20;16" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="fill-opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <section
      id="map"
      ref={sectionRef}
      className="section py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Esplora l'Italia Interattiva
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri le meraviglie dell'Italia con una mappa interattiva completa.
            Clicca sui marker rossi per esplorare destinazioni, vedere foto e pianificare il tuo viaggio.
          </p>
        </div>

        <div className="map-container h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl relative">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController center={mapCenter} zoom={mapZoom} />

            {/* City Markers */}
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(location),
                }}
              >
                <Popup>
                  <div className="p-4 max-w-sm">
                    <div className="flex items-start space-x-3">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {location.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {location.region}
                        </p>
                        <p className="text-sm text-gray-700 mb-3">
                          {location.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {location.attractions.slice(0, 2).map((attraction) => (
                            <span
                              key={attraction}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {attraction}
                            </span>
                          ))}
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm">
                          Scopri di Più
                        </button>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Custom overlay controls */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
            <button
              onClick={resetView}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              Vista Italia
            </button>
          </div>

          {/* Quick location buttons */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-[1000]">
            <div className="flex flex-wrap justify-center gap-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationButtonClick(location)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedLocation?.id === location.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>

          {/* Selected location info overlay */}
          {selectedLocation && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs shadow-lg z-[1000]">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{selectedLocation.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{selectedLocation.region}</p>
              <p className="text-sm text-gray-700 mb-3">{selectedLocation.description}</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm">
                Scopri di Più
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Mappa interattiva con zoom, navigazione e informazioni dettagliate
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <div>🗺️ Zoom e pan per esplorare</div>
            <div>📍 Marker cliccabili con popup informativi</div>
            <div>🧭 Controlli di navigazione integrati</div>
          </div>
        </div>
      </div>
    </section>
  );
}
