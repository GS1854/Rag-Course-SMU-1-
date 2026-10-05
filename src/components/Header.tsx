import React, { useState } from 'react';
import { Globe, User, Search, ChevronDown, Bookmark, Activity, Sparkles, Check } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  onOpenHeatmap: () => void;
  liveStreaming: boolean;
  onToggleLiveStreaming: () => void;
  onOpenAuth: () => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  onOpenHeatmap,
  liveStreaming,
  onToggleLiveStreaming,
  onOpenAuth,
  selectedRegion,
  onSelectRegion
}) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'JA', name: '日本語' },
    { code: 'ZH', name: '中文' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e0e3eb] px-4 lg:px-7 h-16 flex items-center justify-between transition-colors">
      {/* Left Navigation: Logo, Search, Main Links */}
      <div className="flex items-center space-x-5 lg:space-x-7">
        {/* TradingView Logo Mark */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2 text-[#131722] hover:opacity-80 transition-opacity cursor-pointer"
          title="TradingView Home"
        >
          <svg className="h-6 w-8 text-black" fill="currentColor" viewBox="0 0 36 28">
            <path d="M14 22H7V6h7v16zm15-16h-7v10h7V6zm-7 16h7V18h-7v4zM0 2h36v2H0V2z" />
          </svg>
        </button>

        {/* Quick Search Bar Pill (Matching Screenshot: Search (Ctrl+K)) */}
        <div className="relative hidden sm:block w-52 lg:w-64">
          <button
            onClick={onOpenSearch}
            className="w-full h-9 bg-[#f0f3f6] hover:bg-[#e4e8ee] transition-colors text-[#6a6d78] text-sm rounded-full pl-9 pr-3 flex items-center justify-between text-left cursor-pointer group"
            type="button"
          >
            <span className="flex items-center text-xs lg:text-[13px] font-medium text-[#6a6d78] group-hover:text-[#131722]">
              Search (Ctrl+K)
            </span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] text-[#6a6d78] bg-white border border-[#e0e3eb] px-1.5 py-0.5 rounded font-mono shadow-2xs">
              ⌘K
            </kbd>
            <Search className="w-4 h-4 text-[#6a6d78] absolute left-3 top-2.5 group-hover:text-[#2962ff] transition-colors" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center space-x-6 text-[15px] font-medium">
          <button 
            onClick={() => onSelectRegion('all')}
            className="text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer py-1"
          >
            Products
          </button>
          
          <button 
            onClick={onOpenHeatmap}
            className="text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            title="Open Stock Heatmap"
          >
            <span>Community</span>
            <span className="inline-flex items-center text-[10px] font-bold text-[#2962ff] bg-[#e7f0fe] px-1.5 py-0.2 rounded">Heatmap</span>
          </button>

          {/* Active Tab: Markets with TV Blue highlight */}
          <button 
            onClick={() => onSelectRegion('all')}
            className="text-[#2962ff] font-semibold border-b-2 border-[#2962ff] py-5 -mb-px flex items-center cursor-pointer"
          >
            Markets
          </button>

          <button 
            onClick={() => onSelectRegion('us')}
            className="text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer py-1"
          >
            Brokers
          </button>

          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="text-[#131722] hover:text-[#2962ff] transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180 text-[#2962ff]' : ''}`} />
            </button>

            {moreOpen && (
              <div 
                className="absolute left-0 mt-3 w-56 bg-white border border-[#e0e3eb] shadow-xl rounded-xl py-2 z-50 text-sm"
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  onClick={() => { onOpenHeatmap(); setMoreOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-[#f0f3f6] text-[#131722] flex items-center justify-between"
                >
                  <span className="font-medium">Market Heatmap</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#2962ff]" />
                </button>
                <button
                  onClick={() => { onOpenWatchlist(); setMoreOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-[#f0f3f6] text-[#131722] flex items-center justify-between"
                >
                  <span>My Watchlist</span>
                  <span className="text-xs bg-[#f0f3f6] px-1.5 py-0.5 rounded font-mono">{watchlistCount}</span>
                </button>
                <div className="border-t border-[#e0e3eb] my-1" />
                <button
                  onClick={() => { onToggleLiveStreaming(); setMoreOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-[#f0f3f6] text-[#131722] flex items-center justify-between text-xs"
                >
                  <span>Live Stream Feed</span>
                  <span className={`w-2 h-2 rounded-full ${liveStreaming ? 'bg-[#089981]' : 'bg-[#6a6d78]'}`} />
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Right Navigation Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 text-[#131722] hover:bg-[#f0f3f6] rounded-full transition-colors cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-[#6a6d78]" />
        </button>

        {/* Live Streaming Indicator Toggle */}
        <button
          onClick={onToggleLiveStreaming}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-[#e0e3eb] hover:bg-[#f0f3f6] transition-colors cursor-pointer"
          title={liveStreaming ? "Live tick updates active (Click to pause)" : "Updates paused (Click to resume)"}
        >
          <span className={`w-2 h-2 rounded-full ${liveStreaming ? 'bg-[#089981] animate-pulse' : 'bg-[#6a6d78]'}`} />
          <span className="text-[#6a6d78] text-[11px] font-mono">{liveStreaming ? 'LIVE' : 'PAUSED'}</span>
        </button>

        {/* Watchlist Quick Button */}
        <button
          onClick={onOpenWatchlist}
          className="relative p-2 text-[#131722] hover:text-[#2962ff] hover:bg-[#f0f3f6] rounded-full transition-colors cursor-pointer"
          title="Open Watchlist"
        >
          <Bookmark className="w-5 h-5" />
          {watchlistCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#2962ff] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {watchlistCount}
            </span>
          )}
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            aria-label="Language selection"
            className="flex items-center space-x-1.5 text-sm font-semibold text-[#131722] hover:text-[#2962ff] px-2 py-1.5 rounded-md hover:bg-[#f0f3f6] transition-colors cursor-pointer"
            type="button"
          >
            <Globe className="w-4 h-4 text-[#131722]" />
            <span className="text-xs uppercase">{currentLang}</span>
          </button>

          {langOpen && (
            <div 
              className="absolute right-0 mt-2 w-36 bg-white border border-[#e0e3eb] shadow-xl rounded-xl py-1 z-50 text-xs"
              onMouseLeave={() => setLangOpen(false)}
            >
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setCurrentLang(l.code); setLangOpen(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-[#f0f3f6] flex items-center justify-between"
                >
                  <span className={currentLang === l.code ? 'font-bold text-[#2962ff]' : 'text-[#131722]'}>
                    {l.name}
                  </span>
                  {currentLang === l.code && <Check className="w-3.5 h-3.5 text-[#2962ff]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Action */}
        <button
          onClick={onOpenAuth}
          aria-label="User account"
          className="p-2 text-[#131722] hover:text-[#2962ff] hover:bg-[#f0f3f6] rounded-full transition-colors cursor-pointer"
          type="button"
        >
          <User className="w-5 h-5" />
        </button>

        {/* Get Started Button with Signature Blue-Purple Gradient */}
        <button
          onClick={onOpenAuth}
          className="gradient-pill text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-xs hover:opacity-95 active:scale-98 transition-all inline-flex items-center cursor-pointer"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
