'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const festivals = [
  {
    title: 'Carnevale di Venezia',
    description: 'Il famoso carnevale veneziano con maschere elaborate e feste tradizionali.',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&h=400&fit=crop',
    date: 'Febbraio',
    location: 'Venezia',
    category: 'Carnevale'
  },
  {
    title: 'Palio di Siena',
    description: 'La corsa di cavalli più antica del mondo nel cuore della Toscana.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
    date: 'Agosto',
    location: 'Siena',
    category: 'Sportivo'
  },
  {
    title: 'Festival dei Due Mondi',
    description: 'Festival internazionale di musica, danza e teatro a Spoleto.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    date: 'Giugno-Luglio',
    location: 'Spoleto',
    category: 'Arte'
  },
  {
    title: 'Notte della Taranta',
    description: 'Festival di musica popolare salentina con concerti e balli tradizionali.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    date: 'Agosto',
    location: 'Salento',
    category: 'Musica'
  }
];

export default function Festivals() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.festival-card').forEach((card: any, index) => {
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
      id="festivals"
      ref={sectionRef}
      className="section py-20 px-4 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Festival ed Eventi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri i festival più spettacolari e gli eventi tradizionali che rendono
            l'Italia unica nel mondo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {festivals.map((festival, index) => (
            <div
              key={festival.title}
              className="festival-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64">
                <Image
                  src={festival.image}
                  alt={festival.title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    {festival.category}
                  </span>
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    {festival.date}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 text-gray-800 text-sm font-semibold rounded-full">
                    📍 {festival.location}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {festival.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {festival.description}
                </p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
                    onClick={() => {
                      alert(`🎪 ${festival.title}\n\n📅 ${festival.date}\n📍 ${festival.location}\n\n${festival.description}\n\nPartecipazione al festival in arrivo! Visita la mappa per raggiungere ${festival.location}.`);
                    }}
                  >
                    Partecipa
                  </button>
                  <button
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                    onClick={() => {
                      const mapSection = document.getElementById('map');
                      if (mapSection) {
                        mapSection.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                          alert(`🎭 Scopri ${festival.title}\n\n📅 ${festival.date}\n📍 ${festival.location}\n\n${festival.description}\n\nVisita la mappa interattiva per pianificare il viaggio!`);
                        }, 1000);
                      }
                    }}
                  >
                    Scopri
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              const mapSection = document.getElementById('map');
              if (mapSection) {
                mapSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                  alert('🎪 Tutti gli Eventi Italiani\n\nVisita la mappa interattiva per scoprire festival e eventi in ogni regione!\n\n• Carnevale di Venezia\n• Palio di Siena\n• Festival dei Due Mondi\n• Notte della Taranta\n• E molti altri...');
                }, 1000);
              }
            }}
          >
            Vedi Tutti gli Eventi
          </button>
        </div>
      </div>
    </section>
  );
}
