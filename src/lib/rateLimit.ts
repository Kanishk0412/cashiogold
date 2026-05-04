// Simple in-memory rate limiter (best-effort for serverless)
// For production-scale, replace with Upstash Redis

interface Entry { count: number; reset: number }

const store = new Map<string, Entry>();

const WINDOW_MS = 60_000; // 1 minute

export function rateLimit(ip: string, limit: number): { ok: boolean; remaining: number } {
  const now = Date.now();

  // Clean expired entries every ~100 requests
  if (Math.random() < 0.01) {
    for (const [key, val] of store) {
      if (val.reset < now) store.delete(key);
    }
  }

  const entry = store.get(ip);

  if (!entry || entry.reset < now) {
    store.set(ip, { count: 1, reset: now + WINDOW_MS });
    return { ok: true, remaining: limit - 1 };
  }

  entry.count++;
  const remaining = Math.max(0, limit - entry.count);
  return { ok: entry.count <= limit, remaining };
}

export function getClientIp(req: Request): string {
  const headers = new Headers((req as Request & { headers: Headers }).headers);
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
