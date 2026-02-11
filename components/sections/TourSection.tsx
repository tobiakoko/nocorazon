"use client";

import { useRef } from "react";
import { UPCOMING_SHOWS } from "@/lib/constants";
import { Show } from "@/lib/types";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { Calendar, MapPin, Ticket, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function formatDate(dateString: string): { month: string; day: string; year: string } {
  const date = new Date(dateString);
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.getDate().toString().padStart(2, "0"),
    year: date.getFullYear().toString(),
  };
}

function getStatusStyles(status: Show["status"]) {
  switch (status) {
    case "sold-out":
      return {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/30",
        label: "Sold Out",
      };
    case "on-sale":
      return {
        bg: "bg-emerald-500/20",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
        label: "On Sale",
      };
    case "announced":
      return {
        bg: "bg-amber-500/20",
        text: "text-amber-400",
        border: "border-amber-500/30",
        label: "Announced",
      };
    case "cancelled":
      return {
        bg: "bg-gray-500/20",
        text: "text-gray-400",
        border: "border-gray-500/30",
        label: "Cancelled",
      };
  }
}

export default function TourSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Animate timeline line drawing on scroll
  useGSAP(
    () => {
      if (!lineRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    },
    { scope: timelineRef }
  );

  // Show placeholder when no shows are scheduled
  if (UPCOMING_SHOWS.length === 0) {
    return (
      <section className="relative">
        <div className="absolute -top-20 right-1/4 w-80 h-80 cinematic-glow cinematic-glow-cyan opacity-15" />

        <ScrollReveal animation="fade-up">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-heading">Upcoming Shows</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="glass-card p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">
              No Shows Scheduled
            </h3>
            <p className="text-white/50 max-w-md mx-auto mb-6">
              Stay tuned for upcoming tour dates and live performances. Follow on social media to be the first to know!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://www.instagram.com/_nocorazon_"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <section className="relative">
      {/* Decorative glow */}
      <div className="absolute -top-20 right-1/4 w-80 h-80 cinematic-glow cinematic-glow-cyan opacity-15" />

      <ScrollReveal animation="fade-up">
        <div className="flex items-center justify-between mb-10">
          <h2 className="section-heading">Upcoming Shows</h2>
          <div className="flex items-center gap-2 text-white/40">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{UPCOMING_SHOWS.length} shows</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Vertical line */}
        <div className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-px bg-white/10">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-gradient-to-b from-brand-pink via-accent-purple to-accent-cyan"
          />
        </div>

        {/* Shows */}
        <div className="space-y-6">
          {UPCOMING_SHOWS.map((show, index) => {
            const { month, day, year } = formatDate(show.date);
            const statusStyles = getStatusStyles(show.status);

            return (
              <ScrollReveal
                key={show.id}
                animation="slide-right"
                delay={index * 0.1}
              >
                <div className="flex gap-4 md:gap-6 group">
                  {/* Date column */}
                  <div className="w-[52px] md:w-[72px] flex-shrink-0 text-right">
                    <div className="text-xs text-white/40">{month}</div>
                    <div className="text-2xl md:text-3xl font-display font-bold">
                      {day}
                    </div>
                    <div className="text-xs text-white/40">{year}</div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-brand-dark border-2 border-brand-pink group-hover:bg-brand-pink transition-colors" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-brand-pink/50 animate-ping opacity-0 group-hover:opacity-100" />
                  </div>

                  {/* Show card */}
                  <div className="flex-1 glass-card p-4 md:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Venue */}
                        <h3 className="font-display text-lg md:text-xl font-semibold mb-1 truncate">
                          {show.venue}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-white/60 text-sm mb-3">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            {show.city}, {show.country}
                          </span>
                          {show.festivalName && (
                            <span className="text-brand-pink ml-2">
                              @ {show.festivalName}
                            </span>
                          )}
                        </div>

                        {/* Status badge */}
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
                        >
                          {statusStyles.label}
                        </div>
                      </div>

                      {/* Action button */}
                      {show.status === "on-sale" && show.ticketUrl && (
                        <a
                          href={show.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-brand-pink/20 hover:bg-brand-pink/30 border border-brand-pink/30 rounded-lg text-brand-pink text-sm font-medium transition-colors group/btn"
                        >
                          <Ticket className="w-4 h-4" />
                          <span>Tickets</span>
                          <ExternalLink className="w-3 h-3 opacity-0 -ml-1 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
