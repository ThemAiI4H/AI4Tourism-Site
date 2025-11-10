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
      <section className="section py-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Esplora l'Italia in 3D
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Ruota il cubo interattivo per scoprire le meraviglie d'Italia.
            </p>
          </div>

          <div className="flex justify-center items-center min-h-[500px]">
            <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <ItalyCube />
            </div>
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
