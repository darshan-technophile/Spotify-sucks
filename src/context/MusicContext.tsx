import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Track, QueueItem, PlaybackState, RepeatMode } from '../types/music';
import { SEARCH_INDEX } from '../services/searchService';
import { audioEngine } from '../services/audioPlayerEngine';

interface MusicContextType {
  currentTrack: Track;
  queue: QueueItem[];
  playbackState: PlaybackState;
  isQueueOpen: boolean;
  toastMessage: string | null;
  autoplayBlocked: boolean;
  // Controls
  playTrack: (track: Track) => void;
  addToQueue: (track: Track, position?: 'next' | 'end') => void;
  removeFromQueue: (queueId: string) => void;
  moveQueueItem: (queueId: string, direction: 'up' | 'down') => void;
  clearQueue: () => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (seconds: number) => void;
  forward: (seconds?: number) => void;
  rewind: (seconds?: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setIsQueueOpen: (open: boolean) => void;
  showToast: (message: string) => void;
  unlockAudio: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

const STORAGE_KEY_VOLUME = 'soundwave_volume';

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialTrack = SEARCH_INDEX[0];
  const [currentTrack, setCurrentTrack] = useState<Track>(initialTrack);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [playbackHistory, setPlaybackHistory] = useState<Track[]>([]);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const [playbackState, setPlaybackState] = useState<PlaybackState>(() => {
    let initialVol = 85;
    try {
      const savedVol = localStorage.getItem(STORAGE_KEY_VOLUME);
      if (savedVol) initialVol = Number(savedVol);
    } catch {
      // fallback
    }
    return {
      isPlaying: false,
      isLoading: false,
      isReady: true,
      currentTime: 0,
      duration: initialTrack.duration,
      volume: initialVol,
      isMuted: false,
      isShuffle: false,
      repeatMode: 'off',
      seekProgress: 0,
    };
  });

  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const prevVolumeRef = useRef<number>(playbackState.volume);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  }, []);

  // Save volume to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VOLUME, playbackState.volume.toString());
    } catch {
      // ignore
    }
  }, [playbackState.volume]);

  // Connect Audio Player Engine events
  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setPlaybackState((prev) => {
        const dur = state.duration > 0 ? state.duration : prev.duration;
        return {
          ...prev,
          isPlaying: state.isPlaying,
          isLoading: state.isLoading,
          currentTime: state.currentTime,
          duration: dur,
          seekProgress: dur > 0 ? state.currentTime / dur : 0,
        };
      });

      if (state.soundData) {
        const soundSec = state.soundData.duration ? Math.floor(state.soundData.duration / 1000) : 0;
        const soundArtwork = state.soundData.artwork_url
          ? state.soundData.artwork_url.replace('-large', '-t500x500')
          : null;

        setCurrentTrack((prev) => ({
          ...prev,
          duration: soundSec > 0 ? soundSec : prev.duration,
          artworkUrl: soundArtwork || prev.artworkUrl,
        }));
      }
    });

    audioEngine.onEnded(() => {
      handleTrackEnd();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Play next track in queue
  const playNext = useCallback(() => {
    if (queue.length > 0) {
      const [nextTrack, ...remainingQueue] = queue;
      setQueue(remainingQueue);
      playTrack(nextTrack);
    } else if (playbackState.isShuffle) {
      const randomTracks = SEARCH_INDEX.filter((t) => t.id !== currentTrack.id);
      const randomIndex = Math.floor(Math.random() * randomTracks.length);
      const randomTrack = randomTracks[randomIndex] || SEARCH_INDEX[0];
      playTrack(randomTrack);
    } else {
      setPlaybackState((prev) => ({ ...prev, isPlaying: false, currentTime: 0, seekProgress: 0 }));
      audioEngine.pause();
    }
  }, [queue, playbackState.isShuffle, currentTrack]);

  // Track ended handler (with repeat modes)
  const handleTrackEnd = useCallback(() => {
    setPlaybackState((prev) => {
      if (prev.repeatMode === 'one') {
        audioEngine.seekTo(0);
        audioEngine.play();
        return prev;
      }
      setTimeout(() => {
        playNext();
      }, 200);
      return prev;
    });
  }, [playNext]);

  // Play a specific track via SoundCloud Widget
  const playTrack = useCallback(
    (track: Track) => {
      setCurrentTrack((prevCurrent) => {
        if (prevCurrent && prevCurrent.id !== track.id) {
          setPlaybackHistory((prevHist) => [prevCurrent, ...prevHist.slice(0, 19)]);
        }
        return track;
      });

      setPlaybackState((prev) => ({
        ...prev,
        isPlaying: true,
        isLoading: true,
        currentTime: 0,
        duration: track.duration,
        seekProgress: 0,
      }));

      audioEngine.playTrack({
        soundCloudUrl: track.soundCloudUrl,
        volume: playbackState.volume,
        isMuted: playbackState.isMuted,
        duration: track.duration,
      });

      showToast(`Streaming ${track.title}`);
    },
    [playbackState.volume, playbackState.isMuted, showToast]
  );

  // Add to Queue
  const addToQueue = useCallback((track: Track, position: 'next' | 'end' = 'end') => {
    const queueItem: QueueItem = {
      ...track,
      queueId: `q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      addedAt: Date.now(),
    };

    setQueue((prevQueue) => {
      if (position === 'next') {
        return [queueItem, ...prevQueue];
      } else {
        return [...prevQueue, queueItem];
      }
    });

    showToast(position === 'next' ? `Added next: ${track.title}` : `Queued: ${track.title}`);
  }, [showToast]);

  // Remove from Queue
  const removeFromQueue = useCallback((queueId: string) => {
    setQueue((prev) => prev.filter((item) => item.queueId !== queueId));
  }, []);

  // Move queue item up or down
  const moveQueueItem = useCallback((queueId: string, direction: 'up' | 'down') => {
    setQueue((prev) => {
      const idx = prev.findIndex((item) => item.queueId === queueId);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[targetIdx];
      next[targetIdx] = temp;
      return next;
    });
  }, []);

  // Clear queue
  const clearQueue = useCallback(() => {
    setQueue([]);
    showToast('Queue cleared');
  }, [showToast]);

  // Play previous track
  const playPrevious = useCallback(() => {
    if (playbackState.currentTime > 3) {
      audioEngine.seekTo(0);
      setPlaybackState((prev) => ({ ...prev, currentTime: 0, seekProgress: 0 }));
      return;
    }

    if (playbackHistory.length > 0) {
      const [prevTrack, ...remainingHist] = playbackHistory;
      setPlaybackHistory(remainingHist);
      playTrack(prevTrack);
    } else {
      audioEngine.seekTo(0);
      setPlaybackState((prev) => ({ ...prev, currentTime: 0, seekProgress: 0 }));
    }
  }, [playbackState.currentTime, playbackHistory, playTrack]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (playbackState.isPlaying) {
      audioEngine.pause();
    } else {
      if (playbackState.currentTime === 0) {
        playTrack(currentTrack);
      } else {
        audioEngine.play();
      }
    }
  }, [playbackState.isPlaying, playbackState.currentTime, playTrack, currentTrack]);

  // Seek
  const seekTo = useCallback((seconds: number) => {
    const clamped = Math.max(0, Math.min(playbackState.duration, seconds));
    audioEngine.seekTo(clamped);
    setPlaybackState((prev) => ({
      ...prev,
      currentTime: Math.floor(clamped),
      seekProgress: prev.duration > 0 ? clamped / prev.duration : 0,
    }));
  }, [playbackState.duration]);

  // Forward 10 seconds
  const forward = useCallback((seconds = 10) => {
    audioEngine.forward(seconds);
    showToast(`+${seconds}s`);
  }, [showToast]);

  // Rewind 10 seconds
  const rewind = useCallback((seconds = 10) => {
    audioEngine.rewind(seconds);
    showToast(`-${seconds}s`);
  }, [showToast]);

  // Set volume
  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(100, val));
    audioEngine.setVolume(clamped, playbackState.isMuted);
    setPlaybackState((prev) => ({
      ...prev,
      volume: clamped,
      isMuted: clamped === 0,
    }));
  }, [playbackState.isMuted]);

  // Mute / Unmute
  const toggleMute = useCallback(() => {
    setPlaybackState((prev) => {
      const nextMuted = !prev.isMuted;
      audioEngine.setVolume(prev.volume, nextMuted);
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  // Shuffle toggle
  const toggleShuffle = useCallback(() => {
    setPlaybackState((prev) => {
      const nextShuffle = !prev.isShuffle;
      showToast(nextShuffle ? 'Shuffle on' : 'Shuffle off');
      return { ...prev, isShuffle: nextShuffle };
    });
  }, [showToast]);

  // Repeat toggle
  const toggleRepeat = useCallback(() => {
    setPlaybackState((prev) => {
      let nextMode: RepeatMode = 'off';
      if (prev.repeatMode === 'off') nextMode = 'all';
      else if (prev.repeatMode === 'all') nextMode = 'one';
      else nextMode = 'off';

      const labels = {
        off: 'Repeat off',
        all: 'Repeat on',
        one: 'Repeat track',
      };
      showToast(labels[nextMode]);
      return { ...prev, repeatMode: nextMode };
    });
  }, [showToast]);

  const unlockAudio = useCallback(() => {
    audioEngine.play();
    setAutoplayBlocked(false);
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        queue,
        playbackState,
        isQueueOpen,
        toastMessage,
        autoplayBlocked,
        playTrack,
        addToQueue,
        removeFromQueue,
        moveQueueItem,
        clearQueue,
        togglePlay,
        playNext,
        playPrevious,
        seekTo,
        forward,
        rewind,
        setVolume,
        toggleMute,
        toggleShuffle,
        toggleRepeat,
        setIsQueueOpen,
        showToast,
        unlockAudio,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
