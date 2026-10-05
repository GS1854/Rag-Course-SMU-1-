import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketItem } from '../types/market';

interface StocksMoversTableProps {
  activeTab: 'active' | 'gainers' | 'losers';
  onChangeTab: (tab: 'active' | 'gainers' | 'losers') => void;
  stocks: MarketItem[];
  onSelectStock: (item: MarketItem) => void;
  recentTicks: Record<string, 'up' | 'down'>;
}

export const StocksMoversTable: React.FC<StocksMoversTableProps> = ({
  activeTab,
  onChangeTab,
  stocks,
  onSelectStock,
  recentTicks
}) => {
  return (
    <section data-purpose="us-stocks-movers" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e3eb] pb-4 mb-4">
        <div>
          <button
            onClick={() => onSelectStock(stocks[0])}
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#131722] flex items-center gap-1.5 cursor-pointer hover:text-[#2962ff] transition-colors"
          >
            <span>US Stocks Movers</span>
            <ChevronRight className="w-4 h-4 text-[#6a6d78] stroke-[2.5]" />
          </button>
          <p className="text-xs sm:text-sm text-[#6a6d78] mt-1">
            Most actively traded equities, highest volume, and largest movers today
          </p>
        </div>

        {/* Filter Sub-tabs */}
        <div className="flex items-center bg-[#f0f3f6] p-1 rounded-lg self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => onChangeTab('active')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'active'
                ? 'bg-white text-[#131722] shadow-xs font-bold'
                : 'text-[#6a6d78] hover:text-[#131722]'
            }`}
          >
            Most active
          </button>
          <button
            onClick={() => onChangeTab('gainers')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'gainers'
                ? 'bg-white text-[#131722] shadow-xs font-bold'
                : 'text-[#6a6d78] hover:text-[#131722]'
            }`}
          >
            Top gainers
          </button>
          <button
            onClick={() => onChangeTab('losers')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'losers'
                ? 'bg-white text-[#131722] shadow-xs font-bold'
                : 'text-[#6a6d78] hover:text-[#131722]'
            }`}
          >
            Top losers
          </button>
        </div>
      </div>

      {/* Stocks Table */}
      <div className="overflow-x-auto border border-[#e0e3eb] rounded-xl bg-white shadow-2xs">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#fafbfc] border-b border-[#e0e3eb] text-[11px] sm:text-xs uppercase font-medium text-[#6a6d78] tracking-wider">
            <tr>
              <th className="py-3.5 pl-4 pr-3" scope="col">Ticker / Company</th>
              <th className="px-3 py-3.5 text-right" scope="col">Last Price</th>
              <th className="px-3 py-3.5 text-right" scope="col">Chg $</th>
              <th className="px-3 py-3.5 text-right" scope="col">Chg %</th>
              <th className="px-3 py-3.5 text-right" scope="col">Volume</th>
              <th className="px-3 py-3.5 text-right pr-4" scope="col">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e3eb]">
            {stocks.map(stock => {
              const isPositive = stock.changeValue >= 0;
              const tickStatus = recentTicks[stock.id];

              return (
                <tr
                  key={stock.id}
                  onClick={() => onSelectStock(stock)}
                  className={`hover:bg-[#f0f3f6]/60 transition-colors cursor-pointer group select-none ${
                    tickStatus === 'up' ? 'flash-up' : tickStatus === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <td className="py-3.5 pl-4 pr-3">
                    <div className="flex items-center space-x-3">
                      {/* Logo Icon */}
                      <div
                        className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs"
                        style={{ backgroundColor: stock.logoBg || '#2962ff' }}
                      >
                        {stock.logoSvg === 'apple' ? (
                          <svg className="w-4 h-4 fill-white" viewBox="0 0 170 170">
                            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.98-12.03-14.7-6.04-9.43-10.88-20.2-14.53-32.32-3.65-12.13-5.48-23.77-5.48-34.92 0-14.28 3.51-26.17 10.53-35.67 7.02-9.5 15.82-14.37 26.4-14.61 5.25 0 11.16 1.48 17.72 4.45 6.56 2.97 10.66 4.51 12.3 4.63 1.25 0 5.48-1.57 12.69-4.7 7.21-3.13 13.06-4.47 17.55-4.03 13.43.95 23.95 5.66 31.57 14.13-11.83 7.15-17.61 17-17.34 29.56.26 9.87 3.97 18.23 11.13 25.07 7.16 6.84 15.68 10.96 25.56 12.36-2.07 6.47-4.58 13.3-7.53 20.49zM119.22 31.95c0-7.27 2.65-14.14 7.95-20.61 5.3-6.47 11.85-10.69 19.65-12.67.23 1.34.34 2.65.34 3.93 0 7.27-2.77 14.24-8.31 20.91-5.54 6.67-12.08 10.74-19.63 12.21-.24-1.23-.36-2.48-.36-3.77z" />
                          </svg>
                        ) : (
                          stock.logoLetter || stock.symbol[0]
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-[#131722] group-hover:text-[#2962ff] transition-colors">
                          {stock.symbol}
                        </div>
                        <div className="text-xs text-[#6a6d78] truncate max-w-[140px] sm:max-w-xs">
                          {stock.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-right font-semibold font-mono tabular-nums text-[#131722]">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td
                    className={`px-3 py-3.5 text-right font-medium font-mono tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${stock.changeValue.toFixed(2)}` : stock.changeValue.toFixed(2)}
                  </td>
                  <td className="px-3 py-3.5 text-right">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono tabular-nums ${
                        isPositive ? 'text-[#089981] bg-[#e6f6f2]' : 'text-[#f23645] bg-[#fdedef]'
                      }`}
                    >
                      {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-right text-[#6a6d78] font-mono tabular-nums text-xs sm:text-sm">
                    {stock.volume}
                  </td>
                  <td className="px-3 py-3.5 text-right font-semibold pr-4 font-mono tabular-nums text-[#131722] text-xs sm:text-sm">
                    {stock.marketCap}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
