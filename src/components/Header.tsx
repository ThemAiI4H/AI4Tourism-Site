'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
