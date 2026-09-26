/**
 * Types for SoundWave Studio music streaming & queue management.
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  artistUrl?: string;
  soundCloudUrl: string;
  audioStreamUrl?: string;
  artworkUrl: string;
  duration: number; // in seconds
  genre: 'Electronic' | 'Lo-Fi' | 'Indie' | 'Hip-Hop' | 'Synthwave' | 'Ambient';
  playbackCount?: string;
  likes?: string;
  waveformPoints?: number[];
  description?: string;
}

export interface QueueItem extends Track {
  queueId: string;
  addedAt: number;
}

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlaybackState {
  isPlaying: boolean;
  isLoading: boolean;
  isReady: boolean;
  currentTime: number; // in seconds
  duration: number; // in seconds
  volume: number; // 0 - 100
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  seekProgress: number; // 0 - 1
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  trackIds: string[];
  createdAt: number;
}
