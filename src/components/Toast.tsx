import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useMusic();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-6 z-50 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="px-4 py-2.5 rounded-xl bg-neutral-900/95 border border-orange-500/40 shadow-2xl shadow-black/80 flex items-center gap-2.5 backdrop-blur-md">
        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
        <span className="text-xs font-medium text-neutral-100">{toastMessage}</span>
      </div>
    </div>
  );
};
