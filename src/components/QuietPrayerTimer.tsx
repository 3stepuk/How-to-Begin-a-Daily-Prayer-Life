import React, { useState, useEffect, useRef } from 'react';
import { playBellChime } from '../utils/audio';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Quote, 
  Heart, 
  Sparkles,
  CheckCircle2 
} from 'lucide-react';

const PASTORAL_DISTRACTION_COUNSEL = [
  "Do not fight the distraction violently. Simply and gently turn your heart peacefully back to Him.",
  "Fidelity matters far more than strong feelings or emotional warmth.",
  "If you must return to God forty times in five minutes, each return is a genuine act of love.",
  "Prayer is often growing precisely when it feels hidden, dry, and ordinary.",
  "You do not need to perform. It is enough simply to remain in His loving presence.",
  "God looks with tender fatherly affection upon your desire to be with Him."
];

const SACRED_ANCHORS = [
  { label: "Jesus Prayer", text: "Lord Jesus Christ, Son of God, have mercy on me." },
  { label: "Psalm 46:10", text: "Be still, and know that I am God." },
  { label: "Simple Presence", text: "Lord, You are here, and I am here with You." },
  { label: "Fiat", text: "Lord, Thy will be done in all things." },
  { label: "Wordless Silence", text: "— Silent Resting in the Presence of God —" }
];

export const QuietPrayerTimer: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<number>(300); // 5 minutes default (in seconds)
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeAnchorIdx, setActiveAnchorIdx] = useState<number>(2);
  const [distractionAdvice, setDistractionAdvice] = useState<string | null>(null);
  const [distractionCount, setDistractionCount] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setHasFinished(true);
            if (soundEnabled) {
              playBellChime('high');
              setTimeout(() => playBellChime('medium'), 1200);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, soundEnabled]);

  const handleStart = () => {
    if (soundEnabled && timeLeft === selectedDuration) {
      playBellChime('low');
    }
    setHasFinished(false);
    setIsRunning(true);
    setDistractionAdvice(null);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration);
    setHasFinished(false);
    setDistractionAdvice(null);
    setDistractionCount(0);
  };

  const selectDuration = (seconds: number) => {
    setIsRunning(false);
    setSelectedDuration(seconds);
    setTimeLeft(seconds);
    setHasFinished(false);
    setDistractionAdvice(null);
  };

  const handleDistractionClick = () => {
    setDistractionCount(prev => prev + 1);
    const randomAdvice = PASTORAL_DISTRACTION_COUNSEL[Math.floor(Math.random() * PASTORAL_DISTRACTION_COUNSEL.length)];
    setDistractionAdvice(randomAdvice);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      
      {/* Title & Pastoral Quote */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-cinzel tracking-widest text-[#7C2D2D] font-bold block mb-1">
          Father John's Counsel
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2C2523]">
          Sitting Quietly Before God
        </h2>
        <div className="mt-3 max-w-lg mx-auto bg-[#FAF4EB] border border-[#E8DFC8] rounded-lg p-3.5 text-xs sm:text-sm font-serif italic text-[#6B5E59]">
          "Prayer is not only speaking. Sometimes the most fruitful prayer is simply remaining quietly in the presence of God."
        </div>
      </div>

      {/* Sanctuary Card */}
      <div className="bg-[#FAF7F2] border border-[#E8DFC8] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden text-center">
        
        {/* Top Sound Toggle & Duration Controls */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { label: '3 min', sec: 180 },
              { label: '5 min', sec: 300 },
              { label: '10 min', sec: 600 },
              { label: '15 min', sec: 900 }
            ].map(dur => (
              <button
                key={dur.sec}
                onClick={() => selectDuration(dur.sec)}
                disabled={isRunning}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-colors ${
                  selectedDuration === dur.sec
                    ? 'bg-[#7C2D2D] text-[#FAF7F2] font-semibold'
                    : 'bg-[#F3ECE1] text-[#6B5E59] hover:bg-[#EBE2D5] disabled:opacity-40'
                }`}
              >
                {dur.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-md bg-[#F3ECE1] hover:bg-[#EBE2D5] text-[#4A3E39] border border-[#E2D4C3] text-xs transition-colors"
            title={soundEnabled ? 'Bell chime enabled' : 'Bell chime muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#7C2D2D]" /> : <VolumeX className="w-4 h-4 text-[#8C7E77]" />}
          </button>
        </div>

        {/* Gentle Candle Flame SVG Graphic */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="relative w-16 h-28 flex items-end justify-center">
            {/* Candle wax stick */}
            <div className="w-9 h-14 bg-[#F5EFE6] border border-[#DCD1BF] rounded-t-sm shadow-inner relative">
              {/* Subtle wax drip */}
              <div className="absolute -top-1 left-2 w-1.5 h-3 bg-[#EFE6D8] rounded-full" />
            </div>

            {/* Candle wick */}
            <div className="absolute top-10 w-0.5 h-4 bg-[#3E3431]" />

            {/* Candle Flame */}
            <div className="absolute top-2 flex items-center justify-center">
              {/* Outer soft glow */}
              <div className="w-12 h-14 rounded-full bg-[#EAB308]/20 blur-md absolute -top-2" />
              {/* Flame body */}
              <div className="candle-flame w-4 h-8 bg-linear-to-t from-[#F97316] via-[#FBBF24] to-[#FEF08A] rounded-t-full rounded-b-xl shadow-xs" />
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="my-4">
          <div className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wider text-[#2C2523]">
            {formatTime(timeLeft)}
          </div>
          <p className="text-xs font-serif italic text-[#8C7E77] mt-1">
            {isRunning ? "Rest peacefully in His presence" : hasFinished ? "Prayer concluded" : "Ready to begin"}
          </p>
        </div>

        {/* Sacred Anchor Word Selector */}
        <div className="my-6 max-w-md mx-auto">
          <p className="font-serif italic text-base sm:text-lg text-[#7C2D2D] min-h-[3rem] flex items-center justify-center">
            "{SACRED_ANCHORS[activeAnchorIdx].text}"
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
            {SACRED_ANCHORS.map((anchor, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAnchorIdx(idx)}
                className={`text-[11px] font-serif px-2 py-0.5 rounded transition-colors ${
                  activeAnchorIdx === idx
                    ? 'bg-[#F3ECE1] text-[#7C2D2D] font-medium border border-[#E2D4C3]'
                    : 'text-[#8C7E77] hover:text-[#2C2523]'
                }`}
              >
                {anchor.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-center gap-4 my-6">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="px-6 py-2.5 rounded-full bg-[#7C2D2D] hover:bg-[#682424] text-[#FAF7F2] font-serif font-medium text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{timeLeft === selectedDuration ? "Begin Silence" : "Resume"}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-6 py-2.5 rounded-full bg-[#F3ECE1] hover:bg-[#EBE2D5] text-[#2C2523] font-serif font-medium text-sm flex items-center gap-2 border border-[#E2D4C3] transition-all cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#F3ECE1] text-[#6B5E59] border border-[#E2D4C3] transition-colors"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Finished State Greeting */}
        {hasFinished && (
          <div className="my-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto text-center">
            <div className="flex items-center justify-center gap-1.5 text-green-800 text-xs font-cinzel font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-green-700" />
              <span>DEO GRATIAS</span>
            </div>
            <p className="font-serif italic text-xs text-green-900">
              "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be. Amen."
            </p>
          </div>
        )}

        {/* Distraction Release Anchor */}
        <div className="mt-8 pt-6 border-t border-[#EAE1D2] max-w-lg mx-auto">
          <button
            onClick={handleDistractionClick}
            className="text-xs font-serif text-[#6B5E59] hover:text-[#7C2D2D] bg-[#F3ECE1] hover:bg-[#EBE2D5] px-3.5 py-1.5 rounded-full border border-[#E2D4C3] inline-flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B48A3C]" />
            <span>A Distraction Came</span>
            {distractionCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#FAF7F2] text-[#7C2D2D] rounded-full text-[10px] font-bold">
                {distractionCount}
              </span>
            )}
          </button>

          {distractionAdvice && (
            <div className="mt-3 p-3 bg-[#FAF4EB] border-l-2 border-[#7C2D2D] rounded-r text-left text-xs font-serif text-[#4A3E39] leading-relaxed">
              <span className="font-semibold text-[#7C2D2D] block mb-0.5">Father John's Gentle Counsel:</span>
              "{distractionAdvice}"
            </div>
          )}
        </div>

      </div>

      {/* Theological Context Box */}
      <div className="mt-6 text-center text-xs font-serif text-[#8C7E77] max-w-lg mx-auto leading-relaxed">
        "Even if distractions come, remain peacefully before Him. Fidelity matters more than strong feelings."
      </div>

    </div>
  );
};
