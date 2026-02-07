"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface StatCounterProps {
  value: number;
  format?: "number" | "abbreviated" | "percentage";
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function formatValue(value: number, format: string): string {
  switch (format) {
    case "abbreviated":
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + "M";
      }
      if (value >= 1000) {
        return (value / 1000).toFixed(1) + "K";
      }
      return value.toString();
    case "percentage":
      return value.toFixed(1) + "%";
    default:
      return value.toLocaleString();
  }
}

export default function StatCounter({
  value,
  format = "abbreviated",
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatValue(displayValue, format)}
      {suffix}
    </span>
  );
}
