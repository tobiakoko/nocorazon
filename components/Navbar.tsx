import React from 'react';
import { NAV_SOCIALS, MUSIC_PLATFORMS } from '@/lib/constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white">
      {/* Left Socials */}
      <div className="flex gap-4 items-center">
        {NAV_SOCIALS.map((social) => (
          <a 
            key={social.name} 
            href={social.url} 
            className="hover:text-brand-pink transition-colors duration-200"
            aria-label={social.name}
          >
            {social.icon && <social.icon size={20} />}
          </a>
        ))}
      </div>

      {/* Right Music Links */}
      <div className="flex gap-6 items-center text-xs tracking-widest font-bold uppercase">
        <span className="hidden sm:block text-white/50">Music:</span>
        {MUSIC_PLATFORMS.map((platform) => (
          <a 
            key={platform.name} 
            href={platform.url} 
            className="hover:text-brand-pink transition-colors duration-200"
          >
            {platform.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;