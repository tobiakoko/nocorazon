"use client";

import { useState, useEffect } from "react";

interface Petal {
  id: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
  size: number;
  opacity: number;
  swayDuration: number;
  swayDelay: number;
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 10,
    animationDuration: 8 + Math.random() * 5,
    size: 10 + Math.random() * 15,
    opacity: 0.3 + Math.random() * 0.5,
    swayDuration: 3 + Math.random() * 2,
    swayDelay: Math.random() * -5,
  }));
}

export default function SakuraRain() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(generatePetals(25));
  }, []);

  if (petals.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-20px] animate-fall"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.animationDelay}s`,
            animationDuration: `${petal.animationDuration}s`,
          }}
        >
          <div
            className="animate-sway"
            style={{
              animationDuration: `${petal.swayDuration}s`,
              animationDelay: `${petal.swayDelay}s`,
            }}
          >
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-pink-300"
              style={{ opacity: petal.opacity }}
            >
              <path d="M12 2C12 2 14 6 18 8C22 10 22 12 22 12C22 12 20 16 16 18C12 20 12 22 12 22C12 22 10 16 6 14C2 12 2 10 2 10C2 10 4 6 8 4C12 2 12 2 12 2Z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
