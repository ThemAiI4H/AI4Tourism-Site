'use client';

import { useState, useEffect } from 'react';
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
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDragging) {
      // Auto rotation when not dragging
      const interval = setInterval(() => {
        setRotation(prev => ({
          x: prev.x + 0.5,
          y: prev.y + 0.3
        }));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate which face is visible based on rotation
  const getVisibleFace = () => {
    const x = (rotation.x % 360 + 360) % 360;
    const y = (rotation.y % 360 + 360) % 360;

    // Simplified face detection
    if (x > 315 || x <= 45) return 0; // Front
    if (x > 45 && x <= 135) return 1; // Right
    if (x > 135 && x <= 225) return 2; // Back
    if (x > 225 && x <= 315) return 3; // Left
    return 4; // Top/Bottom
  };

  useEffect(() => {
    const visibleFace = getVisibleFace();
    if (visibleFace >= 0 && visibleFace < destinations.length) {
      setSelectedDestination(destinations[visibleFace]);
    }
  }, [rotation]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* CSS 3D Cube */}
      <div className="relative" style={{ perspective: '1000px' }}>
        <div
          className={`relative cursor-grab select-none ${isDragging ? 'cursor-grabbing' : ''}`}
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            width: '200px',
            height: '200px',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Front face */}
          <div
            className="absolute w-full h-full border-2 border-white/20 rounded-lg overflow-hidden"
            style={{
              transform: 'translateZ(100px)',
              backgroundImage: `url(${destinations[0].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{destinations[0].name}</span>
            </div>
          </div>

          {/* Back face */}
          <div
            className="absolute w-full h-full border-2 border-white/20 rounded-lg overflow-hidden"
            style={{
              transform: 'translateZ(-100px) rotateY(180deg)',
              backgroundImage: `url(${destinations[1].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{destinations[1].name}</span>
            </div>
          </div>

          {/* Right face */}
          <div
            className="absolute w-full h-full border-2 border-white/20 rounded-lg overflow-hidden"
            style={{
              transform: 'rotateY(90deg) translateZ(100px)',
              backgroundImage: `url(${destinations[2].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{destinations[2].name}</span>
            </div>
          </div>

          {/* Left face */}
          <div
            className="absolute w-full h-full border-2 border-white/20 rounded-lg overflow-hidden"
            style={{
              transform: 'rotateY(-90deg) translateZ(100px)',
              backgroundImage: `url(${destinations[3].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{destinations[3].name}</span>
            </div>
          </div>

          {/* Top face */}
          <div
            className="absolute w-full h-full border-2 border-white/20 rounded-lg overflow-hidden"
            style={{
              transform: 'rotateX(90deg) translateZ(100px)',
              backgroundImage: `url(${destinations[4].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{destinations[4].name}</span>
            </div>
          </div>

          {/* Bottom face */}
          <div
            className="absolute w-full h-full border-2 border-white/20 rounded-lg overflow-hidden"
            style={{
              transform: 'rotateX(-90deg) translateZ(100px)',
              backgroundImage: `url(${destinations[5].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{destinations[5].name}</span>
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl animate-pulse pointer-events-none"></div>
      </div>

      {/* Selected Destination Info */}
      {selectedDestination && (
        <div className="text-center animate-fade-in bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm border border-white/20">
          <h3 className="text-3xl font-bold text-white mb-2">{selectedDestination.name}</h3>
          <p className="text-gray-300 text-lg">
            {selectedDestination.description}
          </p>
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Esplora {selectedDestination.name}
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-gray-400 text-sm max-w-md space-y-2">
        <p className="font-semibold">🎮 Come interagire con il cubo:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <p>🖱️ <strong>Trascina</strong> per ruotare</p>
          <p>📱 <strong>Tocca</strong> per dispositivi mobili</p>
          <p>⚡ <strong>Rotazione automatica</strong></p>
          <p>🎯 <strong>6 destinazioni</strong> uniche</p>
        </div>
      </div>
    </div>
  );
}
