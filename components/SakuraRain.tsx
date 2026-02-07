"use client";

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

// Pre-generate petals at module level with seeded pseudo-random values
// Using a simple hash function to get deterministic but varied values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: seededRandom(i * 1) * 100,
    animationDelay: seededRandom(i * 2) * 10,
    animationDuration: 8 + seededRandom(i * 3) * 5,
    size: 10 + seededRandom(i * 4) * 15,
    opacity: 0.3 + seededRandom(i * 5) * 0.5,
    swayDuration: 3 + seededRandom(i * 6) * 2,
    swayDelay: seededRandom(i * 7) * -5,
  }));
}

const PETALS = generatePetals(25);

export default function SakuraRain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {PETALS.map((petal) => (
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
