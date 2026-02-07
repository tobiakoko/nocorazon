"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Only register on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale";
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

      const getFromProps = () => {
        switch (animation) {
          case "fade-up":
            return { y: 40, opacity: 0 };
          case "fade-in":
            return { opacity: 0 };
          case "slide-left":
            return { x: -60, opacity: 0 };
          case "slide-right":
            return { x: 60, opacity: 0 };
          case "scale":
            return { scale: 0.9, opacity: 0 };
          default:
            return { y: 40, opacity: 0 };
        }
      };

      const getToProps = () => {
        switch (animation) {
          case "fade-up":
            return { y: 0, opacity: 1 };
          case "fade-in":
            return { opacity: 1 };
          case "slide-left":
            return { x: 0, opacity: 1 };
          case "slide-right":
            return { x: 0, opacity: 1 };
          case "scale":
            return { scale: 1, opacity: 1 };
          default:
            return { y: 0, opacity: 1 };
        }
      };

      // Use fromTo for more reliable animations
      gsap.fromTo(
        elements,
        getFromProps(),
        {
          ...getToProps(),
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
