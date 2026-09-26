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

// Fetch official high-res cover artwork
async function resolveCoverArt(artist: string, title: string, scUrl: string): Promise<string> {
  try {
    const cleanSearch = `${artist} ${title}`.replace(/[\(\[\{].*?[\)\]\}]/g, '').trim();
    const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanSearch)}&entity=song&limit=1`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 1500);
    const itunesRes = await fetch(itunesUrl, { signal: ctrl.signal });
    clearTimeout(timer);

    if (itunesRes.ok) {
      const data = await itunesRes.json();
      if (data.results && data.results[0]?.artworkUrl100) {
        return data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
      }
    }
  } catch {
    // Continue to fallback
  }

  try {
    const oembedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(scUrl)}`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 1200);
    const oembedRes = await fetch(oembedUrl, { signal: ctrl.signal });
    clearTimeout(timer);

    if (oembedRes.ok) {
      const data = await oembedRes.json();
      if (data.thumbnail_url) {
        return data.thumbnail_url;
      }
    }
  } catch {
    // Fallback handled on client
  }

  return '';
}

export default async function handler(req: any, res: any) {
  try {
    const q = String(req.query?.q || '').trim();
    if (!q) {
      return res.status(200).json({ results: [] });
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
    const topMatches = matches.slice(0, 10);

    const results = await Promise.all(
      topMatches.map(async (m, idx) => {
        const trackPath = m[1];
        const rawTitle = decodeHtmlEntities(m[2].trim());
        const parts = trackPath.split('/').filter(Boolean);

        const rawArtist = parts[0] ? parts[0].replace(/[-_]/g, ' ') : 'SoundCloud Artist';
        const artist = rawArtist
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        const soundCloudUrl = `https://soundcloud.com${trackPath}`;
        const artworkUrl = await resolveCoverArt(artist, rawTitle, soundCloudUrl);

        return {
          id: `sc-live-${idx}-${parts.join('-')}`,
          title: rawTitle,
          artist,
          soundCloudUrl,
          artworkUrl,
          duration: 210,
          genre: 'Electronic',
        };
      })
    );

    return res.status(200).json({ results });
  } catch (err: any) {
    return res.status(500).json({ error: err.message, results: [] });
  }
}
