// Simple in-memory cache with TTL support

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  createdAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

// Default TTLs in milliseconds
export const CACHE_TTL = {
  ANALYTICS: 60 * 60 * 1000,      // 1 hour
  TRACKS: 6 * 60 * 60 * 1000,     // 6 hours
  SPOTIFY_TOKEN: 55 * 60 * 1000,  // 55 minutes (tokens expire in 60)
} as const;

export function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;

  if (!entry) {
    return null;
  }

  // Check if expired
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCache<T>(key: string, data: T, ttl: number): void {
  const entry: CacheEntry<T> = {
    data,
    expiresAt: Date.now() + ttl,
    createdAt: Date.now(),
  };

  cache.set(key, entry);
}

export function invalidateCache(key: string): void {
  cache.delete(key);
}

export function clearCache(): void {
  cache.clear();
}

// Get stale data even if expired (for stale-while-revalidate pattern)
export function getStaleFromCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  return entry?.data ?? null;
}

// Check if cache entry is stale but still exists
export function isCacheStale(key: string): boolean {
  const entry = cache.get(key);
  if (!entry) return true;
  return Date.now() > entry.expiresAt;
}

// Wrapper for fetch-with-fallback pattern
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number,
  fallbackData?: T
): Promise<{ data: T; source: 'cache' | 'api' | 'fallback'; isStale: boolean }> {
  // Try fresh cache first
  const cached = getFromCache<T>(key);
  if (cached !== null) {
    return { data: cached, source: 'cache', isStale: false };
  }

  try {
    // Fetch fresh data
    const fresh = await fetcher();
    setCache(key, fresh, ttl);
    return { data: fresh, source: 'api', isStale: false };
  } catch (error) {
    // Try stale cache
    const stale = getStaleFromCache<T>(key);
    if (stale !== null) {
      return { data: stale, source: 'cache', isStale: true };
    }

    // Use fallback if provided
    if (fallbackData !== undefined) {
      return { data: fallbackData, source: 'fallback', isStale: true };
    }

    throw error;
  }
}
