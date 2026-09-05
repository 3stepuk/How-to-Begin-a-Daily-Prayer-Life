export type ActiveTab = 'guide' | 'prayers' | 'silence' | 'rhythm' | 'pocket';

export interface GuideSection {
  id: string;
  title: string;
  subtitle?: string;
  quote?: string;
  content: string[];
  keyPractices?: string[];
  scriptureReference?: {
    verse: string;
    text: string;
  };
}

export interface PrayerItem {
  id: string;
  title: string;
  latinTitle?: string;
  category: 'daily' | 'marian' | 'psalms' | 'communion' | 'devotional';
  shortDescription: string;
  textEnglish: string;
  textLatin?: string;
  instructions?: string;
  traditionalTime?: string;
}

export interface RhythmHabit {
  id: string;
  timeOfDay: 'morning' | 'meals' | 'midday' | 'evening' | 'weekly';
  title: string;
  duration: string;
  description: string;
  suggestedPrayerId?: string;
  completedToday?: boolean;
}
