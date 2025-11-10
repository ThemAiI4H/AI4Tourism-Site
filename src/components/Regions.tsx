'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const regions = [
  {
    name: 'Toscana',
    description: 'Rolling hills, Renaissance art, and world-class wine in the heart of Italy.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    highlights: ['Florence', 'Pisa', 'Siena', 'Chianti']
  },
  {
    name: 'Veneto',
    description: 'Romantic canals, historic palaces, and stunning Venetian art and architecture.',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&h=600&fit=crop',
    highlights: ['Venice', 'Verona', 'Padua', 'Treviso']
  },
  {
    name: 'Lazio',
    description: 'Ancient Rome, Vatican City, and the beautiful Tyrrhenian coast.',
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&h=600&fit=crop',
    highlights: ['Rome', 'Vatican', 'Tivoli', 'Ostia']
  },
  {
    name: 'Campania',
    description: 'Vesuvius, Pompeii, and the stunning Amalfi Coast with its colorful villages.',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
    highlights: ['Naples', 'Amalfi', 'Pompeii', 'Capri']
  }
];

export default function Regions() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate region cards on scroll
      gsap.utils.toArray('.region-card').forEach((card: any, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="regions"
      ref={sectionRef}
      className="section py-20 px-4 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Italian Regions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the diverse beauty of Italy's regions, each offering unique experiences,
            from ancient history to modern culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regions.map((region, index) => (
            <div
              key={region.name}
              className="region-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={region.image}
                  alt={region.name}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {region.name}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {region.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {region.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                  Explore {region.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
