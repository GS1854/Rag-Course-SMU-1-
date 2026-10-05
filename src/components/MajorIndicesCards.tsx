import React from 'react';
import { MarketItem } from '../types/market';

interface MajorIndicesCardsProps {
  indices: MarketItem[];
  onSelectIndex: (item: MarketItem) => void;
  recentTicks: Record<string, 'up' | 'down'>;
}

export const MajorIndicesCards: React.FC<MajorIndicesCardsProps> = ({
  indices,
  onSelectIndex,
  recentTicks
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-10" data-purpose="major-indices-cards">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {indices.map(item => {
          const isPositive = item.changeValue >= 0;
          const tickStatus = recentTicks[item.id];

          return (
            <div
              key={item.id}
              onClick={() => onSelectIndex(item)}
              className={`bg-white border border-[#e0e3eb] hover:border-[#2962ff]/50 hover:shadow-md transition-all rounded-xl p-5 flex flex-col justify-between cursor-pointer group select-none ${
                tickStatus === 'up' ? 'flash-up' : tickStatus === 'down' ? 'flash-down' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-6 h-6 rounded-full text-white text-[11px] font-bold flex items-center justify-center shadow-2xs"
                      style={{ backgroundColor: item.badgeBg || '#d32f2f' }}
                    >
                      {item.badgeText || item.symbol.slice(0, 3)}
                    </span>
                    <span className="font-bold text-base text-[#131722] group-hover:text-[#2962ff] transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-[#6a6d78] uppercase font-medium">
                      {item.symbol}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      isPositive
                        ? 'text-[#089981] bg-[#e6f6f2]'
                        : 'text-[#f23645] bg-[#fdedef]'
                    }`}
                  >
                    {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                  </span>
                </div>

                <div className="mt-3 flex items-baseline space-x-2">
                  <span className="text-2xl font-bold tracking-tight text-[#131722] font-mono tabular-nums">
                    {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-sm font-semibold font-mono tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${item.changeValue.toFixed(2)}` : item.changeValue.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Sparkline Chart */}
              <div className="mt-4 pt-2">
                <svg className="w-full h-12 overflow-visible" viewBox="0 0 200 40">
                  <path
                    className={item.sparklineColor === 'red' ? 'sparkline-red' : 'sparkline-green'}
                    d={item.sparklineD || (isPositive ? 'M0,28 Q50,30 100,18 T200,6' : 'M0,8 Q50,15 100,24 T200,32')}
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
