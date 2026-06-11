"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { formatNumber } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  format?: "number" | "abbreviated" | "percentage";
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function formatValue(value: number, format: string): string {
  // Round to avoid flickering decimals during animation
  const rounded = Math.round(value);

  switch (format) {
    case "abbreviated":
      return formatNumber(rounded);
    case "percentage":
      return value.toFixed(1) + "%";
    default:
      return rounded.toLocaleString();
  }
}

export default function StatCounter({
  value,
  format = "abbreviated",
  duration: baseDuration = 2000,
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
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: immediately set final value when reduced motion preferred
      setDisplayValue(value);
      return;
    }

    // Adaptive duration: shorter for smaller values, longer for larger
    // Min 800ms for small values, scales up to baseDuration for large values
    const adaptiveDuration = Math.max(
      800,
      Math.min(baseDuration, Math.log10(Math.max(value, 1) + 1) * 600)
    );

    const startTime = Date.now();
    let frame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / adaptiveDuration, 1);

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, baseDuration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatValue(displayValue, format)}
      {suffix}
    </span>
  );
}
