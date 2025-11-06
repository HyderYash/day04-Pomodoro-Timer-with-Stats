'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import TimerDisplay from '@/components/TimerDisplay';
import ControlButtons from '@/components/ControlButtons';
import StatsCard from '@/components/StatsCard';
import ChartSection from '@/components/ChartSection';
import SettingsModal from '@/components/SettingsModal';
import ThemeToggle from '@/components/ThemeToggle';
import { useTimer, TimerMode } from '@/lib/useTimer';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { minutesToSeconds, getTodayDateString, getLast7Days } from '@/lib/timeUtils';

interface Stats {
  totalFocusMinutes: number;
  totalSessions: number;
  longestStreak: number;
  dailyData: Record<string, number>;
  lastSessionDate: string;
  currentStreak: number;
}

const defaultStats: Stats = {
  totalFocusMinutes: 0,
  totalSessions: 0,
  longestStreak: 0,
  dailyData: {},
  lastSessionDate: '',
  currentStreak: 0,
};

interface Settings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  autoSwitch: boolean;
  soundEnabled: boolean;
}

const defaultSettings: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoSwitch: true,
  soundEnabled: true,
};

export default function Home() {
  const [stats, setStats] = useLocalStorage<Stats>('pomodoro-stats', defaultStats);
  const [settings, setSettings] = useLocalStorage<Settings>('pomodoro-settings', defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationAudio, setNotificationAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && settings.soundEnabled) {
      const audio = new Audio('/sounds/notification.mp3');
      audio.volume = 0.5;
      setNotificationAudio(audio);
    }
  }, [settings.soundEnabled]);

  const handleTimerComplete = useCallback(
    (mode: TimerMode) => {
      if (mode === 'focus') {
        const today = getTodayDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        setStats((prev) => {
          const newDailyData = { ...prev.dailyData };
          const focusMinutes = settings.focusDuration;
          newDailyData[today] = (newDailyData[today] || 0) + focusMinutes;

          let newStreak = prev.currentStreak;
          if (prev.lastSessionDate === yesterdayStr || prev.lastSessionDate === today) {
            newStreak = prev.lastSessionDate === today ? prev.currentStreak : prev.currentStreak + 1;
          } else if (prev.lastSessionDate !== today) {
            newStreak = 1;
          }

          return {
            totalFocusMinutes: prev.totalFocusMinutes + focusMinutes,
            totalSessions: prev.totalSessions + 1,
            longestStreak: Math.max(prev.longestStreak, newStreak),
            dailyData: newDailyData,
            lastSessionDate: today,
            currentStreak: newStreak,
          };
        });

        if (notificationAudio && settings.soundEnabled) {
          notificationAudio.play().catch(() => {
            // Ignore audio play errors
          });
        }
      }

      if (settings.autoSwitch) {
        // Auto-switch logic would be handled by the timer hook
        // For now, we'll let the user manually switch
      }
    },
    [settings, setStats, notificationAudio]
  );

  const timer = useTimer({
    focusDuration: minutesToSeconds(settings.focusDuration),
    shortBreakDuration: minutesToSeconds(settings.shortBreakDuration),
    longBreakDuration: minutesToSeconds(settings.longBreakDuration),
    autoSwitch: settings.autoSwitch,
    onComplete: handleTimerComplete,
  });

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const handleResetStats = () => {
    if (confirm('Are you sure you want to reset all stats? This cannot be undone.')) {
      setStats(defaultStats);
    }
  };

  const chartData = getLast7Days().map((date) => ({
    date,
    minutes: stats.dailyData[date] || 0,
  }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F5F7] via-[#FAFAFA] to-[#F0F0F0] dark:from-[#000000] dark:via-[#0A0A0A] dark:to-[#000000] transition-colors duration-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-light dark:text-text-dark">
            Pomodoro Timer 🍏 — Day 4 of #100Days100Projects
          </h1>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-full bg-white dark:bg-[#2C2C2E] text-text-light dark:text-text-dark hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] transition-colors shadow-sm border border-border-light dark:border-border-dark"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <ThemeToggle />
          </div>
        </motion.header>

        {/* Timer Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <TimerDisplay
            time={timer.formattedTime}
            progress={timer.progress}
            mode={timer.mode}
            isRunning={timer.isRunning}
          />
          <ControlButtons
            isRunning={timer.isRunning}
            onStart={timer.startTimer}
            onPause={timer.pauseTimer}
            onReset={timer.resetTimer}
          />
          <div className="flex items-center justify-center gap-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => timer.switchMode('focus')}
              className={`px-5 py-2.5 rounded-[12px] text-sm font-medium transition-all ${
                timer.mode === 'focus'
                  ? 'bg-accent-light dark:bg-accent-dark text-white shadow-sm'
                  : 'bg-white dark:bg-[#2C2C2E] text-text-light dark:text-text-dark hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] border border-border-light dark:border-border-dark'
              }`}
            >
              Focus
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => timer.switchMode('shortBreak')}
              className={`px-5 py-2.5 rounded-[12px] text-sm font-medium transition-all ${
                timer.mode === 'shortBreak'
                  ? 'bg-accent-light dark:bg-accent-dark text-white shadow-sm'
                  : 'bg-white dark:bg-[#2C2C2E] text-text-light dark:text-text-dark hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] border border-border-light dark:border-border-dark'
              }`}
            >
              Short Break
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => timer.switchMode('longBreak')}
              className={`px-5 py-2.5 rounded-[12px] text-sm font-medium transition-all ${
                timer.mode === 'longBreak'
                  ? 'bg-accent-light dark:bg-accent-dark text-white shadow-sm'
                  : 'bg-white dark:bg-[#2C2C2E] text-text-light dark:text-text-dark hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] border border-border-light dark:border-border-dark'
              }`}
            >
              Long Break
            </motion.button>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatsCard
              label="Total Focus Time"
              value={`${stats.totalFocusMinutes}m`}
              icon="clock"
            />
            <StatsCard
              label="Sessions Completed"
              value={stats.totalSessions}
              icon="target"
            />
            <StatsCard
              label="Longest Streak"
              value={`${stats.longestStreak} days`}
              icon="flame"
            />
          </div>
          <ChartSection data={chartData} />
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 text-text-light dark:text-text-dark opacity-60 text-sm"
        >
          Built by Yash Sharma 🍏 — #100Days100Projects
        </motion.footer>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        focusDuration={settings.focusDuration}
        shortBreakDuration={settings.shortBreakDuration}
        longBreakDuration={settings.longBreakDuration}
        autoSwitch={settings.autoSwitch}
        soundEnabled={settings.soundEnabled}
        onSave={handleSaveSettings}
        onResetStats={handleResetStats}
      />
    </main>
  );
}

