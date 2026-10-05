import { MarketItem, Timeframe, CandlePoint, ChartPoint } from '../types/market';

export const MAJOR_INDICES: MarketItem[] = [
  {
    id: 'spx',
    symbol: 'SPX',
    name: 'S&P 500',
    type: 'index',
    exchange: 'Cboe',
    country: 'United States',
    flag: '🇺🇸',
    price: 5983.25,
    changeValue: 25.10,
    changePercent: 0.42,
    badgeBg: '#d32f2f',
    badgeText: '500',
    dayHigh: 5991.40,
    dayLow: 5962.10,
    openPrice: 5965.80,
    prevClose: 5958.15,
    high52W: 6025.50,
    low52W: 4682.10,
    volume: '2.84B',
    sparklineD: 'M0,28 Q25,32 50,22 T100,18 T150,12 T200,6',
    sparklineColor: 'green',
    technicals: {
      rating: 'Strong Buy',
      score: 7,
      oscillators: { rsi: 62.4, stoch: 78.1, macd: 14.2, rating: 'Buy' },
      movingAverages: { sma20: 5920.4, sma50: 5840.1, sma200: 5410.8, rating: 'Buy' }
    }
  },
  {
    id: 'ndx',
    symbol: 'NDX',
    name: 'Nasdaq 100',
    type: 'index',
    exchange: 'Nasdaq',
    country: 'United States',
    flag: '🇺🇸',
    price: 21340.10,
    changeValue: 138.45,
    changePercent: 0.65,
    badgeBg: '#0288d1',
    badgeText: '100',
    dayHigh: 21390.80,
    dayLow: 21190.25,
    openPrice: 21220.00,
    prevClose: 21201.65,
    high52W: 21545.00,
    low52W: 16973.00,
    volume: '4.12B',
    sparklineD: 'M0,35 Q30,10 60,25 T120,15 T160,20 T200,4',
    sparklineColor: 'green',
    technicals: {
      rating: 'Strong Buy',
      score: 8,
      oscillators: { rsi: 66.8, stoch: 82.4, macd: 68.5, rating: 'Buy' },
      movingAverages: { sma20: 20980.0, sma50: 20450.0, sma200: 18820.0, rating: 'Buy' }
    }
  },
  {
    id: 'dji',
    symbol: 'DJI',
    name: 'Dow 30',
    type: 'index',
    exchange: 'NYSE',
    country: 'United States',
    flag: '🇺🇸',
    price: 43870.50,
    changeValue: -52.30,
    changePercent: -0.12,
    badgeBg: '#0288d1',
    badgeText: '30',
    dayHigh: 44020.10,
    dayLow: 43780.40,
    openPrice: 43940.00,
    prevClose: 43922.80,
    high52W: 44486.00,
    low52W: 36790.00,
    volume: '380M',
    sparklineD: 'M0,8 Q35,5 70,18 T130,22 T170,28 T200,32',
    sparklineColor: 'red',
    technicals: {
      rating: 'Neutral',
      score: 1,
      oscillators: { rsi: 48.9, stoch: 42.1, macd: -5.1, rating: 'Neutral' },
      movingAverages: { sma20: 43950.0, sma50: 43400.0, sma200: 40500.0, rating: 'Buy' }
    }
  }
];

export const INDICES_PILLS: { id: string; symbol: string; name: string; badge: string; bg: string }[] = [
  { id: 'spx', symbol: 'SPX', name: 'S&P 500', badge: '500', bg: '#d32f2f' },
  { id: 'ndx', symbol: 'NDX', name: 'Nasdaq 100', badge: '100', bg: '#0288d1' },
  { id: 'dji', symbol: 'DJI', name: 'Dow 30', badge: '30', bg: '#0288d1' },
  { id: 'rut', symbol: 'RUT', name: 'US 2000', badge: '2K', bg: '#673ab7' },
  { id: 'ni225', symbol: 'NI225', name: 'Nikkei 225', badge: '225', bg: '#e91e63' },
  { id: 'dax', symbol: 'DAX', name: 'DAX 40', badge: 'DAX', bg: '#388e3c' },
  { id: 'ukx', symbol: 'UKX', name: 'FTSE 100', badge: 'UK', bg: '#00796b' },
  { id: 'hsi', symbol: 'HSI', name: 'Hang Seng', badge: 'HK', bg: '#e53935' },
  { id: 'nifty', symbol: 'NIFTY', name: 'NIFTY 50', badge: '50', bg: '#fb8c00' }
];

export const US_STOCKS_DATA: Record<'active' | 'gainers' | 'losers', MarketItem[]> = {
  active: [
    {
      id: 'nvda',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 141.54,
      changeValue: 3.48,
      changePercent: 2.52,
      volume: '68.42M',
      marketCap: '$3.47T',
      logoLetter: 'N',
      logoBg: '#76b900',
      openPrice: 138.80,
      prevClose: 138.06,
      dayHigh: 142.10,
      dayLow: 138.25,
      high52W: 149.77,
      low52W: 45.10,
      peRatio: '58.4',
      divYield: '0.03%',
      technicals: {
        rating: 'Strong Buy',
        score: 9,
        oscillators: { rsi: 68.2, stoch: 85.0, macd: 2.4, rating: 'Buy' },
        movingAverages: { sma20: 136.5, sma50: 128.9, sma200: 104.2, rating: 'Buy' }
      }
    },
    {
      id: 'tsla',
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 345.20,
      changeValue: 14.30,
      changePercent: 4.32,
      volume: '54.12M',
      marketCap: '$1.11T',
      logoLetter: 'T',
      logoBg: '#e82127',
      openPrice: 334.50,
      prevClose: 330.90,
      dayHigh: 348.60,
      dayLow: 332.10,
      high52W: 360.00,
      low52W: 138.80,
      peRatio: '94.2',
      divYield: 'N/A',
      technicals: {
        rating: 'Strong Buy',
        score: 8,
        oscillators: { rsi: 72.1, stoch: 88.5, macd: 8.6, rating: 'Buy' },
        movingAverages: { sma20: 325.0, sma50: 280.4, sma200: 220.1, rating: 'Buy' }
      }
    },
    {
      id: 'aapl',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 228.87,
      changeValue: -0.94,
      changePercent: -0.41,
      volume: '42.88M',
      marketCap: '$3.45T',
      logoLetter: '',
      logoBg: '#000000',
      logoSvg: 'apple',
      openPrice: 229.50,
      prevClose: 229.81,
      dayHigh: 231.20,
      dayLow: 227.90,
      high52W: 237.23,
      low52W: 164.08,
      peRatio: '34.8',
      divYield: '0.44%',
      technicals: {
        rating: 'Neutral',
        score: 0,
        oscillators: { rsi: 49.3, stoch: 45.0, macd: -0.4, rating: 'Neutral' },
        movingAverages: { sma20: 229.4, sma50: 226.8, sma200: 202.5, rating: 'Neutral' }
      }
    },
    {
      id: 'msft',
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 424.60,
      changeValue: 2.15,
      changePercent: 0.51,
      volume: '19.24M',
      marketCap: '$3.15T',
      logoLetter: 'M',
      logoBg: '#00a4ef',
      openPrice: 423.10,
      prevClose: 422.45,
      dayHigh: 426.50,
      dayLow: 421.80,
      high52W: 468.35,
      low52W: 366.50,
      peRatio: '35.2',
      divYield: '0.78%',
      technicals: {
        rating: 'Buy',
        score: 5,
        oscillators: { rsi: 56.1, stoch: 62.4, macd: 1.1, rating: 'Buy' },
        movingAverages: { sma20: 420.5, sma50: 423.0, sma200: 415.0, rating: 'Buy' }
      }
    },
    {
      id: 'amzn',
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 208.18,
      changeValue: 3.10,
      changePercent: 1.51,
      volume: '31.05M',
      marketCap: '$2.18T',
      logoLetter: 'A',
      logoBg: '#ff9900',
      openPrice: 205.80,
      prevClose: 205.08,
      dayHigh: 209.40,
      dayLow: 204.60,
      high52W: 215.90,
      low52W: 140.20,
      peRatio: '43.6',
      divYield: 'N/A',
      technicals: {
        rating: 'Buy',
        score: 6,
        oscillators: { rsi: 61.5, stoch: 74.0, macd: 1.8, rating: 'Buy' },
        movingAverages: { sma20: 204.2, sma50: 196.8, sma200: 182.1, rating: 'Buy' }
      }
    },
    {
      id: 'googl',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 182.40,
      changeValue: 1.95,
      changePercent: 1.08,
      volume: '24.18M',
      marketCap: '$2.24T',
      logoLetter: 'G',
      logoBg: '#4285f4',
      openPrice: 181.10,
      prevClose: 180.45,
      dayHigh: 183.75,
      dayLow: 180.50,
      high52W: 191.75,
      low52W: 129.40,
      peRatio: '24.1',
      divYield: '0.44%',
      technicals: {
        rating: 'Buy',
        score: 5,
        oscillators: { rsi: 58.2, stoch: 69.1, macd: 1.2, rating: 'Buy' },
        movingAverages: { sma20: 178.5, sma50: 174.2, sma200: 161.4, rating: 'Buy' }
      }
    },
    {
      id: 'meta',
      symbol: 'META',
      name: 'Meta Platforms, Inc.',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 642.30,
      changeValue: 8.90,
      changePercent: 1.40,
      volume: '16.70M',
      marketCap: '$1.62T',
      logoLetter: 'M',
      logoBg: '#0668e1',
      openPrice: 635.00,
      prevClose: 633.40,
      dayHigh: 645.80,
      dayLow: 633.20,
      high52W: 660.00,
      low52W: 345.00,
      peRatio: '28.9',
      divYield: '0.31%',
      technicals: {
        rating: 'Strong Buy',
        score: 8,
        oscillators: { rsi: 65.4, stoch: 78.9, macd: 4.8, rating: 'Buy' },
        movingAverages: { sma20: 628.0, sma50: 602.0, sma200: 520.0, rating: 'Buy' }
      }
    }
  ],
  gainers: [
    {
      id: 'pltr',
      symbol: 'PLTR',
      name: 'Palantir Technologies',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 68.80,
      changeValue: 6.18,
      changePercent: 9.87,
      volume: '88.10M',
      marketCap: '$153.2B',
      logoLetter: 'P',
      logoBg: '#101010',
      openPrice: 63.20,
      prevClose: 62.62,
      dayHigh: 69.45,
      dayLow: 63.10,
      high52W: 72.50,
      low52W: 15.60,
      peRatio: '115.0',
      divYield: 'N/A',
      technicals: {
        rating: 'Strong Buy',
        score: 10,
        oscillators: { rsi: 82.5, stoch: 94.0, macd: 3.1, rating: 'Buy' },
        movingAverages: { sma20: 61.2, sma50: 52.0, sma200: 34.5, rating: 'Buy' }
      }
    },
    {
      id: 'coin',
      symbol: 'COIN',
      name: 'Coinbase Global, Inc.',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 312.40,
      changeValue: 24.30,
      changePercent: 8.43,
      volume: '18.90M',
      marketCap: '$78.4B',
      logoLetter: 'C',
      logoBg: '#0052ff',
      openPrice: 294.00,
      prevClose: 288.10,
      dayHigh: 316.50,
      dayLow: 292.80,
      high52W: 340.00,
      low52W: 114.00,
      peRatio: '42.1',
      divYield: 'N/A',
      technicals: {
        rating: 'Strong Buy',
        score: 9,
        oscillators: { rsi: 76.8, stoch: 89.2, macd: 7.2, rating: 'Buy' },
        movingAverages: { sma20: 285.0, sma50: 245.0, sma200: 215.0, rating: 'Buy' }
      }
    },
    {
      id: 'hood',
      symbol: 'HOOD',
      name: 'Robinhood Markets Inc.',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 36.75,
      changeValue: 2.62,
      changePercent: 7.68,
      volume: '34.20M',
      marketCap: '$32.1B',
      logoLetter: 'H',
      logoBg: '#00c805',
      openPrice: 34.50,
      prevClose: 34.13,
      dayHigh: 37.10,
      dayLow: 34.20,
      high52W: 38.50,
      low52W: 9.80,
      peRatio: '52.4',
      divYield: 'N/A',
      technicals: {
        rating: 'Strong Buy',
        score: 8,
        oscillators: { rsi: 74.0, stoch: 86.4, macd: 1.4, rating: 'Buy' },
        movingAverages: { sma20: 33.1, sma50: 28.5, sma200: 21.0, rating: 'Buy' }
      }
    },
    {
      id: 'smci',
      symbol: 'SMCI',
      name: 'Super Micro Computer',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 44.15,
      changeValue: 2.95,
      changePercent: 7.16,
      volume: '42.10M',
      marketCap: '$25.8B',
      logoLetter: 'S',
      logoBg: '#1e3a8a',
      openPrice: 41.80,
      prevClose: 41.20,
      dayHigh: 45.20,
      dayLow: 41.50,
      high52W: 122.90,
      low52W: 17.25,
      peRatio: '14.2',
      divYield: 'N/A',
      technicals: {
        rating: 'Neutral',
        score: 2,
        oscillators: { rsi: 54.0, stoch: 65.0, macd: 0.8, rating: 'Neutral' },
        movingAverages: { sma20: 38.5, sma50: 42.0, sma200: 55.0, rating: 'Neutral' }
      }
    },
    {
      id: 'mstr',
      symbol: 'MSTR',
      name: 'MicroStrategy Inc.',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 388.90,
      changeValue: 24.10,
      changePercent: 6.61,
      volume: '22.40M',
      marketCap: '$92.1B',
      logoLetter: 'M',
      logoBg: '#d32f2f',
      openPrice: 370.00,
      prevClose: 364.80,
      dayHigh: 394.00,
      dayLow: 368.50,
      high52W: 543.00,
      low52W: 43.80,
      peRatio: 'N/A',
      divYield: 'N/A',
      technicals: {
        rating: 'Strong Buy',
        score: 8,
        oscillators: { rsi: 71.2, stoch: 84.5, macd: 9.5, rating: 'Buy' },
        movingAverages: { sma20: 360.0, sma50: 310.0, sma200: 210.0, rating: 'Buy' }
      }
    }
  ],
  losers: [
    {
      id: 'intc',
      symbol: 'INTC',
      name: 'Intel Corporation',
      type: 'stock',
      exchange: 'Nasdaq',
      price: 21.40,
      changeValue: -1.25,
      changePercent: -5.52,
      volume: '71.20M',
      marketCap: '$91.8B',
      logoLetter: 'I',
      logoBg: '#0071c5',
      openPrice: 22.30,
      prevClose: 22.65,
      dayHigh: 22.50,
      dayLow: 21.20,
      high52W: 51.28,
      low52W: 18.51,
      peRatio: 'N/A',
      divYield: 'N/A',
      technicals: {
        rating: 'Strong Sell',
        score: -8,
        oscillators: { rsi: 31.4, stoch: 18.2, macd: -0.8, rating: 'Sell' },
        movingAverages: { sma20: 23.5, sma50: 24.8, sma200: 31.2, rating: 'Sell' }
      }
    },
    {
      id: 'nke',
      symbol: 'NKE',
      name: 'NIKE, Inc.',
      type: 'stock',
      exchange: 'NYSE',
      price: 76.80,
      changeValue: -3.35,
      changePercent: -4.18,
      volume: '15.40M',
      marketCap: '$114.5B',
      logoLetter: 'N',
      logoBg: '#111111',
      openPrice: 79.80,
      prevClose: 80.15,
      dayHigh: 80.00,
      dayLow: 76.40,
      high52W: 108.50,
      low52W: 70.75,
      peRatio: '22.8',
      divYield: '1.92%',
      technicals: {
        rating: 'Sell',
        score: -6,
        oscillators: { rsi: 35.1, stoch: 22.4, macd: -1.1, rating: 'Sell' },
        movingAverages: { sma20: 81.2, sma50: 83.4, sma200: 88.0, rating: 'Sell' }
      }
    },
    {
      id: 'ba',
      symbol: 'BA',
      name: 'The Boeing Company',
      type: 'stock',
      exchange: 'NYSE',
      price: 148.60,
      changeValue: -5.95,
      changePercent: -3.85,
      volume: '12.80M',
      marketCap: '$111.4B',
      logoLetter: 'B',
      logoBg: '#0033a0',
      openPrice: 153.20,
      prevClose: 154.55,
      dayHigh: 153.80,
      dayLow: 147.90,
      high52W: 243.00,
      low52W: 136.00,
      peRatio: 'N/A',
      divYield: 'N/A',
      technicals: {
        rating: 'Sell',
        score: -5,
        oscillators: { rsi: 38.0, stoch: 26.5, macd: -1.8, rating: 'Sell' },
        movingAverages: { sma20: 155.0, sma50: 158.2, sma200: 175.4, rating: 'Sell' }
      }
    },
    {
      id: 'dis',
      symbol: 'DIS',
      name: 'The Walt Disney Company',
      type: 'stock',
      exchange: 'NYSE',
      price: 111.20,
      changeValue: -3.58,
      changePercent: -3.12,
      volume: '11.10M',
      marketCap: '$202.1B',
      logoLetter: 'D',
      logoBg: '#002244',
      openPrice: 114.50,
      prevClose: 114.78,
      dayHigh: 114.80,
      dayLow: 110.80,
      high52W: 123.74,
      low52W: 83.91,
      peRatio: '38.4',
      divYield: '0.81%',
      technicals: {
        rating: 'Neutral',
        score: -1,
        oscillators: { rsi: 44.5, stoch: 38.0, macd: -0.3, rating: 'Neutral' },
        movingAverages: { sma20: 113.8, sma50: 108.5, sma200: 102.1, rating: 'Buy' }
      }
    },
    {
      id: 'pfe',
      symbol: 'PFE',
      name: 'Pfizer Inc.',
      type: 'stock',
      exchange: 'NYSE',
      price: 25.10,
      changeValue: -0.76,
      changePercent: -2.94,
      volume: '29.30M',
      marketCap: '$142.3B',
      logoLetter: 'P',
      logoBg: '#0093d0',
      openPrice: 25.80,
      prevClose: 25.86,
      dayHigh: 25.90,
      dayLow: 25.02,
      high52W: 31.54,
      low52W: 24.48,
      peRatio: '18.2',
      divYield: '6.69%',
      technicals: {
        rating: 'Sell',
        score: -4,
        oscillators: { rsi: 40.2, stoch: 31.0, macd: -0.2, rating: 'Sell' },
        movingAverages: { sma20: 26.2, sma50: 27.5, sma200: 28.1, rating: 'Sell' }
      }
    }
  ]
};

export const WORLD_INDICES: MarketItem[] = [
  {
    id: 'ni225',
    symbol: 'NI225',
    name: 'Nikkei 225',
    subtext: 'NI225 • Tokyo',
    type: 'index',
    country: 'Japan',
    flag: '🇯🇵',
    price: 38720.47,
    changeValue: 298.50,
    changePercent: 0.78,
    dayHigh: 38850.00,
    dayLow: 38510.00,
    openPrice: 38550.00,
    prevClose: 38421.97,
    high52W: 42426.77,
    low52W: 30538.29,
    volume: '1.45B',
    technicals: {
      rating: 'Buy',
      score: 5,
      oscillators: { rsi: 57.8, stoch: 68.2, macd: 84.1, rating: 'Buy' },
      movingAverages: { sma20: 38400.0, sma50: 38100.0, sma200: 37200.0, rating: 'Buy' }
    }
  },
  {
    id: 'dax',
    symbol: 'DAX',
    name: 'DAX 40',
    subtext: 'DAX • Frankfurt',
    type: 'index',
    country: 'Germany',
    flag: '🇩🇪',
    price: 19418.90,
    changeValue: -46.80,
    changePercent: -0.24,
    dayHigh: 19495.20,
    dayLow: 19380.10,
    openPrice: 19460.00,
    prevClose: 19465.70,
    high52W: 19674.68,
    low52W: 14630.21,
    volume: '82M',
    technicals: {
      rating: 'Neutral',
      score: 1,
      oscillators: { rsi: 51.2, stoch: 48.0, macd: 12.0, rating: 'Neutral' },
      movingAverages: { sma20: 19380.0, sma50: 19100.0, sma200: 18200.0, rating: 'Buy' }
    }
  },
  {
    id: 'ukx',
    symbol: 'UKX',
    name: 'FTSE 100',
    subtext: 'UKX • London',
    type: 'index',
    country: 'United Kingdom',
    flag: '🇬🇧',
    price: 8245.30,
    changeValue: 12.40,
    changePercent: 0.15,
    dayHigh: 8272.50,
    dayLow: 8225.80,
    openPrice: 8235.00,
    prevClose: 8232.90,
    high52W: 8474.41,
    low52W: 7380.10,
    volume: '640M',
    technicals: {
      rating: 'Neutral',
      score: 2,
      oscillators: { rsi: 52.4, stoch: 56.1, macd: 3.4, rating: 'Neutral' },
      movingAverages: { sma20: 8220.0, sma50: 8210.0, sma200: 8050.0, rating: 'Buy' }
    }
  },
  {
    id: 'hsi',
    symbol: 'HSI',
    name: 'Hang Seng',
    subtext: 'HSI • Hong Kong',
    type: 'index',
    country: 'Hong Kong',
    flag: '🇭🇰',
    price: 19620.12,
    changeValue: 217.40,
    changePercent: 1.12,
    dayHigh: 19740.00,
    dayLow: 19480.00,
    openPrice: 19510.00,
    prevClose: 19402.72,
    high52W: 23241.74,
    low52W: 14794.16,
    volume: '1.92B',
    technicals: {
      rating: 'Buy',
      score: 4,
      oscillators: { rsi: 55.6, stoch: 64.0, macd: 18.5, rating: 'Buy' },
      movingAverages: { sma20: 19520.0, sma50: 19400.0, sma200: 18100.0, rating: 'Buy' }
    }
  },
  {
    id: 'nifty',
    symbol: 'NIFTY',
    name: 'NIFTY 50',
    subtext: 'NIFTY • NSE',
    type: 'index',
    country: 'India',
    flag: '🇮🇳',
    price: 24180.80,
    changeValue: 86.70,
    changePercent: 0.36,
    dayHigh: 24240.50,
    dayLow: 24080.00,
    openPrice: 24110.00,
    prevClose: 24094.10,
    high52W: 26277.35,
    low52W: 18837.85,
    volume: '420M',
    technicals: {
      rating: 'Buy',
      score: 5,
      oscillators: { rsi: 54.0, stoch: 58.2, macd: 15.2, rating: 'Buy' },
      movingAverages: { sma20: 24050.0, sma50: 24200.0, sma200: 23100.0, rating: 'Buy' }
    }
  }
];

export const CRYPTO_MARKETS: MarketItem[] = [
  {
    id: 'btcusd',
    symbol: 'BTCUSD',
    name: 'Bitcoin',
    type: 'crypto',
    price: 96420.00,
    changeValue: 3560.00,
    changePercent: 3.84,
    dayHigh: 97850.00,
    dayLow: 92450.00,
    openPrice: 92860.00,
    prevClose: 92860.00,
    high52W: 108900.00,
    low52W: 38500.00,
    volume: '$48.2B',
    marketCap: '$1.90T',
    logoLetter: '₿',
    logoBg: '#f7931a',
    technicals: {
      rating: 'Strong Buy',
      score: 9,
      oscillators: { rsi: 72.8, stoch: 86.4, macd: 840.0, rating: 'Buy' },
      movingAverages: { sma20: 92400.0, sma50: 84500.0, sma200: 67200.0, rating: 'Buy' }
    }
  },
  {
    id: 'ethusd',
    symbol: 'ETHUSD',
    name: 'Ethereum',
    type: 'crypto',
    price: 2780.45,
    changeValue: 58.60,
    changePercent: 2.15,
    dayHigh: 2840.00,
    dayLow: 2710.00,
    openPrice: 2721.85,
    prevClose: 2721.85,
    high52W: 4093.00,
    low52W: 2150.00,
    volume: '$22.8B',
    marketCap: '$334.5B',
    logoLetter: 'Ξ',
    logoBg: '#627eea',
    technicals: {
      rating: 'Buy',
      score: 6,
      oscillators: { rsi: 59.4, stoch: 68.0, macd: 24.5, rating: 'Buy' },
      movingAverages: { sma20: 2680.0, sma50: 2610.0, sma200: 2850.0, rating: 'Neutral' }
    }
  },
  {
    id: 'solusd',
    symbol: 'SOLUSD',
    name: 'Solana',
    type: 'crypto',
    price: 198.60,
    changeValue: -2.20,
    changePercent: -1.10,
    dayHigh: 206.50,
    dayLow: 195.40,
    openPrice: 200.80,
    prevClose: 200.80,
    high52W: 264.00,
    low52W: 55.00,
    volume: '$6.8B',
    marketCap: '$94.2B',
    logoLetter: 'SOL',
    logoBg: 'linear-gradient(135deg, #9945ff 0%, #14f195 100%)',
    technicals: {
      rating: 'Neutral',
      score: 1,
      oscillators: { rsi: 48.2, stoch: 42.0, macd: -1.2, rating: 'Neutral' },
      movingAverages: { sma20: 204.0, sma50: 192.0, sma200: 156.0, rating: 'Buy' }
    }
  },
  {
    id: 'xrpusd',
    symbol: 'XRPUSD',
    name: 'XRP',
    type: 'crypto',
    price: 1.48,
    changeValue: 0.082,
    changePercent: 5.92,
    dayHigh: 1.54,
    dayLow: 1.38,
    openPrice: 1.398,
    prevClose: 1.398,
    high52W: 2.85,
    low52W: 0.43,
    volume: '$8.4B',
    marketCap: '$84.1B',
    logoLetter: '✕',
    logoBg: '#000000',
    technicals: {
      rating: 'Strong Buy',
      score: 8,
      oscillators: { rsi: 74.5, stoch: 88.0, macd: 0.045, rating: 'Buy' },
      movingAverages: { sma20: 1.35, sma50: 1.15, sma200: 0.72, rating: 'Buy' }
    }
  },
  {
    id: 'bnbusd',
    symbol: 'BNBUSD',
    name: 'BNB',
    type: 'crypto',
    price: 652.30,
    changeValue: 2.90,
    changePercent: 0.45,
    dayHigh: 660.00,
    dayLow: 645.00,
    openPrice: 649.40,
    prevClose: 649.40,
    high52W: 720.00,
    low52W: 285.00,
    volume: '$1.4B',
    marketCap: '$96.4B',
    logoLetter: 'BNB',
    logoBg: '#f3ba2f',
    technicals: {
      rating: 'Buy',
      score: 5,
      oscillators: { rsi: 56.0, stoch: 62.0, macd: 4.8, rating: 'Buy' },
      movingAverages: { sma20: 645.0, sma50: 625.0, sma200: 575.0, rating: 'Buy' }
    }
  }
];

export const COMMODITIES_FOREX: MarketItem[] = [
  {
    id: 'gold',
    symbol: 'XAUUSD',
    name: 'Gold',
    type: 'commodity',
    price: 2648.80,
    changeValue: 10.05,
    changePercent: 0.38,
    dayHigh: 2656.40,
    dayLow: 2635.10,
    openPrice: 2638.75,
    prevClose: 2638.75,
    high52W: 2790.10,
    low52W: 1984.00,
    volume: '240K'
  },
  {
    id: 'silver',
    symbol: 'XAGUSD',
    name: 'Silver',
    type: 'commodity',
    price: 31.25,
    changeValue: -0.13,
    changePercent: -0.42,
    dayHigh: 31.62,
    dayLow: 31.05,
    openPrice: 31.38,
    prevClose: 31.38,
    high52W: 35.40,
    low52W: 21.90,
    volume: '110K'
  },
  {
    id: 'crude',
    symbol: 'USOIL',
    name: 'Crude Oil',
    type: 'commodity',
    price: 69.14,
    changeValue: 0.85,
    changePercent: 1.24,
    dayHigh: 69.80,
    dayLow: 68.20,
    openPrice: 68.29,
    prevClose: 68.29,
    high52W: 87.67,
    low52W: 65.27,
    volume: '450K'
  },
  {
    id: 'brent',
    symbol: 'UKOIL',
    name: 'Brent Oil',
    type: 'commodity',
    price: 73.20,
    changeValue: 0.69,
    changePercent: 0.95,
    dayHigh: 73.85,
    dayLow: 72.30,
    openPrice: 72.51,
    prevClose: 72.51,
    high52W: 92.18,
    low52W: 68.68,
    volume: '380K'
  },
  {
    id: 'natgas',
    symbol: 'NGAS',
    name: 'Natural Gas',
    type: 'commodity',
    price: 3.18,
    changeValue: -0.068,
    changePercent: -2.10,
    dayHigh: 3.28,
    dayLow: 3.14,
    openPrice: 3.25,
    prevClose: 3.25,
    high52W: 3.65,
    low52W: 1.52,
    volume: '180K'
  },
  {
    id: 'eurusd',
    symbol: 'EURUSD',
    name: 'EUR / USD',
    type: 'forex',
    price: 1.0482,
    changeValue: 0.0013,
    changePercent: 0.12,
    dayHigh: 1.0510,
    dayLow: 1.0465,
    openPrice: 1.0469,
    prevClose: 1.0469,
    high52W: 1.1214,
    low52W: 1.0332,
    volume: '$95B'
  }
];

// Helper to generate realistic historical chart data for candles and line
export function generateCandleData(basePrice: number, timeframe: Timeframe): CandlePoint[] {
  let count = 40;
  let intervalMinutes = 5;
  let volatility = 0.004;

  switch (timeframe) {
    case '1D':
      count = 48; // 5-minute bars for trading day
      intervalMinutes = 10;
      volatility = 0.003;
      break;
    case '5D':
      count = 50;
      intervalMinutes = 60;
      volatility = 0.008;
      break;
    case '1M':
      count = 30;
      intervalMinutes = 1440;
      volatility = 0.015;
      break;
    case '6M':
      count = 45;
      intervalMinutes = 1440 * 4;
      volatility = 0.025;
      break;
    case 'YTD':
    case '1Y':
      count = 52;
      intervalMinutes = 1440 * 7;
      volatility = 0.035;
      break;
    case '5Y':
    case 'ALL':
      count = 60;
      intervalMinutes = 1440 * 30;
      volatility = 0.06;
      break;
  }

  const candles: CandlePoint[] = [];
  const now = Date.now();
  let currentClose = basePrice * (1 - volatility * (count / 4));

  for (let i = count - 1; i >= 0; i--) {
    const timeMs = now - i * intervalMinutes * 60 * 1000;
    const date = new Date(timeMs);
    let timeLabel = '';

    if (timeframe === '1D') {
      timeLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === '5D' || timeframe === '1M') {
      timeLabel = `${date.getMonth() + 1}/${date.getDate()}`;
    } else {
      timeLabel = date.toLocaleDateString([], { month: 'short', year: '2-digit' });
    }

    const drift = (Math.random() - 0.47) * volatility * currentClose;
    const open = currentClose;
    const close = Math.max(open + drift, basePrice * 0.2);
    const high = Math.max(open, close) + Math.random() * volatility * 0.7 * currentClose;
    const low = Math.min(open, close) - Math.random() * volatility * 0.7 * currentClose;
    const volume = Math.floor(Math.random() * 500000 + 100000);

    candles.push({
      time: timeLabel,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    });

    currentClose = close;
  }

  // Ensure last candle close is near the real current price
  if (candles.length > 0) {
    const last = candles[candles.length - 1];
    last.close = basePrice;
    last.high = Math.max(last.high, basePrice);
    last.low = Math.min(last.low, basePrice);
  }

  return candles;
}

export function generateLineData(candles: CandlePoint[]): ChartPoint[] {
  return candles.map(c => ({
    time: c.time,
    value: c.close,
    volume: c.volume
  }));
}

// Master list of all searchable assets
export const ALL_ASSETS: MarketItem[] = [
  ...MAJOR_INDICES,
  ...US_STOCKS_DATA.active,
  ...US_STOCKS_DATA.gainers,
  ...US_STOCKS_DATA.losers,
  ...WORLD_INDICES,
  ...CRYPTO_MARKETS,
  ...COMMODITIES_FOREX
].filter((item, index, self) => index === self.findIndex(t => t.id === item.id));
