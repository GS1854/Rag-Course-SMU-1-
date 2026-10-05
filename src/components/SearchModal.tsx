import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ArrowRight, CornerDownLeft } from 'lucide-react';
import { MarketItem, AssetType } from '../types/market';
import { ALL_ASSETS } from '../data/marketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MarketItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | AssetType>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);

  const filteredAssets = ALL_ASSETS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredAssets.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && filteredAssets[selectedIndex]) {
      e.preventDefault();
      onSelectItem(filteredAssets[selectedIndex]);
      onClose();
    }
  };

  const categories: { id: 'all' | AssetType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'stock', label: 'Stocks' },
    { id: 'index', label: 'Indices' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'commodity', label: 'Commodities' },
    { id: 'forex', label: 'Forex' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#e0e3eb] shadow-2xl rounded-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-[#e0e3eb] p-4 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#6a6d78] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search symbol, company, index, crypto..."
            className="w-full text-base font-medium text-[#131722] placeholder-[#6a6d78] outline-hidden bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#6a6d78] hover:text-[#131722] rounded-full hover:bg-[#f0f3f6] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] text-[#6a6d78] bg-[#f0f3f6] border border-[#e0e3eb] px-1.5 py-0.5 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-1 px-4 py-2 border-b border-[#e0e3eb] bg-[#fafbfc] overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#2962ff] text-white shadow-2xs'
                  : 'text-[#6a6d78] hover:text-[#131722] hover:bg-[#e0e3eb]/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#e0e3eb]/40">
          {filteredAssets.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#6a6d78]">
              No symbols found matching "{query}"
            </div>
          ) : (
            filteredAssets.map((asset, index) => {
              const isSelected = selectedIndex === index;
              const isPositive = asset.changeValue >= 0;

              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectItem(asset);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-3.5 py-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#f0f3f6]' : 'hover:bg-[#f0f3f6]/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs"
                      style={{ background: asset.badgeBg || asset.logoBg || '#2962ff' }}
                    >
                      {asset.logoLetter || asset.badgeText || asset.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#131722] text-sm">{asset.symbol}</span>
                        <span className="text-[10px] uppercase font-bold text-[#6a6d78] bg-white border border-[#e0e3eb] px-1 rounded">
                          {asset.type}
                        </span>
                      </div>
                      <div className="text-xs text-[#6a6d78] truncate max-w-xs">{asset.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-sm font-mono tabular-nums text-[#131722]">
                      {asset.type === 'forex' ? (
                        asset.price.toFixed(4)
                      ) : (
                        `$${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      )}
                    </div>
                    <div
                      className={`text-xs font-bold font-mono tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[#e0e3eb] bg-[#fafbfc] text-[11px] text-[#6a6d78] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Use ↑ ↓ to navigate</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              Press <CornerDownLeft className="w-3 h-3" /> to select
            </span>
          </div>
          <span>TradingView Global Search</span>
        </div>
      </div>
    </div>
  );
};
