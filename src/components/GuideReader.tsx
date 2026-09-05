import React, { useState } from 'react';
import { 
  GUIDE_TITLE, 
  GUIDE_AUTHOR, 
  INTRODUCTORY_COUNSEL, 
  GUIDE_SECTIONS, 
  CLOSING_BENEDICTION 
} from '../data/guideContent';
import { ActiveTab } from '../types';
import { 
  CheckCircle2, 
  Flame, 
  BookOpen, 
  ArrowRight, 
  Quote, 
  Sparkles,
  Bookmark,
  Share2,
  Check
} from 'lucide-react';

interface GuideReaderProps {
  fontSizeClass: string;
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectPrayer?: (prayerId: string) => void;
}

export const GuideReader: React.FC<GuideReaderProps> = ({
  fontSizeClass,
  onNavigateTab,
  onSelectPrayer
}) => {
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('prayer_guide_completed_sections');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [copiedLink, setCopiedLink] = useState(false);

  const toggleSection = (id: string) => {
    setCompletedSections(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('prayer_guide_completed_sections', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* Editorial Header & Title */}
      <header className="text-center border-b border-[#E8DFC8] pb-8 mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-10 bg-[#B48A3C]" />
          <span className="text-xs uppercase font-cinzel tracking-widest text-[#7C2D2D] font-semibold">
            Pastoral Counsel
          </span>
          <div className="h-px w-10 bg-[#B48A3C]" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2523] tracking-tight leading-tight">
          {GUIDE_TITLE}
        </h1>

        <p className="font-serif italic text-base sm:text-lg text-[#6B5E59] mt-3">
          By {GUIDE_AUTHOR}
        </p>

        {/* Action bar */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs font-serif text-[#6B5E59]">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3ECE1] hover:bg-[#EBE2D5] text-[#4A3E39] transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share Guide'}</span>
          </button>
          <button
            onClick={() => onNavigateTab('pocket')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3ECE1] hover:bg-[#EBE2D5] text-[#4A3E39] transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#7C2D2D]" />
            <span>Print Pocket Card</span>
          </button>
        </div>
      </header>

      {/* Opening Thesis Statement */}
      <div className="bg-[#FAF4EB] border-l-3 border-[#7C2D2D] p-5 sm:p-6 rounded-r-lg mb-10 shadow-2xs">
        <p className={`font-serif text-[#2C2523] leading-relaxed mb-4 ${fontSizeClass} drop-cap`}>
          {INTRODUCTORY_COUNSEL.hook}
        </p>
        <p className={`font-serif text-[#2C2523] leading-relaxed mb-4 ${fontSizeClass}`}>
          {INTRODUCTORY_COUNSEL.corePrinciple}
        </p>
        <div className="mt-4 pt-4 border-t border-[#EAE1D2] flex items-start gap-3">
          <Quote className="w-5 h-5 text-[#B48A3C] shrink-0 mt-0.5" />
          <p className="font-display font-medium text-lg sm:text-xl text-[#7C2D2D] italic leading-snug">
            "{INTRODUCTORY_COUNSEL.foundationalRule}"
          </p>
        </div>
      </div>

      {/* Quick Navigation Anchor Bar */}
      <div className="bg-[#F5EFE6]/80 rounded-lg p-4 mb-10 border border-[#E8DFC8]">
        <h2 className="text-xs uppercase font-cinzel tracking-wider text-[#7C2D2D] font-bold mb-2">
          Guide Contents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
          {GUIDE_SECTIONS.map((sec, idx) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="flex items-center justify-between p-2 rounded hover:bg-[#FAF7F2] text-[#4A3E39] hover:text-[#7C2D2D] transition-colors border border-transparent hover:border-[#E2D4C3]"
            >
              <span className="truncate">{sec.title}</span>
              {completedSections[sec.id] && (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-700 shrink-0 ml-1" />
              )}
            </a>
          ))}
        </div>
      </div>

      {/* The 5 Core Sections */}
      <div className="space-y-12">
        {GUIDE_SECTIONS.map((section, idx) => {
          const isCompleted = !!completedSections[section.id];

          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-b border-[#EAE1D2] pb-12 last:border-b-0"
            >
              {/* Section Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2523] tracking-tight">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-sm font-serif italic text-[#6B5E59] mt-0.5">
                      {section.subtitle}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => toggleSection(section.id)}
                  className={`shrink-0 flex items-center gap-1.5 text-xs font-serif px-2.5 py-1 rounded-full border transition-colors ${
                    isCompleted
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : 'bg-[#F5EFE6] text-[#6B5E59] border-[#E2D4C3] hover:text-[#2C2523]'
                  }`}
                  title="Mark section as reflected upon"
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-green-700' : 'text-[#8C7E77]'}`} />
                  <span>{isCompleted ? 'Reflected' : 'Mark Read'}</span>
                </button>
              </div>

              {/* Core Text Paragraphs */}
              <div className="space-y-4 mb-6">
                {section.content.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className={`font-serif text-[#2C2523] leading-relaxed ${fontSizeClass}`}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Highlight Quote */}
              {section.quote && (
                <div className="my-6 pl-4 border-l-2 border-[#B48A3C] bg-[#FAF4EB]/60 py-3 pr-4 rounded-r">
                  <p className="font-display italic text-lg sm:text-xl text-[#7C2D2D] leading-snug">
                    "{section.quote}"
                  </p>
                </div>
              )}

              {/* Actionable Practical Guidance Box */}
              {section.keyPractices && section.keyPractices.length > 0 && (
                <div className="bg-[#FAF7F2] border border-[#E5DBC7] rounded-lg p-4 sm:p-5 my-6 shadow-2xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[#B48A3C]" />
                    <h3 className="font-cinzel text-xs uppercase tracking-wider text-[#7C2D2D] font-bold">
                      Practical Application
                    </h3>
                  </div>

                  <ul className="space-y-2.5">
                    {section.keyPractices.map((practice, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C2D2D] mt-2 shrink-0" />
                        <span className={`font-serif text-[#3E3431] leading-normal ${fontSizeClass}`}>
                          {practice}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Section-Specific Quick-Actions */}
                  <div className="mt-4 pt-3 border-t border-[#EAE1D2] flex flex-wrap gap-2">
                    {section.id === 'begin-simply' && (
                      <>
                        <button
                          onClick={() => onNavigateTab('rhythm')}
                          className="text-xs font-serif inline-flex items-center gap-1 text-[#7C2D2D] hover:text-[#581F1F] font-semibold bg-[#F5EFE6] px-2.5 py-1.5 rounded hover:bg-[#EBE2D5]"
                        >
                          <span>Build My Daily Rhythm</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (onSelectPrayer) onSelectPrayer('morning-offering');
                            onNavigateTab('prayers');
                          }}
                          className="text-xs font-serif inline-flex items-center gap-1 text-[#4A3E39] hover:text-[#7C2D2D] bg-[#F5EFE6] px-2.5 py-1.5 rounded hover:bg-[#EBE2D5]"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#7C2D2D]" />
                          <span>View Morning Offering</span>
                        </button>
                      </>
                    )}

                    {section.id === 'fixed-times' && (
                      <>
                        <button
                          onClick={() => onNavigateTab('rhythm')}
                          className="text-xs font-serif inline-flex items-center gap-1 text-[#7C2D2D] hover:text-[#581F1F] font-semibold bg-[#F5EFE6] px-2.5 py-1.5 rounded hover:bg-[#EBE2D5]"
                        >
                          <span>Set Up Fixed Time Reminders</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (onSelectPrayer) onSelectPrayer('the-angelus');
                            onNavigateTab('prayers');
                          }}
                          className="text-xs font-serif inline-flex items-center gap-1 text-[#4A3E39] hover:text-[#7C2D2D] bg-[#F5EFE6] px-2.5 py-1.5 rounded hover:bg-[#EBE2D5]"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#7C2D2D]" />
                          <span>The Angelus Prayer</span>
                        </button>
                      </>
                    )}

                    {section.id === 'simple-prayers' && (
                      <button
                        onClick={() => onNavigateTab('prayers')}
                        className="text-xs font-serif inline-flex items-center gap-1 text-[#7C2D2D] hover:text-[#581F1F] font-semibold bg-[#F5EFE6] px-2.5 py-1.5 rounded hover:bg-[#EBE2D5]"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#7C2D2D]" />
                        <span>Explore the Prayer Treasury</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {section.id === 'quiet-presence' && (
                      <button
                        onClick={() => onNavigateTab('silence')}
                        className="text-xs font-serif inline-flex items-center gap-1 text-[#7C2D2D] hover:text-[#581F1F] font-semibold bg-[#F5EFE6] px-2.5 py-1.5 rounded hover:bg-[#EBE2D5]"
                      >
                        <Flame className="w-3.5 h-3.5 text-[#B48A3C]" />
                        <span>Begin 3-Minute Silent Prayer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Scriptural Anchor */}
              {section.scriptureReference && (
                <div className="text-xs font-serif text-[#6B5E59] italic flex items-baseline gap-2 mt-3">
                  <span className="font-semibold text-[#7C2D2D] not-italic">
                    {section.scriptureReference.verse}:
                  </span>
                  <span>"{section.scriptureReference.text}"</span>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Pastoral Benediction / Conclusion */}
      <footer className="mt-12 pt-8 border-t border-[#E2D4C3] text-center bg-[#FAF4EB] p-8 rounded-xl border">
        <div className="w-8 h-8 rounded-full bg-[#7C2D2D]/10 text-[#7C2D2D] mx-auto flex items-center justify-center mb-3">
          †
        </div>
        <p className="font-display italic text-xl sm:text-2xl text-[#7C2D2D] max-w-xl mx-auto leading-relaxed">
          "{CLOSING_BENEDICTION}"
        </p>
        <p className="font-cinzel text-xs tracking-widest uppercase text-[#8C7E77] mt-3">
          — Father John
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigateTab('silence')}
            className="px-4 py-2 bg-[#7C2D2D] text-[#FAF7F2] rounded-md font-serif text-sm hover:bg-[#682424] transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4 text-[#E2D4C3]" />
            <span>Sit Quietly for 5 Minutes</span>
          </button>
          <button
            onClick={() => onNavigateTab('prayers')}
            className="px-4 py-2 bg-[#F3ECE1] text-[#2C2523] border border-[#E2D4C3] rounded-md font-serif text-sm hover:bg-[#EBE2D5] transition-colors"
          >
            Browse Recommended Prayers
          </button>
        </div>
      </footer>
    </article>
  );
};
