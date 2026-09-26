function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

// In-memory cache for fast Vercel edge/serverless response
const searchCache = new Map<string, { data: any[]; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 30; // 30 mins

// Helper to filter out spam, bootlegs, and noisy re-uploads
function isQualityTrack(title: string, artist: string, trackPath: string): boolean {
  const lowerTitle = title.toLowerCase();
  const lowerPath = trackPath.toLowerCase();

  const junkPatterns = [
    /reupload/i,
    /leak/i,
    /snippet/i,
    /slowed\s*\+\s*reverb/i,
    /earrape/i,
    /bass\s*boosted/i,
    /type\s*beat/i,
    /voice\s*memo/i,
    /screen\s*record/i,
    /preview\s*only/i,
  ];

  if (junkPatterns.some((p) => p.test(lowerTitle))) return false;
  if (/user-?\d{6,}/i.test(lowerPath) || /aka-?\d{6,}/i.test(lowerPath)) return false;

  return true;
}

// Fetch official high-res cover artwork
async function resolveCoverArt(artist: string, title: string, scUrl: string): Promise<string> {
  try {
    const cleanSearch = `${artist} ${title}`
      .replace(/[\(\[\{].*?[\)\]\}]/g, '')
      .replace(/ft\..*$/i, '')
      .replace(/feat\..*$/i, '')
      .trim();

    const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanSearch)}&entity=song&limit=1`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 900);
    const itunesRes = await fetch(itunesUrl, { signal: ctrl.signal });
    clearTimeout(timer);

    if (itunesRes.ok) {
      const data = await itunesRes.json();
      if (data.results && data.results[0]?.artworkUrl100) {
        return data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
      }
    }
  } catch {}

  try {
    const oembedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(scUrl)}`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 800);
    const oembedRes = await fetch(oembedUrl, { signal: ctrl.signal });
    clearTimeout(timer);

    if (oembedRes.ok) {
      const data = await oembedRes.json();
      if (data.thumbnail_url) {
        return data.thumbnail_url;
      }
    }
  } catch {}

  return '';
}

export default async function handler(req: any, res: any) {
  try {
    const q = String(req.query?.q || '').trim();
    if (!q) {
      return res.status(200).json({ results: [] });
    }

    const cacheKey = q.toLowerCase();
    const cached = searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.status(200).json({ results: cached.data });
    }

    const scRes = await fetch(`https://soundcloud.com/search/sounds?q=${encodeURIComponent(q)}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!scRes.ok) {
      return res.status(200).json({ results: [] });
    }

    const html = await scRes.text();
    const matches = [...html.matchAll(/<h2>\s*<a\s+href="(\/[^"]+\/[^"]+)">([^<]+)<\/a>/g)];

    const cleanMatches: { trackPath: string; rawTitle: string; artist: string }[] = [];

    for (const m of matches) {
      const trackPath = m[1];
      const rawTitle = decodeHtmlEntities(m[2].trim());
      const parts = trackPath.split('/').filter(Boolean);
      if (parts.length < 2) continue;

      const rawArtist = parts[0].replace(/[-_]/g, ' ');
      const artist = rawArtist
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      if (isQualityTrack(rawTitle, artist, trackPath)) {
        cleanMatches.push({ trackPath, rawTitle, artist });
      }
      if (cleanMatches.length >= 8) break;
    }

    const results = await Promise.all(
      cleanMatches.map(async (item, idx) => {
        const soundCloudUrl = `https://soundcloud.com${item.trackPath}`;
        const artworkUrl = await resolveCoverArt(item.artist, item.rawTitle, soundCloudUrl);

        return {
          id: `sc-live-${idx}-${item.trackPath.replace(/[^a-zA-Z0-9]/g, '-')}`,
          title: item.rawTitle,
          artist: item.artist,
          soundCloudUrl,
          artworkUrl,
          duration: 210,
          genre: 'Electronic',
        };
      })
    );

    searchCache.set(cacheKey, { data: results, timestamp: Date.now() });

    return res.status(200).json({ results });
  } catch (err: any) {
    return res.status(500).json({ error: err.message, results: [] });
  }
}
