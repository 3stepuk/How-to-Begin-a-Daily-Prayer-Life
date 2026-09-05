import React from 'react';
import { ActiveTab } from '../types';
import { BookOpen, Flame, Clock, HeartHandshake, Printer, Cross, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  fontSize: 'normal' | 'large' | 'larger';
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  fontSize,
  setFontSize
}) => {
  return (
    <header id="app-header" className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8] shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand & Pastoral Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#7C2D2D] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-xs border border-[#632323]">
              <Cross className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg sm:text-xl text-[#2C2523] tracking-tight leading-none">
                  How to Begin a Daily Prayer Life
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-cinzel tracking-widest text-[#7C2D2D] bg-[#F3ECE1] px-2 py-0.5 rounded border border-[#E2D4C3]">
                  Static Guide
                </span>
              </div>
              <p className="text-xs text-[#6B5E59] font-serif italic mt-0.5">
                Pastoral counsel by Father John
              </p>
            </div>
          </div>

          {/* Controls: Navigation tabs & reading options */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 flex-wrap">
            {/* Font size toggles for comfortable reading */}
            <div className="flex items-center border border-[#E2D4C3] rounded-md bg-[#F5EFE6] p-0.5 text-xs text-[#4A3E39]">
              <button
                id="font-size-normal-btn"
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded transition-colors font-serif ${fontSize === 'normal' ? 'bg-[#FAF7F2] font-semibold text-[#7C2D2D] shadow-xs' : 'hover:text-[#2C2523]'}`}
                title="Standard font size"
              >
                A
              </button>
              <button
                id="font-size-large-btn"
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded transition-colors font-serif text-sm ${fontSize === 'large' ? 'bg-[#FAF7F2] font-semibold text-[#7C2D2D] shadow-xs' : 'hover:text-[#2C2523]'}`}
                title="Larger font size"
              >
                A+
              </button>
              <button
                id="font-size-larger-btn"
                onClick={() => setFontSize('larger')}
                className={`px-2 py-1 rounded transition-colors font-serif text-base ${fontSize === 'larger' ? 'bg-[#FAF7F2] font-semibold text-[#7C2D2D] shadow-xs' : 'hover:text-[#2C2523]'}`}
                title="Spacious font size"
              >
                A++
              </button>
            </div>

            {/* Print pocket rule quick button */}
            <button
              id="header-pocket-guide-btn"
              onClick={() => setActiveTab('pocket')}
              className={`flex items-center gap-1 text-xs font-serif px-2.5 py-1.5 rounded-md border transition-colors ${
                activeTab === 'pocket'
                  ? 'bg-[#7C2D2D] text-[#FAF7F2] border-[#7C2D2D]'
                  : 'bg-[#F5EFE6] text-[#4A3E39] border-[#E2D4C3] hover:bg-[#EDE3D4]'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pocket Card</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav id="main-navigation" className="flex items-center gap-1 sm:gap-2 mt-3 overflow-x-auto no-scrollbar border-t border-[#EAE1D2] pt-2">
          <button
            id="tab-guide-btn"
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs sm:text-sm font-serif font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'guide'
                ? 'border-[#7C2D2D] text-[#7C2D2D] bg-[#F5EFE6]/70'
                : 'border-transparent text-[#6B5E59] hover:text-[#2C2523] hover:bg-[#F7F2EA]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#7C2D2D]" />
            <span>The Guide</span>
          </button>

          <button
            id="tab-prayers-btn"
            onClick={() => setActiveTab('prayers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs sm:text-sm font-serif font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'prayers'
                ? 'border-[#7C2D2D] text-[#7C2D2D] bg-[#F5EFE6]/70'
                : 'border-transparent text-[#6B5E59] hover:text-[#2C2523] hover:bg-[#F7F2EA]'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-[#7C2D2D]" />
            <span>Prayer Treasury</span>
          </button>

          <button
            id="tab-silence-btn"
            onClick={() => setActiveTab('silence')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs sm:text-sm font-serif font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'silence'
                ? 'border-[#7C2D2D] text-[#7C2D2D] bg-[#F5EFE6]/70'
                : 'border-transparent text-[#6B5E59] hover:text-[#2C2523] hover:bg-[#F7F2EA]'
            }`}
          >
            <Flame className="w-4 h-4 text-[#B48A3C]" />
            <span>Sit Quietly</span>
          </button>

          <button
            id="tab-rhythm-btn"
            onClick={() => setActiveTab('rhythm')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs sm:text-sm font-serif font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'rhythm'
                ? 'border-[#7C2D2D] text-[#7C2D2D] bg-[#F5EFE6]/70'
                : 'border-transparent text-[#6B5E59] hover:text-[#2C2523] hover:bg-[#F7F2EA]'
            }`}
          >
            <Clock className="w-4 h-4 text-[#7C2D2D]" />
            <span>Daily Rhythm</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
