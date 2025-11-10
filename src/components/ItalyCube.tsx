'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const destinations = [
  {
    name: 'Roma',
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=512&h=512&fit=crop',
    description: 'Capitale eterna'
  },
  {
    name: 'Venezia',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=512&h=512&fit=crop',
    description: 'Città dei canali'
  },
  {
    name: 'Firenze',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=512&h=512&fit=crop',
    description: 'Culla del Rinascimento'
  },
  {
    name: 'Milano',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=512&h=512&fit=crop',
    description: 'Capitale della moda'
  },
  {
    name: 'Napoli',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=512&h=512&fit=crop',
    description: 'Città partenopea'
  },
  {
    name: 'Amalfi',
    image: 'https://images.unsplash.com/photo-1602347174589-4e4f96346b4c?w=512&h=512&fit=crop',
    description: 'Costa divina'
  }
];

export default function ItalyCube() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedFace, setSelectedFace] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4169E1, 0.5);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Cube geometry with higher detail
    const geometry = new THREE.BoxGeometry(3, 3, 3, 32, 32, 32);

    // Load textures for each face with higher quality
    const loader = new THREE.TextureLoader();
    const materials = destinations.map((dest) => {
      const texture = loader.load(dest.image);
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      return new THREE.MeshLambertMaterial({
        map: texture,
        transparent: false,
        side: THREE.FrontSide
      });
    });

    // Create cube mesh
    const cube = new THREE.Mesh(geometry, materials);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    camera.position.z = 6;

    // Mouse interaction variables
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeed = { x: 0, y: 0 };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isMouseDown) {
        // Apply momentum
        cube.rotation.x += rotationSpeed.x * 0.95;
        cube.rotation.y += rotationSpeed.y * 0.95;

        // Dampen rotation speed
        rotationSpeed.x *= 0.95;
        rotationSpeed.y *= 0.95;

        // Auto rotation when not interacting
        if (Math.abs(rotationSpeed.x) < 0.001 && Math.abs(rotationSpeed.y) < 0.001) {
          cube.rotation.x += 0.002;
          cube.rotation.y += 0.001;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse event handlers
    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      setIsRotating(true);
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      rotationSpeed = { x: 0, y: 0 };
      document.body.style.cursor = 'grabbing';
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;

      cube.rotation.y += deltaX * 0.005;
      cube.rotation.x += deltaY * 0.005;

      // Store rotation speed for momentum
      rotationSpeed.x = deltaY * 0.005;
      rotationSpeed.y = deltaX * 0.005;

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };

      // Determine which face is facing the camera
      const faceIndex = getFacingFace(cube.rotation);
      const faceDestination = destinations[faceIndex];
      setSelectedFace(faceDestination?.name || null);
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      setIsRotating(false);
      document.body.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      if (isMouseDown) {
        handleMouseUp();
      }
    };

    // Helper function to determine which face is facing the camera
    const getFacingFace = (rotation: THREE.Euler) => {
      const normalizedX = ((rotation.x % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const normalizedY = ((rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      // Determine face based on rotation
      const xFace = Math.round(normalizedX / (Math.PI / 2)) % 4;
      const yFace = Math.round(normalizedY / (Math.PI / 2)) % 4;

      // Simplified face detection
      if (Math.abs(Math.sin(rotation.x)) > Math.abs(Math.cos(rotation.x))) {
        return Math.abs(Math.sin(rotation.x)) > Math.abs(Math.sin(rotation.y)) ? (rotation.x > 0 ? 4 : 5) : (rotation.y > 0 ? 2 : 3);
      } else {
        return Math.abs(Math.cos(rotation.x)) > Math.abs(Math.cos(rotation.y)) ? (rotation.x > Math.PI/2 ? 0 : 1) : (rotation.y > 0 ? 2 : 3);
      }
    };

    // Add event listeners
    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseDown(touch as any);
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseMove(touch as any);
    });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleMouseUp();
    });

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      materials.forEach(material => {
        if (material.map) material.map.dispose();
      });
      geometry.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* 3D Cube Container */}
      <div
        ref={mountRef}
        className={`relative cursor-grab transition-all duration-300 ${
          isRotating ? 'cursor-grabbing scale-105' : ''
        }`}
        style={{ width: '400px', height: '400px' }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl animate-pulse"></div>

        {/* Loading indicator */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {isRotating ? '🔄 Ruotando...' : '🖱️ Trascina per ruotare'}
        </div>
      </div>

      {/* Selected Destination Info */}
      {selectedFace && (
        <div className="text-center animate-fade-in bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm border border-white/20">
          <h3 className="text-3xl font-bold text-white mb-2">{selectedFace}</h3>
          <p className="text-gray-300 text-lg">
            {destinations.find(d => d.name === selectedFace)?.description}
          </p>
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Esplora {selectedFace}
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-gray-400 text-sm max-w-md space-y-2">
        <p className="font-semibold">🎮 Come interagire con il cubo:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <p>🖱️ <strong>Trascina</strong> per ruotare</p>
          <p>📱 <strong>Tocca</strong> per dispositivi mobili</p>
          <p>⚡ <strong>Momentum</strong> fisica realistica</p>
          <p>🎯 <strong>6 destinazioni</strong> uniche</p>
        </div>
      </div>
    </div>
  );
}
