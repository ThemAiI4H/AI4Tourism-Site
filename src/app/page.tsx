import { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ItalyCube from '@/components/ItalyCube';
import ThingsToDo from '@/components/ThingsToDo';
import Festivals from '@/components/Festivals';
import Regions from '@/components/Regions';
import MapSectionWrapper from '@/components/MapSectionWrapper';
import AdvancedSearch from '@/components/AdvancedSearch';
import ItineraryPlanner from '@/components/ItineraryPlanner';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'AI4Tourism - Scopri l\'Italia con Intelligenza Artificiale',
  description: 'Esplora le meraviglie d\'Italia con mappe interattive, guide turistiche dettagliate e consigli personalizzati. Scopri Roma, Firenze, Venezia e molte altre destinazioni italiane.',
  keywords: [
    'Italia',
    'turismo',
    'viaggi',
    'Roma',
    'Firenze',
    'Venezia',
    'Napoli',
    'Milano',
    'guide turistiche',
    'mappe interattive',
    'vacanze Italia',
    'destinazioni turistiche'
  ],
  authors: [{ name: 'AI4Tourism' }],
  creator: 'AI4Tourism',
  publisher: 'AI4Tourism',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AI4Tourism - Scopri l\'Italia con Intelligenza Artificiale',
    description: 'Esplora le meraviglie d\'Italia con mappe interattive, guide turistiche dettagliate e consigli personalizzati.',
    url: 'https://ai4tourism.com',
    siteName: 'AI4Tourism',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
        width: 1200,
        height: 800,
        alt: 'Scopri l\'Italia con AI4Tourism - Mappe interattive e guide turistiche',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI4Tourism - Scopri l\'Italia con Intelligenza Artificiale',
    description: 'Esplora le meraviglie d\'Italia con mappe interattive, guide turistiche dettagliate e consigli personalizzati.',
    images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop'],
    creator: '@ai4tourism',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ai4tourism.com',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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

      {/* Advanced Search Section */}
      <section className="section py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trova la tua Attività Perfetta
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cerca tra centinaia di attività in Italia con filtri avanzati per prezzo, categoria, rating e durata.
            </p>
          </div>

          <AdvancedSearch />
        </div>
      </section>

      {/* Itinerary Planner Section */}
      <section className="section py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pianifica il tuo Viaggio Perfetto
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Crea itinerari personalizzati trascinando attività nei giorni del tuo viaggio. Esporta e salva i tuoi piani.
            </p>
          </div>

          <ItineraryPlanner />
        </div>
      </section>

      <Regions />
      <MapSectionWrapper />

      {/* Schema Markup */}
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="website" />
    </div>
  );
}
