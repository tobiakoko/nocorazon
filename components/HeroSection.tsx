"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax on mobile or if user prefers reduced motion
  const disableParallax = prefersReducedMotion || isMobile;

  // Parallax transforms - subject moves slower than scroll, text moves faster
  const subjectY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? ["0%", "0%"] : ["0%", "30%"]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? ["0%", "0%"] : ["0%", "50%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header
      ref={heroRef}
      className="relative h-screen w-full flex flex-col justify-end items-center overflow-hidden"
    >
      {/* Layer 1: Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/cyberpunk/1920/1080"
          alt="Hero Background"
          fill
          priority
          className="object-cover opacity-60 contrast-125 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark" />
      </div>

      {/* Layer 2: Subject image with parallax */}
      <motion.div
        className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none md:motion-safe:transform-gpu"
        style={{ y: subjectY }}
      >
        <div className="relative w-full h-full max-w-4xl">
          <Image
            src="/nocorazon-crop.png"
            alt="Nocorazon"
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
          />
        </div>
      </motion.div>

      {/* Gradient overlay on top of subject */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-dark via-transparent to-transparent pointer-events-none" />

      {/* Layer 3: Text content with parallax */}
      <motion.div
        className="relative z-30 text-center pb-32 md:motion-safe:transform-gpu"
        style={{ y: textY, opacity }}
      >
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          Nocorazon
        </h1>
        <p className="font-sans text-xl md:text-3xl font-light tracking-[0.5em] text-brand-pink mt-2 drop-shadow-lg">
          ノコラゾン
        </p>
      </motion.div>

      <motion.button
        className="absolute bottom-20 z-30 hidden md:block cursor-pointer hover:scale-110 transition-transform"
        style={{ opacity }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        aria-label="Scroll down"
      >
        <ArrowRight className="transform rotate-90 text-white/50 animate-bounce" />
      </motion.button>
    </header>
  );
}
