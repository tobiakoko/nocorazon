import Navbar from "@/components/Navbar";
import SakuraParticles from "@/components/effects/SakuraParticles";
import HeroSection from "@/components/HeroSection";
import AnalyticsDashboard from "@/components/sections/AnalyticsDashboard";
import MusicShowcase from "@/components/sections/MusicShowcase";
import TourSection from "@/components/sections/TourSection";
import NewsletterSection from "@/components/NewsletterSection";

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
