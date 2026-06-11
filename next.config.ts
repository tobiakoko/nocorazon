import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Hero background
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co', // Spotify CDN for album art
      },
    ],
  },
};

export default nextConfig;
