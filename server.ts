import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

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
  // 1. Query iTunes for official 600x600 album artwork
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

  // 2. Query SoundCloud oEmbed for authentic track thumbnail
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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Real SoundCloud search endpoint with proper cover art
  app.get('/api/search', async (req, res) => {
    try {
      const q = String(req.query.q || '').trim();
      if (!q) {
        return res.json({ results: [] });
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
        return res.json({ results: [] });
      }

      const html = await scRes.text();
      // Match <h2><a href="/artist/track-name">Track Title</a></h2>
      const matches = [...html.matchAll(/<h2>\s*<a\s+href="(\/[^"]+\/[^"]+)">([^<]+)<\/a>/g)];
      const topMatches = matches.slice(0, 10);

      // Resolve real cover artwork for each track
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
            duration: 210, // Full duration resolved by SoundCloud Widget
            genre: 'Electronic',
          };
        })
      );

      return res.json({ results });
    } catch (err: any) {
      console.error('Error during SoundCloud search:', err);
      return res.status(500).json({ error: err.message, results: [] });
    }
  });

  // Mount Vite middlewares in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sp*tify sucks! Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
