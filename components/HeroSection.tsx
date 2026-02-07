"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP entrance timeline
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(backgroundRef.current, {
        scale: 1.3,
        duration: 2.5,
        ease: "power2.out",
      })
        .from(
          glowRef.current,
          {
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
          },
          "-=2"
        )
        .from(
          subjectRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 1.5,
          },
          "-=1.8"
        )
        .from(
          titleRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 1,
          },
          "-=1"
        )
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );
    },
    { scope: heroRef }
  );

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax on mobile or if user prefers reduced motion
  const disableParallax = prefersReducedMotion || isMobile;

  // Multi-layer parallax transforms
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? ["0%", "0%"] : ["0%", "20%"]
  );
  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [1, 1] : [1, 1.1]
  );
  const subjectY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? ["0%", "0%"] : ["0%", "35%"]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? ["0%", "0%"] : ["0%", "60%"]
  );
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? ["0%", "0%"] : ["0%", "40%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <header
      ref={heroRef}
      className="relative h-screen w-full flex flex-col justify-end items-center overflow-hidden"
    >
      {/* Layer 1: Background image with parallax */}
      <motion.div
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <Image
          src="https://picsum.photos/seed/cyberpunk/1920/1080"
          alt=""
          fill
          priority
          className="object-cover opacity-50 contrast-125 brightness-50 saturate-75"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 via-transparent to-brand-dark/40" />
      </motion.div>

      {/* Layer 2: Cinematic glow behind subject */}
      <motion.div
        ref={glowRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-5 w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
        style={{ y: glowY }}
      >
        <div className="w-full h-full cinematic-glow cinematic-glow-pink" />
      </motion.div>

      {/* Layer 3: Subject image with parallax */}
      <motion.div
        ref={subjectRef}
        className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none md:motion-safe:transform-gpu"
        style={{ y: subjectY }}
      >
        <div className="relative w-full h-full max-w-4xl">
          <Image
            src="/nocorazon-crop.png"
            alt="Nocorazon"
            fill
            priority
            className="object-contain object-bottom drop-shadow-[0_0_60px_rgba(255,175,216,0.3)]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
          />
        </div>
      </motion.div>

      {/* Gradient overlay on top of subject */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent pointer-events-none" />

      {/* Layer 4: Text content with parallax */}
      <motion.div
        className="relative z-30 text-center pb-28 md:pb-32 md:motion-safe:transform-gpu"
        style={{ y: textY, opacity }}
      >
        <h1
          ref={titleRef}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase"
          style={{
            textShadow: "0 4px 40px rgba(0,0,0,0.9), 0 0 80px rgba(255,175,216,0.2)",
          }}
        >
          Nocorazon
        </h1>
        <p
          ref={subtitleRef}
          className="font-sans text-xl md:text-3xl font-light tracking-[0.4em] text-brand-pink mt-3"
          style={{
            textShadow: "0 2px 20px rgba(255,175,216,0.5)",
          }}
        >
          ノコラゾン
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 z-30 hidden md:flex flex-col items-center gap-2 cursor-pointer group"
        style={{ opacity }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-[0.3em] text-white/40 uppercase group-hover:text-white/60 transition-colors">
          Scroll
        </span>
        <ArrowDown className="w-5 h-5 text-white/40 animate-bounce group-hover:text-brand-pink transition-colors" />
      </motion.button>
    </header>
  );
}
