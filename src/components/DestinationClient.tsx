'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BookingModal from '@/components/BookingModal';
import SchemaMarkup from '@/components/SchemaMarkup';
import { SocialShareSimple } from '@/components/SocialShare';
import WeatherWidget from '@/components/WeatherWidget';
import NearbyPlaces from '@/components/NearbyPlaces';
import { destinations } from '@/data/destinations';

gsap.registerPlugin(ScrollTrigger);



export default function DestinationClient() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    activity?: string;
    price?: string;
  }>({ isOpen: false });

  const destination = destinations[slug as keyof typeof destinations];

  useEffect(() => {
    if (!destination) {
      router.push('/');
      return;
    }

    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      gsap.from('.hero-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
      });

      gsap.from('.hero-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });

    return () => ctx.revert();
  }, [destination, router]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Destinazione non trovata</h1>
          <p className="text-gray-600 mb-8">La destinazione richiesta non esiste.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-image absolute inset-0">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="hero-content relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {destination.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {destination.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm">🌡️ {destination.weather.temp}°C</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm">📍 {destination.region}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm">👥 {destination.population}</span>
            </div>
          </div>
          <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
            Pianifica il tuo viaggio
          </button>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Panoramica', icon: '🏛️' },
              { id: 'highlights', label: 'Attrazioni', icon: '🎯' },
              { id: 'activities', label: 'Attività', icon: '🎪' },
              { id: 'nearby', label: 'Luoghi Vicini', icon: '📍' },
              { id: 'gallery', label: 'Galleria', icon: '📸' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="animate-on-scroll">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Scopri {destination.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {destination.longDescription}
                </p>

                <div className="space-y-6">
                  {/* Weather Widget */}
                  <WeatherWidget citySlug={slug} compact />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">📅 Periodo Migliore</h3>
                      <p className="text-sm text-gray-600">{destination.bestTime}</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">💰 Valuta</h3>
                      <p className="text-sm text-gray-600">{destination.currency}</p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">🗣️ Lingua</h3>
                      <p className="text-sm text-gray-600">{destination.language}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Attrazioni Principali</h3>
                <div className="space-y-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{highlight.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{highlight.name}</h4>
                        <p className="text-sm text-gray-600">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Highlights Tab */}
        {activeTab === 'highlights' && (
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Attrazioni di {destination.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destination.highlights.map((highlight, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-6xl">{highlight.icon}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{highlight.name}</h3>
                    <p className="text-gray-600 mb-4">{highlight.description}</p>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200 border-2 border-blue-600 hover:border-blue-800">
                      Scopri di più
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Attività a {destination.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destination.activities.map((activity, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-blue-600">{activity.price}</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm text-gray-600">{activity.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">⏱️ {activity.duration}</p>
                    <button
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 hover:shadow-lg hover:scale-105 transition-all duration-200 border-2 border-green-600 hover:border-green-800 text-sm"
                      onClick={() => setBookingModal({
                        isOpen: true,
                        activity: activity.name,
                        price: activity.price
                      })}
                    >
                      Prenota Ora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Places Tab */}
        {activeTab === 'nearby' && (
          <div className="animate-on-scroll space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Luoghi Vicini a {destination.name}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Scopri ristoranti, attrazioni e hotel nelle vicinanze grazie a Google Maps
              </p>
            </div>

            {/* Restaurants */}
            <NearbyPlaces
              citySlug={slug}
              type="restaurant"
              title="🍽️ Ristoranti Raccomandati"
              limit={6}
            />

            {/* Tourist Attractions */}
            <NearbyPlaces
              citySlug={slug}
              type="tourist_attraction"
              title="🏛️ Attrazioni Turistiche"
              limit={6}
            />

            {/* Hotels */}
            <NearbyPlaces
              citySlug={slug}
              type="lodging"
              title="🏨 Hotel e Alloggi"
              limit={6}
            />
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Galleria di {destination.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destination.gallery.map((image, index) => (
                <div key={index} className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src={image}
                    alt={`${destination.name} ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto per visitare {destination.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Pianifica il tuo viaggio perfetto con i nostri esperti
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Contatta un Esperto
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Scarica Guida PDF
            </button>
          </div>

          {/* Social Share */}
          <div className="mt-8">
            <SocialShareSimple
              url={typeof window !== 'undefined' ? window.location.href : `https://ai4tourism.com/destinations/${slug}`}
              title={`Scopri ${destination.name} - Guida turistica completa | AI4Tourism`}
              className="justify-center"
            />
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false })}
        destination={destination.name}
        activity={bookingModal.activity}
        price={bookingModal.price}
      />

      {/* Schema Markup */}
      <SchemaMarkup
        type="place"
        data={{
          slug,
          lat: 42.5, // Default coordinates, could be enhanced with real coordinates
          lng: 12.5
        }}
      />
    </div>
  );
}
