import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Volume2,
  Volume1,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
  ExternalLink,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { DEFAULT_ARTWORK } from '../services/searchService';

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export const PlayerBar: React.FC = () => {
  const {
    currentTrack,
    playbackState,
    queue,
    togglePlay,
    playNext,
    playPrevious,
    forward,
    rewind,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    isQueueOpen,
    setIsQueueOpen,
  } = useMusic();

  const [hoverSeekTime, setHoverSeekTime] = useState<number | null>(null);
  const [hoverPositionX, setHoverPositionX] = useState<number>(0);

  const { isPlaying, isLoading, currentTime, duration, volume, isMuted, isShuffle, repeatMode } =
    playbackState;

  const currentPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPositionX(e.clientX - rect.left);
    setHoverSeekTime(ratio * (duration || 1));
  };

  const handleSeekMouseLeave = () => {
    setHoverSeekTime(null);
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(ratio * (duration || 1));
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800/80 px-4 md:px-6 py-2.5 select-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Track Info */}
        <div className="flex items-center gap-3 min-w-0 w-1/4">
          <div className="relative shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
            <img
              src={currentTrack.artworkUrl || DEFAULT_ARTWORK}
              alt={currentTrack.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-neutral-100 truncate">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-neutral-400 truncate mt-0.5">
              {currentTrack.artist}
            </p>
          </div>

          <a
            href={currentTrack.soundCloudUrl}
            target="_blank"
            rel="noreferrer"
            title="SoundCloud link"
            className="text-neutral-600 hover:text-orange-400 transition-colors shrink-0 hidden sm:inline"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Center: Controls + Timeline */}
        <div className="flex flex-col items-center gap-1 flex-1 max-w-md">
          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Shuffle */}
            <button
              onClick={toggleShuffle}
              className={`p-1 rounded transition-colors cursor-pointer ${
                isShuffle ? 'text-orange-500' : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title="Shuffle"
              aria-label="Toggle shuffle"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>

            {/* Previous */}
            <button
              onClick={playPrevious}
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Previous"
              aria-label="Previous song"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Rewind 10s */}
            <button
              onClick={() => rewind(10)}
              className="p-1 text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer relative group"
              title="Rewind 10 seconds"
              aria-label="Rewind 10 seconds"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 text-[8px] font-mono text-neutral-500 group-hover:text-orange-400 leading-none">
                10
              </span>
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-white text-neutral-950 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            {/* Forward 10s */}
            <button
              onClick={() => forward(10)}
              className="p-1 text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer relative group"
              title="Forward 10 seconds"
              aria-label="Forward 10 seconds"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 text-[8px] font-mono text-neutral-500 group-hover:text-orange-400 leading-none">
                10
              </span>
            </button>

            {/* Next */}
            <button
              onClick={playNext}
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Next"
              aria-label="Next song"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Repeat */}
            <button
              onClick={toggleRepeat}
              className={`p-1 rounded transition-colors cursor-pointer ${
                repeatMode !== 'off' ? 'text-orange-500' : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title={`Repeat: ${repeatMode}`}
              aria-label="Toggle repeat"
            >
              {repeatMode === 'one' ? (
                <Repeat1 className="w-3.5 h-3.5" />
              ) : (
                <Repeat className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Timeline Scrubber */}
          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] font-mono tabular-nums text-neutral-500 w-8 text-right">
              {formatTime(currentTime)}
            </span>

            <div
              className="relative flex-1 h-3 flex items-center cursor-pointer group"
              onClick={handleSeekClick}
              onMouseMove={handleSeekMouseMove}
              onMouseLeave={handleSeekMouseLeave}
            >
              {hoverSeekTime !== null && (
                <div
                  className="absolute -top-5 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-[9px] font-mono text-neutral-200 pointer-events-none transform -translate-x-1/2"
                  style={{ left: `${hoverPositionX}px` }}
                >
                  {formatTime(hoverSeekTime)}
                </div>
              )}

              <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-300 group-hover:bg-orange-500 rounded-full transition-all"
                  style={{ width: `${currentPercent}%` }}
                />
              </div>
            </div>

            <span className="text-[10px] font-mono tabular-nums text-neutral-500 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Volume & Queue */}
        <div className="flex items-center justify-end gap-3 w-1/4">
          {/* Volume */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label="Toggle mute"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
              ) : volume < 50 ? (
                <Volume1 className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 accent-orange-500"
              aria-label="Volume slider"
            />
          </div>

          {/* Queue toggle */}
          <button
            onClick={() => setIsQueueOpen(!isQueueOpen)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              isQueueOpen
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
            title="Queue"
            aria-label="Toggle queue"
          >
            <ListMusic className="w-4 h-4" />
            {queue.length > 0 && (
              <span className="text-[10px] font-mono font-medium text-orange-400">
                {queue.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
