import React, { useState } from 'react';
import { ChevronDown, Check, Globe2, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedRegion,
  onSelectRegion
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const regionOptions = [
    { id: 'all', title: 'Markets, everywhere', subtitle: 'Global indices, stocks, crypto, & commodities' },
    { id: 'us', title: 'US Markets', subtitle: 'NYSE, NASDAQ, S&P 500, Dow 30' },
    { id: 'europe', title: 'European Markets', subtitle: 'DAX 40, FTSE 100, CAC 40, Euro Stoxx' },
    { id: 'asia', title: 'Asia-Pacific', subtitle: 'Nikkei 225, Hang Seng, NIFTY 50' },
    { id: 'crypto', title: 'Crypto Markets', subtitle: 'Bitcoin, Ethereum, Solana & Altcoins' },
    { id: 'commodities', title: 'Commodities & Forex', subtitle: 'Gold, Oil, Natural Gas, Currencies' }
  ];

  const currentOption = regionOptions.find(o => o.id === selectedRegion) || regionOptions[0];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 sm:pt-10 pb-4 text-center relative" data-purpose="hero-title">
      {/* Big Headline from image "Markets, everywhere" with dropdown chevron */}
      <div className="relative inline-block">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="inline-flex items-center justify-center cursor-pointer group space-x-2.5 outline-hidden"
          type="button"
          aria-expanded={dropdownOpen}
        >
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#131722] group-hover:text-black transition-colors leading-tight">
            {currentOption.title}
          </h1>
          <ChevronDown
            className={`w-7 h-7 sm:w-10 sm:h-10 text-[#131722] transition-transform duration-200 stroke-[2.8] ${
              dropdownOpen ? 'rotate-180 text-[#2962ff]' : 'group-hover:translate-y-0.5'
            }`}
          />
        </button>

        {/* Dropdown menu to filter markets */}
        {dropdownOpen && (
          <div 
            className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 sm:w-96 bg-white border border-[#e0e3eb] shadow-2xl rounded-2xl py-2 z-50 text-left overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#6a6d78] border-b border-[#e0e3eb] bg-[#fafbfc]">
              Select Market View
            </div>
            <div className="p-1 space-y-0.5 max-h-80 overflow-y-auto">
              {regionOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSelectRegion(option.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center justify-between transition-colors ${
                    selectedRegion === option.id 
                      ? 'bg-[#e7f0fe] text-[#2962ff]' 
                      : 'hover:bg-[#f0f3f6] text-[#131722]'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm">{option.title}</div>
                    <div className="text-xs text-[#6a6d78]">{option.subtitle}</div>
                  </div>
                  {selectedRegion === option.id && <Check className="w-4 h-4 text-[#2962ff] shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subtext and live status indicator */}
      <div className="mt-2 flex items-center justify-center gap-2 text-xs text-[#6a6d78]">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#089981] animate-ping" />
          <span>Real-time Global Quotes</span>
        </span>
        <span aria-hidden="true">·</span>
        <span>Equities, Indices, Crypto, FX & Futures</span>
      </div>
    </section>
  );
};
