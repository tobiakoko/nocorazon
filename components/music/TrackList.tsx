"use client";

import { Track } from "@/lib/types";
import { Play, ExternalLink } from "lucide-react";
import Image from "next/image";

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
        <a
          key={track.id}
          href={track.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Listen to ${track.title} on Spotify`}
          className="glass-card p-3 md:p-4 flex items-center gap-3 md:gap-4 group"
        >
          {/* Track number / Play indicator */}
          <div className="w-8 h-8 flex items-center justify-center text-white/60 group-hover:text-brand-pink transition-colors">
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

          {/* Duration */}
          <div className="text-white/60 text-sm w-12 text-right">
            {formatDuration(track.duration)}
          </div>

          <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-brand-pink transition-colors flex-shrink-0" />
        </a>
      ))}
    </div>
  );
}
