"use client";

import { Track } from "@/lib/types";
import { formatNumber } from "@/lib/constants";
import { Play } from "lucide-react";
import Image from "next/image";

// Platform icons as simple SVG components
function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.401-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.6-1.965-1.483-.18-.965.407-1.9 1.356-2.18.27-.08.548-.13.823-.18.37-.06.74-.11 1.1-.21.24-.06.39-.22.44-.47.01-.06.02-.13.02-.19v-4.26c0-.09-.02-.18-.07-.26-.07-.11-.18-.16-.31-.14-.12.02-.24.05-.36.08l-4.67 1.02-.03.01c-.28.06-.41.2-.44.49v.06c-.01.11-.01.22-.01.33v5.96c0 .42-.06.83-.24 1.21-.29.59-.76.96-1.39 1.14-.35.1-.71.15-1.07.17-.95.04-1.8-.6-1.97-1.48-.18-.97.41-1.9 1.36-2.18.27-.08.55-.13.82-.18.37-.06.74-.11 1.11-.21.3-.07.46-.27.49-.58v-.07-8.19c0-.2.05-.38.18-.54.11-.13.26-.22.42-.26l6.43-1.42c.18-.04.36-.08.55-.1.28-.03.5.15.53.44.01.07.01.14.01.21v5.51z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

interface TrackListProps {
  tracks: Track[];
  className?: string;
}

export default function TrackList({ tracks, className = "" }: TrackListProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className="glass-card p-3 md:p-4 flex items-center gap-3 md:gap-4 group"
        >
          {/* Track number / Play indicator */}
          <div className="w-8 h-8 flex items-center justify-center text-white/40 group-hover:text-brand-pink transition-colors">
            <span className="group-hover:hidden text-sm font-medium">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <Play className="w-4 h-4 hidden group-hover:block fill-current" />
          </div>

          {/* Album art */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0 relative">
            <Image
              src={track.albumArt}
              alt={track.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{track.title}</h4>
            {track.titleJapanese && (
              <p className="text-sm text-brand-pink/70 truncate">
                {track.titleJapanese}
              </p>
            )}
          </div>

          {/* Streams */}
          <div className="hidden md:block text-right text-white/50 text-sm">
            {formatNumber(track.streams)} plays
          </div>

          {/* Duration */}
          <div className="text-white/40 text-sm w-12 text-right">
            {formatDuration(track.duration)}
          </div>

          {/* Platform links */}
          <div className="flex items-center gap-1">
            {track.spotifyUrl && (
              <a
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors group/link"
                aria-label="Listen on Spotify"
              >
                <SpotifyIcon className="w-4 h-4 text-white/40 group-hover/link:text-[#1DB954]" />
              </a>
            )}
            {track.appleMusicUrl && (
              <a
                href={track.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors group/link"
                aria-label="Listen on Apple Music"
              >
                <AppleMusicIcon className="w-4 h-4 text-white/40 group-hover/link:text-[#FA243C]" />
              </a>
            )}
            {track.youtubeUrl && (
              <a
                href={track.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors group/link"
                aria-label="Watch on YouTube"
              >
                <YouTubeIcon className="w-4 h-4 text-white/40 group-hover/link:text-[#FF0000]" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
