'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getNearbyPlaces, PlaceDetails, translatePlaceType, formatPriceLevel } from '@/lib/googleMaps';

interface NearbyPlacesProps {
  citySlug: string;
  type: 'restaurant' | 'tourist_attraction' | 'lodging' | 'museum' | 'park';
  title?: string;
  limit?: number;
}

export default function NearbyPlaces({
  citySlug,
  type,
  title,
  limit = 6
}: NearbyPlacesProps) {
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getNearbyPlaces(citySlug, type);
        if (result) {
          setPlaces(result.places.slice(0, limit));
        }
      } catch (err) {
        setError('Errore nel caricamento dei luoghi');
        console.error('Places loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [citySlug, type, limit]);

  const getTypeIcon = (placeType: string) => {
    const icons: Record<string, string> = {
      restaurant: '🍽️',
      tourist_attraction: '🏛️',
      lodging: '🏨',
      museum: '🎨',
      park: '🌳',
      bar: '🍺',
      cafe: '☕',
      store: '🛍️',
    };
    return icons[placeType] || '📍';
  };

  const getTypeColor = (placeType: string) => {
    const colors: Record<string, string> = {
      restaurant: 'bg-red-100 text-red-800',
      tourist_attraction: 'bg-blue-100 text-blue-800',
      lodging: 'bg-green-100 text-green-800',
      museum: 'bg-purple-100 text-purple-800',
      park: 'bg-emerald-100 text-emerald-800',
      bar: 'bg-orange-100 text-orange-800',
      cafe: 'bg-amber-100 text-amber-800',
      store: 'bg-pink-100 text-pink-800',
    };
    return colors[placeType] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || places.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title || `${translatePlaceType(type)} Vicini`}
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📍</div>
          <p className="text-gray-600">
            {error || 'Nessun luogo trovato nelle vicinanze'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {title || `${translatePlaceType(type)} Vicini`}
        </h3>
        <span className="text-sm text-gray-500">
          {places.length} risultati
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <div
            key={place.placeId}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-32 bg-gray-200">
              {place.photos && place.photos.length > 0 ? (
                <Image
                  src={place.photos[0]}
                  alt={place.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image fails
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&q=80`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {getTypeIcon(place.types[0] || 'establishment')}
                </div>
              )}

              {/* Rating Badge */}
              {place.rating > 0 && (
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <span className="text-yellow-400 text-xs">⭐</span>
                  <span className="text-xs font-semibold text-gray-900">
                    {place.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                  {place.name}
                </h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(place.types[0] || 'establishment')}`}>
                  {translatePlaceType(place.types[0] || 'establishment')}
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {place.address}
              </p>

              {/* Price Level */}
              {place.priceLevel > 0 && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs text-gray-600">Prezzo:</span>
                  <span className="text-xs font-medium text-green-600">
                    {formatPriceLevel(place.priceLevel)}
                  </span>
                </div>
              )}

              {/* Contact Info */}
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                {place.website && (
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    🌐
                  </a>
                )}
                {place.phone && (
                  <a
                    href={`tel:${place.phone}`}
                    className="hover:text-blue-600"
                  >
                    📞
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {places.length >= limit && (
        <div className="text-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
            Carica più risultati
          </button>
        </div>
      )}
    </div>
  );
}

// Componente semplificato per mostrare una lista di luoghi
export function NearbyPlacesList({
  citySlug,
  type,
  compact = false
}: Omit<NearbyPlacesProps, 'title' | 'limit'> & { compact?: boolean }) {
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoading(true);
        const result = await getNearbyPlaces(citySlug, type, 1500);
        if (result) {
          setPlaces(result.places.slice(0, compact ? 3 : 5));
        }
      } catch (err) {
        console.error('Places loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [citySlug, type, compact]);

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(compact ? 3 : 5)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center space-x-3 p-2">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {places.map((place) => (
        <div key={place.placeId} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
          <div className="text-lg">
            {place.rating >= 4.5 ? '⭐' : place.rating >= 4 ? '👍' : '📍'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 text-sm truncate">
              {place.name}
            </div>
            <div className="text-xs text-gray-600 truncate">
              {place.address}
            </div>
          </div>
          {place.rating > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400 text-xs">⭐</span>
              <span className="text-xs text-gray-600">{place.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
