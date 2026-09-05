/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, PrayerItem } from './types';
import { Header } from './components/Header';
import { GuideReader } from './components/GuideReader';
import { PrayerBook } from './components/PrayerBook';
import { QuietPrayerTimer } from './components/QuietPrayerTimer';
import { DailyRhythmTracker } from './components/DailyRhythmTracker';
import { PrintablePocketGuide } from './components/PrintablePocketGuide';
import { motion, AnimatePresence } from 'motion/react';
import { Cross, BookOpen, HeartHandshake, Flame, Clock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('guide');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [selectedPrayerId, setSelectedPrayerId] = useState<string | null>(null);

  // Sync scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const fontSizeClass = 
    fontSize === 'larger' ? 'text-lg sm:text-xl' :
    fontSize === 'large' ? 'text-base sm:text-lg' :
    'text-sm sm:text-base';

  const handleSelectPrayer = (prayerId: string) => {
    setSelectedPrayerId(prayerId);
    setActiveTab('prayers');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2523] selection:bg-[#E2D4C3]">
      {/* Top App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* Main Content Area with Animated Transitions */}
      <main className="grow py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <GuideReader
                fontSizeClass={fontSizeClass}
                onNavigateTab={setActiveTab}
                onSelectPrayer={handleSelectPrayer}
              />
            </motion.div>
          )}

          {activeTab === 'prayers' && (
            <motion.div
              key="prayers"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <PrayerBook
                fontSizeClass={fontSizeClass}
                selectedPrayerId={selectedPrayerId}
                onClearSelectedPrayer={() => setSelectedPrayerId(null)}
                onAddToRhythm={() => setActiveTab('rhythm')}
              />
            </motion.div>
          )}

          {activeTab === 'silence' && (
            <motion.div
              key="silence"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <QuietPrayerTimer />
            </motion.div>
          )}

          {activeTab === 'rhythm' && (
            <motion.div
              key="rhythm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DailyRhythmTracker
                onNavigateTab={setActiveTab}
                onSelectPrayer={handleSelectPrayer}
              />
            </motion.div>
          )}

          {activeTab === 'pocket' && (
            <motion.div
              key="pocket"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <PrintablePocketGuide onBackToGuide={() => setActiveTab('guide')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Reverent Footer */}
      <footer className="no-print border-t border-[#E8DFC8] bg-[#F5EFE6] py-8 text-center text-xs font-serif text-[#6B5E59]">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-[#D8CEB8]" />
            <Cross className="w-3.5 h-3.5 text-[#7C2D2D]" />
            <div className="h-px w-8 bg-[#D8CEB8]" />
          </div>

          <p className="font-display italic text-sm text-[#7C2D2D]">
            "It is better to pray simply every day than to attempt too much and quickly give up."
          </p>

          <p className="text-[11px] text-[#8C7E77]">
            Based upon the pastoral writing of Father John • How to Begin a Daily Prayer Life
          </p>

          <div className="flex items-center justify-center gap-4 text-[11px] pt-1">
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-[#7C2D2D] underline underline-offset-2"
            >
              The Guide
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('prayers')}
              className="hover:text-[#7C2D2D] underline underline-offset-2"
            >
              Prayer Treasury
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('silence')}
              className="hover:text-[#7C2D2D] underline underline-offset-2"
            >
              Quiet Prayer
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('pocket')}
              className="hover:text-[#7C2D2D] underline underline-offset-2"
            >
              Pocket Card
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
