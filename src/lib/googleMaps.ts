// Google Maps API integration
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'demo_key';
const BASE_URL = 'https://maps.googleapis.com/maps/api';

export interface PlaceDetails {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  priceLevel: number;
  types: string[];
  photos: string[];
  openingHours?: string[];
  website?: string;
  phone?: string;
}

export interface DirectionsResult {
  distance: string;
  duration: string;
  steps: Array<{
    instruction: string;
    distance: string;
    duration: string;
  }>;
  polyline: string;
}

export interface NearbyPlacesResult {
  places: PlaceDetails[];
  nextPageToken?: string;
}

// Coordinate delle città italiane (espanse)
export const cityCoordinates: Record<string, { lat: number; lon: number; placeId?: string }> = {
  roma: {
    lat: 41.9028,
    lon: 12.4964,
    placeId: 'ChIJw0rXGxLaLxMRZ5iK7q1mKJY'
  },
  firenze: {
    lat: 43.7696,
    lon: 11.2558,
    placeId: 'ChIJrdbSgKZWKhMRAyrH7xd51ZM'
  },
  venezia: {
    lat: 45.4408,
    lon: 12.3155,
    placeId: 'ChIJiT3W1SWfKEMRqjN0puL0fEU'
  },
  napoli: {
    lat: 40.8518,
    lon: 14.2681,
    placeId: 'ChIJ4VznYgNpOxMR7T6Z6rH1j9o'
  },
  milano: {
    lat: 45.4642,
    lon: 9.1900,
    placeId: 'ChIJ53USP0nBhkcRjQ50xhPN_zw'
  },
  pisa: {
    lat: 43.7228,
    lon: 10.4017,
    placeId: 'ChIJr3xCL8Yf1RIR6iJGz5H8K8'
  },
};

// Trova luoghi vicini (ristoranti, attrazioni, hotel)
export async function getNearbyPlaces(
  citySlug: string,
  type: 'restaurant' | 'tourist_attraction' | 'lodging' | 'museum' | 'park',
  radius: number = 2000
): Promise<NearbyPlacesResult | null> {
  try {
    const coords = cityCoordinates[citySlug];
    if (!coords) return null;

    const url = `${BASE_URL}/place/nearbysearch/json?location=${coords.lat},${coords.lon}&radius=${radius}&type=${type}&key=${API_KEY}&language=it`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        return getDemoNearbyPlaces(citySlug, type);
      }
      throw new Error(`Errore API Google Places: ${response.status}`);
    }

    const data = await response.json();

    const places: PlaceDetails[] = data.results.map((place: any) => ({
      placeId: place.place_id,
      name: place.name,
      address: place.vicinity,
      rating: place.rating || 0,
      priceLevel: place.price_level || 0,
      types: place.types || [],
      photos: place.photos ? place.photos.map((photo: any) =>
        `${BASE_URL}/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`
      ) : [],
      openingHours: place.opening_hours?.weekday_text,
      website: place.website,
      phone: place.formatted_phone_number,
    }));

    return {
      places,
      nextPageToken: data.next_page_token
    };
  } catch (error) {
    console.error('Errore nel recupero luoghi vicini:', error);
    return getDemoNearbyPlaces(citySlug, type);
  }
}

// Ottieni indicazioni stradali
export async function getDirections(
  origin: string,
  destination: string,
  mode: 'driving' | 'walking' | 'transit' = 'driving'
): Promise<DirectionsResult | null> {
  try {
    const url = `${BASE_URL}/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${mode}&key=${API_KEY}&language=it`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        return getDemoDirections(origin, destination, mode);
      }
      throw new Error(`Errore API Directions: ${response.status}`);
    }

    const data = await response.json();

    if (data.routes.length === 0) return null;

    const route = data.routes[0];
    const leg = route.legs[0];

    return {
      distance: leg.distance.text,
      duration: leg.duration.text,
      steps: leg.steps.map((step: any) => ({
        instruction: step.html_instructions.replace(/<[^>]*>/g, ''), // Rimuovi HTML
        distance: step.distance.text,
        duration: step.duration.text,
      })),
      polyline: route.overview_polyline.points,
    };
  } catch (error) {
    console.error('Errore nel recupero indicazioni:', error);
    return getDemoDirections(origin, destination, mode);
  }
}

// Ottieni dettagli di un luogo specifico
export async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  try {
    const url = `${BASE_URL}/place/details/json?place_id=${placeId}&fields=name,formatted_address,rating,price_level,types,photos,opening_hours,website,formatted_phone_number&key=${API_KEY}&language=it`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        return getDemoPlaceDetails(placeId);
      }
      throw new Error(`Errore API Place Details: ${response.status}`);
    }

    const data = await response.json();
    const place = data.result;

    return {
      placeId: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating || 0,
      priceLevel: place.price_level || 0,
      types: place.types || [],
      photos: place.photos ? place.photos.map((photo: any) =>
        `${BASE_URL}/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`
      ) : [],
      openingHours: place.opening_hours?.weekday_text,
      website: place.website,
      phone: place.formatted_phone_number,
    };
  } catch (error) {
    console.error('Errore nel recupero dettagli luogo:', error);
    return getDemoPlaceDetails(placeId);
  }
}

// Dati demo per quando l'API non è disponibile
function getDemoNearbyPlaces(citySlug: string, type: string): NearbyPlacesResult {
  const demoPlaces: Record<string, PlaceDetails[]> = {
    restaurant: [
      {
        placeId: 'demo-1',
        name: 'Trattoria Italiana',
        address: 'Via Roma, Centro Storico',
        rating: 4.5,
        priceLevel: 2,
        types: ['restaurant', 'italian'],
        photos: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'],
        openingHours: ['Lunedì: 12:00-15:00, 19:00-23:00'],
        website: 'https://demo-restaurant.com',
        phone: '+39 123 456 7890',
      },
      {
        placeId: 'demo-2',
        name: 'Pizzeria del Centro',
        address: 'Piazza Garibaldi, 10',
        rating: 4.2,
        priceLevel: 1,
        types: ['restaurant', 'pizza'],
        photos: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'],
        openingHours: ['Tutti i giorni: 11:00-24:00'],
        website: 'https://demo-pizza.com',
        phone: '+39 123 456 7891',
      },
    ],
    tourist_attraction: [
      {
        placeId: 'demo-3',
        name: 'Centro Storico',
        address: 'Centro Città',
        rating: 4.8,
        priceLevel: 0,
        types: ['tourist_attraction', 'historic_site'],
        photos: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'],
        openingHours: ['Sempre aperto'],
      },
      {
        placeId: 'demo-4',
        name: 'Museo Civico',
        address: 'Via dei Musei, 25',
        rating: 4.3,
        priceLevel: 1,
        types: ['museum', 'tourist_attraction'],
        photos: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
        openingHours: ['Mar-Dom: 09:00-18:00'],
        website: 'https://demo-museum.com',
        phone: '+39 123 456 7892',
      },
    ],
    lodging: [
      {
        placeId: 'demo-5',
        name: 'Hotel Centro',
        address: 'Via Garibaldi, 15',
        rating: 4.1,
        priceLevel: 2,
        types: ['lodging', 'hotel'],
        photos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'],
        openingHours: ['Reception: 24/7'],
        website: 'https://demo-hotel.com',
        phone: '+39 123 456 7893',
      },
    ],
  };

  return {
    places: demoPlaces[type] || demoPlaces.restaurant,
  };
}

function getDemoDirections(origin: string, destination: string, mode: string): DirectionsResult {
  const distances = {
    driving: '45 km',
    walking: '8.5 km',
    transit: '12 km',
  };

  const durations = {
    driving: '50 min',
    walking: '2 h 30 min',
    transit: '1 h 15 min',
  };

  return {
    distance: distances[mode as keyof typeof distances] || distances.driving,
    duration: durations[mode as keyof typeof durations] || durations.driving,
    steps: [
      {
        instruction: 'Dirigiti verso nord sulla Via principale',
        distance: '2.5 km',
        duration: '8 min',
      },
      {
        instruction: 'Continua dritto per 3 km',
        distance: '3 km',
        duration: '10 min',
      },
      {
        instruction: 'Gira a destra alla rotonda',
        distance: '1.2 km',
        duration: '5 min',
      },
    ],
    polyline: 'demo_polyline_data',
  };
}

function getDemoPlaceDetails(placeId: string): PlaceDetails {
  return {
    placeId,
    name: 'Luogo Demo',
    address: 'Via Demo, 123',
    rating: 4.0,
    priceLevel: 2,
    types: ['establishment'],
    photos: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'],
    openingHours: ['Lunedì-Domenica: 09:00-18:00'],
    website: 'https://demo-place.com',
    phone: '+39 123 456 7899',
  };
}

// Utility per calcolare la distanza tra due coordinate
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raggio della Terra in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Formatta il prezzo in livelli
export function formatPriceLevel(level: number): string {
  return '€'.repeat(level) || 'Gratuito';
}

// Traduci i tipi di luogo
export function translatePlaceType(type: string): string {
  const translations: Record<string, string> = {
    restaurant: 'Ristorante',
    tourist_attraction: 'Attrazione Turistica',
    lodging: 'Alloggio',
    museum: 'Museo',
    park: 'Parco',
    bar: 'Bar',
    cafe: 'Caffè',
    store: 'Negozio',
    establishment: 'Stabilimento',
  };
  return translations[type] || type;
}
