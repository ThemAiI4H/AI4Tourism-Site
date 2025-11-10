'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 50);

        // Update active section based on scroll position
        const sections = ['hero', 'things-to-do', 'festivals', 'regions', 'map'];
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navItems = [
    { href: '#hero', label: 'Home', icon: '🏠' },
    { href: '#things-to-do', label: 'Cose da Fare', icon: '🎯' },
    { href: '#festivals', label: 'Festival ed Eventi', icon: '🎪' },
    { href: '#regions', label: 'Regioni', icon: '🗺️' },
    { href: '#map', label: 'Mappa', icon: '📍' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50'
          : 'bg-gradient-to-r from-black/20 via-blue-900/20 to-purple-900/20 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-lg">🇮🇹</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
                AI4Tourism
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca destinazioni, attività..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="w-64 px-4 py-2 pl-10 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/90 backdrop-blur-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-64 overflow-y-auto z-50">
                  <div className="p-2">
                    <div className="text-xs text-gray-500 mb-2 px-2">Risultati per "{searchQuery}"</div>
                    {['Roma', 'Firenze', 'Venezia', 'Napoli', 'Milano'].filter(item =>
                      item.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((result) => (
                      <button
                        key={result}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition-colors duration-200"
                        onClick={() => {
                          setSearchQuery(result);
                          setShowSearchResults(false);
                          // Scroll to map and search for the location
                          const mapSection = document.getElementById('map');
                          if (mapSection) {
                            mapSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        📍 {result}
                      </button>
                    ))}
                    {['Visita ai Monumenti', 'Degustazione di Vini', 'Escursioni in Natura'].filter(item =>
                      item.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((result) => (
                      <button
                        key={result}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition-colors duration-200"
                        onClick={() => {
                          setSearchQuery(result);
                          setShowSearchResults(false);
                          // Scroll to activities section
                          const activitiesSection = document.getElementById('things-to-do');
                          if (activitiesSection) {
                            activitiesSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        🎯 {result}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                  activeSection === item.href.slice(1)
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/80 hover:shadow-md hover:transform hover:scale-105'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg group-hover:animate-bounce">{item.icon}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                </span>

                {/* Active indicator */}
                {activeSection === item.href.slice(1) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                )}

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-300">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 transition-transform duration-300"></div>
    </header>
  );
}
