"use client";

import { useMemo, useRef } from "react";
import { getUpcomingShows, getPastShows } from "@/lib/constants";
import { Show } from "@/lib/types";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { Calendar, MapPin, Ticket, ExternalLink, Clock, History } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function formatDate(dateString: string): { month: string; day: string; year: string } {
  // Parse as local time — a bare date string would parse as UTC midnight and
  // display the previous day for users west of UTC
  const date = new Date(`${dateString}T00:00:00`);
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

  // Shows are partitioned by date so the lists stay current automatically
  const upcomingShows = useMemo(() => getUpcomingShows(), []);
  const pastShows = useMemo(() => getPastShows(), []);

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
    { scope: timelineRef, dependencies: [upcomingShows.length] }
  );

  return (
    <section id="shows" className="relative">
      {/* Decorative glow */}
      <div className="absolute -top-20 right-1/4 w-80 h-80 cinematic-glow cinematic-glow-cyan opacity-15" />

      <ScrollReveal animation="fade-up">
        <div className="flex items-center justify-between mb-10">
          <h2 className="section-heading">Upcoming Shows</h2>
          {upcomingShows.length > 0 && (
            <div className="flex items-center gap-2 text-white/60">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {upcomingShows.length} {upcomingShows.length === 1 ? "show" : "shows"}
              </span>
            </div>
          )}
        </div>
      </ScrollReveal>

      {upcomingShows.length === 0 ? (
        /* Placeholder when no shows are scheduled */
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="glass-card p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white/50" />
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
      ) : (
        /* Timeline */
        <div ref={timelineRef} className="relative">
          {/* Vertical line — positioned at the dot centers (date column + gap
              + half dot width) */}
          <div className="absolute left-[76px] md:left-[104px] -translate-x-1/2 top-0 bottom-0 w-px bg-white/10">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-b from-brand-pink via-accent-purple to-accent-cyan"
            />
          </div>

          {/* Shows */}
          <div className="space-y-6">
            {upcomingShows.map((show, index) => {
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
                      <div className="text-xs text-white/60">{month}</div>
                      <div className="text-2xl md:text-3xl font-display font-bold">
                        {day}
                      </div>
                      <div className="text-xs text-white/60">{year}</div>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-brand-dark border-2 border-brand-pink group-hover:bg-brand-pink transition-colors" />
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-brand-pink/50 animate-ping opacity-0 group-hover:opacity-100" />
                    </div>

                    {/* Show card */}
                    <div className="flex-1 glass-card overflow-hidden">
                      <div className="flex">
                      {/* Flyer image */}
                      {show.imageUrl && (
                        <div className="relative w-36 md:w-52 flex-shrink-0 bg-black">
                          <Image
                            src={show.imageUrl}
                            alt={show.festivalName ?? show.venue}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}

                      <div className="flex-1 p-4 md:p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            {/* Venue */}
                            <h3 className="font-display text-lg md:text-xl font-semibold mb-1 truncate">
                              {show.venue}
                            </h3>

                            {/* Location */}
                            <div className="flex items-center gap-1.5 text-white/60 text-sm mb-1.5">
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

                            {/* Time */}
                            {show.time && (
                              <div className="flex items-center gap-1.5 text-white/60 text-sm mb-3">
                                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{show.time}</span>
                              </div>
                            )}

                            {/* Status badge */}
                            <div
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
                            >
                              {statusStyles.label}
                            </div>
                          </div>

                          {/* Action button */}
                          {show.status === "on-sale" && (
                            show.ticketUrl ? (
                              <a
                                href={show.ticketUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-brand-pink/20 hover:bg-brand-pink/30 border border-brand-pink/30 rounded-lg text-brand-pink text-sm font-medium transition-colors group/btn"
                              >
                                <Ticket className="w-4 h-4" />
                                <span>{show.price ? `Tickets · ${show.price}` : "Tickets"}</span>
                                <ExternalLink className="w-3 h-3 opacity-0 -ml-1 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                              </a>
                            ) : (
                              /* Plain info text, deliberately not styled like
                                 the Tickets button — it isn't clickable */
                              <div className="flex items-center gap-2 text-white/70 text-sm">
                                <Ticket className="w-4 h-4 text-white/50" />
                                <span>{show.price ? `${show.price} at the door` : "Tickets at the door"}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      </div>{/* end flex row */}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      )}

      {/* Past shows */}
      {pastShows.length > 0 && (
        <div className="mt-20">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center justify-between mb-10">
              <h2 className="section-heading">Past Shows</h2>
              <div className="flex items-center gap-2 text-white/60">
                <History className="w-4 h-4" />
                <span className="text-sm">
                  {pastShows.length} {pastShows.length === 1 ? "show" : "shows"}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastShows.map((show, index) => {
              const { month, day, year } = formatDate(show.date);

              return (
                <ScrollReveal key={show.id} animation="fade-up" delay={index * 0.1}>
                  <div className="glass-card overflow-hidden h-full">
                    {show.imageUrl && (
                      <div className="relative aspect-[4/5] bg-black">
                        <Image
                          src={show.imageUrl}
                          alt={show.festivalName ?? show.venue}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="p-4 md:p-5">
                      <div className="text-xs text-white/60 mb-1">
                        {month} {day}, {year}
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-1 truncate">
                        {show.festivalName ?? show.venue}
                      </h3>
                      <div className="flex items-center gap-1.5 text-white/60 text-sm">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">
                          {show.venue} · {show.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
