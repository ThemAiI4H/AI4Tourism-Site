'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Splitting from 'splitting';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Initialize Splitting for text animation after a delay to ensure DOM is ready
      setTimeout(() => {
        const splittingInstance = Splitting();
      }, 100);

      // Animate hero elements on load
      const tl = gsap.timeline();

      tl.from('.hero-bg', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
      })
      .from('.hero-overlay', {
        opacity: 0,
        duration: 1,
      }, '-=1')
      .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      .from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2');

      // Trigger the splitting animation after a delay
      setTimeout(() => {
        if (document.body) {
          document.body.dataset.play = 'true';
        }
      }, 200);

      // Add click handler to replay animation
      const handleClick = () => {
        if (document.body) {
          document.body.hidden = true;
          requestAnimationFrame(() => {
            document.body.hidden = false;
          });
        }
      };

      if (document.body) {
        document.body.addEventListener('click', handleClick);
      }

      return () => {
        if (document.body) {
          document.body.removeEventListener('click', handleClick);
        }
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="hero-bg absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop"
          alt="Beautiful Italian landscape with rolling hills and vineyards"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="container">
          <h1 className="hero-title title text-5xl md:text-7xl font-bold mb-6 leading-tight" data-splitting>
            Discover Italy
          </h1>

          <div className="dot">
            <div className="dot-inner">
              <svg className="dot-wave background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                <path d="M799.09 90s11.04 0 0 0c-80.714 0-79.621-90-200-90-120.377 0-118.607 90-200 90-81.391 0-81.215-90-200-90C80.308 0 78.68 89.29-.91 90c-6.946.062 0 0 0 0v510h800V90z" />
              </svg>
              <svg className="dot-wave foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                <path d="M799.09 90s11.04 0 0 0c-80.714 0-79.621-90-200-90-120.377 0-118.607 90-200 90-81.391 0-81.215-90-200-90C80.308 0 78.68 89.29-.91 90c-6.946.062 0 0 0 0v510h800V90z" />
              </svg>
            </div>
          </div>
        </div>

        <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Explore the breathtaking landscapes, rich history, and vibrant culture of the beautiful Italian regions
        </p>
        <button className="hero-cta bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
          Start Your Journey
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --duration: 6s;
          --wave-duration: calc(var(--duration) * 0.25);
          --text-in-delay: calc(var(--duration) * 0.275);
          --text-in-duration: calc(var(--duration) * 0.1);
          --easing: cubic-bezier(0.5, 0, 0.5, 1);
          --dot-color: #ffd950;
          --dot-color-dark: #977a12;
        }

        .container {
          display: grid;
          align-items: center;
          justify-items: center;
          grid-template-areas: "content";
        }

        .title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          margin: 0;
          grid-area: content;
          font-family: 'Heebo', sans-serif;
        }

        .title .char {
          --delay: calc(var(--text-in-delay) + (0.25s * (1 - var(--distance-percent))));
          animation: text-in var(--text-in-duration) var(--easing) var(--delay) backwards;
          transform-origin: center 1em;
        }

        .title .char[data-char="I"],
        .title .char[data-char="t"] {
          visibility: hidden;
          --squish-scale: 0.6;
          --squish-y: 10%;

          &:before {
            animation: text-squish var(--duration) var(--easing) forwards;
            visibility: visible;
            transform-origin: center 1em;
          }
        }

        .title .char[data-char="t"] {
          --squish-scale: 0.9;
          --squish-y: 5%;
        }

        @keyframes text-in {
          0% {
            opacity: 0;
            transform: translateX(calc(-0.4em * var(--char-offset, 1))) scale(0);
          }
          90% {
            transform: translateX(0em) scale(1.1);
          }
        }

        @keyframes text-squish {
          47.5%, 52.5% {
            transform: none;
          }
          50% {
            transform: translateY(calc(var(--squish-y) * 1)) scaleY(calc(var(--squish-scale) * 1));
          }
        }

        .title .char:last-child {
          animation: text-in var(--text-in-duration) var(--easing) var(--delay) backwards,
                    text-bonk var(--duration) var(--easing) forwards;
        }

        @keyframes text-bonk {
          80%, 85%, to {
            transform: none;
          }
          82% {
            transform: translateX(-20%);
          }
        }

        .dot {
          font-size: clamp(2rem, 5vw, 3rem);
          width: 1em;
          height: 1em;
          animation: dot var(--duration) var(--easing) both;
          grid-area: content;
        }

        .dot-inner {
          animation: dot-inner var(--duration) var(--easing) both;
          content: "";
          position: relative;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          display: grid;
          align-items: center;
          justify-items: center;
          grid-template-areas: "content";
          > * {
            grid-area: content;
          }
        }

        .dot-wave {
          width: 200%;
          height: 200%;
          fill: var(--dot-color);
          animation: wave-in var(--wave-duration) var(--easing);
          --offset-x: -110%;
        }

        .dot-wave.background {
          fill: var(--dot-color-dark);
          animation-duration: calc(0.95 * var(--wave-duration));
          --offset-x: 110%;
        }

        @keyframes wave-in {
          0% {
            transform: translateY(100%) translateX(var(--offset-x));
          }
          70% {
            transform: translateY(30%) translateX(0%);
          }
        }

        @keyframes dot {
          0% {
            opacity: 0;
            transform: scale(3);
          }
          10% {
            opacity: 1;
            transform: scale(3);
          }
          15% {
            transform: scale(3) translateY(0.5em) scaleY(1.5);
          }
          20% {
            transform: scale(1) translateY(-300%);
          }
          30% {
            transform: translateY(1em) scaleY(0.5);
          }
          40% {
            transform: translateY(-400%);
          }
          50% {
            transform: translateY(-1em);
          }
          53% {
            transform: translateY(-300%);
          }
          56% {
            transform: translateY(-1em);
          }
          59% {
            transform: translateY(-200%);
          }
          62% {
            transform: translateY(1em);
          }
          80%, 90%, to {
            transform: translateY(1em);
          }
        }

        @keyframes dot-inner {
          0%, 45% {
            transform: none;
          }
          70% {
            transform: translateX(6em);
            animation-timing-function: cubic-bezier(0.5, 0, 1, 0);
          }
          80% {
            transform: translateX(4.3em);
            animation-timing-function: var(--easing);
          }
          83%, to {
            transform: translateX(4.4em);
          }
        }

        /* Small helper to keep animation in sync */
        body:not([data-play]) .title .char,
        body:not([data-play]) .dot,
        body:not([data-play]) .dot-inner,
        body:not([data-play]) .dot-wave {
          visibility: hidden;
          animation: none !important;
        }
      `}</style>
    </section>
  );
}
