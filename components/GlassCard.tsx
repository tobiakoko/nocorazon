import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        relative bg-brand-glass backdrop-blur-xl border border-white/10 
        rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden
        hover:border-white/20 transition-all duration-300
        ${className}
      `}
    >
        {/* Subtle sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};

export default GlassCard;