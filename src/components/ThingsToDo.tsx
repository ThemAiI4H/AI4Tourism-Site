'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  {
    title: 'Visita ai Monumenti Storici',
    description: 'Esplora il ricco patrimonio culturale italiano visitando antichi monumenti e siti archeologici.',
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=600&h=400&fit=crop',
    category: 'Culturale'
  },
  {
    title: 'Degustazione di Vini',
    description: 'Scopri le eccellenze enologiche italiane attraverso tour guidati nelle cantine e degustazioni.',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=400&fit=crop',
    category: 'Enogastronomico'
  },
  {
    title: 'Escursioni in Natura',
    description: 'Cammina tra paesaggi mozzafiato, parchi nazionali e sentieri panoramici.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
    category: 'Natura'
  },
  {
    title: 'Cucina Tradizionale',
    description: 'Partecipa a corsi di cucina per imparare a preparare i piatti tradizionali italiani.',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=600&h=400&fit=crop',
    category: 'Enogastronomico'
  }
];

export default function ThingsToDo() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.activity-card').forEach((card: any, index) => {
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
      id="things-to-do"
      ref={sectionRef}
      className="section py-20 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cose da Fare in Italia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri un mondo di esperienze uniche: dalla cultura alla natura,
            dall'enogastronomia alle tradizioni locali.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <div
              key={activity.title}
              className="activity-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                    {activity.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {activity.description}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm">
                  Scopri di Più
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
