import React, { useEffect, useRef, useState } from 'react';
import { useMusic } from '../context/MusicContext';
import { scService } from '../services/soundCloudWidget';
import { isSoundCloudUrl } from '../services/searchService';
import { Disc, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const DEFAULT_SC_URL = 'https://soundcloud.com/odesza/say-my-name-feat-zyra';

export const SoundCloudWidgetFrame: React.FC = () => {
  const { currentTrack } = useMusic();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  useEffect(() => {
    if (iframeRef.current) {
      scService.init(iframeRef.current);
    }
  }, []);

  const isRealSoundCloud =
    Boolean(currentTrack.soundCloudUrl) &&
    isSoundCloudUrl(currentTrack.soundCloudUrl) &&
    !currentTrack.soundCloudUrl.includes('/search/');

  const targetUrl = isRealSoundCloud ? currentTrack.soundCloudUrl : DEFAULT_SC_URL;

  const widgetSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    targetUrl
  )}&color=%23f97316&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

  return (
    <div className="fixed bottom-16 right-4 z-30 max-w-sm w-full transition-all">
      {/* Expand / Collapse toggle for SoundCloud Widget */}
      <div className="flex justify-end mb-1">
        <button
          onClick={() => setIsWidgetVisible(!isWidgetVisible)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-[10px] font-mono text-neutral-400 hover:text-orange-400 transition-colors shadow-lg cursor-pointer backdrop-blur-sm"
          title="Toggle SoundCloud visual player"
        >
          <Disc className="w-3 h-3 text-orange-500 animate-spin-slow" />
          <span>SoundCloud Player</span>
          {isWidgetVisible ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
      </div>

      {/* Frame Container */}
      <div
        className={`bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-200 ${
          isWidgetVisible
            ? 'h-36 opacity-100 pointer-events-auto'
            : 'h-6 opacity-5 pointer-events-none'
        }`}
      >
        <iframe
          ref={iframeRef}
          id="sc-player-frame"
          title="SoundCloud Stream Engine"
          width="100%"
          height={isWidgetVisible ? '144' : '24'}
          scrolling="no"
          frameBorder="no"
          allow="autoplay; encrypted-media; fullscreen"
          src={widgetSrc}
        />
      </div>
    </div>
  );
};
