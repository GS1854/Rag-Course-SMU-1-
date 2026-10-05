export type AssetType = 'index' | 'stock' | 'crypto' | 'commodity' | 'forex';

export type Timeframe = '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'ALL';

export interface ChartPoint {
  time: string;
  value: number;
  volume: number;
}

export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalAnalysis {
  rating: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  score: number; // -10 to +10
  oscillators: {
    rsi: number;
    stoch: number;
    macd: number;
    rating: 'Buy' | 'Neutral' | 'Sell';
  };
  movingAverages: {
    sma20: number;
    sma50: number;
    sma200: number;
    rating: 'Buy' | 'Neutral' | 'Sell';
  };
}

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  subtext?: string;
  exchange?: string;
  country?: string;
  flag?: string;
  price: number;
  changeValue: number;
  changePercent: number;
  volume?: string;
  marketCap?: string;
  high52W?: number;
  low52W?: number;
  dayHigh?: number;
  dayLow?: number;
  openPrice?: number;
  prevClose?: number;
  peRatio?: string;
  divYield?: string;
  sparklineD?: string;
  sparklineColor?: 'green' | 'red';
  badgeBg?: string;
  badgeText?: string;
  logoLetter?: string;
  logoBg?: string;
  logoSvg?: string;
  technicals?: TechnicalAnalysis;
}
