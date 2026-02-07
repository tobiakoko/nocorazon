"use client";

import { useEffect, useState, useMemo } from "react";

// Seeded pseudo-random number generator for deterministic randomness
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Petal SVG paths for variety
const PETAL_PATHS = [
  // Classic petal
  "M12 2C12 2 14.5 5 17 8C19.5 11 19 14 16 17C13 20 12 20 12 20C12 20 11 20 8 17C5 14 4.5 11 7 8C9.5 5 12 2 12 2Z",
  // Rounded petal
  "M12 3C14 5 16 8 17 11C18 14 17 17 14 19C12 20 12 20 10 19C7 17 6 14 7 11C8 8 10 5 12 3Z",
  // Thin petal
  "M12 2C13 4 15 7 16 10C17 13 16 16 14 18C12 19 12 19 10 18C8 16 7 13 8 10C9 7 11 4 12 2Z",
  // Curled petal
  "M12 3C11 5 13 8 15 11C17 14 16 17 13 18C11 19 10 18 9 16C8 14 9 11 11 8C12 6 12 3 12 3Z",
];

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  swayDuration: number;
  pathIndex: number;
  layer: "foreground" | "background";
  windOffset: number;
}

// Generate petals at module level for SSR consistency
const generatePetals = (count: number, layer: "foreground" | "background"): Petal[] => {
  const petals: Petal[] = [];
  const baseSeed = layer === "foreground" ? 0 : 1000;

  for (let i = 0; i < count; i++) {
    const seed = baseSeed + i;
    petals.push({
      id: seed,
      left: seededRandom(seed * 1) * 100,
      delay: seededRandom(seed * 2) * 12,
      duration: layer === "foreground"
        ? 8 + seededRandom(seed * 3) * 4
        : 12 + seededRandom(seed * 3) * 6,
      size: layer === "foreground"
        ? 16 + seededRandom(seed * 4) * 14
        : 8 + seededRandom(seed * 4) * 8,
      opacity: layer === "foreground"
        ? 0.5 + seededRandom(seed * 5) * 0.4
        : 0.2 + seededRandom(seed * 5) * 0.2,
      swayDuration: 3 + seededRandom(seed * 6) * 3,
      pathIndex: Math.floor(seededRandom(seed * 7) * PETAL_PATHS.length),
      layer,
      windOffset: seededRandom(seed * 8) * 360,
    });
  }
  return petals;
};

const FOREGROUND_PETALS = generatePetals(18, "foreground");
const BACKGROUND_PETALS = generatePetals(12, "background");

export default function SakuraParticles() {
  const [isClient, setIsClient] = useState(false);
  const [windIntensity, setWindIntensity] = useState(0);

  useEffect(() => {
    setIsClient(true);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Periodic wind gusts
    const windInterval = setInterval(() => {
      setWindIntensity(Math.random() * 30 + 10);
      setTimeout(() => setWindIntensity(0), 2000);
    }, 8000);

    return () => clearInterval(windInterval);
  }, []);

  const allPetals = useMemo(
    () => [...BACKGROUND_PETALS, ...FOREGROUND_PETALS],
    []
  );

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Background layer */}
      <div
        className="fixed inset-0 z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{
          transform: `translateX(${windIntensity * 0.3}px)`,
          transition: "transform 2s ease-out",
        }}
      >
        {BACKGROUND_PETALS.map((petal) => (
          <div
            key={`bg-${petal.id}`}
            className="absolute"
            style={{
              left: `${petal.left}%`,
              top: "-5%",
              width: petal.size,
              height: petal.size,
              opacity: petal.opacity,
              animation: `fall ${petal.duration}s linear ${petal.delay}s infinite`,
              filter: "blur(1px)",
            }}
          >
            <div
              style={{
                animation: `sway ${petal.swayDuration}s ease-in-out infinite alternate`,
                animationDelay: `${petal.delay * 0.5}s`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(255, 175, 216, 0.3))",
                }}
              >
                <path
                  d={PETAL_PATHS[petal.pathIndex]}
                  fill="rgba(255, 175, 216, 0.6)"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Foreground layer */}
      <div
        className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{
          transform: `translateX(${windIntensity}px)`,
          transition: "transform 1.5s ease-out",
        }}
      >
        {FOREGROUND_PETALS.map((petal) => (
          <div
            key={`fg-${petal.id}`}
            className="absolute"
            style={{
              left: `${petal.left}%`,
              top: "-5%",
              width: petal.size,
              height: petal.size,
              opacity: petal.opacity,
              animation: `fall ${petal.duration}s linear ${petal.delay}s infinite`,
            }}
          >
            <div
              style={{
                animation: `sway ${petal.swayDuration}s ease-in-out infinite alternate`,
                animationDelay: `${petal.delay * 0.3}s`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 175, 216, 0.5))",
                }}
              >
                <path
                  d={PETAL_PATHS[petal.pathIndex]}
                  fill="rgba(255, 175, 216, 0.85)"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
