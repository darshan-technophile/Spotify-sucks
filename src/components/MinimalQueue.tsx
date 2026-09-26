import React from 'react';
import { X, Trash2, ChevronUp, ChevronDown, Play, ListMusic } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { formatTime } from './PlayerBar';
import { DEFAULT_ARTWORK } from '../services/searchService';

export const MinimalQueue: React.FC = () => {
  const {
    currentTrack,
    queue,
    isQueueOpen,
    setIsQueueOpen,
    removeFromQueue,
    moveQueueItem,
    clearQueue,
    playTrack,
    playbackState,
  } = useMusic();

  if (!isQueueOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
      onClick={() => setIsQueueOpen(false)}
    >
      <div
        className="w-full max-w-sm h-full bg-neutral-950 border-l border-neutral-800 shadow-2xl flex flex-col p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <ListMusic className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-bold text-neutral-100">Queue ({queue.length})</h3>
          </div>
          <div className="flex items-center gap-2">
            {queue.length > 0 && (
              <button
                onClick={clearQueue}
                className="text-[11px] text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                title="Clear queue"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsQueueOpen(false)}
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Close queue"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Now Playing Bar */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
            Now Playing
          </span>
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-3">
            <img
              src={currentTrack.artworkUrl || DEFAULT_ARTWORK}
              alt={currentTrack.title}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-neutral-100 truncate">
                {currentTrack.title}
              </p>
              <p className="text-[11px] text-neutral-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
            {playbackState.isPlaying && (
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping shrink-0" />
            )}
          </div>
        </div>

        {/* Up Next List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
            Up Next
          </span>

          {queue.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">
              Queue is empty. Search songs to queue them.
            </div>
          ) : (
            <div className="space-y-1.5">
              {queue.map((item, index) => (
                <div
                  key={item.queueId}
                  className="group flex items-center justify-between gap-2 p-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-805 transition-colors"
                >
                  <img
                    src={item.artworkUrl || DEFAULT_ARTWORK}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded object-cover shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-neutral-200 truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {item.artist}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono tabular-nums text-neutral-500 shrink-0">
                    {formatTime(item.duration)}
                  </span>

                  <div className="flex items-center gap-0.5 shrink-0 opacity-70 group-hover:opacity-100">
                    <button
                      onClick={() => {
                        removeFromQueue(item.queueId);
                        playTrack(item);
                      }}
                      className="p-1 text-neutral-400 hover:text-orange-400 cursor-pointer"
                      title="Play now"
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                    <button
                      onClick={() => moveQueueItem(item.queueId, 'up')}
                      disabled={index === 0}
                      className="p-1 text-neutral-500 hover:text-white disabled:opacity-20 cursor-pointer"
                      title="Move up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => moveQueueItem(item.queueId, 'down')}
                      disabled={index === queue.length - 1}
                      className="p-1 text-neutral-500 hover:text-white disabled:opacity-20 cursor-pointer"
                      title="Move down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromQueue(item.queueId)}
                      className="p-1 text-neutral-500 hover:text-red-400 cursor-pointer"
                      title="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
