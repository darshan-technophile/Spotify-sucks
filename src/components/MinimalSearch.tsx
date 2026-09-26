import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Play,
  Plus,
  ListPlus,
  Loader2,
  Link2,
  ExternalLink,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { Track } from '../types/music';
import {
  searchTracks,
  isSoundCloudUrl,
  parseSoundCloudUrl,
  DEFAULT_ARTWORK,
  SEARCH_INDEX,
} from '../services/searchService';
import {
  REGIONS,
  REGIONAL_TRACKS,
  detectDefaultRegion,
  saveUserRegion,
} from '../services/regionService';
import { formatTime } from './PlayerBar';
import { WaveformVisualizer } from './WaveformVisualizer';

const QUICK_SEARCH_CHIPS = [
  'ODESZA',
  'Starboy',
  'Daft Punk',
  'Fred again',
  'Flume',
  'Sunset Lover',
  'Avicii',
  'Lofi study',
  'Synthwave',
];

export const MinimalSearch: React.FC = () => {
  const { currentTrack, playbackState, playTrack, addToQueue } = useMusic();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Region state
  const [selectedRegionId, setSelectedRegionId] = useState<string>(() => detectDefaultRegion());
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const regionMenuRef = useRef<HTMLDivElement>(null);

  // Close region dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (regionMenuRef.current && !regionMenuRef.current.contains(e.target as Node)) {
        setIsRegionMenuOpen(false);
      }
    };
    if (isRegionMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isRegionMenuOpen]);

  const handleSelectRegion = (regionId: string) => {
    setSelectedRegionId(regionId);
    saveUserRegion(regionId);
    setIsRegionMenuOpen(false);
  };

  const selectedRegion = REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];
  const regionalTracks = REGIONAL_TRACKS[selectedRegionId] || REGIONAL_TRACKS.global;

  // Search effect with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const res = await searchTracks(query);
      setResults(res);
      setIsSearching(false);
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const handleQuickSearch = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const isLink = isSoundCloudUrl(query);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Minimal Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
          {isSearching ? (
            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs, artists, or paste a SoundCloud link..."
          className="w-full pl-11 pr-10 py-3.5 bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 focus:border-neutral-700 rounded-xl text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all shadow-sm"
          autoFocus
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Direct Link Detected Banner */}
      {isLink && (
        <div className="p-3.5 rounded-xl bg-orange-950/30 border border-orange-500/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Link2 className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="text-orange-200 font-medium truncate">
              SoundCloud link detected: ready to stream
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                const parsed = parseSoundCloudUrl(query);
                if (parsed) playTrack(parsed);
              }}
              className="px-3 py-1 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold rounded-lg transition-colors cursor-pointer"
            >
              Play
            </button>
            <button
              onClick={() => {
                const parsed = parseSoundCloudUrl(query);
                if (parsed) addToQueue(parsed, 'end');
              }}
              className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium rounded-lg transition-colors cursor-pointer"
            >
              + Queue
            </button>
          </div>
        </div>
      )}

      {/* Search Results List */}
      {query.trim() ? (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-2 pb-1 font-mono">
            <span>
              {isSearching
                ? 'Searching...'
                : `${results.length} ${results.length === 1 ? 'match' : 'matches'}`}
            </span>
            <span>SoundCloud Audio</span>
          </div>

          {results.length === 0 && !isSearching ? (
            <div className="py-16 text-center text-neutral-500 text-xs border border-dashed border-neutral-900 rounded-xl">
              <p>No songs found for "{query}".</p>
              <p className="mt-1 text-neutral-600">
                Try a different artist or paste any exact SoundCloud URL.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-900 border border-neutral-800/80 rounded-xl overflow-hidden bg-neutral-950/70">
              {results.map((track) => {
                const isCurrent = currentTrack.id === track.id;
                const isPlaying = isCurrent && playbackState.isPlaying;

                return (
                  <div
                    key={track.id}
                    className={`group flex items-center justify-between gap-3 p-3 transition-colors ${
                      isCurrent
                        ? 'bg-neutral-900/80'
                        : 'hover:bg-neutral-900/50'
                    }`}
                  >
                    {/* Artwork + Play button */}
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-neutral-900 shrink-0">
                      <img
                        src={track.artworkUrl || DEFAULT_ARTWORK}
                        alt={track.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => playTrack(track)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-orange-400 cursor-pointer"
                        title="Play"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>
                      {isPlaying && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
                          <span className="flex items-end gap-0.5 h-3">
                            <span className="w-0.5 bg-orange-400 animate-[bounce_0.6s_ease-in-out_infinite] h-full" />
                            <span className="w-0.5 bg-orange-400 animate-[bounce_0.8s_ease-in-out_infinite_0.15s] h-3/4" />
                            <span className="w-0.5 bg-orange-400 animate-[bounce_0.5s_ease-in-out_infinite_0.3s] h-full" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1">
                      <h4
                        onClick={() => playTrack(track)}
                        className={`text-xs font-semibold truncate cursor-pointer ${
                          isCurrent ? 'text-orange-400' : 'text-neutral-200 group-hover:text-white'
                        }`}
                      >
                        {track.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {track.artist}
                      </p>
                    </div>

                    {/* Duration */}
                    <span className="text-[11px] font-mono tabular-nums text-neutral-500 shrink-0 hidden sm:inline">
                      {formatTime(track.duration)}
                    </span>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => playTrack(track)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-orange-500 text-neutral-300 hover:text-neutral-950 transition-colors cursor-pointer"
                        title="Play Now"
                        aria-label="Play song"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        onClick={() => addToQueue(track, 'end')}
                        className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                        title="Add to queue"
                      >
                        <Plus className="w-3 h-3 text-orange-400" />
                        <span>Queue</span>
                      </button>

                      <button
                        onClick={() => addToQueue(track, 'next')}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer hidden md:flex items-center"
                        title="Play Next"
                        aria-label="Add as up next"
                      >
                        <ListPlus className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={track.soundCloudUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-neutral-600 hover:text-orange-400 transition-colors"
                        title="Open in SoundCloud"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Empty / Idle State */
        <div className="space-y-7 pt-2">
          {/* Quick search chips */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2.5">
              Quick Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_SEARCH_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleQuickSearch(chip)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Popular in your region */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                  Popular in your region
                </span>
                <span className="text-sm select-none" title={selectedRegion.name}>
                  {selectedRegion.flag}
                </span>
              </div>

              {/* Region Selector dropdown */}
              <div className="relative" ref={regionMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-[11px] font-medium text-neutral-200 hover:text-white transition-colors cursor-pointer"
                  aria-label="Change region"
                >
                  <Globe className="w-3.5 h-3.5 text-orange-400" />
                  <span>{selectedRegion.name}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {isRegionMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-xl shadow-2xl py-1 z-30 max-h-64 overflow-y-auto divide-y divide-neutral-800/60">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                      Select Region
                    </div>
                    <div className="py-1">
                      {REGIONS.map((region) => {
                        const isSelected = region.id === selectedRegionId;
                        return (
                          <button
                            key={region.id}
                            type="button"
                            onClick={() => handleSelectRegion(region.id)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-orange-500/15 text-orange-400 font-medium'
                                : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{region.flag}</span>
                              <span>{region.name}</span>
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* List of regional tracks */}
            <div className="divide-y divide-neutral-900 border border-neutral-850 rounded-xl overflow-hidden bg-neutral-950/60">
              {regionalTracks.map((track) => {
                const isCurrent = currentTrack.id === track.id;
                const isPlaying = isCurrent && playbackState.isPlaying;

                return (
                  <div
                    key={track.id}
                    className={`flex items-center justify-between gap-3 p-2.5 transition-colors ${
                      isCurrent ? 'bg-neutral-900/80' : 'hover:bg-neutral-900/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <img
                        src={track.artworkUrl || DEFAULT_ARTWORK}
                        alt={track.title}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p
                          onClick={() => playTrack(track)}
                          className={`text-xs font-semibold truncate cursor-pointer ${
                            isCurrent ? 'text-orange-400' : 'text-neutral-200 hover:text-white'
                          }`}
                        >
                          {track.title}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate">
                          {track.artist}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono tabular-nums text-neutral-500 shrink-0">
                      {formatTime(track.duration)}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => playTrack(track)}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-orange-500 text-neutral-300 hover:text-neutral-950 border border-neutral-800 transition-colors cursor-pointer"
                        title="Play Full Song"
                        aria-label="Play song"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button
                        onClick={() => addToQueue(track, 'end')}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title="Add to Queue"
                        aria-label="Add song to queue"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Currently loaded track showcase */}
          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-850 space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono text-[11px] uppercase tracking-wider">Loaded Track</span>
              <span className="font-mono text-[11px] text-orange-400/90">
                {playbackState.isPlaying ? 'Streaming' : 'Ready'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-800">
                <img
                  src={currentTrack.artworkUrl || DEFAULT_ARTWORK}
                  alt={currentTrack.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-neutral-100 truncate">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-neutral-400 truncate mt-0.5">
                  {currentTrack.artist}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono mt-1">
                  <span>{formatTime(playbackState.currentTime)}</span>
                  <span aria-hidden="true">/</span>
                  <span>{formatTime(playbackState.duration)}</span>
                </div>
              </div>
            </div>

            {/* Subtle waveform visualizer */}
            <div className="pt-2 border-t border-neutral-800/60">
              <WaveformVisualizer height={28} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
