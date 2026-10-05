import React, { useState } from 'react';
import { X, Sparkles, Filter } from 'lucide-react';
import { MarketItem } from '../types/market';

interface HeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MarketItem) => void;
}

interface SectorBlock {
  sector: string;
  items: {
    symbol: string;
    name: string;
    changePercent: number;
    price: number;
    weight: number; // For relative box size
  }[];
}

export const HeatmapModal: React.FC<HeatmapModalProps> = ({
  isOpen,
  onClose,
  onSelectItem
}) => {
  if (!isOpen) return null;

  const [activeSector, setActiveSector] = useState<string>('all');

  const sectors: SectorBlock[] = [
    {
      sector: 'Technology',
      items: [
        { symbol: 'NVDA', name: 'NVIDIA', changePercent: 2.52, price: 141.54, weight: 35 },
        { symbol: 'MSFT', name: 'Microsoft', changePercent: 0.51, price: 424.60, weight: 32 },
        { symbol: 'AAPL', name: 'Apple', changePercent: -0.41, price: 228.87, weight: 34 },
        { symbol: 'GOOGL', name: 'Alphabet', changePercent: 1.08, price: 182.40, weight: 22 },
        { symbol: 'PLTR', name: 'Palantir', changePercent: 9.87, price: 68.80, weight: 16 }
      ]
    },
    {
      sector: 'Consumer & Retail',
      items: [
        { symbol: 'AMZN', name: 'Amazon', changePercent: 1.51, price: 208.18, weight: 24 },
        { symbol: 'TSLA', name: 'Tesla', changePercent: 4.32, price: 345.20, weight: 18 },
        { symbol: 'NKE', name: 'Nike', changePercent: -4.18, price: 76.80, weight: 10 }
      ]
    },
    {
      sector: 'Financials & Crypto',
      items: [
        { symbol: 'BTCUSD', name: 'Bitcoin', changePercent: 3.84, price: 96420.00, weight: 28 },
        { symbol: 'COIN', name: 'Coinbase', changePercent: 8.43, price: 312.40, weight: 14 },
        { symbol: 'HOOD', name: 'Robinhood', changePercent: 7.68, price: 36.75, weight: 12 },
        { symbol: 'ETHUSD', name: 'Ethereum', changePercent: 2.15, price: 2780.45, weight: 16 }
      ]
    }
  ];

  const getColor = (chg: number) => {
    if (chg >= 5) return '#057a66';
    if (chg > 2) return '#089981';
    if (chg > 0) return '#34c38f';
    if (chg > -2) return '#f46a6a';
    if (chg > -5) return '#f23645';
    return '#c21825';
  };

  const filteredSectors = activeSector === 'all' 
    ? sectors 
    : sectors.filter(s => s.sector === activeSector);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#e0e3eb] shadow-2xl rounded-2xl w-full max-w-5xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e0e3eb] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#2962ff]" />
            <h2 className="text-lg font-bold text-[#131722]">Market Treemap & Sector Heatmap</h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center gap-1 text-xs bg-[#f0f3f6] p-1 rounded-lg">
              <button
                onClick={() => setActiveSector('all')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                  activeSector === 'all' ? 'bg-white shadow-2xs text-[#131722]' : 'text-[#6a6d78]'
                }`}
              >
                All Sectors
              </button>
              {sectors.map(s => (
                <button
                  key={s.sector}
                  onClick={() => setActiveSector(s.sector)}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                    activeSector === s.sector ? 'bg-white shadow-2xs text-[#131722]' : 'text-[#6a6d78]'
                  }`}
                >
                  {s.sector.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#6a6d78] hover:text-[#131722] hover:bg-[#f0f3f6] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Heatmap Grid Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#fafbfc]">
          {filteredSectors.map(sec => (
            <div key={sec.sector} className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6a6d78] flex items-center justify-between">
                <span>{sec.sector}</span>
                <span>Box size proportional to market weight</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                {sec.items.map(item => {
                  const bg = getColor(item.changePercent);
                  const isPositive = item.changePercent >= 0;

                  return (
                    <button
                      key={item.symbol}
                      onClick={() => {
                        onSelectItem({
                          id: item.symbol.toLowerCase(),
                          symbol: item.symbol,
                          name: item.name,
                          type: 'stock',
                          price: item.price,
                          changeValue: (item.price * item.changePercent) / 100,
                          changePercent: item.changePercent
                        });
                        onClose();
                      }}
                      className="p-3.5 rounded-xl text-white text-left transition-transform hover:scale-[1.02] shadow-xs cursor-pointer flex flex-col justify-between h-28 relative group overflow-hidden"
                      style={{ backgroundColor: bg }}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-black text-base tracking-wide drop-shadow-xs">
                          {item.symbol}
                        </span>
                        <span className="text-[11px] font-bold bg-black/25 px-1.5 py-0.5 rounded font-mono tabular-nums">
                          {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                        </span>
                      </div>

                      <div className="text-right w-full">
                        <div className="text-xs opacity-90 truncate">{item.name}</div>
                        <div className="font-bold text-sm font-mono tabular-nums mt-0.5">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-[#e0e3eb] bg-white flex flex-wrap items-center justify-between gap-3 text-xs text-[#6a6d78]">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#c21825]" />
            <span>-5%</span>
            <span className="w-3.5 h-3.5 rounded-sm bg-[#f46a6a]" />
            <span>-2%</span>
            <span className="w-3.5 h-3.5 rounded-sm bg-[#e0e3eb]" />
            <span>0%</span>
            <span className="w-3.5 h-3.5 rounded-sm bg-[#34c38f]" />
            <span>+2%</span>
            <span className="w-3.5 h-3.5 rounded-sm bg-[#057a66]" />
            <span>+5%</span>
          </div>
          <span>TradingView Interactive Heatmap</span>
        </div>
      </div>
    </div>
  );
};
