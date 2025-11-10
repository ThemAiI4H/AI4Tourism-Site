// OpenWeather API integration
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  description: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  forecast?: ForecastData[];
}

export interface ForecastData {
  date: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

// Coordinate delle città italiane
export const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  roma: { lat: 41.9028, lon: 12.4964 },
  firenze: { lat: 43.7696, lon: 11.2558 },
  venezia: { lat: 45.4408, lon: 12.3155 },
  napoli: { lat: 40.8518, lon: 14.2681 },
  milano: { lat: 45.4642, lon: 9.1900 },
  pisa: { lat: 43.7228, lon: 10.4017 },
};

// Mappa delle condizioni meteo
const weatherIcons: Record<string, string> = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  '02d': '⛅', // few clouds day
  '02n': '☁️', // few clouds night
  '03d': '☁️', // scattered clouds
  '03n': '☁️',
  '04d': '☁️', // broken clouds
  '04n': '☁️',
  '09d': '🌦️', // shower rain
  '09n': '🌧️',
  '10d': '🌦️', // rain day
  '10n': '🌧️', // rain night
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️',
  '13d': '❄️', // snow
  '13n': '❄️',
  '50d': '🌫️', // mist
  '50n': '🌫️',
};

export async function getCurrentWeather(citySlug: string): Promise<WeatherData | null> {
  try {
    const coords = cityCoordinates[citySlug];
    if (!coords) {
      console.warn(`Coordinate non trovate per ${citySlug}`);
      return null;
    }

    const url = `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=it`;

    const response = await fetch(url);

    if (!response.ok) {
      // Se l'API key non è valida o abbiamo superato il limite, restituisci dati demo
      if (response.status === 401 || response.status === 429) {
        return getDemoWeather(citySlug);
      }
      throw new Error(`Errore API meteo: ${response.status}`);
    }

    const data = await response.json();

    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: weatherIcons[data.weather[0].icon] || '🌤️',
      description: data.weather[0].description,
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // converti in km
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };
  } catch (error) {
    console.error('Errore nel recupero meteo:', error);
    return getDemoWeather(citySlug);
  }
}

export async function getWeatherForecast(citySlug: string): Promise<ForecastData[] | null> {
  try {
    const coords = cityCoordinates[citySlug];
    if (!coords) return null;

    const url = `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=it`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401 || response.status === 429) {
        return getDemoForecast(citySlug);
      }
      throw new Error(`Errore API previsioni: ${response.status}`);
    }

    const data = await response.json();

    // Raggruppa per giorno (ogni 24 ore)
    const dailyForecasts: Record<string, any[]> = {};

    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(item);
    });

    // Prendi solo le previsioni giornaliere (una per giorno)
    return Object.entries(dailyForecasts).slice(0, 5).map(([date, items]) => {
      const dayData = items[0]; // Prendi il primo item del giorno
      return {
        date,
        temperature: Math.round(dayData.main.temp),
        condition: dayData.weather[0].main,
        icon: weatherIcons[dayData.weather[0].icon] || '🌤️',
        humidity: dayData.main.humidity,
        windSpeed: dayData.wind.speed,
      };
    });
  } catch (error) {
    console.error('Errore nel recupero previsioni:', error);
    return getDemoForecast(citySlug);
  }
}

// Dati demo per quando l'API non è disponibile
function getDemoWeather(citySlug: string): WeatherData {
  const demoConditions = [
    { condition: 'Soleggiato', icon: '☀️', temp: 22 },
    { condition: 'Parzialmente nuvoloso', icon: '⛅', temp: 20 },
    { condition: 'Nuvoloso', icon: '☁️', temp: 18 },
    { condition: 'Pioggia leggera', icon: '🌦️', temp: 16 },
  ];

  const randomCondition = demoConditions[Math.floor(Math.random() * demoConditions.length)];

  return {
    temperature: randomCondition.temp,
    condition: randomCondition.condition,
    humidity: 60 + Math.floor(Math.random() * 20),
    windSpeed: Math.floor(Math.random() * 15) + 5,
    icon: randomCondition.icon,
    description: randomCondition.condition.toLowerCase(),
    feelsLike: randomCondition.temp + Math.floor(Math.random() * 4) - 2,
    pressure: 1010 + Math.floor(Math.random() * 20),
    visibility: 8 + Math.floor(Math.random() * 5),
    sunrise: Date.now() / 1000 - 3600 * 6, // 6 ore fa
    sunset: Date.now() / 1000 + 3600 * 6, // tra 6 ore
  };
}

function getDemoForecast(citySlug: string): ForecastData[] {
  const forecast: ForecastData[] = [];
  const baseTemp = 20;

  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    forecast.push({
      date: date.toDateString(),
      temperature: baseTemp + Math.floor(Math.random() * 8) - 4,
      condition: ['Soleggiato', 'Parzialmente nuvoloso', 'Nuvoloso'][Math.floor(Math.random() * 3)],
      icon: ['☀️', '⛅', '☁️'][Math.floor(Math.random() * 3)],
      humidity: 50 + Math.floor(Math.random() * 30),
      windSpeed: Math.floor(Math.random() * 10) + 3,
    });
  }

  return forecast;
}

// Utility per formattare l'ora dal timestamp
export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Utility per formattare la data
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  });
}
