import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface FiveMCache {
  data: any;
  timestamp: number;
}

// Global cache variable for serverless/development hot-reloads
const globalForFiveMCache = global as unknown as { fivemCache: FiveMCache | null };
let cache = globalForFiveMCache.fivemCache || null;
if (process.env.NODE_ENV !== 'production') globalForFiveMCache.fivemCache = cache;

const CACHE_TTL = 15 * 1000; // 15 seconds cache Time-To-Live

export async function GET() {
  try {
    const now = Date.now();
    
    // Serve from cache if valid
    if (cache && now - cache.timestamp < CACHE_TTL) {
      console.log(`Serving FiveM details from cache (age: ${Math.round((now - cache.timestamp) / 1000)}s)`);
      return NextResponse.json(cache.data);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

    console.log('Fetching live server details from FiveM API...');
    const res = await fetch('https://frontend.cfx-services.net/api/servers/single/ma4erd', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      },
      signal: controller.signal,
      cache: 'no-store'
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (res.status === 404) {
        console.warn('FiveM server is currently offline or unlisted (404).');
        if (cache) {
          return NextResponse.json(cache.data);
        }
        return NextResponse.json({ Data: { clients: 0, sv_maxclients: 0 } });
      }
      throw new Error(`FiveM API responded with status ${res.status}`);
    }

    const data = await res.json();
    
    // Update cache
    cache = { data, timestamp: now };
    if (process.env.NODE_ENV !== 'production') globalForFiveMCache.fivemCache = cache;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching FiveM player count on server:', error);

    // Graceful fallback to expired cache if available
    if (cache) {
      console.warn('Upstream FiveM server is down or timed out. Returning stale cached data.');
      return NextResponse.json(cache.data);
    }

    return NextResponse.json(
      { error: 'Failed to retrieve server details' },
      { status: 502 }
    );
  }
}
