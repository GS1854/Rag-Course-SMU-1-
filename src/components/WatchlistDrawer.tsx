import React from 'react';
import { X, Trash2, ArrowUpRight, TrendingUp } from 'lucide-react';
import { MarketItem } from '../types/market';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistItems: MarketItem[];
  onRemoveItem: (id: string) => void;
  onSelectItem: (item: MarketItem) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistItems,
  onRemoveItem,
  onSelectItem
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-2xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#e0e3eb] animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e0e3eb] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-[#131722]">My Watchlist</h2>
            <span className="text-xs bg-[#f0f3f6] px-2 py-0.5 rounded-full font-mono font-bold text-[#2962ff]">
              {watchlistItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6a6d78] hover:text-[#131722] hover:bg-[#f0f3f6] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {watchlistItems.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#6a6d78] space-y-2">
              <TrendingUp className="w-10 h-10 mx-auto text-gray-300 stroke-1" />
              <p className="font-semibold text-[#131722]">Your watchlist is empty</p>
              <p className="text-xs">Click the bookmark icon on any index or stock to track it here.</p>
            </div>
          ) : (
            watchlistItems.map(item => {
              const isPositive = item.changeValue >= 0;

              return (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-[#e0e3eb] hover:border-[#2962ff]/40 bg-white hover:bg-[#f0f3f6]/40 transition-all flex items-center justify-between group cursor-pointer"
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs"
                      style={{ background: item.badgeBg || item.logoBg || '#2962ff' }}
                    >
                      {item.logoLetter || item.badgeText || item.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-bold text-[#131722] text-sm group-hover:text-[#2962ff] flex items-center gap-1">
                        <span>{item.symbol}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-[#6a6d78] truncate max-w-[120px] sm:max-w-[150px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-semibold text-sm font-mono tabular-nums text-[#131722]">
                        ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <span
                        className={`text-xs font-bold font-mono tabular-nums ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </span>
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onRemoveItem(item.id);
                      }}
                      className="p-1.5 text-gray-300 hover:text-[#f23645] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e0e3eb] bg-[#fafbfc] text-xs text-[#6a6d78] flex items-center justify-between">
          <span>Synced locally</span>
          <span>TradingView Watchlist</span>
        </div>
      </div>
    </div>
  );
};
