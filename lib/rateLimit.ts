import LRUCache from "lru-cache";

const windowMinutes = Number(process.env.RATE_LIMIT_WINDOW_MINUTES ?? 60);
const max = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 10);

const cache = new LRUCache<string, { count: number; expiresAt: number }>({
  max: 10000
});

export function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;
  const existing = cache.get(ip);
  if (existing && existing.expiresAt > now) {
    if (existing.count >= max) {
      return false;
    }
    existing.count += 1;
    cache.set(ip, existing, { ttl: existing.expiresAt - now });
    return true;
  }
  cache.set(ip, { count: 1, expiresAt: now + windowMs }, { ttl: windowMs });
  return true;
}
