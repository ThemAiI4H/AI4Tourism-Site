'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ItalyCube from '@/components/ItalyCube';
import ThingsToDo from '@/components/ThingsToDo';
import Festivals from '@/components/Festivals';
import Regions from '@/components/Regions';
import MapSection from '@/components/MapSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
      });

      // Scroll-triggered animations for sections
      gsap.utils.toArray('.section').forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <Header />
      <Hero />

      {/* 3D Cube Section */}
      <section className="section py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Esplora l'Italia in 3D
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ruota il cubo interattivo per scoprire le meraviglie d'Italia.
              Ogni faccia nasconde una destinazione unica.
            </p>
          </div>

          <div className="flex justify-center">
            <ItalyCube />
          </div>
        </div>
      </section>

      <ThingsToDo />
      <Festivals />
      <Regions />
      <MapSection />
    </div>
  );
}
