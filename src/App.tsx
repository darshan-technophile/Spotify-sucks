import React, { useEffect, useState } from 'react';
import { MusicProvider, useMusic } from './context/MusicContext';
import { MinimalSearch } from './components/MinimalSearch';
import { PlayerBar } from './components/PlayerBar';
import { MinimalQueue } from './components/MinimalQueue';
import { SoundCloudWidgetFrame } from './components/SoundCloudWidgetFrame';
import { Toast } from './components/Toast';
import { AboutModal, GITHUB_REPO_URL } from './components/AboutModal';
import { ListMusic, Radio, Volume2, Info, Github, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    togglePlay,
    playNext,
    forward,
    rewind,
    toggleMute,
    queue,
    isQueueOpen,
    setIsQueueOpen,
    autoplayBlocked,
    unlockAudio,
  } = useMusic();

  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        playNext();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        forward(10);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        rewind(10);
      } else if (e.key.toLowerCase() === 'q') {
        e.preventDefault();
        setIsQueueOpen(!isQueueOpen);
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, playNext, forward, rewind, toggleMute, isQueueOpen, setIsQueueOpen]);

  return (
    <div
      onClick={autoplayBlocked ? unlockAudio : undefined}
      className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-200"
    >
      {/* Autoplay blocked banner */}
      {autoplayBlocked && (
        <div className="bg-orange-500 text-neutral-950 font-semibold text-xs px-4 py-1.5 text-center flex items-center justify-center gap-2 cursor-pointer">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Browser requires an interaction to enable sound. Click anywhere to unmute.</span>
        </div>
      )}

      {/* Minimal Header */}
      <header className="w-full border-b border-neutral-900 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-neutral-900 flex items-center justify-center text-orange-500">
            <Radio className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold tracking-tight text-neutral-100">Sp*tify sucks!</span>
        </div>

        <div className="flex items-center gap-2">
          {/* About Button */}
          <button
            onClick={() => setIsAboutOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer"
            title="About Sp*tify sucks!"
          >
            <Info className="w-3.5 h-3.5 text-orange-400" />
            <span>About</span>
          </button>

          {/* GitHub Repo Button */}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer"
            title="GitHub Repository"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Queue Button */}
          <button
            onClick={() => setIsQueueOpen(!isQueueOpen)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer"
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>Queue</span>
            {queue.length > 0 && (
              <span className="font-mono text-[10px] text-orange-400 tabular-nums">
                ({queue.length})
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content: Search Centered */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 pt-8 pb-28">
        <MinimalSearch />

        {/* Footer with Darshan credit and GitHub link */}
        <footer className="mt-14 pt-6 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <span>Made with <Heart className="w-3 h-3 inline text-red-500 fill-current" /> by <strong className="text-neutral-300 font-semibold">Darshan</strong></span>
            <span>•</span>
            <button
              onClick={() => setIsAboutOpen(true)}
              className="text-neutral-400 hover:text-orange-400 transition-colors underline underline-offset-2 cursor-pointer"
            >
              Why Sp*tify sucks
            </button>
          </div>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer"
          >
            <Github className="w-3.5 h-3.5 fill-current" />
            <span>darshan-technophile/Spotify-sucks</span>
          </a>
        </footer>
      </main>

      {/* SoundCloud Audio Engine */}
      <SoundCloudWidgetFrame />

      {/* Minimal Player Bar */}
      <PlayerBar />

      {/* Minimal Queue Drawer */}
      <MinimalQueue />

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Toast Feedback */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}
