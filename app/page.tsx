import Navbar from "@/components/Navbar";
import SakuraRain from "@/components/SakuraRain";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import NewReleaseSection from "@/components/NewReleaseSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-pink selection:text-black">
      <SakuraRain />
      <Navbar />
      <HeroSection />

      <main className="relative z-10 px-4 md:px-10 max-w-7xl mx-auto pt-16 space-y-24 pb-32">
        <OverviewSection />
        <NewReleaseSection />
        <NewsletterSection />
      </main>
    </div>
  );
}
