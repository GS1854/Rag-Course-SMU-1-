import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicesBar } from './components/IndicesBar';
import { MajorIndicesCards } from './components/MajorIndicesCards';
import { StocksMoversTable } from './components/StocksMoversTable';
import { WorldAndCrypto } from './components/WorldAndCrypto';
import { CommoditiesForexBar } from './components/CommoditiesForexBar';
import { InteractiveChartModal } from './components/InteractiveChartModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { HeatmapModal } from './components/HeatmapModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

import {
  MAJOR_INDICES,
  US_STOCKS_DATA,
  WORLD_INDICES,
  CRYPTO_MARKETS,
  COMMODITIES_FOREX,
  ALL_ASSETS
} from './data/marketData';
import { MarketItem } from './types/market';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activePillId, setActivePillId] = useState<string>('spx');
  const [stockTab, setStockTab] = useState<'active' | 'gainers' | 'losers'>('active');

  // Modals & Drawers state
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [heatmapOpen, setHeatmapOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // Live market quotes state
  const [majorIndices, setMajorIndices] = useState<MarketItem[]>(MAJOR_INDICES);
  const [stocksData, setStocksData] = useState(US_STOCKS_DATA);
  const [worldIndices, setWorldIndices] = useState<MarketItem[]>(WORLD_INDICES);
  const [cryptoMarkets, setCryptoMarkets] = useState<MarketItem[]>(CRYPTO_MARKETS);
  const [commodities, setCommodities] = useState<MarketItem[]>(COMMODITIES_FOREX);
  const [recentTicks, setRecentTicks] = useState<Record<string, 'up' | 'down'>>({});
  const [liveStreaming, setLiveStreaming] = useState(true);

  // Watchlist stored in localStorage
  const [watchlist, setWatchlist] = useState<MarketItem[]>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [MAJOR_INDICES[0], US_STOCKS_DATA.active[0], CRYPTO_MARKETS[0]];
  });

  const saveWatchlist = useCallback((newList: MarketItem[]) => {
    setWatchlist(newList);
    try {
      localStorage.setItem('tv_watchlist', JSON.stringify(newList));
    } catch {
      // fallback
    }
  }, []);

  const toggleWatchlist = useCallback((item: MarketItem) => {
    saveWatchlist(
      watchlist.some(w => w.id === item.id)
        ? watchlist.filter(w => w.id !== item.id)
        : [...watchlist, item]
    );
  }, [watchlist, saveWatchlist]);

  const removeWatchlistItem = useCallback((id: string) => {
    saveWatchlist(watchlist.filter(w => w.id !== id));
  }, [watchlist, saveWatchlist]);

  // Keyboard shortcut for Search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time market tick simulation
  useEffect(() => {
    if (!liveStreaming) return;

    const interval = setInterval(() => {
      // Randomly pick a category to tick
      const categoryDice = Math.random();

      if (categoryDice < 0.25) {
        // Tick one of major indices
        const indexIdx = Math.floor(Math.random() * majorIndices.length);
        const item = majorIndices[indexIdx];
        const delta = (Math.random() - 0.48) * (item.price * 0.0008);
        const newPrice = Number((item.price + delta).toFixed(2));
        const dir = delta >= 0 ? 'up' : 'down';

        setMajorIndices(prev =>
          prev.map((ind, i) =>
            i === indexIdx
              ? {
                  ...ind,
                  price: newPrice,
                  changeValue: Number((ind.changeValue + delta).toFixed(2)),
                  changePercent: Number((ind.changePercent + (delta / ind.price) * 100).toFixed(2))
                }
              : ind
          )
        );

        setRecentTicks(prev => ({ ...prev, [item.id]: dir }));
        setTimeout(() => setRecentTicks(prev => ({ ...prev, [item.id]: undefined! })), 800);
      } else if (categoryDice < 0.6) {
        // Tick one of US Stocks in active tab
        const currentList = stocksData[stockTab];
        if (currentList.length === 0) return;
        const stockIdx = Math.floor(Math.random() * currentList.length);
        const item = currentList[stockIdx];
        const delta = (Math.random() - 0.47) * (item.price * 0.0015);
        const newPrice = Number((item.price + delta).toFixed(2));
        const dir = delta >= 0 ? 'up' : 'down';

        setStocksData(prev => ({
          ...prev,
          [stockTab]: prev[stockTab].map((s, i) =>
            i === stockIdx
              ? {
                  ...s,
                  price: newPrice,
                  changeValue: Number((s.changeValue + delta).toFixed(2)),
                  changePercent: Number((s.changePercent + (delta / s.price) * 100).toFixed(2))
                }
              : s
          )
        }));

        setRecentTicks(prev => ({ ...prev, [item.id]: dir }));
        setTimeout(() => setRecentTicks(prev => ({ ...prev, [item.id]: undefined! })), 800);
      } else if (categoryDice < 0.85) {
        // Tick crypto
        const cryptoIdx = Math.floor(Math.random() * cryptoMarkets.length);
        const item = cryptoMarkets[cryptoIdx];
        const delta = (Math.random() - 0.47) * (item.price * 0.003);
        const newPrice = Number((item.price + delta).toFixed(item.price < 2 ? 4 : 2));
        const dir = delta >= 0 ? 'up' : 'down';

        setCryptoMarkets(prev =>
          prev.map((c, i) =>
            i === cryptoIdx
              ? {
                  ...c,
                  price: newPrice,
                  changeValue: Number((c.changeValue + delta).toFixed(c.price < 2 ? 4 : 2)),
                  changePercent: Number((c.changePercent + (delta / c.price) * 100).toFixed(2))
                }
              : c
          )
        );

        setRecentTicks(prev => ({ ...prev, [item.id]: dir }));
        setTimeout(() => setRecentTicks(prev => ({ ...prev, [item.id]: undefined! })), 800);
      } else {
        // Tick commodities / FX
        const commIdx = Math.floor(Math.random() * commodities.length);
        const item = commodities[commIdx];
        const delta = (Math.random() - 0.48) * (item.price * 0.0006);
        const newPrice = Number((item.price + delta).toFixed(item.type === 'forex' ? 4 : 2));
        const dir = delta >= 0 ? 'up' : 'down';

        setCommodities(prev =>
          prev.map((c, i) =>
            i === commIdx
              ? {
                  ...c,
                  price: newPrice,
                  changeValue: Number((c.changeValue + delta).toFixed(c.type === 'forex' ? 4 : 2)),
                  changePercent: Number((c.changePercent + (delta / c.price) * 100).toFixed(2))
                }
              : c
          )
        );

        setRecentTicks(prev => ({ ...prev, [item.id]: dir }));
        setTimeout(() => setRecentTicks(prev => ({ ...prev, [item.id]: undefined! })), 800);
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [liveStreaming, majorIndices, stocksData, stockTab, cryptoMarkets, commodities]);

  // When an index pill is selected
  const handleSelectPill = (symbolOrId: string) => {
    setActivePillId(symbolOrId);
    const found = ALL_ASSETS.find(
      a => a.id.toLowerCase() === symbolOrId.toLowerCase() || a.symbol.toLowerCase() === symbolOrId.toLowerCase()
    );
    if (found) {
      setSelectedItem(found);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#131722] flex flex-col font-sans selection:bg-[#2962ff] selection:text-white">
      {/* 1. Header Navigation */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWatchlist={() => setWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        onOpenHeatmap={() => setHeatmapOpen(true)}
        liveStreaming={liveStreaming}
        onToggleLiveStreaming={() => setLiveStreaming(!liveStreaming)}
        onOpenAuth={() => setAuthOpen(true)}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      {/* 2. Hero Headline */}
      <HeroSection
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      {/* 3. Indices Category Selector Bar */}
      {(selectedRegion === 'all' || selectedRegion === 'us' || selectedRegion === 'europe' || selectedRegion === 'asia') && (
        <IndicesBar
          activePillId={activePillId}
          onSelectIndex={handleSelectPill}
        />
      )}

      {/* 4. Major Market Indices Snapshot Cards */}
      {(selectedRegion === 'all' || selectedRegion === 'us') && (
        <MajorIndicesCards
          indices={majorIndices}
          onSelectIndex={setSelectedItem}
          recentTicks={recentTicks}
        />
      )}

      {/* 5. Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 space-y-10 w-full flex-1">
        {/* US Stocks Movers Table */}
        {(selectedRegion === 'all' || selectedRegion === 'us') && (
          <StocksMoversTable
            activeTab={stockTab}
            onChangeTab={setStockTab}
            stocks={stocksData[stockTab]}
            onSelectStock={setSelectedItem}
            recentTicks={recentTicks}
          />
        )}

        {/* Two-Column Section: World Indices & Crypto */}
        {(selectedRegion === 'all' || selectedRegion === 'europe' || selectedRegion === 'asia' || selectedRegion === 'crypto') && (
          <WorldAndCrypto
            worldIndices={worldIndices}
            cryptoMarkets={cryptoMarkets}
            onSelectItem={setSelectedItem}
            recentTicks={recentTicks}
          />
        )}

        {/* Futures, Commodities & Currencies Quick Bar */}
        {(selectedRegion === 'all' || selectedRegion === 'commodities') && (
          <CommoditiesForexBar
            items={commodities}
            onSelectItem={setSelectedItem}
            recentTicks={recentTicks}
          />
        )}
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <InteractiveChartModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isWatchlisted={selectedItem ? watchlist.some(w => w.id === selectedItem.id) : false}
        onToggleWatchlist={toggleWatchlist}
        onSelectItem={setSelectedItem}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectItem={setSelectedItem}
      />

      <WatchlistDrawer
        isOpen={watchlistOpen}
        onClose={() => setWatchlistOpen(false)}
        watchlistItems={watchlist}
        onRemoveItem={removeWatchlistItem}
        onSelectItem={setSelectedItem}
      />

      <HeatmapModal
        isOpen={heatmapOpen}
        onClose={() => setHeatmapOpen(false)}
        onSelectItem={setSelectedItem}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
}
