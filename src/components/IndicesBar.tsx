import React from 'react';
import { ChevronRight } from 'lucide-react';
import { INDICES_PILLS } from '../data/marketData';

interface IndicesBarProps {
  activePillId: string;
  onSelectIndex: (symbolOrId: string) => void;
}

export const IndicesBar: React.FC<IndicesBarProps> = ({
  activePillId,
  onSelectIndex
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-6 pt-2" data-purpose="indices-pills">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => onSelectIndex('spx')}
          className="group inline-flex items-center text-xl sm:text-2xl font-bold text-[#131722] hover:text-[#2962ff] cursor-pointer transition-colors"
        >
          <span>Indices</span>
          <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
        </button>
        <div className="text-xs text-[#6a6d78] hidden sm:block">
          Click any index to open interactive charts
        </div>
      </div>

      {/* Category Pills matching screenshot layout with red/blue circular index badges */}
      <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1">
        {INDICES_PILLS.map(pill => {
          const isActive = activePillId === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => onSelectIndex(pill.id)}
              className={`flex items-center space-x-2.5 rounded-full py-2 px-3.5 transition-all shrink-0 cursor-pointer text-left border ${
                isActive
                  ? 'bg-[#f0f3f6] border-[#e0e3eb] shadow-xs'
                  : 'bg-white hover:bg-[#f0f3f6] border-transparent hover:border-[#e0e3eb]'
              }`}
            >
              <span
                className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-[11px] shadow-inner shrink-0"
                style={{ backgroundColor: pill.bg }}
              >
                {pill.badge}
              </span>
              <span
                className={`text-sm ${
                  isActive ? 'font-semibold text-[#131722]' : 'font-medium text-[#131722]'
                }`}
              >
                {pill.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
