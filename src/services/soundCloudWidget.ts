/**
 * SoundCloud Widget API Service wrapper.
 * Manages communication with the official SoundCloud iframe widget.
 * Ref: https://developers.soundcloud.com/docs/api/html5-widget
 */

// Declare window SC types
declare global {
  interface Window {
    SC?: {
      Widget: {
        (iframe: HTMLIFrameElement | string): SoundCloudWidgetInstance;
        Events: {
          LOAD_PROGRESS: string;
          PLAY_PROGRESS: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
          SEEK: string;
          READY: string;
          ERROR: string;
        };
      };
    };
  }
}

export interface SoundCloudWidgetInstance {
  bind: (eventName: string, listener: (data?: any) => void) => void;
  unbind: (eventName: string) => void;
  load: (url: string, options?: { auto_play?: boolean; callback?: () => void }) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seekTo: (milliseconds: number) => void;
  setVolume: (volume: number) => void;
  next: () => void;
  prev: () => void;
  skip: (soundIndex: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  getDuration: (callback: (duration: number) => void) => void;
  getPosition: (callback: (position: number) => void) => void;
  getSounds: (callback: (sounds: any[]) => void) => void;
  getCurrentSound: (callback: (sound: any) => void) => void;
  getCurrentSoundIndex: (callback: (index: number) => void) => void;
  isPaused: (callback: (paused: boolean) => void) => void;
}

class SoundCloudService {
  private widget: SoundCloudWidgetInstance | null = null;
  private isReady = false;
  private readyCallbacks: (() => void)[] = [];
  private eventListeners: { [event: string]: ((data?: any) => void)[] } = {};

  public init(iframeElement: HTMLIFrameElement): void {
    if (!window.SC || !window.SC.Widget) {
      setTimeout(() => this.init(iframeElement), 150);
      return;
    }

    try {
      this.widget = window.SC.Widget(iframeElement);

      this.widget.bind(window.SC.Widget.Events.READY, () => {
        this.isReady = true;
        this.readyCallbacks.forEach((cb) => cb());
        this.readyCallbacks = [];
      });

      // Bind all registered listeners
      Object.entries(this.eventListeners).forEach(([event, fns]) => {
        fns.forEach((fn) => {
          this.widget?.bind(event, fn);
        });
      });
    } catch (err) {
      console.warn('Error initializing SoundCloud Widget:', err);
    }
  }

  public onReady(callback: () => void): void {
    if (this.isReady && this.widget) {
      callback();
    } else {
      this.readyCallbacks.push(callback);
    }
  }

  public getWidget(): SoundCloudWidgetInstance | null {
    return this.widget;
  }

  public loadTrack(url: string, autoPlay = true, callback?: () => void): void {
    if (!this.widget) {
      this.onReady(() => this.loadTrack(url, autoPlay, callback));
      return;
    }

    this.widget.load(url, {
      auto_play: autoPlay,
      callback: () => {
        if (callback) callback();
      },
    });
  }

  public play(): void {
    this.widget?.play();
  }

  public pause(): void {
    this.widget?.pause();
  }

  public toggle(): void {
    this.widget?.toggle();
  }

  public seekTo(seconds: number): void {
    if (!this.widget) return;
    this.widget.seekTo(Math.max(0, seconds * 1000));
  }

  public forward(seconds = 10): void {
    if (!this.widget) return;
    this.getPosition((posMs) => {
      this.seekTo((posMs / 1000) + seconds);
    });
  }

  public rewind(seconds = 10): void {
    if (!this.widget) return;
    this.getPosition((posMs) => {
      this.seekTo(Math.max(0, (posMs / 1000) - seconds));
    });
  }

  public setVolume(volume: number): void {
    if (!this.widget) return;
    // SoundCloud Widget expects volume 0 to 100
    this.widget.setVolume(Math.max(0, Math.min(100, Math.round(volume))));
  }

  public getDuration(callback: (durationSeconds: number) => void): void {
    if (!this.widget) return;
    this.widget.getDuration((ms) => {
      callback(Math.floor((ms || 0) / 1000));
    });
  }

  public getPosition(callback: (positionMs: number) => void): void {
    if (!this.widget) return;
    this.widget.getPosition(callback);
  }

  public getCurrentSound(callback: (sound: any) => void): void {
    if (!this.widget) return;
    this.widget.getCurrentSound(callback);
  }

  public bind(event: string, callback: (data?: any) => void): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
    this.widget?.bind(event, callback);
  }

  public unbind(event: string, callback?: (data?: any) => void): void {
    if (callback && this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter((fn) => fn !== callback);
    }
    this.widget?.unbind(event);
  }
}

export const scService = new SoundCloudService();
