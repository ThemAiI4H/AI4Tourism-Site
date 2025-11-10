'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const italianImages = [
  'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=600&h=400&fit=crop', // Colosseo
  'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&h=400&fit=crop', // Venezia
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop', // Toscana
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop', // Milano
  'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop', // Napoli
  'https://images.unsplash.com/photo-1602347174589-4e4f96346b4c?w=600&h=400&fit=crop', // Amalfi
  'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&h=400&fit=crop', // Italia landscape
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop', // Italia landscape 2
  'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=600&h=400&fit=crop', // Italia food
  'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=400&fit=crop', // Italia wine
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop', // Italia architecture
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop', // Italia nature
];

export default function Photo3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);

  const gridSize = 4; // 4x4 grid per face
  const directions = ['top', 'right', 'bottom', 'left'];

  useEffect(() => {
    if (!isExpanded) {
      // Progressive loading animation
      const interval = setInterval(() => {
        setLoadedImages(prev => {
          const newSet = new Set(prev);
          const unloadedIndices = Array.from({ length: gridSize * gridSize * directions.length }, (_, i) => i)
            .filter(i => !newSet.has(i));

          if (unloadedIndices.length > 0) {
            const randomIndex = unloadedIndices[Math.floor(Math.random() * unloadedIndices.length)];
            newSet.add(randomIndex);
          }

          return newSet;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isExpanded]);

  const handleImageClick = (imageIndex: number) => {
    if (isExpanded) {
      setSelectedImage(italianImages[imageIndex % italianImages.length]);
    }
  };

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleBackClick = () => {
    setIsExpanded(false);
    setSelectedImage(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % italianImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + italianImages.length) % italianImages.length);
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="absolute top-4 left-4 z-60 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
        >
          ← Torna alla Galleria
        </button>

        {selectedImage ? (
          /* Full Screen Image View */
          <div className="w-full h-full flex items-center justify-center relative">
            <Image
              src={selectedImage}
              alt="Immagine turistica italiana"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg">
              Clicca per tornare al carousel
            </div>
          </div>
        ) : (
          /* Horizontal Carousel */
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {italianImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-full relative cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={image}
                    alt={`Immagine turistica italiana ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index < 3}
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
                    {index + 1} / {italianImages.length}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              ›
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {italianImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="section py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Galleria Fotografica 3D
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scopri la bellezza dell'Italia attraverso una galleria fotografica immersiva.
            Ogni immagine racconta una storia unica del nostro paese.
          </p>
        </div>

        {/* 3D Cube Gallery */}
        <div
          ref={containerRef}
          className="relative h-[600px] mb-8"
          style={{ perspective: '1500px' }}
        >
          {directions.map((direction, faceIndex) => (
            <div
              key={direction}
              className={`absolute inset-0 grid gap-2 p-4 ${
                direction === 'top' ? 'transform -rotate-x-90 translate-z-300px' :
                direction === 'right' ? 'transform rotate-y-90 translate-z-300px' :
                direction === 'bottom' ? 'transform rotate-x-90 -translate-z-300px' :
                'transform -rotate-y-90 -translate-z-300px'
              }`}
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
              }}
            >
              {Array.from({ length: gridSize * gridSize }, (_, i) => {
                const globalIndex = faceIndex * gridSize * gridSize + i;
                const imageIndex = i % italianImages.length;
                const isLoaded = loadedImages.has(globalIndex);

                return (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${
                      isLoaded ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
                    } hover:scale-105 hover:z-10`}
                    onClick={() => handleImageClick(imageIndex)}
                  >
                    <Image
                      src={italianImages[imageIndex]}
                      alt={`Immagine turistica italiana ${imageIndex + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                      <span className="text-white text-sm font-medium">
                        Italia #{imageIndex + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Central Content */}
        <div className="text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Galleria Fotografica Italiana
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Immergiti nella bellezza dell'Italia attraverso questa galleria 3D interattiva
            </p>
            <button
              onClick={handleExpandClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Apri Galleria Completa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
