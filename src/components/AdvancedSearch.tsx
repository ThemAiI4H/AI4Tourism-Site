'use client';

import { useState, useEffect, useMemo } from 'react';
import { destinations } from '@/data/destinations';

interface SearchFilters {
  query: string;
  priceRange: [number, number];
  rating: number;
  category: string;
  duration: string;
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'name';
}

interface Activity {
  name: string;
  price: number;
  duration: string;
  rating: number;
  destination: string;
  category: string;
}

export default function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    priceRange: [0, 200],
    rating: 0,
    category: '',
    duration: '',
    sortBy: 'relevance'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Estrai tutte le attività da tutte le destinazioni
  const allActivities = useMemo(() => {
    const activities: Activity[] = [];
    Object.entries(destinations).forEach(([slug, destination]) => {
      destination.activities.forEach(activity => {
        activities.push({
          ...activity,
          destination: destination.name,
          category: getActivityCategory(activity.name),
          price: parseFloat(activity.price.replace('€', '')),
        });
      });
    });
    return activities;
  }, []);

  // Categorie di attività
  const categories = ['Tutti', 'Culturale', 'Avventura', 'Rilassamento', 'Cibo', 'Sport'];
  const durations = ['Tutti', '1h', '2h', '3h', '4h', 'Mezza giornata', 'Giornata intera'];

  // Filtra e ordina le attività
  const filteredActivities = useMemo(() => {
    let filtered = allActivities.filter(activity => {
      // Ricerca testuale
      if (filters.query && !activity.name.toLowerCase().includes(filters.query.toLowerCase()) &&
          !activity.destination.toLowerCase().includes(filters.query.toLowerCase())) {
        return false;
      }

      // Filtro prezzo
      if (activity.price < filters.priceRange[0] || activity.price > filters.priceRange[1]) {
        return false;
      }

      // Filtro rating
      if (activity.rating < filters.rating) {
        return false;
      }

      // Filtro categoria
      if (filters.category && filters.category !== 'Tutti' && activity.category !== filters.category) {
        return false;
      }

      // Filtro durata
      if (filters.duration && filters.duration !== 'Tutti' && !activity.duration.includes(filters.duration)) {
        return false;
      }

      return true;
    });

    // Ordinamento
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allActivities, filters]);

  function getActivityCategory(activityName: string): string {
    const name = activityName.toLowerCase();
    if (name.includes('tour') || name.includes('visita') || name.includes('museo')) return 'Culturale';
    if (name.includes('escursione') || name.includes('trekking') || name.includes('avventura')) return 'Avventura';
    if (name.includes('spa') || name.includes('relax') || name.includes('massaggio')) return 'Rilassamento';
    if (name.includes('cucina') || name.includes('degustazione') || name.includes('ristorante')) return 'Cibo';
    if (name.includes('sport') || name.includes('bicicletta') || name.includes('nuoto')) return 'Sport';
    return 'Culturale'; // Default
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Search Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Cerca Attività</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isExpanded ? 'Nascondi filtri' : 'Mostra filtri avanzati'}
          </button>
        </div>

        {/* Main Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cerca attività, destinazioni..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prezzo (€): {filters.priceRange[0]} - {filters.priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                }))}
                className="w-full"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating minimo: {filters.rating > 0 ? `${filters.rating}+ stelle` : 'Tutti'}
              </label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Tutti i rating</option>
                <option value={3}>3+ stelle</option>
                <option value={4}>4+ stelle</option>
                <option value={4.5}>4.5+ stelle</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'Tutti' ? '' : cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durata</label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {durations.map(dur => (
                  <option key={dur} value={dur === 'Tutti' ? '' : dur}>{dur}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Ordina per:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Rilevanza</option>
                <option value="price-low">Prezzo crescente</option>
                <option value="price-high">Prezzo decrescente</option>
                <option value="rating">Miglior rating</option>
                <option value="name">Nome A-Z</option>
              </select>
            </div>

            <button
              onClick={() => setFilters({
                query: '',
                priceRange: [0, 200],
                rating: 0,
                category: '',
                duration: '',
                sortBy: 'relevance'
              })}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset filtri
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredActivities.length} attività trovate
          </h3>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nessuna attività trovata</h3>
            <p className="text-gray-600">Prova a modificare i filtri di ricerca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.slice(0, 12).map((activity, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{activity.name}</h4>
                      <p className="text-sm text-gray-600">{activity.destination}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {activity.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">€{activity.price}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600">{activity.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">⏱️ {activity.duration}</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                      Prenota
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredActivities.length > 12 && (
          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Carica più risultati
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
