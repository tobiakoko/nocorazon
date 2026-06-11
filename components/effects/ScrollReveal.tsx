"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Only register on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealAnimation = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale";

const ANIMATIONS: Record<RevealAnimation, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  "fade-up": { from: { y: 40, opacity: 0 }, to: { y: 0, opacity: 1 } },
  "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
  "slide-left": { from: { x: -60, opacity: 0 }, to: { x: 0, opacity: 1 } },
  "slide-right": { from: { x: 60, opacity: 0 }, to: { x: 0, opacity: 1 } },
  scale: { from: { scale: 0.9, opacity: 0 }, to: { scale: 1, opacity: 1 } },
};

interface ScrollRevealProps {
  children: ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  triggerStart?: string;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = "",
  triggerStart = "top 85%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const elements = stagger
        ? Array.from(containerRef.current.children)
        : containerRef.current;

      const { from, to } = ANIMATIONS[animation];

      // Use fromTo for more reliable animations
      gsap.fromTo(
        elements,
        from,
        {
          ...to,
          duration,
          delay,
          stagger: stagger || 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
