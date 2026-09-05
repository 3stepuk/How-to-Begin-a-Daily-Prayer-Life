import React, { useState, useMemo } from 'react';
import { PRAYER_TREASURY } from '../data/prayers';
import { PrayerItem } from '../types';
import { playBellChime } from '../utils/audio';
import { 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  Languages, 
  Clock, 
  Volume2, 
  BookMarked, 
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';

interface PrayerBookProps {
  fontSizeClass: string;
  selectedPrayerId?: string | null;
  onClearSelectedPrayer?: () => void;
  onAddToRhythm?: (prayer: PrayerItem) => void;
}

export const PrayerBook: React.FC<PrayerBookProps> = ({
  fontSizeClass,
  selectedPrayerId,
  onClearSelectedPrayer,
  onAddToRhythm
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrayer, setActivePrayer] = useState<PrayerItem | null>(() => {
    if (selectedPrayerId) {
      return PRAYER_TREASURY.find(p => p.id === selectedPrayerId) || PRAYER_TREASURY[0];
    }
    return PRAYER_TREASURY[0];
  });

  const [useLatin, setUseLatin] = useState(false);
  const [attentiveMode, setAttentiveMode] = useState(false);
  const [attentiveStep, setAttentiveStep] = useState(0);
  const [copied, setCopied] = useState(false);

  // If parent changed selectedPrayerId, update active prayer
  React.useEffect(() => {
    if (selectedPrayerId) {
      const found = PRAYER_TREASURY.find(p => p.id === selectedPrayerId);
      if (found) {
        setActivePrayer(found);
        setAttentiveMode(false);
        setAttentiveStep(0);
      }
    }
  }, [selectedPrayerId]);

  const filteredPrayers = useMemo(() => {
    return PRAYER_TREASURY.filter(p => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        p.title.toLowerCase().includes(q) || 
        (p.latinTitle && p.latinTitle.toLowerCase().includes(q)) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.textEnglish.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayChime = () => {
    playBellChime('medium');
  };

  // Lines for attentive reading mode
  const currentText = useLatin && activePrayer?.textLatin ? activePrayer.textLatin : activePrayer?.textEnglish || '';
  const prayerLines = useMemo(() => {
    return currentText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);
  }, [currentText]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Introduction banner highlighting Father John's teaching */}
      <div className="bg-[var(--pc-faf4eb)] border border-[var(--pc-e8dfc8)] rounded-xl p-5 sm:p-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
            <span className="text-xs uppercase font-cinzel tracking-widest text-[var(--pc-7c2d2d)] font-bold">
              Father John's Treasury
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--pc-2c2523)]">
            Simple Catholic Prayers
          </h2>
          <p className="font-serif italic text-sm text-[var(--pc-6b5e59)] mt-1 max-w-xl">
            "The Church already gives us many excellent prayers... Do not underestimate the power of simple prayers said attentively."
          </p>
        </div>

        <button
          onClick={handlePlayChime}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-md bg-[var(--pc-f3ece1)] hover:bg-[var(--pc-ebe2d5)] border border-[var(--pc-e2d4c3)] text-xs font-serif text-[var(--pc-4a3e39)] transition-colors"
          title="Play chapel bell"
        >
          <Volume2 className="w-4 h-4 text-[var(--pc-7c2d2d)]" />
          <span>Chapel Bell</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Prayers' },
            { id: 'daily', label: 'Daily & Fixed' },
            { id: 'marian', label: 'Marian & Rosary' },
            { id: 'psalms', label: 'Psalms' },
            { id: 'communion', label: 'Holy Communion' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-serif transition-colors whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[var(--pc-7c2d2d)] text-[var(--pc-faf7f2)] font-medium shadow-2xs'
                  : 'bg-[var(--pc-f3ece1)] text-[var(--pc-6b5e59)] hover:bg-[var(--pc-ebe2d5)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--pc-8c7e77)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search prayers..."
            className="w-full bg-[var(--pc-faf7f2)] border border-[var(--pc-e2d4c3)] rounded-md pl-9 pr-3 py-1.5 text-xs font-serif text-[var(--pc-2c2523)] placeholder-[var(--pc-8c7e77)] focus:outline-hidden focus:border-[var(--pc-7c2d2d)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--pc-8c7e77)] hover:text-[var(--pc-2c2523)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Split Layout: Prayer List & Reading Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: List of Prayers */}
        <div className="md:col-span-4 lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredPrayers.length === 0 ? (
            <div className="text-center py-8 text-xs font-serif text-[var(--pc-8c7e77)]">
              No prayers found matching "{searchQuery}".
            </div>
          ) : (
            filteredPrayers.map(p => {
              const isSelected = activePrayer?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePrayer(p);
                    setAttentiveMode(false);
                    setAttentiveStep(0);
                    if (onClearSelectedPrayer) onClearSelectedPrayer();
                  }}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-[var(--pc-faf4eb)] border-[var(--pc-7c2d2d)] shadow-xs'
                      : 'bg-[var(--pc-faf7f2)] border-[var(--pc-e8dfc8)] hover:border-[var(--pc-d8ceb8)] hover:bg-[var(--pc-f8f4ed)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-serif font-bold text-sm text-[var(--pc-2c2523)] leading-snug">
                      {p.title}
                    </span>
                    {p.traditionalTime && (
                      <span className="text-[10px] text-[var(--pc-7c2d2d)] font-cinzel uppercase shrink-0">
                        {p.traditionalTime.split('•')[0]}
                      </span>
                    )}
                  </div>
                  {p.latinTitle && (
                    <p className="text-[11px] font-serif italic text-[var(--pc-8c7e77)]">
                      {p.latinTitle}
                    </p>
                  )}
                  <p className="text-xs font-serif text-[var(--pc-6b5e59)] line-clamp-2 mt-1">
                    {p.shortDescription}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Active Prayer Reading Sanctuary */}
        <div className="md:col-span-8 lg:col-span-8">
          {activePrayer ? (
            <div className="bg-[var(--pc-faf7f2)] border border-[var(--pc-e8dfc8)] rounded-xl p-6 sm:p-8 shadow-xs">
              
              {/* Card Header & Controls */}
              <div className="border-b border-[var(--pc-eae1d2)] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--pc-2c2523)]">
                      {activePrayer.title}
                    </h3>
                  </div>
                  {activePrayer.latinTitle && (
                    <p className="text-sm font-serif italic text-[var(--pc-7c2d2d)] mt-0.5">
                      {activePrayer.latinTitle}
                    </p>
                  )}
                  {activePrayer.traditionalTime && (
                    <div className="flex items-center gap-1.5 text-xs font-serif text-[var(--pc-8c7e77)] mt-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--pc-b48a3c)]" />
                      <span>{activePrayer.traditionalTime}</span>
                    </div>
                  )}
                </div>

                {/* Toolbar buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Latin toggle if available */}
                  {activePrayer.textLatin && (
                    <button
                      onClick={() => setUseLatin(!useLatin)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-serif border transition-colors ${
                        useLatin
                          ? 'bg-[var(--pc-7c2d2d)] text-[var(--pc-faf7f2)] border-[var(--pc-7c2d2d)]'
                          : 'bg-[var(--pc-f3ece1)] text-[var(--pc-4a3e39)] border-[var(--pc-e2d4c3)] hover:bg-[var(--pc-ebe2d5)]'
                      }`}
                      title="Toggle Latin and English"
                    >
                      <Languages className="w-3.5 h-3.5" />
                      <span>{useLatin ? 'Latin' : 'English'}</span>
                    </button>
                  )}

                  {/* Attentive prayer mode toggle */}
                  <button
                    onClick={() => {
                      setAttentiveMode(!attentiveMode);
                      setAttentiveStep(0);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-serif border transition-colors ${
                      attentiveMode
                        ? 'bg-[var(--pc-b48a3c)] text-[var(--pc-faf7f2)] border-[var(--pc-b48a3c)]'
                        : 'bg-[var(--pc-f3ece1)] text-[var(--pc-4a3e39)] border-[var(--pc-e2d4c3)] hover:bg-[var(--pc-ebe2d5)]'
                    }`}
                    title="Pray slowly, line by line"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{attentiveMode ? 'Line-by-Line' : 'Attentive Mode'}</span>
                  </button>

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(currentText)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-serif bg-[var(--pc-f3ece1)] text-[var(--pc-4a3e39)] border border-[var(--pc-e2d4c3)] hover:bg-[var(--pc-ebe2d5)] transition-colors"
                    title="Copy prayer text"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Instructions if available */}
              {activePrayer.instructions && (
                <div className="mb-6 p-3 bg-[var(--pc-faf4eb)] border-l-2 border-[var(--pc-b48a3c)] rounded-r text-xs font-serif text-[var(--pc-6b5e59)] italic">
                  {activePrayer.instructions}
                </div>
              )}

              {/* Attentive Mode vs Standard Full Text */}
              {attentiveMode ? (
                <div className="my-8 text-center bg-[var(--pc-faf4eb)] border border-[var(--pc-e5dbc7)] rounded-xl p-8 shadow-inner">
                  <span className="text-[11px] uppercase font-cinzel tracking-wider text-[var(--pc-7c2d2d)] font-bold block mb-4">
                    PRAY ATTENTIVELY • LINE {attentiveStep + 1} OF {prayerLines.length}
                  </span>

                  <p className="font-display font-medium text-2xl sm:text-3xl text-[var(--pc-2c2523)] leading-relaxed max-w-xl mx-auto my-6 min-h-[4rem] flex items-center justify-center">
                    "{prayerLines[attentiveStep]}"
                  </p>

                  <p className="text-xs font-serif italic text-[var(--pc-8c7e77)] mb-6">
                    Breathe slowly. Speak or meditate upon each word without rushing.
                  </p>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setAttentiveStep(prev => Math.max(0, prev - 1))}
                      disabled={attentiveStep === 0}
                      className="px-3 py-1.5 rounded-md border border-[var(--pc-e2d4c3)] bg-[var(--pc-faf7f2)] text-xs font-serif disabled:opacity-30 hover:bg-[var(--pc-f5efe6)] flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={handlePlayChime}
                      className="p-2 rounded-full border border-[var(--pc-e2d4c3)] bg-[var(--pc-faf7f2)] hover:bg-[var(--pc-f5efe6)] text-[var(--pc-7c2d2d)]"
                      title="Chime"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {attentiveStep < prayerLines.length - 1 ? (
                      <button
                        onClick={() => setAttentiveStep(prev => prev + 1)}
                        className="px-4 py-1.5 rounded-md bg-[var(--pc-7c2d2d)] text-[var(--pc-faf7f2)] text-xs font-serif hover:bg-[var(--pc-682424)] flex items-center gap-1 shadow-2xs font-medium"
                      >
                        <span>Next Line</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setAttentiveStep(0);
                          setAttentiveMode(false);
                        }}
                        className="px-4 py-1.5 rounded-md bg-green-800 text-[var(--pc-faf7f2)] text-xs font-serif hover:bg-green-900 flex items-center gap-1 shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Amen (Finish)</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Standard Full Text View */
                <div className="py-2">
                  <div className={`font-serif text-[var(--pc-2c2523)] leading-relaxed whitespace-pre-line ${fontSizeClass}`}>
                    {currentText}
                  </div>
                </div>
              )}

              {/* Bottom Quick-Action */}
              {onAddToRhythm && (
                <div className="mt-8 pt-4 border-t border-[var(--pc-eae1d2)] flex justify-end">
                  <button
                    onClick={() => onAddToRhythm(activePrayer)}
                    className="flex items-center gap-1.5 text-xs font-serif px-3 py-1.5 rounded-md bg-[var(--pc-f3ece1)] hover:bg-[var(--pc-ebe2d5)] text-[var(--pc-7c2d2d)] font-medium border border-[var(--pc-e2d4c3)] transition-colors"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Include in Daily Rhythm</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="p-12 text-center text-sm font-serif text-[var(--pc-8c7e77)] bg-[var(--pc-faf7f2)] border border-[var(--pc-e8dfc8)] rounded-xl">
              Select a prayer from the list to view.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
