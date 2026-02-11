"use client";

interface SpotifyEmbedProps {
  trackId?: string;
  albumId?: string;
  playlistId?: string;
  artistId?: string;
  height?: number;
  theme?: "dark" | "light";
  className?: string;
}

export default function SpotifyEmbed({
  trackId,
  albumId,
  playlistId,
  artistId,
  height = 352,
  theme = "dark",
  className = "",
}: SpotifyEmbedProps) {
  let embedUrl = "https://open.spotify.com/embed/";

  if (artistId) {
    embedUrl += `artist/${artistId}`;
  } else if (trackId) {
    embedUrl += `track/${trackId}`;
  } else if (albumId) {
    embedUrl += `album/${albumId}`;
  } else if (playlistId) {
    embedUrl += `playlist/${playlistId}`;
  } else {
    return null;
  }

  embedUrl += `?utm_source=generator&theme=${theme === "dark" ? "0" : "1"}`;

  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
        title="Spotify Player"
      />
    </div>
  );
}
