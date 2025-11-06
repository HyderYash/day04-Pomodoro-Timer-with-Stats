import { useState, useEffect, useRef, useCallback } from 'react';
import { formatTime } from './timeUtils';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  progress: number;
}

interface UseTimerProps {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  autoSwitch: boolean;
  onComplete?: (mode: TimerMode) => void;
}

export function useTimer({
  focusDuration,
  shortBreakDuration,
  longBreakDuration,
  autoSwitch,
  onComplete,
}: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getDurationForMode = useCallback(
    (currentMode: TimerMode): number => {
      switch (currentMode) {
        case 'focus':
          return focusDuration;
        case 'shortBreak':
          return shortBreakDuration;
        case 'longBreak':
          return longBreakDuration;
        default:
          return focusDuration;
      }
    },
    [focusDuration, shortBreakDuration, longBreakDuration]
  );

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getDurationForMode(mode));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode, getDurationForMode]);

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      setTimeLeft(getDurationForMode(newMode));
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    },
    [getDurationForMode]
  );

  const startTimer = useCallback(() => {
    if (timeLeft === 0) {
      resetTimer();
    }
    setIsRunning(true);
  }, [timeLeft, resetTimer]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            if (onComplete) {
              onComplete(mode);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, timeLeft, mode, onComplete]);

  useEffect(() => {
    setTimeLeft(getDurationForMode(mode));
  }, [mode, getDurationForMode]);

  const progress = mode === 'focus' 
    ? ((getDurationForMode('focus') - timeLeft) / getDurationForMode('focus')) * 100
    : mode === 'shortBreak'
    ? ((getDurationForMode('shortBreak') - timeLeft) / getDurationForMode('shortBreak')) * 100
    : ((getDurationForMode('longBreak') - timeLeft) / getDurationForMode('longBreak')) * 100;

  return {
    timeLeft,
    isRunning,
    mode,
    progress,
    formattedTime: formatTime(timeLeft),
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
  };
}

