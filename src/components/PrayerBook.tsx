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
      <div className="bg-[#FAF4EB] border border-[#E8DFC8] rounded-xl p-5 sm:p-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
            <span className="text-xs uppercase font-cinzel tracking-widest text-[#7C2D2D] font-bold">
              Father John's Treasury
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2523]">
            Simple Catholic Prayers
          </h2>
          <p className="font-serif italic text-sm text-[#6B5E59] mt-1 max-w-xl">
            "The Church already gives us many excellent prayers... Do not underestimate the power of simple prayers said attentively."
          </p>
        </div>

        <button
          onClick={handlePlayChime}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#F3ECE1] hover:bg-[#EBE2D5] border border-[#E2D4C3] text-xs font-serif text-[#4A3E39] transition-colors"
          title="Play chapel bell"
        >
          <Volume2 className="w-4 h-4 text-[#7C2D2D]" />
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
                  ? 'bg-[#7C2D2D] text-[#FAF7F2] font-medium shadow-2xs'
                  : 'bg-[#F3ECE1] text-[#6B5E59] hover:bg-[#EBE2D5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7E77]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search prayers..."
            className="w-full bg-[#FAF7F2] border border-[#E2D4C3] rounded-md pl-9 pr-3 py-1.5 text-xs font-serif text-[#2C2523] placeholder-[#8C7E77] focus:outline-hidden focus:border-[#7C2D2D]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7E77] hover:text-[#2C2523]"
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
            <div className="text-center py-8 text-xs font-serif text-[#8C7E77]">
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
                      ? 'bg-[#FAF4EB] border-[#7C2D2D] shadow-xs'
                      : 'bg-[#FAF7F2] border-[#E8DFC8] hover:border-[#D8CEB8] hover:bg-[#F8F4ED]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-serif font-bold text-sm text-[#2C2523] leading-snug">
                      {p.title}
                    </span>
                    {p.traditionalTime && (
                      <span className="text-[10px] text-[#7C2D2D] font-cinzel uppercase shrink-0">
                        {p.traditionalTime.split('•')[0]}
                      </span>
                    )}
                  </div>
                  {p.latinTitle && (
                    <p className="text-[11px] font-serif italic text-[#8C7E77]">
                      {p.latinTitle}
                    </p>
                  )}
                  <p className="text-xs font-serif text-[#6B5E59] line-clamp-2 mt-1">
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
            <div className="bg-[#FAF7F2] border border-[#E8DFC8] rounded-xl p-6 sm:p-8 shadow-xs">
              
              {/* Card Header & Controls */}
              <div className="border-b border-[#EAE1D2] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2523]">
                      {activePrayer.title}
                    </h3>
                  </div>
                  {activePrayer.latinTitle && (
                    <p className="text-sm font-serif italic text-[#7C2D2D] mt-0.5">
                      {activePrayer.latinTitle}
                    </p>
                  )}
                  {activePrayer.traditionalTime && (
                    <div className="flex items-center gap-1.5 text-xs font-serif text-[#8C7E77] mt-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B48A3C]" />
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
                          ? 'bg-[#7C2D2D] text-[#FAF7F2] border-[#7C2D2D]'
                          : 'bg-[#F3ECE1] text-[#4A3E39] border-[#E2D4C3] hover:bg-[#EBE2D5]'
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
                        ? 'bg-[#B48A3C] text-[#FAF7F2] border-[#B48A3C]'
                        : 'bg-[#F3ECE1] text-[#4A3E39] border-[#E2D4C3] hover:bg-[#EBE2D5]'
                    }`}
                    title="Pray slowly, line by line"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{attentiveMode ? 'Line-by-Line' : 'Attentive Mode'}</span>
                  </button>

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(currentText)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-serif bg-[#F3ECE1] text-[#4A3E39] border border-[#E2D4C3] hover:bg-[#EBE2D5] transition-colors"
                    title="Copy prayer text"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Instructions if available */}
              {activePrayer.instructions && (
                <div className="mb-6 p-3 bg-[#FAF4EB] border-l-2 border-[#B48A3C] rounded-r text-xs font-serif text-[#6B5E59] italic">
                  {activePrayer.instructions}
                </div>
              )}

              {/* Attentive Mode vs Standard Full Text */}
              {attentiveMode ? (
                <div className="my-8 text-center bg-[#FAF4EB] border border-[#E5DBC7] rounded-xl p-8 shadow-inner">
                  <span className="text-[11px] uppercase font-cinzel tracking-wider text-[#7C2D2D] font-bold block mb-4">
                    PRAY ATTENTIVELY • LINE {attentiveStep + 1} OF {prayerLines.length}
                  </span>

                  <p className="font-display font-medium text-2xl sm:text-3xl text-[#2C2523] leading-relaxed max-w-xl mx-auto my-6 min-h-[4rem] flex items-center justify-center">
                    "{prayerLines[attentiveStep]}"
                  </p>

                  <p className="text-xs font-serif italic text-[#8C7E77] mb-6">
                    Breathe slowly. Speak or meditate upon each word without rushing.
                  </p>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setAttentiveStep(prev => Math.max(0, prev - 1))}
                      disabled={attentiveStep === 0}
                      className="px-3 py-1.5 rounded-md border border-[#E2D4C3] bg-[#FAF7F2] text-xs font-serif disabled:opacity-30 hover:bg-[#F5EFE6] flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={handlePlayChime}
                      className="p-2 rounded-full border border-[#E2D4C3] bg-[#FAF7F2] hover:bg-[#F5EFE6] text-[#7C2D2D]"
                      title="Chime"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {attentiveStep < prayerLines.length - 1 ? (
                      <button
                        onClick={() => setAttentiveStep(prev => prev + 1)}
                        className="px-4 py-1.5 rounded-md bg-[#7C2D2D] text-[#FAF7F2] text-xs font-serif hover:bg-[#682424] flex items-center gap-1 shadow-2xs font-medium"
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
                        className="px-4 py-1.5 rounded-md bg-green-800 text-[#FAF7F2] text-xs font-serif hover:bg-green-900 flex items-center gap-1 shadow-2xs"
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
                  <div className={`font-serif text-[#2C2523] leading-relaxed whitespace-pre-line ${fontSizeClass}`}>
                    {currentText}
                  </div>
                </div>
              )}

              {/* Bottom Quick-Action */}
              {onAddToRhythm && (
                <div className="mt-8 pt-4 border-t border-[#EAE1D2] flex justify-end">
                  <button
                    onClick={() => onAddToRhythm(activePrayer)}
                    className="flex items-center gap-1.5 text-xs font-serif px-3 py-1.5 rounded-md bg-[#F3ECE1] hover:bg-[#EBE2D5] text-[#7C2D2D] font-medium border border-[#E2D4C3] transition-colors"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Include in Daily Rhythm</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="p-12 text-center text-sm font-serif text-[#8C7E77] bg-[#FAF7F2] border border-[#E8DFC8] rounded-xl">
              Select a prayer from the list to view.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
