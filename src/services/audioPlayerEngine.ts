/**
 * SoundCloud Streaming Engine.
 * Streams full-length tracks using the official SoundCloud Widget API.
 * Ref: https://developers.soundcloud.com/docs/api/html5-widget
 */

import { scService } from './soundCloudWidget';

type StateListener = (state: {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  soundData?: any;
  error?: string | null;
}) => void;

class AudioPlayerEngine {
  private listeners: StateListener[] = [];
  private onEndCallback: (() => void) | null = null;
  private currentTime = 0;
  private duration = 0;
  private isPlaying = false;
  private isLoading = false;

  constructor() {
    this.setupListeners();
  }

  private setupListeners(): void {
    // Bind to official SoundCloud Widget events
    scService.bind('ready', () => {
      this.isLoading = false;
      this.emitState({ isLoading: false });
    });

    scService.bind('play', () => {
      this.isPlaying = true;
      this.isLoading = false;
      this.emitState({ isPlaying: true, isLoading: false, error: null });

      // Fetch full duration and sound metadata
      scService.getDuration((durSec) => {
        if (durSec > 0) {
          this.duration = durSec;
          this.emitState({ duration: durSec });
        }
      });

      scService.getCurrentSound((sound) => {
        if (sound) {
          if (sound.duration) {
            this.duration = Math.floor(sound.duration / 1000);
          }
          this.emitState({ soundData: sound, duration: this.duration });
        }
      });
    });

    scService.bind('pause', () => {
      this.isPlaying = false;
      this.emitState({ isPlaying: false });
    });

    scService.bind('playProgress', (data?: { currentPosition?: number; relativePosition?: number }) => {
      if (data && typeof data.currentPosition === 'number') {
        const curSec = Math.floor(data.currentPosition / 1000);
        this.currentTime = curSec;
        this.emitState({
          currentTime: curSec,
          isPlaying: true,
          isLoading: false,
        });
      }
    });

    scService.bind('finish', () => {
      this.isPlaying = false;
      this.currentTime = 0;
      this.emitState({ isPlaying: false, currentTime: 0 });
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    });
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public onEnded(callback: () => void): void {
    this.onEndCallback = callback;
  }

  private emitState(partial: {
    isPlaying?: boolean;
    currentTime?: number;
    duration?: number;
    isLoading?: boolean;
    soundData?: any;
    error?: string | null;
  }): void {
    const currentState = {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      isLoading: this.isLoading,
      ...partial,
    };
    if (partial.isPlaying !== undefined) this.isPlaying = partial.isPlaying;
    if (partial.currentTime !== undefined) this.currentTime = partial.currentTime;
    if (partial.duration !== undefined) this.duration = partial.duration;
    if (partial.isLoading !== undefined) this.isLoading = partial.isLoading;

    this.listeners.forEach((fn) => fn(currentState));
  }

  public playTrack(options: {
    soundCloudUrl: string;
    volume: number;
    isMuted: boolean;
    duration?: number;
  }): void {
    const { soundCloudUrl, volume, isMuted, duration } = options;

    this.isLoading = true;
    this.currentTime = 0;
    if (duration && duration > 0) {
      this.duration = duration;
    }
    this.emitState({ isLoading: true, currentTime: 0, duration: this.duration });

    scService.loadTrack(soundCloudUrl, true, () => {
      scService.setVolume(isMuted ? 0 : volume);
      scService.play();
      this.isLoading = false;
      this.emitState({ isPlaying: true, isLoading: false });
    });
  }

  public play(): void {
    scService.play();
    this.isPlaying = true;
    this.emitState({ isPlaying: true });
  }

  public pause(): void {
    scService.pause();
    this.isPlaying = false;
    this.emitState({ isPlaying: false });
  }

  public seekTo(seconds: number): void {
    scService.seekTo(seconds);
    this.currentTime = Math.floor(seconds);
    this.emitState({ currentTime: Math.floor(seconds) });
  }

  public forward(seconds = 10): void {
    const target = this.currentTime + seconds;
    this.seekTo(target);
  }

  public rewind(seconds = 10): void {
    const target = Math.max(0, this.currentTime - seconds);
    this.seekTo(target);
  }

  public setVolume(volume: number, isMuted: boolean): void {
    scService.setVolume(isMuted ? 0 : volume);
  }
}

export const audioEngine = new AudioPlayerEngine();
