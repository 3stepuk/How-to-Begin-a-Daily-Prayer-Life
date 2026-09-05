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
      <header className="text-center border-b border-[var(--pc-e8dfc8)] pb-8 mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-10 bg-[var(--pc-b48a3c)]" />
          <span className="text-xs uppercase font-cinzel tracking-widest text-[var(--pc-7c2d2d)] font-semibold">
            Pastoral Counsel
          </span>
          <div className="h-px w-10 bg-[var(--pc-b48a3c)]" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--pc-2c2523)] tracking-tight leading-tight">
          {GUIDE_TITLE}
        </h1>

        <p className="font-serif italic text-base sm:text-lg text-[var(--pc-6b5e59)] mt-3">
          By {GUIDE_AUTHOR}
        </p>

        {/* Action bar */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs font-serif text-[var(--pc-6b5e59)]">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--pc-f3ece1)] hover:bg-[var(--pc-ebe2d5)] text-[var(--pc-4a3e39)] transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share Guide'}</span>
          </button>
          <button
            onClick={() => onNavigateTab('pocket')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--pc-f3ece1)] hover:bg-[var(--pc-ebe2d5)] text-[var(--pc-4a3e39)] transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5 text-[var(--pc-7c2d2d)]" />
            <span>Print Pocket Card</span>
          </button>
        </div>
      </header>

      {/* Opening Thesis Statement */}
      <div className="bg-[var(--pc-faf4eb)] border-l-3 border-[var(--pc-7c2d2d)] p-5 sm:p-6 rounded-r-lg mb-10 shadow-2xs">
        <p className={`font-serif text-[var(--pc-2c2523)] leading-relaxed mb-4 ${fontSizeClass} drop-cap`}>
          {INTRODUCTORY_COUNSEL.hook}
        </p>
        <p className={`font-serif text-[var(--pc-2c2523)] leading-relaxed mb-4 ${fontSizeClass}`}>
          {INTRODUCTORY_COUNSEL.corePrinciple}
        </p>
        <div className="mt-4 pt-4 border-t border-[var(--pc-eae1d2)] flex items-start gap-3">
          <Quote className="w-5 h-5 text-[var(--pc-b48a3c)] shrink-0 mt-0.5" />
          <p className="font-display font-medium text-lg sm:text-xl text-[var(--pc-7c2d2d)] italic leading-snug">
            "{INTRODUCTORY_COUNSEL.foundationalRule}"
          </p>
        </div>
      </div>

      {/* Quick Navigation Anchor Bar */}
      <div className="bg-[var(--pc-f5efe6)]/80 rounded-lg p-4 mb-10 border border-[var(--pc-e8dfc8)]">
        <h2 className="text-xs uppercase font-cinzel tracking-wider text-[var(--pc-7c2d2d)] font-bold mb-2">
          Guide Contents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
          {GUIDE_SECTIONS.map((sec, idx) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="flex items-center justify-between p-2 rounded hover:bg-[var(--pc-faf7f2)] text-[var(--pc-4a3e39)] hover:text-[var(--pc-7c2d2d)] transition-colors border border-transparent hover:border-[var(--pc-e2d4c3)]"
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
              className="scroll-mt-24 border-b border-[var(--pc-eae1d2)] pb-12 last:border-b-0"
            >
              {/* Section Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--pc-2c2523)] tracking-tight">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-sm font-serif italic text-[var(--pc-6b5e59)] mt-0.5">
                      {section.subtitle}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => toggleSection(section.id)}
                  className={`shrink-0 flex items-center gap-1.5 text-xs font-serif px-2.5 py-1 rounded-full border transition-colors ${
                    isCompleted
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : 'bg-[var(--pc-f5efe6)] text-[var(--pc-6b5e59)] border-[var(--pc-e2d4c3)] hover:text-[var(--pc-2c2523)]'
                  }`}
                  title="Mark section as reflected upon"
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-green-700' : 'text-[var(--pc-8c7e77)]'}`} />
                  <span>{isCompleted ? 'Reflected' : 'Mark Read'}</span>
                </button>
              </div>

              {/* Core Text Paragraphs */}
              <div className="space-y-4 mb-6">
                {section.content.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className={`font-serif text-[var(--pc-2c2523)] leading-relaxed ${fontSizeClass}`}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Highlight Quote */}
              {section.quote && (
                <div className="my-6 pl-4 border-l-2 border-[var(--pc-b48a3c)] bg-[var(--pc-faf4eb)]/60 py-3 pr-4 rounded-r">
                  <p className="font-display italic text-lg sm:text-xl text-[var(--pc-7c2d2d)] leading-snug">
                    "{section.quote}"
                  </p>
                </div>
              )}

              {/* Actionable Practical Guidance Box */}
              {section.keyPractices && section.keyPractices.length > 0 && (
                <div className="bg-[var(--pc-faf7f2)] border border-[var(--pc-e5dbc7)] rounded-lg p-4 sm:p-5 my-6 shadow-2xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[var(--pc-b48a3c)]" />
                    <h3 className="font-cinzel text-xs uppercase tracking-wider text-[var(--pc-7c2d2d)] font-bold">
                      Practical Application
                    </h3>
                  </div>

                  <ul className="space-y-2.5">
                    {section.keyPractices.map((practice, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--pc-7c2d2d)] mt-2 shrink-0" />
                        <span className={`font-serif text-[var(--pc-3e3431)] leading-normal ${fontSizeClass}`}>
                          {practice}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Section-Specific Quick-Actions */}
                  <div className="mt-4 pt-3 border-t border-[var(--pc-eae1d2)] flex flex-wrap gap-2">
                    {section.id === 'begin-simply' && (
                      <>
                        <button
                          onClick={() => onNavigateTab('rhythm')}
                          className="text-xs font-serif inline-flex items-center gap-1 text-[var(--pc-7c2d2d)] hover:text-[var(--pc-581f1f)] font-semibold bg-[var(--pc-f5efe6)] px-2.5 py-1.5 rounded hover:bg-[var(--pc-ebe2d5)]"
                        >
                          <span>Build My Daily Rhythm</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (onSelectPrayer) onSelectPrayer('morning-offering');
                            onNavigateTab('prayers');
                          }}
                          className="text-xs font-serif inline-flex items-center gap-1 text-[var(--pc-4a3e39)] hover:text-[var(--pc-7c2d2d)] bg-[var(--pc-f5efe6)] px-2.5 py-1.5 rounded hover:bg-[var(--pc-ebe2d5)]"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[var(--pc-7c2d2d)]" />
                          <span>View Morning Offering</span>
                        </button>
                      </>
                    )}

                    {section.id === 'fixed-times' && (
                      <>
                        <button
                          onClick={() => onNavigateTab('rhythm')}
                          className="text-xs font-serif inline-flex items-center gap-1 text-[var(--pc-7c2d2d)] hover:text-[var(--pc-581f1f)] font-semibold bg-[var(--pc-f5efe6)] px-2.5 py-1.5 rounded hover:bg-[var(--pc-ebe2d5)]"
                        >
                          <span>Set Up Fixed Time Reminders</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (onSelectPrayer) onSelectPrayer('the-angelus');
                            onNavigateTab('prayers');
                          }}
                          className="text-xs font-serif inline-flex items-center gap-1 text-[var(--pc-4a3e39)] hover:text-[var(--pc-7c2d2d)] bg-[var(--pc-f5efe6)] px-2.5 py-1.5 rounded hover:bg-[var(--pc-ebe2d5)]"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[var(--pc-7c2d2d)]" />
                          <span>The Angelus Prayer</span>
                        </button>
                      </>
                    )}

                    {section.id === 'simple-prayers' && (
                      <button
                        onClick={() => onNavigateTab('prayers')}
                        className="text-xs font-serif inline-flex items-center gap-1 text-[var(--pc-7c2d2d)] hover:text-[var(--pc-581f1f)] font-semibold bg-[var(--pc-f5efe6)] px-2.5 py-1.5 rounded hover:bg-[var(--pc-ebe2d5)]"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[var(--pc-7c2d2d)]" />
                        <span>Explore the Prayer Treasury</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {section.id === 'quiet-presence' && (
                      <button
                        onClick={() => onNavigateTab('silence')}
                        className="text-xs font-serif inline-flex items-center gap-1 text-[var(--pc-7c2d2d)] hover:text-[var(--pc-581f1f)] font-semibold bg-[var(--pc-f5efe6)] px-2.5 py-1.5 rounded hover:bg-[var(--pc-ebe2d5)]"
                      >
                        <Flame className="w-3.5 h-3.5 text-[var(--pc-b48a3c)]" />
                        <span>Begin 3-Minute Silent Prayer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Scriptural Anchor */}
              {section.scriptureReference && (
                <div className="text-xs font-serif text-[var(--pc-6b5e59)] italic flex items-baseline gap-2 mt-3">
                  <span className="font-semibold text-[var(--pc-7c2d2d)] not-italic">
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
      <footer className="mt-12 pt-8 border-t border-[var(--pc-e2d4c3)] text-center bg-[var(--pc-faf4eb)] p-8 rounded-xl border">
        <div className="w-8 h-8 rounded-full bg-[var(--pc-7c2d2d)]/10 text-[var(--pc-7c2d2d)] mx-auto flex items-center justify-center mb-3">
          †
        </div>
        <p className="font-display italic text-xl sm:text-2xl text-[var(--pc-7c2d2d)] max-w-xl mx-auto leading-relaxed">
          "{CLOSING_BENEDICTION}"
        </p>
        <p className="font-cinzel text-xs tracking-widest uppercase text-[var(--pc-8c7e77)] mt-3">
          — Father John
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigateTab('silence')}
            className="px-4 py-2 bg-[var(--pc-7c2d2d)] text-[var(--pc-faf7f2)] rounded-md font-serif text-sm hover:bg-[var(--pc-682424)] transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4 text-[var(--pc-e2d4c3)]" />
            <span>Sit Quietly for 5 Minutes</span>
          </button>
          <button
            onClick={() => onNavigateTab('prayers')}
            className="px-4 py-2 bg-[var(--pc-f3ece1)] text-[var(--pc-2c2523)] border border-[var(--pc-e2d4c3)] rounded-md font-serif text-sm hover:bg-[var(--pc-ebe2d5)] transition-colors"
          >
            Browse Recommended Prayers
          </button>
        </div>
      </footer>
    </article>
  );
};
