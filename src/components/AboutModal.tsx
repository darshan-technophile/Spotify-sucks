import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Heart, Sparkles, ShieldCheck, Flame, Radio } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GITHUB_REPO_URL = 'https://github.com/darshan-technophile/Spotify-sucks';

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
              <span>Sp*tify sucks!</span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                Truly Free
              </span>
            </h2>
            <p className="text-xs text-neutral-400">
              Crafted with <Heart className="w-3 h-3 inline text-red-500 fill-current mx-0.5" /> by{' '}
              <span className="font-semibold text-neutral-200">Darshan</span>
            </p>
          </div>
        </div>

        {/* The Backstory */}
        <div className="space-y-3 text-xs leading-relaxed text-neutral-300 bg-neutral-950/60 border border-neutral-850 rounded-xl p-4">
          <div className="flex items-center gap-2 text-orange-400 font-semibold font-mono text-[11px] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Why this exists</span>
          </div>
          <p>
            This app was born out of pure frustration with having to subscribe to{' '}
            <strong className="text-neutral-100 font-semibold">Spotify Premium</strong> just to get
            an ad-free, unhindered listening experience.
          </p>
          <p>
            Why should listening to uninterrupted music require monthly paywalls, forced shuffles,
            and 6-skip hourly limits? <strong className="text-orange-300">Sp*tify sucks!</strong> is
            designed to deliver a clean, fast, truly free music player powered by full-length SoundCloud
            streaming.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-850 flex items-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-neutral-200 block">Zero Audio Ads</span>
              <span className="text-neutral-400 text-[10px]">No annoying commercial interruptions</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-850 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-neutral-200 block">Full Length Tracks</span>
              <span className="text-neutral-400 text-[10px]">Complete songs, never 30s snippets</span>
            </div>
          </div>
        </div>

        {/* GitHub Repository CTA */}
        <div className="pt-1">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-neutral-950 font-semibold text-xs transition-all shadow-md group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Github className="w-4 h-4 fill-current" />
              <span>View project on GitHub</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
