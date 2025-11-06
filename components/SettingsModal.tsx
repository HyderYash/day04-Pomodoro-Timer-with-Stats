'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Volume2, VolumeX, RotateCcw, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  autoSwitch: boolean;
  soundEnabled: boolean;
  onSave: (settings: {
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    autoSwitch: boolean;
    soundEnabled: boolean;
  }) => void;
  onResetStats: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  focusDuration,
  shortBreakDuration,
  longBreakDuration,
  autoSwitch,
  soundEnabled,
  onSave,
  onResetStats,
}: SettingsModalProps) {
  const [localFocus, setLocalFocus] = useState(focusDuration);
  const [localShortBreak, setLocalShortBreak] = useState(shortBreakDuration);
  const [localLongBreak, setLocalLongBreak] = useState(longBreakDuration);
  const [localAutoSwitch, setLocalAutoSwitch] = useState(autoSwitch);
  const [localSoundEnabled, setLocalSoundEnabled] = useState(soundEnabled);

  useEffect(() => {
    if (isOpen) {
      setLocalFocus(focusDuration);
      setLocalShortBreak(shortBreakDuration);
      setLocalLongBreak(longBreakDuration);
      setLocalAutoSwitch(autoSwitch);
      setLocalSoundEnabled(soundEnabled);
    }
  }, [isOpen, focusDuration, shortBreakDuration, longBreakDuration, autoSwitch, soundEnabled]);

  const handleSave = () => {
    onSave({
      focusDuration: localFocus,
      shortBreakDuration: localShortBreak,
      longBreakDuration: localLongBreak,
      autoSwitch: localAutoSwitch,
      soundEnabled: localSoundEnabled,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white dark:bg-[#1C1C1E] rounded-[24px] shadow-2xl border border-border-light dark:border-border-dark pointer-events-auto max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border-light dark:border-border-dark">
                <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark">
                  Settings
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary-light dark:hover:bg-[#2C2C2E] transition-colors"
                  aria-label="Close settings"
                >
                  <X className="w-5 h-5 text-text-light dark:text-text-dark" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-8">
                  {/* Timer Durations Section */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-accent-light dark:text-accent-dark" />
                      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                        Timer Durations
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2.5">
                          Focus Duration
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="60"
                            value={localFocus}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1;
                              setLocalFocus(Math.min(60, Math.max(1, val)));
                            }}
                            className="w-full px-4 py-3 rounded-[12px] bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-base focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                            placeholder="25"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-light dark:text-text-dark opacity-50">
                            minutes
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2.5">
                          Short Break
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={localShortBreak}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1;
                              setLocalShortBreak(Math.min(30, Math.max(1, val)));
                            }}
                            className="w-full px-4 py-3 rounded-[12px] bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-base focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                            placeholder="5"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-light dark:text-text-dark opacity-50">
                            minutes
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2.5">
                          Long Break
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="60"
                            value={localLongBreak}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1;
                              setLocalLongBreak(Math.min(60, Math.max(1, val)));
                            }}
                            className="w-full px-4 py-3 rounded-[12px] bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-base focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                            placeholder="15"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-light dark:text-text-dark opacity-50">
                            minutes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferences Section */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-accent-light dark:text-accent-dark" />
                      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                        Preferences
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {/* Auto Switch Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-[12px] bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-border-light dark:border-border-dark">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
                            Auto Switch
                          </label>
                          <p className="text-xs text-text-light dark:text-text-dark opacity-60">
                            Automatically switch between focus and breaks
                          </p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setLocalAutoSwitch(!localAutoSwitch)}
                          className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
                            localAutoSwitch
                              ? 'bg-accent-light dark:bg-accent-dark'
                              : 'bg-[#D1D1D1] dark:bg-[#4A4A4A]'
                          }`}
                          aria-label="Toggle auto switch"
                        >
                          <motion.span
                            layout
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm ${
                              localAutoSwitch ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </motion.button>
                      </div>

                      {/* Sound Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-[12px] bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3 flex-1">
                          {localSoundEnabled ? (
                            <Volume2 className="w-5 h-5 text-accent-light dark:text-accent-dark" />
                          ) : (
                            <VolumeX className="w-5 h-5 text-text-light dark:text-text-dark opacity-40" />
                          )}
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
                              Sound Notifications
                            </label>
                            <p className="text-xs text-text-light dark:text-text-dark opacity-60">
                              Play sound when timer completes
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setLocalSoundEnabled(!localSoundEnabled)}
                          className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
                            localSoundEnabled
                              ? 'bg-accent-light dark:bg-accent-dark'
                              : 'bg-[#D1D1D1] dark:bg-[#4A4A4A]'
                          }`}
                          aria-label="Toggle sound notifications"
                        >
                          <motion.span
                            layout
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm ${
                              localSoundEnabled ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-4 border-t border-border-light dark:border-border-dark">
                    <div className="flex items-center gap-2 mb-4">
                      <RotateCcw className="w-5 h-5 text-red-500" />
                      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                        Reset Data
                      </h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onResetStats}
                      className="w-full px-4 py-3 rounded-[12px] bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-500 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset All Stats
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 border-t border-border-light dark:border-border-dark bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-4 py-3 rounded-[12px] bg-white dark:bg-[#2C2C2E] text-text-light dark:text-text-dark hover:opacity-80 transition-opacity font-medium text-base border border-border-light dark:border-border-dark"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex-1 px-4 py-3 rounded-[12px] bg-accent-light dark:bg-accent-dark text-white hover:opacity-90 transition-opacity font-medium text-base shadow-sm"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

