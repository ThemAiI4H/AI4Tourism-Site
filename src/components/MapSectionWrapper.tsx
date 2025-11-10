'use client';

import dynamic from 'next/dynamic';

const MapSection = dynamic(() => import('@/components/MapSection'), {
  ssr: false,
  loading: () => (
    <section className="section py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Esplora l'Italia Interattiva
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Caricamento mappa interattiva...
          </p>
        </div>
        <div className="h-96 md:h-[600px] rounded-2xl bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Caricamento mappa...</p>
          </div>
        </div>
      </div>
    </section>
  ),
});

export default function MapSectionWrapper() {
  return <MapSection />;
}
