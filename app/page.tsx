import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SakuraParticles from "@/components/effects/SakuraParticles";
import HeroSection from "@/components/HeroSection";

// Lazy load below-fold sections for better initial load performance
const AnalyticsDashboard = dynamic(
  () => import("@/components/sections/AnalyticsDashboard"),
  { ssr: true }
);
const MusicShowcase = dynamic(
  () => import("@/components/sections/MusicShowcase"),
  { ssr: true }
);
const TourSection = dynamic(
  () => import("@/components/sections/TourSection"),
  { ssr: true }
);
const NewsletterSection = dynamic(
  () => import("@/components/NewsletterSection"),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-pink selection:text-black">
      <SakuraParticles />
      <Navbar />
      <HeroSection />

      <main className="relative z-20 px-4 md:px-10 max-w-7xl mx-auto pt-20 space-y-32 pb-32">
        <AnalyticsDashboard />
        <MusicShowcase />
        <TourSection />
        <NewsletterSection />
      </main>
    </div>
  );
}
