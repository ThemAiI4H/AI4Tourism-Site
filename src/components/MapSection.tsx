'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { id: 1, name: 'Roma', lat: 41.9028, lng: 12.4964, region: 'Lazio', x: 0, z: 0 },
  { id: 2, name: 'Firenze', lat: 43.7696, lng: 11.2558, region: 'Toscana', x: -1.2, z: 1.8 },
  { id: 3, name: 'Venezia', lat: 45.4408, lng: 12.3155, region: 'Veneto', x: 0.8, z: 3.2 },
  { id: 4, name: 'Napoli', lat: 40.8518, lng: 14.2681, region: 'Campania', x: 1.5, z: -1.2 },
  { id: 5, name: 'Milano', lat: 45.4642, lng: 9.1900, region: 'Lombardia', x: -2.5, z: 2.8 },
  { id: 6, name: 'Pisa', lat: 43.7228, lng: 10.4017, region: 'Toscana', x: -2.2, z: 1.5 },
];

export default function MapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const markersRef = useRef<THREE.Group[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.map-container', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        scrollTrigger: {
          trigger: '.map-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(800, 600);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create Italy shape (simplified)
    const italyShape = new THREE.Shape();
    italyShape.moveTo(0, 0); // Rome
    italyShape.lineTo(-1.2, 1.8); // Florence
    italyShape.lineTo(-2.5, 2.8); // Milan
    italyShape.lineTo(0.8, 3.2); // Venice
    italyShape.lineTo(1.5, -1.2); // Naples
    italyShape.lineTo(0, 0); // Back to Rome

    const italyGeometry = new THREE.ExtrudeGeometry(italyShape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    });

    const italyMaterial = new THREE.MeshLambertMaterial({
      color: 0x228B22,
      transparent: true,
      opacity: 0.8
    });

    const italyMesh = new THREE.Mesh(italyGeometry, italyMaterial);
    italyMesh.rotation.x = -Math.PI / 2;
    italyMesh.position.y = -0.1;
    italyMesh.receiveShadow = true;
    scene.add(italyMesh);

    // Create city markers
    locations.forEach((location) => {
      const markerGroup = new THREE.Group();

      // Marker base
      const baseGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 8);
      const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = 0.025;
      base.castShadow = true;
      markerGroup.add(base);

      // Marker pole
      const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8);
      const poleMaterial = new THREE.MeshLambertMaterial({ color: 0x696969 });
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.y = 0.4;
      pole.castShadow = true;
      markerGroup.add(pole);

      // Marker top (sphere)
      const topGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const topMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.y = 0.8;
      top.castShadow = true;
      markerGroup.add(top);

      // Position marker
      markerGroup.position.set(location.x, 0, location.z);
      markerGroup.userData = location;

      scene.add(markerGroup);
      markersRef.current.push(markerGroup);
    });

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersRef.current, true);

      // Reset all markers
      markersRef.current.forEach(marker => {
        const top = marker.children[2] as THREE.Mesh;
        (top.material as THREE.MeshLambertMaterial).color.setHex(0xFF0000);
      });

      if (intersects.length > 0) {
        const marker = intersects[0].object.parent as THREE.Group;
        const top = marker.children[2] as THREE.Mesh;
        (top.material as THREE.MeshLambertMaterial).color.setHex(0xFFFF00);
        canvasRef.current!.style.cursor = 'pointer';
      } else {
        canvasRef.current!.style.cursor = 'default';
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersRef.current, true);

      if (intersects.length > 0) {
        const marker = intersects[0].object.parent as THREE.Group;
        const location = marker.userData as typeof locations[0];
        setSelectedLocation(location);

        // Animate camera to focus on location
        gsap.to(camera.position, {
          x: location.x,
          y: 3,
          z: location.z + 3,
          duration: 1,
          ease: "power2.inOut"
        });
        gsap.to(camera, {
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => camera.lookAt(location.x, 0, location.z)
        });
      }
    };

    canvasRef.current.addEventListener('mousemove', onMouseMove);
    canvasRef.current.addEventListener('click', onClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Gentle rotation
      italyMesh.rotation.y += 0.002;

      // Animate markers
      markersRef.current.forEach((marker, index) => {
        marker.children[2].rotation.y += 0.01;
        marker.position.y = Math.sin(Date.now() * 0.001 + index) * 0.05;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = 800 / 600;
        camera.updateProjectionMatrix();
        renderer.setSize(800, 600);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasRef.current?.removeEventListener('mousemove', onMouseMove);
      canvasRef.current?.removeEventListener('click', onClick);

      // Cleanup Three.js
      scene.clear();
      renderer.dispose();
    };
  }, []);

  const resetView = () => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 5,
        z: 8,
        duration: 1,
        ease: "power2.inOut"
      });
      gsap.to(cameraRef.current, {
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => cameraRef.current?.lookAt(0, 0, 0)
      });
      setSelectedLocation(null);
    }
  };

  return (
    <section
      id="map"
      ref={sectionRef}
      className="section py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Esplora l'Italia in 3D
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri la bellezza geografica dell'Italia in una mappa interattiva 3D.
            Clicca sui marker rossi per saperne di più su ogni destinazione.
          </p>
        </div>

        <div className="map-container h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 to-purple-600 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: 'block' }}
          />

          {/* Controls overlay */}
          <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-3">
            <button
              onClick={resetView}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded transition-colors"
            >
              Vista Generale
            </button>
          </div>

          {/* Info overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex flex-wrap justify-center gap-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location);
                    if (cameraRef.current) {
                      gsap.to(cameraRef.current.position, {
                        x: location.x,
                        y: 3,
                        z: location.z + 3,
                        duration: 1,
                        ease: "power2.inOut"
                      });
                      gsap.to(cameraRef.current, {
                        duration: 1,
                        ease: "power2.inOut",
                        onUpdate: () => cameraRef.current?.lookAt(location.x, 0, location.z)
                      });
                    }
                  }}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-full transition-colors"
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>

          {/* Selected location info */}
          {selectedLocation && (
            <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-4 max-w-xs">
              <h3 className="font-bold text-lg text-white mb-2">{selectedLocation.name}</h3>
              <p className="text-sm text-gray-200 mb-3">{selectedLocation.region}</p>
              <button className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm rounded transition-colors">
                Scopri di più
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Mappa 3D interattiva con le principali destinazioni italiane
          </p>
          <div className="text-sm text-gray-500">
            Usa il mouse per esplorare • Clicca sui marker rossi per i dettagli
          </div>
        </div>
      </div>
    </section>
  );
}
