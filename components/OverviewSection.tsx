import { Instagram } from "lucide-react";
import GlassCard from "./GlassCard";
import { OVERVIEW_STATS, INSTAGRAM_METRICS } from "@/lib/constants";

export default function OverviewSection() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide">
          Overview
        </h2>
        <div className="h-px bg-gradient-to-r from-brand-pink/50 to-transparent flex-grow" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OVERVIEW_STATS.map((stat) => (
          <GlassCard
            key={stat.id}
            className="flex flex-col items-center text-center justify-center min-h-[200px] group"
          >
            <div
              className={`mb-4 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors ${stat.accentColor}`}
            >
              {stat.icon && <stat.icon size={32} />}
            </div>
            <div className="text-xs font-bold tracking-widest text-white/50 uppercase mb-1">
              {stat.title}
            </div>
            <div className="text-4xl md:text-5xl font-display font-bold mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-white/40">{stat.subtext}</div>
          </GlassCard>
        ))}
      </div>

      {/* Detailed Instagram Stats */}
      <div className="mt-6">
        <GlassCard className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 p-2 rounded-lg">
                <Instagram size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold font-display">
                Instagram Stats
              </h3>
            </div>
            <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Data Verified by Instagram
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {INSTAGRAM_METRICS.map((metric) => (
              <div key={metric.label}>
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                  {metric.label}
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold mb-1">
                  {metric.value}
                </div>
                {metric.change && (
                  <div
                    className={`text-xs font-bold ${
                      metric.isPositive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {metric.change}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-white/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              LAST UPDATED JAN 21, 2026
            </div>
            <div>@nocorazonmode</div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
