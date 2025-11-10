'use client';

import { useState } from 'react';
import Image from 'next/image';

const destinations = [
  {
    name: 'Roma',
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=300&h=300&fit=crop',
    description: 'Capitale eterna'
  },
  {
    name: 'Venezia',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=300&h=300&fit=crop',
    description: 'Città dei canali'
  },
  {
    name: 'Firenze',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
    description: 'Culla del Rinascimento'
  },
  {
    name: 'Milano',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    description: 'Capitale della moda'
  },
  {
    name: 'Napoli',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop',
    description: 'Città partenopea'
  },
  {
    name: 'Amalfi',
    image: 'https://images.unsplash.com/photo-1602347174589-4e4f96346b4c?w=300&h=300&fit=crop',
    description: 'Costa divina'
  }
];

export default function ItalyCube() {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Interactive Cube Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-md">
        {destinations.map((dest, index) => (
          <div
            key={dest.name}
            className={`relative cursor-pointer transform transition-all duration-300 hover:scale-110 ${
              selectedDestination?.name === dest.name ? 'scale-110 ring-4 ring-blue-400' : ''
            }`}
            onClick={() => setSelectedDestination(dest)}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={dest.image}
                alt={dest.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Destination Info */}
      {selectedDestination && (
        <div className="text-center animate-fade-in bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
          <h3 className="text-2xl font-bold text-white mb-2">{selectedDestination.name}</h3>
          <p className="text-gray-300 text-lg">
            {selectedDestination.description}
          </p>
          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            Scopri di più
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-gray-400 text-sm max-w-xs">
        <p>Clicca sui cubetti per esplorare le destinazioni italiane</p>
      </div>
    </div>
  );
}
