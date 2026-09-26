import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import { formatTime } from './PlayerBar';

interface WaveformVisualizerProps {
  className?: string;
  height?: number; // px
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  className = '',
  height = 56,
}) => {
  const { currentTrack, playbackState, seekTo } = useMusic();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const points = currentTrack.waveformPoints || [];
  const count = points.length || 48;
  const { seekProgress, isPlaying, duration } = playbackState;

  const currentActiveIndex = Math.floor(seekProgress * count);

  const handleBarClick = (idx: number) => {
    const ratio = idx / (count - 1);
    seekTo(ratio * duration);
  };

  return (
    <div className={`relative flex items-center justify-between gap-[2px] md:gap-[3px] select-none ${className}`}>
      {Array.from({ length: count }).map((_, idx) => {
        const heightRatio = points[idx] ?? (0.3 + ((idx * 7) % 10) * 0.07);
        const barHeight = Math.max(6, Math.round(heightRatio * height));
        const isPassed = idx <= currentActiveIndex;
        const isHovered = hoverIndex !== null && idx <= hoverIndex;

        // Dynamic pulse when playing
        const isCurrentPulse = isPlaying && idx === currentActiveIndex;

        return (
          <div
            key={idx}
            onClick={() => handleBarClick(idx)}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
            className="flex-1 flex flex-col justify-end items-center h-full cursor-pointer py-1 group/bar"
            style={{ height: `${height}px` }}
          >
            <div
              className={`w-full rounded-full transition-all duration-100 ${
                isPassed
                  ? 'bg-gradient-to-t from-orange-600 to-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.4)]'
                  : isHovered
                  ? 'bg-neutral-600'
                  : 'bg-neutral-800'
              } ${isCurrentPulse ? 'scale-y-125' : ''}`}
              style={{
                height: `${barHeight}px`,
              }}
            />
          </div>
        );
      })}

      {/* Hover preview tooltip */}
      {hoverIndex !== null && (
        <div
          className="absolute -top-7 px-2 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-[10px] font-mono text-orange-300 pointer-events-none shadow-md transform -translate-x-1/2"
          style={{ left: `${(hoverIndex / count) * 100}%` }}
        >
          {formatTime((hoverIndex / count) * duration)}
        </div>
      )}
    </div>
  );
};
