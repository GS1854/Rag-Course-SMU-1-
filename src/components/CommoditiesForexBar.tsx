import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketItem } from '../types/market';

interface CommoditiesForexBarProps {
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  recentTicks: Record<string, 'up' | 'down'>;
}

export const CommoditiesForexBar: React.FC<CommoditiesForexBarProps> = ({
  items,
  onSelectItem,
  recentTicks
}) => {
  return (
    <section className="border border-[#e0e3eb] rounded-xl p-5 bg-[#fafbfc]" data-purpose="commodities-forex">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onSelectItem(items[0])}
          className="text-base font-bold text-[#131722] flex items-center gap-1.5 cursor-pointer hover:text-[#2962ff] transition-colors"
        >
          <span>Futures & Commodities</span>
          <ChevronRight className="w-4 h-4 text-[#6a6d78] stroke-[2.5]" />
        </button>
        <span className="text-xs text-[#6a6d78]">Live 24h continuous data</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map(item => {
          const isPositive = item.changeValue >= 0;
          const tickStatus = recentTicks[item.id];

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className={`bg-white p-3.5 rounded-lg border border-[#e0e3eb] hover:border-[#2962ff]/50 hover:shadow-xs transition-all cursor-pointer group select-none ${
                tickStatus === 'up' ? 'flash-up' : tickStatus === 'down' ? 'flash-down' : ''
              }`}
            >
              <div className="text-xs font-semibold text-[#6a6d78] group-hover:text-[#2962ff] transition-colors truncate">
                {item.name}
              </div>
              <div className="font-bold text-sm mt-1 text-[#131722] font-mono tabular-nums">
                {item.type === 'forex' ? (
                  item.price.toFixed(4)
                ) : (
                  `$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                )}
              </div>
              <div
                className={`text-xs font-bold font-mono tabular-nums mt-0.5 ${
                  isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
