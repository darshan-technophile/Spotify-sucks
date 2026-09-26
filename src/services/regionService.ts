import { Track } from '../types/music';

export interface Region {
  id: string;
  name: string;
  flag: string;
  code: string;
}

export const REGIONS: Region[] = [
  { id: 'global', name: 'Global', flag: '🌐', code: 'WLD' },
  { id: 'us', name: 'United States', flag: '🇺🇸', code: 'US' },
  { id: 'gb', name: 'United Kingdom', flag: '🇬🇧', code: 'UK' },
  { id: 'in', name: 'India', flag: '🇮🇳', code: 'IN' },
  { id: 'fr', name: 'France', flag: '🇫🇷', code: 'FR' },
  { id: 'de', name: 'Germany', flag: '🇩🇪', code: 'DE' },
  { id: 'jp', name: 'Japan', flag: '🇯🇵', code: 'JP' },
  { id: 'au', name: 'Australia', flag: '🇦🇺', code: 'AU' },
  { id: 'br', name: 'Brazil', flag: '🇧🇷', code: 'BR' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦', code: 'CA' },
];

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

// Regional full-length tracks with official cover images
export const REGIONAL_TRACKS: Record<string, Track[]> = {
  global: [
    {
      id: 'reg-gl-1',
      title: 'Say My Name (feat. Zyra)',
      artist: 'ODESZA',
      soundCloudUrl: 'https://soundcloud.com/odesza/say-my-name-feat-zyra',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/76/5d/55/765d554e-e421-0299-783f-d78ad559d5e5/5021392959191.png/600x600bb.jpg',
      duration: 262,
      genre: 'Electronic',
      playbackCount: '48.2M',
      waveformPoints: generateWaveform(101),
    },
    {
      id: 'reg-gl-2',
      title: 'Levels (Original Mix)',
      artist: 'Avicii',
      soundCloudUrl: 'https://soundcloud.com/aviciiofficial/avicii-levels-original-mix',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/67/38/43/67384338-9ed7-fc68-5927-93f1fcf4705d/11UMGIM36900.rgb.jpg/600x600bb.jpg',
      duration: 338,
      genre: 'Electronic',
      playbackCount: '78.5M',
      waveformPoints: generateWaveform(102),
    },
    {
      id: 'reg-gl-3',
      title: 'Starboy (feat. Daft Punk)',
      artist: 'The Weeknd',
      soundCloudUrl: 'https://soundcloud.com/theweeknd/starboy-feat-daft-punk',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg',
      duration: 230,
      genre: 'Hip-Hop',
      playbackCount: '112M',
      waveformPoints: generateWaveform(103),
    },
    {
      id: 'reg-gl-4',
      title: 'Danielle (smile on my face)',
      artist: 'Fred again..',
      soundCloudUrl: 'https://soundcloud.com/fredagain/danielle-smile-on-my-face',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e7/09/da/e709da20-1748-1845-b304-422667d242e4/5054197812194.jpg/600x600bb.jpg',
      duration: 201,
      genre: 'Electronic',
      playbackCount: '27.9M',
      waveformPoints: generateWaveform(104),
    },
    {
      id: 'reg-gl-5',
      title: 'Sunset Lover',
      artist: 'Petit Biscuit',
      soundCloudUrl: 'https://soundcloud.com/petitbiscuit/sunset-lover',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/78/1c/93/781c934a-c233-cfce-39db-31f7284969b4/cover.jpg/600x600bb.jpg',
      duration: 238,
      genre: 'Electronic',
      playbackCount: '84.5M',
      waveformPoints: generateWaveform(105),
    },
  ],

  us: [
    {
      id: 'reg-us-1',
      title: 'HUMBLE.',
      artist: 'Kendrick Lamar',
      soundCloudUrl: 'https://soundcloud.com/kendrick-lamar-music/humble',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg/600x600bb.jpg',
      duration: 177,
      genre: 'Hip-Hop',
      playbackCount: '88.0M',
      waveformPoints: generateWaveform(201),
    },
    {
      id: 'reg-us-2',
      title: 'Sunflower',
      artist: 'Post Malone & Swae Lee',
      soundCloudUrl: 'https://soundcloud.com/postmalone/sunflower',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4b/30/2c/4b302cb6-7a14-5464-4e97-0577e9d0be49/18UMGIM82277.rgb.jpg/600x600bb.jpg',
      duration: 158,
      genre: 'Hip-Hop',
      playbackCount: '92.3M',
      waveformPoints: generateWaveform(202),
    },
    {
      id: 'reg-us-3',
      title: 'Bangarang (feat. Sirah)',
      artist: 'Skrillex',
      soundCloudUrl: 'https://soundcloud.com/skrillex/bangarang-feat-sirah',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/1e/7f/5d/1e7f5d77-6a87-8713-2dea-e119567e0682/cover.jpg/600x600bb.jpg',
      duration: 215,
      genre: 'Electronic',
      playbackCount: '81.4M',
      waveformPoints: generateWaveform(203),
    },
    {
      id: 'reg-us-4',
      title: 'Shelter',
      artist: 'Porter Robinson & Madeon',
      soundCloudUrl: 'https://soundcloud.com/porter-robinson/porter-robinson-madeon-shelter',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7f/7e/e5/7f7ee593-6ce6-254a-3325-789f95c3c5fb/653738346720.png/600x600bb.jpg',
      duration: 219,
      genre: 'Electronic',
      playbackCount: '36.4M',
      waveformPoints: generateWaveform(204),
    },
    {
      id: 'reg-us-5',
      title: 'Crawl Outta Love (feat. Annika Wells)',
      artist: 'Illenium',
      soundCloudUrl: 'https://soundcloud.com/illeniumofficial/illenium-crawl-outta-love-feat-annika-wells',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/3a/32/00/3a3200f8-9682-22b0-545b-695f0e1a4070/192641002342.png/600x600bb.jpg',
      duration: 242,
      genre: 'Electronic',
      playbackCount: '32.1M',
      waveformPoints: generateWaveform(205),
    },
  ],

  gb: [
    {
      id: 'reg-gb-1',
      title: 'Danielle (smile on my face)',
      artist: 'Fred again..',
      soundCloudUrl: 'https://soundcloud.com/fredagain/danielle-smile-on-my-face',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e7/09/da/e709da20-1748-1845-b304-422667d242e4/5054197812194.jpg/600x600bb.jpg',
      duration: 201,
      genre: 'Electronic',
      playbackCount: '27.9M',
      waveformPoints: generateWaveform(301),
    },
    {
      id: 'reg-gb-2',
      title: 'Latch (feat. Sam Smith)',
      artist: 'Disclosure',
      soundCloudUrl: 'https://soundcloud.com/disclosuremusic/latch-feat-sam-smith',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d9/f2/2b/d9f22b74-8ef3-73d8-5da1-e5268c42f114/12UMGIM52120.rgb.jpg/600x600bb.jpg',
      duration: 256,
      genre: 'Electronic',
      playbackCount: '62.7M',
      waveformPoints: generateWaveform(302),
    },
    {
      id: 'reg-gb-3',
      title: 'Feel So Close',
      artist: 'Calvin Harris',
      soundCloudUrl: 'https://soundcloud.com/calvinharris/feel-so-close',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/15/ba/ec/15baec26-2db7-0abd-4197-76372183a628/mzi.xbpaeiac.jpg/600x600bb.jpg',
      duration: 206,
      genre: 'Electronic',
      playbackCount: '44.9M',
      waveformPoints: generateWaveform(303),
    },
    {
      id: 'reg-gb-4',
      title: 'Animals',
      artist: 'Martin Garrix',
      soundCloudUrl: 'https://soundcloud.com/martingarrix/martin-garrix-animals-original',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6e/1e/f0/6e1ef055-195a-bb73-d5a8-5926058366a5/8712944577525.png/600x600bb.jpg',
      duration: 304,
      genre: 'Electronic',
      playbackCount: '69.1M',
      waveformPoints: generateWaveform(304),
    },
    {
      id: 'reg-gb-5',
      title: 'Clarity (feat. Foxes)',
      artist: 'Zedd',
      soundCloudUrl: 'https://soundcloud.com/zedd/clarity',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d9/f2/2b/d9f22b74-8ef3-73d8-5da1-e5268c42f114/12UMGIM52120.rgb.jpg/600x600bb.jpg',
      duration: 271,
      genre: 'Electronic',
      playbackCount: '55.3M',
      waveformPoints: generateWaveform(305),
    },
  ],

  in: [
    {
      id: 'reg-in-1',
      title: 'Udd Gaye',
      artist: 'Ritviz',
      soundCloudUrl: 'https://soundcloud.com/ritviz/udd-gaye',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e2/e5/6f/e2e56f3d-0491-338e-c8d2-0f147b07d092/859745100557_cover.jpg/600x600bb.jpg',
      duration: 182,
      genre: 'Electronic',
      playbackCount: '24.5M',
      waveformPoints: generateWaveform(401),
    },
    {
      id: 'reg-in-2',
      title: 'Bass Rani',
      artist: 'Nucleya',
      soundCloudUrl: 'https://soundcloud.com/nucleya/bass-rani',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7e/3e/e2/7e3ee297-71cd-75e5-463e-0ea47049ddca/3614978401027_cover.jpg/600x600bb.jpg',
      duration: 204,
      genre: 'Electronic',
      playbackCount: '31.2M',
      waveformPoints: generateWaveform(402),
    },
    {
      id: 'reg-in-3',
      title: 'cold/mess',
      artist: 'Prateek Kuhad',
      soundCloudUrl: 'https://soundcloud.com/prateekkuhad/cold-mess',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/59/4f/41/594f4117-78b6-0699-340f-84bda46cbe6b/075679801531.jpg/600x600bb.jpg',
      duration: 284,
      genre: 'Indie',
      playbackCount: '19.4M',
      waveformPoints: generateWaveform(403),
    },
    {
      id: 'reg-in-4',
      title: 'Firestone (feat. Conrad Sewell)',
      artist: 'Kygo',
      soundCloudUrl: 'https://soundcloud.com/kygo/firestone',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b5/69/ad/b569ad82-3ac0-54a8-bafc-baf349491541/0617465690853.jpg/600x600bb.jpg',
      duration: 273,
      genre: 'Electronic',
      playbackCount: '63.8M',
      waveformPoints: generateWaveform(404),
    },
  ],

  fr: [
    {
      id: 'reg-fr-1',
      title: 'Sunset Lover',
      artist: 'Petit Biscuit',
      soundCloudUrl: 'https://soundcloud.com/petitbiscuit/sunset-lover',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/78/1c/93/781c934a-c233-cfce-39db-31f7284969b4/cover.jpg/600x600bb.jpg',
      duration: 238,
      genre: 'Electronic',
      playbackCount: '84.5M',
      waveformPoints: generateWaveform(501),
    },
    {
      id: 'reg-fr-2',
      title: 'Harder, Better, Faster, Stronger',
      artist: 'Daft Punk',
      soundCloudUrl: 'https://soundcloud.com/daftpunkofficial/harder-better-faster-stronger',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fd/4a/77/fd4a77db-0ebc-d043-41a2-f32fa1bb0fb4/dj.qrikkdwj.jpg/600x600bb.jpg',
      duration: 224,
      genre: 'Electronic',
      playbackCount: '45.1M',
      waveformPoints: generateWaveform(502),
    },
    {
      id: 'reg-fr-3',
      title: 'Midnight City',
      artist: 'M83',
      soundCloudUrl: 'https://soundcloud.com/m83/midnight-city',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/cb/7b/a9/cb7ba903-b5f1-cc21-90db-7a81b7aa0997/724596951057.jpg/600x600bb.jpg',
      duration: 243,
      genre: 'Synthwave',
      playbackCount: '58.4M',
      waveformPoints: generateWaveform(503),
    },
  ],

  de: [
    {
      id: 'reg-de-1',
      title: 'Resonance',
      artist: 'HOME',
      soundCloudUrl: 'https://soundcloud.com/home-2001/resonance',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4f/13/65/4f1365b0-e97c-c469-c438-2f7d8f204355/872133025584_cover.jpg/600x600bb.jpg',
      duration: 212,
      genre: 'Synthwave',
      playbackCount: '52.1M',
      waveformPoints: generateWaveform(601),
    },
    {
      id: 'reg-de-2',
      title: 'Strobe (Club Edit)',
      artist: 'deadmau5',
      soundCloudUrl: 'https://soundcloud.com/deadmau5/strobe-club-edit',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f7/24/19/f724197c-b6b7-b2ad-94a9-06b2f5f95455/617465226458.jpg/600x600bb.jpg',
      duration: 382,
      genre: 'Electronic',
      playbackCount: '33.2M',
      waveformPoints: generateWaveform(602),
    },
    {
      id: 'reg-de-3',
      title: 'Clarity (feat. Foxes)',
      artist: 'Zedd',
      soundCloudUrl: 'https://soundcloud.com/zedd/clarity',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d9/f2/2b/d9f22b74-8ef3-73d8-5da1-e5268c42f114/12UMGIM52120.rgb.jpg/600x600bb.jpg',
      duration: 271,
      genre: 'Electronic',
      playbackCount: '55.3M',
      waveformPoints: generateWaveform(603),
    },
  ],

  jp: [
    {
      id: 'reg-jp-1',
      title: 'Kingdom in Blue',
      artist: 'Kupla',
      soundCloudUrl: 'https://soundcloud.com/chilledcow/kupla-kingdom-in-blue',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f2/15/8d/f2158dec-ee67-6052-42c4-d044cede0436/859737277243.jpg/600x600bb.jpg',
      duration: 174,
      genre: 'Lo-Fi',
      playbackCount: '12.8M',
      waveformPoints: generateWaveform(701),
    },
    {
      id: 'reg-jp-2',
      title: 'Show Me How',
      artist: 'Men I Trust',
      soundCloudUrl: 'https://soundcloud.com/men-i-trust/show-me-how',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/cf/57/39/cf5739e6-332a-e64c-bed0-b763893c0517/artwork.jpg/600x600bb.jpg',
      duration: 215,
      genre: 'Indie',
      playbackCount: '18.7M',
      waveformPoints: generateWaveform(702),
    },
  ],

  au: [
    {
      id: 'reg-au-1',
      title: 'Never Be Like You (feat. Kai)',
      artist: 'Flume',
      soundCloudUrl: 'https://soundcloud.com/flume/never-be-like-you-feat-kai',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/29/f4/3b/29f43b3f-cbeb-2cdd-33d3-d3b6bd231a9d/112230.jpg/600x600bb.jpg',
      duration: 234,
      genre: 'Hip-Hop',
      playbackCount: '64.9M',
      waveformPoints: generateWaveform(801),
    },
    {
      id: 'reg-au-2',
      title: 'Innerbloom',
      artist: 'RÜFÜS DU SOL',
      soundCloudUrl: 'https://soundcloud.com/rufussounds/innerbloom',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/aa/5f/d8/aa5fd889-4c2e-7e24-e8b2-428beaf9d4fe/SWEATA009.jpg/600x600bb.jpg',
      duration: 578,
      genre: 'Electronic',
      playbackCount: '41.0M',
      waveformPoints: generateWaveform(802),
    },
    {
      id: 'reg-au-3',
      title: 'Light',
      artist: 'San Holo',
      soundCloudUrl: 'https://soundcloud.com/sanholobeats/light',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/da/42/3a/da423a5e-c482-c88b-d27b-0d2d41e3afc2/886446359960.jpg/600x600bb.jpg',
      duration: 240,
      genre: 'Electronic',
      playbackCount: '31.2M',
      waveformPoints: generateWaveform(803),
    },
  ],

  br: [
    {
      id: 'reg-br-1',
      title: 'Levels (Original Mix)',
      artist: 'Avicii',
      soundCloudUrl: 'https://soundcloud.com/aviciiofficial/avicii-levels-original-mix',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/67/38/43/67384338-9ed7-fc68-5927-93f1fcf4705d/11UMGIM36900.rgb.jpg/600x600bb.jpg',
      duration: 338,
      genre: 'Electronic',
      playbackCount: '78.5M',
      waveformPoints: generateWaveform(901),
    },
    {
      id: 'reg-br-2',
      title: 'Alone',
      artist: 'Marshmello',
      soundCloudUrl: 'https://soundcloud.com/marshmellomusic/alone',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7e/be/33/7ebe3370-959a-94f7-77e2-c9e7fea9a4ed/859716988917_cover.jpg/600x600bb.jpg',
      duration: 273,
      genre: 'Electronic',
      playbackCount: '72.0M',
      waveformPoints: generateWaveform(902),
    },
  ],

  ca: [
    {
      id: 'reg-ca-1',
      title: 'Starboy (feat. Daft Punk)',
      artist: 'The Weeknd',
      soundCloudUrl: 'https://soundcloud.com/theweeknd/starboy-feat-daft-punk',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg',
      duration: 230,
      genre: 'Hip-Hop',
      playbackCount: '112M',
      waveformPoints: generateWaveform(1001),
    },
    {
      id: 'reg-ca-2',
      title: 'Strobe (Club Edit)',
      artist: 'deadmau5',
      soundCloudUrl: 'https://soundcloud.com/deadmau5/strobe-club-edit',
      artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f7/24/19/f724197c-b6b7-b2ad-94a9-06b2f5f95455/617465226458.jpg/600x600bb.jpg',
      duration: 382,
      genre: 'Electronic',
      playbackCount: '33.2M',
      waveformPoints: generateWaveform(1002),
    },
  ],
};

const STORAGE_KEY_REGION = 'soundwave_user_region';

// Detect initial region from browser timezone or locale
export function detectDefaultRegion(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_REGION);
    if (saved && REGIONS.some((r) => r.id === saved)) {
      return saved;
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = (navigator.language || '').toLowerCase();

    if (tz.includes('Calcutta') || tz.includes('Kolkata') || lang.includes('en-in') || lang.includes('hi')) return 'in';
    if (tz.includes('London') || lang.includes('en-gb')) return 'gb';
    if (tz.includes('Paris') || lang.includes('fr')) return 'fr';
    if (tz.includes('Berlin') || lang.includes('de')) return 'de';
    if (tz.includes('Tokyo') || lang.includes('ja')) return 'jp';
    if (tz.includes('Sydney') || tz.includes('Melbourne') || lang.includes('en-au')) return 'au';
    if (tz.includes('Sao_Paulo') || lang.includes('pt-br')) return 'br';
    if (tz.includes('Toronto') || tz.includes('Vancouver') || lang.includes('en-ca')) return 'ca';
    if (tz.includes('America') || lang.includes('en-us')) return 'us';
  } catch {
    // fallback
  }

  return 'global';
}

export function saveUserRegion(regionId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_REGION, regionId);
  } catch {
    // ignore
  }
}
