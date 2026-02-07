"use client";

import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function NewsletterSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden rounded-3xl glass-card border-white/5">
      {/* Background Texture */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/sakura-night/1600/600"
          alt=""
          fill
          className="object-cover opacity-15"
        />
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
            <span className="text-white/40">In Touch</span>
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
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email Address"
              className="flex-grow bg-white/5 border border-white/10 rounded-lg px-5 py-3.5 text-sm focus:outline-none focus:border-brand-pink/50 focus:bg-white/10 transition-all placeholder:text-white/30"
            />
            <button
              type="submit"
              className="bg-brand-pink text-black font-bold uppercase text-xs tracking-widest px-8 py-3.5 rounded-lg hover:bg-white hover:shadow-lg hover:shadow-brand-pink/20 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
