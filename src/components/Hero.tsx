'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero elements on load
      const tl = gsap.timeline();

      tl.from('.hero-bg', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
      })
      .from('.hero-overlay', {
        opacity: 0,
        duration: 1,
      }, '-=1')
      .from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      .from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="hero-bg absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop"
          alt="Beautiful Italian landscape with rolling hills and vineyards"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Italy
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Explore the breathtaking landscapes, rich history, and vibrant culture of the beautiful Italian regions
        </p>
        <button
          className="hero-cta bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
          onClick={() => {
            const mapSection = document.getElementById('map');
            if (mapSection) {
              mapSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Start Your Journey
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>


    </section>
  );
}
