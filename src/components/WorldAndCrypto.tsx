import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketItem } from '../types/market';

interface WorldAndCryptoProps {
  worldIndices: MarketItem[];
  cryptoMarkets: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  recentTicks: Record<string, 'up' | 'down'>;
}

export const WorldAndCrypto: React.FC<WorldAndCryptoProps> = ({
  worldIndices,
  cryptoMarkets,
  onSelectItem,
  recentTicks
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* World Indices Table Block */}
      <section className="border border-[#e0e3eb] rounded-xl p-5 bg-white shadow-2xs" data-purpose="world-indices">
        <div className="flex items-center justify-between pb-4 border-b border-[#e0e3eb]">
          <div>
            <button
              onClick={() => onSelectItem(worldIndices[0])}
              className="text-lg font-bold text-[#131722] flex items-center gap-1 cursor-pointer hover:text-[#2962ff] transition-colors"
            >
              <span>World indices</span>
              <ChevronRight className="w-4 h-4 text-[#6a6d78] stroke-[2.5]" />
            </button>
            <span className="text-xs text-[#6a6d78]">Europe, Asia-Pacific & Americas</span>
          </div>
          <button
            onClick={() => onSelectItem(worldIndices[0])}
            className="text-xs font-semibold text-[#2962ff] hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="divide-y divide-[#e0e3eb] text-sm mt-1">
          {worldIndices.map(index => {
            const isPositive = index.changeValue >= 0;
            const tickStatus = recentTicks[index.id];

            return (
              <div
                key={index.id}
                onClick={() => onSelectItem(index)}
                className={`py-3 flex items-center justify-between hover:bg-[#f0f3f6]/60 px-2.5 rounded-lg transition-colors cursor-pointer select-none ${
                  tickStatus === 'up' ? 'flash-up' : tickStatus === 'down' ? 'flash-down' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl" role="img" aria-label={index.country || 'country'}>
                    {index.flag || '🌐'}
                  </span>
                  <div>
                    <span className="font-bold text-[#131722] block group-hover:text-[#2962ff]">
                      {index.name}
                    </span>
                    <span className="text-xs text-[#6a6d78]">{index.subtext}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold font-mono tabular-nums text-[#131722]">
                    {index.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span
                    className={`text-xs font-bold font-mono tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${index.changePercent.toFixed(2)}%` : `${index.changePercent.toFixed(2)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Crypto Overview Block */}
      <section className="border border-[#e0e3eb] rounded-xl p-5 bg-white shadow-2xs" data-purpose="crypto-markets">
        <div className="flex items-center justify-between pb-4 border-b border-[#e0e3eb]">
          <div>
            <button
              onClick={() => onSelectItem(cryptoMarkets[0])}
              className="text-lg font-bold text-[#131722] flex items-center gap-1 cursor-pointer hover:text-[#2962ff] transition-colors"
            >
              <span>Crypto</span>
              <ChevronRight className="w-4 h-4 text-[#6a6d78] stroke-[2.5]" />
            </button>
            <span className="text-xs text-[#6a6d78]">Top digital currencies by market cap</span>
          </div>
          <button
            onClick={() => onSelectItem(cryptoMarkets[0])}
            className="text-xs font-semibold text-[#2962ff] hover:underline cursor-pointer"
          >
            View 100+ coins
          </button>
        </div>

        <div className="divide-y divide-[#e0e3eb] text-sm mt-1">
          {cryptoMarkets.map(coin => {
            const isPositive = coin.changeValue >= 0;
            const tickStatus = recentTicks[coin.id];

            return (
              <div
                key={coin.id}
                onClick={() => onSelectItem(coin)}
                className={`py-3 flex items-center justify-between hover:bg-[#f0f3f6]/60 px-2.5 rounded-lg transition-colors cursor-pointer select-none ${
                  tickStatus === 'up' ? 'flash-up' : tickStatus === 'down' ? 'flash-down' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0"
                    style={{ background: coin.logoBg || '#f7931a' }}
                  >
                    {coin.logoLetter}
                  </div>
                  <div>
                    <span className="font-bold text-[#131722] block group-hover:text-[#2962ff]">
                      {coin.name}
                    </span>
                    <span className="text-xs text-[#6a6d78]">{coin.symbol}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold font-mono tabular-nums text-[#131722]">
                    ${coin.price >= 1000 
                      ? coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : coin.price.toFixed(coin.price < 2 ? 4 : 2)}
                  </div>
                  <span
                    className={`text-xs font-bold font-mono tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${coin.changePercent.toFixed(2)}%` : `${coin.changePercent.toFixed(2)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
