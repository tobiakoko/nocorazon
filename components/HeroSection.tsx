"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { throttle } from "@/lib/utils";

// Register GSAP plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_BG = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2500&auto=format&fit=crop";

// Define the shape of our particle data
interface SmokeParticle {
  id: number;
  top: string;
  left: string;
  width: string;
  height: string;
  background: string;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const smokeContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  // State to hold random values (Solved Hydration Error)
  const [particles, setParticles] = useState<SmokeParticle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Generate random particles on mount (client-side only to avoid hydration mismatch)
  useEffect(() => {
    // Detect mobile devices
    const checkMobile = window.innerWidth < 768;

    // Reduce particle count on mobile to prevent crashes
    const particleCount = checkMobile ? 3 : 8;

    const generatedParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 60 + 20}%`,
      left: `${Math.random() * 40}%`,
      width: `${Math.random() * 400 + 400}px`,
      height: `${Math.random() * 400 + 400}px`,
      background: i % 2 === 0
        ? "radial-gradient(circle, rgba(255,100,200,0.2) 0%, rgba(0,0,0,0) 70%)"
        : "radial-gradient(circle, rgba(100,200,255,0.15) 0%, rgba(0,0,0,0) 70%)",
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: client-only initialization to prevent hydration mismatch
    setParticles(generatedParticles);
    setIsMobile(checkMobile);
  }, []);

  // Setup mouse listener for parallax effect (throttled to ~60fps for performance)
  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    }, 16);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  const yChar = useTransform(scrollY, [0, 1000], [0, 150]);
  const yText = useTransform(scrollY, [0, 1000], [0, 800]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  useGSAP(() => {
    if (!smokeContainerRef.current || particles.length === 0) return;

    const smokeElements = gsap.utils.toArray(".smoke-particle") as HTMLElement[];

    // Intro Animation
    const tl = gsap.timeline();
    
    tl.fromTo(
      smokeElements,
      { x: -window.innerWidth, opacity: 0, scale: 0.5 },
      {
        x: (i) => ((i * 17) % 100) - 50,
        opacity: (i) => 0.4 + ((i * 13) % 40) / 100,
        scale: (i) => 2 + ((i * 19) % 20) / 10,
        duration: 3.5,
        stagger: 0.1,
        ease: "power2.out",
      }
    )
    .to(characterRef.current, { filter: "brightness(1) contrast(1.1)", duration: 2 }, "-=2")
    .fromTo(textRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1 }, "-=1");

    // Scroll Animation
    smokeElements.forEach((particle, i) => {
      gsap.to(particle, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        x: (i + 1) * 150,
        y: -200,
        rotation: i % 2 === 0 ? 90 : -90,
        opacity: 0,
      });
    });

    // Idle Animation
    smokeElements.forEach((particle, i) => {
      gsap.to(particle, {
        y: "+=50",
        x: "+=30",
        rotation: "+=10",
        duration: 8 + ((i * 17) % 50) / 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

  }, { scope: containerRef, dependencies: [particles] }); // Re-run GSAP when particles are ready

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* LAYER 0: Background */}
      <motion.div 
        className="absolute inset-0 z-0 scale-110"
        style={{ y: yBg, x: useTransform(springX, (x) => x * -20), scale: 1.1 }}
      >
        <Image
          src={HERO_BG}
          alt="Neo Tokyo Cyberpunk Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 contrast-125 saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-brand-dark/20 to-brand-dark" />
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
      </motion.div>

      {/* LAYER 1: Smoke System */}
      <div ref={smokeContainerRef} className="absolute inset-0 z-20 pointer-events-none overflow-visible">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`smoke-particle absolute rounded-full mix-blend-screen ${isMobile ? 'blur-xl' : 'blur-[80px]'}`}
            style={{
              top: p.top,
              left: p.left,
              width: isMobile ? '200px' : p.width,
              height: isMobile ? '200px' : p.height,
              background: p.background,
              zIndex: p.id,
            }}
          />
        ))}
        {/* Static Base Fog (Safe for Server Render) */}
        <div className="smoke-particle absolute bottom-[-20%] left-[-20%] w-[150vw] h-[50vh] bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent blur-3xl" />
      </div>

      {/* LAYER 2: Character */}
      <motion.div
        ref={characterRef}
        className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none"
        style={{ 
          y: yChar,
          x: useTransform(springX, (x) => x * 15),
        }}
      >
        <div className="relative w-full h-[90vh] md:h-[95vh] max-w-[1400px]">
          <Image
            src="/nocorazon-crop.webp"
            alt="Nocorazon Character"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] filter brightness-50 contrast-125"
          />
        </div>
      </motion.div>

      {/* LAYER 3: Overlay Particles & UI */}
      <motion.div 
         className="absolute inset-0 z-30 pointer-events-none"
         style={{ y: useTransform(scrollY, [0, 1000], [0, -1200]) }}
      >
         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/50 rounded-full blur-[1px]" />
         <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-brand-pink/30 rounded-full blur-[2px]" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none opacity-20" />
      </motion.div>

      <motion.div 
        ref={textRef}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center pb-20 pointer-events-none mix-blend-plus-lighter"
        style={{ y: yText, opacity: opacityText }}
      >
         <div className="relative group">
            <h1 className="font-display text-8xl md:text-[10rem] font-bold tracking-tighter text-white uppercase"
                style={{ textShadow: "4px 4px 0px #ff00ff, -4px -4px 0px #00ffff" }}>
              Nocorazon
            </h1>
            <div className="absolute top-0 left-0 w-full h-full text-8xl md:text-[10rem] font-bold tracking-tighter text-red-500 opacity-50 animate-pulse-fast hidden group-hover:block"
                 style={{ transform: "translate(4px, -4px)" }}>
                 Nocorazon
            </div>
         </div>
         <p className="mt-4 font-mono text-sm md:text-xl text-brand-pink tracking-[1em] uppercase bg-black/50 px-4 py-1 backdrop-blur-md border border-brand-pink/30">
           ノコラゾン // SYSTEM_READY
         </p>
      </motion.div>
    </div>
  );
}