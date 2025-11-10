'use client';

import { useState, useEffect } from 'react';
import { getCurrentWeather, getWeatherForecast, WeatherData, ForecastData, formatTime } from '@/lib/weather';

interface WeatherWidgetProps {
  citySlug: string;
  compact?: boolean;
}

export default function WeatherWidget({ citySlug, compact = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const [currentWeather, weatherForecast] = await Promise.all([
          getCurrentWeather(citySlug),
          getWeatherForecast(citySlug)
        ]);

        setWeather(currentWeather);
        setForecast(weatherForecast);
      } catch (err) {
        setError('Errore nel caricamento del meteo');
        console.error('Weather loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [citySlug]);

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200 ${compact ? 'p-4' : ''}`}>
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
            <div>
              <div className="h-4 bg-blue-200 rounded w-20 mb-2"></div>
              <div className="h-6 bg-blue-200 rounded w-16"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-blue-200 rounded w-full"></div>
            <div className="h-3 bg-blue-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={`bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-6 border border-red-200 ${compact ? 'p-4' : ''}`}>
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🌤️</div>
          <div>
            <h3 className="font-semibold text-red-900">Meteo non disponibile</h3>
            <p className="text-sm text-red-700">Riprova più tardi</p>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{weather.icon}</div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{weather.temperature}°C</div>
              <div className="text-sm text-blue-700">{weather.condition}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-600">💧 {weather.humidity}%</div>
            <div className="text-sm text-blue-600">💨 {weather.windSpeed} km/h</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-5xl">{weather.icon}</div>
          <div>
            <div className="text-3xl font-bold text-blue-900">{weather.temperature}°C</div>
            <div className="text-lg text-blue-700">{weather.condition}</div>
            <div className="text-sm text-blue-600">Percepiti {weather.feelsLike}°C</div>
          </div>
        </div>
        <button
          onClick={() => setShowForecast(!showForecast)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {showForecast ? 'Nascondi' : 'Previsioni'}
        </button>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/60 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">💧</div>
          <div className="text-sm text-gray-600">Umidità</div>
          <div className="font-semibold text-blue-900">{weather.humidity}%</div>
        </div>

        <div className="bg-white/60 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">💨</div>
          <div className="text-sm text-gray-600">Vento</div>
          <div className="font-semibold text-blue-900">{weather.windSpeed} km/h</div>
        </div>

        <div className="bg-white/60 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">👁️</div>
          <div className="text-sm text-gray-600">Visibilità</div>
          <div className="font-semibold text-blue-900">{weather.visibility} km</div>
        </div>

        <div className="bg-white/60 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">📊</div>
          <div className="text-sm text-gray-600">Pressione</div>
          <div className="font-semibold text-blue-900">{weather.pressure} hPa</div>
        </div>
      </div>

      {/* Sun Times */}
      <div className="flex justify-between items-center bg-white/40 rounded-lg p-4 mb-6">
        <div className="text-center">
          <div className="text-2xl mb-1">🌅</div>
          <div className="text-sm text-gray-600">Alba</div>
          <div className="font-semibold text-orange-600">{formatTime(weather.sunrise)}</div>
        </div>

        <div className="text-center">
          <div className="text-2xl mb-1">🌇</div>
          <div className="text-sm text-gray-600">Tramonto</div>
          <div className="font-semibold text-orange-600">{formatTime(weather.sunset)}</div>
        </div>
      </div>

      {/* Forecast Toggle */}
      {showForecast && forecast && (
        <div className="border-t border-blue-200 pt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Previsioni 5 giorni</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {forecast.map((day, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-3 text-center">
                <div className="text-lg mb-1">{day.icon}</div>
                <div className="text-sm font-medium text-blue-900 mb-1">
                  {new Date(day.date).toLocaleDateString('it-IT', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold text-blue-900">{day.temperature}°C</div>
                <div className="text-xs text-blue-700">{day.condition}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="text-xs text-blue-600 text-center mt-4">
        Aggiornato: {new Date().toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
}
