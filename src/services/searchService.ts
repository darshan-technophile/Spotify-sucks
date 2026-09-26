import { Track } from '../types/music';

// Fallback high-fidelity asset image
import electronicImg from '../assets/images/genre_electronic_future_1790427155847.jpg';

export const DEFAULT_ARTWORK = electronicImg;

// Helper to generate dynamic waveform bars
function generateWaveform(seed: number, count = 40): number[] {
  const points: number[] = [];
  for (let i = 0; i < count; i++) {
    const s = Math.sin((i + seed) * 0.35);
    const c = Math.cos((i + seed * 2) * 0.5);
    const envelope = Math.sin((i / count) * Math.PI);
    const val = Math.max(0.15, Math.min(1.0, (Math.abs(s * 0.6 + c * 0.4) * 0.8 + 0.2) * envelope + 0.15));
    points.push(Number(val.toFixed(2)));
  }
  return points;
}

/**
 * Verified full-length tracks with authentic high-res album covers.
 * Each track streams the COMPLETE song via SoundCloud Widget API.
 */
export const SEARCH_INDEX: Track[] = [
  {
    id: 'sc-1',
    title: 'Say My Name (feat. Zyra)',
    artist: 'ODESZA',
    soundCloudUrl: 'https://soundcloud.com/odesza/say-my-name-feat-zyra',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/76/5d/55/765d554e-e421-0299-783f-d78ad559d5e5/5021392959191.png/600x600bb.jpg',
    duration: 262, // 4:22 full song
    genre: 'Electronic',
    playbackCount: '48.2M',
    waveformPoints: generateWaveform(1),
  },
  {
    id: 'sc-2',
    title: 'Sunset Lover',
    artist: 'Petit Biscuit',
    soundCloudUrl: 'https://soundcloud.com/petitbiscuit/sunset-lover',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/78/1c/93/781c934a-c233-cfce-39db-31f7284969b4/cover.jpg/600x600bb.jpg',
    duration: 238, // 3:58 full song
    genre: 'Electronic',
    playbackCount: '84.5M',
    waveformPoints: generateWaveform(2),
  },
  {
    id: 'sc-3',
    title: 'Levels (Original Mix)',
    artist: 'Avicii',
    soundCloudUrl: 'https://soundcloud.com/aviciiofficial/avicii-levels-original-mix',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/67/38/43/67384338-9ed7-fc68-5927-93f1fcf4705d/11UMGIM36900.rgb.jpg/600x600bb.jpg',
    duration: 338, // 5:38 full song
    genre: 'Electronic',
    playbackCount: '78.5M',
    waveformPoints: generateWaveform(3),
  },
  {
    id: 'sc-4',
    title: 'Harder, Better, Faster, Stronger',
    artist: 'Daft Punk',
    soundCloudUrl: 'https://soundcloud.com/daftpunkofficial/harder-better-faster-stronger',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fd/4a/77/fd4a77db-0ebc-d043-41a2-f32fa1bb0fb4/dj.qrikkdwj.jpg/600x600bb.jpg',
    duration: 224, // 3:44 full song
    genre: 'Electronic',
    playbackCount: '45.1M',
    waveformPoints: generateWaveform(4),
  },
  {
    id: 'sc-5',
    title: 'Starboy (feat. Daft Punk)',
    artist: 'The Weeknd',
    soundCloudUrl: 'https://soundcloud.com/theweeknd/starboy-feat-daft-punk',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg',
    duration: 230, // 3:50 full song
    genre: 'Hip-Hop',
    playbackCount: '112M',
    waveformPoints: generateWaveform(5),
  },
  {
    id: 'sc-6',
    title: 'Shelter',
    artist: 'Porter Robinson & Madeon',
    soundCloudUrl: 'https://soundcloud.com/porter-robinson/porter-robinson-madeon-shelter',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7f/7e/e5/7f7ee593-6ce6-254a-3325-789f95c3c5fb/653738346720.png/600x600bb.jpg',
    duration: 219, // 3:39 full song
    genre: 'Electronic',
    playbackCount: '36.4M',
    waveformPoints: generateWaveform(6),
  },
  {
    id: 'sc-7',
    title: 'Resonance',
    artist: 'HOME',
    soundCloudUrl: 'https://soundcloud.com/home-2001/resonance',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4f/13/65/4f1365b0-e97c-c469-c438-2f7d8f204355/872133025584_cover.jpg/600x600bb.jpg',
    duration: 212, // 3:32 full song
    genre: 'Synthwave',
    playbackCount: '52.1M',
    waveformPoints: generateWaveform(7),
  },
  {
    id: 'sc-8',
    title: 'Never Be Like You (feat. Kai)',
    artist: 'Flume',
    soundCloudUrl: 'https://soundcloud.com/flume/never-be-like-you-feat-kai',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/29/f4/3b/29f43b3f-cbeb-2cdd-33d3-d3b6bd231a9d/112230.jpg/600x600bb.jpg',
    duration: 234, // 3:54 full song
    genre: 'Hip-Hop',
    playbackCount: '64.9M',
    waveformPoints: generateWaveform(8),
  },
  {
    id: 'sc-9',
    title: 'Danielle (smile on my face)',
    artist: 'Fred again..',
    soundCloudUrl: 'https://soundcloud.com/fredagain/danielle-smile-on-my-face',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e7/09/da/e709da20-1748-1845-b304-422667d242e4/5054197812194.jpg/600x600bb.jpg',
    duration: 201, // 3:21 full song
    genre: 'Electronic',
    playbackCount: '27.9M',
    waveformPoints: generateWaveform(9),
  },
  {
    id: 'sc-10',
    title: 'Kingdom in Blue',
    artist: 'Kupla',
    soundCloudUrl: 'https://soundcloud.com/chilledcow/kupla-kingdom-in-blue',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f2/15/8d/f2158dec-ee67-6052-42c4-d044cede0436/859737277243.jpg/600x600bb.jpg',
    duration: 174, // 2:54 full song
    genre: 'Lo-Fi',
    playbackCount: '12.8M',
    waveformPoints: generateWaveform(10),
  },
  {
    id: 'sc-11',
    title: 'Midnight City',
    artist: 'M83',
    soundCloudUrl: 'https://soundcloud.com/m83/midnight-city',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/cb/7b/a9/cb7ba903-b5f1-cc21-90db-7a81b7aa0997/724596951057.jpg/600x600bb.jpg',
    duration: 243, // 4:03 full song
    genre: 'Synthwave',
    playbackCount: '58.4M',
    waveformPoints: generateWaveform(11),
  },
  {
    id: 'sc-12',
    title: 'Innerbloom',
    artist: 'RÜFÜS DU SOL',
    soundCloudUrl: 'https://soundcloud.com/rufussounds/innerbloom',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/aa/5f/d8/aa5fd889-4c2e-7e24-e8b2-428beaf9d4fe/SWEATA009.jpg/600x600bb.jpg',
    duration: 578, // 9:38 full song
    genre: 'Electronic',
    playbackCount: '41.0M',
    waveformPoints: generateWaveform(12),
  },
  {
    id: 'sc-13',
    title: 'Strobe (Club Edit)',
    artist: 'deadmau5',
    soundCloudUrl: 'https://soundcloud.com/deadmau5/strobe-club-edit',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f7/24/19/f724197c-b6b7-b2ad-94a9-06b2f5f95455/617465226458.jpg/600x600bb.jpg',
    duration: 382, // 6:22 full song
    genre: 'Electronic',
    playbackCount: '33.2M',
    waveformPoints: generateWaveform(13),
  },
  {
    id: 'sc-14',
    title: 'Light',
    artist: 'San Holo',
    soundCloudUrl: 'https://soundcloud.com/sanholobeats/light',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/da/42/3a/da423a5e-c482-c88b-d27b-0d2d41e3afc2/886446359960.jpg/600x600bb.jpg',
    duration: 240, // 4:00 full song
    genre: 'Electronic',
    playbackCount: '31.2M',
    waveformPoints: generateWaveform(14),
  },
  {
    id: 'sc-15',
    title: 'Show Me How',
    artist: 'Men I Trust',
    soundCloudUrl: 'https://soundcloud.com/men-i-trust/show-me-how',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/cf/57/39/cf5739e6-332a-e64c-bed0-b763893c0517/artwork.jpg/600x600bb.jpg',
    duration: 215, // 3:35 full song
    genre: 'Indie',
    playbackCount: '18.7M',
    waveformPoints: generateWaveform(15),
  },
  {
    id: 'sc-16',
    title: 'HUMBLE.',
    artist: 'Kendrick Lamar',
    soundCloudUrl: 'https://soundcloud.com/kendrick-lamar-music/humble',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg/600x600bb.jpg',
    duration: 177, // 2:57 full song
    genre: 'Hip-Hop',
    playbackCount: '88.0M',
    waveformPoints: generateWaveform(16),
  },
  {
    id: 'sc-17',
    title: 'Bangarang (feat. Sirah)',
    artist: 'Skrillex',
    soundCloudUrl: 'https://soundcloud.com/skrillex/bangarang-feat-sirah',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/1e/7f/5d/1e7f5d77-6a87-8713-2dea-e119567e0682/cover.jpg/600x600bb.jpg',
    duration: 215, // 3:35 full song
    genre: 'Electronic',
    playbackCount: '81.4M',
    waveformPoints: generateWaveform(17),
  },
  {
    id: 'sc-18',
    title: 'Alone',
    artist: 'Marshmello',
    soundCloudUrl: 'https://soundcloud.com/marshmellomusic/alone',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7e/be/33/7ebe3370-959a-94f7-77e2-c9e7fea9a4ed/859716988917_cover.jpg/600x600bb.jpg',
    duration: 273, // 4:33 full song
    genre: 'Electronic',
    playbackCount: '72.0M',
    waveformPoints: generateWaveform(18),
  },
  {
    id: 'sc-19',
    title: 'Animals',
    artist: 'Martin Garrix',
    soundCloudUrl: 'https://soundcloud.com/martingarrix/martin-garrix-animals-original',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6e/1e/f0/6e1ef055-195a-bb73-d5a8-5926058366a5/8712944577525.png/600x600bb.jpg',
    duration: 304, // 5:04 full song
    genre: 'Electronic',
    playbackCount: '69.1M',
    waveformPoints: generateWaveform(19),
  },
  {
    id: 'sc-20',
    title: 'Clarity (feat. Foxes)',
    artist: 'Zedd',
    soundCloudUrl: 'https://soundcloud.com/zedd/clarity',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d9/f2/2b/d9f22b74-8ef3-73d8-5da1-e5268c42f114/12UMGIM52120.rgb.jpg/600x600bb.jpg',
    duration: 271, // 4:31 full song
    genre: 'Electronic',
    playbackCount: '55.3M',
    waveformPoints: generateWaveform(20),
  },
  {
    id: 'sc-21',
    title: 'Firestone (feat. Conrad Sewell)',
    artist: 'Kygo',
    soundCloudUrl: 'https://soundcloud.com/kygo/firestone',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b5/69/ad/b569ad82-3ac0-54a8-bafc-baf349491541/0617465690853.jpg/600x600bb.jpg',
    duration: 273, // 4:33 full song
    genre: 'Electronic',
    playbackCount: '63.8M',
    waveformPoints: generateWaveform(21),
  },
  {
    id: 'sc-22',
    title: 'Feel So Close',
    artist: 'Calvin Harris',
    soundCloudUrl: 'https://soundcloud.com/calvinharris/feel-so-close',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/15/ba/ec/15baec26-2db7-0abd-4197-76372183a628/mzi.xbpaeiac.jpg/600x600bb.jpg',
    duration: 206, // 3:26 full song
    genre: 'Electronic',
    playbackCount: '44.9M',
    waveformPoints: generateWaveform(22),
  },
  {
    id: 'sc-23',
    title: 'Crawl Outta Love (feat. Annika Wells)',
    artist: 'Illenium',
    soundCloudUrl: 'https://soundcloud.com/illeniumofficial/illenium-crawl-outta-love-feat-annika-wells',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/3a/32/00/3a3200f8-9682-22b0-545b-695f0e1a4070/192641002342.png/600x600bb.jpg',
    duration: 242, // 4:02 full song
    genre: 'Electronic',
    playbackCount: '32.1M',
    waveformPoints: generateWaveform(23),
  },
  {
    id: 'sc-24',
    title: 'Sunflower',
    artist: 'Post Malone & Swae Lee',
    soundCloudUrl: 'https://soundcloud.com/postmalone/sunflower',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4b/30/2c/4b302cb6-7a14-5464-4e97-0577e9d0be49/18UMGIM82277.rgb.jpg/600x600bb.jpg',
    duration: 158, // 2:38 full song
    genre: 'Hip-Hop',
    playbackCount: '92.3M',
    waveformPoints: generateWaveform(24),
  },
];

// Helper to check if string is a SoundCloud URL
export function isSoundCloudUrl(str: string): boolean {
  return /soundcloud\.com\/[\w-]+\/[\w-]+/i.test(str.trim());
}

// Parse SoundCloud URL to create a track with real streaming
export function parseSoundCloudUrl(urlStr: string): Track | null {
  try {
    let cleanUrl = urlStr.trim();
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    const urlObj = new URL(cleanUrl);
    if (!urlObj.hostname.includes('soundcloud.com')) return null;

    const parts = urlObj.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;

    const rawArtist = parts[0].replace(/[-_]/g, ' ');
    const rawTitle = parts[1].replace(/[-_]/g, ' ');

    const artist = rawArtist
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    const title = rawTitle
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      id: `sc-url-${Date.now()}`,
      title,
      artist,
      soundCloudUrl: cleanUrl,
      artworkUrl: DEFAULT_ARTWORK,
      duration: 210, // Full duration will be updated from SoundCloud Widget API
      genre: 'Electronic',
      waveformPoints: generateWaveform(Date.now()),
    };
  } catch {
    return null;
  }
}

// Live search across verified full-length SoundCloud tracks + live SoundCloud directory
export async function searchTracks(query: string): Promise<Track[]> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  // 1. Direct SoundCloud link input
  if (isSoundCloudUrl(trimmed)) {
    const parsed = parseSoundCloudUrl(trimmed);
    if (parsed) {
      return [parsed];
    }
  }

  // 2. Search verified tracks index by keyword, title, artist, genre
  const keywords = trimmed.split(/\s+/).filter(Boolean);

  const localMatched = SEARCH_INDEX.filter((track) => {
    const titleLower = track.title.toLowerCase();
    const artistLower = track.artist.toLowerCase();
    const genreLower = track.genre.toLowerCase();

    return keywords.every((kw) =>
      titleLower.includes(kw) || artistLower.includes(kw) || genreLower.includes(kw)
    );
  });

  // 3. Live search query to SoundCloud backend API
  try {
    const apiRes = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        const liveTracks: Track[] = data.results.map((item: any, idx: number) => ({
          id: item.id || `live-${idx}-${Date.now()}`,
          title: item.title,
          artist: item.artist,
          soundCloudUrl: item.soundCloudUrl,
          artworkUrl: item.artworkUrl || DEFAULT_ARTWORK,
          duration: item.duration || 210,
          genre: 'Electronic',
          waveformPoints: generateWaveform(idx + 10),
        }));

        // Deduplicate against local matches
        const existingUrls = new Set(localMatched.map((t) => t.soundCloudUrl.toLowerCase()));
        const uniqueLive = liveTracks.filter((t) => !existingUrls.has(t.soundCloudUrl.toLowerCase()));

        return [...localMatched, ...uniqueLive];
      }
    }
  } catch (err) {
    console.warn('Live SoundCloud search error:', err);
  }

  if (localMatched.length > 0) {
    return localMatched;
  }

  // Partial match fallback
  return SEARCH_INDEX.filter((track) => {
    const titleLower = track.title.toLowerCase();
    const artistLower = track.artist.toLowerCase();
    return keywords.some((kw) => titleLower.includes(kw) || artistLower.includes(kw));
  });
}
