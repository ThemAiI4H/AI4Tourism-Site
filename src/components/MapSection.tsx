'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { id: 1, name: 'Rome', lat: 41.9028, lng: 12.4964, region: 'Lazio' },
  { id: 2, name: 'Florence', lat: 43.7696, lng: 11.2558, region: 'Toscana' },
  { id: 3, name: 'Venice', lat: 45.4408, lng: 12.3155, region: 'Veneto' },
  { id: 4, name: 'Naples', lat: 40.8518, lng: 14.2681, region: 'Campania' },
  { id: 5, name: 'Milan', lat: 45.4642, lng: 9.1900, region: 'Lombardia' },
  { id: 6, name: 'Pisa', lat: 43.7228, lng: 10.4017, region: 'Toscana' },
];

export default function MapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([41.9028, 12.4964]);
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

  const handleLocationClick = (location: typeof locations[0]) => {
    setMapCenter([location.lat, location.lng]);
    setMapZoom(10);
    setSelectedLocation(location);
  };

  return (
    <section
      id="map"
      ref={sectionRef}
      className="section py-20 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Italy on the Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the geographical beauty of Italy. Click on the markers to learn more about each destination.
          </p>
        </div>

        <div className="map-container h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center">
          <div className="text-center p-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Interactive Map</h3>
            <p className="text-gray-600 mb-6">
              Map integration would be displayed here. In a production environment,
              you would integrate with services like Mapbox or Google Maps.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto">
              {locations.slice(0, 6).map((location) => (
                <div
                  key={location.id}
                  className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedLocation(location)}
                >
                  <h4 className="font-semibold text-sm">{location.name}</h4>
                  <p className="text-xs text-gray-600">{location.region}</p>
                </div>
              ))}
            </div>
            {selectedLocation && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow-lg max-w-sm mx-auto">
                <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
                <p className="text-sm text-gray-600">{selectedLocation.region}</p>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Interactive map showing major Italian destinations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationClick(location)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-300"
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
