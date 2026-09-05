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
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    try { localStorage.setItem('mlb-prayer-theme', next ? 'dark' : 'light'); } catch {}
  };
  return (
    <header id="app-header" className="sticky top-0 z-30 bg-[var(--pc-faf7f2)]/95 backdrop-blur-md border-b border-[var(--pc-e8dfc8)] shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand & Pastoral Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--pc-7c2d2d)] text-[var(--pc-faf7f2)] flex items-center justify-center shrink-0 shadow-xs border border-[var(--pc-632323)]">
              <Cross className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg sm:text-xl text-[var(--pc-2c2523)] tracking-tight leading-none">
                  How to Begin a Daily Prayer Life
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-cinzel tracking-widest text-[var(--pc-7c2d2d)] bg-[var(--pc-f3ece1)] px-2 py-0.5 rounded border border-[var(--pc-e2d4c3)]">
                  Static Guide
                </span>
              </div>
              <p className="text-xs text-[var(--pc-6b5e59)] font-serif italic mt-0.5">
                Pastoral counsel by Father John
              </p>
            </div>
          </div>

          {/* Controls: Navigation tabs & reading options */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 flex-wrap">
            {/* Font size toggles for comfortable reading */}
            <div className="flex items-center border border-[var(--pc-e2d4c3)] rounded-md bg-[var(--pc-f5efe6)] p-0.5 text-xs text-[var(--pc-4a3e39)]">
              <button
                id="font-size-normal-btn"
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded transition-colors font-serif ${fontSize === 'normal' ? 'bg-[var(--pc-faf7f2)] font-semibold text-[var(--pc-7c2d2d)] shadow-xs' : 'hover:text-[var(--pc-2c2523)]'}`}
                title="Standard font size"
              >
                A
              </button>
              <button
                id="font-size-large-btn"
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded transition-colors font-serif text-sm ${fontSize === 'large' ? 'bg-[var(--pc-faf7f2)] font-semibold text-[var(--pc-7c2d2d)] shadow-xs' : 'hover:text-[var(--pc-2c2523)]'}`}
                title="Larger font size"
              >
                A+
              </button>
              <button
                id="font-size-larger-btn"
                onClick={() => setFontSize('larger')}
                className={`px-2 py-1 rounded transition-colors font-serif text-base ${fontSize === 'larger' ? 'bg-[var(--pc-faf7f2)] font-semibold text-[var(--pc-7c2d2d)] shadow-xs' : 'hover:text-[var(--pc-2c2523)]'}`}
                title="Spacious font size"
              >
                A++
              </button>
            </div>

            {/* Light / Dark theme toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle light or dark theme"
              className="flex items-center justify-center w-8 h-8 rounded-md border transition-colors bg-[var(--pc-f5efe6)] text-[var(--pc-4a3e39)] border-[var(--pc-e2d4c3)] hover:bg-[var(--pc-ede3d4)]"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Print pocket rule quick button */}
            <button
              id="header-pocket-guide-btn"
              onClick={() => setActiveTab('pocket')}
              className={`flex items-center gap-1 text-xs font-serif px-2.5 py-1.5 rounded-md border transition-colors ${
                activeTab === 'pocket'
                  ? 'bg-[var(--pc-7c2d2d)] text-[var(--pc-faf7f2)] border-[var(--pc-7c2d2d)]'
                  : 'bg-[var(--pc-f5efe6)] text-[var(--pc-4a3e39)] border-[var(--pc-e2d4c3)] hover:bg-[var(--pc-ede3d4)]'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pocket Card</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav id="main-navigation" className="flex items-center gap-1 sm:gap-2 mt-3 overflow-x-auto no-scrollbar border-t border-[var(--pc-eae1d2)] pt-2">
          <button
            id="tab-guide-btn"
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs sm:text-sm font-serif font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'guide'
                ? 'border-[var(--pc-7c2d2d)] text-[var(--pc-7c2d2d)] bg-[var(--pc-f5efe6)]/70'
                : 'border-transparent text-[var(--pc-6b5e59)] hover:text-[var(--pc-2c2523)] hover:bg-[var(--pc-f7f2ea)]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[var(--pc-7c2d2d)]" />
            <span>The Guide</span>
          </button>

          <button
            id="tab-prayers-btn"
            onClick={() => setActiveTab('prayers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs sm:text-sm font-serif font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'prayers'
                ? 'border-[var(--pc-7c2d2d)] text-[var(--pc-7c2d2d)] bg-[var(--pc-f5efe6)]/70'
                : 'border-transparent text-[var(--pc-6b5e59)] hover:text-[var(--pc-2c2523)] hover:bg-[var(--pc-f7f2ea)]'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-[var(--pc-7c2d2d)]" />
            <span>Prayer Treasury</span>
          </button>

          <button
            id="tab-silence-btn"
            onClick={() => setActiveTab('silence')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs sm:text-sm font-serif font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'silence'
                ? 'border-[var(--pc-7c2d2d)] text-[var(--pc-7c2d2d)] bg-[var(--pc-f5efe6)]/70'
                : 'border-transparent text-[var(--pc-6b5e59)] hover:text-[var(--pc-2c2523)] hover:bg-[var(--pc-f7f2ea)]'
            }`}
          >
            <Flame className="w-4 h-4 text-[var(--pc-b48a3c)]" />
            <span>Sit Quietly</span>
          </button>

          <button
            id="tab-rhythm-btn"
            onClick={() => setActiveTab('rhythm')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs sm:text-sm font-serif font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'rhythm'
                ? 'border-[var(--pc-7c2d2d)] text-[var(--pc-7c2d2d)] bg-[var(--pc-f5efe6)]/70'
                : 'border-transparent text-[var(--pc-6b5e59)] hover:text-[var(--pc-2c2523)] hover:bg-[var(--pc-f7f2ea)]'
            }`}
          >
            <Clock className="w-4 h-4 text-[var(--pc-7c2d2d)]" />
            <span>Daily Rhythm</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
