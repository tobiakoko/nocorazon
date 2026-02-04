import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`bg-brand-glass backdrop-blur-xl border border-white/10 rounded-sm p-8 ${className}`}
    >
      {children}
    </div>
  );
}
