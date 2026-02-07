"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
        ? containerRef.current.children
        : containerRef.current;

      const getAnimationProps = () => {
        switch (animation) {
          case "fade-up":
            return { y: 60, opacity: 0 };
          case "fade-in":
            return { opacity: 0 };
          case "slide-left":
            return { x: -80, opacity: 0 };
          case "slide-right":
            return { x: 80, opacity: 0 };
          case "scale":
            return { scale: 0.8, opacity: 0 };
          default:
            return { y: 60, opacity: 0 };
        }
      };

      gsap.from(elements, {
        ...getAnimationProps(),
        duration,
        delay,
        stagger: stagger || 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
