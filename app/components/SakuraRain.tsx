"use client";

export default function SakuraRain() {
  const petals = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((i) => (
        <div
          key={i}
          className="absolute text-brand-pink animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 6}s`,
            fontSize: `${10 + Math.random() * 10}px`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        >
          ✿
        </div>
      ))}
    </div>
  );
}
