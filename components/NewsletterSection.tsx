"use client";

import Image from "next/image";

export default function NewsletterSection() {
  return (
    <section className="relative py-20 overflow-hidden rounded-3xl">
      {/* Background Texture */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/volcano/1600/600"
          alt="Texture"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-4">
          Let&apos;s Stay <br />
          <span className="text-white/50">In Touch</span>
        </h2>
        <p className="text-brand-pink tracking-[0.2em] mb-8">連絡を取り合う</p>
        <p className="text-white/60 mb-10">
          Be the first to know when new music drops or tour dates go live.
          No spam, just vibes.
        </p>

        <form
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="flex-grow bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-pink/50 transition-colors placeholder:text-white/20"
          />
          <button
            type="submit"
            className="bg-white text-black font-bold uppercase text-xs tracking-widest px-8 py-3 hover:bg-brand-pink transition-colors duration-300"
          >
            Join The Newsletter
          </button>
        </form>
      </div>
    </section>
  );
}
