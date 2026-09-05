import React, { useState, useEffect } from 'react';
import { RhythmHabit, ActiveTab } from '../types';
import { 
  Sun, 
  Utensils, 
  Compass, 
  Moon, 
  Church, 
  CheckCircle, 
  Circle, 
  Plus, 
  Trash2, 
  ArrowRight,
  Flame,
  Award,
  Sparkles
} from 'lucide-react';

interface DailyRhythmTrackerProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectPrayer?: (prayerId: string) => void;
}

const DEFAULT_HABITS: RhythmHabit[] = [
  {
    id: 'morning-prayer',
    timeOfDay: 'morning',
    title: 'Morning Sign of the Cross & Offering',
    duration: '1–2 min',
    description: 'Make the Sign of the Cross carefully upon waking, offering the works and trials of the day to God.',
    suggestedPrayerId: 'morning-offering',
    completedToday: false
  },
  {
    id: 'grace-meals',
    timeOfDay: 'meals',
    title: 'Grace Before Meals',
    duration: '15 sec',
    description: 'Pause before eating to acknowledge the Lord who gives daily bread and sustenance.',
    suggestedPrayerId: 'grace-before-meals',
    completedToday: false
  },
  {
    id: 'midday-angelus',
    timeOfDay: 'midday',
    title: 'Midday Pause / The Angelus',
    duration: '2 min',
    description: 'Stop at noon to recall the Incarnation of Christ and bring calm into the middle of the working day.',
    suggestedPrayerId: 'the-angelus',
    completedToday: false
  },
  {
    id: 'night-examen',
    timeOfDay: 'evening',
    title: 'Night Prayer & Act of Contrition',
    duration: '3–5 min',
    description: 'A brief examination of conscience: give thanks, express sorrow for sins, and rest under His protection.',
    suggestedPrayerId: 'night-prayer-examen',
    completedToday: false
  },
  {
    id: 'sunday-mass',
    timeOfDay: 'weekly',
    title: 'Sunday Mass as the Centre',
    duration: 'Weekly',
    description: 'The source and summit of the Christian life, gathering with the Church to encounter Christ in the Eucharist.',
    suggestedPrayerId: 'communion-prayers',
    completedToday: false
  }
];

export const DailyRhythmTracker: React.FC<DailyRhythmTrackerProps> = ({
  onNavigateTab,
  onSelectPrayer
}) => {
  const [habits, setHabits] = useState<RhythmHabit[]>(() => {
    try {
      const saved = localStorage.getItem('father_john_daily_habits');
      const savedDate = localStorage.getItem('father_john_habits_date');
      const today = new Date().toDateString();

      if (saved) {
        const parsed: RhythmHabit[] = JSON.parse(saved);
        // If it's a new day, keep the habits but reset completedToday
        if (savedDate !== today) {
          return parsed.map(h => ({ ...h, completedToday: false }));
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_HABITS;
  });

  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('father_john_daily_habits', JSON.stringify(habits));
      localStorage.setItem('father_john_habits_date', new Date().toDateString());
    } catch {
      // ignore
    }
  }, [habits]);

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === id ? { ...h, completedToday: !h.completedToday } : h
      )
    );
  };

  const handleAddCustomHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;

    const newHabit: RhythmHabit = {
      id: `custom-${Date.now()}`,
      timeOfDay: 'morning',
      title: newHabitTitle.trim(),
      duration: '3–5 min',
      description: 'Personal prayer habit added according to Father John\'s guidance.',
      completedToday: false
    };

    setHabits([...habits, newHabit]);
    setNewHabitTitle('');
    setShowAddForm(false);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const completedCount = habits.filter(h => h.completedToday).length;
  const progressPercent = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  const getTimeIcon = (timeOfDay: RhythmHabit['timeOfDay']) => {
    switch (timeOfDay) {
      case 'morning':
        return <Sun className="w-4 h-4 text-amber-600" />;
      case 'meals':
        return <Utensils className="w-4 h-4 text-amber-700" />;
      case 'midday':
        return <Compass className="w-4 h-4 text-sky-700" />;
      case 'evening':
        return <Moon className="w-4 h-4 text-indigo-700" />;
      case 'weekly':
        return <Church className="w-4 h-4 text-[var(--pc-7c2d2d)]" />;
      default:
        return <Sun className="w-4 h-4 text-[var(--pc-7c2d2d)]" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-cinzel tracking-widest text-[var(--pc-7c2d2d)] font-bold block mb-1">
          Father John's Counsel
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--pc-2c2523)]">
          Pray at Fixed Times
        </h2>
        <div className="mt-3 bg-[var(--pc-faf4eb)] border border-[var(--pc-e8dfc8)] rounded-lg p-4 text-xs sm:text-sm font-serif italic text-[var(--pc-6b5e59)] max-w-xl mx-auto">
          "The aim is not merely to 'fit prayer in', but to allow prayer gradually to shape the whole day."
        </div>
      </div>

      {/* Progress & Fidelity Counter */}
      <div className="bg-[var(--pc-faf7f2)] border border-[var(--pc-e8dfc8)] rounded-xl p-5 mb-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--pc-b48a3c)]" />
            <span className="font-cinzel text-xs uppercase tracking-wider text-[var(--pc-7c2d2d)] font-bold">
              Today's Faithful Rhythm
            </span>
          </div>
          <span className="font-serif text-xs text-[var(--pc-6b5e59)]">
            {completedCount} of {habits.length} anchors observed
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[var(--pc-eae1d2)] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[var(--pc-7c2d2d)] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] font-serif italic text-[var(--pc-8c7e77)]">
          <span>"Even five or ten faithful minutes each day can become the beginning of a genuine spiritual life."</span>
          {progressPercent === 100 && (
            <span className="text-[var(--pc-7c2d2d)] font-bold not-italic flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Day Fulfilled
            </span>
          )}
        </div>
      </div>

      {/* Habit List */}
      <div className="space-y-3">
        {habits.map(habit => {
          const isDone = !!habit.completedToday;

          return (
            <div
              key={habit.id}
              className={`border rounded-lg p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDone
                  ? 'bg-[var(--pc-faf4eb)] border-green-200'
                  : 'bg-[var(--pc-faf7f2)] border-[var(--pc-e8dfc8)] hover:border-[var(--pc-d8ceb8)]'
              }`}
            >
              {/* Checkbox & Habit Content */}
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className="mt-0.5 text-[var(--pc-7c2d2d)] hover:text-[var(--pc-5b1f1f)] shrink-0 transition-transform active:scale-95"
                  title={isDone ? 'Mark uncompleted' : 'Mark completed'}
                >
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 fill-green-700 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-[var(--pc-8c7e77)]" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {getTimeIcon(habit.timeOfDay)}
                    <h3 className={`font-serif font-bold text-sm text-[var(--pc-2c2523)] ${isDone ? 'line-through text-[var(--pc-8c7e77)]' : ''}`}>
                      {habit.title}
                    </h3>
                    <span className="text-[10px] uppercase font-cinzel tracking-wider px-1.5 py-0.5 rounded bg-[var(--pc-f3ece1)] text-[var(--pc-7c2d2d)] border border-[var(--pc-e2d4c3)]">
                      {habit.duration}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-[var(--pc-6b5e59)] mt-1 leading-relaxed">
                    {habit.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {habit.suggestedPrayerId && (
                  <button
                    onClick={() => {
                      if (onSelectPrayer) onSelectPrayer(habit.suggestedPrayerId!);
                      onNavigateTab('prayers');
                    }}
                    className="text-xs font-serif text-[var(--pc-7c2d2d)] hover:text-[var(--pc-5b1f1f)] bg-[var(--pc-f3ece1)] hover:bg-[var(--pc-ebe2d5)] px-2.5 py-1 rounded border border-[var(--pc-e2d4c3)] flex items-center gap-1 transition-colors"
                  >
                    <span>Pray</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {habit.id.startsWith('custom-') && (
                  <button
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="p-1 text-[var(--pc-8c7e77)] hover:text-red-700 transition-colors"
                    title="Remove custom prayer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Anchor Action */}
      <div className="mt-6">
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 text-xs font-serif text-[var(--pc-7c2d2d)] hover:text-[var(--pc-581f1f)] font-semibold bg-[var(--pc-f5efe6)] px-3 py-2 rounded-md border border-[var(--pc-e2d4c3)] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add a Simple Custom Anchor (e.g., 1 Psalm or Gospel passage)</span>
          </button>
        ) : (
          <form onSubmit={handleAddCustomHabit} className="bg-[var(--pc-faf7f2)] border border-[var(--pc-e2d4c3)] p-4 rounded-lg">
            <h4 className="text-xs font-cinzel font-bold text-[var(--pc-7c2d2d)] uppercase tracking-wider mb-2">
              Add a Modest Daily Habit
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newHabitTitle}
                onChange={e => setNewHabitTitle(e.target.value)}
                placeholder="e.g., Pray 1 Psalm or read one Gospel chapter..."
                className="grow bg-white border border-[var(--pc-e2d4c3)] rounded px-3 py-1.5 text-xs font-serif text-[var(--pc-2c2523)] focus:outline-hidden focus:border-[var(--pc-7c2d2d)]"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[var(--pc-7c2d2d)] text-white rounded text-xs font-serif hover:bg-[var(--pc-682424)]"
              >
                Add Anchor
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-2 py-1.5 text-xs font-serif text-[var(--pc-8c7e77)] hover:text-[var(--pc-2c2523)]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Pastoral Comfort Footer */}
      <div className="mt-10 p-4 bg-[var(--pc-faf4eb)] border-l-2 border-[var(--pc-b48a3c)] rounded-r text-xs font-serif text-[var(--pc-6b5e59)] leading-relaxed">
        <span className="font-semibold text-[var(--pc-7c2d2d)] block mb-1">
          Father John's Pastoral Reminder:
        </span>
        "If you fall out of your rhythm or miss a day, do not waste time in self-reproach or discouragement. Simply begin again modestly today. Fidelity is measured by getting up and returning to God."
      </div>

    </div>
  );
};
