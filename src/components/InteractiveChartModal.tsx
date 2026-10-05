import React, { useState, useMemo, useRef } from 'react';
import { 
  X, 
  Bookmark, 
  BookmarkCheck, 
  BarChart2, 
  TrendingUp, 
  Share2, 
  Maximize2, 
  Check, 
  Clock, 
  ShieldCheck, 
  Sliders
} from 'lucide-react';
import { MarketItem, Timeframe, CandlePoint } from '../types/market';
import { generateCandleData } from '../data/marketData';

interface InteractiveChartModalProps {
  item: MarketItem | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (item: MarketItem) => void;
  onSelectItem: (item: MarketItem) => void;
}

export const InteractiveChartModal: React.FC<InteractiveChartModalProps> = ({
  item,
  onClose,
  isWatchlisted,
  onToggleWatchlist
}) => {
  if (!item) return null;

  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<'area' | 'candles'>('candles');
  const [showIndicators, setShowIndicators] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Generate historical data based on timeframe & item price
  const candleData: CandlePoint[] = useMemo(() => {
    return generateCandleData(item.price, timeframe);
  }, [item.id, item.price, timeframe]);

  const activeCandle = hoveredIndex !== null && candleData[hoveredIndex] 
    ? candleData[hoveredIndex] 
    : candleData[candleData.length - 1];

  const minPrice = useMemo(() => {
    return Math.min(...candleData.map(c => c.low)) * 0.998;
  }, [candleData]);

  const maxPrice = useMemo(() => {
    return Math.max(...candleData.map(c => c.high)) * 1.002;
  }, [candleData]);

  const maxVolume = useMemo(() => {
    return Math.max(...candleData.map(c => c.volume)) * 1.2;
  }, [candleData]);

  // Chart dimensions in SVG coordinates
  const svgWidth = 760;
  const svgHeight = 360;
  const volumeHeight = 70;
  const mainChartHeight = svgHeight - volumeHeight - 30;

  const getY = (val: number) => {
    if (maxPrice === minPrice) return mainChartHeight / 2;
    return mainChartHeight - ((val - minPrice) / (maxPrice - minPrice)) * (mainChartHeight - 20) - 10;
  };

  const getVolY = (vol: number) => {
    return svgHeight - (vol / maxVolume) * volumeHeight;
  };

  const isPositiveOverall = item.changeValue >= 0;

  // Handle SVG hover
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clientX / rect.width));
    const index = Math.floor(ratio * candleData.length);
    setHoveredIndex(Math.min(candleData.length - 1, Math.max(0, index)));
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build Area Path
  const areaPoints = candleData.map((c, i) => {
    const x = (i / (candleData.length - 1)) * svgWidth;
    const y = getY(c.close);
    return `${x},${y}`;
  });
  const areaPath = `M0,${getY(candleData[0].close)} L${areaPoints.join(' L')} L${svgWidth},${svgHeight - volumeHeight} L0,${svgHeight - volumeHeight} Z`;
  const linePath = `M${areaPoints.join(' L')}`;

  const timeframes: Timeframe[] = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'ALL'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white border border-[#e0e3eb] shadow-2xl rounded-2xl w-full max-w-5xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="border-b border-[#e0e3eb] px-5 py-3.5 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center space-x-3">
            <div
              className="w-9 h-9 rounded-xl text-white flex items-center justify-center font-bold text-sm shadow-xs"
              style={{ background: item.badgeBg || item.logoBg || '#2962ff' }}
            >
              {item.logoLetter || item.badgeText || item.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black text-[#131722]">{item.symbol}</h2>
                <span className="text-xs text-[#6a6d78] font-medium hidden sm:inline">
                  {item.name}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#6a6d78] bg-[#f0f3f6] px-1.5 py-0.5 rounded">
                  {item.exchange || item.country || item.type}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-[#6a6d78]">
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#089981] animate-pulse" />
                  <span>Market Open</span>
                </span>
                <span>·</span>
                <span>Real-Time Pricing</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Watchlist toggle */}
            <button
              onClick={() => onToggleWatchlist(item)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                isWatchlisted
                  ? 'bg-[#e7f0fe] text-[#2962ff] border-[#2962ff]/30'
                  : 'bg-white hover:bg-[#f0f3f6] text-[#131722] border-[#e0e3eb]'
              }`}
            >
              {isWatchlisted ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#2962ff]" />
                  <span>Watchlisted</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Watchlist</span>
                </>
              )}
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 text-[#6a6d78] hover:text-[#131722] hover:bg-[#f0f3f6] rounded-lg transition-colors cursor-pointer"
              title="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-[#089981]" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-[#6a6d78] hover:text-[#131722] hover:bg-[#f0f3f6] rounded-lg transition-colors cursor-pointer"
              title="Close chart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-6">
          {/* Price Overview Banner */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#e0e3eb] pb-4">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl sm:text-4xl font-black text-[#131722] font-mono tabular-nums tracking-tight">
                  {item.type === 'forex' ? (
                    item.price.toFixed(4)
                  ) : item.type === 'crypto' && item.price < 2 ? (
                    `$${item.price.toFixed(4)}`
                  ) : (
                    `$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  )}
                </span>
                <span
                  className={`text-base font-bold font-mono tabular-nums ${
                    isPositiveOverall ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isPositiveOverall ? `+${item.changeValue.toFixed(2)}` : item.changeValue.toFixed(2)} (
                  {isPositiveOverall ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`})
                </span>
              </div>
              <div className="text-xs text-[#6a6d78] mt-1 font-mono">
                {activeCandle ? (
                  <span>
                    O: <strong className="text-[#131722]">${activeCandle.open}</strong> · H:{' '}
                    <strong className="text-[#131722]">${activeCandle.high}</strong> · L:{' '}
                    <strong className="text-[#131722]">${activeCandle.low}</strong> · C:{' '}
                    <strong className="text-[#131722]">${activeCandle.close}</strong> · Vol:{' '}
                    <strong className="text-[#131722]">{(activeCandle.volume / 1000).toFixed(0)}k</strong>
                  </span>
                ) : (
                  <span>Hover over chart to inspect candle values</span>
                )}
              </div>
            </div>

            {/* Chart Type & Indicator Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#f0f3f6] p-1 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setChartType('candles')}
                  className={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
                    chartType === 'candles'
                      ? 'bg-white text-[#131722] shadow-xs font-bold'
                      : 'text-[#6a6d78] hover:text-[#131722]'
                  }`}
                >
                  Candles
                </button>
                <button
                  onClick={() => setChartType('area')}
                  className={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
                    chartType === 'area'
                      ? 'bg-white text-[#131722] shadow-xs font-bold'
                      : 'text-[#6a6d78] hover:text-[#131722]'
                  }`}
                >
                  Area
                </button>
              </div>

              <button
                onClick={() => setShowIndicators(!showIndicators)}
                className={`p-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  showIndicators
                    ? 'bg-[#e7f0fe] border-[#2962ff]/30 text-[#2962ff]'
                    : 'bg-white border-[#e0e3eb] text-[#6a6d78] hover:bg-[#f0f3f6]'
                }`}
                title="Toggle technical indicators overlay"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center space-x-1 sm:space-x-2 border-b border-[#e0e3eb] pb-2 overflow-x-auto no-scrollbar">
            {timeframes.map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 ${
                  timeframe === tf
                    ? 'bg-[#2962ff] text-white shadow-xs'
                    : 'text-[#6a6d78] hover:text-[#131722] hover:bg-[#f0f3f6]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* SVG Interactive Chart Canvas */}
          <div className="relative border border-[#e0e3eb] rounded-xl p-3 bg-white">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-72 sm:h-80 overflow-visible cursor-crosshair select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2962ff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0.2, 0.4, 0.6, 0.8].map(ratio => {
                const y = ratio * (mainChartHeight - 20) + 10;
                const price = maxPrice - ratio * (maxPrice - minPrice);
                return (
                  <g key={ratio}>
                    <line x1="0" y1={y} x2={svgWidth} y2={y} stroke="#f0f3f6" strokeWidth="1" strokeDasharray="4 4" />
                    <text x={svgWidth - 60} y={y - 4} fill="#9aa0a6" fontSize="10" fontFamily="monospace">
                      ${price.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Volume Bars */}
              {candleData.map((c, i) => {
                const x = (i / (candleData.length - 1)) * svgWidth;
                const barWidth = Math.max(2, (svgWidth / candleData.length) * 0.65);
                const volY = getVolY(c.volume);
                const isGreen = c.close >= c.open;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x - barWidth / 2}
                    y={volY}
                    width={barWidth}
                    height={svgHeight - volY}
                    fill={isGreen ? '#089981' : '#f23645'}
                    opacity={0.3}
                  />
                );
              })}

              {/* Area / Line Render */}
              {chartType === 'area' && (
                <>
                  <path d={areaPath} fill="url(#areaGrad)" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke={isPositiveOverall ? '#089981' : '#2962ff'}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </>
              )}

              {/* Candlestick Render */}
              {chartType === 'candles' &&
                candleData.map((c, i) => {
                  const x = (i / (candleData.length - 1)) * svgWidth;
                  const openY = getY(c.open);
                  const closeY = getY(c.close);
                  const highY = getY(c.high);
                  const lowY = getY(c.low);
                  const isGreen = c.close >= c.open;
                  const color = isGreen ? '#089981' : '#f23645';
                  const candleTop = Math.min(openY, closeY);
                  const candleHeight = Math.max(2, Math.abs(closeY - openY));
                  const candleWidth = Math.max(3, (svgWidth / candleData.length) * 0.7);

                  return (
                    <g key={`candle-${i}`}>
                      {/* Wick */}
                      <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth="1.2" />
                      {/* Body */}
                      <rect
                        x={x - candleWidth / 2}
                        y={candleTop}
                        width={candleWidth}
                        height={candleHeight}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })}

              {/* Moving Average Line overlay when enabled */}
              {showIndicators && (
                <path
                  d={candleData
                    .map((c, i) => {
                      if (i < 5) return '';
                      const slice = candleData.slice(i - 5, i);
                      const sma = slice.reduce((acc, curr) => acc + curr.close, 0) / slice.length;
                      const x = (i / (candleData.length - 1)) * svgWidth;
                      const y = getY(sma);
                      return `${i === 5 ? 'M' : 'L'}${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#fb8c00"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  opacity={0.8}
                />
              )}

              {/* Crosshair Cursor & Indicator Tooltip */}
              {hoveredIndex !== null && candleData[hoveredIndex] && (
                <g>
                  {/* Vertical line */}
                  <line
                    x1={(hoveredIndex / (candleData.length - 1)) * svgWidth}
                    y1="0"
                    x2={(hoveredIndex / (candleData.length - 1)) * svgWidth}
                    y2={svgHeight}
                    stroke="#131722"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                  {/* Horizontal line */}
                  <line
                    x1="0"
                    y1={getY(candleData[hoveredIndex].close)}
                    x2={svgWidth}
                    y2={getY(candleData[hoveredIndex].close)}
                    stroke="#131722"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                  {/* Hover circle */}
                  <circle
                    cx={(hoveredIndex / (candleData.length - 1)) * svgWidth}
                    cy={getY(candleData[hoveredIndex].close)}
                    r="4"
                    fill="#2962ff"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  {/* Time label bottom */}
                  <rect
                    x={(hoveredIndex / (candleData.length - 1)) * svgWidth - 30}
                    y={svgHeight - 16}
                    width="60"
                    height="16"
                    fill="#131722"
                    rx="3"
                  />
                  <text
                    x={(hoveredIndex / (candleData.length - 1)) * svgWidth}
                    y={svgHeight - 4}
                    fill="#ffffff"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {candleData[hoveredIndex].time}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Technical Analysis Gauge & Key Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Technical Analysis Rating Widget */}
            <div className="border border-[#e0e3eb] rounded-xl p-4 bg-[#fafbfc]">
              <div className="flex items-center justify-between pb-3 border-b border-[#e0e3eb]">
                <h3 className="text-sm font-bold text-[#131722] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#2962ff]" />
                  <span>Technical Analysis</span>
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#e6f6f2] text-[#089981]">
                  {item.technicals?.rating || 'Buy'}
                </span>
              </div>

              {/* Speedometer Style Meter */}
              <div className="pt-4 flex flex-col items-center">
                <div className="relative w-48 h-24 overflow-hidden">
                  <div className="absolute inset-0 rounded-t-full border-12 border-gray-200" />
                  <div className="absolute inset-0 rounded-t-full border-12 border-transparent border-t-[#089981] border-r-[#089981] rotate-12" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-bold text-sm text-[#131722]">
                    {item.technicals?.rating || 'Strong Buy'}
                  </div>
                </div>

                <div className="w-full grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                  <div className="p-2 bg-white rounded-lg border border-[#e0e3eb]">
                    <div className="text-[#6a6d78] text-[11px]">Oscillators</div>
                    <div className="font-bold text-[#089981] mt-0.5">
                      {item.technicals?.oscillators.rating || 'Buy'}
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#e0e3eb]">
                    <div className="text-[#6a6d78] text-[11px]">Summary</div>
                    <div className="font-bold text-[#2962ff] mt-0.5">
                      {item.technicals?.rating || 'Strong Buy'}
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#e0e3eb]">
                    <div className="text-[#6a6d78] text-[11px]">Moving Avg</div>
                    <div className="font-bold text-[#089981] mt-0.5">
                      {item.technicals?.movingAverages.rating || 'Strong Buy'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Financial Statistics & Range */}
            <div className="border border-[#e0e3eb] rounded-xl p-4 bg-[#fafbfc] space-y-3">
              <h3 className="text-sm font-bold text-[#131722] pb-2 border-b border-[#e0e3eb]">
                Key Statistics & Ranges
              </h3>

              {/* Day's Range Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#6a6d78]">
                  <span>Day Range</span>
                  <span className="font-mono text-[#131722] font-semibold">
                    ${item.dayLow || (item.price * 0.98).toFixed(2)} - ${item.dayHigh || (item.price * 1.02).toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#2962ff] h-full rounded-full w-2/3" />
                </div>
              </div>

              {/* 52-Week Range */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#6a6d78]">
                  <span>52-Wk Range</span>
                  <span className="font-mono text-[#131722] font-semibold">
                    ${item.low52W || (item.price * 0.7).toFixed(2)} - ${item.high52W || (item.price * 1.3).toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#089981] h-full rounded-full w-4/5" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                <div>
                  <span className="text-[#6a6d78] block">Open</span>
                  <span className="font-mono font-bold text-[#131722]">
                    ${item.openPrice ? item.openPrice.toFixed(2) : (item.price * 0.995).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[#6a6d78] block">Prev Close</span>
                  <span className="font-mono font-bold text-[#131722]">
                    ${item.prevClose ? item.prevClose.toFixed(2) : (item.price - item.changeValue).toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[#6a6d78] block">Volume</span>
                  <span className="font-mono font-bold text-[#131722]">{item.volume || '12.4M'}</span>
                </div>
                <div>
                  <span className="text-[#6a6d78] block">Market Cap</span>
                  <span className="font-mono font-bold text-[#131722]">{item.marketCap || '$2.1T'}</span>
                </div>
                <div>
                  <span className="text-[#6a6d78] block">P/E Ratio</span>
                  <span className="font-mono font-bold text-[#131722]">{item.peRatio || '34.2'}</span>
                </div>
                <div>
                  <span className="text-[#6a6d78] block">Div Yield</span>
                  <span className="font-mono font-bold text-[#131722]">{item.divYield || '0.52%'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
