'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const destinations = [
  {
    id: 1,
    name: 'Roma',
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=400&h=300&fit=crop',
    description: 'La Città Eterna',
    delay: 0,
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 2,
    name: 'Venezia',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=400&h=300&fit=crop',
    description: 'La Regina dell\'Adriatico',
    delay: 500,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    name: 'Firenze',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    description: 'Il Cuore del Rinascimento',
    delay: 1000,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 4,
    name: 'Milano',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    description: 'La Capitale della Moda',
    delay: 1500,
    color: 'from-gray-500 to-slate-500'
  },
  {
    id: 5,
    name: 'Napoli',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
    description: 'Il Gusto della Tradizione',
    delay: 2000,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 6,
    name: 'Amalfi',
    image: 'https://images.unsplash.com/photo-1602347174589-4e4f96346b4c?w=400&h=300&fit=crop',
    description: 'La Costa dei sogni',
    delay: 2500,
    color: 'from-purple-500 to-violet-500'
  }
];

export default function TimedCard() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Animate cards appearing with timing
    destinations.forEach((dest, index) => {
      setTimeout(() => {
        setVisibleCards(prev => new Set([...prev, dest.id]));

        // GSAP animation for each card
        gsap.fromTo(
          `.card-${dest.id}`,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            rotationY: -15
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
          }
        );
      }, dest.delay);
    });

    // Add continuous subtle animations
    const interval = setInterval(() => {
      gsap.to('.card-container', {
        y: '+=1',
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Scopri l'Italia
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Un viaggio attraverso le meraviglie d'Italia, una destinazione alla volta
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className={`card-container card-${dest.id} relative group cursor-pointer transform transition-all duration-500 ${
                visibleCards.has(dest.id) ? 'opacity-100' : 'opacity-0'
              } ${hoveredCard === dest.id ? 'scale-105 z-10' : 'hover:scale-102'}`}
              onMouseEnter={() => setHoveredCard(dest.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${dest.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                  {/* Overlay with timing indicator */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
                    #{dest.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                    {dest.name}
                  </h3>
                  <p className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-500">
                    {dest.description}
                  </p>

                  {/* Animated progress bar */}
                  <div className="w-full bg-white/20 rounded-full h-1 mb-4">
                    <div
                      className={`h-1 bg-gradient-to-r ${dest.color} rounded-full transition-all duration-1000`}
                      style={{
                        width: hoveredCard === dest.id ? '100%' : '30%',
                        animation: hoveredCard === dest.id ? 'pulse 2s infinite' : 'none'
                      }}
                    ></div>
                  </div>

                  {/* Action button */}
                  <button className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 border border-white/20 hover:border-white/40">
                    Esplora →
                  </button>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${dest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              </div>

              {/* Floating particles effect */}
              {hoveredCard === dest.id && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto per il tuo viaggio?
            </h3>
            <p className="text-gray-300 mb-6">
              Scopri di più su queste fantastiche destinazioni
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Inizia il viaggio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
