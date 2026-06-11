"use client";

import { useState } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="connect" className="relative py-20 md:py-28 overflow-hidden rounded-3xl glass-card border-white/5">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-brand-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/5 via-transparent to-accent-purple/5" />
      </div>

      {/* Decorative glows */}
      <div className="absolute -top-20 left-1/4 w-64 h-64 cinematic-glow cinematic-glow-pink opacity-30" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 cinematic-glow cinematic-glow-purple opacity-20" />

      <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
        <ScrollReveal animation="fade-up">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-4">
            Let&apos;s Stay <br />
            <span className="text-white/60">In Touch</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.1}>
          <p className="text-brand-pink tracking-[0.3em] mb-8 text-sm">連絡を取り合う</p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2}>
          <p className="text-white/50 mb-10 max-w-md mx-auto">
            Be the first to know when new music drops or tour dates go live.
            No spam, just vibes.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3}>
          {submitted ? (
            <div
              className="flex items-center justify-center gap-3 max-w-md mx-auto bg-white/5 border border-brand-pink/30 rounded-lg px-5 py-4"
              role="status"
            >
              <CheckCircle className="w-5 h-5 text-brand-pink flex-shrink-0" />
              <p className="text-sm text-white/80">
                Thanks — you&apos;re on the list. Talk soon!
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire to an email list provider (Mailchimp, Buttondown,
                // ConvertKit, ...) before launch — submissions are not stored yet
                setSubmitted(true);
              }}
            >
              <input
                type="email"
                name="email"
                required
                aria-label="Email address"
                placeholder="Email Address"
                className="flex-grow bg-white/5 border border-white/10 rounded-lg px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-brand-pink/60 focus:border-brand-pink/50 focus:bg-white/10 transition-all placeholder:text-white/50"
              />
              <button
                type="submit"
                className="bg-brand-pink text-black font-bold uppercase text-xs tracking-widest px-8 py-3.5 rounded-lg hover:bg-white hover:shadow-lg hover:shadow-brand-pink/20 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
